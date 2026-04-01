"use client";

import { motion, useReducedMotion } from "framer-motion";

const painPoints = [
  {
    title: "Invisible spend",
    description:
      "Two developers click \"generate\" — one costs $0.002, the other costs $0.85. Same tool, same button. You see one line item: \"API costs.\"",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Zero audit trail",
    description:
      "Your security team can't tell you if source code, API keys, or customer data was sent to a third-party LLM yesterday. Because nobody's logging it.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ),
  },
  {
    title: "No policy enforcement",
    description:
      "A junior developer can use the most expensive model for trivial tasks. There's nothing stopping a prompt containing your production database credentials from leaving your network.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </svg>
    ),
  },
];

export function Problem() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 sm:py-28" style={{ background: "var(--surface)" }}>
      <div className="section-container">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2
            className="text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ color: "var(--text)" }}
          >
            AI broke predictable infrastructure economics
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-lg border p-6"
              style={{
                background: "var(--bg)",
                borderColor: "var(--border)",
              }}
            >
              <div className="mb-4">{point.icon}</div>
              <h3
                className="mb-2 text-base font-semibold"
                style={{ color: "var(--text)" }}
              >
                {point.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
