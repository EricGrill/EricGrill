"use client";

import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostListProps {
  posts: PostMeta[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <article
          key={post.slug}
          className="cyber-card group fade-in-up opacity-0"
          style={{
            animationDelay: `${index * 0.03}s`,
            animationFillMode: "forwards",
          }}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="block p-4 md:p-6 md:flex md:items-center md:gap-6"
          >
            {/* Date column */}
            <div className="hidden md:block w-28 flex-shrink-0">
              <span className="font-mono text-sm text-text-secondary">
                {post.date}
              </span>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-border group-hover:bg-accent-cyan transition-colors" />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {/* Mobile date */}
                <span className="md:hidden font-mono text-xs text-text-secondary">
                  {post.date}
                </span>
                <span className="md:hidden text-border">|</span>

                {/* Topics */}
                {post.topics.map((topic) => (
                  <span
                    key={topic}
                    className="font-mono text-xs px-2 py-0.5 border border-accent-cyan/50 text-accent-cyan/80"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <h2 className="font-mono text-base md:text-lg font-semibold text-text-primary group-hover:text-accent-cyan transition-colors truncate">
                {post.title}
              </h2>

              <p className="text-text-secondary text-sm mt-1 line-clamp-1 hidden md:block">
                {post.excerpt}
              </p>
            </div>

            {/* Reading time & arrow */}
            <div className="hidden md:flex items-center gap-4 flex-shrink-0">
              <span className="font-mono text-xs text-text-secondary">
                {post.readingTime}
              </span>
              <span className="font-mono text-accent-cyan group-hover:text-accent-magenta group-hover:translate-x-1 transition-all">
                →
              </span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
