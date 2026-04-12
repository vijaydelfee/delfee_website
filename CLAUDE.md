# Delfee Website — CLAUDE.md

## Project Overview

This repository hosts the **Delfee** marketing presence. Delfee is the parent brand; ShieldAI and SpendLens are the two products under it.

1. **ShieldAI** (`packages/marketing-site/`) — Primary site at delfee.co. Enterprise guardrails platform for AI coding tools (Claude Code, Cursor, Copilot). Built as a Next.js 16 static export.
2. **SpendLens** (`legacy/spendlens/index.html`) — AI cost visibility landing page for engineering teams. Redesigned with a "Dark Luxury Command Center" aesthetic (Bloomberg Terminal meets fintech). Framed for engineering leaders who need per-developer, per-team cost attribution across AI coding tools (Claude Code, Cursor, Copilot). Linked from the ShieldAI homepage's "Part of the Delfee platform" section.

**Company:** Delfee (delfee.co)
**Contact:** vijay@delfee.co, saravanan@delfee.co
**Domain:** delfee.co (via `CNAME`)
**Hosting:** GitHub Pages (deployed by `.github/workflows/deploy.yml`)
**GA4 Measurement ID:** G-M4Q7H8BF1S (in ShieldAI Next.js layout via `next/script`, and in SpendLens via inline `<script>` tags)

---

## Repository Structure

```
delfee_website/
├── CNAME                            — Custom domain: delfee.co
├── CLAUDE.md                        — This file
├── .github/workflows/deploy.yml     — GitHub Pages CI/CD (Next.js → Pages)
├── legacy/
│   └── spendlens/
│       ├── index.html               — SpendLens landing page (single-file static HTML, dark luxury design)
│       └── pricing.html             — Archived SpendLens pricing mockup
└── packages/
    └── marketing-site/              — ShieldAI Next.js marketing website (delfee.co)
        ├── app/                     — Next.js App Router pages
        │   ├── layout.tsx           — Root layout (nav, footer, fonts, GA4 via next/script)
        │   ├── page.tsx             — Homepage (8 sections)
        │   ├── robots.ts            — SEO robots.txt (delfee.co base, force-static)
        │   └── sitemap.ts           — SEO sitemap (delfee.co base, force-static)
        ├── components/              — React components (nav, footer, sections, icons)
        ├── lib/                     — Data layer (features, metadata)
        ├── public/
        │   ├── og-image.svg         — OpenGraph card
        │   └── logos/               — Brand wordmarks
        │       ├── Delfee.png       — Gold parent-brand wordmark
        │       ├── ShieldAI.png     — Silver product wordmark
        │       └── Spendlens.png    — Silver product wordmark
        ├── tailwind.config.ts       — Design tokens
        └── package.json             — Dependencies
```

---

## SpendLens (`legacy/spendlens/`)

The SpendLens landing page lives at `legacy/spendlens/index.html`. It is **not served from delfee.co** — the GitHub Pages deployment only ships the Next.js `out/` directory. The ShieldAI homepage's "Part of the Delfee platform" section links to `/legacy/spendlens/` so the page remains discoverable. A pricing mockup is preserved at `legacy/spendlens/pricing.html`.

### Product Framing
SpendLens is positioned for **engineering teams** whose AI coding tool costs are unknown. The core message: developers use Claude Code, Cursor, and Copilot every day, but nobody knows what it costs. SpendLens is a transparent proxy that gives per-developer, per-team cost attribution, team budgets, and full audit trails. Target buyers: CTOs, VPs of Engineering, CFOs, and Engineering Managers.

All content must stay grounded in the real product architecture documented in `~/vijay/workspace/elastic-projects/SpendLens/SpendLens/shieldai/CLAUDE.md`. Key product facts reflected on the page:
- Go reverse proxy with middleware chain (auth → rate limit → audit → intercept)
- OPA/Rego policy engine for budget enforcement and model restrictions
- SSE streaming token extraction + 17-model pricing table for cost computation
- ECS-compliant NDJSON audit with SHA-256 body hashes (never raw prompts/keys)
- CLI connect command (`eval $(spendlens connect)`) — zero code changes for developers
- Audit trail flows to Elasticsearch + ClickHouse + Kibana

### Page Sections
1. **Hero** — "Your Developers Use AI Daily. Do You Know What It Costs?" Canvas particle network background. Architecture diagram: Developer AI Tools → SpendLens Proxy (OPA Policy, Cost Track, Budget Cap, Route) → Providers → ECS Audit Trail.
2. **Stats** — Scroll-triggered count-up: 70%+ (power-user spend), 10× (developer variance), 0% (teams with attribution today), 40%+ (cost reduction with visibility).
3. **Problem** — Split: "Current Reality" (no visibility, no attribution, no budgets) vs "With SpendLens" (per-developer attribution, team budgets, full audit trail).
4. **How It Works** — 4 items: Connect in One Command, Track Every Token Every Developer, Enforce Team Budgets at Gateway, Audit Everything Store Nothing Sensitive. Animated SVG diagram with 5-step proxy pipeline.
5. **Features** — Bento grid with 4 cards: Per-Developer Cost Attribution, Team-Level AI Observability, Team Budget Guardrails, Engineering AI Cost Dashboard.
6. **Personas** — Tab interface: CTO/VP Engineering (team spend overview), CFO/Finance (monthly AI tool spend by team), Engineering Manager (per-developer breakdown: @alice Claude Code $89/day, @bob Cursor $42/day, etc.).
7. **Early Access** — Web3Forms form with animated gold gradient border.
8. **Footer** — "AI Cost Visibility for Engineering Teams" tagline.

