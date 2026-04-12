/* eslint-disable @next/next/no-img-element */

const products = [
  {
    name: "ShieldAI",
    logo: "/logos/ShieldAI.png",
    tagline: "Guardrails for AI coding tools",
    description:
      "Policy enforcement, PII detection, and ECS-compliant audit for every prompt your developers send.",
    href: "/",
    cta: "You are here",
    current: true,
  },
  {
    name: "SpendLens",
    logo: "/logos/Spendlens.png",
    tagline: "AI cost visibility for engineering teams",
    description:
      "Per-developer, per-team visibility into AI coding tool costs. Know what Claude Code, Cursor, and Copilot actually cost your engineering org.",
    href: "/legacy/spendlens/",
    cta: "Learn more",
    current: false,
  },
];

export function SocialProof() {
  return (
    <section className="py-20 sm:py-28" style={{ background: "var(--surface)" }}>
      <div className="section-container text-center">
        <p
          className="text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: "var(--muted)" }}
        >
          Part of the Delfee platform
        </p>
        <h2
          className="mx-auto mt-3 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "var(--text)" }}
        >
          Two products. One mission: make AI usage safe and observable.
        </h2>
        <p
          className="mx-auto mt-3 max-w-xl text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Delfee builds infrastructure for engineering and product teams who need
          governance, usage controls, and full audit trails over how AI is used inside
          their organization.
        </p>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {products.map((p) => (
            <a
              key={p.name}
              href={p.href}
              className="group relative flex flex-col rounded-xl border p-6 text-left transition-all hover:border-[var(--accent)]"
              style={{
                background: "var(--bg)",
                borderColor: "var(--border)",
              }}
              aria-label={`${p.name} — ${p.tagline}`}
            >
              <div className="flex h-12 items-center">
                <img
                  src={p.logo}
                  alt={`${p.name} wordmark`}
                  className="h-7 w-auto select-none sm:h-8"
                  draggable={false}
                />
              </div>
              <p
                className="mt-4 text-sm font-semibold"
                style={{ color: "var(--text)" }}
              >
                {p.tagline}
              </p>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {p.description}
              </p>
              <span
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: p.current ? "var(--muted)" : "var(--accent)" }}
              >
                {p.cta}
                {!p.current && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                )}
              </span>
              {p.current && (
                <span
                  className="absolute right-4 top-4 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    borderColor: "var(--accent)",
                    color: "var(--accent)",
                    background: "rgba(127, 119, 221, 0.08)",
                  }}
                >
                  This site
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
