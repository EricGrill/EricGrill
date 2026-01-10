import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Eric Grill. Connect via LinkedIn, X (Twitter), or GitHub for professional inquiries, collaboration, or just to say hello.",
  openGraph: {
    title: "Contact Eric Grill",
    description:
      "Get in touch with Eric Grill. Connect via LinkedIn, X (Twitter), or GitHub.",
    url: "https://ericgrill.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Eric Grill",
    description:
      "Get in touch with Eric Grill. Connect via LinkedIn, X (Twitter), or GitHub.",
  },
  alternates: {
    canonical: "https://ericgrill.com/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="py-16 px-6 md:px-12 relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 circuit-bg opacity-10 pointer-events-none" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent-magenta/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-sm text-accent-cyan mb-4 block">
            {"// "}contact
          </span>
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Get in <span className="text-accent-magenta">Touch</span>
          </h1>
          <p className="text-text-secondary">
            Have a question, idea, or opportunity? Connect with me on any of these platforms.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="space-y-4">
          {/* LinkedIn */}
          <ContactCard
            href="https://www.linkedin.com/in/ericgrill/"
            platform="LinkedIn"
            handle="@ericgrill"
            description="Professional inquiries & networking"
            icon={<LinkedInIcon />}
            color="cyan"
          />

          {/* X / Twitter */}
          <ContactCard
            href="https://x.com/EricGrill"
            platform="X"
            handle="@EricGrill"
            description="Quick messages & updates"
            icon={<XIcon />}
            color="magenta"
          />

          {/* GitHub */}
          <ContactCard
            href="https://github.com/EricGrill"
            platform="GitHub"
            handle="EricGrill"
            description="Code, projects & contributions"
            icon={<GitHubIcon />}
            color="green"
          />
        </div>

        {/* Terminal footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="font-mono text-sm text-text-secondary">
            <span className="text-accent-green">$</span>{" "}
            <span className="text-text-primary">echo</span>{" "}
            <span className="text-accent-cyan">&quot;Looking forward to connecting!&quot;</span>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/"
            className="font-mono text-sm text-text-secondary hover:text-accent-cyan transition-colors"
          >
            {"<"} back to home
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  href,
  platform,
  handle,
  description,
  icon,
  color,
}: {
  href: string;
  platform: string;
  handle: string;
  description: string;
  icon: React.ReactNode;
  color: "cyan" | "magenta" | "green";
}) {
  const colorClasses = {
    cyan: "hover:border-accent-cyan/50 hover:bg-accent-cyan/5 group-hover:text-accent-cyan",
    magenta: "hover:border-accent-magenta/50 hover:bg-accent-magenta/5 group-hover:text-accent-magenta",
    green: "hover:border-accent-green/50 hover:bg-accent-green/5 group-hover:text-accent-green",
  };

  const iconColorClasses = {
    cyan: "text-accent-cyan",
    magenta: "text-accent-magenta",
    green: "text-accent-green",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block p-6 border border-border bg-background-card transition-all duration-300 ${colorClasses[color]}`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 flex items-center justify-center ${iconColorClasses[color]}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-lg text-text-primary group-hover:text-current transition-colors">
              {platform}
            </span>
            <span className="font-mono text-sm text-text-secondary">
              {handle}
            </span>
          </div>
          <p className="font-mono text-sm text-text-secondary">
            {description}
          </p>
        </div>
        <div className="font-mono text-text-secondary group-hover:text-current transition-colors">
          {"->"}
        </div>
      </div>
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
