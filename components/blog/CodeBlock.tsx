"use client";

import { useState, HTMLAttributes, DetailedHTMLProps } from "react";

type CodeBlockProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const getCodeContent = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(getCodeContent).join("");
    if (node && typeof node === "object" && "props" in node) {
      return getCodeContent((node as React.ReactElement).props.children);
    }
    return "";
  };

  const handleCopy = async () => {
    const code = getCodeContent(children);
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract language from className (e.g., "language-typescript")
  const language = className?.replace("language-", "") || "";

  return (
    <div className="relative group">
      {/* Language badge */}
      {language && (
        <span className="absolute top-2 left-4 text-xs font-mono text-text-secondary opacity-60">
          {language}
        </span>
      )}

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 text-xs font-mono rounded border transition-all duration-200
          opacity-0 group-hover:opacity-100
          bg-background-alt border-border text-text-secondary
          hover:border-accent-cyan hover:text-accent-cyan
          focus:outline-none focus:border-accent-cyan"
        aria-label="Copy code"
      >
        {copied ? (
          <span className="text-accent-green">Copied!</span>
        ) : (
          <span className="flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy
          </span>
        )}
      </button>

      {/* Code content */}
      <code className={className}>{children}</code>
    </div>
  );
}

// Pre wrapper that contains the CodeBlock
type PreProps = DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>;

export function Pre({ children, ...props }: PreProps) {
  return <pre className="relative" {...props}>{children}</pre>;
}
