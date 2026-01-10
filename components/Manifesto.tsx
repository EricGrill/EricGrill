import Image from "next/image";
import { getManifesto } from "@/lib/content";

export function Manifesto() {
  const manifesto = getManifesto();

  return (
    <section className="py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 circuit-bg opacity-20" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent-magenta/10 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Character Image */}
          <div className="relative group flex-shrink-0">
            {/* Glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-accent-cyan via-accent-magenta to-accent-green rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-lg overflow-hidden border border-accent-cyan/50">
              <Image
                src="/images/eric-character.jpeg"
                alt="Eric Grill - Builder, Coder, Freedom Maximalist"
                fill
                className="object-cover"
              />
              {/* Scan effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Manifesto Text */}
          <div className="text-center lg:text-left">
            <span className="font-mono text-sm text-accent-green mb-4 block">
              {"// "}manifesto
            </span>

            <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
              I build systems for people who{" "}
              <span className="text-accent-magenta">refuse to be owned.</span>
            </h2>

            <div className="flex flex-wrap gap-3 mb-6 justify-center lg:justify-start">
              <ManifestoBadge color="cyan">Code</ManifestoBadge>
              <ManifestoBadge color="magenta">Security</ManifestoBadge>
              <ManifestoBadge color="green">Jiu Jitsu</ManifestoBadge>
              <ManifestoBadge color="orange">Bitcoin</ManifestoBadge>
            </div>

            <p className="text-xl text-text-secondary font-mono">
              {manifesto.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestoBadge({
  children,
  color
}: {
  children: React.ReactNode;
  color: "cyan" | "magenta" | "green" | "orange";
}) {
  const colorClasses = {
    cyan: "border-accent-cyan text-accent-cyan bg-accent-cyan/10",
    magenta: "border-accent-magenta text-accent-magenta bg-accent-magenta/10",
    green: "border-accent-green text-accent-green bg-accent-green/10",
    orange: "border-orange-500 text-orange-500 bg-orange-500/10",
  };

  return (
    <span className={`font-mono text-sm md:text-base px-4 py-2 border ${colorClasses[color]} transition-all hover:scale-105`}>
      {children}
    </span>
  );
}
