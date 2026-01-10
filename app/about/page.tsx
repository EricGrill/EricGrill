import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd, generatePersonSchema } from "@/components/JsonLd";
import { getManifesto } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Building systems that survive when everything else breaks. Navy veteran, Bitcoin infrastructure builder, IBJJF champion, serial founder.",
  openGraph: {
    title: "About Eric Grill",
    description: "Building systems that survive when everything else breaks. Navy veteran, Bitcoin infrastructure builder, IBJJF champion, serial founder.",
    url: "https://ericgrill.com/about",
    type: "profile",
    images: [
      {
        url: "/images/eric-headshot.jpeg",
        width: 800,
        height: 800,
        alt: "Eric Grill",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Eric Grill",
    description: "Building systems that survive when everything else breaks. Navy veteran, Bitcoin infrastructure builder, IBJJF champion, serial founder.",
    images: ["/images/eric-headshot.jpeg"],
  },
  alternates: {
    canonical: "https://ericgrill.com/about",
  },
};

const SKILLS = [
  { name: "Bitcoin", category: "blockchain" },
  { name: "TypeScript", category: "programming" },
  { name: "Python", category: "programming" },
  { name: "React", category: "programming" },
  { name: "Next.js", category: "programming" },
  { name: "AI/ML", category: "ai" },
  { name: "Private Pilot", category: "aviation" },
  { name: "BJJ", category: "jiu-jitsu" },
];

const TIMELINE = [
  { year: "Now", title: "CEO @ Chainbytes", description: "Bitcoin infrastructure and compliance systems" },
  { year: "2013", title: "Bitcoin", description: "Early adopter, still here" },
  { year: "Past", title: "Software Developer", description: "Finance, trading, high-security environments" },
  { year: "Earlier", title: "US Navy", description: "Complex systems under stress" },
];

const ACCOMPLISHMENTS = [
  { text: "Bitcoin infrastructure", detail: "Chainbytes - real machines, real money, real compliance" },
  { text: "IBJJF Europeans Gold", detail: "2025 European Championship" },
  { text: "High-security systems", detail: "Decades in finance, trading, and critical infrastructure" },
  { text: "Serial founder", detail: "Multiple companies from zero to operational" },
  { text: "Open source builder", detail: "Claude Code plugins, agents, and agentic workflows" },
];

export default function AboutPage() {
  const personSchema = generatePersonSchema();
  const manifesto = getManifesto();

  return (
    <>
      <JsonLd data={personSchema} />
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
              {/* Section 1: Who I Am */}
              <div className="prose-cyber">
                <span className="font-mono text-xs text-accent-cyan block mb-3">
                  {"// "}who_i_am
                </span>
                <p className="text-lg text-text-primary leading-relaxed font-medium mb-4">
                  {manifesto.tagline}
                </p>

                <p className="text-text-secondary leading-relaxed">
                  I&apos;ve spent my life inside systems under pressure. In the{" "}
                  <span className="text-accent-magenta">United States Navy</span>, I learned that complex systems fail in predictable ways—and that the people who survive are the ones who understand failure before it arrives.
                </p>

                <p className="text-text-secondary leading-relaxed mt-4">
                  In software, I spent decades building systems where mistakes cost real money. Trading floors. Financial infrastructure. High-security environments where a single bug could cascade into catastrophe.
                </p>

                <p className="text-text-secondary leading-relaxed mt-4">
                  In <span className="text-accent-cyan">Bitcoin</span>, I found the first money that doesn&apos;t require permission. I&apos;ve been here since 2013. Today I run{" "}
                  <a
                    href="https://chainbytes.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-cyan hover:text-glow-cyan transition-all"
                  >
                    Chainbytes
                  </a>
                  , where we build Bitcoin ATM infrastructure that moves real value through real machines.
                </p>

                <p className="text-text-secondary leading-relaxed mt-4">
                  On the mats, I train <span className="text-accent-green">Brazilian Jiu-Jitsu</span> and compete at the highest levels. IBJJF Europeans gold medalist. The mats teach what theory cannot. I document the journey on my{" "}
                  <a
                    href="https://www.youtube.com/@EricGrill"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-400 transition-all"
                  >
                    YouTube channel
                  </a>
                  .
                </p>
              </div>

              {/* Section 2: What I've Done */}
              <div className="pt-6 border-t border-border">
                <span className="font-mono text-xs text-accent-magenta block mb-4">
                  {"// "}what_ive_done
                </span>
                <div className="space-y-3">
                  {ACCOMPLISHMENTS.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="text-accent-cyan font-mono text-sm">{">"}</span>
                      <div>
                        <span className="text-text-primary font-medium">{item.text}</span>
                        <span className="text-text-secondary text-sm"> — {item.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Why This Exists */}
              <div className="pt-6 border-t border-border">
                <span className="font-mono text-xs text-accent-green block mb-4">
                  {"// "}why_this_exists
                </span>
                <div className="border-l-2 border-accent-magenta pl-4">
                  <p className="text-text-primary font-medium mb-2">
                    ericgrill.com is not a resume.
                  </p>
                  <p className="text-text-secondary">
                    It&apos;s a living record of a life spent inside high-pressure systems. I document experiments, ideas, and mistakes so they don&apos;t evaporate. If you&apos;re building something that matters—in code, in competition, in life—you&apos;re in the right place.
                  </p>
                </div>

                <div className="mt-6 border-l-2 border-accent-cyan pl-4">
                  <span className="text-accent-cyan font-mono text-sm block mb-2">{"// "}mission</span>
                  <p className="text-text-primary font-medium">
                    Decentralize everything.
                  </p>
                  <p className="text-text-secondary text-sm mt-1">
                    Remove power structures through resilient systems. Build technology that keeps working when institutions fail.
                  </p>
                </div>
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

              {/* Sign off */}
              <div className="pt-8 font-mono text-accent-cyan">
                — Eric
              </div>

              {/* CTA */}
              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="https://x.com/EricGrill"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-button inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Follow on X
                </a>
                <a
                  href="https://www.youtube.com/@EricGrill"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider px-6 py-3 bg-red-500/10 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Subscribe on YouTube
                </a>
                <Link
                  href="/now"
                  className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider px-6 py-3 border border-accent-green text-accent-green hover:bg-accent-green hover:text-background transition-all duration-300"
                >
                  What I&apos;m doing now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
