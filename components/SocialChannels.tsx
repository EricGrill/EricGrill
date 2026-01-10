"use client";

import { YouTubeIcon } from "./YouTubeChannel";

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function SocialChannels() {
  return (
    <section className="py-16 px-6 md:px-12 relative">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-sm text-text-secondary block mb-2">
            <span className="text-accent-cyan">{"// "}</span>social_transmissions
          </span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-text-primary">
            Connect on{" "}
            <span className="text-accent-cyan">X</span>
            {" "}+{" "}
            <span className="text-red-500">YouTube</span>
          </h2>
        </div>

        {/* Dual Panel Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Twitter/X Panel - TECH_MIND */}
          <div className="relative group">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-accent-cyan/10 border border-accent-cyan/30 border-b-0">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="font-mono text-xs text-accent-cyan uppercase tracking-wider">
                tech_mind.sh
              </span>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 border border-accent-cyan/30 bg-background-card/50 backdrop-blur-sm group-hover:border-accent-cyan/60 transition-all duration-300">
              {/* Channel Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center">
                  <XIcon className="w-6 h-6 text-accent-cyan" />
                </div>
                <div>
                  <h3 className="font-mono text-lg font-bold text-text-primary">
                    @EricGrill
                  </h3>
                  <p className="font-mono text-xs text-text-secondary">on X / Twitter</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs font-mono bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30">
                  AI
                </span>
                <span className="px-2 py-1 text-xs font-mono bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30">
                  Bitcoin
                </span>
                <span className="px-2 py-1 text-xs font-mono bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30">
                  Claude Code
                </span>
                <span className="px-2 py-1 text-xs font-mono bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30">
                  Dev
                </span>
              </div>

              {/* Description */}
              <p className="font-mono text-sm text-text-secondary mb-6">
                Real-time thoughts on AI, Bitcoin, and building things that matter.
              </p>

              {/* Recent Topics */}
              <div className="mb-6 space-y-3">
                <span className="font-mono text-xs text-text-secondary block">
                  {"// "}recent_topics
                </span>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-accent-cyan font-mono text-sm">{">"}</span>
                    <span className="text-text-secondary text-sm">Claude Code plugins and agentic workflows</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent-cyan font-mono text-sm">{">"}</span>
                    <span className="text-text-secondary text-sm">Bitcoin infrastructure at scale</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent-cyan font-mono text-sm">{">"}</span>
                    <span className="text-text-secondary text-sm">Building in public, shipping fast</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href="https://x.com/EricGrill"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-accent-cyan/10 border border-accent-cyan text-accent-cyan font-mono text-sm uppercase tracking-wider hover:bg-accent-cyan hover:text-background transition-all duration-300 hover:shadow-glow-cyan w-full justify-center"
              >
                <XIcon className="w-4 h-4" />
                <span>Follow on X</span>
                <span className="group-hover/btn:translate-x-1 transition-transform">{">"}</span>
              </a>
            </div>
          </div>

          {/* YouTube Panel - WARRIOR_BODY */}
          <div className="relative group">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 border-b-0">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="font-mono text-xs text-red-500 uppercase tracking-wider">
                warrior_body.sh
              </span>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 border border-red-500/30 bg-background-card/50 backdrop-blur-sm group-hover:border-red-500/60 transition-all duration-300">
              {/* Channel Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                  <YouTubeIcon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-mono text-lg font-bold text-text-primary">
                    @EricGrill
                  </h3>
                  <p className="font-mono text-xs text-text-secondary">on YouTube</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs font-mono bg-red-500/10 text-red-400 border border-red-500/30">
                  Jiu-Jitsu
                </span>
                <span className="px-2 py-1 text-xs font-mono bg-red-500/10 text-red-400 border border-red-500/30">
                  Competition
                </span>
                <span className="px-2 py-1 text-xs font-mono bg-red-500/10 text-red-400 border border-red-500/30">
                  Training
                </span>
              </div>

              {/* Description */}
              <p className="font-mono text-sm text-text-secondary mb-6">
                Competition footage, training highlights, and the journey on the mats.
              </p>

              {/* YouTube Video Embed */}
              <div className="mb-6 aspect-video relative overflow-hidden border border-red-500/30 bg-black">
                <iframe
                  src="https://www.youtube.com/embed/AluXpCgsjRI"
                  title="IBJJF Europeans 2025 - Gold Medal Match"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* CTA */}
              <a
                href="https://www.youtube.com/@EricGrill"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500 text-red-500 font-mono text-sm uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] w-full justify-center"
              >
                <YouTubeIcon className="w-4 h-4" />
                <span>Subscribe on YouTube</span>
                <span className="group-hover/btn:translate-x-1 transition-transform">{">"}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center mt-8">
          <p className="font-mono text-xs text-text-secondary">
            <span className="text-accent-green">{">"}</span> Two passions. Two channels. One builder.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SocialChannels;