### Tech Stack
- Single-file static HTML — no framework, no build tools
- All CSS inline in `<style>`, all JS inline in `<script>`
- Google Fonts: Instrument Serif (headlines), JetBrains Mono (data/stats), Satoshi via CDN (body)
- Canvas API for hero particle network and form submit particle burst
- IntersectionObserver for scroll-triggered animations and active nav indicator
- SVG diagrams with SMIL animations (animateMotion for flowing gold dots)
- CSS glassmorphism (backdrop-filter: blur) on nav and cards
- CSS 3D tilt on feature cards (perspective transform on hover)
- Web3Forms for form submission (access key: 3bad0721-732a-40d1-9eb9-11244fe8e9aa — public by design)
- GA4 (G-M4Q7H8BF1S) via inline `<script>` tags in `<head>`
- All animations respect `prefers-reduced-motion`
- Design tokens: `--bg #09090C`, `--gold #D4A843`, `--gold-light #F0D078`, `--gold-deep #A67C2E`, `--silver #C0C0C8`, `--copper #C45C3E`, `--text #E8E8EE`, `--text-sec #9898A8`

---

## ShieldAI (packages/marketing-site/)

### Tech Stack
- **Next.js 16** (App Router) with TypeScript strict mode. **Requires Node.js ≥ 20.9.0** locally and in CI.
- **Tailwind CSS** + CSS variables for dark/light theming
- **Framer Motion** for scroll-triggered animations (gated by `prefers-reduced-motion`)
- Static export (`output: 'export'`, `images.unoptimized: true`) — no server-side features
- Metadata route handlers (`app/robots.ts`, `app/sitemap.ts`) **must declare `export const dynamic = "force-static"`** — Next 16 refuses to build them under `output: 'export'` otherwise.
- All decorative images are inline SVG. Brand wordmarks (Delfee, ShieldAI, Spendlens) are PNGs in `public/logos/`, rendered with plain `<img>` (Next/Image is unnecessary in static export and adds noise).
- Fonts: Inter (body), JetBrains Mono (code) via `next/font/google`

### Design System
- **Dark mode default**, light mode toggle via `<html class="dark">`
- Primary accent: `#7F77DD` (purple)
- Dark: bg `#0A0A0B`, surface `#141416`, text `#E4E4E7`
- Light: bg `#FFFFFF`, surface `#F4F4F5`, text `#18181B`
- CSS variables defined in `app/globals.css`, swapped by `.dark` class
- The fixed nav uses `rgba(var(--nav-bg), 0.85)` for its translucent backdrop. **`--nav-bg` must be defined as an RGB triple (not a hex color) in both `:root` and `.dark`** so the nav background tracks the theme — historically this was missing and the nav rendered black-on-black in light mode.

