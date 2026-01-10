import { sql } from '@vercel/postgres';

export interface QueryLog {
  id: number;
  query: string;
  mode: 'ask' | 'simulate' | 'explore';
  sources: string[];
  response_preview: string;
  session_id: string;
  created_at: Date;
}

// Initialize the queries table
export async function initDatabase(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS engine_queries (
      id SERIAL PRIMARY KEY,
      query TEXT NOT NULL,
      mode VARCHAR(20) NOT NULL,
      sources JSONB DEFAULT '[]',
      response_preview TEXT,
      session_id VARCHAR(64),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Create index for faster queries
  await sql`
    CREATE INDEX IF NOT EXISTS idx_engine_queries_created_at
    ON engine_queries (created_at DESC)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_engine_queries_mode
    ON engine_queries (mode)
  `;
}

export async function logQuery(
  query: string,
  mode: 'ask' | 'simulate' | 'explore',
  sources: { title: string; url?: string }[],
  responsePreview: string,
  sessionId: string
): Promise<number> {
  const result = await sql`
    INSERT INTO engine_queries (query, mode, sources, response_preview, session_id)
    VALUES (
      ${query},
      ${mode},
      ${JSON.stringify(sources)},
      ${responsePreview.slice(0, 500)},
      ${sessionId}
    )
    RETURNING id
  `;

  return result.rows[0].id;
}

export async function getRecentQueries(
  limit: number = 50,
  offset: number = 0,
  mode?: string
): Promise<QueryLog[]> {
  if (mode) {
    const result = await sql`
      SELECT * FROM engine_queries
      WHERE mode = ${mode}
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;
    return result.rows as QueryLog[];
  }

  const result = await sql`
    SELECT * FROM engine_queries
    ORDER BY created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;
  return result.rows as QueryLog[];
}

export async function getQueryStats(): Promise<{
  total: number;
  byMode: Record<string, number>;
  today: number;
  thisWeek: number;
}> {
  const totalResult = await sql`
    SELECT COUNT(*) as count FROM engine_queries
  `;

  const byModeResult = await sql`
    SELECT mode, COUNT(*) as count
    FROM engine_queries
    GROUP BY mode
  `;

  const todayResult = await sql`
    SELECT COUNT(*) as count FROM engine_queries
    WHERE created_at >= CURRENT_DATE
  `;

  const weekResult = await sql`
    SELECT COUNT(*) as count FROM engine_queries
    WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
  `;

  const byMode: Record<string, number> = {};
  for (const row of byModeResult.rows) {
    byMode[row.mode] = parseInt(row.count);
  }

  return {
    total: parseInt(totalResult.rows[0].count),
    byMode,
    today: parseInt(todayResult.rows[0].count),
    thisWeek: parseInt(weekResult.rows[0].count),
  };
}

export async function getTopSources(limit: number = 10): Promise<{ source: string; count: number }[]> {
  // This is a bit complex - we need to unnest the JSONB array and count
  const result = await sql`
    SELECT
      source->>'title' as source,
      COUNT(*) as count
    FROM engine_queries,
    jsonb_array_elements(sources) as source
    GROUP BY source->>'title'
    ORDER BY count DESC
    LIMIT ${limit}
  `;

  return result.rows.map(row => ({
    source: row.source,
    count: parseInt(row.count),
  }));
}
