import type { Metadata } from "next";
import Link from "next/link";
import { getNow } from "@/lib/content";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Now | Eric Grill",
  description: "What I'm currently building, training for, and working on. Living proof of the work.",
};

const PROJECTS = [
  {
    name: "Claude Code Plugins",
    description: "Agents, skills, and hooks that extend AI-assisted development",
    link: "https://github.com/EricGrill/agents-skills-plugins",
    status: "active",
  },
  {
    name: "Chainbytes Infrastructure",
    description: "Bitcoin ATM software and compliance systems",
    link: "https://chainbytes.com",
    status: "active",
  },
  {
    name: "BJJChat",
    description: "AI training partner for jiu-jitsu athletes",
    link: null,
    status: "building",
  },
];

const EXPERIMENTS = [
  "Lightning encrypted message queues",
  "Garmin flight data automation",
  "AI drone swarm coordination",
  "Agentic code review workflows",
];

const FIGHTS = [
  {
    title: "IBJJF Europeans 2025 - Gold Medal Match",
    videoId: "AluXpCgsjRI",
    result: "Gold",
  },
];

export default function NowPage() {
  const now = getNow();
  const recentPosts = getAllPosts().slice(0, 5);

  return (
    <div className="py-16 px-6 md:px-12 relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 circuit-bg opacity-10 pointer-events-none" />
      <div className="absolute top-40 left-10 w-64 h-64 bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-64 h-64 bg-accent-magenta/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-sm text-accent-cyan mb-4 block">
            {"// "}now
          </span>
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-text-primary mb-4">
            What I&apos;m <span className="gradient-text">Doing Now</span>
          </h1>
          <p className="text-text-secondary">
            Last updated: <span className="text-accent-cyan font-mono">{now.updated}</span>
          </p>
        </div>

        {/* Current Status */}
        <section className="mb-12">
          <div className="border border-border bg-background-card/50 backdrop-blur-sm">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-background-alt/50">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="font-mono text-xs text-accent-cyan uppercase tracking-wider">
                current_status.sh
              </span>
            </div>

            <div className="p-6 space-y-6">
              {now.training && (
                <div>
                  <span className="font-mono text-xs text-accent-magenta block mb-1">
                    {"// "}training_for
                  </span>
                  <p className="font-mono text-lg text-text-primary">{now.training}</p>
                </div>
              )}

              {now.building && (
                <div>
                  <span className="font-mono text-xs text-accent-cyan block mb-1">
                    {"// "}building
                  </span>
                  <p className="font-mono text-lg text-text-primary">{now.building}</p>
                </div>
              )}

              {now.writing && (
                <div>
                  <span className="font-mono text-xs text-accent-green block mb-1">
                    {"// "}writing
                  </span>
                  <p className="font-mono text-lg text-text-primary">{now.writing}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Recent Fights */}
        <section className="mb-12">
          <span className="font-mono text-sm text-accent-magenta mb-6 block">
            {"// "}recent_fights
          </span>

          <div className="space-y-4">
            {FIGHTS.map((fight) => (
              <div key={fight.videoId} className="border border-accent-magenta/30 bg-background-card/50">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${fight.videoId}`}
                    title={fight.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="font-mono text-sm text-text-primary">{fight.title}</span>
                  <span className="font-mono text-xs px-2 py-1 bg-accent-magenta/20 text-accent-magenta border border-accent-magenta/30">
                    {fight.result}
                  </span>
                </div>
              </div>
            ))}

            <a
              href="https://www.youtube.com/@EricGrill"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center font-mono text-sm text-red-500 hover:text-red-400 transition-colors py-3"
            >
              Watch more on YouTube →
            </a>
          </div>
        </section>

        {/* Recent Builds */}
        <section className="mb-12">
          <span className="font-mono text-sm text-accent-cyan mb-6 block">
            {"// "}recent_builds
          </span>

          <div className="grid gap-4">
            {PROJECTS.map((project) => (
              <div
                key={project.name}
                className="border border-accent-cyan/30 bg-background-card/50 p-4 hover:border-accent-cyan/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-mono text-text-primary font-medium mb-1">
                      {project.name}
                    </h3>
                    <p className="text-text-secondary text-sm">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs px-2 py-1 border ${
                      project.status === "active"
                        ? "border-accent-green/30 text-accent-green bg-accent-green/10"
                        : "border-accent-cyan/30 text-accent-cyan bg-accent-cyan/10"
                    }`}>
                      {project.status}
                    </span>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-accent-cyan hover:text-accent-magenta transition-colors"
                      >
                        →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Writing */}
        <section className="mb-12">
          <span className="font-mono text-sm text-accent-green mb-6 block">
            {"// "}recent_writing
          </span>

          <div className="space-y-3">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block border border-border hover:border-accent-green/50 bg-background-card/50 p-4 transition-colors group"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-mono text-text-primary group-hover:text-accent-green transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-sm mt-1 line-clamp-1">
                      {post.excerpt}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-text-secondary shrink-0">
                    {post.readingTime}
                  </span>
                </div>
              </Link>
            ))}

            <Link
              href="/blog"
              className="block text-center font-mono text-sm text-accent-green hover:text-accent-cyan transition-colors py-3"
            >
              Read all dispatches →
            </Link>
          </div>
        </section>

        {/* Experiments */}
        <section className="mb-12">
          <span className="font-mono text-sm text-text-secondary mb-6 block">
            {"// "}experiments
          </span>

          <div className="border border-border/50 bg-background-card/30 p-6">
            <p className="text-text-secondary text-sm mb-4">
              Things I&apos;m exploring that may or may not turn into something:
            </p>
            <div className="space-y-2">
              {EXPERIMENTS.map((experiment, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-accent-cyan font-mono text-sm">{">"}</span>
                  <span className="text-text-primary font-mono text-sm">{experiment}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-8 border-t border-border">
          <p className="text-text-secondary text-sm mb-4">
            This page is inspired by{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan hover:text-accent-magenta transition-colors"
            >
              Derek Sivers&apos; /now movement
            </a>
            .
          </p>
          <div className="flex gap-4">
            <Link
              href="/about"
              className="font-mono text-sm text-accent-cyan hover:text-accent-magenta transition-colors"
            >
              ← About me
            </Link>
            <Link
              href="/blog"
              className="font-mono text-sm text-accent-cyan hover:text-accent-magenta transition-colors"
            >
              Read the blog →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
