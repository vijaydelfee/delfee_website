import { createMetadata } from "@/lib/metadata";
import { CodeBlock } from "@/components/code-block";

export const metadata = createMetadata({
  title: "Demo",
  description: "See ShieldAI in action. Try the proxy locally with zero configuration.",
  path: "/demo",
});

const installCode = `# Install the CLI
brew install shieldai/tap/shieldai

# Start the local dev stack
git clone https://github.com/shieldai/shieldai.git
cd shieldai
make dev

# Connect
eval $(shieldai connect --local)

# Use any AI coding tool — it's now proxied
claude "Hello world"`;

export default function DemoPage() {
  return (
    <div className="section-container py-12">
      <div className="mx-auto max-w-2xl">
        <h1
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "var(--text)" }}
        >
          See ShieldAI in action
        </h1>

        {/* Video placeholder */}
        <div
          className="mt-10 flex aspect-video items-center justify-center rounded-lg border"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="text-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--muted)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" fill="var(--muted)" stroke="none" />
            </svg>
            <p className="mt-3 text-sm font-medium" style={{ color: "var(--muted)" }}>
              Demo video coming soon
            </p>
          </div>
        </div>

        {/* Try it yourself */}
        <h2
          className="mt-16 text-xl font-bold tracking-tight"
          style={{ color: "var(--text)" }}
        >
          Try it yourself
        </h2>

        <div className="mt-6">
          <CodeBlock code={installCode} language="bash" />
        </div>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
          Your first 5,000 credits are free. No credit card required.
        </p>

        <div className="mt-4 text-center">
          <a
            href="https://github.com/shieldai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex"
          >
            E2E testing guide on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
