export const stats = [
  { value: "<5ms", label: "Gateway overhead" },
  { value: "100%", label: "Request visibility" },
  { value: "0 bytes", label: "Raw prompts stored" },
  { value: "Fail-closed", label: "Default posture" },
];

export const productFeatures = [
  {
    title: "OPA policy engine",
    description:
      "Preflight and postflight Rego checks on every request. Block models, enforce budgets, restrict providers, and gate sensitive prompts — all at the gateway, hot-reloaded with zero downtime.",
  },
  {
    title: "PII & secret detection",
    description:
      "Inspect every prompt before it leaves your network. Block API keys, tokens, SSNs, emails, and 30+ PII patterns. Fail-closed by default — if a filter fails, the request is denied.",
  },
  {
    title: "ECS-compliant audit trail",
    description:
      "Every allowed request emits an ECS NDJSON event with SHA-256 body hashes — never raw prompts, never API keys. Stream into Elasticsearch, ClickHouse, or your existing SIEM and query in seconds.",
  },
  {
    title: "Per-developer usage attribution",
    description:
      "Token usage attributed to the human who triggered the request — not the service account. Set usage caps that enforce at the gateway, not after the fact.",
  },
  {
    title: "Drop-in for OAuth & browser auth",
    description:
      "ShieldAI's local forwarder injects an X-ShieldAI-Auth header out-of-band, so the upstream Authorization: Bearer passes through untouched. Works with Claude Code's browser login, Cursor, Copilot, and any SDK.",
  },
  {
    title: "Zero-config CLI",
    description:
      "eval $(shieldai connect) and you're done. Project, user, and CLI flag config layers merge automatically. Subprocess mode runs a single command isolated; eval mode persists for your whole shell.",
  },
];

export const flowSteps = [
  { label: "AI tool", sub: "Claude Code · Cursor" },
  { label: "ShieldAI gateway", sub: "OPA · PII · audit" },
  { label: "LLM provider", sub: "Anthropic · OpenAI · Gemini" },
  { label: "Kibana audit", sub: "ECS NDJSON" },
];
