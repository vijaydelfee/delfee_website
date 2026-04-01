# Delfee Website — CLAUDE.md

## Project Overview

This repository hosts two Delfee marketing products:

1. **SpendLens** (`index.html`) — AI cost observability landing page for SaaS companies
2. **ShieldAI** (`packages/marketing-site/`) — Enterprise guardrails platform for AI coding tools (Claude Code, Cursor, Copilot)

**Company:** Delfee (delfee.co)
**Contact:** vijay@delfee.co, saravanan@delfee.co
**Domain:** delfee.co (via `CNAME`)
**Hosting:** GitHub Pages
**GA4 Measurement ID:** G-*

---

## Repository Structure

```
delfee_website/
├── index.html                  — SpendLens landing page (single-file static HTML)
├── CNAME                       — Custom domain: delfee.co
├── pricing.html                — ShieldAI pricing mockup (React component reference)
├── CLAUDE.md                   — This file
└── packages/
    └── marketing-site/         — ShieldAI Next.js marketing website
        ├── app/                — Next.js App Router pages
        │   ├── layout.tsx      — Root layout (nav, footer, fonts, theme)
        │   ├── page.tsx        — Homepage (9 sections)
        │   ├── pricing/        — Pricing page (credit-based model)
        │   ├── docs/           — Documentation placeholder
        │   ├── demo/           — Demo page with install instructions
        │   ├── robots.ts       — SEO robots.txt
        │   └── sitemap.ts      — SEO sitemap
        ├── components/         — React components (nav, footer, sections, icons)
        ├── lib/                — Data layer (pricing, token-pricing, metadata)
        ├── public/             — Static assets (og-image.svg)
        ├── tailwind.config.ts  — Design tokens
        └── package.json        — Dependencies
```

---

## SpendLens (index.html)

### Tech Stack
- Single-file static HTML — no framework, no build tools
- All CSS inline in `<style>`, all JS inline in `<script>`
- Google Fonts: DM Serif Display, DM Sans
- AOS library for scroll animations
- Web3Forms for form submission (access key: 3bad0721-732a-40d1-9eb9-11244fe8e9aa)
- GA4 (G-M4Q7H8BF1S) + Microsoft Clarity analytics

### Design System
| Variable       | Value     | Usage                        |
|----------------|-----------|------------------------------|
| `--navy`       | `#0A1628` | Primary background           |
| `--gold`       | `#C9A84C` | Primary accent, CTAs         |
| `--gray-bg`    | `#F8FAFC` | Light section backgrounds    |

- Typography: DM Serif Display (headings), DM Sans (body)
- Sharp corners, gold accents, dark premium aesthetic

### Sections
1. Nav (fixed, dark) → 2. Hero → 3. Stats (animated counters) → 4. Problem (before/after) → 5. How It Works → 6. Features (2×2) → 7. Calculator (savings estimator) → 8. Personas (CTO/CFO/Product) → 9. Early Access form → 10. Footer

---

## ShieldAI (packages/marketing-site/)

### Tech Stack
- **Next.js 14** (App Router) with TypeScript strict mode
- **Tailwind CSS** + CSS variables for dark/light theming
- **Framer Motion** for scroll-triggered animations (gated by `prefers-reduced-motion`)
- Static export (`output: 'export'`) — no server-side features
- All images as inline SVGs — zero external image dependencies
- Fonts: Inter (body), JetBrains Mono (code) via `next/font/google`

### Design System
- **Dark mode default**, light mode toggle via `<html class="dark">`
- Primary accent: `#7F77DD` (purple)
- Dark: bg `#0A0A0B`, surface `#141416`, text `#E4E4E7`
- Light: bg `#FFFFFF`, surface `#F4F4F5`, text `#18181B`
- CSS variables defined in `app/globals.css`, swapped by `.dark` class

### Pages
1. **/** — Homepage: Hero (animated flow diagram), Problem (3 pain points), How It Works (4 steps with code blocks + mock Kibana dashboard), Features (6 cards), Security Bar, Pricing Preview, Comparison Table, Social Proof, CTA Footer
2. **/pricing** — Credit-based pricing: explainer animation, 5 credit packs (Starter free → Enterprise custom), interactive calculator with pack recommendations, enterprise add-ons, FAQ accordion
3. **/docs** — Placeholder with sidebar navigation
4. **/demo** — Video placeholder + installation instructions

### Pricing Model
- Credit-based: 1 request = 1 credit = $0.01
- Packs: Starter (5K free), Basic (10K/$80), Growth (50K/$350), Scale (200K/$1200), Enterprise (1M+ custom)
- Pack recommendation algorithm in `lib/pricing.ts`

### Product Context
**ShieldAI** is an invisible guardrails layer for AI coding tools:
- Policy enforcement via OPA/Rego
- PII & secret detection before prompts leave the network
- Per-developer cost attribution with budget caps
- Full audit trail (ECS-compliant NDJSON) queryable in Kibana
- Zero-config CLI: `eval $(shieldai connect)`
- Supports Claude Code, Cursor, Copilot, any OpenAI/Anthropic SDK-compatible tool

Target buyers: CISOs and engineering leaders at companies using AI coding tools.

### Build Commands
```bash
cd packages/marketing-site
npm install
npm run dev      # Local development
npm run build    # Static export to out/
npm run lint     # ESLint
```

### Conventions
- Server components by default; `"use client"` only for: hero, theme-toggle, nav, credit-calculator, how-it-works, credit-explainer, comparison
- No `dangerouslySetInnerHTML` (except JSON-LD structured data on pricing page)
- No `console.log` — structured logging only
- No external analytics scripts yet (PostHog integration planned)
- All animations respect `prefers-reduced-motion`
- Contact emails: vijay@delfee.co, saravanan@delfee.co

---

## GitHub Pages Migration Plan

The site is currently served from `index.html` at the repo root. To serve the ShieldAI Next.js site instead:

### Option A: Next.js static export at root (recommended)
1. Build: `cd packages/marketing-site && npm run build`
2. Copy `packages/marketing-site/out/*` to the repo root
3. Add `.nojekyll` file at root (prevents GitHub Pages from processing with Jekyll)
4. Keep `CNAME` file at root
5. Commit and push — GitHub Pages serves the Next.js static output

### Option B: GitHub Actions workflow
1. Create `.github/workflows/deploy.yml` that:
   - Checks out the repo
   - Runs `npm ci && npm run build` in `packages/marketing-site/`
   - Deploys `out/` directory to `gh-pages` branch using `actions/deploy-pages`
2. Configure repo Settings → Pages → Source: GitHub Actions
3. This keeps the repo root clean and automates builds on push

### What to preserve
- `CNAME` file (delfee.co domain)
- GA4 measurement ID: G-M4Q7H8BF1S
- SpendLens `index.html` can be moved to `legacy/` or kept as a separate product landing

---

## Constraints
- No secrets or API keys in committed files (GA4 ID and Web3Forms key are public-facing by design)
- TypeScript strict mode for all ShieldAI code
- No `any` types
- All forms must validate input client-side
- Keep total JS bundle under 150KB (gzipped) for ShieldAI site
- All interactive elements must be keyboard-navigable
- Color contrast ratio 4.5:1 minimum in both themes
