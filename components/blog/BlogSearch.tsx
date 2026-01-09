"use client";

import { useRef, useEffect, useState } from "react";

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function BlogSearch({ value, onChange }: BlogSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative group">
      {/* Search icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className={`w-5 h-5 transition-colors ${isFocused ? "text-accent-cyan" : "text-text-secondary"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search posts..."
        className={`
          w-full cyber-input pl-12 pr-24 py-3 font-mono text-sm
          placeholder:text-text-secondary/50
          ${isFocused ? "border-accent-cyan shadow-glow-cyan" : ""}
        `}
      />

      {/* Right side: clear button and keyboard hint */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {value && (
          <button
            onClick={() => onChange("")}
            className="font-mono text-xs text-text-secondary hover:text-accent-cyan transition-colors"
          >
            [clear]
          </button>
        )}
        <div className="hidden md:flex items-center gap-1">
          <kbd className="font-mono text-xs px-1.5 py-0.5 bg-background-alt border border-border text-text-secondary">
            {typeof navigator !== "undefined" && navigator?.platform?.includes("Mac") ? "⌘" : "Ctrl"}
          </kbd>
          <kbd className="font-mono text-xs px-1.5 py-0.5 bg-background-alt border border-border text-text-secondary">
            K
          </kbd>
        </div>
      </div>
    </div>
  );
}
