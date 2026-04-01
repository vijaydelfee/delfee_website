import { createMetadata } from "@/lib/metadata";
import { CreditExplainer } from "@/components/credit-explainer";
import { CreditPacks } from "@/components/credit-packs";
import { CreditCalculator } from "@/components/credit-calculator";
import { EnterpriseAddons } from "@/components/enterprise-addons";
import { FAQ } from "@/components/faq";
import { includedFeatures } from "@/lib/pricing";

export const metadata = createMetadata({
  title: "Pricing",
  description:
    "Pay only for what you observe. 1 request = 1 credit = $0.01. Start with 5,000 free credits. No tiers, no per-seat fees.",
  path: "/pricing",
});

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "ShieldAI",
    description: "Guardrails for AI coding tools",
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: "0",
        priceCurrency: "USD",
        description: "5,000 free credits",
      },
      {
        "@type": "Offer",
        name: "Basic",
        price: "80",
        priceCurrency: "USD",
        description: "10,000 credits",
      },
      {
        "@type": "Offer",
        name: "Growth",
        price: "350",
        priceCurrency: "USD",
        description: "50,000 credits",
      },
      {
        "@type": "Offer",
        name: "Scale",
        price: "1200",
        priceCurrency: "USD",
        description: "200,000 credits",
      },
    ],
  };
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      {/* Hero */}
      <section className="py-24 text-center sm:py-32" style={{ background: "var(--bg)" }}>
        <div className="section-container">
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            Pay only for what you observe
          </h1>
          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            No tiers. No per-seat fees. No commitment. Every request through ShieldAI costs 1 credit.
            1 credit = $0.01. Start with 5,000 free credits.
          </p>
        </div>
      </section>

      <CreditExplainer />
      <CreditPacks />
      <CreditCalculator />

      {/* What's included */}
      <section className="py-20" style={{ background: "var(--surface)" }}>
        <div className="section-container">
          <h2
            className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ color: "var(--text)" }}
          >
            What&apos;s included with every credit
          </h2>
          <div className="mx-auto mt-8 max-w-md">
            {includedFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 py-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="mt-0.5 shrink-0"
                >
                  <circle cx="8" cy="8" r="8" fill="var(--green)" opacity="0.15" />
                  <path
                    d="M5 8L7 10L11 6"
                    stroke="var(--green)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm" style={{ color: "var(--text)" }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
          <p
            className="mx-auto mt-6 max-w-md text-center text-xs"
            style={{ color: "var(--muted)" }}
          >
            No features are gated behind tiers. Every credit gives you the full ShieldAI platform.
          </p>
        </div>
      </section>

      <EnterpriseAddons />
      <FAQ />
    </>
  );
}
