"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TOPICS } from "@/lib/topics";

export function TopicFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTopic = searchParams.get("topic");

  const handleFilter = (topic: string | null) => {
    if (topic) {
      router.push(`/blog?topic=${topic}`);
    } else {
      router.push("/blog");
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => handleFilter(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !currentTopic
            ? "bg-accent text-white"
            : "bg-background-alt text-text-secondary hover:text-accent"
        }`}
      >
        All
      </button>
      {TOPICS.map((topic) => (
        <button
          key={topic.value}
          onClick={() => handleFilter(topic.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentTopic === topic.value
              ? "bg-accent text-white"
              : "bg-background-alt text-text-secondary hover:text-accent"
          }`}
        >
          {topic.label}
        </button>
      ))}
    </div>
  );
}
