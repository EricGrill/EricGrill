"use client";

import { TOPICS, type Topic } from "@/lib/topics";
import { CategoryIcon } from "./CategoryIcons";

interface CategoryOrbitProps {
  topicCounts: Record<Topic, number>;
  selectedTopics: Topic[];
  onTopicToggle: (topic: Topic) => void;
}

// Topic colors
const TOPIC_CONFIG: Record<Topic, { color: string; glow: string }> = {
  ai: {
    color: "cyan",
    glow: "var(--glow-cyan)",
  },
  aviation: {
    color: "magenta",
    glow: "var(--glow-magenta)",
  },
  "jiu-jitsu": {
    color: "green",
    glow: "rgba(0, 255, 136, 0.3)",
  },
  blockchain: {
    color: "cyan",
    glow: "var(--glow-cyan)",
  },
  programming: {
    color: "magenta",
    glow: "var(--glow-magenta)",
  },
};

export function CategoryOrbit({
  topicCounts,
  selectedTopics,
  onTopicToggle,
}: CategoryOrbitProps) {
  const totalPosts = Object.values(topicCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-xs text-accent-green">$</span>
        <span className="font-mono text-xs text-text-secondary">filter --topics</span>
        <span className="font-mono text-xs text-text-secondary ml-auto">
          [multi-select enabled]
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {TOPICS.map((topic) => {
          const config = TOPIC_CONFIG[topic.value];
          const count = topicCounts[topic.value];
          const isSelected = selectedTopics.includes(topic.value);
          const percentage = totalPosts > 0 ? Math.round((count / totalPosts) * 100) : 0;

          return (
            <button
              key={topic.value}
              onClick={() => onTopicToggle(topic.value)}
              className={`
                group relative overflow-hidden
                font-mono text-sm px-4 py-3 border transition-all duration-300
                ${
                  isSelected
                    ? config.color === "cyan"
                      ? "border-accent-cyan bg-accent-cyan/20 text-accent-cyan shadow-glow-cyan"
                      : config.color === "magenta"
                      ? "border-accent-magenta bg-accent-magenta/20 text-accent-magenta shadow-glow-magenta"
                      : "border-accent-green bg-accent-green/20 text-accent-green"
                    : "border-border text-text-secondary hover:border-current"
                }
              `}
              style={{
                ["--topic-glow" as string]: config.glow,
              }}
            >
              {/* Progress bar background */}
              <div
                className={`
                  absolute inset-0 transition-all duration-500
                  ${
                    isSelected
                      ? config.color === "cyan"
                        ? "bg-accent-cyan/10"
                        : config.color === "magenta"
                        ? "bg-accent-magenta/10"
                        : "bg-accent-green/10"
                      : "bg-transparent group-hover:bg-white/5"
                  }
                `}
                style={{ width: `${percentage}%` }}
              />

              {/* Content */}
              <span className="relative flex items-center gap-2">
                <CategoryIcon topic={topic.value} size={20} animated={isSelected} />
                <span className="uppercase tracking-wider">{topic.label}</span>
                <span
                  className={`
                    ml-1 text-xs px-1.5 py-0.5 border
                    ${
                      isSelected
                        ? "border-current bg-current/20"
                        : "border-border"
                    }
                  `}
                >
                  {count}
                </span>
              </span>

              {/* Selection indicator */}
              {isSelected && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-current rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Visual topic distribution bar */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs text-text-secondary">topic_distribution:</span>
        </div>
        <div className="h-2 bg-background-alt flex overflow-hidden">
          {TOPICS.map((topic) => {
            const config = TOPIC_CONFIG[topic.value];
            const count = topicCounts[topic.value];
            const percentage = totalPosts > 0 ? (count / totalPosts) * 100 : 0;

            return (
              <div
                key={topic.value}
                className={`
                  h-full transition-all duration-500
                  ${config.color === "cyan" ? "bg-accent-cyan" : config.color === "magenta" ? "bg-accent-magenta" : "bg-accent-green"}
                  ${selectedTopics.includes(topic.value) ? "opacity-100" : selectedTopics.length > 0 ? "opacity-30" : "opacity-70"}
                `}
                style={{ width: `${percentage}%` }}
                title={`${topic.label}: ${count} posts (${Math.round(percentage)}%)`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
