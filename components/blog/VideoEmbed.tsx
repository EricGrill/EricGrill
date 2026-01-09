"use client";

import { useState } from "react";

interface VideoEmbedProps {
  videoId: string;
  title?: string;
}

export function VideoEmbed({ videoId, title = "VIDEO FEED" }: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="my-12 relative group">
      {/* Outer glow container */}
      <div className="absolute -inset-[2px] bg-gradient-to-r from-accent-cyan via-accent-magenta to-accent-cyan rounded opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift bg-[length:200%_auto]" />

      {/* Main container */}
      <div className="relative bg-background border border-accent-cyan/50 overflow-hidden">
        {/* Terminal header */}
        <div className="bg-background-alt border-b border-border px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
              </span>
              <span className="font-mono text-xs text-accent-green uppercase tracking-widest">
                REC
              </span>
            </div>

            {/* Separator */}
            <span className="text-border">|</span>

            {/* Title */}
            <span className="font-mono text-xs text-text-secondary">
              <span className="text-accent-cyan">&gt;</span> {title}
            </span>
          </div>

          {/* Timestamp effect */}
          <div className="font-mono text-xs text-text-secondary hidden sm:flex items-center gap-2">
            <span className="text-accent-magenta">LISBON</span>
            <span className="text-border">::</span>
            <span>2025.IBJJF.EUR</span>
          </div>
        </div>

        {/* Video container with effects */}
        <div className="relative aspect-video bg-black">
          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-accent-cyan/60 z-10 pointer-events-none" />
          <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-accent-cyan/60 z-10 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-accent-cyan/60 z-10 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-accent-cyan/60 z-10 pointer-events-none" />

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 1px,
                rgba(0, 255, 255, 0.1) 1px,
                rgba(0, 255, 255, 0.1) 2px
              )`
            }}
          />

          {/* Loading state */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-background-alt z-20">
              <div className="text-center">
                <div className="font-mono text-accent-cyan text-sm mb-2 animate-pulse">
                  INITIALIZING FEED...
                </div>
                <div className="w-32 h-1 bg-border mx-auto overflow-hidden">
                  <div
                    className="h-full bg-accent-cyan animate-pulse"
                    style={{
                      animation: "loading 1.5s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* YouTube iframe */}
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            onLoad={() => setIsLoaded(true)}
          />

          {/* Vignette effect */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.3) 100%)`
            }}
          />
        </div>

        {/* Footer bar */}
        <div className="bg-background-alt border-t border-border px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
              <span className="text-accent-cyan">SRC:</span> YOUTUBE
            </span>
            <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wider hidden sm:inline">
              <span className="text-accent-magenta">FMT:</span> 1080P
            </span>
          </div>

          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-accent-cyan hover:text-accent-magenta transition-colors uppercase tracking-wider flex items-center gap-1 group/link"
          >
            <span>OPEN EXTERNAL</span>
            <svg
              className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Decorative ASCII corners - outside main container */}
      <div className="absolute -top-3 -left-3 font-mono text-accent-cyan/30 text-xs select-none pointer-events-none">
        ┌──
      </div>
      <div className="absolute -top-3 -right-3 font-mono text-accent-cyan/30 text-xs select-none pointer-events-none">
        ──┐
      </div>
      <div className="absolute -bottom-3 -left-3 font-mono text-accent-cyan/30 text-xs select-none pointer-events-none">
        └──
      </div>
      <div className="absolute -bottom-3 -right-3 font-mono text-accent-cyan/30 text-xs select-none pointer-events-none">
        ──┘
      </div>
    </div>
  );
}
