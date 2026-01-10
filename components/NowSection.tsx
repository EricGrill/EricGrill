import Link from "next/link";
import { getNow } from "@/lib/content";

export function NowSection() {
  const now = getNow();

  const items = [
    {
      label: "training_for",
      value: now.training,
      color: "magenta",
    },
    {
      label: "building",
      value: now.building,
      color: "cyan",
    },
    {
      label: "writing",
      value: now.writing,
      color: "green",
    },
  ].filter((item) => item.value);

  if (items.length === 0) return null;

  return (
    <section className="py-12 px-6 md:px-12 relative">
      <div className="max-w-6xl mx-auto">
        {/* Terminal window */}
        <div className="border border-border bg-background-card/50 backdrop-blur-sm">
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background-alt/50">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="font-mono text-xs text-accent-cyan uppercase tracking-wider">
                now.sh
              </span>
            </div>
            <span className="font-mono text-xs text-text-secondary">
              updated: {now.updated}
            </span>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {items.map((item) => (
                <NowItem key={item.label} item={item} />
              ))}
            </div>

            {/* Link to full /now page */}
            <div className="mt-6 pt-4 border-t border-border/50 text-center">
              <Link
                href="/now"
                className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-accent-cyan transition-colors group"
              >
                <span className="text-accent-green">$</span>
                <span>cat ./now --full</span>
                <span className="group-hover:translate-x-1 transition-transform">{">"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NowItem({
  item,
}: {
  item: { label: string; value: string; color: string };
}) {
  const colorClasses = {
    cyan: "text-accent-cyan",
    magenta: "text-accent-magenta",
    green: "text-accent-green",
  };

  const labelColor = colorClasses[item.color as keyof typeof colorClasses] || "text-accent-cyan";

  return (
    <div>
      <span className={`font-mono text-xs ${labelColor} block mb-1`}>
        {"// "}{item.label}
      </span>
      <p className="font-mono text-sm text-text-primary">
        {item.value}
      </p>
    </div>
  );
}

export default NowSection;
