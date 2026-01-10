import Link from "next/link";
import type { PostMeta, Topic } from "@/lib/posts";

interface RelatedPostsProps {
  currentSlug: string;
  currentTopics: Topic[];
  allPosts: PostMeta[];
  limit?: number;
}

export function RelatedPosts({
  currentSlug,
  currentTopics,
  allPosts,
  limit = 3,
}: RelatedPostsProps) {
  // Find posts with overlapping topics, excluding current post
  const related = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      ...post,
      relevance: post.topics.filter((t) => currentTopics.includes(t)).length,
    }))
    .filter((post) => post.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance || b.date.localeCompare(a.date))
    .slice(0, limit);

  if (related.length === 0) return null;

  return (
    <aside className="mt-12 pt-8 border-t border-border">
      <span className="font-mono text-xs text-accent-cyan block mb-4">
        {"// "}related_transmissions
      </span>
      <div className="grid gap-4 md:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-4 border border-border hover:border-accent-cyan bg-background-card transition-colors group"
          >
            <h3 className="font-mono text-sm text-text-primary group-hover:text-accent-cyan transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 font-mono text-xs text-text-secondary">
              <span>{post.readingTime}</span>
              <span className="text-border">|</span>
              <span>{post.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
