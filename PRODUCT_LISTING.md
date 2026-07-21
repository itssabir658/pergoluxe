# Pergoluxe — Product Listing Experience

Companion to [`COMMERCE_ARCHITECTURE.md`](./COMMERCE_ARCHITECTURE.md) (the data-model blueprint this milestone implements against) and the homepage docs (`HOMEPAGE.md`, `HOMEPAGE_STRATEGY.md`, `BRAND_IDENTITY.md`). This documents the Product Listing Experience: one reusable, data-driven collection page template, built to the explicit boundary that this milestone does **not** include the Product Detail Page, the Configurator, or the Cart.

## Table of Contents

1. [Component Hierarchy](#1-component-hierarchy)
2. [Folder Structure](#2-folder-structure)
3. [Reusability Strategy](#3-reusability-strategy)
4. [Performance Decisions](#4-performance-decisions)
5. [Accessibility Review](#5-accessibility-review)
6. [Shopify Integration Plan](#6-shopify-integration-plan)
7. [Sanity Integration Plan](#7-sanity-integration-plan)
8. [Future Enhancement Opportunities](#8-future-enhancement-opportunities)
9. [Known Issue Found Outside This Milestone's Scope](#9-known-issue-found-outside-this-milestones-scope)
10. [Verification](#10-verification)

---

## 1. Component Hierarchy

```
CollectionPage (src/app/(shop)/collections/[handle]/page.tsx)
├── CollectionHero            — h1, breadcrumb, stats, primary CTA, full-bleed image
├── CollectionIntro           — h2, short framing copy
├── ProductGrid                (Client — owns all interactive state)
│   ├── FilterSortBar
│   │   ├── Drawer (responsive: right panel desktop / bottom sheet mobile)
│   │   │   └── FilterControls  — Model/Size/Colour/Roof Type/Motorised/
│   │   │                          Wind Rating/Snow Load/Price/Availability
│   │   ├── Select              — sort
│   │   └── ActiveFilterChips
│   ├── ProductCardSkeleton[]  — shown during useTransition's isPending
│   ├── EmptyState             — "No products match those filters"
│   ├── ProductCard[]
│   └── CompareBar             — floating, appears once ≥1 item selected
│       └── Dialog → ComparisonTable (features/product, reused, not reimplemented)
├── CompareEntryPoint          — static "Compare Products" section (hidden if
│                                 the collection has no comparable products)
├── BuyingGuideCTA             — h2
├── SeoContentBlock            — h2, FAQAccordion (features/faq, reused), internal links
└── RecentlyViewed             — h2, renders nothing until a PDP exists to populate it
```

Route-segment files alongside `page.tsx`: `loading.tsx` (skeleton shell, not yet visibly triggered — see §4) and `error.tsx` (collection-specific retry state, mirroring the root `error.tsx` pattern).

## 2. Folder Structure

```
src/features/collection/              # the collection/PLP DOMAIN
├── types.ts                          # CollectionProduct, CollectionFilterState,
│                                        CollectionFacets, CollectionContent, SortOption
├── constants.ts                      # placeholder catalogue (11 products, 5 collections)
├── utils/
│   ├── filterProducts.ts             # pure — the seam Shopify productFilters replaces
│   ├── sortProducts.ts               # pure — the seam Shopify sort keys replace
│   └── deriveFacets.ts               # facets/counts computed from actual products,
│                                        never a hardcoded option list
├── hooks/
│   └── useCollectionFilters.ts       # URL-search-param filter/sort state + useTransition
├── components/
│   ├── CollectionHero.tsx            # Server
│   ├── CollectionIntro.tsx           # Server
│   ├── FilterSortBar.tsx             # Client
│   ├── FilterControls.tsx            # Client
│   ├── ActiveFilterChips.tsx         # Client
│   ├── ProductGrid.tsx               # Client — the one stateful orchestrator
│   ├── ProductCard.tsx               # no "use client" (see §3) — the reusable card
│   ├── ProductCardSkeleton.tsx       # Server
│   ├── CompareBar.tsx                # Client
│   ├── CompareEntryPoint.tsx         # Server
│   ├── BuyingGuideCTA.tsx            # Server
│   ├── SeoContentBlock.tsx           # Server
│   └── RecentlyViewed.tsx            # Client
└── index.ts

src/app/(shop)/collections/[handle]/
├── page.tsx                          # the one template for every collection
├── loading.tsx
└── error.tsx

public/images/accessory-*.jpg          # 5 new generated placeholder images
scripts/generate-placeholders.mjs      # +accessoryImage() generator
```

One small, justified change to already-shipped code: `features/product/components/ComparisonTable.tsx` now accepts an optional `models` prop (defaulting to the full `pergolaModels` list, so the homepage's existing call site is unchanged) — Quick Compare is that component's second consumer, promoted the same way `formatPrice` was promoted on its second use (`HOMEPAGE.md` §7).

## 3. Reusability Strategy

- **One route template, every collection.** `page.tsx` has no per-collection branching — `handle` only ever selects _which data_ renders through the same structure. `generateStaticParams` enumerates `collectionContent`'s keys directly, so a new collection (a new pergola line, a future furniture category) is a data change, never a new route file.
- **`CollectionProduct` is deliberately lighter than `PergolaModel`.** A pergola model, an enclosure, and an LED kit all satisfy the same card type — `keySpecs` is an open list rather than a fixed wind-rating/roof-type shape, so an accessory card never carries fake or empty pergola-specific fields. `pergolaModelId`, present only on the three canonical models, is the bridge back to `features/product` that gates Quick Compare — an accessory is never offered a comparison that wouldn't make sense.
- **`ProductCard` has no `"use client"` of its own** — the same precedent as `ProjectCard` (homepage Part 2): its only consumer, `ProductGrid`, is already a client boundary (it owns filter/sort/compare/wishlist state), so the card never needs its own directive, and the hover-image crossfade is pure CSS (`group-hover`), the same technique `HeroMedia` and `ComparisonTable` already use elsewhere — one hover-image pattern in the codebase, not several.
- **`FilterControls` is the one filter body**, rendered inside a single responsive `Drawer` (direction `"right"` on desktop, `"bottom"` on mobile) rather than two separate desktop/mobile filter UIs kept in sync by hand.
- **`FAQAccordion` and `ComparisonTable` are reused, not reimplemented.** `SeoContentBlock` feeds `FAQAccordion` (Part 4's homepage FAQ component) collection-specific questions; `CompareBar` feeds `ComparisonTable` (homepage Part 3) a customer-selected subset. Two additional call sites for two already-hardened, already-accessible components, not two new ones.
- **Every facet is computed, never hardcoded** (`deriveFacets.ts`) — a facet value with zero matching products simply doesn't render, so the filter UI can never offer a dead option. This is also the direct placeholder for a live Shopify `productFilters` response (`COMMERCE_ARCHITECTURE.md` §9).

## 4. Performance Decisions

- **Route is fully static.** All five collection pages prerender via `generateStaticParams`; `dynamicParams = false` means an unknown handle 404s at the routing layer before any component code runs — this also fixed a real soft-404 (see §10) rather than only being a performance choice.
- **Server Components by default.** Hero, Intro, CompareEntryPoint, BuyingGuideCTA, SeoContentBlock, and the card skeleton ship zero client JS; only the pieces that genuinely need interaction (filtering, sorting, compare selection, the wishlist heart, the drawer) are Client Components.
- **Filtering/sorting is a pure, synchronous function today** (`filterProducts`/`sortProducts` over the full placeholder array) wrapped in `useTransition` — `isPending` is a real, not simulated, async state, and it's also exactly the mechanism a live Shopify-backed version needs anyway (a `productFilters` query is genuinely async), so swapping the data source later doesn't change the grid's loading behavior, only where `visible` comes from.
- **Images**: every `next/image` in the grid uses breakpoint-aware `sizes` matching the actual rendered column count (1/2/3/4 across mobile/tablet/desktop/ultra-wide); the hero image is `priority` (this route's LCP element); hover images are a second stacked `<Image>`, not a JS-driven swap.
- **`loading.tsx` is shape-matched but not yet visibly triggered** — the placeholder catalogue resolves synchronously, so this route never actually suspends today. It exists for the moment a real Shopify fetch introduces real latency; no code change will be needed then, only an async boundary that starts actually using it.
- **Bundle cost**: the collection route adds Radix Select/RadioGroup/Checkbox/Dialog and vaul's Drawer to the dependency graph — 299KB First Load JS for `/collections/[handle]`, against 283KB for the now-complete homepage. Every hook that crosses a feature boundary (`useCollectionFilters`, `useMediaQuery`) is imported from its own module, never a barrel — a barrel import briefly inflated homepage JS by 23KB during Part 4 (`HOMEPAGE.md` §9) for exactly this reason, and that lesson is applied here from the start.

## 5. Accessibility Review

- **Heading hierarchy verified programmatically**: exactly one `<h1>` (the collection hero) per page, no level skips — `CollectionIntro`, `BuyingGuideCTA`, `SeoContentBlock`, and `RecentlyViewed` are all `<h2>`; `FAQAccordion`'s questions are `<h3>` for free (Radix's `Accordion.Header` renders as `Primitive.h3` by default, per `HOMEPAGE.md` §9).
- **Semantic landmarks**: the hero's breadcrumb is a real `<nav aria-label="Breadcrumb">`; each filter facet is a real `<fieldset>`/`<legend>`; the active-filter-chip row and the results count are announced via `role="group"`/`aria-live="polite"` respectively.
- **Keyboard navigation**: every filter control (checkbox, radio, number input, select) is a Radix primitive with full keyboard support built in; the filter Drawer traps focus and returns it to the trigger on close (vaul's built-in behavior, the same primitive already used for the mobile nav and cart drawer patterns); product card CTAs and the Quick Compare/wishlist buttons are all real `<button>`/`<Link>` elements, confirmed reachable via `Tab`.
- **`aria-pressed`** on Quick Compare and wishlist toggle buttons announces selection state to assistive tech, matching the toggle-button convention already established by the homepage's collection filter chips (`ProjectGallery`, Part 2).
- **Touch targets**: the filter trigger, sort select, and card CTAs all meet the 44px minimum on a 390px viewport (verified via Playwright).
- **Reduced motion**: the only motion in this milestone is the `CompareBar`'s entrance (`motion-safe:animate-in`) and the hover-image crossfade (a CSS transition, not a JS animation) — both already gated or inherently inert under `prefers-reduced-motion` per the site-wide global rule (`globals.css`), verified with a `reducedMotion: 'reduce'` Playwright context.
- **Colour is never the only signal**: availability and warranty badges carry text, not just a colour chip; the empty state pairs an icon with a full sentence, never an icon alone.

## 6. Shopify Integration Plan

Every placeholder below maps to a named `COMMERCE_ARCHITECTURE.md` section — this is not a vague "eventually load from an API," it's the specific seam:

| Today (placeholder)                                                                                                                       | Replaced by                                                                                                                     | Where                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `features/collection/constants.ts`'s `products` array                                                                                     | `getCollectionByHandle` Storefront API query, paginated (`first`/`after`)                                                       | `COMMERCE_ARCHITECTURE.md` §7, `ARCHITECTURE.md` §6 |
| `filterProducts.ts` (client-side array filter)                                                                                            | Shopify's `productFilters`/`@filters` on the collection query — returns _available_ facets with live counts                     | `COMMERCE_ARCHITECTURE.md` §9                       |
| `sortProducts.ts` (client-side sort, "Newest"/"Best Selling"/"Most Popular" are honest no-ops today — see the function's own doc comment) | Shopify's native collection sort keys (`CREATED`, `BEST_SELLING`, etc.)                                                         | `COMMERCE_ARCHITECTURE.md` §9                       |
| `deriveFacets.ts`                                                                                                                         | The `productFilters` response shape directly — this function's return type was modeled on it                                    | `COMMERCE_ARCHITECTURE.md` §9                       |
| `CollectionProduct.startingPrice`/`compareAtPrice`                                                                                        | The Product's default/cheapest variant's real `Money` price and `compareAtPrice`                                                | `COMMERCE_ARCHITECTURE.md` §5                       |
| `CollectionProduct.availability`/`leadTimeWeeks`                                                                                          | Inventory policy + a `leadTimeWeeks` metafield (made-to-order items keep `inventoryPolicy: CONTINUE`, never a fake stock count) | `COMMERCE_ARCHITECTURE.md` §10                      |
| `CollectionProduct.pergolaModelId` bridge to Quick Compare                                                                                | Becomes unnecessary once `ComparisonTable` reads the same live Product data both places already share                           | `COMMERCE_ARCHITECTURE.md` §2                       |
| `ROUTES.product(handle)` card links                                                                                                       | Already correct — the PDP milestone only needs to build the page those links point to                                           | —                                                   |

Nothing in any component assumes the placeholder shape is final: `CollectionProduct`, `CollectionFacets`, and `CollectionFilterState` are typed independently of `features/collection/constants.ts`, so swapping the import for a Storefront API call changes exactly one file per concern (the query, the filter function, the sort function) and zero component files.

## 7. Sanity Integration Plan

Every field on `CollectionContent` (`types.ts`) is exactly what a future Sanity `collectionPage` document supplies:

```
collectionPage (Sanity document, one per collection handle)
├── handle              → slug, matches Shopify collection handle
├── heroImage, heroEyebrow, heroTitle, heroSupportingCopy, heroPrimaryCta
├── heroStats[]          → { value, label }
├── introHeading, introBody
├── seoHeading, seoOverview
├── seoFaqs[]             → { question, answer } (or a reference to shared `faq` documents)
├── seoInternalLinks[]    → { label, href }
└── buyingGuide           → { heading, body, cta, image }
```

`CollectionHero`, `CollectionIntro`, `BuyingGuideCTA`, and `SeoContentBlock` already take this exact shape as a prop — wiring Sanity means replacing `collectionContent[handle]` (the constants-file lookup) with a GROQ query result of the same shape in `page.tsx`; none of those four components change. This mirrors `ARCHITECTURE.md` §7's existing homepage-section pattern exactly, applied to collection pages instead of the singleton homepage document.

## 8. Future Enhancement Opportunities

- **Live facet recount per selection.** Facets are currently derived from the full collection's product set, not recomputed against the _other_ currently-active filters — a real Shopify `productFilters` response does this live (e.g., selecting "Motorised" narrows the Colour facet's counts). Worth adding once real data makes the difference visible; noted here rather than silently deferred.
- **Quick Compare beyond the three canonical models.** Once every product (including accessories and future categories) has real Shopify metafield-backed specs, `pergolaModelId`'s bridge to `features/product` becomes unnecessary — `ComparisonTable` could read whatever spec metafields the selected products actually share.
- **`RecentlyViewed`'s write side** (`useRecordProductView`, already exported) is ready for the Product Detail Page milestone to call on mount — no design work left there, only a one-line call from a page that doesn't exist yet.
- **Wishlist** is a real, working, local (`localStorage`) feature today, honestly scoped: nothing syncs to a customer account yet, since there's no customer auth in this milestone. Once Shopify Customer Accounts exist, this becomes a natural sync target.
- **Algolia/advanced search**, if the business ever needs synonym management or merchandised ranking beyond Shopify's native facet system — already the plan in `COMMERCE_ARCHITECTURE.md` §9, unaffected by anything built here since filtering already sits behind this feature's own `utils/` functions.

## 9. Known Issue Found Outside This Milestone's Scope

While verifying `CompareBar` (a new, `fixed bottom-0` element), Playwright testing surfaced that it can be fully covered by the site's cookie-consent banner (also `fixed bottom-0`, with a higher z-index token) whenever a visitor hasn't yet dismissed it — `document.elementFromPoint` at the Compare button's coordinates resolved to the cookie banner's own button, not `CompareBar`'s. This is **not unique to `CompareBar`**: `BackToTop` (an already-approved Navigation-milestone component, also `fixed bottom-*`) has the identical exposure — this is a pre-existing z-index/layering characteristic of the cookie-consent component, not a regression introduced here, and fixing it would mean touching approved Navigation-milestone code beyond this milestone's scope. Flagged here rather than silently worked around, so it's a deliberate, visible backlog item rather than a surprise later.

## 10. Verification

Playwright/Chromium against the production build, across desktop (1440px), mobile (390px), `reducedMotion: 'reduce'`, and keyboard interaction, on both a pergola collection (`attached-pergolas`) and the structurally-different accessories collection: heading hierarchy correct; filter selection updates the URL and renders an active chip; Clear All removes it; sort updates the URL; Quick Compare selects two models, opens `CompareBar`, and opens the reused `ComparisonTable` in a dialog; the impossible-filter empty state renders with a working Clear-all action; accessories correctly receives no Quick Compare option and no `CompareEntryPoint` (no comparable products); the homepage's own comparison table was re-verified unaffected by `ComparisonTable`'s new optional prop. Zero horizontal overflow at any breakpoint, including real anchor navigation and an actual `window.scrollBy` attempt (the exact regression class found and fixed in Part 3). An unknown collection handle now correctly returns HTTP 404 (fixed during this milestone — see the `dynamicParams` comment in `page.tsx`). Final pass: `tsc --noEmit` clean, `eslint` clean, `next build` clean (299KB First Load JS for `/collections/[handle]`, all five collection pages statically prerendered).
