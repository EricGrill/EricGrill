import { Suspense } from "react";
import { getAllPosts, getPostsByTopic, type Topic } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { TopicFilter } from "@/components/TopicFilter";

interface BlogPageProps {
  searchParams: Promise<{ topic?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const topic = params.topic as Topic | undefined;
  const posts = topic ? getPostsByTopic(topic) : getAllPosts();

  return (
    <div className="py-16 px-6 md:px-12 relative min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 circuit-bg opacity-10 pointer-events-none" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent-magenta/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-sm text-accent-cyan mb-4 block">
            {"// "}blog_archive
          </span>
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-text-primary mb-4">
            All <span className="text-accent-magenta">Transmissions</span>
          </h1>
          <p className="text-text-secondary max-w-xl">
            Thoughts on building, flying, grappling, and the future of technology.
          </p>
        </div>

        {/* Filter */}
        <Suspense
          fallback={
            <div className="mb-12">
              <div className="h-4 w-32 bg-background-alt animate-pulse mb-4" />
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-20 bg-background-alt animate-pulse"
                  />
                ))}
              </div>
            </div>
          }
        >
          <TopicFilter />
        </Suspense>

        {/* Posts grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <span className="font-mono text-accent-magenta text-lg">
              {"[ "} no_transmissions_found {" ]"}
            </span>
            <p className="text-text-secondary mt-4">
              {topic
                ? `No posts found for topic "${topic}". Try a different filter.`
                : "No posts yet. Check back soon!"}
            </p>
          </div>
        ) : (
          <>
            <div className="font-mono text-xs text-text-secondary mb-6">
              <span className="text-accent-green">&gt;</span> found{" "}
              <span className="text-accent-cyan">{posts.length}</span>{" "}
              transmission{posts.length !== 1 ? "s" : ""}
              {topic && (
                <>
                  {" "}tagged <span className="text-accent-magenta">{topic}</span>
                </>
              )}
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <div
                  key={post.slug}
                  className="fade-in-up opacity-0"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
