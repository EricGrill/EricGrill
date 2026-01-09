"use client";

export type ViewMode = "grid" | "list" | "matrix";

interface ViewModeSelectorProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewModeSelector({ mode, onChange }: ViewModeSelectorProps) {
  const modes: { value: ViewMode; label: string; icon: React.ReactNode }[] = [
    {
      value: "grid",
      label: "Grid",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
          <rect x="1" y="1" width="6" height="6" rx="1" />
          <rect x="9" y="1" width="6" height="6" rx="1" />
          <rect x="1" y="9" width="6" height="6" rx="1" />
          <rect x="9" y="9" width="6" height="6" rx="1" />
        </svg>
      ),
    },
    {
      value: "list",
      label: "List",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
          <rect x="1" y="2" width="14" height="3" rx="1" />
          <rect x="1" y="7" width="14" height="3" rx="1" />
          <rect x="1" y="12" width="14" height="3" rx="1" />
        </svg>
      ),
    },
    {
      value: "matrix",
      label: "Matrix",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
          <rect x="1" y="1" width="3" height="3" />
          <rect x="6" y="1" width="3" height="3" />
          <rect x="11" y="1" width="3" height="3" />
          <rect x="1" y="6" width="3" height="3" />
          <rect x="6" y="6" width="3" height="3" />
          <rect x="11" y="6" width="3" height="3" />
          <rect x="1" y="11" width="3" height="3" />
          <rect x="6" y="11" width="3" height="3" />
          <rect x="11" y="11" width="3" height="3" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-background border border-border">
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => onChange(m.value)}
          title={m.label}
          className={`
            p-2 transition-all duration-200
            ${
              mode === m.value
                ? "bg-accent-cyan text-background shadow-glow-cyan"
                : "text-text-secondary hover:text-accent-cyan"
            }
          `}
        >
          {m.icon}
        </button>
      ))}
    </div>
  );
}
