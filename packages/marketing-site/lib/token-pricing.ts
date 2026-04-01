export interface ModelConfig {
  id: string;
  label: string;
  input: number;  // price per million input tokens
  output: number; // price per million output tokens
}

export const models: ModelConfig[] = [
  { id: "claude-haiku-4-5", label: "Haiku 4.5", input: 0.80, output: 4.0 },
  { id: "claude-sonnet-4-6", label: "Sonnet 4.6", input: 3.0, output: 15.0 },
  { id: "claude-opus-4-6", label: "Opus 4.6", input: 15.0, output: 75.0 },
  { id: "gpt-4o", label: "GPT-4o", input: 2.5, output: 10.0 },
];

export const AVG_INPUT_TOKENS = 2000;
export const AVG_OUTPUT_TOKENS = 800;
export const WORKING_DAYS = 22;
export const GOVERNANCE_SAVINGS_PCT = 15;

export function calculateMonthlyRequests(devs: number, reqPerDev: number): number {
  return devs * reqPerDev * WORKING_DAYS;
}

export function calculateLLMCost(monthlyReqs: number, model: ModelConfig): number {
  const inputCost = AVG_INPUT_TOKENS * model.input / 1e6;
  const outputCost = AVG_OUTPUT_TOKENS * model.output / 1e6;
  return monthlyReqs * (inputCost + outputCost);
}

export function calculateGovernanceSavings(llmCost: number): number {
  return llmCost * GOVERNANCE_SAVINGS_PCT / 100;
}

export function calculateFreeRunway(devs: number, reqPerDev: number): number {
  const dailyRequests = devs * reqPerDev;
  if (dailyRequests === 0) return Infinity;
  return Math.floor(5000 / dailyRequests);
}

export function formatCurrency(amount: number): string {
  return "$" + Math.round(amount).toLocaleString("en-US");
}
