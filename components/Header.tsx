"use client";

import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full py-6 px-6 md:px-12">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-text-primary hover:text-accent transition-colors"
        >
          Eric Grill
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/blog" className="text-text-secondary hover:text-accent transition-colors">
            Blog
          </Link>
          <Link href="/about" className="text-text-secondary hover:text-accent transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-text-secondary hover:text-accent transition-colors">
            Contact
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-text-primary"
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
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="text-text-secondary hover:text-accent transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="text-text-secondary hover:text-accent transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="text-text-secondary hover:text-accent transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
