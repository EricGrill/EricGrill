'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: Record<string, string> = {
    invalid_state: 'Security verification failed. Please try again.',
    no_code: 'Authentication was cancelled.',
    not_configured: 'GitHub OAuth is not configured.',
    token_failed: 'Failed to get access token.',
    user_fetch_failed: 'Failed to verify your identity.',
    unauthorized: 'You are not authorized to access the admin panel.',
    auth_failed: 'Authentication failed. Please try again.',
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
            Sign in with your GitHub account
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">
              {errorMessages[error] || 'An error occurred. Please try again.'}
            </p>
          </div>
        )}

        {/* GitHub Login Button */}
        <a
          href="/api/admin/auth"
          className="flex items-center justify-center gap-3 w-full py-3 px-4
            bg-[var(--text-primary)] hover:bg-white text-[var(--background)]
            font-medium rounded-lg transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Continue with GitHub
        </a>

        {/* Info */}
        <p className="text-center text-xs text-[var(--text-secondary)] mt-6">
          Only authorized GitHub accounts can access the admin panel.
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

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-[var(--text-secondary)]">Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
