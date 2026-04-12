"use client";

import { motion, useReducedMotion } from "framer-motion";
import { productFeatures } from "@/lib/pricing";
import { PolicyIcon } from "./icons/policy";
import { PiiIcon } from "./icons/pii";
import { AuditIcon } from "./icons/audit";
import { UsageIcon } from "./icons/usage";
import { CliIcon } from "./icons/cli";
import { StreamingIcon } from "./icons/streaming";

const icons = [
  <PolicyIcon key="policy" size={28} />,
  <PiiIcon key="pii" size={28} />,
  <AuditIcon key="audit" size={28} />,
  <UsageIcon key="usage" size={28} />,
  <CliIcon key="cli" size={28} />,
  <StreamingIcon key="streaming" size={28} />,
];

export function Features() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="features" className="py-20 sm:py-28" style={{ background: "var(--surface)" }}>
      <div className="section-container">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--text)" }}>
            Everything between your developers and the LLM
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm" style={{ color: "var(--text-secondary)" }}>
            Every feature is included. No tier gating.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-lg border p-6 transition-colors hover:border-[var(--accent)]"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}
            >
              <div className="mb-4">{icons[i]}</div>
              <h3 className="mb-2 text-sm font-semibold" style={{ color: "var(--text)" }}>
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
