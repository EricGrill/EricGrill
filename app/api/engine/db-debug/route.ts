import { getRecentQueries, getQueryStats, getTopSources } from '@/lib/engine/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
  };

  // Test with different limits
  try {
    results.queries10 = (await getRecentQueries(10)).length;
  } catch (e) {
    results.queries10Error = e instanceof Error ? e.message : String(e);
  }

  try {
    results.queries100 = (await getRecentQueries(100)).length;
  } catch (e) {
    results.queries100Error = e instanceof Error ? e.message : String(e);
  }

  try {
    results.queries1000 = (await getRecentQueries(1000)).length;
  } catch (e) {
    results.queries1000Error = e instanceof Error ? e.message : String(e);
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
