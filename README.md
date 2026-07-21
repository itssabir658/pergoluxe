# Pergoluxe

A premium, enterprise-grade pergola ecommerce platform. Headless Shopify + Sanity CMS on Next.js 15.

This repository contains the **project architecture, design system, global application shell, homepage strategy/brand identity, and the first six homepage sections** (Hero, Trust Bar, Collections, Configurator Preview, Signature Benefits, Featured Projects). Remaining homepage sections and product pages are not built yet.

**Start here →**

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — folder structure, naming conventions, rendering/data patterns, Shopify and Sanity content modeling, coding/performance/accessibility/SEO standards, git workflow, and the development roadmap.
- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) — every token, primitive, component, and animation utility built in the design-system pass, and why.
- [`NAVIGATION.md`](./NAVIGATION.md) — the root layout, header, mega menu, search, mobile navigation, footer, and floating utilities (scroll progress, back-to-top, cookie consent) — architecture, performance, and accessibility decisions behind each.
- [`HOMEPAGE_STRATEGY.md`](./HOMEPAGE_STRATEGY.md) — personas, buying journey, full section-by-section information hierarchy, hero strategy, trust-building, interaction/motion, mobile, SEO, performance, and accessibility strategy for the homepage — written before any homepage code exists.
- [`BRAND_IDENTITY.md`](./BRAND_IDENTITY.md) — brand personality, competitive positioning, the three design directions and the chosen one (Architectural Modern), the production colour system with computed contrast ratios, typography, spacing, component and motion language, photography direction, and the final Design Bible.
- [`HOMEPAGE.md`](./HOMEPAGE.md) — the implemented homepage sections (Hero through Featured Projects): component structure, the CSS-vs-JS entrance decision and the reduced-motion bug that forced it, performance and accessibility verification.
- [`COMMERCE_ARCHITECTURE.md`](./COMMERCE_ARCHITECTURE.md) — the commerce blueprint written before any product/cart/checkout implementation exists: catalogue structure, product/variant modelling, accessory and pricing strategy, the configurator data model, Shopify vs. Sanity data ownership, search, inventory/fulfilment, the full customer journey, and future scalability (B2B, i18n, AR, subscriptions).

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Framer Motion · GSAP · React Hook Form · Zod · Shopify Storefront API · Sanity · Cloudinary · Resend · Vercel

## Quick start (once dependencies are installed)

```bash
pnpm install
cp .env.example .env
pnpm dev
```
