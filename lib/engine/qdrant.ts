// Qdrant client using raw fetch (compatible with Vercel serverless)
import type { ContentChunk, SearchResult } from './types';

const COLLECTION_NAME = 'eric_engine';
const VECTOR_SIZE = 1536; // OpenAI ada-002 embedding size

function getConfig() {
  const url = process.env.QDRANT_URL;
  const apiKey = process.env.QDRANT_API_KEY;

  if (!url) {
    throw new Error('QDRANT_URL environment variable is required');
  }

  return { url: url.replace(/\/$/, ''), apiKey };
}

async function qdrantFetch(path: string, options: RequestInit = {}): Promise<any> {
  const { url, apiKey } = getConfig();

  const response = await fetch(`${url}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { 'api-key': apiKey } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Qdrant error ${response.status}: ${text}`);
  }

  return response.json();
}

export async function ensureCollection(): Promise<void> {
  const collections = await qdrantFetch('/collections');
  const exists = collections.result.collections.some((c: any) => c.name === COLLECTION_NAME);

  if (!exists) {
    await qdrantFetch(`/collections/${COLLECTION_NAME}`, {
      method: 'PUT',
      body: JSON.stringify({
        vectors: {
          size: VECTOR_SIZE,
          distance: 'Cosine',
        },
      }),
    });

    // Create payload indexes
    await qdrantFetch(`/collections/${COLLECTION_NAME}/index`, {
      method: 'PUT',
      body: JSON.stringify({
        field_name: 'source',
        field_schema: 'keyword',
      }),
    });

    await qdrantFetch(`/collections/${COLLECTION_NAME}/index`, {
      method: 'PUT',
      body: JSON.stringify({
        field_name: 'date',
        field_schema: 'keyword',
      }),
    });

    console.log(`Created collection: ${COLLECTION_NAME}`);
  }
}

export async function upsertChunks(
  chunks: ContentChunk[],
  embeddings: number[][]
): Promise<void> {
  const points = chunks.map((chunk, i) => ({
    id: chunk.id,
    vector: embeddings[i],
    payload: {
      content: chunk.content,
      ...chunk.metadata,
    },
  }));

  // Upsert in batches of 100
  const batchSize = 100;
  for (let i = 0; i < points.length; i += batchSize) {
    const batch = points.slice(i, i + batchSize);
    await qdrantFetch(`/collections/${COLLECTION_NAME}/points?wait=true`, {
      method: 'PUT',
      body: JSON.stringify({ points: batch }),
    });
    console.log(`Upserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(points.length / batchSize)}`);
  }
}

export async function searchSimilar(
  embedding: number[],
  limit: number = 5,
  filter?: {
    source?: string;
    dateFrom?: string;
    dateTo?: string;
  }
): Promise<SearchResult[]> {
  console.log('[Qdrant] searchSimilar called, embedding length:', embedding.length);

  const filterConditions: any[] = [];

  if (filter?.source) {
    filterConditions.push({
      key: 'source',
      match: { value: filter.source },
    });
  }

  if (filter?.dateFrom || filter?.dateTo) {
    const dateCondition: any = { key: 'date' };
    if (filter.dateFrom && filter.dateTo) {
      dateCondition.range = {
        gte: filter.dateFrom,
        lte: filter.dateTo,
      };
    } else if (filter.dateFrom) {
      dateCondition.range = { gte: filter.dateFrom };
    } else if (filter.dateTo) {
      dateCondition.range = { lte: filter.dateTo };
    }
    filterConditions.push(dateCondition);
  }

  const body: any = {
    vector: embedding,
    limit,
    with_payload: true,
  };

  if (filterConditions.length > 0) {
    body.filter = { must: filterConditions };
  }

  const response = await qdrantFetch(`/collections/${COLLECTION_NAME}/points/search`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  console.log('[Qdrant] Search returned', response.result.length, 'results');

  return response.result.map((result: any) => ({
    content: result.payload?.content as string,
    metadata: {
      source: result.payload?.source as string,
      sourceFile: result.payload?.sourceFile as string,
      title: result.payload?.title as string,
      date: result.payload?.date as string | undefined,
      topics: result.payload?.topics as string[] | undefined,
      section: result.payload?.section as string | undefined,
      chunkIndex: result.payload?.chunkIndex as number,
      url: result.payload?.url as string | undefined,
    },
    score: result.score,
  }));
}

export async function deleteBySource(source: string): Promise<void> {
  await qdrantFetch(`/collections/${COLLECTION_NAME}/points/delete?wait=true`, {
    method: 'POST',
    body: JSON.stringify({
      filter: {
        must: [
          {
            key: 'source',
            match: { value: source },
          },
        ],
      },
    }),
  });

  console.log(`Deleted all chunks with source: ${source}`);
}

export async function getCollectionInfo(): Promise<{
  pointsCount: number;
  status: string;
}> {
  const response = await qdrantFetch(`/collections/${COLLECTION_NAME}`);

  return {
    pointsCount: response.result.points_count ?? 0,
    status: response.result.status,
  };
}

// Keep the old function for backwards compatibility with scripts
export function getQdrantClient() {
  // This is only used by ingest script which runs locally
  const { QdrantClient } = require('@qdrant/js-client-rest');
  const { url, apiKey } = getConfig();
  return new QdrantClient({ url, apiKey });
}
