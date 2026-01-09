# ericgrill.com Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a minimal personal brand website with blog for Eric Grill at ericgrill.com.

**Architecture:** Next.js 14 App Router with MDX blog posts stored as files. Static generation for performance. Tailwind CSS for styling with a minimal white + electric blue design system.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, MDX, ConvertKit (newsletter), Vercel (hosting)

**Design Reference:** [docs/plans/2025-01-09-ericgrill-website-design.md](./2025-01-09-ericgrill-website-design.md)

---

## Task 1: Project Setup

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `next.config.mjs`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/page.tsx`
- Create: `.gitignore`

**Step 1: Initialize Next.js project**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

Expected: Project scaffolded with Next.js 14, TypeScript, Tailwind, App Router

**Step 2: Verify project runs**

Run: `npm run dev`
Expected: Dev server starts at localhost:3000

**Step 3: Clean up default content**

Replace `app/page.tsx` with:
```tsx
export default function Home() {
  return (
    <main className="min-h-screen">
      <h1>Eric Grill</h1>
    </main>
  );
}
```

**Step 4: Set up design tokens in globals.css**

Replace `app/globals.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #FFFFFF;
  --background-alt: #F8F9FA;
  --text-primary: #121212;
  --text-secondary: #6B7280;
  --accent: #2563EB;
  --border: #E5E7EB;
}

body {
  background: var(--background);
  color: var(--text-primary);
}
```

**Step 5: Configure Tailwind with custom colors**

Update `tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-alt": "var(--background-alt)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        accent: "var(--accent)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 6: Update layout with Inter font**

Update `app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eric Grill",
  description: "Builder. Pilot. Grappler. Writing about AI, aviation, jiu jitsu, blockchain, and programming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

**Step 7: Verify styling works**

Run: `npm run dev`
Visit: localhost:3000
Expected: Page shows "Eric Grill" with Inter font

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js project with Tailwind and design tokens"
```

---

## Task 2: Header Component

**Files:**
- Create: `components/Header.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create Header component**

Create `components/Header.tsx`:
```tsx
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
```

**Step 2: Add Header to layout**

Update `app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eric Grill",
  description: "Builder. Pilot. Grappler. Writing about AI, aviation, jiu jitsu, blockchain, and programming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
```

**Step 3: Verify header renders**

Run: `npm run dev`
Expected: Header with "Eric Grill" logo and Blog/About/Contact links

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Header component with navigation"
```

---

## Task 3: Footer Component

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create Footer component**

Create `components/Footer.tsx`:
```tsx
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
```

**Step 2: Add Footer to layout**

Update `app/layout.tsx` body content:
```tsx
<body className={`${inter.className} flex flex-col min-h-screen`}>
  <Header />
  <main className="flex-1">{children}</main>
  <Footer />
</body>
```

Add import: `import { Footer } from "@/components/Footer";`

**Step 3: Verify footer renders**

Run: `npm run dev`
Expected: Footer at bottom with copyright and contact link

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Footer component"
```

---

## Task 4: Home Page Hero Section

**Files:**
- Modify: `app/page.tsx`

**Step 1: Build hero section**

Update `app/page.tsx`:
```tsx
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
```

**Step 2: Verify hero renders**

Run: `npm run dev`
Expected: Large hero with name, tagline, and CTA button

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add home page hero section"
```

---

## Task 5: MDX Blog Setup

**Files:**
- Create: `content/posts/hello-world.mdx`
- Create: `lib/posts.ts`
- Modify: `package.json` (dependencies)
- Modify: `next.config.mjs`

**Step 1: Install MDX dependencies**

Run:
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter reading-time
npm install -D @types/mdx
```

**Step 2: Create posts directory and sample post**

Create `content/posts/hello-world.mdx`:
```mdx
---
title: "Hello World"
date: "2025-01-09"
topics: ["programming"]
excerpt: "Welcome to my blog. This is the first post."
---

# Hello World

Welcome to my blog! I'm Eric Grill, and I write about AI, aviation, jiu jitsu, blockchain, and programming.

## What to expect

I'll be sharing thoughts and experiences from my journey as a builder, pilot, and grappler.

Stay tuned for more.
```

**Step 3: Create posts library**

Create `lib/posts.ts`:
```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type Topic = "ai" | "aviation" | "jiu-jitsu" | "blockchain" | "programming";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  topics: Topic[];
  excerpt: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        topics: data.topics || [],
        excerpt: data.excerpt || "",
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    topics: data.topics || [],
    excerpt: data.excerpt || "",
    readingTime: readingTime(content).text,
    content,
  };
}

export function getPostsByTopic(topic: Topic): PostMeta[] {
  return getAllPosts().filter((post) => post.topics.includes(topic));
}

