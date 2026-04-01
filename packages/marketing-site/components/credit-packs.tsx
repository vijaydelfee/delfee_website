import { creditPacks } from "@/lib/pricing";

export function CreditPacks() {
  return (
    <section className="py-20" style={{ background: "var(--surface)" }}>
      <div className="section-container">
        <h2
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "var(--text)" }}
        >
          Credit packs
        </h2>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-4" style={{ scrollSnapType: "x mandatory" }}>
          {creditPacks.map((pack) => (
            <div
              key={pack.name}
              className="relative flex w-56 shrink-0 flex-col rounded-lg border p-5"
              style={{
                background: "var(--bg)",
                borderColor: pack.badge ? (pack.badgeColor ?? "var(--border)") : "var(--border)",
                scrollSnapAlign: "start",
              }}
            >
              {pack.badge && (
                <span
                  className="absolute -top-2.5 left-4 rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white"
                  style={{ background: pack.badgeColor }}
                >
                  {pack.badge}
                </span>
              )}

              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                {pack.name}
              </div>

              <div className="mt-3">
                {pack.price === 0 ? (
                  <span className="text-2xl font-bold" style={{ color: "var(--green)" }}>Free</span>
                ) : pack.price === -1 ? (
                  <span className="text-2xl font-bold" style={{ color: "var(--text)" }}>Custom</span>
                ) : (
                  <span className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                    ${pack.price.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                {pack.credits.toLocaleString()} credits
              </div>

              {pack.perCredit > 0 && (
                <div className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                  ${pack.perCredit}/credit
                </div>
              )}

              <div className="mt-auto pt-4">
                {pack.price === -1 ? (
                  <a
                    href="mailto:vijay@delfee.co,saravanan@delfee.co?subject=ShieldAI%20Enterprise"
                    className="block rounded-md py-2 text-center text-xs font-medium transition-colors"
                    style={{ background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)" }}
                  >
                    {pack.cta}
                  </a>
                ) : (
                  <button
                    className="w-full rounded-md py-2 text-xs font-medium text-white transition-colors"
                    style={{ background: "var(--accent)" }}
                  >
                    {pack.cta}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs" style={{ color: "var(--muted)" }}>
          Don&apos;t want to buy packs? Pay as you go at $0.01 per credit (1 credit per request).
          No minimum. No commitment. Your account starts with 5,000 free credits — enough for a 25-developer team for a full month.
        </p>
      </div>
    </section>
  );
}
