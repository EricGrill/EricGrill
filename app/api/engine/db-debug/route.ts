import { getRecentQueries, getQueryStats, getTopSources } from '@/lib/engine/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
  };

  try {
    results.recentQueries = await getRecentQueries(10);
    results.recentQueriesCount = results.recentQueries.length;
  } catch (e) {
    results.recentQueriesError = e instanceof Error ? e.message : String(e);
  }

  try {
    results.stats = await getQueryStats();
  } catch (e) {
    results.statsError = e instanceof Error ? e.message : String(e);
  }

  try {
    results.topSources = await getTopSources(5);
  } catch (e) {
    results.topSourcesError = e instanceof Error ? e.message : String(e);
  }

  return Response.json(results, { status: 200 });
}
