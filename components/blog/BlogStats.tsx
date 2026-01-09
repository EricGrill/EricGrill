"use client";

import type { PostMeta } from "@/lib/posts";
import type { Topic } from "@/lib/topics";

interface BlogStatsProps {
  posts: PostMeta[];
  topicCounts: Record<Topic, number>;
}

export function BlogStats({ posts, topicCounts }: BlogStatsProps) {
  // Calculate stats
  const totalPosts = posts.length;
  const totalReadingTime = posts.reduce((acc, post) => {
    const minutes = parseInt(post.readingTime.replace(/\D/g, "")) || 0;
    return acc + minutes;
  }, 0);
  const topTopic = Object.entries(topicCounts).sort((a, b) => b[1] - a[1])[0];
  const avgReadingTime = totalPosts > 0 ? Math.round(totalReadingTime / totalPosts) : 0;

  const stats = [
    {
      label: "TRANSMISSIONS",
      value: totalPosts,
      suffix: "",
      color: "cyan",
    },
    {
      label: "READING_TIME",
      value: totalReadingTime,
      suffix: "min",
      color: "magenta",
    },
    {
      label: "TOP_CATEGORY",
      value: topTopic?.[0]?.toUpperCase().replace("-", "_") || "N/A",
      suffix: "",
      color: "green",
    },
    {
      label: "AVG_LENGTH",
      value: avgReadingTime,
      suffix: "min",
      color: "cyan",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="cyber-card p-4 group"
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <div className="font-mono text-xs text-text-secondary mb-1 flex items-center gap-1">
            <span className={`text-accent-${stat.color}`}>$</span>
            <span>{stat.label}</span>
          </div>
          <div
            className={`font-mono text-2xl md:text-3xl font-bold text-accent-${stat.color} group-hover:animate-glitch`}
          >
            {typeof stat.value === "number" ? (
              <>
                {stat.value}
                {stat.suffix && (
                  <span className="text-sm text-text-secondary ml-1">
                    {stat.suffix}
                  </span>
                )}
              </>
            ) : (
              <span className="text-lg">{stat.value}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
