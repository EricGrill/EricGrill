import { Metadata } from "next";
import { EricEngineFullPage } from "@/components/EricEngineFullPage";

export const metadata: Metadata = {
  title: "Ask Eric | Eric Grill",
  description:
    "Ask questions directly to Eric Grill's AI-powered knowledge base. Get insights on startups, Bitcoin, learning, and building things that matter.",
  openGraph: {
    title: "Ask Eric | Eric Grill",
    description:
      "Ask questions directly to Eric Grill's AI-powered knowledge base. Get insights on startups, Bitcoin, learning, and building things that matter.",
  },
};

export default function AskEricPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] relative">
      {/* Background effects */}
      <div className="absolute inset-0 circuit-bg opacity-20" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent-magenta/5 rounded-full blur-[150px]" />

      <div className="relative z-10 py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="font-mono text-sm text-accent-cyan mb-2 block">
              {"// "}query_the_mind
            </span>
            <h1 className="font-mono text-4xl md:text-5xl font-bold text-text-primary mb-4">
              <span className="text-accent-cyan">{">"}</span> Ask{" "}
              <span className="text-accent-magenta">Eric</span>
            </h1>
            <p className="text-text-secondary max-w-xl mx-auto text-lg">
              A queryable model of my thinking. Ask questions, simulate
              decisions, explore how my views evolved.
            </p>
          </div>

          {/* Chat Interface */}
          <EricEngineFullPage />

          {/* Hint */}
          <p className="text-center text-xs text-text-secondary mt-6 font-mono">
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-background-card border border-border rounded">
              {"\u2318"}K
            </kbd>{" "}
            anywhere on the site to open quick chat
          </p>
        </div>
      </div>
    </div>
  );
}
