"use client";

import { motion, useReducedMotion } from "framer-motion";

const rows = [
  {
    feature: "Purpose-built for dev tools (Claude Code, Cursor)",
    shieldai: "Yes",
    diy: "Maybe",
    portkey: "No (app-level)",
    cloudflare: "No (app-level)",
  },
  {
    feature: "One-command setup",
    shieldai: "Yes",
    diy: "No (months)",
    portkey: "No (SDK changes)",
    cloudflare: "No (SDK changes)",
  },
  {
    feature: "OPA policy engine",
    shieldai: "Yes",
    diy: "Custom",
    portkey: "Limited",
    cloudflare: "No",
  },
  {
    feature: "PII / secret detection",
    shieldai: "Yes",
    diy: "Custom",
    portkey: "Limited",
    cloudflare: "No",
  },
  {
    feature: "Per-developer cost attribution",
    shieldai: "Yes",
    diy: "Custom",
    portkey: "Yes",
    cloudflare: "Basic",
  },
  {
    feature: "Self-hosted / air-gapped",
    shieldai: "Yes",
    diy: "Yes",
    portkey: "No",
    cloudflare: "No",
  },
  {
    feature: "SSE streaming support",
    shieldai: "Yes",
    diy: "Custom",
    portkey: "Yes",
    cloudflare: "Yes",
  },
  {
    feature: "Setup time",
    shieldai: "5 minutes",
    diy: "3-6 months",
    portkey: "Days",
    cloudflare: "Hours",
  },
  {
    feature: "Pricing model",
    shieldai: "Credits (usage-based)",
    diy: "$500K+/yr (eng cost)",
    portkey: "Tiers ($2K-5K/mo)",
    cloudflare: "Free + usage",
  },
  {
    feature: "Feature gating",
    shieldai: "None — all included",
    diy: "N/A",
    portkey: "Enterprise-gated",
    cloudflare: "Limited features",
  },
];

function CellStyle({ value, isShieldai }: { value: string; isShieldai: boolean }) {
  const isPositive = value === "Yes" || value === "5 minutes" || value === "None — all included" || value === "Credits (usage-based)";
  return (
    <span
      className={isShieldai ? "font-medium" : ""}
      style={{
        color: isShieldai && isPositive ? "var(--green)" : isShieldai ? "var(--text)" : "var(--text-secondary)",
      }}
    >
      {value}
    </span>
  );
}

export function Comparison() {
  const shouldReduceMotion = useReducedMotion();

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
            How ShieldAI compares
          </h2>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 overflow-x-auto"
        >
          <table className="w-full min-w-[700px] text-xs">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th className="pb-3 pr-4 text-left font-medium" style={{ color: "var(--muted)" }}>Feature</th>
                <th className="pb-3 px-3 text-left font-medium" style={{ color: "var(--accent)" }}>ShieldAI</th>
                <th className="pb-3 px-3 text-left font-medium" style={{ color: "var(--muted)" }}>Build it yourself</th>
                <th className="pb-3 px-3 text-left font-medium" style={{ color: "var(--muted)" }}>Portkey</th>
                <th className="pb-3 pl-3 text-left font-medium" style={{ color: "var(--muted)" }}>Cloudflare AI Gateway</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="py-3 pr-4 font-medium" style={{ color: "var(--text)" }}>{row.feature}</td>
                  <td className="px-3 py-3" style={{ borderLeft: "2px solid var(--accent)" }}>
                    <CellStyle value={row.shieldai} isShieldai />
                  </td>
                  <td className="px-3 py-3"><CellStyle value={row.diy} isShieldai={false} /></td>
                  <td className="px-3 py-3"><CellStyle value={row.portkey} isShieldai={false} /></td>
                  <td className="py-3 pl-3"><CellStyle value={row.cloudflare} isShieldai={false} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
