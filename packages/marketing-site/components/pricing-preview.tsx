import Link from "next/link";

export function PricingPreview() {
  return (
    <section className="py-20 sm:py-28" style={{ background: "var(--surface)" }}>
      <div className="section-container text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--text)" }}>
          Simple, usage-based pricing
        </h2>

        <div className="mx-auto mt-10 grid max-w-2xl gap-6 sm:grid-cols-2">
          {[
            { label: "1 request = 1 credit = $0.01", sub: "Base rate" },
            { label: "5,000 free credits", sub: "Start immediately" },
            { label: "No tiers. No per-seat fees.", sub: "Every feature included" },
            { label: "Volume packs from $0.006/credit", sub: "40% savings at scale" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border p-5 text-left"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}
            >
              <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                {item.label}
              </div>
              <div className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>

        <Link href="/pricing" className="btn-primary mt-10 inline-flex">
          See pricing details
        </Link>
      </div>
    </section>
  );
}
