"use client";

import { useState } from "react";

interface SocialShareProps {
  url: string;
  title: string;
}

export function SocialShare({ url, title }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);

  const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="my-8 p-6 border border-border bg-background-card/50">
      {/* Share Header */}
      <div className="mb-6">
        <span className="font-mono text-sm text-accent-green block mb-2">
          {"$ "}<span className="text-text-primary">share</span> --article
        </span>
        <p className="text-text-secondary text-sm">
          Found this useful? Share it with others.
        </p>
      </div>

      {/* Share Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Share on X */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-2 border border-accent-cyan text-accent-cyan font-mono text-sm uppercase tracking-wider hover:bg-accent-cyan hover:text-background transition-all duration-300 hover:shadow-glow-cyan"
        >
          <XIcon className="w-4 h-4" />
          <span>Share on X</span>
        </a>

        {/* Share on Facebook */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-2 border border-border text-text-secondary font-mono text-sm uppercase tracking-wider hover:border-accent-cyan hover:text-accent-cyan transition-all duration-300"
        >
          <FacebookIcon className="w-4 h-4" />
          <span>Facebook</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="group flex items-center gap-2 px-4 py-2 border border-border text-text-secondary font-mono text-sm uppercase tracking-wider hover:border-accent-cyan hover:text-accent-cyan transition-all duration-300"
        >
          <LinkIcon className="w-4 h-4" />
          <span>{copied ? "Copied!" : "Copy Link"}</span>
        </button>
      </div>

      {/* Follow CTA - Primary */}
      <div className="pt-6 border-t border-border">
        <span className="font-mono text-xs text-text-secondary block mb-3">
          {"// "}connect
        </span>
        <a
          href="https://x.com/EricGrill"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-6 py-3 bg-accent-magenta/10 border border-accent-magenta text-accent-magenta font-mono text-sm uppercase tracking-wider hover:bg-accent-magenta hover:text-background transition-all duration-300 hover:shadow-glow-magenta"
        >
          <XIcon className="w-5 h-5" />
          <span>Follow @EricGrill on X</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  );
}

// X (Twitter) Icon
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Facebook Icon
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

// Link Icon
function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
