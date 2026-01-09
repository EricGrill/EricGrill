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
    <div className="py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">
          Blog
        </h1>

        <Suspense fallback={<div>Loading...</div>}>
          <TopicFilter />
        </Suspense>

        {posts.length === 0 ? (
          <p className="text-text-secondary">No posts yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
