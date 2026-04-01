"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const steps = [
  { label: "Developer sends a request", icon: ">" },
  { label: "ShieldAI evaluates policies & scans for PII", icon: "S" },
  { label: "Audit event generated & stored", icon: "L" },
  { label: "1 credit consumed", icon: "1" },
];

export function CreditExplainer() {
  const [activeStep, setActiveStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <section className="py-20" style={{ background: "var(--bg)" }}>
      <div className="section-container">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ color: "var(--text)" }}
          >
            How credits work
          </h2>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 sm:flex-row sm:gap-2">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 sm:flex-1 sm:flex-col sm:gap-1">
                {i > 0 && (
                  <span className="hidden text-lg sm:block" style={{ color: "var(--muted)" }}>&rarr;</span>
                )}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg font-mono text-sm font-bold transition-all duration-300"
                  style={{
                    background: activeStep === i ? "var(--accent)" : "var(--surface)",
                    color: activeStep === i ? "#fff" : "var(--muted)",
                    border: `1px solid ${activeStep === i ? "var(--accent)" : "var(--border)"}`,
                  }}
                >
                  {step.icon}
                </div>
                <span
                  className="text-xs sm:mt-2 sm:text-center"
                  style={{ color: activeStep === i ? "var(--text)" : "var(--muted)" }}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 grid max-w-lg gap-4 sm:grid-cols-3">
            {[
              { label: "1 credit", value: "$0.01" },
              { label: "1 credit", value: "1 request" },
              { label: "Includes", value: "Everything" },
            ].map((item) => (
              <div
                key={item.value}
                className="rounded-lg border p-4 text-center"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div className="text-xs" style={{ color: "var(--muted)" }}>{item.label}</div>
                <div className="mt-1 text-lg font-bold" style={{ color: "var(--accent)" }}>{item.value}</div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-md text-center text-xs" style={{ color: "var(--muted)" }}>
            Credits are consumed only when a request successfully passes through the proxy.
            Failed auth (401) and health checks don&apos;t consume credits.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
