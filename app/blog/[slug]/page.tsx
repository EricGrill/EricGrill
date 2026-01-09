import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SocialShare, CodeBlock, Pre, VideoEmbed } from "@/components/blog";

// Custom MDX components with copy-to-clipboard for code blocks
const mdxComponents = {
  pre: Pre,
  code: CodeBlock,
  VideoEmbed: VideoEmbed,
};

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

  const siteUrl = "https://ericgrill.com";
  const ogImage = post.heroImage
    ? `${siteUrl}${post.heroImage}`
    : `${siteUrl}/og-default.png`;

  return {
    title: `${post.title} | Eric Grill`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${siteUrl}/blog/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: ["Eric Grill"],
      tags: post.topics,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 px-6 md:px-12 relative">
      {/* Background */}
      <div className="absolute inset-0 circuit-bg opacity-5 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-12">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-accent-cyan transition-colors mb-8"
          >
            <span>←</span>
            <span>back_to_archive</span>
          </Link>

          {/* Topic tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.topics.map((topic) => (
              <Link
                key={topic}
                href={`/blog?topic=${topic}`}
                className="topic-pill"
              >
                {topic.replace("-", " ")}
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 font-mono text-sm text-text-secondary">
            <span className="text-accent-green">&gt;</span>
            <span>{post.date}</span>
            <span className="text-border">|</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose-cyber prose prose-lg max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          {/* Tags again */}
          <div className="mb-8">
            <span className="font-mono text-xs text-text-secondary block mb-3">
              {"// "}topics
            </span>
            <div className="flex flex-wrap gap-2">
              {post.topics.map((topic) => (
                <Link
                  key={topic}
                  href={`/blog?topic=${topic}`}
                  className="topic-pill"
                >
                  {topic.replace("-", " ")}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="p-8 border border-border bg-background-card/50 backdrop-blur-sm">
            <span className="font-mono text-sm text-accent-green mb-4 block">
              {"$ "}<span className="text-text-primary">subscribe</span> --newsletter
            </span>
            <h3 className="font-mono text-xl font-bold text-text-primary mb-2">
              Enjoyed this transmission?
            </h3>
            <p className="text-text-secondary mb-6">
              Subscribe to get notified when I publish new posts.
            </p>
            <NewsletterForm />
          </div>

          {/* Social Share */}
          <SocialShare
            url={`https://ericgrill.com/blog/${slug}`}
            title={post.title}
          />

          {/* Navigation */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-sm text-accent-cyan hover:text-accent-magenta transition-colors"
            >
              <span>←</span>
              <span>view_all_transmissions</span>
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
