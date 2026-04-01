const badges = [
  "No raw prompts stored — SHA-256 hashes only",
  "Self-hosted / air-gapped deployment",
  "SOC 2 Type II (Enterprise)",
  "Fail-closed by default",
  "Zero external dependencies at runtime",
  "mTLS between CLI and proxy",
];

export function SecurityBar() {
  return (
    <section className="py-16" style={{ background: "var(--bg)" }}>
      <div className="section-container">
        <h2
          className="mb-8 text-center text-lg font-semibold tracking-tight"
          style={{ color: "var(--text)" }}
        >
          Built for security teams
        </h2>
        <div
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {badges.map((badge) => (
            <div
              key={badge}
              className="flex shrink-0 items-center gap-2 rounded-full border px-4 py-2"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                scrollSnapAlign: "start",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="whitespace-nowrap text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                {badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
