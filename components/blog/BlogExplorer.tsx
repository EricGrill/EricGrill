"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { PostMeta } from "@/lib/posts";
import { TOPICS, type Topic } from "@/lib/topics";
import { BlogSearch } from "./BlogSearch";
import { ViewModeSelector, type ViewMode } from "./ViewModeSelector";
import { CategoryOrbit } from "./CategoryOrbit";
import { PostGrid } from "./PostGrid";
import { PostList } from "./PostList";
import { PostMatrix } from "./PostMatrix";
import { BlogStats } from "./BlogStats";
import { FeaturedPost } from "./FeaturedPost";

interface BlogExplorerProps {
  posts: PostMeta[];
}

export function BlogExplorer({ posts }: BlogExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>(() => {
    const topic = searchParams.get("topic") as Topic | null;
    return topic ? [topic] : [];
  });
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.topics.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Filter by topics
    if (selectedTopics.length > 0) {
      result = result.filter((post) =>
        selectedTopics.some((topic) => post.topics.includes(topic))
      );
    }

    // Sort
    if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [posts, searchQuery, selectedTopics, sortBy]);

  // Get featured post (most recent or pinned)
  const featuredPost = posts[0];
  const regularPosts = filteredPosts.filter((p) => p.slug !== featuredPost?.slug);

  // Topic counts for visualization
  const topicCounts = useMemo(() => {
    const counts: Record<Topic, number> = {} as Record<Topic, number>;
    TOPICS.forEach((t) => {
      counts[t.value] = posts.filter((p) => p.topics.includes(t.value)).length;
    });
    return counts;
  }, [posts]);

  const handleTopicToggle = (topic: Topic) => {
    setSelectedTopics((prev) => {
      const newTopics = prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic];

      // Update URL
      if (newTopics.length === 1) {
        router.push(`/blog?topic=${newTopics[0]}`, { scroll: false });
      } else if (newTopics.length === 0) {
        router.push("/blog", { scroll: false });
      }

      return newTopics;
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTopics([]);
    router.push("/blog", { scroll: false });
  };

  const hasActiveFilters = searchQuery.trim() || selectedTopics.length > 0;

  return (
    <div className={`transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      {/* Terminal Header */}
      <div className="mb-8">
        <div className="font-mono text-xs text-accent-green mb-2 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-accent-green rounded-full animate-pulse" />
          <span>TRANSMISSION_ARCHIVE v2.0</span>
        </div>
        <h2 className="font-mono text-4xl md:text-5xl font-bold text-text-primary mb-3">
          <span className="text-accent-cyan">&gt;</span> Blog{" "}
          <span className="text-accent-magenta">Command</span>{" "}
          <span className="text-accent-cyan">Center</span>
        </h2>
        <p className="text-text-secondary max-w-2xl">
          Navigate through {posts.length} transmissions on AI, aviation, jiu-jitsu,
          blockchain, and the art of building things that matter.
        </p>
      </div>

      {/* Stats Dashboard */}
      <BlogStats posts={posts} topicCounts={topicCounts} />

      {/* Featured Post */}
      {featuredPost && !hasActiveFilters && (
        <FeaturedPost post={featuredPost} />
      )}

      {/* Control Panel */}
      <div className="cyber-card p-4 md:p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search */}
          <div className="flex-1">
            <BlogSearch value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* View Mode & Sort */}
          <div className="flex items-center gap-4">
            <ViewModeSelector mode={viewMode} onChange={setViewMode} />

            <div className="h-8 w-px bg-border" />

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-text-secondary">sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "title")}
                className="cyber-input text-sm py-1 px-2 bg-background"
              >
                <option value="date">latest</option>
                <option value="title">a-z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Orbit */}
        <div className="mt-6 pt-6 border-t border-border">
          <CategoryOrbit
            topicCounts={topicCounts}
            selectedTopics={selectedTopics}
            onTopicToggle={handleTopicToggle}
          />
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-4">
            <span className="font-mono text-xs text-text-secondary">active_filters:</span>
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <span className="font-mono text-xs px-2 py-1 bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30">
                  search: "{searchQuery}"
                </span>
              )}
              {selectedTopics.map((topic) => (
                <span
                  key={topic}
                  className="font-mono text-xs px-2 py-1 bg-accent-magenta/10 text-accent-magenta border border-accent-magenta/30"
                >
                  {topic}
                </span>
              ))}
            </div>
            <button
              onClick={clearFilters}
              className="font-mono text-xs text-text-secondary hover:text-accent-cyan transition-colors ml-auto"
            >
              [clear_all]
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="font-mono text-sm text-text-secondary mb-6 flex items-center gap-2">
        <span className="text-accent-green">&gt;</span>
        <span>
          displaying{" "}
          <span className="text-accent-cyan">{filteredPosts.length}</span> of{" "}
          <span className="text-accent-cyan">{posts.length}</span> transmissions
        </span>
        {hasActiveFilters && (
          <span className="text-accent-magenta">[filtered]</span>
        )}
      </div>

      {/* Posts Display */}
      {filteredPosts.length === 0 ? (
        <div className="cyber-card p-12 text-center">
          <div className="font-mono text-6xl text-accent-magenta mb-4">404</div>
          <span className="font-mono text-accent-magenta text-lg block mb-2">
            {"[ "} no_matching_transmissions {" ]"}
          </span>
          <p className="text-text-secondary">
            No posts match your current filters. Try adjusting your search or clearing filters.
          </p>
          <button
            onClick={clearFilters}
            className="cyber-button mt-6"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          {viewMode === "grid" && (
            <PostGrid posts={hasActiveFilters ? filteredPosts : regularPosts} />
          )}
          {viewMode === "list" && (
            <PostList posts={hasActiveFilters ? filteredPosts : regularPosts} />
          )}
          {viewMode === "matrix" && (
            <PostMatrix posts={hasActiveFilters ? filteredPosts : regularPosts} />
          )}
        </>
      )}
    </div>
  );
}
