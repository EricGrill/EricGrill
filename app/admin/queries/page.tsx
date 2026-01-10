import { getRecentQueries, getQueryStats, getTopSources } from '@/lib/engine/db';
import { DeleteQueryButton, ClearAllButton } from '@/components/QueryActions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function QueriesPage() {
  let queries: any[] = [];
  let stats: { total: number; byMode: Record<string, number>; today: number; thisWeek: number } = { total: 0, byMode: {}, today: 0, thisWeek: 0 };
  let topSources: { source: string; count: number }[] = [];
  let error: string | null = null;

  try {
    // Run sequentially - parallel calls to Qdrant were causing issues
    queries = await getRecentQueries(50);
    stats = await getQueryStats();
    topSources = await getTopSources(10);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load data';
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            <span className="text-[var(--accent-cyan)]">{'>'}</span> Query Logs
          </h1>
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            <p>Error loading data: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            <span className="text-[var(--accent-cyan)]">{'>'}</span> Query Logs
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            All queries to the Eric Engine
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Queries" value={stats.total} />
          <StatCard label="Today" value={stats.today} accent />
          <StatCard label="This Week" value={stats.thisWeek} />
          <StatCard
            label="By Mode"
            value={
              <div className="text-xs space-y-1 mt-1">
                <div>Ask: {stats.byMode.ask || 0}</div>
                <div>Simulate: {stats.byMode.simulate || 0}</div>
                <div>Explore: {stats.byMode.explore || 0}</div>
              </div>
            }
          />
        </div>

        {/* Top Sources */}
        {topSources.length > 0 && (
          <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-lg p-4">
            <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">
              Most Cited Sources
            </h2>
            <div className="flex flex-wrap gap-2">
              {topSources.map((s, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 bg-[var(--background)] border border-[var(--border)]
                    rounded text-sm text-[var(--text-secondary)]"
                >
                  {s.source}{' '}
                  <span className="text-[var(--accent-cyan)]">({s.count})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Queries Table */}
        <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="text-lg font-medium text-[var(--text-primary)]">
              Recent Queries
            </h2>
            {queries.length > 0 && <ClearAllButton />}
          </div>

          {queries.length === 0 ? (
            <div className="p-8 text-center text-[var(--text-secondary)]">
              No queries yet. Start asking the Eric Engine questions!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--background)]">
                  <tr className="text-left text-sm text-[var(--text-secondary)]">
                    <th className="px-4 py-3 font-medium">Query</th>
                    <th className="px-4 py-3 font-medium">Mode</th>
                    <th className="px-4 py-3 font-medium">Sources</th>
                    <th className="px-4 py-3 font-medium">IP</th>
                    <th className="px-4 py-3 font-medium">Time</th>
                    <th className="px-4 py-3 font-medium w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {queries.map((q: any) => (
                    <tr key={q.id} className="hover:bg-[var(--background-alt)] transition-colors">
                      <td className="px-4 py-3">
                        <div className="max-w-md">
                          <p className="text-sm text-[var(--text-primary)] truncate">
                            {q.query}
                          </p>
                          {q.response_preview && (
                            <p className="text-xs text-[var(--text-secondary)] mt-1 truncate">
                              {q.response_preview}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <ModeTag mode={q.mode} />
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-[var(--text-secondary)]">
                          {Array.isArray(q.sources) ? q.sources.length : 0}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-[var(--text-secondary)] font-mono">
                          {q.ip || 'unknown'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-[var(--text-secondary)]">
                          {new Date(q.created_at).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <DeleteQueryButton id={q.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-lg p-4">
      <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
        {label}
      </div>
      <div
        className={`text-2xl font-bold mt-1 ${
          accent ? 'text-[var(--accent-cyan)]' : 'text-[var(--text-primary)]'
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function ModeTag({ mode }: { mode: string }) {
  const colors: Record<string, string> = {
    ask: 'bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border-[var(--accent-cyan)]/30',
    simulate: 'bg-[var(--accent-magenta)]/10 text-[var(--accent-magenta)] border-[var(--accent-magenta)]/30',
    explore: 'bg-[var(--accent-green)]/10 text-[var(--accent-green)] border-[var(--accent-green)]/30',
  };

  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-mono rounded border ${
        colors[mode] || colors.ask
      }`}
    >
      {mode}
    </span>
  );
}
