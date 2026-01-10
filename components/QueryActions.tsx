'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DeleteQueryButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Delete this query?')) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/queries?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete query');
      }
    } catch {
      alert('Failed to delete query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10
        rounded transition-colors disabled:opacity-50"
      title="Delete query"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );
}

export function ClearAllButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClearAll = async () => {
    if (!confirm('Delete ALL queries? This cannot be undone.')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/queries?all=true', {
        method: 'DELETE',
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to clear queries');
      }
    } catch {
      alert('Failed to clear queries');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClearAll}
      disabled={loading}
      className="px-3 py-1.5 text-sm text-red-400 border border-red-400/30
        hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
    >
      {loading ? 'Clearing...' : 'Clear All'}
    </button>
  );
}
