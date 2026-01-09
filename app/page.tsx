import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { NewsletterForm } from "@/components/NewsletterForm";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6">
            Eric Grill
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl">
            Builder. Pilot. Grappler. Writing about AI, aviation, jiu jitsu, blockchain, and programming.
          </p>
          <Link
            href="/blog"
            className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Read the blog
          </Link>
        </div>
      </section>

      {/* Featured Posts Section */}
      {posts.length > 0 && (
        <section className="py-16 px-6 md:px-12 bg-background-alt">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                Latest
              </h2>
              <Link
                href="/blog"
                className="text-accent hover:underline"
              >
                View all posts →
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Stay in the loop
          </h2>
          <p className="text-text-secondary mb-6">
            Get notified when I publish new posts. No spam, unsubscribe anytime.
          </p>
          <div className="flex justify-center">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
