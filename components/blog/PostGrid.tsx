"use client";

import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

interface PostGridProps {
  posts: PostMeta[];
}

export function PostGrid({ posts }: PostGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <article
          key={post.slug}
          className="cyber-card group overflow-hidden h-full flex flex-col fade-in-up opacity-0"
          style={{
            animationDelay: `${index * 0.05}s`,
            animationFillMode: "forwards",
          }}
        >
          <Link href={`/blog/${post.slug}`} className="block flex-1 flex flex-col">
            {/* Hero Image */}
            {post.heroImage && (
              <div className="relative h-40 overflow-hidden border-b border-border">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-card to-transparent" />
              </div>
            )}

            <div className="p-6 flex-1 flex flex-col">
              {/* Topic tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.topics.map((topic) => (
                  <span key={topic} className="topic-pill">
                    {topic.replace("-", " ")}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="font-mono text-lg font-semibold text-text-primary group-hover:text-accent-cyan transition-colors mb-3 line-clamp-2">
                {post.title}
              </h2>

              {/* Meta */}
              <p className="font-mono text-xs text-text-secondary mb-3 flex items-center gap-2">
                <span className="text-accent-green">&gt;</span>
                {post.date}
                <span className="text-border">|</span>
                {post.readingTime}
              </p>

              {/* Excerpt */}
              <p className="text-text-secondary text-sm flex-1 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Read more indicator */}
              <div className="mt-4 pt-4 border-t border-border">
                <span className="font-mono text-xs text-accent-cyan group-hover:text-accent-magenta transition-colors flex items-center gap-2">
                  <span>read_more</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
