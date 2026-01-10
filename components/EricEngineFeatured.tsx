'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

type Mode = 'ask' | 'simulate' | 'explore';

interface Source {
  title: string;
  url?: string;
  date?: string;
  score: number;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  mode: Mode;
}

const EXAMPLE_QUERIES: Record<Mode, string[]> = {
  ask: [
    'What\'s your philosophy on building startups?',
    'How do you approach learning new skills?',
    'What role does Bitcoin play in your thinking?',
  ],
  simulate: [
    'If I were 25, broke, and wanted to start a company...',
    'How would you approach a career pivot into tech?',
    'If you had to rebuild your network from scratch...',
  ],
  explore: [
    'How has your view on risk evolved over time?',
    'What contradictions exist in your past writing?',
    'How did your approach to training change?',
  ],
};

export function EricEngineFeatured() {
  const [mode, setMode] = useState<Mode>('ask');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [currentSources, setCurrentSources] = useState<Source[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentResponse]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      mode,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);
    setCurrentResponse('');
    setCurrentSources([]);

    try {
      const response = await fetch('/api/engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userMessage.content,
          mode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('[EricEngine] API error:', response.status, errorData);
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let fullResponse = '';
      let sources: Source[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.type === 'sources') {
                sources = data.sources;
                setCurrentSources(sources);
              } else if (data.type === 'token') {
                fullResponse += data.content;
                setCurrentResponse(fullResponse);
              } else if (data.type === 'error') {
                throw new Error(data.error);
              }
            } catch {
              // Ignore parse errors
            }
          }
        }
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: fullResponse,
        sources,
        mode,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setCurrentResponse('');
      setCurrentSources([]);
    } catch (error) {
      console.error('[EricEngine] Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to process your request. Please try again.'}`,
        mode,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsStreaming(false);
    }
  }, [input, mode, isStreaming]);

  const handleExampleClick = (query: string) => {
    setInput(query);
    inputRef.current?.focus();
  };

  const modeInfo: Record<Mode, { title: string; description: string; color: string }> = {
    ask: {
      title: 'Ask',
      description: 'Direct answers from my experience',
      color: 'cyan',
    },
    simulate: {
      title: 'Simulate',
      description: 'Project what I\'d do in your situation',
      color: 'magenta',
    },
    explore: {
      title: 'Explore',
      description: 'See how my thinking evolved',
      color: 'green',
    },
  };

  return (
    <section className="py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 circuit-bg opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-magenta/5 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="font-mono text-sm text-accent-cyan mb-2 block">
            {"// "}query_the_mind
          </span>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-text-primary mb-4">
            <span className="text-accent-cyan">{'>'}</span> Eric Engine
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            A queryable model of my thinking. Ask questions, simulate decisions, explore how my views evolved.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-[var(--background-card)] border border-[var(--border)] rounded-lg overflow-hidden shadow-2xl">
          {/* Mode tabs */}
          <div className="grid grid-cols-3 border-b border-[var(--border)]">
            {(['ask', 'simulate', 'explore'] as Mode[]).map((m) => {
              const info = modeInfo[m];
              const isActive = mode === m;
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`relative px-4 py-4 text-center transition-all group
                    ${isActive
                      ? `bg-[var(--background)] text-[var(--accent-${info.color})]`
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background)]'
                    }`}
                >
                  <div className="font-mono text-sm font-medium mb-1">
                    {info.title}
                  </div>
                  <div className="text-xs opacity-70 hidden sm:block">
                    {info.description}
                  </div>
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: `var(--accent-${info.color})` }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Messages area */}
          <div className="min-h-[300px] max-h-[400px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && !isStreaming ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <div className="inline-block p-4 rounded-full bg-[var(--background)] mb-4">
                    <svg className="w-8 h-8 text-[var(--accent-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm">
                    Try one of these, or ask your own question:
                  </p>
                </div>

                <div className="grid gap-2">
                  {EXAMPLE_QUERIES[mode].map((query, i) => (
                    <button
                      key={i}
                      onClick={() => handleExampleClick(query)}
                      className="text-left px-4 py-3 rounded-lg border border-[var(--border)]
                        bg-[var(--background)] hover:border-[var(--accent-cyan)] hover:bg-[var(--background-alt)]
                        text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                        transition-all group"
                    >
                      <span className="text-[var(--accent-cyan)] font-mono mr-2 group-hover:text-[var(--accent-cyan)]">{'>'}</span>
                      <span className="text-sm">{query}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div key={i} className={`${msg.role === 'user' ? 'text-right' : ''}`}>
                    {msg.role === 'user' ? (
                      <div className="inline-block max-w-[85%] px-4 py-3 rounded-lg bg-[var(--accent-cyan)]/10
                        border border-[var(--accent-cyan)]/30 text-[var(--text-primary)] text-sm">
                        {msg.content}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--accent-cyan)]/10
                            border border-[var(--accent-cyan)]/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-[var(--accent-cyan)] font-mono text-xs">EG</span>
                          </div>
                          <div className="flex-1 text-[var(--text-primary)] text-sm whitespace-pre-wrap leading-relaxed">
                            {msg.content}
                          </div>
                        </div>
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="flex flex-wrap gap-2 ml-11">
                            {msg.sources.slice(0, 4).map((source, j) => (
                              <a
                                key={j}
                                href={source.url || '#'}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs
                                  bg-[var(--background)] border border-[var(--border)] rounded-full
                                  text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]
                                  hover:border-[var(--accent-cyan)] transition-colors"
                              >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                {source.title.slice(0, 30)}{source.title.length > 30 ? '...' : ''}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Streaming response */}
                {isStreaming && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--accent-cyan)]/10
                        border border-[var(--accent-cyan)]/30 flex items-center justify-center flex-shrink-0 animate-pulse">
                        <span className="text-[var(--accent-cyan)] font-mono text-xs">EG</span>
                      </div>
                      <div className="flex-1">
                        {currentSources.length > 0 && currentResponse === '' && (
                          <div className="text-xs text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Searching {currentSources.length} sources...
                          </div>
                        )}
                        <div className="text-[var(--text-primary)] text-sm whitespace-pre-wrap leading-relaxed">
                          {currentResponse}
                          <span className="inline-block w-2 h-4 bg-[var(--accent-cyan)] animate-pulse ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="border-t border-[var(--border)] p-4 bg-[var(--background)]">
            <div className="flex items-center gap-3">
              <span className="text-[var(--accent-cyan)] font-mono text-lg">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`${modeInfo[mode].title}: ${modeInfo[mode].description}...`}
                disabled={isStreaming}
                className="flex-1 bg-transparent border-none outline-none
                  text-[var(--text-primary)] placeholder-[var(--text-secondary)]
                  font-mono text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className="px-5 py-2 bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/50
                  rounded-lg text-[var(--accent-cyan)] text-sm font-mono
                  hover:bg-[var(--accent-cyan)]/20 hover:border-[var(--accent-cyan)]
                  disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isStreaming ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  'Ask'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-[var(--text-secondary)] mt-4 font-mono">
          Press <kbd className="px-1.5 py-0.5 bg-[var(--background-card)] border border-[var(--border)] rounded">{'\u2318'}K</kbd> anywhere to open quick chat
        </p>
      </div>
    </section>
  );
}
