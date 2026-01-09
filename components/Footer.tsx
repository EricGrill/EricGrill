import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 px-6 md:px-12 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Terminal-style divider */}
        <div className="font-mono text-xs text-text-secondary mb-8 overflow-hidden">
          <span className="text-accent-cyan">{"// "}</span>
          <span className="text-accent-magenta">EOF</span>
          <span className="inline-block ml-2">
            {"─".repeat(50)}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="font-mono text-sm text-text-secondary">
            <span className="text-accent-green">$</span>{" "}
            <span className="text-text-primary">echo</span>{" "}
            <span className="text-accent-cyan">&quot;{currentYear} Eric Grill&quot;</span>
          </div>

          {/* Social/Links */}
          <div className="flex items-center gap-6">
            <FooterLink href="https://x.com/EricGrill" external>
              X
            </FooterLink>
            <FooterLink href="https://github.com/EricGrill" external>
              GitHub
            </FooterLink>
            <FooterLink href="/contact">
              Contact
            </FooterLink>
          </div>
        </div>

        {/* Tech signature */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <p className="font-mono text-xs text-text-secondary text-center">
            <span className="text-accent-cyan">&lt;</span>
            <span className="text-accent-magenta">built</span>
            <span className="text-text-secondary"> with </span>
            <span className="text-accent-green">Next.js</span>
            <span className="text-text-secondary"> + </span>
            <span className="text-accent-cyan">Tailwind</span>
            <span className="text-text-secondary"> / </span>
            <span className="text-accent-cyan">&gt;</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      {...linkProps}
      className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-accent-cyan transition-all duration-300"
    >
      [{children}]
    </Link>
  );
}
