# Pergoluxe

A premium, enterprise-grade pergola ecommerce platform. Headless Shopify + Sanity CMS on Next.js 15.

This repository currently contains the **project architecture, design system, and global application shell** — folder structure, tooling, design tokens, UI components, and the header/footer/navigation every page will inherit. No homepage sections or product pages have been built yet.

**Start here →**

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — folder structure, naming conventions, rendering/data patterns, Shopify and Sanity content modeling, coding/performance/accessibility/SEO standards, git workflow, and the development roadmap.
- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) — every token, primitive, component, and animation utility built in the design-system pass, and why.
- [`NAVIGATION.md`](./NAVIGATION.md) — the root layout, header, mega menu, search, mobile navigation, footer, and floating utilities (scroll progress, back-to-top, cookie consent) — architecture, performance, and accessibility decisions behind each.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Framer Motion · GSAP · React Hook Form · Zod · Shopify Storefront API · Sanity · Cloudinary · Resend · Vercel

## Quick start (once dependencies are installed)

```bash
pnpm install
cp .env.example .env
pnpm dev
```
