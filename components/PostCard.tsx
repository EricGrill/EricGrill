import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex flex-wrap gap-2 mb-2">
          {post.topics.map((topic) => (
            <span
              key={topic}
              className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded"
            >
              {topic.replace("-", " ")}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-semibold text-text-primary group-hover:text-accent transition-colors mb-2">
          {post.title}
        </h2>
        <p className="text-text-secondary text-sm mb-2">
          {post.date} · {post.readingTime}
        </p>
        <p className="text-text-secondary">{post.excerpt}</p>
      </Link>
    </article>
  );
}
