import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Eric Grill",
  description: "Builder. Pilot. Grappler. Learn more about Eric Grill.",
};

export default function AboutPage() {
  return (
    <div className="py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">
          About
        </h1>

        <div className="prose prose-lg max-w-none prose-headings:text-text-primary prose-p:text-text-primary prose-a:text-accent">
          <p>
            I'm Eric Grill—a builder, pilot, and grappler based in [location].
          </p>

          <p>
            I've been in the Bitcoin space since the early days, and I'm currently
            the CEO of{" "}
            <a href="https://chainbytes.com" target="_blank" rel="noopener noreferrer">
              Chainbytes
            </a>
            . Before that, I built and ran multiple startups, and worked as a
            software developer in financial services and hedge funds.
          </p>

          <p>
            Outside of tech, I'm a private pilot and a jiu jitsu practitioner.
            These pursuits have taught me as much about problem-solving and
            resilience as any startup has.
          </p>

          <p>
            This blog is where I share thoughts on AI, aviation, jiu jitsu,
            blockchain, and programming. I write to clarify my thinking and
            hopefully help others along the way.
          </p>

          <p>
            <Link href="/contact">Get in touch</Link> if you'd like to connect.
          </p>
        </div>
      </div>
    </div>
  );
}
