// Query logging using Qdrant (Vercel Postgres not configured)
// Logs stored in separate collection with rate limiting for security

import crypto from 'crypto';

const LOGS_COLLECTION = 'eric_engine_logs';

function getConfig() {
  const url = process.env.QDRANT_URL;
  const apiKey = process.env.QDRANT_API_KEY;
  return { url: url?.replace(/\/$/, ''), apiKey };
}

async function qdrantFetch(path: string, options: RequestInit = {}): Promise<any> {
  const { url, apiKey } = getConfig();

  if (!url) {
    console.warn('[DB] QDRANT_URL not set, skipping');
    return null;
  }

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

// Ensure logs collection exists
let logsCollectionEnsured = false;
async function ensureLogsCollection(): Promise<boolean> {
  if (logsCollectionEnsured) return true;

  try {
    const collections = await qdrantFetch('/collections');
    if (!collections) return false;

    const exists = collections.result.collections.some((c: any) => c.name === LOGS_COLLECTION);

    if (!exists) {
      await qdrantFetch(`/collections/${LOGS_COLLECTION}`, {
        method: 'PUT',
        body: JSON.stringify({
          vectors: { size: 1, distance: 'Cosine' },
        }),
      });

      // Create indexes
      await qdrantFetch(`/collections/${LOGS_COLLECTION}/index`, {
        method: 'PUT',
        body: JSON.stringify({ field_name: 'timestamp', field_schema: 'keyword' }),
      });
      await qdrantFetch(`/collections/${LOGS_COLLECTION}/index`, {
        method: 'PUT',
        body: JSON.stringify({ field_name: 'mode', field_schema: 'keyword' }),
      });

      console.log(`[DB] Created logs collection: ${LOGS_COLLECTION}`);
    }

    logsCollectionEnsured = true;
    return true;
  } catch (err) {
    console.error('[DB] Failed to ensure logs collection:', err);
    return false;
  }
}

// ============================================
// RATE LIMITING - Prevents abuse/DDOS
// ============================================
const rateLimitStore = new Map<string, { count: number; resetTime: number; blocked: boolean }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const RATE_LIMIT_MAX = 15; // 15 requests per minute per IP
const BLOCK_DURATION = 5 * 60 * 1000; // 5 minute block for abusers
const BLOCK_THRESHOLD = 30; // Block after 30 requests in a window (2x limit = abuse)

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
  blocked: boolean;
  reason?: string;
} {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // Check if IP is blocked
  if (record?.blocked && now < record.resetTime) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: record.resetTime - now,
      blocked: true,
      reason: 'IP temporarily blocked due to excessive requests',
    };
  }

  // Clear block if time expired
  if (record?.blocked && now >= record.resetTime) {
    rateLimitStore.delete(ip);
  }

  // New or reset window
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW, blocked: false });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetIn: RATE_LIMIT_WINDOW, blocked: false };
  }

  // Check for abuse (block if way over limit)
  if (record.count >= BLOCK_THRESHOLD) {
    record.blocked = true;
    record.resetTime = now + BLOCK_DURATION;
    console.warn(`[SECURITY] Blocking IP ${ip} for abuse - ${record.count} requests`);
    return {
      allowed: false,
      remaining: 0,
      resetIn: BLOCK_DURATION,
      blocked: true,
      reason: 'IP blocked for excessive requests',
    };
  }

  // Normal rate limit
  if (record.count >= RATE_LIMIT_MAX) {
    record.count++; // Still count for abuse detection
    return {
      allowed: false,
      remaining: 0,
      resetIn: record.resetTime - now,
      blocked: false,
      reason: 'Rate limit exceeded. Try again in a minute.',
    };
  }

  record.count++;
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - record.count,
    resetIn: record.resetTime - now,
    blocked: false,
  };
}

// Clean up old rate limit entries
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitStore.entries()) {
      if (now > record.resetTime && !record.blocked) {
        rateLimitStore.delete(ip);
      }
    }
  }, 60 * 1000);
}

