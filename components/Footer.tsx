import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-8 px-6 md:px-12 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-secondary text-sm">
          © {new Date().getFullYear()} Eric Grill
        </p>
        <div className="flex items-center gap-6">
          <Link href="/contact" className="text-text-secondary text-sm hover:text-accent transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
