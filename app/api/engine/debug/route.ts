import { NextRequest } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';

async function qdrantFetch(path: string, options: RequestInit = {}): Promise<any> {
  const url = process.env.QDRANT_URL?.replace(/\/$/, '');
  const apiKey = process.env.QDRANT_API_KEY;

  if (!url) return { error: 'QDRANT_URL not set' };

  const response = await fetch(`${url}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { 'api-key': apiKey } : {}),
      ...options.headers,
    },
  });

  const text = await response.text();
  try {
    return { status: response.status, ok: response.ok, data: JSON.parse(text) };
  } catch {
    return { status: response.status, ok: response.ok, text };
  }
}

export async function GET(request: NextRequest) {
  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
    env: {
      QDRANT_URL: process.env.QDRANT_URL ? `${process.env.QDRANT_URL.substring(0, 30)}...` : 'NOT SET',
      QDRANT_API_KEY: process.env.QDRANT_API_KEY ? 'SET (hidden)' : 'NOT SET',
      OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'SET (hidden)' : 'NOT SET',
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? 'SET (hidden)' : 'NOT SET',
    },
  };

  // Check collections
  results.collections = await qdrantFetch('/collections');

  // Check logs collection specifically
  results.logsCollection = await qdrantFetch('/collections/eric_engine_logs');

  // Try to scroll logs
  results.logsScroll = await qdrantFetch('/collections/eric_engine_logs/points/scroll', {
    method: 'POST',
    body: JSON.stringify({ limit: 5, with_payload: true }),
  });

  // Try to insert a test log
  const testId = crypto.randomUUID();
  results.testInsert = await qdrantFetch('/collections/eric_engine_logs/points?wait=true', {
    method: 'PUT',
    body: JSON.stringify({
      points: [{
        id: testId,
        vector: [0],
        payload: {
          id: testId,
          query: 'DEBUG TEST QUERY',
          mode: 'ask',
          sources: [],
          responsePreview: 'Debug test',
          sessionId: 'debug',
          ip: 'debug',
          userAgent: 'debug',
          timestamp: new Date().toISOString(),
        },
      }],
    }),
  });

  // Scroll again to see if test appeared
  results.logsAfterInsert = await qdrantFetch('/collections/eric_engine_logs/points/scroll', {
    method: 'POST',
    body: JSON.stringify({ limit: 5, with_payload: true }),
  });

  return Response.json(results, { status: 200 });
}