export const TOPICS: { value: Topic; label: string }[] = [
  { value: "ai", label: "AI" },
  { value: "aviation", label: "Aviation" },
  { value: "jiu-jitsu", label: "Jiu Jitsu" },
  { value: "blockchain", label: "Blockchain" },
  { value: "programming", label: "Programming" },
];
```

**Step 4: Verify posts library works**

Create a quick test in `app/page.tsx` temporarily:
```tsx
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  console.log("Posts:", posts);
  // ... rest of component
}
```

Run: `npm run dev`
Check terminal for "Posts:" output with hello-world post

**Step 5: Remove test code and commit**

Remove the console.log and posts import from page.tsx

```bash
git add -A
git commit -m "feat: add MDX blog infrastructure with posts library"
```

---

## Task 6: Blog Index Page

**Files:**
- Create: `app/blog/page.tsx`
- Create: `components/PostCard.tsx`
- Create: `components/TopicFilter.tsx`

**Step 1: Create PostCard component**

Create `components/PostCard.tsx`:
```tsx
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex flex-wrap gap-2 mb-2">
          {post.topics.map((topic) => (
            <span
              key={topic}
              className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded"
            >
              {topic.replace("-", " ")}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-semibold text-text-primary group-hover:text-accent transition-colors mb-2">
          {post.title}
        </h2>
        <p className="text-text-secondary text-sm mb-2">
          {post.date} · {post.readingTime}
        </p>
        <p className="text-text-secondary">{post.excerpt}</p>
      </Link>
    </article>
  );
}
```

**Step 2: Create TopicFilter component**

Create `components/TopicFilter.tsx`:
```tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TOPICS } from "@/lib/posts";

export function TopicFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTopic = searchParams.get("topic");

  const handleFilter = (topic: string | null) => {
    if (topic) {
      router.push(`/blog?topic=${topic}`);
    } else {
      router.push("/blog");
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => handleFilter(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !currentTopic
            ? "bg-accent text-white"
            : "bg-background-alt text-text-secondary hover:text-accent"
        }`}
      >
        All
      </button>
      {TOPICS.map((topic) => (
        <button
          key={topic.value}
          onClick={() => handleFilter(topic.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentTopic === topic.value
              ? "bg-accent text-white"
              : "bg-background-alt text-text-secondary hover:text-accent"
          }`}
        >
          {topic.label}
        </button>
      ))}
    </div>
  );
}
```

**Step 3: Create blog index page**

Create `app/blog/page.tsx`:
```tsx
import { Suspense } from "react";
import { getAllPosts, getPostsByTopic, type Topic } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { TopicFilter } from "@/components/TopicFilter";

