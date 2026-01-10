import { AdminNav } from '@/components/AdminNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--background-card)] border-r border-[var(--border)] flex-shrink-0">
        <AdminNav />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
