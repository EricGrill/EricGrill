import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface Manifesto {
  tagline: string;
  heroSubtitle: string;
  content: string;
}

export interface NowContent {
  updated: string;
  training: string;
  building: string;
  writing: string;
  content: string;
}

export interface BlogIntro {
  title: string;
  content: string;
}

export function getManifesto(): Manifesto {
  const fullPath = path.join(contentDirectory, "manifesto.md");

  if (!fs.existsSync(fullPath)) {
    return {
      tagline: "Building systems that survive when everything else breaks.",
      heroSubtitle: "Software. Bitcoin. Security. Combat.",
      content: "",
    };
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    tagline: data.tagline || "Building systems that survive when everything else breaks.",
    heroSubtitle: data.heroSubtitle || "Software. Bitcoin. Security. Combat.",
    content,
  };
}

export function getNow(): NowContent {
  const fullPath = path.join(contentDirectory, "now.md");

  if (!fs.existsSync(fullPath)) {
    return {
      updated: new Date().toISOString().split("T")[0],
      training: "",
      building: "",
      writing: "",
      content: "",
    };
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    updated: data.updated || new Date().toISOString().split("T")[0],
    training: data.training || "",
    building: data.building || "",
    writing: data.writing || "",
    content,
  };
}

export function getBlogIntro(): BlogIntro {
  const fullPath = path.join(contentDirectory, "blog-intro.md");

  if (!fs.existsSync(fullPath)) {
    return {
      title: "Field Notes from the Edge",
      content: "Live experiments in code, security, and performance.",
    };
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title || "Field Notes from the Edge",
    content: content.trim(),
  };
}
