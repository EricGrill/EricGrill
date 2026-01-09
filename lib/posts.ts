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
