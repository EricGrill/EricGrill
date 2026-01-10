"use client";

const YOUTUBE_CONFIG = {
  channelUrl: "https://www.youtube.com/@EricGrill",
  channelName: "Eric Grill",
  handle: "@EricGrill",
  description: "Competition footage, training highlights, and the journey on the mats.",
};

export function YouTubeSubscribeCTA() {
  return (
    <div className="text-center">
      <a
        href={YOUTUBE_CONFIG.channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 px-8 py-4 bg-red-500/10 border border-red-500 text-red-500 font-mono text-sm uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
      >
        <YouTubeIcon className="w-5 h-5" />
        <span>Subscribe on YouTube</span>
        <span className="group-hover:translate-x-1 transition-transform">{">"}</span>
      </a>
      <p className="mt-4 font-mono text-sm text-text-secondary">
        {YOUTUBE_CONFIG.description}
      </p>
    </div>
  );
}

export function YouTubeChannelCard() {
  return (
    <div className="p-6 border border-red-500/30 bg-red-500/5 hover:border-red-500 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
          <YouTubeIcon className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h4 className="font-mono text-sm font-bold text-text-primary">
            {YOUTUBE_CONFIG.channelName}
          </h4>
          <p className="font-mono text-xs text-text-secondary">
            {YOUTUBE_CONFIG.handle}
          </p>
        </div>
      </div>

      {/* Content Tags */}
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
      <p className="font-mono text-sm text-text-secondary mb-4">
        {YOUTUBE_CONFIG.description}
      </p>

      {/* CTA */}
      <a
        href={YOUTUBE_CONFIG.channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-sm text-red-500 hover:text-red-400 transition-colors"
      >
        <YouTubeIcon className="w-4 h-4" />
        <span>Subscribe</span>
        <span className="group-hover:translate-x-1 transition-transform">{">"}</span>
      </a>
    </div>
  );
}

export function YouTubeDiscussCTA({ title }: { title?: string }) {
  return (
    <div className="p-8 border border-border bg-background-card/50 backdrop-blur-sm">
      <span className="font-mono text-sm text-red-500 mb-4 block">
        {"$ "}<span className="text-text-primary">watch</span> --youtube
      </span>
      <h3 className="font-mono text-xl font-bold text-text-primary mb-2">
        More Jiu-Jitsu content?
      </h3>
      <p className="text-text-secondary mb-6">
        Check out competition footage and training highlights on my YouTube channel.
      </p>
      <div className="flex flex-wrap gap-4">
        <a
          href={YOUTUBE_CONFIG.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500 text-red-500 font-mono text-sm uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
        >
          <YouTubeIcon className="w-4 h-4" />
          <span>Watch on YouTube</span>
        </a>
      </div>
    </div>
  );
}

export function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default YouTubeChannelCard;
