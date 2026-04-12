"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CodeBlock } from "./code-block";

const connectCode = `eval $(shieldai connect)
# Spawns a local header-injection forwarder on 127.0.0.1
# Points ANTHROPIC_BASE_URL / OPENAI_BASE_URL / GEMINI_API_BASE
#   at the forwarder (not the proxy directly)
# Forwarder adds X-ShieldAI-Auth: <jwt> on every request
# Authorization: Bearer passes through untouched to the LLM
# Works with Claude Code OAuth, Cursor, Copilot, any SDK`;

const regoCode = `package shieldai.proxy

default allow := false

# Block prompts containing API keys before they leave the network
deny[msg] {
    regex.match(\`sk-[a-zA-Z0-9]{48}\`, input.request.prompt)
    msg := "prompt contains an API key"
}

# Enforce per-developer daily budget at the gateway
deny[msg] {
    data.usage[input.user.id].today_usd > input.user.budget_usd
    msg := sprintf("daily budget exceeded for %s", [input.user.id])
}

allow {
    not deny[_]
}`;

function MockDashboard() {
  const metrics = [
    { label: "Requests today", value: "12,847" },
    { label: "Active developers", value: "48" },
    { label: "Policies active", value: "12" },
    { label: "Blocked", value: "3" },
  ];

  const events = [
    { time: "14:03:22", user: "sarah.c", model: "sonnet-4.6", tokens: "3,241", policy: "ALLOW" },
    { time: "14:03:19", user: "mike.r", model: "haiku-4.5", tokens: "890", policy: "ALLOW" },
    { time: "14:03:15", user: "alex.t", model: "opus-4.6", tokens: "5,120", policy: "DENY:budget" },
  ];

  return (
    <div className="rounded-lg border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      <div className="border-b px-4 py-2" style={{ borderColor: "var(--border)" }}>
        <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>Kibana Dashboard</span>
      </div>
      <div className="grid grid-cols-2 gap-px sm:grid-cols-4" style={{ background: "var(--border)" }}>
        {metrics.map((m) => (
          <div key={m.label} className="p-3" style={{ background: "var(--surface)" }}>
            <div className="text-[10px]" style={{ color: "var(--muted)" }}>{m.label}</div>
            <div className="mt-0.5 text-lg font-semibold tabular-nums" style={{ color: "var(--text)" }}>{m.value}</div>
          </div>
        ))}
      </div>
      {/* Recent events */}
      <div className="border-t p-3" style={{ borderColor: "var(--border)" }}>
        <div className="mb-2 text-[10px] font-medium" style={{ color: "var(--muted)" }}>Recent audit events</div>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead>
              <tr style={{ color: "var(--muted)" }}>
                <th className="pb-1 pr-3 text-left font-medium">Time</th>
                <th className="pb-1 pr-3 text-left font-medium">User</th>
                <th className="pb-1 pr-3 text-left font-medium">Model</th>
                <th className="pb-1 pr-3 text-right font-medium">Tokens</th>
                <th className="pb-1 text-right font-medium">Decision</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.time} style={{ color: "var(--text-secondary)" }}>
                  <td className="py-0.5 pr-3 font-mono">{e.time}</td>
                  <td className="pr-3">{e.user}</td>
                  <td className="pr-3 font-mono">{e.model}</td>
                  <td className="pr-3 text-right tabular-nums">{e.tokens}</td>
                  <td className="text-right">
                    <span
                      className="rounded px-1 py-0.5 font-mono text-[9px] font-medium"
                      style={{
                        background: e.policy === "ALLOW" ? "rgba(29,158,117,0.15)" : "rgba(216,90,48,0.15)",
                        color: e.policy === "ALLOW" ? "var(--green)" : "var(--orange)",
                      }}
                    >
                      {e.policy}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      number: "01",
      title: "Connect",
      description:
        "One command. ShieldAI's CLI agent spawns a local header-injection forwarder, points your provider SDKs at it, and adds the gateway JWT out-of-band — so OAuth and browser-login tools (Claude Code, Cursor, Copilot) keep working without dual-auth collisions.",
      content: <CodeBlock code={connectCode} language="bash" />,
    },
    {
      number: "02",
      title: "Enforce",
      description:
        "Every request hits an OPA preflight check, content filters for secrets and PII, then a postflight check on the response. Rego policies are hot-reloaded and version-controlled — no restarts, no policy drift, fail-closed by default.",
      content: <CodeBlock code={regoCode} language="rego" />,
    },
    {
      number: "03",
      title: "Observe",
      description:
        "Every allowed request emits an ECS-compliant audit event. Who asked what, which model, how many tokens, and which policy decided — all with SHA-256 body hashes (never raw prompts, never API keys). Queryable in Kibana, ClickHouse, or your existing SIEM in seconds.",
      content: <MockDashboard />,
    },
  ];

  return (
    <section className="py-20 sm:py-28" style={{ background: "var(--bg)" }}>
      <div className="section-container">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--text)" }}>
            One command. Full visibility.
          </h2>
        </motion.div>

        <div className="mt-16 space-y-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="grid gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-md font-mono text-xs font-bold"
                    style={{ background: "var(--accent)", color: "#fff" }}
                  >
                    {step.number}
                  </span>
                  <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                    {step.title}
                  </h3>
                </div>
                {step.description && (
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {step.description}
                  </p>
                )}
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                {step.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
