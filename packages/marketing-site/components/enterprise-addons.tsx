import { enterpriseAddons } from "@/lib/pricing";

export function EnterpriseAddons() {
  return (
    <section className="py-20" style={{ background: "var(--surface)" }}>
      <div className="section-container">
        <h2
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "var(--text)" }}
        >
          Enterprise add-ons
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm" style={{ color: "var(--text-secondary)" }}>
          Buy any credit pack and add enterprise features &agrave; la carte. Or contact sales for a bundled annual agreement.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enterpriseAddons.map((addon) => (
            <div
              key={addon.title}
              className="rounded-lg border p-5"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}
            >
              <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                {addon.title}
              </h3>
              <div className="mt-1 text-xs font-medium" style={{ color: "var(--accent)" }}>
                {addon.price}
              </div>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {addon.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
