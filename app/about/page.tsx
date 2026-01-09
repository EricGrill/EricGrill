import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Eric Grill",
  description: "Builder. Pilot. Grappler. Learn more about Eric Grill.",
};

const SKILLS = [
  { name: "Bitcoin", category: "blockchain" },
  { name: "Ethereum", category: "blockchain" },
  { name: "TypeScript", category: "programming" },
  { name: "Python", category: "programming" },
  { name: "React", category: "programming" },
  { name: "Next.js", category: "programming" },
  { name: "AI/ML", category: "ai" },
  { name: "Private Pilot", category: "aviation" },
  { name: "BJJ", category: "jiu-jitsu" },
];

const TIMELINE = [
  { year: "Now", title: "CEO @ Chainbytes", description: "Building the future of Bitcoin ATMs" },
  { year: "2013", title: "OG Bitcoiner", description: "Early adopter, never looked back" },
  { year: "Past", title: "Serial Founder", description: "Multiple startups, fintech, hedge funds" },
];

export default function AboutPage() {
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
            {"// "}about_me
          </span>
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Hello, I&apos;m <span className="gradient-text">Eric</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Photo and quick info */}
          <div className="md:col-span-1">
            <div className="relative group mb-8">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan via-accent-magenta to-accent-cyan rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-gradient-shift bg-[length:200%_auto]" />

              <div className="relative aspect-square overflow-hidden border border-accent-cyan">
                <Image
                  src="/images/eric-headshot.jpeg"
                  alt="Eric Grill"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Tech badges */}
            <div className="space-y-4">
              <span className="font-mono text-xs text-text-secondary block">
                {"// "}skills
              </span>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span
                    key={skill.name}
                    className={`
                      font-mono text-xs px-2 py-1 border
                      ${skill.category === "blockchain" ? "border-accent-cyan/50 text-accent-cyan" : ""}
                      ${skill.category === "programming" ? "border-accent-green/50 text-accent-green" : ""}
                      ${skill.category === "ai" ? "border-accent-magenta/50 text-accent-magenta" : ""}
                      ${skill.category === "aviation" ? "border-accent-cyan/50 text-accent-cyan" : ""}
                      ${skill.category === "jiu-jitsu" ? "border-accent-magenta/50 text-accent-magenta" : ""}
                    `}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            <div className="prose-cyber">
              <p className="text-lg text-text-secondary leading-relaxed">
                I&apos;m a <span className="text-accent-cyan">builder</span>,{" "}
                <span className="text-accent-magenta">pilot</span>, and{" "}
                <span className="text-accent-green">grappler</span> who&apos;s been in the
                Bitcoin space since 2013.
              </p>

              <p className="text-text-secondary leading-relaxed mt-4">
                Currently, I&apos;m the CEO of{" "}
                <a
                  href="https://chainbytes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-cyan hover:text-glow-cyan transition-all"
                >
                  Chainbytes
                </a>
                , where we&apos;re building the future of Bitcoin ATMs. Before that, I
                built and ran multiple startups, and worked as a software developer
                in financial services and hedge funds.
              </p>

              <p className="text-text-secondary leading-relaxed mt-4">
                Outside of tech, I hold a private pilot license and train Brazilian
                Jiu Jitsu. These pursuits have taught me as much about problem-solving
                and resilience as any startup has.
              </p>

              <p className="text-text-secondary leading-relaxed mt-4">
                This blog is where I share thoughts on AI, aviation, jiu jitsu,
                blockchain, and programming. I write to clarify my thinking and
                hopefully help others along the way.
              </p>
            </div>

            {/* Timeline */}
            <div className="pt-8 border-t border-border">
              <span className="font-mono text-xs text-text-secondary block mb-6">
                {"// "}timeline
              </span>
              <div className="space-y-4">
                {TIMELINE.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start"
                  >
                    <span className="font-mono text-sm text-accent-cyan w-16 shrink-0">
                      {item.year}
                    </span>
                    <div>
                      <h3 className="font-mono text-text-primary font-medium">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-8">
              <Link
                href="/contact"
                className="cyber-button inline-block"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
