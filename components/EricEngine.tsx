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

export function EricEngine() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('ask');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [currentSources, setCurrentSources] = useState<Source[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut: Cmd+K to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Only scroll when new messages are added (not during streaming to avoid jitter)
  useEffect(() => {
    if (messagesContainerRef.current && messages.length > 0) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages.length]);

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

  const modeDescriptions: Record<Mode, string> = {
    ask: 'Ask me anything',
    simulate: 'What would Eric do if...',
    explore: 'How have my views evolved on...',
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3
          bg-[var(--background-card)] border border-[var(--border)] rounded-lg
          hover:border-[var(--accent-cyan)] hover:glow-cyan transition-all duration-300
          ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Open Eric Engine"
      >
        <span className="text-[var(--accent-cyan)] font-mono text-sm">{'>'}</span>
        <span className="text-[var(--text-primary)] text-sm">Ask Eric</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs bg-[var(--background)]
          border border-[var(--border)] rounded text-[var(--text-secondary)]">
          {'\u2318'}K
        </kbd>
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main widget */}
      <div
        className={`fixed z-50 bottom-0 right-0 sm:bottom-6 sm:right-6
          w-full sm:w-[480px] max-h-[80vh] sm:max-h-[600px]
          bg-[var(--background-card)] border border-[var(--border)]
          sm:rounded-lg overflow-hidden shadow-2xl
          transition-all duration-300 ease-out
          ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--background)]">
          <div className="flex items-center gap-3">
            <span className="text-[var(--accent-cyan)] font-mono text-sm">{'>'}_</span>
            <span className="text-[var(--text-primary)] font-medium">Eric Engine</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mode tabs */}
        <div className="flex border-b border-[var(--border)]">
          {(['ask', 'simulate', 'explore'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 px-4 py-2 text-sm font-mono transition-all
                ${mode === m
                  ? 'text-[var(--accent-cyan)] border-b-2 border-[var(--accent-cyan)] bg-[var(--background)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background)]'
                }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {/* Messages area */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[400px]">
          {messages.length === 0 && !isStreaming && (
            <div className="text-center text-[var(--text-secondary)] py-8">
              <p className="font-mono text-sm mb-2">{modeDescriptions[mode]}</p>
              <p className="text-xs">Type your question below</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`${msg.role === 'user' ? 'text-right' : ''}`}>
              {msg.role === 'user' ? (
                <div className="inline-block max-w-[85%] px-3 py-2 rounded-lg bg-[var(--accent-cyan)]/10
                  border border-[var(--accent-cyan)]/30 text-[var(--text-primary)] text-sm">
                  {msg.content}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="prose prose-invert prose-sm max-w-none">
                    <div className="text-[var(--text-primary)] text-sm whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {msg.sources.slice(0, 3).map((source, j) => (
                        <a
                          key={j}
                          href={source.url || '#'}
                          className="inline-flex items-center gap-1 px-2 py-0.5 text-xs
                            bg-[var(--background)] border border-[var(--border)] rounded
                            text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]
                            hover:border-[var(--accent-cyan)] transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          {source.title.slice(0, 25)}{source.title.length > 25 ? '...' : ''}
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
            <div className="space-y-2">
              {currentSources.length > 0 && (
                <div className="text-xs text-[var(--text-secondary)] mb-2">
                  Searching {currentSources.length} sources...
                </div>
              )}
              <div className="text-[var(--text-primary)] text-sm whitespace-pre-wrap">
                {currentResponse}
                <span className="inline-block w-2 h-4 bg-[var(--accent-cyan)] animate-pulse ml-0.5" />
              </div>
            </div>
          )}

        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="border-t border-[var(--border)] p-3">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-cyan)] font-mono">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={modeDescriptions[mode]}
              disabled={isStreaming}
              className="flex-1 bg-transparent border-none outline-none
                text-[var(--text-primary)] placeholder-[var(--text-secondary)]
                font-mono text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className="px-3 py-1.5 bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30
                rounded text-[var(--accent-cyan)] text-sm font-mono
                hover:bg-[var(--accent-cyan)]/20 hover:border-[var(--accent-cyan)]
                disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isStreaming ? '...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
