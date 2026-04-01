import Link from "next/link";
import { CodeBlock } from "./code-block";

export function CtaFooter() {
  return (
    <section className="py-20 sm:py-28" style={{ background: "var(--surface)" }}>
      <div className="section-container text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--text)" }}>
          Start seeing what your developers are sending
        </h2>

        <div className="mx-auto mt-8 max-w-lg">
          <CodeBlock code="brew install shieldai/tap/shieldai && shieldai connect" language="bash" />
        </div>

        <p className="mt-6 text-sm" style={{ color: "var(--text-secondary)" }}>
          5,000 free credits. No credit card required. No tiers to navigate.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/pricing" className="btn-primary">
            Start free
          </Link>
          <a href="mailto:vijay@delfee.co,saravanan@delfee.co?subject=ShieldAI%20Sales" className="btn-ghost">
            Talk to sales
          </a>
        </div>
      </div>
    </section>
  );
}
