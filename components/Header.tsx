"use client";

import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full py-6 px-6 md:px-12 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="group relative font-mono text-xl font-bold text-text-primary hover:text-accent-cyan transition-all duration-300"
        >
          <span className="relative z-10 group-hover:animate-glitch">
            <span className="text-accent-cyan">&gt;</span> Eric_Grill
          </span>
          <span className="absolute inset-0 text-accent-magenta opacity-0 group-hover:opacity-70 blur-[1px] -translate-x-[2px] z-0">
            <span className="text-accent-cyan">&gt;</span> Eric_Grill
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-text-primary hover:text-accent-cyan transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-border">
          <div className="flex flex-col gap-4 pt-4 px-2">
            <MobileNavLink href="/blog" onClick={() => setIsOpen(false)}>
              Blog
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </MobileNavLink>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative font-mono text-sm uppercase tracking-wider text-text-secondary hover:text-accent-cyan transition-all duration-300 group"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-cyan group-hover:w-full transition-all duration-300 shadow-glow-cyan" />
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="font-mono text-sm uppercase tracking-wider text-text-secondary hover:text-accent-cyan transition-all duration-300 py-2 border-l-2 border-transparent hover:border-accent-cyan pl-4"
    >
      {children}
    </Link>
  );
}
