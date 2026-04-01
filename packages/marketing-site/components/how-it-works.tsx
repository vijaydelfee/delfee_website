"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CodeBlock } from "./code-block";

const connectCode = `eval $(shieldai connect)
# Sets ANTHROPIC_BASE_URL, OPENAI_BASE_URL to proxy
# Injects ShieldAI JWT for authentication
# Works with Claude Code, Cursor, Copilot, any SDK`;

const regoCode = `# Block prompts containing secrets
deny["prompt contains API key"] {
    regex.match(\`sk-[a-zA-Z0-9]{48}\`, input.prompt)
}

# Enforce budget: max $50/day per developer
deny["daily budget exceeded"] {
    data.usage[input.user_id].today_usd > 50
}`;

function CreditCounter() {
  const [count, setCount] = useState(5000);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setCount(4999);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div
        className="rounded-lg border px-8 py-4 text-center font-mono"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="text-xs" style={{ color: "var(--muted)" }}>Credits remaining</div>
        <div className="mt-1 text-3xl font-bold tabular-nums" style={{ color: "var(--accent)" }}>
          {count.toLocaleString()}
        </div>
      </div>
      <p className="text-center text-sm" style={{ color: "var(--text-secondary)" }}>
        Each request through the proxy consumes 1 credit. 1 credit = $0.01.
        That&apos;s a tenth of a cent per request — covering policy evaluation, PII scanning,
        audit logging, and 90-day storage.
      </p>
    </div>
  );
}

function MockDashboard() {
  const metrics = [
    { label: "Requests today", value: "12,847" },
    { label: "Active developers", value: "48" },
    { label: "Credits used", value: "12,847" },
    { label: "Cost today", value: "$128.47" },
  ];

  const events = [
    { time: "14:03:22", user: "sarah.c", model: "sonnet-4.6", tokens: "3,241", cost: "$0.06", policy: "ALLOW" },
    { time: "14:03:19", user: "mike.r", model: "haiku-4.5", tokens: "890", cost: "$0.004", policy: "ALLOW" },
    { time: "14:03:15", user: "alex.t", model: "opus-4.6", tokens: "5,120", cost: "$0.46", policy: "DENY:budget" },
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
      {/* Cost by team bar chart */}
      <div className="border-t p-3" style={{ borderColor: "var(--border)" }}>
        <div className="mb-2 text-[10px] font-medium" style={{ color: "var(--muted)" }}>Cost by team</div>
        <div className="space-y-1.5">
          {[
            { team: "Platform", pct: 45 },
            { team: "Backend", pct: 30 },
            { team: "Frontend", pct: 18 },
            { team: "DevOps", pct: 7 },
          ].map((bar) => (
            <div key={bar.team} className="flex items-center gap-2">
              <span className="w-16 text-[10px]" style={{ color: "var(--text-secondary)" }}>{bar.team}</span>
              <div className="h-3 flex-1 overflow-hidden rounded-sm" style={{ background: "var(--border)" }}>
                <div
                  className="h-full rounded-sm"
                  style={{ width: `${bar.pct}%`, background: "var(--accent)", opacity: 0.7 }}
                />
              </div>
              <span className="w-8 text-right text-[10px] tabular-nums" style={{ color: "var(--muted)" }}>{bar.pct}%</span>
            </div>
          ))}
        </div>
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
                <th className="pb-1 pr-3 text-right font-medium">Cost</th>
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
                  <td className="pr-3 text-right tabular-nums">{e.cost}</td>
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
        "Your developer's AI tools now route through ShieldAI. No code changes. No SDK modifications. No new IDE.",
      content: <CodeBlock code={connectCode} language="bash" />,
    },
    {
      number: "02",
      title: "Enforce",
      description:
        "OPA policies evaluate every request in real-time. Allow, deny, or modify — all configurable in Rego.",
      content: <CodeBlock code={regoCode} language="rego" />,
    },
    {
      number: "03",
      title: "Observe",
      description:
        "Every request generates an ECS-compliant audit event. Who, what, which model, how many tokens, what it cost, and what policy decided. Queryable in Kibana in seconds.",
      content: <MockDashboard />,
    },
    {
      number: "04",
      title: "1 credit consumed",
      description: "",
      content: <CreditCounter />,
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
