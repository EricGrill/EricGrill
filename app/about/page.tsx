import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Eric Grill",
  description: "Building things that matter, from software to startups, to systems that keep working when everything else breaks.",
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
                I build things that matter—from software to startups, to systems that keep working when everything else breaks.
              </p>

              <p className="text-text-secondary leading-relaxed mt-4">
                I have been in the <span className="text-accent-cyan">Bitcoin</span> ecosystem since 2013, long enough to see entire narratives rise and fall, and to learn that real innovation does not come from hype. It comes from people who keep shipping while everyone else is arguing. Today I am the CEO of{" "}
                <a
                  href="https://chainbytes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-cyan hover:text-glow-cyan transition-all"
                >
                  Chainbytes
                </a>
                , where we build Bitcoin infrastructure and compliance systems that power real machines in the real world.
              </p>

              <p className="text-text-secondary leading-relaxed mt-4">
                Before Chainbytes, I spent decades as a software developer, working in finance, trading, and high-security environments where mistakes cost real money. Even earlier than that, I served in the <span className="text-accent-magenta">United States Navy</span>, where I learned how complex systems behave under stress and how to stay calm when they do not behave the way you planned. That mindset never leaves you. It shows up in how I design software, how I run teams, and how I think about risk.
              </p>

              <p className="text-text-secondary leading-relaxed mt-4">
                Outside of tech, I am a <span className="text-accent-cyan">private pilot</span> and a <span className="text-accent-green">Brazilian Jiu Jitsu</span> competitor. Flying teaches respect for physics and preparation. Jiu Jitsu teaches humility, pressure, and how to keep thinking when someone is trying to crush you. Both are good training for building companies.
              </p>

              <p className="text-text-secondary leading-relaxed mt-4">
                This site is where I write in public. I document experiments, ideas, systems, and mistakes so they do not evaporate. You will find thoughts on Bitcoin, engineering, automation, security, and sometimes the strange edges where all of those collide.
              </p>

              <p className="text-text-secondary leading-relaxed mt-6 border-l-2 border-accent-cyan pl-4">
                What I care about is simple: <span className="text-text-primary">clarity over noise</span>, <span className="text-text-primary">curiosity over certainty</span>, and <span className="text-text-primary">building things that actually work</span>.
              </p>

              <p className="text-text-secondary leading-relaxed mt-4">
                If you want to talk Bitcoin, software, aviation, or Jiu Jitsu, you are in the right place.
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

            {/* Sign off */}
            <div className="pt-8 font-mono text-accent-cyan">
              — Eric
            </div>

            {/* CTA */}
            <div className="pt-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
