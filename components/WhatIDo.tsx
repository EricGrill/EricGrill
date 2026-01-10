import Link from "next/link";

const PILLARS = [
  {
    id: "build",
    label: "build_systems",
    title: "Build",
    description: "Software, Bitcoin, Security, Automation",
    details: "Infrastructure that moves real value. Systems that survive when others fail.",
    link: "/now",
    linkText: "See what I'm building",
    color: "cyan",
  },
  {
    id: "fight",
    label: "fight_systems",
    title: "Fight",
    description: "BJJ, Competition, Discipline",
    details: "IBJJF champion. Training daily. The mats teach what theory cannot.",
    link: "https://www.youtube.com/@EricGrill",
    linkText: "Watch the fights",
    color: "magenta",
    external: true,
  },
  {
    id: "write",
    label: "write_systems",
    title: "Write",
    description: "Blog, Research, Field Notes",
    details: "Live experiments. Not tutorials. Dispatches from the edge.",
    link: "/blog",
    linkText: "Read the dispatches",
    color: "green",
  },
];

export function WhatIDo() {
  return (
    <section className="py-16 px-6 md:px-12 relative">
      {/* Background */}
      <div className="absolute inset-0 circuit-bg opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-sm text-text-secondary block mb-2">
            <span className="text-accent-cyan">{"// "}</span>what_i_do
          </span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-text-primary">
            Three <span className="text-accent-magenta">Systems</span>
          </h2>
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
}: {
  pillar: (typeof PILLARS)[0];
}) {
  const colorClasses = {
    cyan: {
      border: "border-accent-cyan/30 hover:border-accent-cyan/60",
      header: "bg-accent-cyan/10 border-accent-cyan/30",
      label: "text-accent-cyan",
      button: "border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-background hover:shadow-glow-cyan",
    },
    magenta: {
      border: "border-accent-magenta/30 hover:border-accent-magenta/60",
      header: "bg-accent-magenta/10 border-accent-magenta/30",
      label: "text-accent-magenta",
      button: "border-accent-magenta text-accent-magenta hover:bg-accent-magenta hover:text-background hover:shadow-glow-magenta",
    },
    green: {
      border: "border-accent-green/30 hover:border-accent-green/60",
      header: "bg-accent-green/10 border-accent-green/30",
      label: "text-accent-green",
      button: "border-accent-green text-accent-green hover:bg-accent-green hover:text-background",
    },
  };

  const colors = colorClasses[pillar.color as keyof typeof colorClasses];

  const LinkComponent = pillar.external ? "a" : Link;
  const linkProps = pillar.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="group">
      {/* Terminal header */}
      <div className={`flex items-center gap-2 px-4 py-2 ${colors.header} border border-b-0`}>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <span className={`font-mono text-xs uppercase tracking-wider ${colors.label}`}>
          {pillar.label}
        </span>
      </div>

      {/* Content */}
      <div className={`p-6 border ${colors.border} bg-background-card/50 backdrop-blur-sm transition-all duration-300`}>
        <h3 className="font-mono text-xl font-bold text-text-primary mb-2">
          {pillar.title}
        </h3>

        <p className={`font-mono text-sm ${colors.label} mb-3`}>
          {pillar.description}
        </p>

        <p className="text-text-secondary text-sm mb-6">
          {pillar.details}
        </p>

        <LinkComponent
          href={pillar.link}
          {...linkProps}
          className={`group/btn inline-flex items-center gap-2 px-4 py-2 border font-mono text-xs uppercase tracking-wider transition-all duration-300 ${colors.button}`}
        >
          <span>{pillar.linkText}</span>
          <span className="group-hover/btn:translate-x-1 transition-transform">{">"}</span>
        </LinkComponent>
      </div>
    </div>
  );
}

export default WhatIDo;
