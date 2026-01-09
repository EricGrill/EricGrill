"use client";

import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

interface FeaturedPostProps {
  post: PostMeta;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <div className="mb-8 relative group">
      {/* Animated border */}
      <div className="absolute -inset-px bg-gradient-to-r from-accent-cyan via-accent-magenta to-accent-cyan bg-[length:200%_100%] animate-gradient-shift opacity-70 blur-sm" />

      <Link href={`/blog/${post.slug}`} className="block">
        <article className="relative cyber-card p-6 md:p-8 bg-background-card hover:bg-background-alt transition-colors">
          {/* Featured badge */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6">
            <span className="font-mono text-xs px-3 py-1.5 bg-accent-magenta text-background font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-background rounded-full animate-pulse" />
              Latest Transmission
            </span>
          </div>

          {/* Terminal header */}
          <div className="font-mono text-xs text-accent-green mb-4 flex items-center gap-2">
            <span className="text-accent-cyan">&gt;</span>
            <span>cat</span>
            <span className="text-text-secondary">./featured/{post.slug}.mdx</span>
          </div>

          {/* Content */}
          <div className="md:flex md:items-start md:gap-8">
            <div className="flex-1">
              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.topics.map((topic) => (
                  <span
                    key={topic}
                    className="topic-pill"
                  >
                    {topic.replace("-", " ")}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="font-mono text-2xl md:text-3xl font-bold text-text-primary group-hover:text-accent-cyan transition-colors mb-4 leading-tight">
                {post.title}
              </h2>

              {/* Meta */}
              <p className="font-mono text-sm text-text-secondary mb-4 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="text-accent-green">&gt;</span>
                  {post.date}
                </span>
                <span className="text-border">|</span>
                <span>{post.readingTime}</span>
              </p>

              {/* Excerpt */}
              <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                {post.excerpt}
              </p>

              {/* Read indicator */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-accent-cyan group-hover:text-accent-magenta transition-colors flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-current animate-pulse" />
                  <span>ACCESS_TRANSMISSION</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </span>
              </div>
            </div>

            {/* Hero Image or Decorative element */}
            <div className="hidden lg:block w-56 h-56 relative flex-shrink-0">
              {post.heroImage ? (
                <div className="absolute inset-0 border border-border overflow-hidden">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-card/80 to-transparent" />
                  {/* Scan line overlay */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent animate-scanline" />
                </div>
              ) : (
                <div className="absolute inset-0 border border-border">
                  {/* Circuit pattern fallback */}
                  <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                    <path
                      d="M10 50 H40 V20 H60 V80 H80 V50 H90"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-accent-cyan"
                    />
                    <path
                      d="M50 10 V30 H30 V70 H70 V30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-accent-magenta"
                    />
                    <circle cx="40" cy="50" r="3" className="fill-accent-cyan" />
                    <circle cx="60" cy="20" r="3" className="fill-accent-magenta" />
                    <circle cx="60" cy="80" r="3" className="fill-accent-cyan" />
                    <circle cx="50" cy="30" r="3" className="fill-accent-green" />
                  </svg>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent animate-scanline" />
                </div>
              )}
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
