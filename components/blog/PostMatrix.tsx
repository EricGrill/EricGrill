"use client";

import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostMatrixProps {
  posts: PostMeta[];
}

// Topic to color mapping
const TOPIC_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  ai: {
    bg: "bg-accent-cyan/10",
    text: "text-accent-cyan",
    border: "border-accent-cyan/30",
  },
  aviation: {
    bg: "bg-accent-magenta/10",
    text: "text-accent-magenta",
    border: "border-accent-magenta/30",
  },
  "jiu-jitsu": {
    bg: "bg-accent-green/10",
    text: "text-accent-green",
    border: "border-accent-green/30",
  },
  blockchain: {
    bg: "bg-accent-cyan/10",
    text: "text-accent-cyan",
    border: "border-accent-cyan/30",
  },
  programming: {
    bg: "bg-accent-magenta/10",
    text: "text-accent-magenta",
    border: "border-accent-magenta/30",
  },
};

export function PostMatrix({ posts }: PostMatrixProps) {
  return (
    <div className="space-y-1">
      {/* Matrix header */}
      <div className="font-mono text-xs text-text-secondary p-2 border-b border-border flex items-center gap-4">
        <span className="w-24">DATE</span>
        <span className="flex-1">TITLE</span>
        <span className="w-20 text-right">TOPIC</span>
        <span className="w-16 text-right">TIME</span>
      </div>

      {/* Matrix rows */}
      {posts.map((post, index) => {
        const primaryTopic = post.topics[0];
        const colors = TOPIC_COLORS[primaryTopic] || TOPIC_COLORS.ai;

        return (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`
              block p-2 border-b border-border/50
              hover:bg-background-alt hover:border-accent-cyan/30
              transition-all duration-150
              fade-in-up opacity-0
            `}
            style={{
              animationDelay: `${index * 0.02}s`,
              animationFillMode: "forwards",
            }}
          >
            <div className="font-mono text-sm flex items-center gap-4">
              {/* Date */}
              <span className="w-24 text-text-secondary text-xs">
                {post.date}
              </span>

              {/* Title */}
              <span className="flex-1 text-text-primary truncate hover:text-accent-cyan transition-colors">
                {post.title}
              </span>

              {/* Topic indicator */}
              <span
                className={`
                  w-20 text-right text-xs uppercase truncate
                  ${colors.text}
                `}
              >
                {primaryTopic}
              </span>

              {/* Reading time */}
              <span className="w-16 text-right text-xs text-text-secondary">
                {post.readingTime.replace(" read", "").replace(" min", "m")}
              </span>
            </div>
          </Link>
        );
      })}

      {/* Matrix footer */}
      <div className="font-mono text-xs text-text-secondary p-2 pt-4 flex items-center gap-2">
        <span className="text-accent-green">&gt;</span>
        <span>END_OF_TRANSMISSION_LOG</span>
        <span className="text-border">|</span>
        <span>{posts.length} entries</span>
      </div>
    </div>
  );
}
