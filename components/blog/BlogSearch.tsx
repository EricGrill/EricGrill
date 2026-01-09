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
      {/* Terminal prefix */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm flex items-center gap-1 pointer-events-none">
        <span className={`transition-colors ${isFocused ? "text-accent-cyan" : "text-accent-green"}`}>
          $
        </span>
        <span className="text-text-secondary">search</span>
        <span className={`transition-colors ${isFocused ? "text-accent-cyan" : "text-text-secondary"}`}>
          --query
        </span>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="type to filter..."
        className={`
          w-full cyber-input pl-40 pr-20 py-3 font-mono text-sm
          ${isFocused ? "border-accent-cyan shadow-glow-cyan" : ""}
        `}
      />

      {/* Keyboard shortcut hint */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {value && (
          <button
            onClick={() => onChange("")}
            className="font-mono text-xs text-text-secondary hover:text-accent-cyan mr-2 transition-colors"
          >
            [clear]
          </button>
        )}
        <kbd className="hidden md:inline-block font-mono text-xs px-1.5 py-0.5 bg-background-alt border border-border text-text-secondary">
          {navigator?.platform?.includes("Mac") ? "⌘" : "Ctrl"}
        </kbd>
        <kbd className="hidden md:inline-block font-mono text-xs px-1.5 py-0.5 bg-background-alt border border-border text-text-secondary">
          K
        </kbd>
      </div>

      {/* Typing cursor effect when focused */}
      {isFocused && !value && (
        <span className="absolute left-[10.5rem] top-1/2 -translate-y-1/2 font-mono text-accent-cyan animate-blink">
          _
        </span>
      )}
    </div>
  );
}