// ============================================
// QUERY LOGGING
// ============================================
export interface QueryLog {
  id: string;
  query: string;
  mode: 'ask' | 'simulate' | 'explore';
  sources: { title: string; url?: string }[];
  response_preview: string;
  session_id: string;
  ip: string;
  user_agent: string;
  created_at: string;
}

export async function logQuery(
  query: string,
  mode: string,
  sources: { title: string; url?: string }[],
  responsePreview: string,
  sessionId: string,
  ip: string = 'unknown',
  userAgent: string = 'unknown'
): Promise<void> {
  try {
    const ready = await ensureLogsCollection();
    if (!ready) return;

    // Qdrant requires either unsigned integer or UUID for point IDs
    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    const log = {
      id,
      query: query.slice(0, 500), // Limit query length for security
      mode,
      sources: sources.slice(0, 5), // Limit sources
      responsePreview: responsePreview.slice(0, 300),
      sessionId: sessionId.slice(0, 64),
      ip: ip.slice(0, 45), // IPv6 max
      userAgent: userAgent.slice(0, 200),
      timestamp,
    };

    await qdrantFetch(`/collections/${LOGS_COLLECTION}/points?wait=true`, {
      method: 'PUT',
      body: JSON.stringify({
        points: [{
          id,
          vector: [0], // Dummy vector (Qdrant requires one)
          payload: log,
        }],
      }),
    });

    console.log('[DB] Logged query:', id, mode);
  } catch (err) {
    console.error('[DB] Failed to log query:', err);
  }
}

export async function getRecentQueries(limit: number = 50): Promise<QueryLog[]> {
  try {
    const ready = await ensureLogsCollection();
    if (!ready) return [];

    const response = await qdrantFetch(`/collections/${LOGS_COLLECTION}/points/scroll`, {
      method: 'POST',
      body: JSON.stringify({
        limit: Math.min(limit, 200), // Cap at 200 for performance
        with_payload: true,
      }),
    });

    if (!response?.result?.points) return [];

    // Sort by timestamp descending (newest first)
    const logs = response.result.points
      .map((p: any) => ({
        id: p.payload.id,
        query: p.payload.query,
        mode: p.payload.mode,
        sources: p.payload.sources || [],
        response_preview: p.payload.responsePreview,
        session_id: p.payload.sessionId,
        ip: p.payload.ip,
        user_agent: p.payload.userAgent,
        created_at: p.payload.timestamp,
      }))
      .sort((a: QueryLog, b: QueryLog) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

    return logs.slice(0, limit);
  } catch (err) {
    console.error('[DB] Failed to get recent queries:', err);
    return [];
  }
}

export async function getQueryStats(): Promise<{
  total: number;
  byMode: Record<string, number>;
  today: number;
  thisWeek: number;
}> {
  try {
    const queries = await getRecentQueries(1000);

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const byMode: Record<string, number> = {};
    let today = 0;
    let thisWeek = 0;

    for (const q of queries) {
      byMode[q.mode] = (byMode[q.mode] || 0) + 1;
      if (q.created_at >= todayStart) today++;
      if (q.created_at >= weekStart) thisWeek++;
    }

    return { total: queries.length, byMode, today, thisWeek };
  } catch (err) {
    console.error('[DB] Failed to get stats:', err);
    return { total: 0, byMode: {}, today: 0, thisWeek: 0 };
  }
}

export async function getTopSources(limit: number = 10): Promise<{ source: string; count: number }[]> {
  try {
    const queries = await getRecentQueries(500);

    const sourceCounts: Record<string, number> = {};
    for (const q of queries) {
      if (q.sources) {
        for (const s of q.sources) {
          if (s.title) {
            sourceCounts[s.title] = (sourceCounts[s.title] || 0) + 1;
          }
        }
      }
    }

    return Object.entries(sourceCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([source, count]) => ({ source, count }));
  } catch (err) {
    console.error('[DB] Failed to get top sources:', err);
    return [];
  }
}

export async function initDatabase(): Promise<void> {
  await ensureLogsCollection();
}
