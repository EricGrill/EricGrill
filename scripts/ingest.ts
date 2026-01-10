#!/usr/bin/env npx tsx
/**
 * Eric Engine Ingestion Script
 *
 * Parses all content sources and upserts to Qdrant vector database.
 *
 * Usage:
 *   npx tsx scripts/ingest.ts           # Full ingestion
 *   npx tsx scripts/ingest.ts --blog    # Blog posts only
 *   npx tsx scripts/ingest.ts --philosophy # Philosophy files only
 *   npx tsx scripts/ingest.ts --pages   # Static pages only
 *   npx tsx scripts/ingest.ts --press   # Press/media articles only
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import crypto from 'crypto';
import { ensureCollection, upsertChunks, deleteBySource } from '../lib/engine/qdrant';
import { getEmbeddings } from '../lib/engine/embeddings';
import type { ContentChunk, ChunkMetadata } from '../lib/engine/types';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const PHILOSOPHY_DIR = path.join(process.cwd(), 'philosophy');
const PRESS_FILE = path.join(CONTENT_DIR, 'press.json');
const CHUNK_SIZE = 1000; // Target chunk size in characters
const CHUNK_OVERLAP = 200; // Overlap between chunks

// Generate deterministic UUID from content
function generateId(source: string, file: string, chunkIndex: number): string {
  const hash = crypto.createHash('md5').update(`${source}:${file}:${chunkIndex}`).digest('hex');
  // Format as UUID: 8-4-4-4-12
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}

// Split text into chunks with overlap
function chunkText(text: string, chunkSize: number = CHUNK_SIZE, overlap: number = CHUNK_OVERLAP): string[] {
  const chunks: string[] = [];

  // Split by paragraphs first
  const paragraphs = text.split(/\n\n+/);
  let currentChunk = '';

  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      // Start new chunk with overlap from previous
      const words = currentChunk.split(' ');
      const overlapWords = words.slice(-Math.ceil(overlap / 5)); // Approximate word count for overlap
      currentChunk = overlapWords.join(' ') + '\n\n' + paragraph;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

// Extract section from chunk based on nearest heading
function extractSection(content: string, chunkStart: number): string | undefined {
  const beforeChunk = content.substring(0, chunkStart);
  const headingMatch = beforeChunk.match(/^##?\s+(.+)$/gm);
  if (headingMatch && headingMatch.length > 0) {
    return headingMatch[headingMatch.length - 1].replace(/^#+\s+/, '');
  }
  return undefined;
}

// Parse blog posts
async function parseBlogPosts(): Promise<ContentChunk[]> {
  const postsDir = path.join(CONTENT_DIR, 'posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));
  const chunks: ContentChunk[] = [];

  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content: body } = matter(content);

    const slug = file.replace('.mdx', '');
    const textChunks = chunkText(body);

    for (let i = 0; i < textChunks.length; i++) {
      const chunkContent = textChunks[i];

      // Create rich context for embedding
      const contextPrefix = `Title: ${frontmatter.title}\nTopics: ${(frontmatter.topics || []).join(', ')}\n\n`;

      chunks.push({
        id: generateId('blog', file, i),
        content: contextPrefix + chunkContent,
        metadata: {
          source: 'blog',
          sourceFile: file,
          title: frontmatter.title,
          date: frontmatter.date,
          topics: frontmatter.topics,
          section: extractSection(body, body.indexOf(chunkContent)),
          chunkIndex: i,
          url: `/blog/${slug}`,
        },
      });
    }

    console.log(`Parsed: ${file} (${textChunks.length} chunks)`);
  }

  return chunks;
}

// Parse philosophy files
async function parsePhilosophyFiles(): Promise<ContentChunk[]> {
  if (!fs.existsSync(PHILOSOPHY_DIR)) {
    console.log('Philosophy directory not found, skipping...');
    return [];
  }

  const files = fs.readdirSync(PHILOSOPHY_DIR).filter(f => f.endsWith('.md'));
  const chunks: ContentChunk[] = [];

  for (const file of files) {
    const filePath = path.join(PHILOSOPHY_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content: body } = matter(content);

    const category = file.replace('.md', '');
    const title = frontmatter.title || category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const textChunks = chunkText(body);

    for (let i = 0; i < textChunks.length; i++) {
      const chunkContent = textChunks[i];

      // Philosophy files get higher context weight
      const contextPrefix = `[PHILOSOPHY - ${title}]\n\n`;

      chunks.push({
        id: generateId('philosophy', file, i),
        content: contextPrefix + chunkContent,
        metadata: {
          source: 'philosophy',
          sourceFile: file,
          title,
          chunkIndex: i,
        },
      });
    }

    console.log(`Parsed philosophy: ${file} (${textChunks.length} chunks)`);
  }

  return chunks;
}

// Parse static content pages
async function parseStaticPages(): Promise<ContentChunk[]> {
  const chunks: ContentChunk[] = [];

  // Manifesto
  const manifestoPath = path.join(CONTENT_DIR, 'manifesto.md');
  if (fs.existsSync(manifestoPath)) {
    const content = fs.readFileSync(manifestoPath, 'utf-8');
    const { content: body } = matter(content);

    const textChunks = chunkText(body);
    for (let i = 0; i < textChunks.length; i++) {
      chunks.push({
        id: generateId('manifesto', 'manifesto.md', i),
        content: '[MANIFESTO - Core Philosophy]\n\n' + textChunks[i],
        metadata: {
          source: 'manifesto',
          sourceFile: 'manifesto.md',
          title: 'Manifesto',
          chunkIndex: i,
          url: '/',
        },
      });
    }
    console.log(`Parsed: manifesto.md (${textChunks.length} chunks)`);
  }

  // Now page
  const nowPath = path.join(CONTENT_DIR, 'now.md');
  if (fs.existsSync(nowPath)) {
    const content = fs.readFileSync(nowPath, 'utf-8');
    const { content: body } = matter(content);

    const textChunks = chunkText(body);
    for (let i = 0; i < textChunks.length; i++) {
      chunks.push({
        id: generateId('now', 'now.md', i),
        content: '[CURRENT STATE - Now Page]\n\n' + textChunks[i],
        metadata: {
          source: 'now',
          sourceFile: 'now.md',
          title: 'Now',
          date: new Date().toISOString().split('T')[0], // Current date
          chunkIndex: i,
          url: '/now',
        },
      });
    }
    console.log(`Parsed: now.md (${textChunks.length} chunks)`);
  }

  return chunks;
}

// Parse press/media articles
interface PressArticle {
  title: string;
  source: string;
  date: string;
  url: string;
  excerpt: string;
  content: string;
  topics: string[];
}

async function parsePressArticles(): Promise<ContentChunk[]> {
  if (!fs.existsSync(PRESS_FILE)) {
    console.log('Press file not found, skipping...');
    return [];
  }

  const pressData = JSON.parse(fs.readFileSync(PRESS_FILE, 'utf-8')) as PressArticle[];
  const chunks: ContentChunk[] = [];

  for (const article of pressData) {
    const textChunks = chunkText(article.content);

    for (let i = 0; i < textChunks.length; i++) {
      const chunkContent = textChunks[i];

      // Create rich context for embedding
      const contextPrefix = `[PRESS - ${article.source}]\nTitle: ${article.title}\nDate: ${article.date}\nTopics: ${article.topics.join(', ')}\n\n`;

      chunks.push({
        id: generateId('press', article.url, i),
        content: contextPrefix + chunkContent,
        metadata: {
          source: 'press',
          sourceFile: article.source,
          title: article.title,
          date: article.date,
          topics: article.topics,
          chunkIndex: i,
          url: article.url,
        },
      });
    }

    console.log(`Parsed press: ${article.title} (${textChunks.length} chunks)`);
  }

  return chunks;
}

// Main ingestion function
async function ingest(options: { blog?: boolean; philosophy?: boolean; pages?: boolean; press?: boolean } = {}): Promise<void> {
  const all = !options.blog && !options.philosophy && !options.pages && !options.press;

  console.log('Starting Eric Engine ingestion...\n');

  // Ensure collection exists
  await ensureCollection();

  const allChunks: ContentChunk[] = [];

  // Parse content based on options
  if (all || options.blog) {
    console.log('\n--- Parsing Blog Posts ---');
    const blogChunks = await parseBlogPosts();
    if (blogChunks.length > 0) {
      await deleteBySource('blog');
      allChunks.push(...blogChunks);
    }
  }

  if (all || options.philosophy) {
    console.log('\n--- Parsing Philosophy Files ---');
    const philosophyChunks = await parsePhilosophyFiles();
    if (philosophyChunks.length > 0) {
      await deleteBySource('philosophy');
      allChunks.push(...philosophyChunks);
    }
  }

  if (all || options.pages) {
    console.log('\n--- Parsing Static Pages ---');
    const pageChunks = await parseStaticPages();
    if (pageChunks.length > 0) {
      await deleteBySource('manifesto');
      await deleteBySource('now');
      allChunks.push(...pageChunks);
    }
  }

  if (all || options.press) {
    console.log('\n--- Parsing Press Articles ---');
    const pressChunks = await parsePressArticles();
    if (pressChunks.length > 0) {
      await deleteBySource('press');
      allChunks.push(...pressChunks);
    }
  }

  if (allChunks.length === 0) {
    console.log('\nNo content to ingest.');
    return;
  }

  console.log(`\n--- Generating Embeddings for ${allChunks.length} chunks ---`);

  // Get embeddings
  const texts = allChunks.map(c => c.content);
  const embeddings = await getEmbeddings(texts);

  console.log('\n--- Upserting to Qdrant ---');

  // Upsert to Qdrant
  await upsertChunks(allChunks, embeddings);

  console.log(`\n✓ Ingestion complete. ${allChunks.length} chunks indexed.`);
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  blog: args.includes('--blog'),
  philosophy: args.includes('--philosophy'),
  pages: args.includes('--pages'),
  press: args.includes('--press'),
};

// Run
ingest(options).catch(err => {
  console.error('Ingestion failed:', err);
  process.exit(1);
});
