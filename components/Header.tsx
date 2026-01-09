import Link from "next/link";

export function Header() {
  return (
    <header className="w-full py-6 px-6 md:px-12">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-text-primary hover:text-accent transition-colors">
          Eric Grill
        </Link>
        <div className="flex items-center gap-8">
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
      </nav>
    </header>
  );
}
