import { NextRequest } from 'next/server';
import { searchSimilar } from '@/lib/engine/qdrant';
import { getEmbedding } from '@/lib/engine/embeddings';
import { streamResponse, type Message } from '@/lib/engine/llm';
import { getPhilosophyForMode } from '@/lib/engine/philosophy';
import { logQuery, checkRateLimit } from '@/lib/engine/db';
import type { SearchResult } from '@/lib/engine/types';
import crypto from 'crypto';

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         request.headers.get('x-real-ip') ||
         'unknown';
}

export const runtime = 'nodejs';
export const maxDuration = 60;

interface EngineRequest {
  query: string;
  mode: 'ask' | 'simulate' | 'explore';
  constraints?: Record<string, string>;
}

// System prompts for each mode
const SYSTEM_PROMPTS = {
  ask: `You are the Eric Engine, a representation of Eric Grill's thinking and knowledge.

You answer questions by synthesizing Eric's documented experiences, writings, and philosophy.

RULES:
- Speak in first person as Eric ("I think...", "My experience...", "I've found...")
- Ground every answer in the provided context from Eric's content
- Include relevant quotes from Eric's writing when available
- Be direct and opinionated - Eric has strong views
- If the context doesn't cover a topic, say so honestly
- Never make up experiences or quotes

STYLE:
- Direct, no fluff
- Action-oriented
- Bias toward practical over theoretical
- Skeptical of institutions, optimistic about individual capability`,

  simulate: `You are the Eric Engine in SIMULATION MODE.

You project forward to show what Eric would likely do given specific constraints.

RULES:
- Analyze the constraints provided
- Draw from Eric's documented decisions, values, and patterns
- Show the reasoning chain Eric would use
- Identify key decision points and trade-offs
- Be honest about uncertainty
- Reference similar past situations from Eric's experience

STYLE:
- Walk through the thinking step by step
- Show trade-offs explicitly
- Acknowledge where the simulation is uncertain
- End with a clear projected action

CRITICAL: This is simulation, not advice. Label it clearly as "Based on Eric's patterns, here's a projected path..."`,

  explore: `You are the Eric Engine in EXPLORE MODE.

You help people navigate Eric's thinking over time, showing evolution and contradictions.

RULES:
- Show how Eric's views have changed on topics
- Highlight contradictions between past and present thinking
- Explain what caused changes (when documented)
- Present timeline of thinking evolution
- Be honest about gaps in the record

STYLE:
- Chronological when showing evolution
- Highlight pivotal moments
- Show before/after contrasts
- Celebrate the contradictions - they show growth`,
};

function buildPrompt(
  query: string,
  mode: 'ask' | 'simulate' | 'explore',
  context: SearchResult[],
  philosophy: string,
  constraints?: Record<string, string>
): Message[] {
  const contextText = context
    .map((r, i) => {
      const source = r.metadata.url ? `[${r.metadata.title}](${r.metadata.url})` : r.metadata.title;
      const date = r.metadata.date ? ` (${r.metadata.date})` : '';
      return `### Source ${i + 1}: ${source}${date}\n\n${r.content}`;
    })
    .join('\n\n---\n\n');

  const systemContent = `${SYSTEM_PROMPTS[mode]}

## ERIC'S PHILOSOPHY (Core Priors)

${philosophy}

## RELEVANT CONTEXT FROM ERIC'S CONTENT

${contextText}`;

  let userContent = query;

  if (mode === 'simulate' && constraints) {
    const constraintList = Object.entries(constraints)
      .map(([k, v]) => `- ${k}: ${v}`)
      .join('\n');
    userContent = `SIMULATION REQUEST:\n\n${query}\n\nCONSTRAINTS:\n${constraintList}`;
  }

  return [
    { role: 'system', content: systemContent },
    { role: 'user', content: userContent },
  ];
}

