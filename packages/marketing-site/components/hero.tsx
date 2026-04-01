"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { CodeBlock } from "./code-block";
import { flowSteps } from "@/lib/pricing";

export function Hero() {
  const [activeStep, setActiveStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % flowSteps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" style={{ background: "var(--bg)" }}>
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: "var(--text)" }}
          >
            Your developers use AI coding tools.{" "}
            <span style={{ color: "var(--accent)" }}>
              You have no idea what they&apos;re sending.
            </span>
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            ShieldAI is an invisible guardrails layer between your developers and LLM providers.
            Policy enforcement, PII detection, cost tracking, and full audit trail — with zero developer friction.
          </motion.p>

          {/* Flow diagram */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {flowSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 sm:gap-3">
                {i > 0 && (
                  <span className="text-lg" style={{ color: "var(--muted)" }}>
                    &rarr;
                  </span>
                )}
                <div
                  className="rounded-lg px-3 py-2 text-center transition-all duration-300 sm:px-4 sm:py-3"
                  style={{
                    background: activeStep === i ? "var(--accent)" : "var(--surface)",
                    color: activeStep === i ? "#fff" : "var(--text)",
                    transform: activeStep === i ? "scale(1.05)" : "scale(1)",
                    minWidth: "100px",
                  }}
                >
                  <div className="text-xs font-medium sm:text-sm">{step.label}</div>
                  <div className="text-[10px] opacity-80 sm:text-xs">{step.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CLI code block */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mx-auto mt-8 max-w-md"
          >
            <CodeBlock code="eval $(shieldai connect)" language="bash" showCursor />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/pricing" className="btn-primary">
              Start free — 5,000 credits
            </Link>
            <Link href="/demo" className="btn-ghost">
              See the demo
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
