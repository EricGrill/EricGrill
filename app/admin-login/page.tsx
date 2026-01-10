"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin");
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="bg-[var(--background-card)] border border-[var(--border)] p-8 rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-[var(--accent-cyan)] font-mono text-2xl">{'>'}_</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Admin Login</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-2">
            Enter your admin password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg
                text-[var(--text-primary)] placeholder-[var(--text-secondary)]
                focus:outline-none focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)]
                transition-colors"
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/90
              disabled:opacity-50 text-[var(--background)] font-medium rounded-lg transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Info */}
        <p className="text-center text-xs text-[var(--text-secondary)] mt-6">
          Only authorized users can access the admin panel.
        </p>

        {/* Back to site */}
        <div className="text-center mt-6 pt-6 border-t border-[var(--border)]">
          <Link
            href="/"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
