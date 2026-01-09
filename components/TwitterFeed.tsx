"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export function TwitterFeed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = () => {
      if (window.twttr && containerRef.current) {
        window.twttr.widgets.load(containerRef.current);
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector(
        'script[src="https://platform.twitter.com/widgets.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="twitter-feed-container">
      <a
        className="twitter-timeline"
        data-theme="dark"
        data-chrome="noheader nofooter noborders transparent"
        data-tweet-limit="3"
        href="https://twitter.com/EricGrill?ref_src=twsrc%5Etfw"
      >
        Loading tweets...
      </a>
    </div>
  );
}

export function TwitterFollowCTA() {
  return (
    <div className="text-center">
      <a
        href="https://x.com/EricGrill"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 px-8 py-4 bg-accent-magenta/10 border border-accent-magenta text-accent-magenta font-mono text-sm uppercase tracking-wider hover:bg-accent-magenta hover:text-background transition-all duration-300 hover:shadow-glow-magenta"
      >
        <XIcon className="w-5 h-5" />
        <span>Follow @EricGrill on X</span>
        <span className="group-hover:translate-x-1 transition-transform">{">"}</span>
      </a>
      <p className="mt-4 font-mono text-sm text-text-secondary">
        Let&apos;s discuss ideas, share insights, and connect.
      </p>
    </div>
  );
}

export function TwitterDiscussCTA({ title }: { title?: string }) {
  const tweetText = title
    ? encodeURIComponent(`Just read "${title}" by @EricGrill - `)
    : encodeURIComponent("Hey @EricGrill - ");

  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  return (
    <div className="p-8 border border-border bg-background-card/50 backdrop-blur-sm">
      <span className="font-mono text-sm text-accent-cyan mb-4 block">
        {"$ "}<span className="text-text-primary">discuss</span> --twitter
      </span>
      <h3 className="font-mono text-xl font-bold text-text-primary mb-2">
        Want to discuss this?
      </h3>
      <p className="text-text-secondary mb-6">
        Drop me a message on X. I read and reply to everything.
      </p>
      <div className="flex flex-wrap gap-4">
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-6 py-3 bg-accent-cyan/10 border border-accent-cyan text-accent-cyan font-mono text-sm uppercase tracking-wider hover:bg-accent-cyan hover:text-background transition-all duration-300 hover:shadow-glow-cyan"
        >
          <XIcon className="w-4 h-4" />
          <span>Reply on X</span>
        </a>
        <a
          href="https://x.com/EricGrill"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-6 py-3 border border-border text-text-secondary font-mono text-sm uppercase tracking-wider hover:border-accent-magenta hover:text-accent-magenta transition-all duration-300"
        >
          <span>Follow @EricGrill</span>
        </a>
      </div>
    </div>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