interface BlogPageProps {
  searchParams: Promise<{ topic?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const topic = params.topic as Topic | undefined;
  const posts = topic ? getPostsByTopic(topic) : getAllPosts();

  return (
    <div className="py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">
          Blog
        </h1>

        <Suspense fallback={<div>Loading...</div>}>
          <TopicFilter />
        </Suspense>

        {posts.length === 0 ? (
          <p className="text-text-secondary">No posts yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 4: Verify blog page**

Run: `npm run dev`
Visit: localhost:3000/blog
Expected: Blog page with topic filters and hello-world post card

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add blog index page with topic filtering"
```

---

## Task 7: Individual Blog Post Page

**Files:**
- Create: `app/blog/[slug]/page.tsx`
- Install: MDX processing packages

**Step 1: Install MDX rendering packages**

Run:
```bash
npm install next-mdx-remote
```

**Step 2: Create blog post page**

Create `app/blog/[slug]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Eric Grill`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.topics.map((topic) => (
              <Link
                key={topic}
                href={`/blog?topic=${topic}`}
                className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded hover:bg-accent/20 transition-colors"
              >
                {topic.replace("-", " ")}
              </Link>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {post.title}
          </h1>
          <p className="text-text-secondary">
            {post.date} · {post.readingTime}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none prose-headings:text-text-primary prose-p:text-text-primary prose-a:text-accent prose-strong:text-text-primary prose-code:text-accent prose-code:bg-background-alt prose-code:px-1 prose-code:rounded">
          <MDXRemote source={post.content} />
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/blog"
            className="text-accent hover:underline"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    </article>
  );
}
```

**Step 3: Install Tailwind typography plugin**

Run:
```bash
npm install -D @tailwindcss/typography
```

Update `tailwind.config.ts` plugins:
```ts
plugins: [require("@tailwindcss/typography")],
```

**Step 4: Verify post page**

Run: `npm run dev`
Visit: localhost:3000/blog/hello-world
Expected: Full blog post with rendered MDX content

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add individual blog post page with MDX rendering"
```

---

## Task 8: Featured Posts on Home Page

**Files:**
- Modify: `app/page.tsx`

**Step 1: Add featured posts section**

Update `app/page.tsx`:
```tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

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

      {/* Featured Posts Section */}
      {posts.length > 0 && (
        <section className="py-16 px-6 md:px-12 bg-background-alt">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                Latest
              </h2>
              <Link
                href="/blog"
                className="text-accent hover:underline"
              >
                View all posts →
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
```

**Step 2: Verify featured posts**

Run: `npm run dev`
Visit: localhost:3000
Expected: Hero + featured posts section showing hello-world post

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add featured posts section to home page"
```

---

## Task 9: Newsletter Section

**Files:**
- Create: `components/NewsletterForm.tsx`
- Modify: `app/page.tsx`

**Step 1: Create NewsletterForm component**

Create `components/NewsletterForm.tsx`:
```tsx
"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // TODO: Integrate with ConvertKit API
    // For now, simulate success
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-3 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
      {status === "success" && (
        <p className="text-green-600 text-sm mt-2 sm:mt-0 sm:ml-2 self-center">Subscribed!</p>
      )}
    </form>
  );
}
```

**Step 2: Add newsletter section to home page**

Add to `app/page.tsx` after featured posts section:
```tsx
{/* Newsletter Section */}
<section className="py-16 px-6 md:px-12">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
      Stay in the loop
    </h2>
    <p className="text-text-secondary mb-6">
      Get notified when I publish new posts. No spam, unsubscribe anytime.
    </p>
    <div className="flex justify-center">
      <NewsletterForm />
    </div>
  </div>
</section>
```

Add import: `import { NewsletterForm } from "@/components/NewsletterForm";`

**Step 3: Verify newsletter form**

Run: `npm run dev`
Visit: localhost:3000
Expected: Newsletter section with email form below featured posts

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add newsletter signup section"
```

---

## Task 10: About Page

**Files:**
- Create: `app/about/page.tsx`

**Step 1: Create about page**

Create `app/about/page.tsx`:
```tsx
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
```

**Step 2: Verify about page**

Run: `npm run dev`
Visit: localhost:3000/about
Expected: About page with bio content

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add about page"
```

---

## Task 11: Contact Page

**Files:**
- Create: `app/contact/page.tsx`
- Create: `app/api/contact/route.ts`

**Step 1: Create contact page**

Create `app/contact/page.tsx`:
```tsx
"use client";

import { useState } from "react";
import type { Metadata } from "next";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="py-16 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Contact
        </h1>
        <p className="text-text-secondary mb-8">
          Have a question, idea, or opportunity? I'd love to hear from you.
        </p>

        {status === "success" ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <p className="text-green-800">
              Thanks for reaching out! I'll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send message"}
            </button>

            {status === "error" && (
              <p className="text-red-600 text-sm">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Create contact API route**

Create `app/api/contact/route.ts`:
```ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // For now, just log and return success
    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
```

**Step 3: Verify contact page**

Run: `npm run dev`
Visit: localhost:3000/contact
Expected: Contact form that submits and shows success message

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add contact page with form"
```

---

## Task 12: Mobile Navigation

**Files:**
- Modify: `components/Header.tsx`

**Step 1: Add mobile hamburger menu**

Update `components/Header.tsx`:
```tsx
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
```

**Step 2: Verify mobile nav**

Run: `npm run dev`
Resize browser to mobile width
Expected: Hamburger menu that toggles nav links

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add mobile navigation menu"
```

---

## Task 13: Final Polish and Build Test

**Files:**
- Modify: `app/layout.tsx` (favicon)
- Create: `public/favicon.ico` (placeholder)

**Step 1: Add simple favicon placeholder**

Run:
```bash
# Create a simple placeholder - will be replaced with real favicon later
echo "" > public/favicon.ico
```

**Step 2: Run production build**

Run:
```bash
npm run build
```

Expected: Build succeeds with no errors

**Step 3: Test production build**

Run:
```bash
npm run start
```

Visit: localhost:3000
Expected: Site works in production mode

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: production build verification"
```

---

## Task 14: Deploy to Vercel

**Step 1: Push to GitHub**

Create repo on GitHub, then:
```bash
git remote add origin https://github.com/[username]/ericgrill.git
git branch -M main
git push -u origin main
```

**Step 2: Connect to Vercel**

1. Go to vercel.com
2. Import GitHub repository
3. Deploy with default settings

Expected: Site live at [project].vercel.app

**Step 3: Configure custom domain**

1. In Vercel dashboard, go to project Settings → Domains
2. Add ericgrill.com
3. Update DNS at domain registrar to point to Vercel

---

## Summary

After completing all tasks, you'll have:

- ✅ Next.js 14 site with Tailwind CSS
- ✅ Home page with hero + featured posts + newsletter
- ✅ Blog with topic filtering (AI, Aviation, Jiu Jitsu, Blockchain, Programming)
- ✅ Individual blog post pages with MDX rendering
- ✅ About page
- ✅ Contact page with form
- ✅ Mobile-responsive navigation
- ✅ Deployed to Vercel

**Future enhancements (not in this plan):**
- ConvertKit API integration for newsletter
- Email service integration for contact form
- Professional photography
- RSS feed
- Dark mode