### Pages
1. **/** — Homepage. Section order in `app/page.tsx`:
   Hero → Problem → HowItWorks → Features → SecurityBar → Comparison → SocialProof ("Part of the Delfee platform") → CtaFooter

The `/docs`, `/demo`, and `/pricing` routes have been removed. Nav, footer, hero CTAs, and the sitemap no longer reference them, and the route directories have been deleted. There is also no public GitHub link in the nav or footer (the upstream `github.com/shieldai` org doesn't exist yet). All CTAs link to mailto:vijay@delfee.co,saravanan@delfee.co.

### Product Context
**ShieldAI** is an invisible guardrails layer for AI coding tools. Marketing copy and feature claims must stay grounded in the actual product behavior documented in `~/vijay/workspace/elastic-projects/SpendLens/SpendLens/shieldai/CLAUDE.md`. Key facts (do not contradict):

- **Architecture**: AI tool → CLI agent → local header-injection forwarder (127.0.0.1) → ShieldAI Go proxy (:8080) → upstream LLM. The forwarder injects `X-ShieldAI-Auth: <jwt>` so the upstream `Authorization: Bearer` passes through untouched. This is what makes it work with Claude Code's browser/OAuth login without dual-auth collisions.
- **Policy engine**: OPA / Rego, hot-reloaded. Pipeline is preflight check → request content filters → upstream forward → postflight check → response content filters. Default `allow := false`. Gateway policy lives in `packages/policy-engine/policies/proxy/`.
- **Filters**: Built-in PII detection (`internal/filter/pii.go`) and secret detection (`internal/filter/secrets.go`). **Fail-closed by default** (`FAIL_MODE=closed`).
- **Audit**: ECS-compliant NDJSON. **SHA-256 hashes** of request/response bodies — never raw prompts, never API keys, `Authorization` header redacted. Bind-mounted to host, shipped via Filebeat/Elastic Agent → Elasticsearch. Audit-service consumes Kafka → ClickHouse + MinIO + Postgres.
- **CLI v0.3.0** modes: `eval $(shieldai connect)` (background forwarder), `shieldai connect -- claude` (subprocess), `shieldai shell`, `shieldai status`, `shieldai policies`, `shieldai config`. Config layers merge: CLI flag > project `.shieldai.yaml` > user `~/.config/shieldai/config.yaml` > default.
- **Providers**: Anthropic, OpenAI (v0 + v1 SDKs via `OPENAI_API_BASE` and `OPENAI_BASE_URL`), Google Gemini.
- **Other components**: gRPC sandbox service for isolated code execution, Node/TS admin API, React admin dashboard with Dashboard / Policies / Teams / Audit Log / Budgets / Settings pages.
- **Security posture**: mTLS between CLI and proxy, no raw bodies stored, fail-closed default, self-hosted/air-gapped option.

Source-of-truth data lives in `lib/pricing.ts` (`productFeatures`, `flowSteps`, `stats`). When adding a marketing claim, anchor it in the engineering CLAUDE.md or in `shieldai/packages/proxy/internal/`.

Target buyers: CISOs and engineering leaders at companies using AI coding tools.

### Brand & logos
Wordmark PNGs in `public/logos/` (sourced from `~/vijay/workspace/elastic-projects/SpendLens/SpendLens/shieldai/logos/`):

| Logo | Color | Usage |
|------|-------|-------|
| `Delfee.png` | Gold | Footer copyright row (parent brand) |
| `ShieldAI.png` | Silver | Nav header next to shield SVG icon; SocialProof "this site" card |
| `Spendlens.png` | Silver | SocialProof "Delfee platform" sibling product card |

Render with plain `<img>` (with `// eslint-disable-next-line @next/next/no-img-element`) at fixed pixel heights — never via `next/image`. The static export does no optimization, so wrapping adds boilerplate without benefit.

### Build Commands
```bash
cd packages/marketing-site
npm install
npm run dev      # Local development
npm run build    # Static export to out/
npm run lint     # ESLint
```

### Conventions
- Server components by default; `"use client"` only for: hero, theme-toggle, nav, how-it-works, comparison, features, problem (last two require client because of framer-motion `useReducedMotion` + `whileInView`). The SocialProof / "Delfee platform" section is intentionally a server component.
- No `dangerouslySetInnerHTML`
- No `console.log` — structured logging only
- GA4 (`G-M4Q7H8BF1S`) loaded via `next/script` in `app/layout.tsx`. PostHog integration still planned.
- `metadataBase` and `lib/metadata.ts` `BASE_URL` must be `https://delfee.co`. `app/robots.ts` and `app/sitemap.ts` must reference `https://delfee.co`.
- All animations respect `prefers-reduced-motion`
- No fabricated social proof. Do not add fake customer logos, fake quotes, or fake "trusted by" sections — use the real Delfee product family (ShieldAI + SpendLens) instead until real customer references exist.
- Contact emails: vijay@delfee.co, saravanan@delfee.co

---

## GitHub Pages Deployment

delfee.co is served from the ShieldAI Next.js static export, deployed via GitHub Actions.

- Workflow: `.github/workflows/deploy.yml` (triggers on push to `main` and `prod/website`, plus manual dispatch)
- Build: `npm ci && npm run lint && npm run build` inside `packages/marketing-site/`
- Output: `packages/marketing-site/out/`, with the root `CNAME` and a generated `.nojekyll` copied in by the workflow
- Deploy: `actions/upload-pages-artifact` + `actions/deploy-pages`
- Repo Settings → Pages → Source must be set to **GitHub Actions** (one-time manual config)
- Legacy SpendLens lives at `legacy/spendlens/` and is no longer served

---

## Constraints
- No secrets or API keys in committed files (GA4 ID and Web3Forms key are public-facing by design)
- TypeScript strict mode for all ShieldAI code
- No `any` types
- All forms must validate input client-side
- Keep total JS bundle under 150KB (gzipped) for ShieldAI site. Only one page (`/`) exists now — re-measure after major dependency changes.
- All interactive elements must be keyboard-navigable
- Color contrast ratio 4.5:1 minimum in both themes. Note: `--accent` (`#7F77DD`) on white is ~3.7:1 — only use as button background (white text on accent passes) or large text, never as body text on white.

---

## Source of truth for product claims

The engineering CLAUDE.md at `~/vijay/workspace/elastic-projects/SpendLens/SpendLens/shieldai/CLAUDE.md` is the canonical reference for what ShieldAI and SpendLens actually do (they share the same underlying proxy/audit infrastructure). Before adding or changing a feature claim, security claim, architecture claim, or CLI behavior on either marketing site, verify it against that file or against the actual code under `shieldai/packages/`. If a marketing claim cannot be sourced, do not ship it.
