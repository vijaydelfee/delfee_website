export function SocialProof() {
  return (
    <section className="py-20" style={{ background: "var(--surface)" }}>
      <div className="section-container text-center">
        <h2 className="text-lg font-semibold tracking-tight" style={{ color: "var(--muted)" }}>
          Trusted by engineering teams at
        </h2>

        <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex h-16 items-center justify-center rounded-lg border"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}
            >
              <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
                Your Logo
              </span>
            </div>
          ))}
        </div>

        <blockquote className="mx-auto mt-12 max-w-xl">
          <p
            className="text-base italic leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            &ldquo;ShieldAI gave us visibility into $40K/month in AI spend we didn&apos;t know we had.
            Setup took 10 minutes.&rdquo;
          </p>
          <footer className="mt-4">
            <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
              — Engineering Leader, Series B SaaS Company
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
