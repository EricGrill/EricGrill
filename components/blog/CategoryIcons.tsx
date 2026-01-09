"use client";

import type { Topic } from "@/lib/topics";

interface CategoryIconProps {
  topic: Topic;
  size?: number;
  className?: string;
  animated?: boolean;
}

export function CategoryIcon({
  topic,
  size = 24,
  className = "",
  animated = false,
}: CategoryIconProps) {
  const icons: Record<Topic, React.ReactNode> = {
    ai: (
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        className={className}
        fill="none"
      >
        {/* Neural network brain */}
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="1.5"
          className={animated ? "animate-pulse" : ""}
        />
        {/* Neural nodes */}
        <circle cx="24" cy="14" r="3" fill="currentColor" />
        <circle cx="14" cy="24" r="3" fill="currentColor" />
        <circle cx="34" cy="24" r="3" fill="currentColor" />
        <circle cx="24" cy="34" r="3" fill="currentColor" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        {/* Connections */}
        <line x1="24" y1="17" x2="24" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <line x1="17" y1="24" x2="20" y2="24" stroke="currentColor" strokeWidth="1.5" />
        <line x1="28" y1="24" x2="31" y2="24" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24" y1="28" x2="24" y2="31" stroke="currentColor" strokeWidth="1.5" />
        {/* Corner nodes */}
        <circle cx="17" cy="17" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="31" cy="17" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="17" cy="31" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="31" cy="31" r="2" fill="currentColor" opacity="0.6" />
        {/* Diagonal connections */}
        <line x1="19" y1="19" x2="22" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="29" y1="19" x2="26" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="19" y1="29" x2="22" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="29" y1="29" x2="26" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </svg>
    ),

    aviation: (
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        className={className}
        fill="none"
      >
        {/* Aircraft silhouette */}
        <path
          d="M24 6 L27 18 L42 22 L42 26 L27 24 L27 36 L32 40 L32 42 L24 40 L16 42 L16 40 L21 36 L21 24 L6 26 L6 22 L21 18 Z"
          fill="currentColor"
          className={animated ? "animate-float" : ""}
        />
        {/* Cockpit detail */}
        <ellipse cx="24" cy="11" rx="2" ry="4" fill="currentColor" opacity="0.4" />
        {/* Wing highlights */}
        <line x1="8" y1="24" x2="20" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <line x1="40" y1="24" x2="28" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      </svg>
    ),

    "jiu-jitsu": (
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        className={className}
        fill="none"
      >
        {/* Belt knot */}
        <rect
          x="8"
          y="20"
          width="32"
          height="8"
          rx="1"
          fill="currentColor"
          className={animated ? "animate-pulse" : ""}
        />
        {/* Belt ends */}
        <path
          d="M16 28 L12 40 L18 40 L20 28"
          fill="currentColor"
        />
        <path
          d="M32 28 L36 40 L30 40 L28 28"
          fill="currentColor"
        />
        {/* Knot details */}
        <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.8" />
        <rect x="20" y="16" width="8" height="4" fill="currentColor" opacity="0.6" />
        {/* Stripes */}
        <rect x="8" y="22" width="8" height="1" fill="currentColor" opacity="0.3" />
        <rect x="32" y="22" width="8" height="1" fill="currentColor" opacity="0.3" />
        <rect x="8" y="25" width="8" height="1" fill="currentColor" opacity="0.3" />
        <rect x="32" y="25" width="8" height="1" fill="currentColor" opacity="0.3" />
      </svg>
    ),

    blockchain: (
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        className={className}
        fill="none"
      >
        {/* Chain blocks */}
        <rect
          x="6"
          y="18"
          width="10"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className={animated ? "animate-pulse" : ""}
        />
        <rect
          x="19"
          y="18"
          width="10"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <rect
          x="32"
          y="18"
          width="10"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Chain links */}
        <line x1="16" y1="24" x2="19" y2="24" stroke="currentColor" strokeWidth="2" />
        <line x1="29" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="2" />
        {/* Block hashes */}
        <line x1="8" y1="22" x2="14" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="8" y1="24" x2="12" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="8" y1="26" x2="14" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="21" y1="22" x2="27" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="21" y1="24" x2="25" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="21" y1="26" x2="27" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="34" y1="22" x2="40" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="34" y1="24" x2="38" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="34" y1="26" x2="40" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    ),

    programming: (
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        className={className}
        fill="none"
      >
        {/* Terminal window */}
        <rect
          x="6"
          y="10"
          width="36"
          height="28"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Title bar */}
        <line x1="6" y1="16" x2="42" y2="16" stroke="currentColor" strokeWidth="1" />
        {/* Window buttons */}
        <circle cx="11" cy="13" r="1.5" fill="currentColor" />
        <circle cx="16" cy="13" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="21" cy="13" r="1.5" fill="currentColor" opacity="0.3" />
        {/* Code lines */}
        <g className={animated ? "animate-pulse" : ""}>
          <line x1="10" y1="22" x2="14" y2="22" stroke="currentColor" strokeWidth="1.5" />
          <line x1="16" y1="22" x2="30" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          <line x1="12" y1="26" x2="26" y2="26" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <line x1="12" y1="30" x2="20" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
          <line x1="10" y1="34" x2="18" y2="34" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        </g>
        {/* Cursor */}
        <rect
          x="32"
          y="21"
          width="2"
          height="4"
          fill="currentColor"
          className="animate-blink"
        />
      </svg>
    ),
  };

  return icons[topic] || null;
}

// Export all icons for direct use
export const AIIcon = (props: Omit<CategoryIconProps, "topic">) => (
  <CategoryIcon topic="ai" {...props} />
);

export const AviationIcon = (props: Omit<CategoryIconProps, "topic">) => (
  <CategoryIcon topic="aviation" {...props} />
);

export const JiuJitsuIcon = (props: Omit<CategoryIconProps, "topic">) => (
  <CategoryIcon topic="jiu-jitsu" {...props} />
);

export const BlockchainIcon = (props: Omit<CategoryIconProps, "topic">) => (
  <CategoryIcon topic="blockchain" {...props} />
);

export const ProgrammingIcon = (props: Omit<CategoryIconProps, "topic">) => (
  <CategoryIcon topic="programming" {...props} />
);
