# Pergoluxe — Global Application Shell

Companion to [`ARCHITECTURE.md`](./ARCHITECTURE.md) and [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md). Those cover the project's folder structure and design-token foundation; this documents the global shell built on top of them — root layout, header, mega menu, search, mobile navigation, footer, and the floating utilities every future page inherits.

No homepage sections, product pages, or lorem ipsum were built. Every string in the nav/footer/mega-menu is real site IA (categories this business actually sells) or is explicitly marked as a placeholder pending a real asset (brand mark, product photography, favicon).

## Table of Contents

1. [What Was Built](#1-what-was-built)
2. [Architecture Decisions](#2-architecture-decisions)
3. [Performance](#3-performance)
4. [Accessibility](#4-accessibility)
5. [Future Scalability](#5-future-scalability)
6. [Tradeoffs](#6-tradeoffs)
7. [Verification](#7-verification)

---

## 1. What Was Built

```
src/app/
├── layout.tsx        # root layout: metadata, fonts, providers, JSON-LD, shell composition
├── loading.tsx        # root Suspense fallback
├── error.tsx           # root error boundary (per-segment errors inherit this)
├── global-error.tsx     # catches errors above the root layout itself
└── not-found.tsx         # 404

src/components/layout/
├── header/
│   ├── Header.tsx             # composition root (Server Component)
│   ├── HeaderShell.tsx         # scroll listener, transparent/solid/blur/shrink state
│   ├── HeaderThemeContext.tsx   # lets Logo/nav pick light-over-hero text color
│   ├── Logo.tsx
│   ├── PrimaryNav.tsx           # desktop nav, built on Radix NavigationMenu
│   ├── MegaMenu.tsx             # Products dropdown content
│   ├── HeaderActions.tsx        # search / account / quote CTA / cart
│   └── CartTrigger.tsx          # cart icon + drawer (placeholder, see §6)
├── mobile-nav/
│   ├── MobileNavTrigger.tsx      # hamburger button + owns drawer open state
│   ├── MobileNavDrawer.tsx        # full-screen overlay (raw Radix Dialog)
│   ├── MobileNavAccordion.tsx      # nested nav, mirrors the mega menu's categories
│   └── MobileNavQuickActions.tsx    # bottom-anchored Call / Quote / Search / Account / Cart
├── footer/
│   ├── Footer.tsx
│   └── FooterNewsletter.tsx        # RHF-free form bound to a real Server Action
├── AnnouncementBar.tsx
├── CookieConsent.tsx
├── ScrollProgress.tsx
└── BackToTop.tsx

src/features/search/               # search is a feature, not chrome — see §2
├── components/{SearchTrigger,SearchModal}.tsx
├── hooks/{useRecentSearches,useSearchShortcut}.ts
└── constants.ts

src/providers/
├── header-mode-provider.tsx    # lets a page force a solid header (no hero)
├── smooth-scroll-provider.tsx  # extended this pass: exposes useLenis() for BackToTop
└── app-providers.tsx            # composition root, now includes HeaderModeProvider

src/config/{site,nav,seo,announcements}.ts
src/actions/subscribeNewsletter.ts
src/components/ui/navigation-menu.tsx   # new shadcn-pattern primitive (Radix NavigationMenu)
```

---

## 2. Architecture Decisions

**The announcement bar renders inside the header's fixed stack, not as a separate sibling.** This was a real bug caught only by actually rendering the page and scrolling it (see [§7](#7-verification)): a `position: fixed; top: 0` header and a normal-flow announcement bar both claim the viewport's top edge, so the header overlapped the bar instead of stacking below it. The fix folds both into one `fixed` wrapper (`HeaderShell`) and measures its real rendered height with `ResizeObserver` rather than a hardcoded pixel value — so the reserved spacer on no-hero pages stays correct through a dismiss, a two-line wrapped announcement, or a future copy change, with no manual re-tuning. `Header` accepts an `announcementBar` prop specifically so this composition is explicit rather than implied by render order.

**Transparent-over-hero is a per-page decision, not a global one, via `HeaderModeProvider`.** The root layout renders `Header` once, above `{children}`. A page nested deep inside `{children}` can't hand a prop to a sibling higher in the tree — so a page with no hero calls `useSetHeaderMode("solid")` (a client-side context write) instead, and `HeaderShell` reads it to override its default. `transparentUntilScroll` stays as a static prop for the (rare) case a route's hero-ness is known ahead of render. Both paths converge on the same `allowTransparent` value inside `HeaderShell`.

**Adaptive text color is context-scoped, not a global CSS class, and `Logo` opts in explicitly.** `HeaderThemeContext` broadcasts `{ transparent: boolean }` to everything rendered inside `HeaderShell`. Most consumers (nav links, action icons) simply don't set their own text color and inherit it from a single conditional class on the header's content wrapper — cheap, no extra reads. `Logo` is the one exception: because React Context follows the _component_ tree, not the DOM tree, a `Logo` instance rendered inside `MobileNavDrawer` (itself rendered via a Radix Portal, which keeps the React parent chain intact even though its DOM output lives elsewhere) would otherwise inherit "transparent" styling it should never have — the drawer always has a solid background. `Logo` takes an explicit `adaptive` prop (default `false`) so only the header's own instance reads the ambient theme; the drawer's instance is unaffected by construction, not by convention.

**Hover states use `hover:bg-[currentColor]/10` instead of `hover:bg-muted` on every adaptive header icon.** A fixed `bg-muted` hover looks fine on the solid header but is illegible white-on-near-white once the header is transparent with white text over a hero. Tinting the hover background off `currentColor` makes it correct in both states (and in dark mode later) without each icon button branching on the header's transparency itself.

**The `Drawer` UI primitive is now positioned off `data-vaul-drawer-direction`, not a `sm:` breakpoint hack.** The original version tried to fake "bottom sheet on mobile, right sheet on desktop" with CSS media queries on a single vaul instance — but vaul's drag/gesture physics only match _one_ edge per instance (set via the `direction` prop). A responsive CSS override would have looked right until someone actually tried to drag the sheet, where it would fight vaul's own transform. The fix (caught in code review before it shipped, not after) has every call site pick one `direction` and the primitive styles correctly for whichever one is active via vaul's own `data-vaul-drawer-direction` attribute.

**Search lives in `src/features/search/`, not `components/layout/`,** per ARCHITECTURE.md §3: it's a business feature with its own data concerns (recent searches, popular terms, eventually Algolia/Shopify predictive search), not generic chrome. The header only imports `<SearchTrigger>` — it has no idea what's inside the modal.

**Mobile navigation is its own component built directly on Radix Dialog, not a squeezed-down version of the desktop mega menu.** A full-screen takeover needs different positioning and animation (`inset-0`, slide-from-edge) than the shared `Dialog`/`DialogContent` wrapper (a centered, size-constrained panel), but still needs everything Radix Dialog already solves — focus trap, `Escape`-to-close, body scroll lock, correct `role="dialog"` semantics. Building it on the primitive directly, rather than forcing the boxed wrapper to do something it wasn't shaped for, keeps both components honest about what they're for.

**The desktop nav and mega menu are built on `@radix-ui/react-navigation-menu`** (a new dependency added this pass), not a hand-rolled hover/focus disclosure. It's the one Radix primitive purpose-built for exactly this pattern — top-level keyboard navigation between triggers, hover-intent timing, and viewport-relative positioning — and hand-rolling it would reproduce, worse, exactly what it already solves.

**A three-column CSS grid (`grid-cols-[1fr_auto_1fr]`), not a two-group flex layout, centers the desktop nav.** The brief asked for a _balanced_ header — logo left, nav center, actions right — and a flex `justify-between` with nav grouped next to the logo reads as "nav slightly left of center" whenever the logo and actions columns differ in width (they do: the Quote CTA is wide). The grid guarantees the center column is mathematically centered in the header regardless of what's in the side columns.

---

## 3. Performance

- `HeaderShell`'s scroll listener is `passive: true` and gated behind a `requestAnimationFrame` flag, so it never runs more than once per paint regardless of how many `scroll` events fire — the literal mechanism behind "never feels jumpy."
- The shrink/solidify transition animates `background-color`, `backdrop-filter`, `border-color`, and `padding` — not `height`. Because the header is `position: fixed` (removed from document flow), transitioning its own padding never triggers a reflow of the rest of the page; the cost is isolated to one small, fixed-size box.
- `ScrollProgress` animates `scaleX` (a GPU transform) on a full-width bar, never `width` — the latter would force layout on every scroll tick. Framer's `useSpring` smooths the raw scroll fraction so it doesn't visibly step on fast/trackpad scrolling.
- `Header`, `Footer`, `MegaMenu`, `Logo`'s non-adaptive default, and `AppProviders`' composition are all Server Components. The only Client Component boundaries are the ones that genuinely need the browser: `HeaderShell` (scroll position), `PrimaryNav`/`HeaderActions`/`MobileNavTrigger` (open state, hover), `SearchTrigger`/`SearchModal` (keyboard shortcut, local state), `AnnouncementBar`/`CookieConsent` (localStorage), `ScrollProgress`/`BackToTop` (scroll position). `Logo` had to become a Client Component this pass specifically because it reads `HeaderThemeContext` — calling any hook, even conditionally-used, requires the component itself to cross the client boundary; there's no partial-hook exception for Server Components.
- `components/ui/navigation-menu.tsx` follows the same no-barrel convention as the rest of `components/ui`: importing it doesn't drag in Dialog, Select, or any other Radix package's client bundle.
- The mega menu's images are static, inline SVG-icon placeholders (`AspectRatio` + a Lucide icon), not `<img>` tags pointing at nonexistent files — zero broken-image requests, zero CLS once real photography replaces them (the `AspectRatio` wrapper already reserves the box).

---

## 4. Accessibility

- **Keyboard**: the desktop mega menu, search modal, cart drawer, and mobile nav drawer are all built on Radix primitives, which ship correct roving/arrow-key navigation, `Escape`-to-close, and focus trapping without any custom keydown handling in this codebase. `Cmd/Ctrl+K` opens search from anywhere (the convention Stripe/Linear/Vercel already trained users on).
- **Focus management**: every Dialog/Drawer instance either supplies a real accessible title or an explicit `VisuallyHidden` one (`DialogContent`/`DrawerContent`'s `title` prop is required, not optional-by-convention — see `DESIGN_SYSTEM.md` §6 for why that's enforced at the type level). `MobileNavDrawer` includes a `Description` for the same reason Radix's own accessibility warnings ask for one.
- **Skip link**: the root layout renders a "Skip to content" link, visually hidden until focused, landing on `<main id="main-content">` — the header's mega menu and nav items would otherwise be a mandatory tab-stop gauntlet before a keyboard user reaches page content.
- **Reduced motion carve-outs stay honest to the WCAG exemption, not blanket-applied**: `BackToTop`/`AnnouncementBar`/`CookieConsent` route their enter/exit animations through `useMotionVariants`, which collapses to an instant, transition-free state under `prefers-reduced-motion`. `HeaderShell`'s own background/blur/shrink transition and the mega menu's dropdown animation are **not** gated behind reduced motion, because they're not the kind of motion the setting targets (no parallax, no large-scale scroll-linked movement) — gating every transition indiscriminately would make reduced-motion users' UI feel broken/unstyled rather than calmer.
- **Semantic structure**: `<header>`, `<footer>`, `<nav aria-label="…">` per footer column and the legal link list, `<main>` — landmarks a screen reader user can jump between, not a div soup with visual-only structure.
- **Color-independent state**: the mobile accordion's expand state is conveyed by a rotating chevron _and_ `aria-expanded` on the trigger (Radix default), not color alone.

---

## 5. Future Scalability

- **CMS-ready by construction, not by promise**: `AnnouncementBar` takes an `announcements: Announcement[]` prop; `src/config/announcements.ts` is a static array today with a doc comment naming exactly which future Sanity singleton/GROQ query replaces it. The component itself never changes when that swap happens.
- **`HeaderModeProvider` is the seam for every future hero-based page**: a homepage, a PDP with a full-bleed gallery, and a campaign landing page can all opt into `transparentUntilScroll` behavior with one hook call, with zero changes to `Header`/`HeaderShell` itself.
- **`CartTrigger` and the Account link are pre-wired placeholders, not stubs to rewrite**: `CartTrigger`'s `itemCount` prop and drawer chrome are exactly what `features/cart`'s future `useCart()` hook will feed; the empty state is temporary, the trigger/drawer/positioning are not.
- **The mega menu's category grid, buying guides, and support links all read from `src/config/nav.ts`'s typed shape** — adding a fifth product category or a new buying guide is a data change, not a component change.
- **Search's `searchLocalIndex()` function is a named, isolated seam** (`features/search/components/SearchModal.tsx`) specifically so swapping in Algolia or Shopify's predictive search API is a body-of-one-function change, not a component rewrite.

---

## 6. Tradeoffs

- **`CartTrigger` opens to an honest empty state, not fabricated line items.** `features/cart` doesn't exist yet (ARCHITECTURE.md Phase 3). Showing a plausible-looking fake cart would violate "no placeholder content standing in for a feature that isn't built" more than an empty state does — and the empty state is a real, permanent UI state carts need anyway, not a placeholder that gets deleted later.
- **Mega-menu and footer imagery are flat icon placeholders, not photos.** There is no product photography or Cloudinary asset pipeline wired up yet. A gray box with a `LayoutGrid` icon is honestly "no image yet"; a stock photo pretending to be a real installation would be a worse kind of placeholder than no image at all.
- **The footer newsletter form uses plain `useActionState`, not React Hook Form**, even though RHF is the documented default for forms (ARCHITECTURE.md §5). A single required `email` field doesn't need RHF's field-array/multi-field machinery; native `type="email" required` plus a real Zod-validated Server Action is the complete, correct solution at this scale. RHF remains the right call for the multi-field contact/configurator forms this shell deliberately didn't build.
- **The newsletter Server Action validates and returns success without calling Resend.** There's no audience provisioned yet. The alternative — leaving the form unwired entirely — would mean shipping a "production ready" shell with a fake-looking dead button; validating for real and clearly TODO-marking only the actual email-send call is the more honest middle ground.
- **Pinterest and Houzz use a generic `Globe` icon in the footer's social row** — lucide-react ships `Instagram` and `Linkedin` but no brand glyphs for those two. `aria-label` still names the platform correctly; only the visual mark is a placeholder, pending a proper brand icon set.
- **The announcement bar, once part of the fixed stack, no longer scrolls away with the page** — it stays pinned until manually dismissed. This is a deliberate reading of "dismissible" (closes on explicit user action only), not an accidental side effect of the overlap fix; the alternative (auto-hiding it once scrolled) wasn't asked for and would add scroll-coupled behavior the brief didn't request.

---

## 7. Verification

Beyond `tsc --noEmit`, `eslint`, and `next build` (all clean — see `DESIGN_SYSTEM.md`'s precedent for why these three are the non-negotiable bar), this shell was actually rendered and interacted with in a real browser before being called done, because the one real bug in this pass (the announcement bar/header overlap) was invisible to every static check and only showed up on screen:

- Desktop (1440×900) and mobile (390×844) viewports, screenshotted at rest, mid-scroll, and with the mega menu, search modal, cart drawer, and mobile nav (including its expanded accordion) all open.
- Keyboard-only pass: `Tab` through header controls, `Escape` closes the search modal.
- Console/page-error capture under `prefers-reduced-motion: reduce` — zero React/hydration errors; the one 404 logged is `icons/favicon.ico`, expected since no real favicon asset exists yet (tracked the same way as the mega-menu image placeholders above).