export async function POST(request: NextRequest) {
  // Get client info for rate limiting and logging
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';

  // Check rate limit
  const rateLimit = checkRateLimit(clientIP);
  if (!rateLimit.allowed) {
    console.warn(`[Engine] Rate limited: ${clientIP} - ${rateLimit.reason}`);
    return Response.json(
      {
        error: rateLimit.reason || 'Rate limit exceeded',
        retryAfter: Math.ceil(rateLimit.resetIn / 1000),
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(rateLimit.resetIn / 1000)),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  try {
    const body: EngineRequest = await request.json();
    const { query, mode, constraints } = body;

    console.log('[Engine] Request received:', { query, mode, ip: clientIP });

    if (!query || !mode) {
      return Response.json(
        { error: 'Missing required fields: query and mode' },
        { status: 400 }
      );
    }

    if (!['ask', 'simulate', 'explore'].includes(mode)) {
      return Response.json(
        { error: 'Invalid mode. Must be: ask, simulate, or explore' },
        { status: 400 }
      );
    }

    // Check environment variables
    const envCheck = {
      QDRANT_URL: !!process.env.QDRANT_URL,
      QDRANT_API_KEY: !!process.env.QDRANT_API_KEY,
      OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
      ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
    };
    console.log('[Engine] Environment check:', envCheck);

    if (!process.env.QDRANT_URL || !process.env.QDRANT_API_KEY) {
      return Response.json(
        { error: 'Server configuration error: Qdrant not configured', debug: envCheck },
        { status: 500 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: 'Server configuration error: OpenAI API key not configured (needed for embeddings)', debug: envCheck },
        { status: 500 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: 'Server configuration error: No LLM API key configured', debug: envCheck },
        { status: 500 }
      );
    }

    // Get embedding for the query
    console.log('[Engine] Getting embedding...');
    let queryEmbedding;
    try {
      queryEmbedding = await getEmbedding(query);
      console.log('[Engine] Embedding received, length:', queryEmbedding.length);
    } catch (embErr) {
      console.error('[Engine] Embedding error:', embErr);
      return Response.json(
        { error: `Embedding error: ${embErr instanceof Error ? embErr.message : 'Unknown'}` },
        { status: 500 }
      );
    }

    // Search for relevant context
    console.log('[Engine] Searching Qdrant...');
    const searchLimit = mode === 'explore' ? 10 : 6;
    let context;
    try {
      context = await searchSimilar(queryEmbedding, searchLimit);
      console.log('[Engine] Found', context.length, 'results');
    } catch (searchErr) {
      console.error('[Engine] Qdrant search error:', searchErr);
      return Response.json(
        { error: `Qdrant search error: ${searchErr instanceof Error ? searchErr.message : 'Unknown'}` },
        { status: 500 }
      );
    }

    // Load philosophy priors for the mode
    const philosophy = getPhilosophyForMode(mode);
    console.log('[Engine] Philosophy loaded, streaming response...');

    // Build the prompt
    const messages = buildPrompt(query, mode, context, philosophy, constraints);

    // Generate session ID from request (anonymous)
    const sessionId = crypto
      .createHash('md5')
      .update(request.headers.get('x-forwarded-for') || request.headers.get('user-agent') || 'anonymous')
      .digest('hex')
      .substring(0, 16);

    // Create streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = '';

        try {
          // First, send the sources
          const sourcesData = {
            type: 'sources',
            sources: context.map(r => ({
              title: r.metadata.title,
              url: r.metadata.url,
              date: r.metadata.date,
              score: r.score,
            })),
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(sourcesData)}\n\n`));

          // Then stream the response
          for await (const token of streamResponse(messages)) {
            fullResponse += token;
            const data = { type: 'token', content: token };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
          }

          // Log the query (non-blocking)
          logQuery(
            query,
            mode,
            context.map(r => ({ title: r.metadata.title, url: r.metadata.url })),
            fullResponse,
            sessionId,
            clientIP,
            userAgent
          ).catch(err => console.error('Failed to log query:', err));

          // Send completion signal
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
          controller.close();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'error', error: errorMessage })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Engine API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return Response.json({
    status: 'ok',
    modes: ['ask', 'simulate', 'explore'],
    version: '1.0.0',
  });
}
