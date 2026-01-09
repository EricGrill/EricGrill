import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6">
            Eric Grill
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl">
            Builder. Pilot. Grappler. Writing about AI, aviation, jiu jitsu, blockchain, and programming.
          </p>
          <Link
            href="/blog"
            className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Read the blog
          </Link>
        </div>
      </section>
    </div>
  );
}
