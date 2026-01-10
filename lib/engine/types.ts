// Types for the Eric Engine

export interface ContentChunk {
  id: string;
  content: string;
  metadata: ChunkMetadata;
}

export interface ChunkMetadata {
  source: string;           // e.g., "blog", "philosophy", "about", "now", "manifesto"
  sourceFile: string;       // e.g., "bitcoin-2025.mdx"
  title: string;
  date?: string;            // ISO date string
  topics?: string[];
  section?: string;         // Section heading if applicable
  chunkIndex: number;       // Position in the document
  url?: string;             // URL path on the site
}

export interface SearchResult {
  content: string;
  metadata: ChunkMetadata;
  score: number;
}

export interface EngineQuery {
  query: string;
  mode: 'ask' | 'simulate' | 'explore';
  constraints?: Record<string, string>; // For simulation mode
}

export interface EngineResponse {
  answer: string;
  sources: SearchResult[];
  mode: 'ask' | 'simulate' | 'explore';
}

export interface PhilosophyPrior {
  category: string;
  content: string;
}
