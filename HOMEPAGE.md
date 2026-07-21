# Pergoluxe — Homepage Implementation

Companion to [`HOMEPAGE_STRATEGY.md`](./HOMEPAGE_STRATEGY.md) (what the homepage must achieve and why) and [`BRAND_IDENTITY.md`](./BRAND_IDENTITY.md) (what it must look like). This documents what has actually been built, milestone by milestone: **Part 1** (Hero, Trust Bar, Collections — §1–6), **Part 2** (Configurator Preview, Signature Benefits, Featured Projects — §7), **Part 3** (Comparison, Testimonials & Installation Journey — §8), and **Part 4** (FAQ, Final CTA, Newsletter & homepage-wide polish — §9). The homepage is now **complete and production-ready** — no further homepage sections are planned; the next milestone is Product Listing Pages.

## Table of Contents

1. [Component Structure](#1-component-structure)
2. [Architectural Decisions](#2-architectural-decisions)
3. [Performance](#3-performance)
4. [Accessibility](#4-accessibility)
5. [Future Extensibility](#5-future-extensibility)
6. [Verification](#6-verification)
7. [Part 2 — Configurator Preview, Benefits & Projects](#7-part-2--configurator-preview-benefits--projects)
8. [Part 3 — Comparison, Testimonials & Installation Journey](#8-part-3--comparison-testimonials--installation-journey)
9. [Part 4 — FAQ, Final CTA, Newsletter & Homepage Polish](#9-part-4--faq-final-cta-newsletter--homepage-polish)

---

## 1. Component Structure

```
src/app/(marketing)/page.tsx        # route: composes the three sections, nothing else

src/features/home/
├── components/
│   ├── Hero.tsx                    # Server — copy, CSS-keyframe entrance, composition
│   ├── HeroMedia.tsx               # Client — poster (LCP), gated video, scrim
│   ├── ScrollCue.tsx               # Client — animated scroll affordance (a real link)
│   ├── TrustBar.tsx                # Server — stats + feature rows from config
│   ├── AnimatedStat.tsx            # Client — count-up number, SSR-correct
│   ├── CollectionShowcase.tsx      # Server — section header + card grid
│   └── CollectionCard.tsx          # Server — data-driven card, CSS-only hover
└── index.ts                        # feature barrel: Hero, TrustBar, CollectionShowcase

src/components/shared/ScrollReveal.tsx   # Client — the site-wide scroll-entrance
                                          # primitives (single / staggered group)
src/config/collections.ts           # single source of truth for the collection taxonomy
src/config/trust.ts                 # trust stats + features (placeholder values flagged)
src/config/fonts.ts                 # swapped to Geist / Geist Mono per BRAND_IDENTITY §5
scripts/generate-placeholders.mjs   # sharp script that generated the committed imagery
public/images/                      # hero poster + 4 collection placeholders (committed)
```

Supporting change: `config/nav.ts` now **derives** the mega menu's product categories from `config/collections.ts` instead of duplicating the same four entries — the nav and the homepage literally cannot disagree about the taxonomy anymore.

---

## 2. Architectural Decisions

**The hero entrance is CSS keyframes, not Framer Motion — because a real bug forced the issue.** The first implementation used a Framer `initial="hidden"` staggered entrance. The reduced-motion screenshot pass (not review, not types) caught the hero rendering semi-invisible: `initial="hidden"` ships `opacity: 0` in the server HTML, and the animation start races the reduced-motion hook's first client value. The fix moved the entire entrance to `tw-animate-css` keyframes (`animate-in fade-in slide-in-from-bottom-*` with per-element `delay-*` and `fill-mode-backwards` for the stagger): CSS animation starts pre-hydration, costs zero client JS, works with JS disabled entirely (verified — see §6), and collapses natively under the global `prefers-reduced-motion` rule. That rule needed one addition — `animation-delay: 0.01ms !important` — because a staggered entrance using `fill-mode-backwards` would otherwise hold content invisible for its full delay even with an instant animation. Side effect: `HeroContent` as a separate Client Component ceased to exist; the hero's copy and choreography live in the Server Component.

**Below-the-fold reveals stay JS-driven (`ScrollReveal` primitives), and that split is deliberate.** Scroll-triggered CSS animation (`animation-timeline: view()`) isn't broadly supported yet, so viewport-entry reveals need JS. The tradeoff differs by position: above the fold, invisible-until-hydration harms first impressions and LCP-adjacent perception (hence CSS); below the fold, the content isn't on screen before hydration completes anyway, so Framer's `whileInView` is fine — and under reduced motion, `useMotionVariants` collapses those variants to a visible static state (verified in §6). The new `ScrollReveal` / `ScrollRevealGroup` / `ScrollRevealItem` primitives in `components/shared` are now the one scroll-entrance mechanism for every future section — the "one motion system" rule from the brand bible enforced by construction.

**Everything is a Server Component except the four leaves that genuinely need the browser.** `HeroMedia` (media queries + video error state), `ScrollCue` (looping animation gated on reduced motion), `AnimatedStat` (in-view count-up), `ScrollReveal` (viewport observation). `Hero`, `TrustBar`, `CollectionShowcase`, and `CollectionCard` are all server-rendered; the collection card's hover treatment (image zoom in a fixed frame, arrow slide) is pure CSS with `motion-safe:` gating, so a fully interactive-feeling card ships zero JS of its own.

**Cards are data-driven from one config file.** `CollectionCard` takes a `Collection` object; the four instances come from mapping `config/collections.ts`. Adding a fifth collection is a data change (plus one generated image), not a component change — and the mega menu picks it up automatically through the derivation in `nav.ts`.

**The placeholder imagery is generated, committed, and honest.** No real photography exists yet, and the project's established rule (NAVIGATION.md §6) is that placeholders must read as "no image yet," never as fake photos. The `sharp`-generated images (dark bronze hero, warm-stone collection tiles, all carrying the brand's louver-line motif) are clearly abstract but composed and graded to the brand palette, so layout, contrast, and scrim decisions made against them survive the swap to real photography. The script is committed for regeneration; the hero video simply isn't shipped — `HeroMedia` requests `/videos/hero-loop.mp4`, catches the 404 via `onError`, and stays on the poster. Dropping the real file in requires no code change.

**Geist replaces the placeholder fonts** per BRAND_IDENTITY.md §5's single-family decision — one loader change in `config/fonts.ts`. The `--font-display` token now falls back to `--font-sans` (the intended one-family behavior), so tokens.css and every component were untouched, exactly the isolation that file existed to provide.

---

## 3. Performance

- **The homepage is fully static** (`○` in the build output) — no dynamic rendering, no data fetching; it serves from the CDN edge as prerendered HTML.
- **LCP is the hero poster**: `next/image` with `priority`, `sizes="100vw"`, a 24KB committed JPEG. The video never blocks paint — it's requested after mount, desktop-only, fades in over the poster only once it can play.
- **Video is triple-gated** (desktop `lg+` only, never under reduced motion, permanent poster fallback on error) per the performance strategy — mobile visitors never pay a video's decode/battery cost for a background they'd barely see.
- **Zero CLS by construction**: the hero is `min-h-svh` (no reflow when video arrives — it's an absolutely positioned layer), every card image reserves its box via `aspect-[4/3]` (CSS aspect-ratio, deliberately not the Radix `AspectRatio` component — same result, no client JS), and stat counters render their final value server-side so the layout never shifts when the animation starts.
- **Hover and entrance costs**: card hover is CSS `transform` only inside an `overflow-hidden` frame; the hero entrance is compositor-friendly keyframes (opacity/transform); the count-up animates a text node, not layout.
- **First Load JS is 271kB**, of which ~100kB is the shared shell chunk; the biggest marginal cost is Framer Motion, already tree-shaken via `optimizePackageImports` and only pulled by the four client leaves. The hero itself contributes almost nothing — its animation is CSS.

---

## 4. Accessibility

- **Heading hierarchy**: one `h1` (hero headline), visible `h2` for Collections, `sr-only` `h2` for the Trust Bar, `h3` per collection card and trust feature — sequential, no skips, matching HOMEPAGE_STRATEGY §9/§11's shared SEO/screen-reader structure.
- **Reduced motion, all three tiers**: hero entrance collapses via the global CSS rule (now including `animation-delay`); scroll reveals collapse via `useMotionVariants`; the count-up and scroll-cue loop are skipped entirely via `useReducedMotion`. All verified in a `reducedMotion: 'reduce'` browser context, screenshot-compared against the normal run.
- **Screen-reader-correct counters**: the animating number is `aria-hidden` with an `sr-only` static twin holding the final value — a screen reader announces "5,000+", never a mid-animation frame.
- **The scroll cue is a real control**: an anchor to `#trust` with an `sr-only` label and visible focus ring, not a decorative div; the target section carries `scroll-mt-*` so the fixed header never covers the landing point.
- **One tab stop per card**: the whole collection card is a single link (no nested competing links), with the focus ring on the card's rounded boundary.
- **Contrast over media**: hero text sits on the mandated gradient scrim (heaviest under the CTAs/trust line), checked against the poster's brightest region; secondary CTA borders/text were chosen against the scrimmed background, not the raw image.
- **Decorative media is silent**: the hero media container is `aria-hidden` (the `h1` carries the message); card check-icons and arrows are `aria-hidden` beside their visible text.

---

## 5. Future Extensibility

- **Next milestones slot in below `CollectionShowcase`** in `page.tsx`, in the strategy's §3 order — no restructuring needed.
- **`ScrollReveal` primitives are the reveal mechanism for every future section** (Benefits, Projects, Process…) — already shared, already reduced-motion-safe.
- **Shopify wiring**: `config/collections.ts` holds display metadata keyed by real Shopify collection handles; when `lib/shopify` lands, live data merges over this file (which remains the build-time fallback) without touching any component.
- **Sanity wiring**: `config/trust.ts`'s stats/features are shaped for a future `siteSettings` singleton, with the placeholder numbers explicitly flagged for replacement with verified figures before launch (a brand-bible requirement, not a nice-to-have).
- **Real assets drop in without code changes**: hero video at `public/videos/hero-loop.mp4`; real photography replaces the four collection JPEGs at the same paths (or via a one-line `src` change to Cloudinary URLs).

---

## 6. Verification

Beyond `tsc --noEmit`, `eslint`, and a clean static `next build`, the page was exercised in a real browser (Playwright/Chromium) before commit:

- **Desktop (1440×900), ultra-wide (2560), mobile (390×844)** — screenshots of hero, trust, and collections at each; zero horizontal overflow measured at every width.
- **Reduced motion** — this pass caught the milestone's one real bug (hero invisible due to the Framer hydration race, §2) and verified the CSS fix renders instantly and completely.
- **JavaScript disabled** — hero copy, CTAs, and trust line fully visible (a direct consequence of the CSS-entrance decision).
- **Card hover** — image zoom stays inside its frame; the card itself doesn't move.
- **Console/network audit** — the only 404s are nav-link prefetches for routes whose pages don't exist yet (self-resolving as those pages are built) and the single, handled hero-video request.

---

## 7. Part 2 — Configurator Preview, Benefits & Projects

### Component architecture

```
src/features/configurator/          # the configurator DOMAIN owns the preview
├── types/index.ts                  # ConfigOption/ConfigStep/Accessory/PreviewSelection
├── constants.ts                    # steps, options, accessories, base price (flagged placeholder)
├── utils/pricing.ts                # calculatePreviewPrice + formatPrice (pure, testable)
├── components/ConfiguratorPreview.tsx   # Client — the working teaser
└── index.ts

src/features/projects/              # the projects DOMAIN owns the gallery machinery
├── types.ts                        # Project + PROJECT_CATEGORIES
├── constants.ts                    # 6 placeholder projects (flagged, Sanity replaces)
├── components/ProjectCard.tsx      # card (image, meta, hover/focus overlay)
├── components/ProjectGallery.tsx   # Client — filter chips + grid
└── index.ts

src/features/home/components/       # home owns only the section CHROME
├── ConfiguratorPreviewSection.tsx  # Server — heading + <ConfiguratorPreview/>
├── SignatureBenefits.tsx           # Server — six benefit cards from constants
└── FeaturedProjectsSection.tsx     # Server — heading + <ProjectGallery/>
```

The split follows ARCHITECTURE.md's feature-first rule strictly: the homepage doesn't own a configurator or a gallery — it _composes_ them. The full configurator page and the full `/projects` page will grow around the exact components and data models built here, not parallel reimplementations.

### Reusability strategy

- **`ConfiguratorPreview` is a real slice of the configuration model, not a mock.** Selection state drives price, lead time, and the finish preview through one pure function (`calculatePreviewPrice`) — the single seam Shopify variant pricing replaces. Option ids (`attached`, `louvered-motorized`, `graphite`) are the future variant option values; the model/roof taxonomy comes from `config/collections.ts`, not invented SKUs.
- **`ProjectGallery` takes `projects` as a prop** — the homepage passes the placeholder six; the future `/projects` page passes the full Sanity result set. The filter chips genuinely filter (the brief required UI only, but with local data, dead controls would be worse than working ones — same precedent as the search modal's real local index).
- **Benefit copy lives in `features/home/constants.ts`** as typed data; the card is a map over it. Copy follows the brand-voice rule: concrete claims (hidden drainage routes water through the posts) with no invented certifications or alloy numbers.

### Performance optimisations

- The route stays **fully static**; Part 2 added ~6KB to the route's JS (the two client components), keeping First Load at 279KB.
- The **finish crossfade is a CSS opacity transition across three pre-mounted `next/image` layers** (each a sub-25KB generated placeholder) — instant response to selection, zero JS animation, and it collapses natively under reduced motion. No image swap = no network waterfall on interaction.
- All Part 2 imagery is **below the fold and lazy-loaded** by `next/image` defaults; every image reserves its box via CSS `aspect-[4/3]` (no CLS).
- Card hover (projects and collections alike) is CSS `transform` inside an `overflow-hidden` frame; benefit-card hover is a border-color transition only — no layout, no paint storms.

### Accessibility considerations

- **Configurator steps are real `<fieldset>`/`<legend>` groups**: Radix `RadioGroup` for choose-one steps (arrow-key navigation with selection-follows-focus, one tab stop per group), `aria-pressed` toggle buttons for independent accessories. Finish swatches carry `aria-label`s and a visible check indicator — never colour alone.
- **The estimated total sits in an `aria-live="polite"` region**, so screen-reader users hear price updates they can't see; the project gallery announces its filtered result count the same way.
- **Nothing essential is hover-gated**: project title, location, model, and dimensions render permanently below the image; hover/focus only adds the description overlay, which is also revealed on `focus-visible` for keyboard users.
- One verification finding worth recording: automated arrow-key testing initially reported selection-follows-focus as broken. Investigation traced it to Radix deferring focus movement in a `setTimeout` while its "arrow key pressed" flag resets on `keyup` — an automation timing artifact (instant synthetic keypresses), confirmed working with human-timed key events. Not an app bug, documented so the next person doesn't re-debug it.

### Future Shopify integration

`features/configurator/constants.ts` is the entire surface to replace: steps/options map to product options on the configurator's Shopify product, `priceDelta` gives way to live variant prices resolved through `lib/shopify` queries, and `calculatePreviewPrice` becomes a lookup of the selected variant's real price. `PreviewSelection` already has the shape of a variant-option selection map. Components don't change.

### Future CMS integration

`features/projects/constants.ts` is explicitly flagged placeholder content — real installations arrive via `features/projects/queries` (GROQ, per ARCHITECTURE.md §7's `project` document schema) and flow through the same `Project` type into the same gallery. Benefit content can move to a Sanity singleton the same way if marketing needs to edit it; the `Benefit` type is already CMS-shaped (flat, serializable, icon referenced by name at the boundary).

### Verification (Part 2)

Playwright/Chromium against the production build: drove the configurator (finish crossfade, accessory toggle, size change — price updated $17,650 → $22,250, matching the pricing function by hand), filtered the gallery (6 → 1 cards on "Poolside", live-region count updates), exercised card hover/focus overlays, keyboard-tested the radio groups (with the timing caveat above), and re-ran desktop/mobile/reduced-motion screenshot passes — zero page errors, zero horizontal overflow at 390/1440px.

## 8. Part 3 — Comparison, Testimonials & Installation Journey

### Component architecture

```
src/features/product/                 # the product DOMAIN owns model comparison data
├── types/index.ts                    # SpecRow/SpecRowId/PergolaModel/SpecValue
├── constants.ts                      # 3 models × 11 spec rows (flagged placeholder pricing)
├── components/ComparisonTable.tsx    # Server — the real <table>, sticky header, mobile scroll
└── index.ts

src/features/testimonials/            # the testimonials DOMAIN owns review data + display
├── types.ts                          # Testimonial + AggregateRating
├── constants.ts                      # featuredTestimonial, testimonials[], aggregateRating
├── components/StarRating.tsx         # Server — accessible star glyphs (no icon-only meaning)
├── components/TestimonialCard.tsx    # Server — grid card (photo placeholder, quote, model)
├── components/FeaturedTestimonial.tsx    # Server — editorial lead quote, larger treatment
├── components/AggregateRatingSummary.tsx # Server — "4.9 · 1,200+ installations" strip
├── components/VideoTestimonialTeaser.tsx # Server — honest "coming soon" tile, not a fake player
└── index.ts

src/features/installation-journey/    # the process DOMAIN owns the 6-step timeline
├── types.ts                          # ProcessStep (icon/title/description/timeframe)
├── constants.ts                      # the 6 named steps, in order
├── components/ProcessTimeline.tsx    # Client — scroll-linked rail fill (Framer Motion)
└── index.ts

src/features/home/components/         # home owns only the section CHROME, as in Parts 1–2
├── ComparisonSection.tsx             # Server — heading + <ComparisonTable/>
├── TestimonialsSection.tsx           # Server — heading + rating + featured + grid + teaser
└── InstallationJourneySection.tsx    # Server — heading + <ProcessTimeline/> + consultation CTA
```

Same feature-first split as Parts 1–2: home never owns comparison, review, or process logic — it composes three independent, individually reusable features. `ComparisonTable` is exactly the table a future "Full Specifications" page reuses verbatim; `ProcessTimeline` is exactly what a future dedicated "How It Works" page reuses; the testimonials components are exactly what a future full reviews page/index would page through.

### Reusability strategy

- **`ComparisonTable` takes no props** — it reads `pergolaModels`/`specRows` from `features/product/constants.ts` directly, matching the established pattern (`ProjectGallery` takes data as a prop because the homepage passes a subset; `ComparisonTable` doesn't because the homepage and any future comparison page show the _same_ full model set — a prop would just echo the import).
- **`SpecRowId` is a closed union, not a string** — every row the table can render is enumerated once in `types/index.ts`, so `PergolaModel.specs` is statically checked to have a value for every row for every model. Adding an eventual 4th model or a 12th spec row is a data change; the union and the render loop don't need to change together.
- **`TestimonialCard` and `FeaturedTestimonial` both take a `Testimonial` prop** rather than reaching into constants themselves, so a future paginated/filterable reviews page can render the identical card against a different (larger, server-fetched) data set.
- **`StarRating` is its own component** (not inlined into the two testimonial components) because it's the third place a numeric rating needs the same accessible rendering (card, featured quote, aggregate summary) — the "rule of three" promotion this codebase already applied once to `formatPrice` (see §7), applied again here from the start since all three call sites existed in the same PR.

### Performance optimisations

- **Every new component in this milestone is a Server Component** except `ProcessTimeline`, whose only reason to be a Client Component is the scroll-linked rail fill (`useScroll`/`useSpring` from Framer Motion need the browser). The comparison table, every testimonial component, and all three section wrappers ship zero client JS of their own.
- **The route stays fully static** — Part 3 added ~2.5KB to the page's own JS (`ProcessTimeline`'s scroll-linked motion is the only new client code; everything else is server-rendered HTML), First Load JS moving from 279KB → 282KB.
- **Model images use `next/image` with explicit `sizes`** (`(min-width: 1024px) 25vw, 240px`) matching the comparison table's actual rendered column width at each breakpoint, and reserve their box via `aspect-[4/3]` — no CLS from the three model photos loading in.
- **The timeline rail's scroll-linked transform is `scaleY` only** (a GPU compositor property), driven through a `useSpring` for smoothing rather than re-rendering React on every scroll tick — the only work per frame is a compositor-thread transform update.
- **The comparison table's horizontal scroll on mobile is native `overflow-x: auto`**, not a JS-driven carousel — no scroll-tracking JS, no bundle cost, and it inherits the platform's own momentum scrolling and scrollbar affordances for free.

### Accessibility considerations

- **The comparison table is a real `<table>`** with a `<caption className="sr-only">` naming it, `scope="col"` on every header cell and `scope="row"` on every spec label — screen readers get row/column context for free, which a `<div>` grid pretending to be a table never fully replicates. The rich model-card row is deliberately `<td>` (visual content, not column headers); the compact name+price+CTA row beneath it is the real `scope="col"` header, so "reading down a column" always lands on meaningful header text, not a product photo's alt text.
- **Every boolean spec cell pairs an icon with `sr-only` text** ("Included" / "Not available") — Check and Minus are different _shapes_, not just different colours, so the states survive both colour-blindness and a grayscale/high-contrast rendering. Colour is never the only signal, per `BRAND_IDENTITY.md`'s accessibility rules.
- **Sticky header is desktop-only by construction, not by media-query patch-up**: `position: sticky` cannot operate inside an `overflow-x: auto` ancestor, so the compact header row is `lg:sticky` and the wrapper is `lg:overflow-visible` — on mobile the wrapper is the scroll container instead, which is the explicitly required split (sticky desktop / horizontal-scroll mobile), not an accidental side effect.
- **No testimonial carousel** — the brief allowed one only if it met a strict bar (keyboard accessible, swipe, never autoplay, respects reduced motion); a static featured-quote-plus-grid layout meets the actual goal (surface many reviews at once) without needing to clear that bar at all, and can't regress into an inaccessible slider later.
- **The video testimonial teaser is an honest placeholder**: a static "coming soon" tile with no play button, no fake progress bar, and no `<video>` element pointing nowhere — it never promises functionality that isn't there yet, consistent with this project's placeholder-honesty convention for prices and ratings.
- **The timeline rail is `aria-hidden`**; the journey's order and content are carried entirely by the numbered, static step text beside it, so removing the decorative rail (e.g. under `prefers-reduced-motion`, where it renders fully drawn and static instead of scroll-tracking) loses zero information.

### Performance/layout bug found and fixed during verification

Playwright's mobile (390px) pass caught a real horizontal-overflow bug the static tools (`tsc`, `eslint`, `next build`) couldn't: `document.documentElement.scrollWidth` exceeded `clientWidth` by up to 264px whenever the Comparison section was scrolled into view or reached via a `#compare` anchor link — even though the comparison table's own `overflow-x-auto` wrapper was itself correctly clipping and scrolling the table.

Root cause: `<main>` (`src/app/layout.tsx`) is a flex item (`flex-1`) inside `<body>`'s column flex layout. Flex items default to `min-width: auto`, and a flex container's scrollable-overflow calculation can still be driven by an item's wide descendant content (the 760px-wide table) even when that content is visually clipped several levels down — a distinct mechanism from ordinary block-level overflow, which explains why it resisted `overflow` fixes applied to `<main>`, `<body>`, and `<html>` in isolation and only appeared once the section actually rendered into view. Two fixes were needed together, at two different points in the chain:

1. **`min-w-0` on `<main>`** (`layout.tsx`) — restores normal shrink-to-fit sizing for the flex item itself, so its own rendered box no longer grows to fit a wide descendant.
2. **`contain-paint` on the comparison table's scroll wrapper** (`ComparisonTable.tsx`) — CSS containment guarantees nothing inside that div is ever painted, laid out, or measured outside its own box, closing the specific flex/overflow interaction at its actual source rather than trying to contain it from an ancestor several levels away.

Both were necessary: `min-w-0` alone fixed the box's rendered width but not the ancestor's overflow bookkeeping; `contain-paint` alone (without `min-w-0`) left the flex item free to mis-size itself even though nothing painted outside it. Verified fixed across every reproduction found during debugging: page load at rest, `scrollIntoViewIfNeeded`, real anchor navigation to `#compare`, and an actual `window.scrollBy` horizontal-scroll attempt — all report zero overflow post-fix.

### Future integration

- **Shopify**: `PergolaModel.id` becomes the product handle; `specs` values move to product metafields (boolean/optional/string all map cleanly to metafield types); `startingPrice` becomes the resolved minimum variant price. `ComparisonTable` doesn't change — only `features/product/constants.ts` is replaced by a `lib/shopify` query, exactly the seam Part 2 already established for the configurator.
- **Sanity CMS**: `testimonials`, `featuredTestimonial`, and `aggregateRating` are explicitly flagged placeholder content, following the same convention as `features/projects/constants.ts` — real reviews arrive via a `testimonial` document schema and a `features/testimonials/queries` GROQ layer, flowing through the same `Testimonial` type into the same card/featured/grid components. `processSteps` could similarly move to a CMS singleton if marketing ever needs to edit timeframes without a deploy, though the six steps and their order are structural, not marketing copy, so there's no pressure to do so yet.

### Verification (Part 3)

Playwright/Chromium against the production build, across desktop (1440px), mobile (390px), `reducedMotion: 'reduce'`, and keyboard-only interaction: comparison table sticky header confirmed on desktop scroll, row hover states, and horizontal scroll on mobile with zero page-level overflow (see bug/fix above); testimonials section (featured quote, grid, aggregate rating, video teaser) rendered correctly at both breakpoints; installation journey timeline rendered fully drawn and static under reduced motion (no scroll-linked jank); comparison CTAs reached and activated via keyboard focus. Final pass: zero page errors, zero horizontal overflow at 390px or 1440px, `tsc --noEmit` clean, `eslint` clean, `next build` clean (First Load JS 282KB, route fully static).

## 9. Part 4 — FAQ, Final CTA, Newsletter & Homepage Polish

This is the final homepage milestone. The three remaining sections from `HOMEPAGE_STRATEGY.md`'s flow are built, and the whole page — all twelve sections, Parts 1 through 4 — was reviewed and verified as one continuous experience rather than as isolated pieces. "Guarantees & Financing" (`HOMEPAGE_STRATEGY.md` §3.10) is intentionally **not** a separate section: its content (warranty terms, financing) is folded into the FAQ's Warranty and Financing questions instead, per this milestone's brief.

### Component tree

```
src/features/faq/                     # the FAQ DOMAIN owns questions + schema
├── types.ts                          # FAQItem
├── constants.ts                      # 10 Q&A items (Delivery → Returns)
├── schema.ts                         # faqJsonLd(items) — FAQPage structured data
├── components/FAQAccordion.tsx       # Client — Radix accordion, single-open-only
└── index.ts

src/features/newsletter/               # the newsletter DOMAIN owns copy + form
├── types.ts                          # NewsletterCopy
├── constants.ts                      # CMS-editable copy placeholder
├── components/NewsletterForm.tsx     # Client — useActionState + subscribeNewsletter
└── index.ts

src/features/home/components/          # home owns only the section CHROME
├── FAQSection.tsx                    # Server — heading + FAQPage schema + <FAQAccordion/>
├── FinalCTASection.tsx               # Server — full-bleed image, headline, dual CTA, trust row
├── NewsletterSection.tsx             # Server — heading + <NewsletterForm/>
└── SuppressFooterNewsletter.tsx      # Client, renders nothing — see "Weak areas" below

src/actions/subscribeNewsletter.ts     # pre-existing server action — now has two real
                                        # callers (this section + the footer utility bar)
src/providers/footer-newsletter-provider.tsx  # new — lets a route hide the footer's
                                                # newsletter block when it has its own
scripts/generate-placeholders.mjs      # +finalCta() — one new generated image
```

`page.tsx` composition, in full, end to end:

```
Hero → TrustBar → CollectionShowcase → ConfiguratorPreviewSection → SignatureBenefits
  → FeaturedProjectsSection → ComparisonSection → TestimonialsSection
  → InstallationJourneySection → FAQSection → FinalCTASection → NewsletterSection
  → SuppressFooterNewsletter → Footer
```

### Architecture overview

Same feature-first split as every prior part: `features/faq` and `features/newsletter` own data, validation, and schema; `features/home` owns only section-level chrome (heading, spacing, composition). Two decisions worth calling out specifically:

- **`FAQAccordion` takes `items` as a prop**, not an import — the same reusability seam as `TestimonialCard`/`ComparisonTable` (Parts 2–3), so a future dedicated FAQ page can render the identical component against a larger question set.
- **The homepage's `NewsletterForm` and the footer's `FooterNewsletter` both call the same `subscribeNewsletter` server action** (pre-existing since the architecture milestone, previously only wired to the footer). Validation, and the future ESP integration, exist in exactly one place regardless of which form a visitor uses.

### Weak areas found and resolved

The brief asked for a senior-review pass, not just new sections — reviewing the whole page surfaced two real, cross-cutting issues neither `tsc`, `eslint`, nor a per-section Playwright check would catch:

1. **Every section's anchor-scroll offset was wrong on mobile.** All sections used a static `scroll-mt-24` (96px) to clear the fixed header when scrolled/linked to directly, but the actual mobile header stack (announcement bar + nav) measures 161–170px depending on wrap state — so the top ~65–74px of whatever section you jumped to rendered _underneath_ the fixed header, cutting off headlines. This was pre-existing (present on every Part 1–3 section, not just the new ones) and only became visible once Playwright verification scrolled directly to `#cta` for the first time. **Fixed globally**: `HeaderShell` (which already measures its own real height via `ResizeObserver` for its layout spacer) now also publishes that height to a `--header-stack-height` CSS variable; a new `scroll-mt-header` utility (`tokens.css`) reads it, and every section across the whole homepage — old and new — was switched from `scroll-mt-24` to `scroll-mt-header`. The offset is now always correct, including through an announcement-bar wrap or dismiss, with no per-breakpoint tuning.
2. **The homepage showed two newsletter signup forms back to back** — the new `NewsletterSection` directly above the footer's existing compact `FooterNewsletter` utility bar, both with near-identical copy. Invisible when reviewing either section in isolation; unmistakable in the full-page screenshot. Removing the footer's version site-wide would regress every _other_ page (which have no dedicated newsletter section of their own), so the fix is homepage-specific: a new `FooterNewsletterProvider` (mirroring the existing `HeaderModeProvider` pattern exactly, for the same structural reason — the footer is rendered once, above `{children}`, and can't take a prop from a route nested inside it) lets the homepage call `useHideFooterNewsletter()` and suppress just that one block, only on that one route.

### Performance summary

- **Route stays fully static**; Part 4 added ~0.6KB to the page's own JS (the FAQ accordion and newsletter form are the only new client code) and ~1KB to First Load JS overall (282KB → 283KB) — the `FooterNewsletterProvider`/context addition is a few hundred bytes, not a new dependency.
- One regression was caught and fixed **during** this milestone, not after: importing `useHideFooterNewsletter` through the `@/providers` barrel (instead of directly from `footer-newsletter-provider`) briefly inflated First Load JS by 23KB, because the barrel re-exports `AppProviders` and its whole provider graph (Lenis, GSAP, Radix Tooltip, Sonner). Importing the hook from its own module — matching how `useHeaderMode` is already imported in `HeaderShell.tsx` — resolved it. Documented here as the reason every cross-cutting hook in this codebase is imported from its specific file, never the barrel.
- **Final CTA's background is a single static `next/image`** with no client JS at all (unlike the hero, which gates a video behind viewport/reduced-motion/error checks) — the brief's own note that this section needs no motion beyond a standard reveal meant it could stay a pure Server Component.
- **FAQ content is fully server-rendered HTML** even though `FAQAccordion` is a Client Component — Next.js still renders Client Components to HTML on the server, so all ten questions and answers are present and crawlable/searchable on first response, not hidden behind client-side interaction.

### Accessibility summary

- **Heading hierarchy verified programmatically**, not just by eye: exactly one `<h1>` (the hero) and no level skips across all twelve sections, end to end. Every FAQ question is a real `<h3>` for free — Radix's `Accordion.Header` renders as `Primitive.h3` by default, so no manual heading markup was needed inside `FAQAccordion`.
- **FAQ accordion is keyboard-operable** (Enter/Space toggle a focused trigger, confirmed via Playwright keyboard events, not just a mouse click) and enforces one-open-at-a-time (`type="single" collapsible`) so the page can't grow unpredictably long.
- **Contrast checked by sampling actual rendered pixels**, not assumed: Final CTA headline/body text against the real (image + scrim) background measured 10.5–12.7:1, and the lower-emphasis trust-row caption text (`text-white/70`) measured 9.36:1 — both comfortably clear of WCAG AA's 4.5:1 for normal text.
- **Touch targets measured on a real 390px viewport**: FAQ triggers (61–90px tall), the newsletter subscribe button (44px), and both Final CTA links (52px) all meet the 44px minimum.
- **Newsletter status messages use `aria-live="polite"`** (`role="status"`), consistent with the configurator's price region and the gallery's filtered-count announcement from Part 2 — screen reader users hear submission results they may not visually notice.

### SEO summary

- **`FAQPage` schema is emitted by `FAQSection` itself**, generated from the exact same `faqItems` array the visible accordion renders — real markup driving real schema, per `HOMEPAGE_STRATEGY.md` §9's explicit warning against structured data describing content that isn't visibly present.
- **Organization/WebSite schema, canonical URL, Open Graph, and Twitter Card metadata** were already in place at the root layout (`config/seo.ts`) before this milestone and are unchanged — the homepage inherits them without any route-level override needed.
- **FAQ answers restate figures that already appear elsewhere on the page** (wind/snow ratings, warranty term, installation time) verbatim rather than approximately, so the FAQ can't become a source of contradictory information for either users or search engines crawling the page.

### Future enhancement opportunities

- **FAQ**: once a dedicated `/support/faq` page exists, `FAQAccordion` and `faqItems` are already shaped to support a larger question set there, filtered/searchable — the homepage would keep its curated ten.
- **Newsletter**: `subscribeNewsletter`'s only remaining work is the ESP call itself (Klaviyo/Mailchimp/Resend audience API) in place of its current "validate and return success" stub — the form contract (`SubscribeNewsletterState`) doesn't need to change on either the homepage or footer instance.
- **Final CTA**: the brief allows "background image or subtle video" — a real installation video loop could replace `final-cta.jpg` later using the exact gating pattern `HeroMedia` already established (desktop-only, reduced-motion-off, error-falls-back-to-poster), rather than inventing a second mechanism.
- **`scroll-mt-header`**: now that the header's real height is a CSS variable, any future fixed-position element that needs to reserve space relative to it (a second announcement bar, a persistent cart drawer trigger) can read the same `--header-stack-height` custom property instead of guessing a new static offset.

### Verification (Part 4)

Playwright/Chromium against the production build, across desktop (1440px), mobile (390px), `reducedMotion: 'reduce'`, and keyboard interaction, plus a full-page (all twelve sections, both breakpoints) design-review pass under reduced motion specifically to avoid `whileInView` timing artifacts in a fast programmatic scroll: FAQ accordion open/close, single-open enforcement, and keyboard toggle all confirmed; `FAQPage` schema present; Final CTA's both links verified against their real hrefs (`/configurator`, `/contact/quote`); newsletter form exercised end-to-end with both an invalid and a valid email through the real server action, success message rendered; footer newsletter confirmed hidden on the homepage and still present on `/contact`. Final pass: zero page errors, zero horizontal overflow at 390px/1440px (including real anchor navigation to `#cta` and an actual `window.scrollBy` attempt), `tsc --noEmit` clean, `eslint` clean, `next build` clean (First Load JS 283KB, route fully static).
