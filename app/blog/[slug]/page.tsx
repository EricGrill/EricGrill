import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Eric Grill`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.topics.map((topic) => (
              <Link
                key={topic}
                href={`/blog?topic=${topic}`}
                className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded hover:bg-accent/20 transition-colors"
              >
                {topic.replace("-", " ")}
              </Link>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {post.title}
          </h1>
          <p className="text-text-secondary">
            {post.date} · {post.readingTime}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none prose-headings:text-text-primary prose-p:text-text-primary prose-a:text-accent prose-strong:text-text-primary prose-code:text-accent prose-code:bg-background-alt prose-code:px-1 prose-code:rounded">
          <MDXRemote source={post.content} />
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/blog"
            className="text-accent hover:underline"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    </article>
  );
}
