// Abstracted LLM layer - swap providers as needed

export type LLMProvider = 'anthropic' | 'openai';

interface LLMConfig {
  provider: LLMProvider;
  model?: string;
  apiKey?: string;
  maxTokens?: number;
  temperature?: number;
}

const defaultConfig: LLMConfig = {
  provider: 'anthropic',
  model: 'claude-sonnet-4-20250514',
  maxTokens: 2048,
  temperature: 0.7,
};

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface StreamCallbacks {
  onToken?: (token: string) => void;
  onComplete?: (fullText: string) => void;
  onError?: (error: Error) => void;
}

export async function generateResponse(
  messages: Message[],
  config: Partial<LLMConfig> = {}
): Promise<string> {
  const fullConfig = { ...defaultConfig, ...config };

  switch (fullConfig.provider) {
    case 'anthropic':
      return generateAnthropicResponse(messages, fullConfig);
    case 'openai':
      return generateOpenAIResponse(messages, fullConfig);
    default:
      throw new Error(`Unsupported LLM provider: ${fullConfig.provider}`);
  }
}

export async function* streamResponse(
  messages: Message[],
  config: Partial<LLMConfig> = {}
): AsyncGenerator<string, void, unknown> {
  const fullConfig = { ...defaultConfig, ...config };

  switch (fullConfig.provider) {
    case 'anthropic':
      yield* streamAnthropicResponse(messages, fullConfig);
      break;
    case 'openai':
      yield* streamOpenAIResponse(messages, fullConfig);
      break;
    default:
      throw new Error(`Unsupported LLM provider: ${fullConfig.provider}`);
  }
}

async function generateAnthropicResponse(
  messages: Message[],
  config: LLMConfig
): Promise<string> {
  const apiKey = config.apiKey || process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is required');
  }

  // Extract system message
  const systemMessage = messages.find(m => m.role === 'system');
  const conversationMessages = messages.filter(m => m.role !== 'system');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: config.maxTokens,
      temperature: config.temperature,
      system: systemMessage?.content,
      messages: conversationMessages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error: ${error}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

async function* streamAnthropicResponse(
  messages: Message[],
  config: LLMConfig
): AsyncGenerator<string, void, unknown> {
  const apiKey = config.apiKey || process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is required');
  }

  const systemMessage = messages.find(m => m.role === 'system');
  const conversationMessages = messages.filter(m => m.role !== 'system');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: config.maxTokens,
      temperature: config.temperature,
      system: systemMessage?.content,
      messages: conversationMessages.map(m => ({
        role: m.role,
        content: m.content,
      })),
      stream: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error: ${error}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
            yield parsed.delta.text;
          }
        } catch {
          // Ignore parse errors
        }
      }
    }
  }
}

async function generateOpenAIResponse(
  messages: Message[],
  config: LLMConfig
): Promise<string> {
  const apiKey = config.apiKey || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.model || 'gpt-4-turbo-preview',
      max_tokens: config.maxTokens,
      temperature: config.temperature,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function* streamOpenAIResponse(
  messages: Message[],
  config: LLMConfig
): AsyncGenerator<string, void, unknown> {
  const apiKey = config.apiKey || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.model || 'gpt-4-turbo-preview',
      max_tokens: config.maxTokens,
      temperature: config.temperature,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
      stream: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          if (parsed.choices?.[0]?.delta?.content) {
            yield parsed.choices[0].delta.content;
          }
        } catch {
          // Ignore parse errors
        }
      }
    }
  }
}
