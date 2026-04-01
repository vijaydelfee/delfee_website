"use client";

import { useState } from "react";
import {
  models,
  calculateMonthlyRequests,
  calculateLLMCost,
  calculateGovernanceSavings,
  calculateFreeRunway,
  formatCurrency,
} from "@/lib/token-pricing";
import { recommendPacks } from "@/lib/pricing";

export function CreditCalculator() {
  const [devs, setDevs] = useState(25);
  const [reqPerDev, setReqPerDev] = useState(70);
  const [modelId, setModelId] = useState("claude-sonnet-4-6");

  const model = models.find((m) => m.id === modelId) ?? models[1];
  const monthlyReqs = calculateMonthlyRequests(devs, reqPerDev);
  const llmCost = calculateLLMCost(monthlyReqs, model);
  const recommendation = recommendPacks(monthlyReqs);
  const shieldaiCost = recommendation.totalCost;
  const savings = calculateGovernanceSavings(llmCost);
  const netImpact = savings - shieldaiCost;
  const freeRunway = calculateFreeRunway(devs, reqPerDev);

  return (
    <section className="py-20" style={{ background: "var(--bg)" }}>
      <div className="section-container">
        <h2
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "var(--text)" }}
        >
          Credit calculator
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm" style={{ color: "var(--text-secondary)" }}>
          Estimate your monthly ShieldAI cost and projected savings.
        </p>

        <div
          className="mx-auto mt-10 max-w-2xl rounded-lg border p-6"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {/* Sliders */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>
                  Developers
                </label>
                <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--text)" }}>
                  {devs}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={500}
                value={devs}
                onChange={(e) => setDevs(Number(e.target.value))}
                className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full"
                style={{ accentColor: "var(--accent)", background: "var(--border)" }}
              />
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>
                  Requests / dev / day
                </label>
                <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--text)" }}>
                  {reqPerDev}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={300}
                value={reqPerDev}
                onChange={(e) => setReqPerDev(Number(e.target.value))}
                className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full"
                style={{ accentColor: "var(--accent)", background: "var(--border)" }}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="text-xs font-medium" style={{ color: "var(--muted)" }}>
              Primary model
            </label>
            <select
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              style={{
                background: "var(--bg)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
            >
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label} (${m.input} / ${m.output} per MTok)
                </option>
              ))}
            </select>
          </div>

          {/* Results */}
          <div className="mt-8 space-y-0" style={{ borderTop: "1px solid var(--border)" }}>
            {[
              { label: "Monthly requests", value: monthlyReqs.toLocaleString() },
              { label: "Credits needed", value: monthlyReqs.toLocaleString() },
              { label: "Estimated LLM spend", value: `${formatCurrency(llmCost)}/mo` },
              {
                label: "Recommended packs",
                value: recommendation.packs.map((p) => `${p.name} (${p.credits.toLocaleString()})`).join(" + "),
              },
              {
                label: "ShieldAI cost",
                value: shieldaiCost === 0 ? "Free (starter pack)" : `${formatCurrency(shieldaiCost)}/mo`,
                highlight: true,
              },
              {
                label: "Est. governance savings (15%)",
                value: `${formatCurrency(savings)}/mo`,
                positive: true,
              },
              {
                label: "Net impact",
                value: netImpact >= 0
                  ? `+${formatCurrency(netImpact)}/mo net savings`
                  : `${formatCurrency(shieldaiCost)}/mo for full governance`,
                positive: netImpact >= 0,
              },
              {
                label: "Free credit runway",
                value: freeRunway === Infinity ? "Unlimited" : `${freeRunway} days`,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between py-3 text-sm"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span style={{ color: "var(--text-secondary)" }}>{row.label}</span>
                <span
                  className="font-medium tabular-nums"
                  style={{
                    color: "positive" in row && row.positive ? "var(--green)" : "highlight" in row && row.highlight ? "var(--accent)" : "var(--text)",
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
