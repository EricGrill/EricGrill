import { Suspense } from "react";
import { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { BlogExplorer } from "@/components/blog";

export const metadata: Metadata = {
  title: "Blog | Eric Grill",
  description:
    "Thoughts and insights on AI, aviation, jiu jitsu, blockchain, and programming. Explore articles, tutorials, and deep dives into technology and life.",
  openGraph: {
    title: "Blog | Eric Grill",
    description:
      "Thoughts and insights on AI, aviation, jiu jitsu, blockchain, and programming.",
    url: "https://ericgrill.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Eric Grill",
    description:
      "Thoughts and insights on AI, aviation, jiu jitsu, blockchain, and programming.",
  },
};

function BlogLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-48 bg-background-alt" />
        <div className="h-12 w-96 bg-background-alt" />
        <div className="h-4 w-64 bg-background-alt" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="cyber-card p-4">
            <div className="h-3 w-20 bg-background-alt mb-2" />
            <div className="h-8 w-16 bg-background-alt" />
          </div>
        ))}
      </div>

      {/* Featured skeleton */}
      <div className="cyber-card p-8">
        <div className="h-4 w-32 bg-background-alt mb-4" />
        <div className="h-8 w-3/4 bg-background-alt mb-4" />
        <div className="h-4 w-1/2 bg-background-alt" />
      </div>

      {/* Control panel skeleton */}
      <div className="cyber-card p-6">
        <div className="h-12 bg-background-alt mb-4" />
        <div className="flex gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 w-24 bg-background-alt" />
          ))}
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="cyber-card p-6">
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-16 bg-background-alt" />
              <div className="h-6 w-20 bg-background-alt" />
            </div>
            <div className="h-6 w-full bg-background-alt mb-3" />
            <div className="h-4 w-32 bg-background-alt mb-3" />
            <div className="h-16 w-full bg-background-alt" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="py-16 px-6 md:px-12 relative min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 circuit-bg opacity-10 pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent-magenta/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-64 h-64 bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <Suspense fallback={<BlogLoading />}>
          <BlogExplorer posts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
