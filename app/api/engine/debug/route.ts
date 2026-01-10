import { NextRequest } from 'next/server';
import { QdrantClient } from '@qdrant/js-client-rest';

export const runtime = 'nodejs';

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

  // Test Qdrant connection
  if (process.env.QDRANT_URL && process.env.QDRANT_API_KEY) {
    try {
      const client = new QdrantClient({
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY,
      });

      const collections = await client.getCollections();
      results.qdrant = {
        status: 'connected',
        collections: collections.collections.map(c => c.name),
      };

      // Try to get collection info
      try {
        const collectionInfo = await client.getCollection('eric_engine');
        results.qdrant.eric_engine = {
          points_count: collectionInfo.points_count,
          status: collectionInfo.status,
        };
      } catch (e) {
        results.qdrant.eric_engine = {
          error: e instanceof Error ? e.message : 'Unknown error',
        };
      }
    } catch (e) {
      results.qdrant = {
        status: 'error',
        error: e instanceof Error ? e.message : 'Unknown error',
        errorType: e instanceof Error ? e.constructor.name : typeof e,
      };
    }
  } else {
    results.qdrant = { status: 'not configured' };
  }

  // Test a raw fetch to Qdrant
  if (process.env.QDRANT_URL && process.env.QDRANT_API_KEY) {
    try {
      const response = await fetch(`${process.env.QDRANT_URL}/collections`, {
        headers: {
          'api-key': process.env.QDRANT_API_KEY,
        },
      });
      results.rawFetch = {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      };
      if (response.ok) {
        const data = await response.json();
        results.rawFetch.data = data;
      }
    } catch (e) {
      results.rawFetch = {
        error: e instanceof Error ? e.message : 'Unknown error',
        errorType: e instanceof Error ? e.constructor.name : typeof e,
      };
    }
  }

  return Response.json(results, { status: 200 });
}
