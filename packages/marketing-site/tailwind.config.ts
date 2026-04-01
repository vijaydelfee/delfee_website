import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shield: {
          purple: "#7F77DD",
          "purple-light": "#9B94E8",
          green: "#1D9E75",
          orange: "#D85A30",
        },
        dark: {
          bg: "#0A0A0B",
          surface: "#141416",
          text: "#E4E4E7",
          muted: "#71717A",
          border: "#27272A",
        },
        light: {
          bg: "#FFFFFF",
          surface: "#F4F4F5",
          text: "#18181B",
          muted: "#71717A",
          border: "#E4E4E7",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
