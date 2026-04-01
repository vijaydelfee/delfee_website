interface CodeBlockProps {
  code: string;
  language?: string;
  showCursor?: boolean;
}

export function CodeBlock({ code, language, showCursor = false }: CodeBlockProps) {
  return (
    <div
      className="relative overflow-x-auto rounded-lg border font-mono text-sm"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {language && (
        <div
          className="border-b px-4 py-1.5 text-xs"
          style={{
            color: "var(--muted)",
            borderColor: "var(--border)",
          }}
        >
          {language}
        </div>
      )}
      <pre className="p-4">
        <code style={{ color: "var(--text)" }}>
          {code}
          {showCursor && (
            <span className="animate-blink ml-0.5 inline-block h-4 w-[2px] align-middle" style={{ background: "var(--accent)" }} />
          )}
        </code>
      </pre>
    </div>
  );
}
