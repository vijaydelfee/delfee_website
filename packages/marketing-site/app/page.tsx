import { createMetadata } from "@/lib/metadata";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { HowItWorks } from "@/components/how-it-works";
import { Features } from "@/components/features";
import { SecurityBar } from "@/components/security-bar";
import { PricingPreview } from "@/components/pricing-preview";
import { Comparison } from "@/components/comparison";
import { SocialProof } from "@/components/social-proof";
import { CtaFooter } from "@/components/cta-footer";

export const metadata = createMetadata({
  title: "ShieldAI",
  description:
    "An invisible guardrails layer between your developers and LLM providers. Policy enforcement, PII detection, cost tracking, and full audit trail.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <SecurityBar />
      <PricingPreview />
      <Comparison />
      <SocialProof />
      <CtaFooter />
    </>
  );
}
