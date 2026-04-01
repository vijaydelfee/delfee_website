import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Documentation",
  description: "ShieldAI documentation — getting started, CLI reference, policies, observability, and API reference.",
  path: "/docs",
});

const sections = [
  {
    title: "Getting Started",
    items: ["Quick Start", "Installation", "Configuration"],
  },
  {
    title: "CLI Reference",
    items: ["connect", "disconnect", "status", "config"],
  },
  {
    title: "Proxy",
    items: ["Architecture", "Authentication", "Upstream Providers"],
  },
  {
    title: "Policies",
    items: ["Writing OPA Policies", "Built-in Policies", "Testing"],
  },
  {
    title: "Observability",
    items: ["Audit Log Schema", "Elastic Setup", "Kibana Dashboards"],
  },
  {
    title: "Security",
    items: ["Threat Model", "Data Handling", "Compliance"],
  },
  {
    title: "Credits",
    items: ["How Credits Work", "Usage Dashboard", "Pack Management"],
  },
  {
    title: "API Reference",
    items: ["REST API", "Webhooks", "SDKs"],
  },
];

export default function DocsPage() {
  return (
    <div className="section-container py-12">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          {/* Search placeholder */}
          <div
            className="mb-6 rounded-md border px-3 py-2 text-xs"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--muted)",
            }}
          >
            Search docs...
          </div>

          <nav className="space-y-4">
            {sections.map((section) => (
              <div key={section.title}>
                <h3
                  className="mb-1 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--muted)" }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item}>
                      <span
                        className="block cursor-default py-0.5 text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main>
          <h1
            className="text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ color: "var(--text)" }}
          >
            Documentation
          </h1>
          <div
            className="mt-8 rounded-lg border p-8 text-center"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Documentation is coming soon. In the meantime, check out the repository for setup instructions and examples.
            </p>
            <a
              href="https://github.com/shieldai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 inline-flex"
            >
              View on GitHub
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
