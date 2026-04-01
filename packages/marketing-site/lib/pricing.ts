export interface CreditPack {
  name: string;
  credits: number;
  price: number;
  perCredit: number;
  badge?: string;
  badgeColor?: string;
  cta?: string;
}

export const creditPacks: CreditPack[] = [
  {
    name: "Starter",
    credits: 5_000,
    price: 0,
    perCredit: 0,
    badge: "FREE",
    badgeColor: "#1D9E75",
    cta: "Get started free",
  },
  {
    name: "Basic",
    credits: 10_000,
    price: 80,
    perCredit: 0.008,
    cta: "Buy credits",
  },
  {
    name: "Growth",
    credits: 50_000,
    price: 350,
    perCredit: 0.007,
    badge: "Best value",
    badgeColor: "#7F77DD",
    cta: "Buy credits",
  },
  {
    name: "Scale",
    credits: 200_000,
    price: 1_200,
    perCredit: 0.006,
    cta: "Buy credits",
  },
  {
    name: "Enterprise",
    credits: 1_000_000,
    price: -1,
    perCredit: -1,
    cta: "Talk to sales",
  },
];

export interface PackRecommendation {
  packs: Array<{ name: string; credits: number; price: number; perCredit: number }>;
  totalCost: number;
}

export function recommendPacks(monthlyCredits: number): PackRecommendation {
  const availablePacks = [
    { name: "Scale", credits: 200_000, price: 1200, perCredit: 0.006 },
    { name: "Growth", credits: 50_000, price: 350, perCredit: 0.007 },
    { name: "Basic", credits: 10_000, price: 80, perCredit: 0.008 },
  ];

  let remaining = monthlyCredits;
  const selected: Array<{ name: string; credits: number; price: number; perCredit: number }> = [];

  for (const pack of availablePacks) {
    while (remaining >= pack.credits * 0.7) {
      selected.push({ ...pack });
      remaining -= pack.credits;
    }
  }

  if (remaining > 0) {
    selected.push({
      name: "Pay-as-you-go",
      credits: remaining,
      price: Math.round(remaining * 0.01 * 100) / 100,
      perCredit: 0.01,
    });
  }

  return {
    packs: selected,
    totalCost: selected.reduce((sum, p) => sum + p.price, 0),
  };
}

export const enterpriseAddons = [
  {
    title: "SSO (SAML/OIDC) + SCIM",
    price: "$200/month",
    description: "Single sign-on and automated user provisioning for your identity provider.",
  },
  {
    title: "Self-hosted / air-gapped",
    price: "Custom pricing",
    description: "Run ShieldAI entirely within your own infrastructure. No external network calls.",
  },
  {
    title: "Extended retention",
    price: "$0.002 per credit per month",
    description: "Keep audit logs beyond the standard 90-day retention window.",
  },
  {
    title: "Dedicated support engineer",
    price: "$1,500/month",
    description: "Named support contact with 4-hour SLA for critical issues.",
  },
  {
    title: "SOC 2 Type II report",
    price: "Enterprise contract",
    description: "Full compliance documentation available under NDA.",
  },
  {
    title: "Custom SLA (99.9%+ uptime)",
    price: "Enterprise contract",
    description: "Guaranteed uptime with financial credits for breaches.",
  },
];

export const includedFeatures = [
  "Policy evaluation (OPA) — preflight + postflight",
  "PII & secret detection",
  "Full audit event (ECS-compliant)",
  "Log storage in Elastic (90-day retention)",
  "Cost attribution & token tracking",
  "Kibana dashboard access",
  "CLI connect/disconnect",
  "SSE streaming support",
  "Multi-provider support (Anthropic, OpenAI, Google)",
];

export const faqs: Array<{ question: string; answer: string }> = [
  {
    question: "What is a credit?",
    answer:
      "1 credit = 1 request processed through ShieldAI. This includes proxy forwarding, OPA policy evaluation, PII scanning, and audit log generation + storage. 1 credit costs $0.01 at the base rate, less with credit packs.",
  },
  {
    question: "What counts as a request?",
    answer:
      "Any API call from an AI tool (Claude Code, Cursor, etc.) that passes through the proxy and reaches the policy evaluation stage. Health checks, failed auth (401s), and CLI commands don't consume credits.",
  },
  {
    question: "Do streaming requests cost more?",
    answer:
      "No. A streaming request consumes 1 credit, same as a non-streaming request. The SSE stream passes through the proxy as a single request regardless of how many chunks are sent.",
  },
  {
    question: "What happens when I run out of credits?",
    answer:
      "Your requests continue to flow through the proxy but audit logging is paused. Policy enforcement and PII detection continue working. You'll see a warning in the CLI and a notification in the dashboard. Buy more credits to resume logging.",
  },
  {
    question: "Do credits expire?",
    answer:
      "Purchased credits never expire. The 500 free monthly credits expire at the end of each month (use-it-or-lose-it). The initial 5,000 signup bonus credits expire after 90 days.",
  },
  {
    question: "Can I see my credit usage?",
    answer:
      "Yes. The ShieldAI dashboard shows real-time credit usage by developer, team, and project. You can set alerts for usage thresholds.",
  },
  {
    question: "How does this compare to per-seat pricing?",
    answer:
      "Per-seat pricing penalizes large teams where many developers use AI lightly. Credit-based pricing means you only pay for actual usage. A 100-developer team where 20 developers are heavy users and 80 are light users pays for actual requests, not 100 seats.",
  },
  {
    question: "Do you offer startup discounts?",
    answer:
      "Yes. Startups under 50 employees and less than $5M in funding get 50,000 bonus credits (on top of the 5,000 signup credits). Email vijay@delfee.co.",
  },
];

export const stats = [
  { value: "<5ms", label: "Proxy overhead" },
  { value: "100%", label: "Request visibility" },
  { value: "$0", label: "Surprise bills prevented" },
  { value: "0", label: "Secrets leaked" },
];

export const productFeatures = [
  {
    title: "Policy engine (OPA)",
    description:
      "Real-time allow/deny decisions per request using Rego policies. Block models, enforce budgets, restrict providers — all at the gateway.",
  },
  {
    title: "PII & secret detection",
    description:
      "Scan prompts before they leave your network. Detect API keys, SSNs, emails, and 30+ PII types. Redact or block automatically.",
  },
  {
    title: "Full audit trail",
    description:
      "Every request logged in ECS-compliant NDJSON. Who asked what, which model, token usage, cost, policy decisions — all queryable in Kibana.",
  },
  {
    title: "Cost attribution",
    description:
      "Per-developer, per-team, per-project cost tracking. Set budget caps that actually enforce. No more $3k overnight surprises.",
  },
  {
    title: "Zero-config CLI",
    description:
      "One command: shieldai connect. Works with Claude Code, Cursor, Copilot, and any OpenAI/Anthropic SDK-compatible tool.",
  },
  {
    title: "SSE streaming",
    description:
      "Sub-millisecond overhead on streaming responses. Developers never feel the proxy — they just get guardrails for free.",
  },
];

export const flowSteps = [
  { label: "Developer", sub: "Claude Code / Cursor" },
  { label: "ShieldAI proxy", sub: "Policy + PII scan" },
  { label: "LLM provider", sub: "Anthropic / OpenAI" },
  { label: "Audit log", sub: "Elastic / Kibana" },
];
