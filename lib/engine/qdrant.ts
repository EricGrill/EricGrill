import { QdrantClient } from '@qdrant/js-client-rest';
import type { ContentChunk, SearchResult, ChunkMetadata } from './types';

const COLLECTION_NAME = 'eric_engine';
const VECTOR_SIZE = 1536; // OpenAI ada-002 embedding size

let client: QdrantClient | null = null;

export function getQdrantClient(): QdrantClient {
  if (!client) {
    const url = process.env.QDRANT_URL;
    const apiKey = process.env.QDRANT_API_KEY;

    if (!url) {
      throw new Error('QDRANT_URL environment variable is required');
    }

    client = new QdrantClient({
      url,
      apiKey,
    });
  }
  return client;
}

export async function ensureCollection(): Promise<void> {
  const qdrant = getQdrantClient();

  const collections = await qdrant.getCollections();
  const exists = collections.collections.some(c => c.name === COLLECTION_NAME);

  if (!exists) {
    await qdrant.createCollection(COLLECTION_NAME, {
      vectors: {
        size: VECTOR_SIZE,
        distance: 'Cosine',
      },
    });

    // Create payload index for filtering
    await qdrant.createPayloadIndex(COLLECTION_NAME, {
      field_name: 'source',
      field_schema: 'keyword',
    });

    await qdrant.createPayloadIndex(COLLECTION_NAME, {
      field_name: 'date',
      field_schema: 'keyword',
    });

    console.log(`Created collection: ${COLLECTION_NAME}`);
  }
}

export async function upsertChunks(
  chunks: ContentChunk[],
  embeddings: number[][]
): Promise<void> {
  const qdrant = getQdrantClient();

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
    await qdrant.upsert(COLLECTION_NAME, {
      wait: true,
      points: batch,
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
  const qdrant = getQdrantClient();

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

  const results = await qdrant.search(COLLECTION_NAME, {
    vector: embedding,
    limit,
    with_payload: true,
    filter: filterConditions.length > 0 ? {
      must: filterConditions,
    } : undefined,
  });

  return results.map(result => ({
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
  const qdrant = getQdrantClient();

  await qdrant.delete(COLLECTION_NAME, {
    wait: true,
    filter: {
      must: [
        {
          key: 'source',
          match: { value: source },
        },
      ],
    },
  });

  console.log(`Deleted all chunks with source: ${source}`);
}

export async function getCollectionInfo(): Promise<{
  pointsCount: number;
  status: string;
}> {
  const qdrant = getQdrantClient();
  const info = await qdrant.getCollection(COLLECTION_NAME);

  return {
    pointsCount: info.points_count ?? 0,
    status: info.status,
  };
}
