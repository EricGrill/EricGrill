import Link from 'next/link';
import { getQueryStats, getRecentQueries } from '@/lib/engine/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function AdminDashboard() {
  let stats = { total: 0, byMode: {} as Record<string, number>, today: 0, thisWeek: 0 };
  let recentQueries: any[] = [];
  let error: string | null = null;
  let debug: any = {};

  try {
    // Run sequentially - parallel calls to Qdrant were causing issues
    stats = await getQueryStats();
    recentQueries = await getRecentQueries(5);
    debug = {
      time: new Date().toISOString(),
      statsTotal: stats.total,
      queriesCount: recentQueries.length,
      firstQuery: recentQueries[0]?.query
    };
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load data';
    debug = { time: new Date().toISOString(), error: e instanceof Error ? e.stack : String(e) };
  }

  console.log('[Admin] Debug:', JSON.stringify(debug));

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            <span className="text-[var(--accent-cyan)]">{'>'}</span> Dashboard
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Eric Engine Admin Panel
          </p>
        </div>

        {/* Debug info */}
        <div className="p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-yellow-400 text-xs font-mono">
          Debug: {JSON.stringify(debug)}
        </div>

        {error ? (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            <p>Error loading data: {error}</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
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

            {/* Quick Links */}
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/admin/queries"
                className="group p-6 bg-[var(--background-card)] border border-[var(--border)]
                  rounded-lg hover:border-[var(--accent-cyan)] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)]">
                      Query Logs
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      View all queries, IPs, and response previews
                    </p>
                  </div>
                  <svg className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)]"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <div className="p-6 bg-[var(--background-card)] border border-[var(--border)] border-dashed
                rounded-lg opacity-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-[var(--text-secondary)]">
                      Content Management
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      Coming soon...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            {recentQueries.length > 0 && (
              <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-lg overflow-hidden">
                <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
                  <h2 className="text-lg font-medium text-[var(--text-primary)]">
                    Recent Queries
                  </h2>
                  <Link
                    href="/admin/queries"
                    className="text-sm text-[var(--accent-cyan)] hover:underline"
                  >
                    View all →
                  </Link>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  {recentQueries.map((q: any) => (
                    <div key={q.id} className="p-4 hover:bg-[var(--background-alt)] transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[var(--text-primary)] truncate">
                            {q.query}
                          </p>
                          <p className="text-xs text-[var(--text-secondary)] mt-1">
                            {q.mode} • {new Date(q.created_at).toLocaleString()}
                          </p>
                        </div>
                        <ModeTag mode={q.mode} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
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
