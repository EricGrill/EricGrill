import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Topic } from "./topics";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type { Topic };

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  topics: Topic[];
  excerpt: string;
  readingTime: string;
  heroImage?: string;
  featured?: boolean;
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
        heroImage: data.heroImage || undefined,
        featured: data.featured || false,
      };
    })
    .sort((a, b) => {
      // Featured posts come first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Then sort by date
      return a.date > b.date ? -1 : 1;
    });

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
    heroImage: data.heroImage || undefined,
    content,
  };
}

export function getPostsByTopic(topic: Topic): PostMeta[] {
  return getAllPosts().filter((post) => post.topics.includes(topic));
}

// Re-export TOPICS from topics.ts for backward compatibility
export { TOPICS } from "./topics";
