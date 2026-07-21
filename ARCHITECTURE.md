# Pergoluxe — Architecture Specification

Status: living document. Version 1.0 — initial architecture, greenfield project.

This document is the single source of truth for how this codebase is organized and why. It is not a style guide nobody reads — every rule here exists to prevent a specific, predictable failure mode at scale (a team of 5+ engineers, 2+ years of iteration, thousands of SKUs, multiple locales). If a rule doesn't serve that, it isn't in here.

## Table of Contents

1. [Guiding Principles](#1-guiding-principles)
2. [Folder Structure](#2-folder-structure)
3. [Folder-by-Folder Rationale](#3-folder-by-folder-rationale)
4. [Naming Conventions](#4-naming-conventions)
5. [Reusable Architecture Patterns](#5-reusable-architecture-patterns)
6. [Shopify Organization](#6-shopify-organization)
7. [Sanity Organization](#7-sanity-organization)
8. [Design Tokens](#8-design-tokens)
9. [Coding Standards](#9-coding-standards)
10. [Performance Standards](#10-performance-standards)
11. [Accessibility Standards](#11-accessibility-standards)
12. [SEO Standards](#12-seo-standards)
13. [Git Workflow](#13-git-workflow)
14. [Development Roadmap](#14-development-roadmap)

---

## 1. Guiding Principles

1. **Feature-first, not type-first.** A change to "how the cart works" should touch one folder, not six. Grouping by `components/`, `hooks/`, `utils/` at the top level scales to a weekend project, not a $500k one.
2. **Two content sources, one contract.** Shopify owns commerce truth (price, inventory, variants, checkout). Sanity owns editorial truth (story, imagery, marketing copy, projects, FAQs). Neither leaks into the other's schema. A `lib/shopify` function never returns Sanity data and vice versa — composition happens one layer up, in `services/` or the feature's server component.
3. **Server-first rendering.** Default to Server Components. A component becomes a Client Component only when it needs the browser: state, effects, event handlers, browser-only APIs. This is not a preference — it's the single biggest lever on TTFB, bundle size, and Core Web Vitals for a catalog-heavy site.
4. **Colocation over centralization.** Code lives as close as possible to where it's used. It only moves to a shared location (`components/shared`, `lib/`, `utils/`) after the second real usage — not the first anticipated one.
5. **Explicit boundaries, typed contracts.** Every cross-boundary call (Shopify GraphQL, Sanity GROQ, Resend, Cloudinary) is wrapped in a typed function in `lib/`. Nothing in `app/` or `features/` calls `fetch` against a third party directly.
6. **No speculative abstraction.** Three near-identical product card variants stay as three JSX blocks with shared primitives until a fourth appears and the pattern is undeniable. Premature `Factory`/`Provider`/`Strategy` layers are a tax the business pays forever.

---

## 2. Folder Structure

```
pergoluxe/
├── .env.example
├── .eslintrc → eslint.config.mjs
├── .prettierrc.json
├── ARCHITECTURE.md
├── README.md
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── public/
│   ├── fonts/                     # self-hosted variable fonts (woff2)
│   ├── images/                    # static, non-CMS brand assets (logo, favicons)
│   └── icons/                     # static SVG sprite / og fallback icons
│
├── sanity/                        # Sanity Studio (embedded at /studio)
│   ├── schemas/
│   │   ├── documents/             # product-enrichment, project, testimonial, faq, page, author
│   │   ├── singletons/            # homepage, siteSettings, navigation
│   │   ├── objects/                # seo, cta, hero, blockContent (reusable, non-queryable shapes)
│   │   └── index.ts               # schema registry consumed by sanity.config.ts
│   ├── lib/                       # studio-only helpers (desk structure ordering, actions)
│   ├── structure/                 # custom desk structure (singleton pinning, doc grouping)
│   └── sanity.config.ts
│
├── src/
│   ├── app/                       # Next.js App Router — routing & composition ONLY
│   │   ├── (marketing)/           # route group: home, about, contact, projects (no /marketing in URL)
│   │   ├── (shop)/                # route group: products, collections, search, cart
│   │   ├── (account)/             # route group: login, orders, addresses (auth-gated)
│   │   ├── api/
│   │   │   ├── revalidate/        # on-demand ISR — Shopify + Sanity webhook targets
│   │   │   ├── webhooks/shopify/  # order/product/inventory webhooks
│   │   │   ├── webhooks/sanity/   # content webhooks
│   │   │   └── og/                # dynamic Open Graph image generation
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── manifest.ts
│   │   ├── layout.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   │
│   ├── features/                  # business domains — the heart of the codebase
│   │   ├── product/               # PDP logic: gallery, variant selector, price, add-to-cart
│   │   ├── collection/            # PLP logic: grid, filters, sort, pagination
│   │   ├── cart/                  # cart drawer, line items, cart state, cart mutations
│   │   ├── checkout/              # checkout hand-off to Shopify-hosted checkout
│   │   ├── customer/              # login, register, account, order history
│   │   ├── search/                # predictive search, results, search analytics
│   │   ├── wishlist/              # client-persisted wishlist (localStorage/customer metafield)
│   │   ├── configurator/          # custom pergola builder → quote request flow
│   │   ├── projects/              # inspiration gallery / case studies (Sanity-sourced)
│   │   ├── testimonials/          # review carousel/grid (Sanity-sourced)
│   │   ├── faq/                   # FAQ accordion (Sanity-sourced)
│   │   └── contact/               # contact/quote forms → Resend
│   │       # each feature follows: components/ hooks/ actions/ queries/ types/ utils/ index.ts
│   │
│   ├── components/                # cross-feature, feature-agnostic UI
│   │   ├── ui/                    # shadcn/ui primitives (button, dialog, input, ...)
│   │   ├── layout/                # header, footer, mobile nav, container, page shell
│   │   ├── shared/                # composites used by 2+ features (ProductCard, Price, Badge)
│   │   └── icons/                 # custom SVG icon components
│   │
│   ├── animations/                 # animation logic, decoupled from components that use it
│   │   ├── gsap/                  # ScrollTrigger setups, timelines, plugin registration
│   │   ├── framer/                # shared Framer Motion variants, transition presets
│   │   └── variants/              # declarative variant objects (fade, slideUp, stagger)
│   │
│   ├── lib/                        # typed SDKs / clients for every external system
│   │   ├── shopify/                # Storefront API client, queries, mutations, fragments
│   │   ├── sanity/                 # Sanity client, GROQ queries, image builder
│   │   ├── cloudinary/            # upload/transform helpers
│   │   ├── resend/                # transactional email senders
│   │   └── analytics/             # GA4 / Meta Pixel / server-side event dispatch
│   │
│   ├── services/                   # framework-agnostic business logic, composes lib/ + features
│   ├── hooks/                      # global reusable hooks (useMediaQuery, useDebounce, useLockBody)
│   ├── actions/                    # top-level Server Actions not owned by one feature (newsletter)
│   ├── providers/                  # app-wide React context providers (cart, theme, analytics)
│   ├── config/                     # typed app configuration (site.ts, nav.ts, seo.ts, env.ts)
│   ├── constants/                  # magic-value-free constants (routes, limits, regex, enums)
│   ├── types/                      # shared/global TypeScript types & ambient declarations
│   ├── utils/                      # pure, generic helpers (cn, formatMoney, slugify)
│   └── styles/                     # design-token CSS consumed by globals.css
│
├── tests/
│   ├── unit/                       # Vitest — pure logic, hooks, utils
│   ├── e2e/                        # Playwright — critical user journeys
│   └── setup/                      # test environment bootstrap
└── scripts/                        # one-off/maintenance scripts (codegen, data migration)
```

---

## 3. Folder-by-Folder Rationale

| Folder | Why it exists | Use it when | Do NOT use it when |
|---|---|---|---|
| `app/` | Next.js routing + composition boundary only. Pages assemble features; they don't contain business logic. | Defining a route, its layout, loading/error states, or metadata. | Writing a data-fetching query, a form handler, or any logic reused elsewhere — that belongs in `features/*` or `lib/*`, imported into the page. |
| `features/*` | Vertical slice per business domain. Everything needed to build "the cart" or "the PDP" lives together, so a feature can be understood, tested, and even deleted without archaeology. | The code is specific to one domain: a `<VariantSelector>` only `product` uses, a `useCart()` hook only `cart` uses. | The thing is generic UI (a `<Badge>`) or generic logic (`formatMoney`) with no domain meaning — that's `components/shared` or `utils/`. |
| `components/ui` | Unmodified/lightly themed shadcn/ui primitives. The seam between "our design system" and a vendored library. | Adding or customizing a primitive (Button variants, Dialog). | Building anything with business meaning (ProductCard, CartLineItem) — those are composites, not primitives. |
| `components/layout` | Structural chrome that wraps every page: header, footer, nav, page containers. | The component defines page skeleton, not page content. | The component is a page's actual content — that's a feature or `app/` composition. |
| `components/shared` | Composites reused by 2+ features (e.g., `<ProductCard>` appears in `collection`, `search`, and `projects`). | A component crosses feature boundaries. Promote it here only after the **second** real usage. | On first use — keep it in the feature until duplication is proven, not assumed. |
| `animations/` | Decouples animation implementation (GSAP timelines, Framer variants) from the components that trigger them, so a designer/animator change doesn't require touching component logic. | Defining a reusable timeline, ScrollTrigger config, or motion variant object consumed by multiple components. | One-off `whileHover={{ scale: 1.05 }}` inline props — trivial, single-use animation stays inline in the component. |
| `lib/*` | The only place allowed to know about an external system's API shape (Shopify GraphQL, Sanity GROQ, Cloudinary REST, Resend). Everything here is typed, framework-agnostic, and testable in isolation. | Writing a query/mutation/fragment, or a client instantiation, for a specific external system. | Business rules ("hide out-of-stock variants", "compute discount badge") — those belong in `services/` or the feature, not the SDK wrapper. |
| `services/` | Business logic that composes multiple `lib/*` calls or cross-feature concerns, with zero React/Next.js dependency — pure functions/classes, unit-testable without mocking the framework. | Logic needs both Shopify and Sanity data (e.g., "merge Shopify price with Sanity story content for a PDP"), or logic is complex enough to deserve isolated unit tests. | The logic is trivial or belongs to a single feature only — keep it in that feature's `utils/` instead. |
| `hooks/` | Global, domain-agnostic hooks used across features (`useMediaQuery`, `useDebounce`, `useOnClickOutside`). | The hook has no knowledge of cart/product/checkout — it would be equally at home in an unrelated app. | The hook wraps domain logic (`useAddToCart`) — that belongs in the feature's own `hooks/`. |
| `actions/` | Top-level Server Actions with no single feature owner (newsletter signup, generic contact form used site-wide). | The mutation doesn't belong to one feature's domain. | The action is domain-specific (`addToCart`, `applyDiscount`) — colocate it in `features/*/actions`. |
| `providers/` | App-wide client-side context that must wrap the whole tree (cart state, theme, analytics init). | The state must be available globally and survive route changes. | The state is local to one page or feature — use component state or a feature-local context instead. |
| `config/` | Typed, environment-validated configuration objects consumed at build/runtime (site metadata, nav structure, `env.ts` via `@t3-oss/env-nextjs`). | The value configures app-wide behavior and should never be hardcoded twice. | The value is a true constant with no environment dependency — that's `constants/`. |
| `constants/` | Magic-value-free literals: route paths, pagination limits, regex patterns, enum-like unions. | A literal value is repeated more than once or is easy to typo (a route string, a breakpoint number). | The value is config-shaped (varies per environment) — that's `config/`, not `constants/`. |
| `types/` | Global/shared TypeScript types and ambient declarations with no single owner (e.g., a `Money` type used everywhere). | A type is genuinely cross-cutting. | The type belongs to one feature or one `lib/*` module — colocate it there instead (`features/product/types`, `lib/shopify/types.ts`). |
| `utils/` | Pure, stateless, generic helper functions with zero domain knowledge (`cn`, `formatMoney`, `slugify`, `truncate`). | The function could be published as its own npm package tomorrow with no edits. | The function encodes a business rule — that's `services/` or a feature's own `utils/`. |
| `styles/` | Design-token CSS (`@theme` blocks) imported once by `globals.css`. | Defining or updating the token scale (spacing, color, radius, timing). | Writing component-specific CSS — Tailwind utility classes in the component handle that. |
| `sanity/` | Studio schema definitions and desk structure, versioned with the app so content model changes ship atomically with the code that depends on them. | Adding/changing a document type, singleton, or the Studio's editorial UI. | Querying content for the frontend — that's `lib/sanity/queries`, not the schema folder. |

---

## 4. Naming Conventions

### Folders
- `kebab-case` always: `product-card/`, `variant-selector/`, not `productCard/` or `ProductCard/`.
- Route groups use parentheses and stay lowercase: `(marketing)`, `(shop)`, `(account)`.
- Dynamic segments match Shopify/Sanity vocabulary exactly: `[handle]` for products/collections (Shopify's own term), `[slug]` for Sanity-authored pages.

### Files
| Type | Convention | Example |
|---|---|---|
| React component | `PascalCase.tsx`, filename = default export name | `ProductGallery.tsx` |
| Hook | `camelCase.ts`, always prefixed `use` | `useAddToCart.ts` |
| Server Action | `camelCase.ts`, verb-first, `"use server"` at top | `createCartLine.ts` |
| Route file (App Router reserved) | lowercase, framework-mandated | `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` |
| Type-only file | `camelCase.types.ts` or `types.ts` inside a `types/` folder | `product.types.ts` |
| GraphQL query/mutation | `camelCase.ts`, noun/verb matching the operation | `getProductByHandle.ts`, `createCart.ts` |
| GROQ query | `camelCase.ts` inside `queries/` | `getHomepage.ts` |
| Constant file | `camelCase.ts`, plural for collections | `routes.ts`, `breakpoints.ts` |
| Test file | mirrors source name | `formatMoney.test.ts` |
| Barrel export | `index.ts`, one per feature root only — never nested | `features/product/index.ts` |

### Components
- **PascalCase**, descriptive noun phrases, no abbreviations: `VariantSelector`, not `VarSel`.
- Compound/sub-components use dot-adjacent naming via composition, not filename suffixes: prefer `<Accordion.Item>` (Radix pattern) over `AccordionItem.tsx` duplicated per parent.
- Boolean props read as questions: `isOpen`, `hasDiscount`, `disabled` — never `open: 0 | 1` or ambiguous flags.
- Client Components that must be marked are still named identically to their Server counterparts would be — the `"use client"` directive is the signal, not the filename (no `.client.tsx` suffix; that convention rotted with Next 12).

### Imports & Aliases
- Always import via the `@/*` alias family defined in `tsconfig.json` — never more than two `../` levels in a relative import (enforced by the `no-restricted-imports` ESLint rule).
- Alias map:
  | Alias | Resolves to |
  |---|---|
  | `@/*` | `src/*` |
  | `@/app/*` | `src/app/*` |
  | `@/features/*` | `src/features/*` |
  | `@/components/*` | `src/components/*` |
  | `@/ui/*` | `src/components/ui/*` |
  | `@/lib/*` | `src/lib/*` |
  | `@/hooks/*` | `src/hooks/*` |
  | `@/actions/*` | `src/actions/*` |
  | `@/services/*` | `src/services/*` |
  | `@/providers/*` | `src/providers/*` |
  | `@/config/*` | `src/config/*` |
  | `@/constants/*` | `src/constants/*` |
  | `@/types/*` | `src/types/*` |
  | `@/utils/*` | `src/utils/*` |
  | `@/animations/*` | `src/animations/*` |
  | `@/sanity/*` | `sanity/*` |
- Import order (enforced by `eslint-plugin-import` grouping, auto-fixed): (1) external packages, (2) `@/*` aliases, (3) relative imports (siblings only), (4) styles. Blank line between groups.
- A feature's public surface is its `index.ts` barrel. External consumers (`app/`, other features) import from `@/features/product`, never reach into `@/features/product/components/VariantSelector` directly — this keeps internal refactors from breaking distant call sites.

---

## 5. Reusable Architecture Patterns

### Server Components (default)
Every component starts as a Server Component. It fetches its own data with `async/await` directly in the component body using `lib/shopify` or `lib/sanity` functions — no `useEffect` fetch, no client-side waterfall. Server Components render product data, marketing content, SEO metadata: anything that doesn't need interactivity.

### Client Components (opt-in, justified)
Add `"use client"` only at the leaf that actually needs it: a variant swatch that responds to clicks, a cart drawer with open/close state, a form with `react-hook-form`. Push the boundary as far down the tree as possible — a page is not a Client Component just because one button inside it needs `onClick`; only that button is.

```tsx
// features/product/components/ProductPage.tsx — Server Component
export async function ProductPage({ handle }: { handle: string }) {
  const product = await getProductByHandle(handle); // lib/shopify
  return (
    <div>
      <ProductGallery images={product.images} />      {/* Server */}
      <VariantSelector variants={product.variants} /> {/* Client leaf */}
    </div>
  );
}
```

### Data Fetching
- All reads go through typed functions in `lib/shopify` / `lib/sanity` — never raw `fetch` in a component.
- Shopify reads use `fetch` with Next's extended `cache`/`next.tags` options so on-demand revalidation (webhooks) can target exact tags (`product-${handle}`, `collection-${handle}`).
- Sanity reads use the CDN-backed client for public content and the non-CDN client only for preview/draft mode.
- Parallel-fetch independent data with `Promise.all` at the page level; never `await` sequentially when requests don't depend on each other.

### Mutations
- All writes (add to cart, submit quote form, newsletter signup) are **Server Actions**, colocated in the owning feature's `actions/` folder, validated with a Zod schema shared between client form and server action.
- Client forms use `useActionState`/`react-hook-form` + `zodResolver` for instant validation; the Server Action re-validates the same schema server-side — never trust client validation alone.
- Every mutation that changes visible data calls `revalidateTag`/`revalidatePath` for the exact affected scope — never a blanket `revalidatePath("/")`.

### Loading UI
- Route-level `loading.tsx` provides the route's skeleton, shown automatically while the Server Component tree resolves — no manual spinner state.
- Component-level: wrap slow, non-critical subtrees (reviews, recommendations) in `<Suspense fallback={<Skeleton />}>` so the shell (header, gallery, price, add-to-cart) streams first.

### Error Boundaries
- `error.tsx` per route segment catches render/data errors for that segment only, with a retry action (`reset()`) — a failure in "related products" never takes down the whole PDP if it's isolated behind its own Suspense boundary with a local error boundary.
- `global-error.tsx` at the root catches catastrophic failures outside all segment boundaries and is the only place allowed to render outside the root layout.
- `not-found.tsx` is triggered explicitly via `notFound()` when a Shopify handle or Sanity slug resolves to nothing — never a silent empty render.

### Streaming & Suspense
- PPR (Partial Prerendering, `experimental.ppr: "incremental"`) is enabled per-route via the `experimental_ppr = true` route config once a route's static shell is separated from its dynamic holes (e.g., PDP: static content shell prerendered, live inventory/price streamed).
- Anything reading `cookies()`/`headers()`/uncached data must be wrapped in `<Suspense>` or it forces the whole route dynamic.

### Caching
| Data | Strategy |
|---|---|
| Product/collection content | `fetch` with `next: { tags: ["product:<handle>"] }`, revalidated on-demand via Shopify webhook → `/api/revalidate` |
| Sanity content | CDN client (60s stale-while-revalidate) for published; webhook-driven `revalidateTag` on publish for instant updates where needed |
| Cart | Never cached — always dynamic, per-session (cookie-based cart ID) |
| Static marketing pages | Fully static (`force-static` where no personalization exists) |
| Search results | Short `revalidate` window (e.g. 60s) — freshness matters less than speed here |

---

## 6. Shopify Organization

All Shopify access is isolated in `src/lib/shopify/`. Nothing outside this folder constructs a GraphQL string.

```
lib/shopify/
├── client.ts          # Storefront API client instantiation (typed, single instance)
├── fragments/          # shared GraphQL fragments: money, image, variant, seo
├── queries/            # read operations, one file per operation
│   ├── getProductByHandle.ts
│   ├── getCollectionByHandle.ts
│   ├── getAllProductHandles.ts     # for generateStaticParams / sitemap
│   ├── searchProducts.ts
│   └── getCustomer.ts
├── mutations/           # write operations
│   ├── createCart.ts
│   ├── addCartLines.ts
│   ├── updateCartLines.ts
│   ├── removeCartLines.ts
│   └── customerLogin.ts
└── types.ts             # narrowed, app-facing types mapped from generated Storefront types
```

- **Collections** — fetched via `getCollectionByHandle` with cursor-based pagination (`first`/`after`) built into the query; the `collection` feature owns filter/sort URL-state parsing and passes resolved variables down.
- **Products** — `getProductByHandle` returns the full product + all variants + images in one query (fragments reused from `search` and `collection` result shapes to avoid drift). Product-side business logic (e.g., "is this variant sold out", "compute compare-at discount %") lives in `features/product/utils`, not in the query layer.
- **Variants** — variant selection state (color/size/finish) is client-side URL-search-param state (`?color=graphite&size=3x4m`) so a specific configuration is linkable and shareable; `features/product/hooks/useVariantSelection.ts` resolves the active variant from Shopify's `selectedOptions`.
- **Cart** — cart ID persisted in an HTTP-only cookie; `features/cart` owns a client store (`zustand`) hydrated from a Server Component read, with all mutations going through Server Actions in `features/cart/actions` that call `lib/shopify/mutations`. Optimistic UI updates the store immediately; the Server Action result reconciles it.
- **Checkout** — this app does **not** rebuild checkout. `features/checkout` hands off to Shopify's hosted `checkoutUrl` (or Shopify's Cart/Checkout extensibility if later needed) — rebuilding PCI-scoped payment UI is out of scope and a compliance liability, not an architecture win.
- **Customer** — `features/customer` wraps the Storefront API's Customer Account flows (or Shopify's new Customer Account API/OAuth if adopted); session token stored in an HTTP-only cookie, never `localStorage`.
- **Search** — `features/search` combines Shopify's `predictiveSearch`/`search` query for commerce results with an optional Sanity query for editorial results (e.g., matching Projects), merged in `services/search.ts`, never inside a component.

---

## 7. Sanity Organization

Sanity models everything Shopify doesn't: story, imagery direction, marketing structure, and non-commerce content. Studio schemas live in `sanity/schemas/`, grouped by role, not alphabetically.

```
sanity/schemas/
├── documents/            # queryable, listable content
│   ├── project.ts        # case study / inspiration gallery entry
│   ├── testimonial.ts
│   ├── faq.ts
│   ├── page.ts           # generic flexible page (about, warranty, etc.)
│   └── author.ts
├── singletons/            # exactly one instance each, pinned in desk structure
│   ├── homepage.ts
│   ├── siteSettings.ts   # global: logo, social links, footer, legal
│   └── navigation.ts
├── objects/                # reusable, non-queryable shapes embedded in documents
│   ├── seo.ts             # {metaTitle, metaDescription, ogImage, noIndex}
│   ├── cta.ts             # {label, href, style}
│   ├── hero.ts
│   └── blockContent.ts    # portable text config (headings, links, embedded CTAs)
└── index.ts
```

- **Schemas** — every document schema imports the shared `seo` object type and includes it as an `seo` field, so metadata generation in `app/` is uniform across content types (`generateMetadataFromSanitySeo(doc.seo)`).
- **Documents vs. Singletons** — a type is a singleton (locked to one document, no "create new") when the business only ever has one of it (`homepage`, `siteSettings`); the Studio's `structure/` customizes the desk to hide the "create" action and pin singletons at the top.
- **SEO** — modeled once as an `objects/seo.ts` field group, never duplicated per document type. Falls back to `siteSettings` defaults when a page-level field is empty (handled in the metadata-generation function, not duplicated logic per page).
- **Navigation** — `navigation` singleton models header/footer link trees as an array of `{label, href, children?}` so marketing can restructure nav without a deploy; `config/nav.ts` provides only the *fallback* structure used if Sanity is unreachable at build time.
- **Homepage** — modeled as an ordered array of typed "sections" (`hero`, `featuredProjects`, `testimonialRail`, `faqTeaser`, `ctaBanner`), rendered via a section-registry pattern (`components/shared/SectionRenderer.tsx` maps `_type` → component). This is the one place a small mapping abstraction is justified — the alternative is a giant homepage `page.tsx` with a growing if/else chain every time marketing adds a section.
- **Projects** — case studies with gallery images (Cloudinary-hosted, referenced by URL/public ID — not Sanity's asset pipeline, to keep one image CDN for the whole app), location, pergola model tag (cross-referenced to a Shopify product handle by string, not a hard reference, since Shopify is the system of record).
- **Testimonials** — `{author, quote, rating, location, relatedProjectRef?}`, queried with a `count` param for homepage teaser vs. full testimonials page.
- **FAQs** — grouped by `category` string (e.g., "Installation", "Warranty", "Ordering") so `features/faq` can render grouped accordions without client-side grouping logic.

GROQ queries live in `lib/sanity/queries/`, one file per query, each returning a fully-typed projection (explicit field selection — never `*[]` un-projected queries, which over-fetch and break typing).

---

## 8. Design Tokens

Defined once in `src/styles/tokens.css` via Tailwind v4's CSS-first `@theme` directive, imported by `globals.css`. No JS token object duplicating these — Tailwind utilities and CSS custom properties (`var(--color-*)`) are the only two consumers, so component code never hardcodes a raw value.

| Category | Scale |
|---|---|
| **Spacing** | 4px base unit: `0, 1(4px), 2(8px), 3(12px), 4(16px), 6(24px), 8(32px), 12(48px), 16(64px), 24(96px), 32(128px)` — Tailwind's default scale, extended at the top end for hero/section spacing. |
| **Typography** | Two families: `--font-display` (headlines, editorial serif/grotesk) and `--font-sans` (UI/body). Type scale: `xs(12) sm(14) base(16) lg(18) xl(20) 2xl(24) 3xl(30) 4xl(36) 5xl(48) 6xl(60) 7xl(72)`, each with a paired `line-height` token — never set line-height ad hoc per component. |
| **Border Radius** | `sm(4px) md(8px) lg(12px) xl(16px) 2xl(24px) full(9999px)` — premium/architectural feel favors the larger end (`lg`/`xl`) for cards and images; `sm` reserved for inputs/badges. |
| **Elevation** | 5-step shadow scale (`sm md lg xl 2xl`) using layered, low-opacity shadows (not default browser box-shadow black) for a soft, premium look; a separate `elevation-inset` token for pressed/active states. |
| **Container Widths** | `sm(640) md(768) lg(1024) xl(1280) 2xl(1440) content(1120)` — `content` is the actual reading/product-grid max-width used site-wide; `2xl` is reserved for full-bleed hero sections only. |
| **Animation Timing** | Durations: `fast(150ms) base(250ms) slow(400ms) slower(600ms)`. Easings: `standard(cubic-bezier(0.4,0,0.2,1)) emphasized(cubic-bezier(0.2,0,0,1)) decelerate(cubic-bezier(0,0,0.2,1))`. GSAP and Framer Motion both consume the same named tokens (via `animations/variants`) so a timing change is one edit, not a find-and-replace across two animation libraries. |
| **Z-Index** | Named scale, never raw numbers in components: `base(0) dropdown(10) sticky(20) overlay(30) drawer(40) modal(50) toast(60) tooltip(70)`. |
| **Breakpoints** | `sm(640) md(768) lg(1024) xl(1280) 2xl(1536)` — Tailwind defaults, kept unmodified so `useMediaQuery` hook values and CSS breakpoints never drift apart. |

---

## 9. Coding Standards

- **No duplicated code** — the rule of three: a second occurrence is fine inline; a third occurrence is extracted, and only then. Extraction target follows the folder rationale above (feature-local → `components/shared` → `utils`/`services`).
- **No unnecessary abstractions** — no interface with one implementation, no factory for objects that are never polymorphic, no generic `<T,>` where a concrete type suffices. If you can't name a second real caller, don't generalize.
- **No prop drilling** — beyond 2 levels, use composition (pass a rendered child instead of the data needed to render it) or a feature-scoped context/provider. Global state (cart, auth) lives in `providers/`; everything else stays local.
- **Maximum reusability without premature genericization** — reusable primitives (`components/ui`) are generic by design; feature composites are specific by design. Don't blur the two.
- **Composition over inheritance** — React has no class inheritance story worth using here; this translates to: prefer children/render-prop composition and small hooks over large multi-purpose components with boolean-flag-driven branching (`<Card variant="a|b|c" showX showY showZ>` is a smell — compose `<Card>` from smaller pieces instead).
- **Strong typing everywhere** — `strict: true` + `noUncheckedIndexedAccess` in `tsconfig.json`. No `any` (ESLint error, not warning). External API responses are typed at the `lib/` boundary immediately, never passed through as `unknown`/`any` and cast later. Shopify types are generated (`graphql-codegen`) and re-narrowed into app-facing types in `lib/shopify/types.ts`; Sanity types are generated via `sanity typegen` from GROQ queries.
- Every exported function has an explicit return type — inference is fine internally, not at public boundaries.
- Server Actions and API routes validate all input with Zod before touching any external system — no exceptions, including "trusted" internal calls.

---

## 10. Performance Standards

- **Images** — `next/image` exclusively, `remotePatterns` restricted to Shopify CDN, Cloudinary, Sanity CDN. Cloudinary handles all editorial/marketing imagery transforms (responsive `srcset`, `f_auto,q_auto`); Shopify CDN images are requested at the exact size needed via Shopify's own image transform params, then passed through `next/image` for lazy-loading and layout stability. LCP image on every route (hero, PDP main image) gets `priority` + explicit `sizes`.
- **Video** — no autoplaying full-resolution video; hero video (if used) is served via a CDN with adaptive bitrate, `preload="metadata"`, poster image mandatory, and pauses when out of viewport (`IntersectionObserver`).
- **Code splitting** — automatic per-route via App Router; heavy client-only libraries (a rich configurator UI, a map, a chart) are additionally split with `next/dynamic`.
- **Dynamic imports** — used for: below-the-fold interactive widgets (configurator step 2+), modals/dialogs (loaded on first open, not on page load), and any library with a large client bundle (e.g., a PDF generator for quotes).
- **Prefetching** — `next/link` default prefetch stays on for primary nav and product cards in view; disabled (`prefetch={false}`) for long result lists (search/collection grids) where prefetching every visible card wastes bandwidth for marginal benefit.
- **Server rendering** — default posture per Principle #3; client-rendering is the exception that must be justified in a PR description, not the default.
- **Partial Prerendering** — adopted route-by-route as routes stabilize (PDP and homepage first: static shell + streamed dynamic holes for price/inventory/personalization).
- **Caching** — see [§5 Caching](#caching) table; the general rule is tag-based invalidation over time-based, so content editors and merchandisers get near-instant updates without over-fetching on every request.
- Performance budget enforced in CI: Lighthouse CI on PR preview deploys, hard gate on LCP, CLS, and JS bundle size regressions on the homepage, a PLP, and a PDP.

---

## 11. Accessibility Standards

- **Keyboard support** — every interactive element reachable and operable via keyboard alone; custom components (variant swatches, carousels, the configurator) implement roving `tabIndex` and arrow-key navigation matching their ARIA pattern (WAI-ARIA Authoring Practices), not just `tabIndex={0}` and hope.
- **ARIA** — used only to fill real gaps left by semantic HTML (e.g., `aria-live="polite"` on cart count/toast updates, `aria-expanded` on accordions/menus). ARIA on top of already-semantic HTML is redundant and a maintenance liability — semantic HTML is preferred first.
- **Semantic HTML** — `<button>` for actions, `<a>` for navigation (never a `div` with `onClick` standing in for either), landmark elements (`<header> <nav> <main> <footer>`), heading hierarchy that never skips a level.
- **Contrast** — all text/background pairs meet WCAG 2.1 AA (4.5:1 normal text, 3:1 large text/UI components) — verified against the actual design tokens in §8, not spot-checked per component.
- **Focus** — a visible, non-suppressed focus ring on every interactive element (`:focus-visible`, never `outline: none` without a replacement indicator); focus is programmatically moved into modals/drawers on open and returned to the trigger on close.
- **Reduced motion** — every GSAP/Framer animation respects `prefers-reduced-motion`; the shared `animations/variants` layer exposes a reduced-motion variant alongside the default so components opt in automatically via a single `useReducedMotion()` check rather than each component reimplementing the media query.

---

## 12. SEO Standards

- **Metadata API** — every route exports `generateMetadata`, sourcing title/description from Sanity's `seo` object where present, falling back to `siteSettings` defaults, never hardcoded per page.
- **Schema.org** — JSON-LD injected per route type: `Product` + `Offer` + `AggregateRating` on PDPs (sourced from live Shopify price/availability, never stale CMS copy), `BreadcrumbList` site-wide, `Organization`/`LocalBusiness` on the homepage, `FAQPage` on the FAQ route generated directly from the Sanity FAQ documents.
- **Open Graph / Twitter** — generated once via a shared `buildOpenGraph()`/`buildTwitterCard()` helper in `config/seo.ts`, fed per-route title/description/image — no per-page duplication of OG boilerplate. Dynamic OG images (`app/api/og`) for PDPs/collections without a dedicated hero image.
- **Robots** — `app/robots.ts` disallows `/account`, `/api`, `/search` (parameterized results) and cart/checkout routes; allows everything else.
- **Canonical** — set explicitly on every route via `alternates.canonical` in metadata, especially on paginated/filtered collection views, which canonicalize to the unfiltered collection URL to avoid duplicate-content dilution.
- **Sitemap** — `app/sitemap.ts` generated from live data: all Shopify product/collection handles (`getAllProductHandles`) + all Sanity page slugs + static marketing routes, with `lastmod` sourced from `updatedAt` fields, not build time.
- **Breadcrumbs** — rendered UI component in `components/shared/Breadcrumbs.tsx` paired 1:1 with the `BreadcrumbList` JSON-LD emitted on the same route, generated from a single shared data structure so the visible breadcrumb and the structured data can never drift apart.

---

## 13. Git Workflow

### Branches
`type/short-description`, kebab-case, imperative:
- `feature/pdp-variant-selector`
- `fix/cart-quantity-race-condition`
- `chore/upgrade-tailwind-v4`
- `refactor/shopify-client-typed-errors`
- `docs/architecture-update`

### Commits
[Conventional Commits](https://www.conventionalcommits.org/), imperative mood, scoped to the affected area:
```
feat(product): add variant selector with URL-persisted state
fix(cart): prevent duplicate line items on rapid add-to-cart clicks
perf(collection): stream product grid below the fold via Suspense
refactor(shopify): centralize fragments to remove query duplication
docs(architecture): document PPR adoption criteria
chore(deps): bump next to 15.3.0
test(checkout): add e2e coverage for hosted checkout hand-off
```
Types: `feat fix perf refactor docs chore test style ci build`.

### Pull Requests
`<Type>: <imperative summary>`, matching commit type conventions, e.g.:
- `Feat: Add pergola configurator step 1 — dimension input`
- `Fix: Resolve cart drawer focus trap not releasing on close`

PR description always states: what changed, why, and how it was verified (screenshots for UI, test coverage for logic). No PR merges without CI green (typecheck, lint, unit tests, e2e smoke, Lighthouse budget).

---

## 14. Development Roadmap

Ordered; each phase assumes the previous is complete. This is the build sequence from init to production.

**Phase 0 — Foundations**
1. Repo scaffold (this document), tooling (ESLint/Prettier/TS strict/Husky pre-commit), CI pipeline skeleton (typecheck, lint, test on every PR).
2. Design tokens in `styles/tokens.css`; shadcn/ui installed and themed to tokens.
3. Environment/config layer: `config/env.ts` (typed, validated), `.env` provisioned for Shopify/Sanity/Cloudinary/Resend dev credentials.

**Phase 1 — Content & Commerce Backbones**
4. `lib/shopify` client + core queries (product, collection, cart) with generated types; verify against a real dev store.
5. `sanity/` schemas for singletons + core documents (`siteSettings`, `navigation`, `homepage`, `page`); Studio deployed at `/studio`.
6. `lib/sanity` client + typed GROQ queries for the above.

**Phase 2 — Layout & Global Chrome**
7. `components/layout` — header, footer, mobile nav — sourced from the `navigation` singleton with `config/nav.ts` static fallback.
8. Root `layout.tsx`, `providers/` (theme, cart shell), global error/not-found boundaries.

**Phase 3 — Commerce Core**
9. `features/collection` — PLP grid, filters, sort, pagination; Suspense-streamed grid.
10. `features/product` — PDP: gallery, variant selection (URL state), price/availability, add-to-cart.
11. `features/cart` — cart store, drawer, Server Action mutations, optimistic updates, tag-based revalidation wired to Shopify webhooks (`/api/webhooks/shopify` → `/api/revalidate`).
12. `features/checkout` — hosted checkout hand-off, cart-to-checkout continuity testing.

**Phase 4 — Account & Trust**
13. `features/customer` — login/register/session, order history.
14. `features/search` — predictive search combining Shopify + Sanity results.

**Phase 5 — Brand & Content Depth**
15. `features/projects`, `features/testimonials`, `features/faq` — Sanity-sourced, section-registry-driven homepage assembly.
16. `features/contact` — Resend-backed contact/quote forms with Zod validation shared client/server.

**Phase 6 — Differentiator**
17. `features/configurator` — custom pergola builder (dimensions, finish, options) producing a structured quote request (Resend email + optional Sanity/CRM record) — the feature that separates this from a template Shopify theme.

**Phase 7 — Polish**
18. `animations/` pass — GSAP scroll narratives for marketing sections, Framer Motion micro-interactions for commerce UI, reduced-motion variants verified.
19. Accessibility audit (axe + manual keyboard/screen-reader pass) against §11.
20. SEO pass: metadata, JSON-LD, sitemap, OG images verified per route type against §12.

**Phase 8 — Performance & Launch Readiness**
21. PPR adoption per route (homepage, PDP first), Suspense boundary audit, Lighthouse CI budgets enforced.
22. Load/security review: rate limiting on forms/search, webhook signature verification (Shopify HMAC, Sanity webhook secret), CSP headers.
23. Staging deploy on Vercel with production-equivalent env vars; full regression pass (unit + e2e) green.

**Phase 9 — Production**
24. DNS cutover, production Shopify/Sanity credentials, monitoring (Vercel Analytics, error tracking) wired.
25. Post-launch: real-user monitoring against the Phase 8 performance budget, content team onboarded to Studio, roadmap handed off for iteration (A/B testing infra, internationalization, if/when scoped).
