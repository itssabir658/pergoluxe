# Pergoluxe — Homepage Implementation (Part 1)

Companion to [`HOMEPAGE_STRATEGY.md`](./HOMEPAGE_STRATEGY.md) (what the homepage must achieve and why) and [`BRAND_IDENTITY.md`](./BRAND_IDENTITY.md) (what it must look like). This documents what was actually built in the first homepage milestone — the Hero, Trust Bar, and Collections sections — and the engineering decisions behind them. Sections 4–13 of the strategy (Configurator Preview onward) are deliberately not built yet, per the milestone boundary.

## Table of Contents

1. [Component Structure](#1-component-structure)
2. [Architectural Decisions](#2-architectural-decisions)
3. [Performance](#3-performance)
4. [Accessibility](#4-accessibility)
5. [Future Extensibility](#5-future-extensibility)
6. [Verification](#6-verification)

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
