import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { PhilosophyPrior } from './types';

const PHILOSOPHY_DIR = path.join(process.cwd(), 'philosophy');

// Cache for philosophy content
let philosophyCache: PhilosophyPrior[] | null = null;
let cacheTime: number = 0;
const CACHE_TTL = 60 * 1000; // 1 minute

export function loadPhilosophy(): PhilosophyPrior[] {
  const now = Date.now();

  // Return cached if still valid
  if (philosophyCache && now - cacheTime < CACHE_TTL) {
    return philosophyCache;
  }

  if (!fs.existsSync(PHILOSOPHY_DIR)) {
    return [];
  }

  const files = fs.readdirSync(PHILOSOPHY_DIR).filter(f => f.endsWith('.md'));
  const priors: PhilosophyPrior[] = [];

  for (const file of files) {
    const filePath = path.join(PHILOSOPHY_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { content: body } = matter(content);

    const category = file.replace('.md', '');

    priors.push({
      category,
      content: body.trim(),
    });
  }

  philosophyCache = priors;
  cacheTime = now;

  return priors;
}

export function getPhilosophyForMode(mode: 'ask' | 'simulate' | 'explore'): string {
  const priors = loadPhilosophy();

  // Always include core values
  const coreValues = priors.find(p => p.category === 'core-values');

  let relevantCategories: string[];

  switch (mode) {
    case 'ask':
      // For questions, include decision-making and engineering
      relevantCategories = ['core-values', 'decision-making', 'engineering', 'risk-profile'];
      break;
    case 'simulate':
      // For simulation, include risk profile and capital
      relevantCategories = ['core-values', 'risk-profile', 'capital', 'decision-making', 'evolution'];
      break;
    case 'explore':
      // For exploration, include evolution
      relevantCategories = ['core-values', 'evolution'];
      break;
    default:
      relevantCategories = ['core-values'];
  }

  const relevantPriors = priors.filter(p => relevantCategories.includes(p.category));

  return relevantPriors.map(p => p.content).join('\n\n---\n\n');
}

export function getFullPhilosophy(): string {
  const priors = loadPhilosophy();
  return priors.map(p => `## ${p.category.replace(/-/g, ' ').toUpperCase()}\n\n${p.content}`).join('\n\n---\n\n');
}
