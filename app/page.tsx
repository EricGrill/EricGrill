import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { NewsletterForm } from "@/components/NewsletterForm";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="relative">
      {/* Subtle scanline overlay */}
      <div className="scanline-overlay" />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        {/* Circuit board background */}
        <div className="absolute inset-0 circuit-bg opacity-30" />

        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent-cyan/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent-magenta/10 rounded-full blur-[100px]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Photo */}
            <div className="relative group">
              {/* Glow effect behind photo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan via-accent-magenta to-accent-cyan rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift bg-[length:200%_auto]" />

              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-accent-cyan">
                <Image
                  src="/images/eric-headshot.jpeg"
                  alt="Eric Grill"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Scan line effect on hover */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/20 to-transparent opacity-0 group-hover:opacity-100 animate-scanline" />
              </div>
            </div>

            {/* Text content */}
            <div className="text-center md:text-left">
              <div className="inline-block mb-4">
                <span className="font-mono text-sm text-accent-green">
                  {"// "}initializing...
                </span>
              </div>

              <h1 className="font-mono text-5xl md:text-7xl font-bold mb-6">
                <span className="gradient-text">Eric Grill</span>
              </h1>

              <p className="text-xl md:text-2xl text-text-secondary mb-4 max-w-xl">
                <span className="text-accent-cyan font-mono">{">"}</span>{" "}
                Builder. Pilot. Grappler.
              </p>

              <p className="text-lg text-text-secondary mb-8 max-w-xl">
                Writing about{" "}
                <span className="text-accent-cyan">AI</span>,{" "}
                <span className="text-accent-magenta">aviation</span>,{" "}
                <span className="text-accent-green">jiu jitsu</span>,{" "}
                <span className="text-accent-cyan">blockchain</span>, and{" "}
                <span className="text-accent-magenta">programming</span>.
              </p>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
                <TechBadge>OG Bitcoiner</TechBadge>
                <TechBadge>Serial Founder</TechBadge>
                <TechBadge>CEO @ Chainbytes</TechBadge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/blog"
                  className="cyber-button"
                >
                  Read the blog
                </Link>
                <Link
                  href="/about"
                  className="font-mono text-sm uppercase tracking-wider text-text-secondary hover:text-accent-cyan transition-colors py-3 px-6 border border-border hover:border-accent-cyan"
                >
                  About Eric Grill
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {posts.length > 0 && (
        <section className="py-20 px-6 md:px-12 bg-background-alt relative">
          <div className="absolute inset-0 circuit-bg opacity-10" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="font-mono text-sm text-accent-cyan mb-2 block">
                  {"// "}recent_posts
                </span>
                <h2 className="font-mono text-3xl md:text-4xl font-bold text-text-primary">
                  Latest <span className="text-accent-magenta">Transmissions</span>
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden md:flex items-center gap-2 font-mono text-sm text-accent-cyan hover:text-accent-magenta transition-colors group"
              >
                View all
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <div
                  key={post.slug}
                  className="fade-in-up opacity-0"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>

            <Link
              href="/blog"
              className="md:hidden mt-8 flex items-center justify-center gap-2 font-mono text-sm text-accent-cyan hover:text-accent-magenta transition-colors"
            >
              View all posts →
            </Link>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-20 px-6 md:px-12 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-cyan/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="p-8 md:p-12 border border-border bg-background-card/50 backdrop-blur-sm">
            <span className="font-mono text-sm text-accent-green mb-4 block">
              {"$ "}<span className="text-text-primary">subscribe</span> --newsletter
            </span>

            <h2 className="font-mono text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Join the <span className="text-accent-cyan">Network</span>
            </h2>

            <p className="text-text-secondary mb-8">
              Get notified when I publish new transmissions. No spam, unsubscribe anytime.
            </p>

            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs px-3 py-1 border border-accent-cyan/50 text-accent-cyan bg-accent-cyan/5 hover:bg-accent-cyan/10 transition-colors">
      {children}
    </span>
  );
}
