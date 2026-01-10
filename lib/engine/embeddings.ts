// Abstracted embedding layer - swap providers as needed

export type EmbeddingProvider = 'openai' | 'anthropic' | 'local';

interface EmbeddingConfig {
  provider: EmbeddingProvider;
  model?: string;
  apiKey?: string;
  baseUrl?: string;
}

const defaultConfig: EmbeddingConfig = {
  provider: 'openai',
  model: 'text-embedding-ada-002',
};

export async function getEmbedding(
  text: string,
  config: Partial<EmbeddingConfig> = {}
): Promise<number[]> {
  const fullConfig = { ...defaultConfig, ...config };

  switch (fullConfig.provider) {
    case 'openai':
      return getOpenAIEmbedding(text, fullConfig);
    default:
      throw new Error(`Unsupported embedding provider: ${fullConfig.provider}`);
  }
}

export async function getEmbeddings(
  texts: string[],
  config: Partial<EmbeddingConfig> = {}
): Promise<number[][]> {
  const fullConfig = { ...defaultConfig, ...config };

  switch (fullConfig.provider) {
    case 'openai':
      return getOpenAIEmbeddings(texts, fullConfig);
    default:
      throw new Error(`Unsupported embedding provider: ${fullConfig.provider}`);
  }
}

async function getOpenAIEmbedding(
  text: string,
  config: EmbeddingConfig
): Promise<number[]> {
  const apiKey = config.apiKey || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.model || 'text-embedding-ada-002',
      input: text,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

async function getOpenAIEmbeddings(
  texts: string[],
  config: EmbeddingConfig
): Promise<number[][]> {
  const apiKey = config.apiKey || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  // Process in batches of 100 (OpenAI limit)
  const batchSize = 100;
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);

    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: config.model || 'text-embedding-ada-002',
        input: batch,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    const embeddings = data.data
      .sort((a: any, b: any) => a.index - b.index)
      .map((d: any) => d.embedding);

    allEmbeddings.push(...embeddings);

    if (i + batchSize < texts.length) {
      // Rate limiting: wait between batches
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return allEmbeddings;
}
