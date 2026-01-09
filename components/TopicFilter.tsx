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
    <div className="mb-12">
      <span className="font-mono text-xs text-accent-green mb-4 block">
        {"$ "}<span className="text-text-primary">filter</span> --topic
      </span>
      <div className="flex flex-wrap gap-3">
        <FilterButton
          active={!currentTopic}
          onClick={() => handleFilter(null)}
        >
          All
        </FilterButton>
        {TOPICS.map((topic) => (
          <FilterButton
            key={topic.value}
            active={currentTopic === topic.value}
            onClick={() => handleFilter(topic.value)}
          >
            {topic.label}
          </FilterButton>
        ))}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        font-mono text-sm px-4 py-2 border transition-all duration-300
        ${
          active
            ? "border-accent-cyan bg-accent-cyan text-background shadow-glow-cyan"
            : "border-border text-text-secondary hover:border-accent-cyan hover:text-accent-cyan"
        }
      `}
    >
      [{children}]
    </button>
  );
}
