# Pergoluxe — Design System & Foundation

Companion to [`ARCHITECTURE.md`](./ARCHITECTURE.md). That document defines _where code lives_; this one defines _what was actually built_ in the foundation pass — every token, primitive, and tooling decision — and why. No pages, navigation, or homepage exist yet by design: everything here is the substrate every future feature composes on top of.

## Table of Contents

1. [Tooling Foundation](#1-tooling-foundation)
2. [Library Selection](#2-library-selection)
3. [Design Tokens](#3-design-tokens)
4. [Typography System](#4-typography-system)
5. [Layout Primitives](#5-layout-primitives)
6. [Foundational UI Components](#6-foundational-ui-components)
7. [Animation System](#7-animation-system)
8. [Global Styles](#8-global-styles)
9. [Accessibility](#9-accessibility)
10. [Performance](#10-performance)
11. [Deliberately Deferred](#11-deliberately-deferred)
12. [Extending the System](#12-extending-the-system)

---

## 1. Tooling Foundation

| Decision                                                                                | Why                                                                                                                                                                                                                                                                             | Tradeoff                                                                    | Scalability                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `strict: true` + `noUncheckedIndexedAccess` in `tsconfig.json`                          | Catches null/undefined access on array/object indexing at compile time — the #1 source of "works in dev, crashes in prod" bugs in a catalog app touching arrays constantly (variants, images, cart lines).                                                                      | More `?.`/narrowing boilerplate day one.                                    | Pays for itself the moment a second engineer touches Shopify response arrays that are sometimes empty.                                                                                                                           |
| ESLint flat config (`eslint.config.mjs`) over `.eslintrc`                               | `.eslintrc` is legacy as of ESLint 9; flat config is what `eslint-config-next` 15.3 and the ecosystem are moving to.                                                                                                                                                            | Slightly less community tooling documentation exists for flat config today. | Avoids a forced migration later; this project starts on the format that will still be current in two years.                                                                                                                      |
| `no-restricted-imports` banning 3+ level relative imports                               | Forces `@/*` aliases, which don't break when a file moves. A relative import breaks (or silently resolves to the wrong file) the moment either endpoint moves folders.                                                                                                          | None — the alias is never more verbose than the relative path.              | Directly protects the feature-first structure in ARCHITECTURE.md: folders can be reorganized without a mechanical grep-and-fix across the repo.                                                                                  |
| `@typescript-eslint/consistent-type-imports`                                            | Forces `import type` for type-only imports, which lets the bundler elide them entirely (they'd otherwise sometimes survive as dead runtime imports depending on `isolatedModules` behavior). Caught real cases in this pass (`animations/gsap/parallax.ts`, `scrollReveal.ts`). | One more rule to satisfy.                                                   | Directly reduces client bundle size project-wide, automatically, without anyone remembering to do it by hand.                                                                                                                    |
| Husky + lint-staged, staged-files-only                                                  | Runs ESLint + Prettier only on staged files pre-commit, not the whole repo — fast enough that engineers won't reach for `--no-verify`.                                                                                                                                          | Doesn't catch pre-existing lint debt elsewhere in the tree.                 | CI still runs the full `lint`/`typecheck` scripts across everything; the hook is a fast first line of defense, not the only one.                                                                                                 |
| `.editorconfig`                                                                         | Cross-IDE baseline (indent size, EOL, trailing whitespace) that Prettier doesn't cover for non-JS files and that applies before a formatter even runs.                                                                                                                          | Negligible.                                                                 | Matters more as the team grows past people who all use the same editor/plugins.                                                                                                                                                  |
| `components.json` (shadcn CLI config) present even though components were hand-authored | Every component in `components/ui/` was written by hand rather than via `npx shadcn add`, since this environment has no network access to the shadcn registry during this pass — but the file format, aliases, and `new-york` style conventions were followed exactly.          | None going forward.                                                         | The moment network access is available, `npx shadcn add <component>` for anything new (or to pull an upstream fix) drops into the existing structure with zero reconciliation — the config already matches what the CLI expects. |

---

## 2. Library Selection

Every library added earns its place by solving something this team would otherwise hand-build worse.

| Library                                                                                                                                             | Replaces hand-rolling                                                                                                                                                                                           | Why not skip it                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **class-variance-authority (CVA)**                                                                                                                  | A hand-written `variant`/`size` → class-string switch per component.                                                                                                                                            | Every sized/variant component (Button, Badge, Container, Section, Grid, Stack) uses the exact same variant-resolution shape. Without CVA that's copy-pasted branching logic 15+ times, drifting slightly each time.                                                                                                                                                                                      |
| **clsx + tailwind-merge (`cn`)**                                                                                                                    | String concatenation for conditional classes, plus a way to let a consumer's `className` override a component's own conflicting utility (e.g. a caller passing `p-8` into a component that already sets `p-4`). | Without `tailwind-merge` specifically, the _last_ class wins by DOM order, not intent — `cn("p-4", className)` would silently keep `p-4` if `className="p-8"` came first alphabetically in the generated stylesheet. This is a real, hard-to-spot bug class that `tailwind-merge` eliminates outright.                                                                                                   |
| **Radix UI primitives** (Dialog, Select, Checkbox, Radio, Tooltip, Popover, Accordion, Tabs, Avatar, Label, Separator, AspectRatio, VisuallyHidden) | Keyboard nav, focus trapping/return, ARIA wiring, and portal management for every overlay/form primitive.                                                                                                       | This is the single highest-leverage accessibility decision in the whole foundation — WAI-ARIA-correct focus management for a Dialog or Select is genuinely hard to get right (and easy to regress); Radix is maintained by people who specialize in exactly this.                                                                                                                                        |
| **Vaul** (Drawer)                                                                                                                                   | Drag-to-dismiss, snap points, and background scaling for the mobile cart/filter drawer this site will lean on heavily.                                                                                          | Reimplementing gesture-driven drawer physics on top of raw Radix Dialog + CSS transforms is a multi-week side-quest that would still end up worse than a library built for exactly this.                                                                                                                                                                                                                 |
| **Sonner** (toasts) — chosen over `@radix-ui/react-toast`                                                                                           | A toast _queue_ (stacking, auto-dismiss timers, swipe-to-dismiss, `toast.promise()` for async flows like "Adding to cart…").                                                                                    | Radix's Toast primitive is lower-level — it gives you the accessible announcement region but not the queue/stacking logic, which we'd have to build on top of it anyway. Sonner ships that layer already solved. `@radix-ui/react-toast` was in the original dependency list from the architecture pass and is removed here in favor of Sonner — carrying both would mean two toast systems for one job. |
| **next-themes**                                                                                                                                     | `localStorage` sync + FOUC-free theme class application on `<html>`, across SSR/hydration.                                                                                                                      | Hand-rolling this correctly (no flash of wrong theme on load) requires an inline blocking script before hydration — next-themes already does this and is the de facto standard shadcn itself assumes.                                                                                                                                                                                                    |
| **Embla Carousel**                                                                                                                                  | Touch/drag/snap carousel behavior (product galleries, testimonial rails, project galleries later).                                                                                                              | Lightweight (no dependencies), headless (we style it, it doesn't fight our design tokens), and specifically built to be wrapped rather than themed around — the right shape for a design system that owns its own visual language.                                                                                                                                                                       |
| **Lenis**                                                                                                                                           | Inertial smooth-scroll.                                                                                                                                                                                         | A premium-feeling scroll is one of the clearest visual signals separating a templated Shopify theme from a bespoke build — this is a deliberate brand-quality investment, not a nice-to-have.                                                                                                                                                                                                            |
| **GSAP + ScrollTrigger**                                                                                                                            | Timeline-based, scrubbed, and pinned scroll animation.                                                                                                                                                          | Framer Motion's `whileInView` covers simple reveals well but doesn't have GSAP's scrub/pin/timeline sequencing model — the two libraries are kept in their lanes (see [§7](#7-animation-system)) rather than one trying to do both jobs.                                                                                                                                                                 |
| **Framer Motion**                                                                                                                                   | Declarative React-bound animation (variants, `AnimatePresence`, layout animations).                                                                                                                             | Better fit than GSAP for React-state-driven UI (a modal mounting/unmounting, a list reordering) because it understands React's render lifecycle natively; GSAP does not.                                                                                                                                                                                                                                 |
| **Zod + React Hook Form + `@hookform/resolvers`**                                                                                                   | Manual form state + manual validation-error wiring.                                                                                                                                                             | Already in ARCHITECTURE.md's stack; reiterated here because every form component built later (contact, quote, configurator) shares one validation contract between client and Server Action, per ARCHITECTURE.md §5 Mutations.                                                                                                                                                                           |
| **`tw-animate-css`** (dev dependency, imported in `globals.css`)                                                                                    | Tailwind v4's replacement for the old `tailwindcss-animate` plugin (which targets v3's plugin API and doesn't work under v4's CSS-first config).                                                                | Every `data-[state=open]:animate-in`/`fade-in-0`/`zoom-in-95`/`accordion-down` utility used across Dialog, Select, Popover, Tooltip, and Accordion comes from this package. Without it those utility classes don't exist and the components silently render with no transition.                                                                                                                          |

---

## 3. Design Tokens

All tokens live in `src/styles/tokens.css`, described in detail in ARCHITECTURE.md §8. What follows is the reasoning that isn't obvious from reading the CSS.

**Color model — OKLCH, not HSL/hex.** OKLCH is perceptually uniform: two colors with the same lightness value _look_ equally light to the human eye, which HSL does not guarantee (HSL `50%` lightness on yellow reads far lighter than on blue). That property is what makes a palette "just work" in dark mode by re-mapping lightness values, instead of hand-tuning every color pair twice.

**Palette direction — warm bronze/graphite over pure neutral gray.** Pergolux/StruXure/Renson/Brustor all lean into architectural aluminum grays; the deliberate differentiation here is a warmer, more materials-led palette (bronze primary, warm stone neutrals) that reads closer to premium outdoor-living/architecture brands than a generic SaaS gray-and-blue system. This is a starting point pending real brand input, not a final decision — see [§11](#11-deliberately-deferred).

**Every color token ships with a `-foreground` pairing** (`primary`/`primary-foreground`, `destructive`/`destructive-foreground`, etc.) rather than components hardcoding `text-white` on colored backgrounds. This is what makes dark mode "already work": `bg-primary text-primary-foreground` recomputes correctly in both themes because the pairing — not an assumption about which theme is active — decides the contrast.

**`card` and `surface` intentionally resolve to the same value.** The architecture brief asked for both tokens; rather than inventing two independently-tuned grays that could drift apart, `--card: var(--surface)` makes `surface` the single elevated-panel value and `card` its semantic alias for shadcn component conventions. If a real visual reason emerges later to split them, it's a one-line change in `tokens.css`, not a rename across every component.

**`@theme inline`, not `@theme`.** Tailwind v4's `@theme inline` re-reads the CSS variable _reference_ at paint time rather than baking in a resolved value at build time. That's the mechanism that makes `.dark` class-toggling repaint every `bg-primary`/`text-foreground` utility instantly, with no rebuild and no FOUC — using plain `@theme` here would have frozen every color at its light-mode value.

**Custom `@utility` blocks for anything without a native Tailwind v4 namespace** (duration presets, the z-index scale, section spacing, container widths, the semantic type-scale classes). Tailwind v4 has first-class theme namespaces for color/font/radius/shadow/ease, but not for named durations or z-index — rather than guess at undocumented internal namespace behavior (which risks silently non-functional utilities), every token without a confirmed namespace was shipped as an explicit `@utility`, which is guaranteed to compile because it's just CSS.

**Motion tokens exist in two places on purpose** (`tokens.css` custom properties _and_ `src/constants/motion.ts`). This is the one deliberate, documented exception to "one token source" in ARCHITECTURE.md §9: GSAP and Framer Motion both need duration/easing values as JS numbers/arrays at animation-construction time, and reading a CSS custom property at runtime means a `getComputedStyle` call per animation (slower, and a DOM-readiness dependency that doesn't exist for a Tailwind class). The tradeoff is a value that must be changed in two files instead of one — acceptable because motion timing changes rarely and both files sit next to each other conceptually (both linked from this doc).

---

## 4. Typography System

Semantic classes (`text-display`, `text-h1`…`text-h4`, `text-body-lg`, `text-body`, `text-caption`, `text-label`, `text-button`, `text-code`) bundle font-family + size + line-height + letter-spacing + weight into one utility, rather than composing four to five separate Tailwind utilities every time a heading appears. The alternative — `className="text-3xl font-semibold leading-tight tracking-tight font-display"` repeated at every H2 call site — guarantees drift the first time someone forgets one piece.

**Font loading** is isolated to `src/config/fonts.ts` using `next/font/google` (Inter/sans, Fraunces/display, JetBrains Mono/code) — self-hosted at build time, zero runtime request to Google, zero external-stylesheet layout shift. These are **placeholder faces**, chosen for quality and safety, not final brand decisions — swapping them later touches exactly one file, never `tokens.css` or component code, because everything downstream consumes `--font-sans`/`--font-display`/`--font-mono`, never a font name directly.

**Measure (line-length) tokens** — `max-w-measure` (65ch) and `max-w-measure-lg` (75ch) — exist because unconstrained body text at desktop widths regularly exceeds 100 characters per line, which measurably hurts reading comprehension. Every long-form text block (FAQ answers, about copy, legal pages) should sit inside one of these, not a raw `max-w-[...]`.

---

## 5. Layout Primitives

`Container`, `Section`, `Grid`, `Stack`, `Cluster`, `Spacer`, `Divider`, `AspectRatio` in `src/components/layout/` are the load-bearing layer every feature composes with — no feature should hand-write `flex flex-col gap-4` or `mx-auto max-w-[1120px] px-4` when `<Stack gap="md">` / `<Container>` already encode that decision on-token.

Each is a thin CVA wrapper, not a heavy abstraction: `Container` and `Section` are polymorphic (`as` prop) so they render the correct semantic element (`<main>`, `<article>`, `<section>`) without a second "SemanticContainer" component; `Stack` vs. `Cluster` split vertical-fixed-direction from horizontal-wrapping specifically because they solve different real layout problems (a form's fields vs. a row of filter chips), not because more variants seemed thorough.

**What's _not_ here on purpose:** `Header`/`Footer`/`Nav`. ARCHITECTURE.md assigns those to `components/layout` too, but building them means designing navigation — explicitly out of scope for this pass. The folder is ready for them; they're Phase 2 of the roadmap, not this one.

---

## 6. Foundational UI Components

Every component in `src/components/ui/` follows one shape: a thin, typed wrapper around either a Radix primitive or a plain HTML element, styled entirely from tokens (no component hardcodes a color, spacing, or radius value that isn't a Tailwind utility backed by `tokens.css`).

Two decisions worth calling out specifically:

- **`DialogContent` requires a `title` prop** (with an explicit `hideTitle` escape hatch that still renders it via `VisuallyHidden`) rather than leaving accessible naming to consumer discipline. Radix's own docs recommend every Dialog have an accessible title, but nothing enforces it at the API level — making it a required prop turns a documentation suggestion into a type error if forgotten. `DrawerContent` follows the same pattern.
- **`empty-state.tsx` / `error-state.tsx` / `loading-state.tsx` are intentionally three separate components**, not one `<StatusState variant="empty|error|loading">`. They represent three semantically different situations a feature's data-fetch branch can be in (nothing to show vs. something broke vs. still fetching), and keeping them distinct means a feature's JSX reads as `{error ? <ErrorState/> : empty ? <EmptyState/> : <LoadingState/>}` — self-documenting — instead of a variant prop a reader has to cross-reference.

`components/ui/` is deliberately **not barrel-exported** (no `index.ts` re-exporting everything), unlike `components/layout` and each feature's root. This matches shadcn's own convention and keeps tree-shaking trivial — importing `@/components/ui/button` pulls in exactly Button's dependency graph, not all 24 components' worth of Radix packages.

---

## 7. Animation System

The split between Framer Motion and GSAP is a hard rule, not a style preference:

- **`src/animations/variants/`** — plain Framer Motion `Variants` objects (`fadeIn`, `slideIn`, `scaleIn`, `staggerContainer`, `scrollReveal`) for anything driven by React state or viewport entry (`whileInView`). This is the default for 90% of component-level motion.
- **`src/animations/gsap/`** — imperative helpers (`scrollReveal`, `parallax`, `textReveal`) for anything that needs GSAP's timeline/scrub/pin model, which Framer Motion has no equivalent for. `registerGsap()` is idempotent and guarded for SSR (`typeof window === "undefined"`), since ScrollTrigger touches `window` at construction time and must never run during a server render pass.
- **`src/animations/framer/useMotionVariants.ts`** removes the reduced-motion branch from every call site: wrap any variants object in `useMotionVariants(...)` and it becomes an instant, motion-free pass-through automatically when `prefers-reduced-motion` is set — no component hand-writes that conditional itself.

**Reduced motion has one documented, deliberate exception**: the `Spinner` component sets `data-keep-motion`, which globals.css's `prefers-reduced-motion` block explicitly excludes from the blanket freeze. WCAG 2.3.3 exempts motion "essential to the functionality" — a loading spinner is exactly that (small-scale, non-vestibular, and the only way to communicate "in progress" without it). Parallax (`animations/gsap/parallax.ts`) is the opposite case and is called out in its own doc-comment: it must be gated behind `useReducedMotion()` by the caller before invoking it, because scroll-scrubbed translation _is_ the kind of motion the setting exists to prevent.

**`textReveal.ts` is a documented placeholder**, not a permanent solution: GSAP's official word/char splitter (SplitText) is a paid Club GreenSock plugin outside this project's current (free, core `gsap`) dependency. The shipped version does word-level splitting only, sufficient for headline reveals; the doc-comment in that file explains exactly what to swap if/when the team licenses SplitText.

**Lenis + GSAP ScrollTrigger are synced explicitly** in `smooth-scroll-provider.tsx` (`lenis.on("scroll", ScrollTrigger.update)` plus driving Lenis's `raf` from `gsap.ticker`) — without this, ScrollTrigger reads the _unsmoothed_ native scroll position while the page visually renders Lenis's smoothed one, and every pinned/scrubbed element lags a frame behind what's on screen. Lenis is never instantiated at all when `prefers-reduced-motion` is set — see [§8](#8-global-styles) for why that's a full opt-out rather than a "gentler" smoothing.

---

## 8. Global Styles

- **`scroll-behavior: auto`, not `smooth`, on `<html>`** — deliberate, and called out with an inline comment at the exact line, because it's the one place a future contributor is most likely to "fix" what looks like an oversight. Lenis owns smooth scrolling; native CSS smooth-scroll fighting Lenis's `rAF`-driven position updates is a real, visible bug (scroll jitter) if both are active simultaneously.
- **`@custom-variant dark (&:is(.dark *))`** redefines Tailwind v4's `dark:` variant from its default `prefers-color-scheme` media query to a class selector, because theme switching is driven by `next-themes` (`attribute="class"`), not the OS setting — see [§11](#11-deliberately-deferred) for why `enableSystem` is currently `false`.
- **Scrollbar, selection, and focus-ring styling** all resolve to design tokens (`--color-border`, `--color-primary`, `--color-ring`) rather than hardcoded values, so a future token change (e.g. a brand color revision) propagates through browser chrome too, not just component surfaces.
- **`:focus-visible` over `:focus`** — keyboard/programmatic focus gets the visible ring; mouse clicks don't, matching how every modern browser already behaves natively and avoiding the "the whole page looks broken with rings everywhere" complaint that a blanket `:focus` rule produces.

---

## 9. Accessibility

Concretely, in what was built (not aspirational — verifiable in the code itself):

- Every interactive primitive is Radix-based, which means correct keyboard nav (roving tabindex, arrow keys, `Escape`, `Home`/`End` where applicable) and focus trapping/return ship for free on Dialog, Drawer, Select, Popover, Tooltip, Accordion, Tabs.
- `Divider` uses Radix Separator specifically for correct `role="separator"` + orientation semantics rather than a bare styled `<hr>`/`<div>`.
- `Pagination`'s current page uses `aria-current="page"`; `Breadcrumb`'s current page uses `role="link" aria-disabled="true" aria-current="page"` (the WAI-ARIA-recommended pattern for a non-navigable "you are here" crumb).
- `Spinner` carries `role="status"` + `aria-label`; `Skeleton` is `aria-hidden` (its presence shouldn't be announced — the loading state around it should be, once a feature wires that up).
- Every color pairing in `tokens.css` is a token pair (`x`/`x-foreground`) specifically so contrast can be verified and fixed centrally. **Honesty check**: the actual oklch values shipped here have not yet been run through an automated contrast checker (e.g. axe, Lighthouse) — that's flagged explicitly rather than claimed as "AA-verified," and is called out as a required step before this palette ships to production (ARCHITECTURE.md Phase 7, Accessibility audit).

---

## 10. Performance

- **`next/font`** self-hosts and subsets all three type families at build time — no external font request, no `<link>` to `fonts.googleapis.com`, no CLS from a late-swapping web font stylesheet.
- **`experimental.optimizePackageImports`** is set for `lucide-react` and `framer-motion` in `next.config.ts` — both ship large barrel files; this tells Next's bundler to only include the specific icons/exports actually imported per file, rather than the whole package graph.
- **`components/ui/` has no barrel export** (see [§6](#6-foundational-ui-components)) specifically so importing one component never drags in the Radix dependency of the other 23.
- **`experimental.inlineCss`** is enabled — inlines the critical CSS for above-the-fold content directly into the HTML response rather than a blocking external stylesheet request, improving first paint on the (currently CSS-only, soon real) homepage.
- **PPR (`experimental.ppr`) is intentionally not enabled yet** — it requires a Next.js canary release; this project is pinned to stable 15.3.0. The `next.config.ts` has a comment marking exactly where to re-enable it, tied to ARCHITECTURE.md's phased rollout (Phase 8).
- Verified in this pass: `npx next build` compiles cleanly with zero TypeScript errors and zero ESLint errors across every file in this foundation (see the commit's CI-equivalent local run — `tsc --noEmit`, `eslint`, and a full `next build` all pass).

---

## 11. Deliberately Deferred

Called out explicitly so nothing here reads as an oversight:

- **No dark mode toggle UI.** The token system, `ThemeProvider`, and `@custom-variant dark` wiring are fully functional end-to-end — flipping `enableSystem` to `true` and adding a toggle button would work today. It's deferred because no dark surface has had a real design/QA pass yet; shipping it live via OS-preference detection would put unreviewed UI in front of real users the first time someone's OS is in dark mode.
- **Brand palette and type family are placeholders**, chosen for technical quality (OKLCH correctness, self-hosted variable fonts) rather than final brand direction. Both are isolated to single files (`tokens.css`'s `:root`/`.dark` blocks; `config/fonts.ts`) specifically so a brand decision later doesn't ripple through component code.
- **No pages, navigation, or homepage** — explicit scope boundary for this pass, per the task brief. `components/layout/index.ts` and the route-group folders in `src/app/` are scaffolded and waiting.
- **No Shopify/Sanity data-fetching code** — out of scope for a design-system pass; `lib/shopify` and `lib/sanity` remain the scaffolded, empty folders from the architecture pass until that work is explicitly scoped.
- **PPR disabled** — requires a Next canary; see [§10](#10-performance).

---

## 12. Extending the System

- **New color/spacing/radius/shadow value** → add it to `src/styles/tokens.css` only. Never hardcode a raw color/px value in a component. If it needs a Tailwind utility and doesn't fit an existing namespace, add an `@utility` block next to the others already there.
- **New motion duration/easing** → update both `tokens.css` and `src/constants/motion.ts` together (see [§3](#3-design-tokens) for why both exist).
- **New generic, reusable primitive** (no business meaning) → `components/ui/`, unbarreled, styled only from tokens. If it wraps a Radix primitive that isn't installed yet, add the package and follow the existing files' shape (props destructured, `cn()` merge, no internal state beyond what Radix already manages).
- **New layout primitive** → `components/layout/`, added to that folder's `index.ts` barrel.
- **New animation** → a reusable Framer variant goes in `animations/variants/`; an imperative GSAP effect goes in `animations/gsap/`. Don't add a third animation library for a case one of these two already covers.
- **Anything with business/domain meaning** (a `ProductCard`, a cart line item, anything Shopify/Sanity-shaped) does **not** belong in this foundation — it belongs in the owning feature under `src/features/*`, per ARCHITECTURE.md §3.
