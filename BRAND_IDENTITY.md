# Pergoluxe — Brand Identity, Visual Language & Design System

Companion to [`ARCHITECTURE.md`](./ARCHITECTURE.md), [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md), [`NAVIGATION.md`](./NAVIGATION.md), and [`HOMEPAGE_STRATEGY.md`](./HOMEPAGE_STRATEGY.md). Those cover how the codebase is built and what the homepage must achieve; this document defines _what it should look and feel like_ — the visual identity every future design and engineering decision inherits. No React, Tailwind, or components appear here by design; this is the brief a design and engineering team implements from, not an implementation.

**A note on continuity**: `DESIGN_SYSTEM.md` already shipped a working token system (an OKLCH color palette, a semantic type scale, spacing/radius/shadow scales) as a _placeholder foundation_, explicitly flagged there as "pending final brand typography" and "a starting point... not a final decision." This document is that final decision. It refines rather than discards that earlier work — the color direction (warm, bronze-toned, architectural neutrals) carries forward because it was already the right instinct; the typography direction changes (see Part 5) because the brief's own reference list makes a clearer answer available than the placeholder serif choice. Every place this document changes an earlier decision, it says so explicitly, with the specific delta an engineering pass needs to reconcile.

## Table of Contents

1. [Brand Personality](#1-brand-personality)
2. [Competitive Positioning](#2-competitive-positioning)
3. [Design Directions](#3-design-directions)
4. [Colour System](#4-colour-system)
5. [Typography](#5-typography)
6. [Spacing & Layout](#6-spacing--layout)
7. [Component Language](#7-component-language)
8. [Motion Language](#8-motion-language)
9. [Photography & Video](#9-photography--video)
10. [Iconography & Illustration](#10-iconography--illustration)
11. [Premium Details](#11-premium-details)
12. [Accessibility](#12-accessibility)
13. [Final Design Bible](#13-final-design-bible)

---

## 1. Brand Personality

**Brand values**: craftsmanship, engineering integrity, quiet confidence, longevity, architectural harmony. These aren't a mood board — they're the five filters every subsequent decision in this document is run through. If a color, animation, or layout choice doesn't visibly serve at least one of these, it doesn't belong in the system.

**Brand attributes** — the brand is: premium, precise, warm-modern, trustworthy, understated, architecturally literate. The brand is _not_: flashy, playful, discount-driven, trend-chasing, cold-minimalist (there's a real difference between "restrained" and "sterile," and this brand sits firmly on the warm side of that line), or corporate-generic.

**Emotional positioning**: _the quiet confidence of good architecture._ Not the loud, gold-and-marble register of conventional "luxury" marketing — the quieter, more durable confidence of a Porsche 911 dashboard or a Vipp kitchen: nothing shouting for attention, everything precisely resolved. This distinction matters commercially, not just aesthetically — Persona A and D in `HOMEPAGE_STRATEGY.md` both explicitly distrust anything that reads as oversold, so restraint is a _trust mechanism_, not just a style preference.

**Tone of voice**: confident, precise, warm but never hyped. Short, declarative sentences. Speaks in specifics (materials, engineering, dimensions) rather than adjectives ("premium," "amazing," "revolutionary" are banned words in customer-facing copy — if a claim is true, state the fact that makes it true instead of the adjective). Never condescending, never urgent-for-urgency's-sake ("Limited time!" / "Only 2 left!" have no place here — see Part 1's "never" list). Speaks to the customer as someone capable of evaluating a serious purchase on its merits, not someone who needs to be sold to.

**Design principles**:

1. **Material honesty** — surfaces, shadows, and structure should look like what they are (a shadow reads as a soft, physically plausible light source; a border reads as a real edge), never like decoration applied on top of content.
2. **Hierarchy through space and scale, not color** — a page's most important element should be obvious from its size and the whitespace around it, not from being the one thing painted a loud color. Color is reserved for state and brand accent, not for shouting.
3. **Restraint over decoration** — every visual flourish must earn its place by improving comprehension or reducing friction (this principle is inherited directly from `NAVIGATION.md`'s interaction philosophy and extends it to the whole visual system).
4. **Consistency over novelty** — the same problem gets the same solution everywhere on the site; a design system with five different button treatments across five sections looks like five different teams worked on it, which is the opposite of "premium."
5. **Longevity over trend** — every decision in this document is checked against "will this look dated in five years," not "does this look current right now." This is the explicit brief instruction, and it disqualifies several currently-fashionable patterns discussed below.

**Luxury signals** (what actually reads as premium, in order of impact): generous negative space; hairline dividers instead of heavy borders; considered, restrained typography (one confident typeface system used consistently, not five fonts fighting for attention); slow, deliberate motion; real, high-quality photography (this alone does more work than any UI polish); a quiet, narrow color palette used with discipline; precision in alignment and spacing (misaligned elements are the single fastest way to look cheap, regardless of the palette); the _absence_ of clutter, urgency gimmicks, and unnecessary ornamentation.

**What the brand should never look like**: a generic Shopify theme (busy trust-badge rows, gradient buttons, countdown-timer urgency banners); stock-photography clichés (a family laughing at a salad on the deck); drop-shadow-on-everything mid-2010s "flat design 2.0"; saturated primary-color CTAs screaming for attention; cluttered layouts with no breathing room; exclamation-point copy; emoji in customer-facing UI; playful/rounded "consumer app" typography or pill-shaped buttons (this brand is architecture, not a lifestyle app); decorative 3D blob shapes or gradient-mesh backgrounds (a specific, dateable 2021-era SaaS trend this brief's "avoid trendy" instruction directly rules out).

---

## 2. Competitive Positioning

A directional read on the category's current visual landscape — not a literal audit of any single competitor's current site, since that changes over time, but the pattern premium pergola/outdoor-living brands have generally converged on, and where the open ground is.

**Pergolux** — generally the most consumer-facing, DTC-clean brand in the set; approachable, clear ecommerce UX, easy to shop. Where it tends to feel generic: the visual language often reads as "well-executed Shopify theme" rather than a distinct architectural point of view — competent, not differentiated. **Opportunity**: everything Pergolux does functionally right (clarity, ease of purchase) combined with an editorial, architecture-led visual language most DTC pergola brands don't attempt.

**Renson** — strong engineering credibility and European design pedigree; reads as a serious, professional manufacturer. Where it tends to feel dated: often corporate/catalog in presentation — more "B2B product line" than "consumer brand with a point of view," with imagery that can lean commercial/generic rather than aspirational. **Opportunity**: keep the engineering credibility, add the emotional/aspirational warmth it typically lacks.

**StruXure** — leans hardest into the "smart pergola" technology story, with genuinely strong product storytelling around motorization and control. Where it tends to feel busy: sites in this mold often stack many simultaneous callouts, badges, and feature call-outs on one screen, competing for attention rather than sequencing information (exactly the density problem `HOMEPAGE_STRATEGY.md`'s section-by-section pacing is designed to avoid). **Opportunity**: the same technology story, told with more restraint and better sequencing — prove one thing at a time.

**Brustor** — solid European craftsmanship positioning, but visually often the most dated of the set: denser grids, smaller-scale imagery, less cinematic hero treatment, weaker use of motion — patterns common to sites whose visual language hasn't been substantially revisited in some years. **Opportunity**: the credibility without the dated execution — the same substance at 2020s production values, not 2012s.

**Corradi** — generally the most design-forward of the named competitors, with real Italian design-house pedigree, and closest in spirit to what this brand should be. Even here, though, presentation typically stays closer to a conventional catalog/gallery format than a fully editorial, story-driven digital product. **Opportunity**: this is the bar to clear, not match — go further into interactive storytelling (a live configurator as a homepage-level feature, not a buried tool) and editorial pacing than even the most design-literate competitor currently attempts.

**What they collectively do well**: product photography quality, engineering/manufacturing credibility, category education. **Where the category is collectively dated**: dense information architecture, generic trust-badge treatment, timid or absent motion design, and — most importantly — most of these sites read as _digital brochures_ for a physical product rather than _digital products_ in their own right.

**How this identity differentiates**: (1) a warm, architectural material palette (bronze/graphite/stone) instead of the cooler blue-gray "tech" palette common to the smart-pergola positioning; (2) an interactive configurator treated as a first-class, homepage-level experience rather than a buried tool (per `HOMEPAGE_STRATEGY.md` §3's Configurator Preview section) — this is the single clearest way to feel like a "digital product," not a brochure; (3) editorial pacing and restraint borrowed from Apple/Porsche's product-page conventions, applied to a category that has never consistently attempted it; (4) one disciplined design system enforced across every page, rather than the visual drift that's common when a site accumulates sections built at different times by different hands.

---

## 3. Design Directions

### Direction A — Scandinavian Luxury

- **Mood**: light, airy, soft-contrast, whitewashed, hygge-adjacent warmth without clutter.
- **Inspiration**: Scandinavian architecture and furniture design (Muuto, Menu, &Tradition), Nordic summer houses, birch and whitewashed oak.
- **Target audience**: younger affluent homeowners, coastal/lake-house buyers, Persona A homeowners with a lighter, more casual aesthetic than a formal-modern buyer.
- **Materials**: light oak and ash, whitewashed or pale-anodized aluminum, linen and undyed natural textiles.
- **Interior influences**: Scandinavian minimalism, soft neutral palettes, abundant natural light.
- **Architectural references**: glass-walled Nordic summer pavilions, light-filled timber structures.
- **Emotional response**: calm, fresh, approachable luxury.
- **Advantages**: broad appeal; photographs beautifully in bright, high-key daylight; feels current and pleasant.
- **Disadvantages**: this is the direction with the _least_ longevity of the three — Scandinavian minimalism has been the dominant global design language for the better part of a decade, and "Scandi fatigue" is a real, discussed phenomenon in design criticism; it's also the _least differentiated_ choice, since a meaningful share of premium home/outdoor brands already occupy this exact visual territory; and its softness under-serves the "architecturally serious, engineered product" story a $30k+ structural purchase needs to tell.

### Direction B — Architectural Modern

- **Mood**: precise, monolithic, materials-led, warm-neutral with bronze and graphite metal accents.
- **Inspiration**: Porsche's product design language, Vipp's industrial-luxury object design, Boffi's kitchen/interior systems, mid-century and post-war modernist residential architecture (warmed considerably — this is not brutalism).
- **Target audience**: design-led homeowners and architecture-literate buyers specifically (Persona A and Persona C from `HOMEPAGE_STRATEGY.md`), and — critically — it's the direction that best serves Persona B and D's need for engineering credibility, since the visual language itself signals precision and substance.
- **Materials**: anodized bronze and graphite aluminum, warm stone and travertine, dark walnut accents.
- **Interior influences**: the same high-end architectural interior world Boffi and Vipp occupy — considered materiality, minimal ornament, generous space.
- **Architectural references**: modernist residential architecture, exposed structural honesty (a beam is shown as a beam, not disguised), the same design ethos that shaped the actual physical product category.
- **Emotional response**: confident, engineered, quietly authoritative, timeless.
- **Advantages**: the visual language directly reinforces the product truth — a pergola _is_ an engineered aluminum structure, so a material-honest, architecturally-literate design system tells the truth rather than applying an unrelated aesthetic on top; it best satisfies the brief's explicit "avoid trendy, prioritize longevity" instruction (modernist design principles have held for the better part of a century, unlike a specific decorating trend); it differentiates most clearly against the two most common competitor postures (generic-DTC and corporate-catalog); and it matches the brief's own reference brands (Apple, Porsche, Boffi, Vipp are all squarely Direction-B brands — none of them are Scandi-light or resort-lifestyle brands).
- **Disadvantages**: less immediately "cozy" on first impression than Direction A; execution is unforgiving — restraint has no margin for a sloppy detail the way a busier design can absorb one; and it demands genuinely excellent photography, since a spare design system has nowhere to hide a mediocre image.

### Direction C — Contemporary Outdoor Living

- **Mood**: resort/hospitality-inspired, lush, aspirational "resort at home."
- **Inspiration**: boutique hotel outdoor lounges, Soho House-adjacent hospitality design, high-end landscape design.
- **Target audience**: lifestyle- and entertaining-driven households.
- **Materials**: teak, dark bronze accents, integrated planting/greenery.
- **Interior influences**: hospitality design, the broader indoor-outdoor living movement.
- **Architectural references**: resort cabanas, poolside pavilions.
- **Emotional response**: aspirational, indulgent, social.
- **Advantages**: highly aspirational; strong for lifestyle-forward social/imagery marketing; differentiates via a lush, resort-like feeling few competitors lean into.
- **Disadvantages**: leans toward _lifestyle marketing_ rather than _engineered product authority_, which risks undercutting trust for the spec-driven personas (B and D) this category disproportionately needs to convince; reads closer to a hospitality or furniture brand than a structural-engineering-grade manufacturer; and is more dependent on styling, props, and planting in every shoot, which is both a higher, recurring production cost and less evergreen, since planting and styling trends date faster than architecture does.

### Recommendation: Direction B — Architectural Modern

Five reasons, none of them aesthetic preference alone:

1. **It tells the truth about the product.** A pergola is an engineered aluminum structure; a design system built from the same material and architectural vocabulary reinforces the value proposition instead of decorating over it with an unrelated mood.
2. **It best satisfies the brief's own longevity requirement.** Modernist design principles have proven durable for the better part of a century; Direction A risks near-term "Scandi fatigue," and Direction C is tied to hospitality/lifestyle styling trends that shift faster than architecture does.
3. **It differentiates most clearly against the named competitive set**, most of which sits in generic-DTC or corporate-catalog territory — genuinely architectural-editorial ground is open.
4. **It matches the brief's own reference brands precisely** — Apple, Porsche, Boffi, and Vipp are all Direction-B brands; none of the alternative directions reflect what those brands actually do.
5. **It preserves work already shipped.** `DESIGN_SYSTEM.md`'s existing token system (warm bronze/graphite palette, restrained radius and shadow scales) already leans this direction — choosing B is continuity with sound earlier engineering decisions, not a reversal of them, and avoids costly rework of the foundation.

---

## 4. Colour System

Every hex value below was chosen for a specific material association (anodized bronze, warm stone, graphite) and then checked for real contrast, not picked by eye. Ratios shown use the WCAG relative-luminance formula against the specific pairing named — "vs background" and "vs white text" are the two pairings that matter for how each color is actually used (as text-on-light or as a fill-with-white-text).

| Token                         | Hex                                                                                                                                                | HSL                  | Usage                                                                                                                                                                                                                                                         | Contrast                                                                                                                                                                                                                                     |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Background**                | `#FAF7F2`                                                                                                                                          | `hsl(38, 44%, 97%)`  | Page background — warm ivory, never stark white.                                                                                                                                                                                                              | vs. Foreground: **16.1:1** (AAA)                                                                                                                                                                                                             |
| **Foreground**                | `#211A14`                                                                                                                                          | `hsl(28, 25%, 10%)`  | Primary text — warm near-black, never pure `#000`.                                                                                                                                                                                                            | vs. Background: **16.1:1** (AAA)                                                                                                                                                                                                             |
| **Primary**                   | `#4A3324`                                                                                                                                          | `hsl(24, 35%, 22%)`  | Brand mark, primary buttons/CTAs, key accents — deep anodized bronze.                                                                                                                                                                                         | White text on Primary: **11.7:1** (AAA)                                                                                                                                                                                                      |
| **Secondary / Card**          | `#F1EBE2`                                                                                                                                          | `hsl(36, 35%, 92%)`  | Secondary button fill, card containers sitting on Background.                                                                                                                                                                                                 | Foreground text on Secondary: **13.5:1** (AAA, by construction — lighter than Background, same text color)                                                                                                                                   |
| **Surface / Muted**           | `#F5F1EA`                                                                                                                                          | `hsl(38, 36%, 94%)`  | Section-alternate backgrounds, muted/disabled fills. Intentionally the same value for both roles — one token to keep in sync, not two independently tuned near-identical grays.                                                                               | —                                                                                                                                                                                                                                            |
| **Elevated Surface**          | `#FFFDFA`                                                                                                                                          | `hsl(36°, — , 99%)`  | Modals, popovers, dropdowns — the "lifted" plane, brightest surface in the system. _(HSL saturation is mathematically unstable this close to white — the hex is the authoritative value.)_                                                                    | Foreground text: **16.8:1** (AAA)                                                                                                                                                                                                            |
| **Border**                    | `#E3DBCF`                                                                                                                                          | `hsl(36, 26%, 85%)`  | Structural 1px borders (inputs, cards).                                                                                                                                                                                                                       | Non-text (3:1 UI-component) requirement met against both Background and Surface.                                                                                                                                                             |
| **Divider**                   | Border at 60% opacity                                                                                                                              | —                    | Lighter hairline rules between content blocks, distinct from a structural border by weight, not by a second hue.                                                                                                                                              | —                                                                                                                                                                                                                                            |
| **Accent**                    | `#A8683D`                                                                                                                                          | `hsl(24, 47%, 45%)`  | Links, secondary CTA outlines, icon accents, focus rings — a brighter terracotta-bronze.                                                                                                                                                                      | vs. Background (as text): **4.2:1** — passes for large text/UI components (3:1), _below_ 4.5:1 for small body text. **Rule: never use Accent for small body copy on Background; it's for large text, icons, borders, and non-text UI only.** |
| **Success**                   | `#4B6B4F`                                                                                                                                          | `hsl(128, 18%, 36%)` | Confirmation states, in-stock indicators — muted sage, not a bright "app" green.                                                                                                                                                                              | White text on Success: **6.0:1**; text on Background: **5.6:1** (both AA)                                                                                                                                                                    |
| **Warning**                   | `#C79A46`                                                                                                                                          | `hsl(39, 54%, 53%)`  | Caution states — warm ochre, not neon yellow.                                                                                                                                                                                                                 | Foreground (dark) text on Warning: **6.7:1** (AA)                                                                                                                                                                                            |
| **Error / Destructive**       | `#B0402F`                                                                                                                                          | `hsl(8, 58%, 44%)`   | Errors, destructive actions — warm brick red, not a stock Bootstrap red.                                                                                                                                                                                      | White text on Error: **5.8:1**; text on Background: **5.4:1** (both AA)                                                                                                                                                                      |
| **Information**               | `#4A6B7C`                                                                                                                                          | `hsl(200, 25%, 39%)` | Informational messaging — muted blue-gray, kept in the same desaturated family as everything else rather than a jarring bright blue.                                                                                                                          | White text on Information: **5.7:1**; text on Background: **5.3:1** (both AA)                                                                                                                                                                |
| **Focus ring**                | Accent, `#A8683D`, full opacity                                                                                                                    | —                    | 2px ring, 2px offset, on every interactive element. Non-text UI contrast requirement (3:1) is comfortably met against both Background and Surface.                                                                                                            | —                                                                                                                                                                                                                                            |
| **Selection** (`::selection`) | Primary background / white text                                                                                                                    | —                    | Matches the brand mark color exactly — a deliberate, already-implemented detail (see `DESIGN_SYSTEM.md` §8) carried forward unchanged.                                                                                                                        | 11.7:1                                                                                                                                                                                                                                       |
| **Overlay / Scrim**           | Black at 60% opacity                                                                                                                               | —                    | Modal/drawer backdrops, hero video text-legibility scrim. Matches the already-implemented `--opacity-scrim` token exactly.                                                                                                                                    | —                                                                                                                                                                                                                                            |
| **Glass**                     | Elevated Surface at ~72% opacity + 16px backdrop blur                                                                                              | —                    | Scroll-solidified header, any panel sitting over imagery. Used sparingly — see Part 11.                                                                                                                                                                       | —                                                                                                                                                                                                                                            |
| **Hover**                     | Base color blended ~10% toward black (light fills) or toward white (dark fills); for text/icon-only controls, a `currentColor`-at-10%-opacity tint | —                    | A _rule_, not a stored swatch — already the exact mechanism implemented in the header's adaptive hover states (`NAVIGATION.md` §2).                                                                                                                           | —                                                                                                                                                                                                                                            |
| **Active / pressed**          | Same direction as Hover at ~15% blend, paired with a subtle scale-down (see Part 8)                                                                | —                    | —                                                                                                                                                                                                                                                             | —                                                                                                                                                                                                                                            |
| **Disabled**                  | 45–50% opacity over the control's normal state                                                                                                     | —                    | Matches the already-implemented `--opacity-disabled: 0.5` token. WCAG does not require AA contrast for disabled controls (an accepted, standard exception since they're non-interactive) — the requirement is _perceptible as inactive_, not _fully legible_. | —                                                                                                                                                                                                                                            |
| **Charts** (future analytics) | Primary, Accent, Success, Information, Warning, Muted-foreground — reused, not reinvented                                                          | —                    | A six-color categorical palette drawn entirely from tokens that already exist, so charts read as on-brand rather than a generic rainbow palette bolted on separately.                                                                                         | —                                                                                                                                                                                                                                            |

**Dark mode**: the principle, not a full re-derivation — every pairing above inverts lightness while holding hue and warmth constant (a light, warm near-black background; a light, warm near-white foreground; Primary becomes a _lighter_ gold-bronze, since a dark bronze on a dark background would fail contrast outright). This is exactly the structure already implemented in `tokens.css`'s `.dark` block, and no engineering change is required there — this document confirms the direction rather than revising it.

**Accessibility considerations specific to this palette**: every semantic color (Success/Warning/Error/Information) is always paired with an icon and a text label in actual UI, never conveyed by color alone — this is the real mitigation for color-blindness, not an assumption that the palette's hues are independently distinguishable to every visual condition. Accent's contrast ceiling (4.2:1 as text on Background) is a known, deliberate constraint, documented above with its usage rule rather than quietly ignored.

---

## 5. Typography

**The one deliberate change from `DESIGN_SYSTEM.md`**: that document shipped Fraunces (a warm, characterful serif) as a _placeholder_ display face, flagged explicitly as "the one most likely to be swapped." The brief's own reference list for this phase — Neue Haas Grotesk, Inter, Geist, Manrope, General Sans, Satoshi, SF Pro-alternatives — is entirely sans-serif, and that's the correct signal: Apple, Porsche, Boffi, and Vipp all run on confident grotesk sans systems, not editorial serifs. **Recommendation: replace the display serif with Geist Sans, used across the entire type system (display through body) with weight and size carrying hierarchy, rather than a second typeface family.**

**Why one family, not a display/body pairing**: Apple (SF Pro everywhere) and Porsche (a proprietary grotesk everywhere) both use a single family across every context. A single, confident typeface used with disciplined weight/size variation reads as more architecturally resolved than two typefaces negotiating for attention — and it's one less typographic decision to get wrong at every future touchpoint.

- **Geist Sans** (primary, display through body) — _why it fits_: a geometric-humanist grotesk with genuine architectural precision, close in spirit to Neue Haas Grotesk without the licensing cost, purpose-built for exactly this "clean, technology-forward premium" register. _Performance_: variable font (one file spans every weight instead of shipping five static files), self-hostable via `next/font`. _Licensing_: free for commercial use, no ongoing royalty — a material consideration for a brand that will need this typeface on every packaging touchpoint, not just the website, indefinitely. _Readability_: humanist proportions keep large display text warm rather than sterile. _Mobile performance_: small variable-font payload, renders crisply across densities.
- **Geist Mono** (code, technical specifications, data tables) — the matching monospace, same licensing and performance profile, used anywhere a spec sheet or dimension table needs tabular precision.
- **Inter** — the documented fallback if real-world testing shows Geist's specific letterforms don't perform as well as expected at small UI sizes; Inter remains the best-tested alternative for pure small-size legibility and is already integrated in the codebase.
- **Neue Haas Grotesk / General Sans** — the explicit _upgrade path_, not the starting recommendation: Neue Haas Grotesk is genuinely excellent and exactly the reference this brand aspires to, but its commercial license carries an ongoing cost not justified at this stage; General Sans is the free middle ground if a distinct display personality (separate from body text) is wanted later. Both are one-file swaps given the font-loading architecture already in `DESIGN_SYSTEM.md` §5, isolated to a single config file specifically so this decision can change without touching component code.

### Type Scale

| Role                           | Size (desktop)         | Weight                                                                         | Line height     | Letter spacing  | Max line width | Responsive behaviour                                                                                                                                       |
| ------------------------------ | ---------------------- | ------------------------------------------------------------------------------ | --------------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Display                        | 72px                   | Semibold (600)                                                                 | 1.05            | −0.02em         | 20ch           | Scales down to ~44px on mobile — never a fixed clamp that lets it overflow narrow viewports.                                                               |
| H1                             | 48px                   | Semibold (600)                                                                 | 1.1             | −0.02em         | 24ch           | ~32px on mobile.                                                                                                                                           |
| H2                             | 36px                   | Semibold (600)                                                                 | 1.15            | −0.01em         | 32ch           | ~28px on mobile.                                                                                                                                           |
| H3                             | 28px                   | Semibold (600)                                                                 | 1.25            | −0.01em         | 40ch           | ~22px on mobile.                                                                                                                                           |
| H4                             | 22px                   | Semibold (600)                                                                 | 1.3             | 0               | 40ch           | ~19px on mobile.                                                                                                                                           |
| Body Large                     | 18px                   | Regular (400)                                                                  | 1.6             | 0               | 75ch           | Unchanged across breakpoints — it's already sized for comfortable reading.                                                                                 |
| Body                           | 16px                   | Regular (400)                                                                  | 1.6             | 0               | 65ch           | Unchanged.                                                                                                                                                 |
| Caption                        | 14px                   | Regular (400)                                                                  | 1.5             | +0.01em         | 60ch           | Unchanged.                                                                                                                                                 |
| Label                          | 13px                   | Medium (500), uppercase                                                        | 1.4             | +0.02em         | —              | Unchanged — labels are short by design.                                                                                                                    |
| Button                         | 15px                   | Semibold (600)                                                                 | 1               | +0.01em         | —              | Unchanged.                                                                                                                                                 |
| Navigation                     | 15px                   | Medium (500)                                                                   | 1               | 0               | —              | Unchanged; collapses into the mobile drawer's larger touch-friendly rows (18–20px) per `NAVIGATION.md`.                                                    |
| Cards (title / body)           | 22px title / 16px body | Semibold title / Regular body                                                  | 1.3 / 1.6       | 0               | 40ch           | Title steps to ~19px on the smallest card breakpoints.                                                                                                     |
| Forms (label / input / helper) | 13px / 16px / 13px     | Medium / Regular / Regular                                                     | 1.4 / 1.5 / 1.5 | +0.02em / 0 / 0 | —              | Unchanged — form text should never shrink further than this; it's already near the floor for comfortable input.                                            |
| Quotes (testimonials)          | 24px                   | Regular (400), often paired with a lighter weight to distinguish from headings | 1.4             | 0               | 32ch           | ~20px on mobile.                                                                                                                                           |
| Tables                         | 14px                   | Regular body / Medium header row                                               | 1.5             | 0               | —              | Tables collapse to stacked cards below `md`, per `HOMEPAGE_STRATEGY.md` §8's Comparison-section guidance — never shrunk-and-scrollable at illegible sizes. |
| Code                           | 14px                   | Regular (Geist Mono)                                                           | 1.5             | 0               | —              | Unchanged.                                                                                                                                                 |

This table refines (doesn't replace) the semantic scale already implemented in `tokens.css` §3 — the numeric values above are the production targets; reconciling `--text-*` custom properties to match exactly (and swapping the font-family reference from Fraunces to Geist Sans) is the concrete engineering delta this document hands off.

---

## 6. Spacing & Layout

**Grid**: 12 columns at desktop (`lg` and above), 6 columns at tablet (`md`), 4 columns at mobile — collapsing column count rather than shrinking column width, so components keep readable proportions at every size instead of being squeezed.

**Containers**: reaffirms `DESIGN_SYSTEM.md`'s existing scale — `content` (1120px, the default reading/grid width), `narrow` (768px, long-form text), `wide` (1440px, full-bleed hero/gallery moments). No new container width is needed; this document's job is confirming those three are sufficient for every homepage section in `HOMEPAGE_STRATEGY.md` §3, which they are.

**Margins**: page-edge gutters scale with breakpoint — 16px at the smallest mobile width, 24px at tablet, 32px at desktop — matching the header's already-implemented `px-4 sm:px-6 lg:px-8` pattern, extended as the site-wide convention rather than a header-specific choice.

**Section spacing / vertical rhythm**: the existing three-step scale (`sm` 64px, `md` 96px, `lg` 128px) is confirmed as sufficient — most homepage sections in `HOMEPAGE_STRATEGY.md` use `lg`, since generous section spacing is itself a luxury signal (Part 1); only visually lighter sections (Trust Bar) should use `sm`.

**Whitespace philosophy**: whitespace is not empty — it's the mechanism that makes everything else in this document read as premium rather than merely correct. A page with the right colors and fonts but insufficient space around them will still look cheap; a page with generous space and a more modest palette will still read as considered. When in doubt between "add another element" and "add more space," this brand adds space.

**8-point spacing system**: reaffirms the existing 4px-base scale (which is itself 8pt-system-compatible, using 4px as the finer increment for the cases that genuinely need it — icon gaps, tight label spacing — while every section-level and component-level spacing decision should land on an 8px multiple). No change to the underlying token scale; this is confirmation of an existing correct decision, not a revision.

**Breakpoints**: reaffirms Tailwind's defaults, already adopted unmodified — `sm` 640 / `md` 768 / `lg` 1024 / `xl` 1280 / `2xl` 1536 — specifically so breakpoint values never drift between the CSS and any JS-side `useMediaQuery` logic, a decision already made and documented in `DESIGN_SYSTEM.md` §3.

---

## 7. Component Language

A visual-intent brief per component — padding/radius/border/shadow/motion values reference the scales already established in `DESIGN_SYSTEM.md`/`NAVIGATION.md`; this section is the _why_ and the _rules_, not new numbers invented from scratch, except where a component (Testimonials, Quotes, Tables) hasn't been speced yet.

- **Buttons**: rectangular with a soft, not sharp, corner (`radius-md`, 8px) — a pill shape reads as consumer-app-casual, a hard 0px corner reads as overly severe; 8px is the architectural middle ground. Generous horizontal padding signals confidence rather than urgency. No drop shadow on a default button — flat, material-honest fill. Hover deepens the fill by ~10% (no scale change — scaling on hover is a playful, "gamified" pattern wrong for this register). Focus is the standard 2px accent ring, 2px offset. Disabled drops to ~45% opacity with no pointer cursor. Motion is a 150ms color-only transition — nothing else moves.
- **Cards**: `radius-lg`–`xl` (12–16px), a hairline border (not a shadow) as the primary separation mechanism against the page background, with a soft `shadow-sm` reserved for cards that need to feel genuinely "lifted" (e.g., a card floating over imagery) rather than applied to every card by default. Hover, where a card is a link, is a subtle image-scale shift inside a fixed-size frame (never the card itself scaling or lifting — a "hovering card" effect is a dated skeuomorphic tell).
- **Inputs**: `radius-sm`–`md` (4–8px, tighter than buttons — inputs are utilitarian, not a brand moment), a visible 1px border at rest, border color shifts to Accent (not a shadow glow) on focus alongside the standard focus ring, disabled state matches the Disabled rule above.
- **Accordions**: no visible container border by default — a single hairline divider between items is enough; the expand/collapse chevron rotates 180° over `duration-base`; content height animates via a measured/auto transition (already implemented in `components/ui/accordion.tsx`), never a fixed max-height guess.
- **Tabs**: an underline or filled-pill indicator sliding between tab positions (not a hard, unanimated swap) — the sliding motion itself is what communicates "these are alternate views of one thing," a real usability signal, not decoration.
- **Tables** (new — not previously speced): hairline row dividers, no vertical column rules (vertical rules add visual noise without adding information — the column headers alone establish the grid), header row in Medium weight with slightly more letter-spacing to separate it from data rows without needing a background fill or heavier border.
- **Badges**: `radius-full` is the one place a pill shape is correct — badges are small, discrete status markers, not primary UI, so the softer shape doesn't fight the brand's architectural register the way a pill _button_ would.
- **Testimonials** (new): no card chrome at all by default — a large, quiet pull-quote treatment (see Quotes below) with a small author photo/name/location row beneath it reads more editorial and less "widget" than a bordered testimonial card.
- **Quotes** (new): set in Body Large or larger, often at a lighter weight than headings to visually distinguish "someone's words" from "the brand's voice" — a thin accent-colored rule to the left of the quote block (not oversized quotation-mark glyphs, which read as a dated blog-template convention) marks it as quoted material.
- **Forms**: generous vertical spacing between fields (never cramped — a cramped form reads as an afterthought on a site otherwise built with generous whitespace); inline validation messaging appears directly beneath its field in Caption size, in the Error/Success color paired with a small icon, never color alone.
- **Navigation / Mega Menu / Search / Modals / Drawers / Breadcrumbs / Pagination / Empty / Loading / Error states**: all already fully speced with their visual rationale in `NAVIGATION.md` and `DESIGN_SYSTEM.md` §6 — this document doesn't re-litigate those; it confirms they were built in the Direction-B register already (Radix-based accessible primitives, hairline borders over heavy shadows, restrained motion) and require no revision.

---

## 8. Motion Language

**Animation philosophy**: motion here communicates hierarchy and state — it never decorates. Every animation in this system should be answerable with "what does this tell the user that they couldn't tell instantly without it" — if the honest answer is "nothing, it just looks nice," it's cut. This is a direct extension of the interaction philosophy already established in `NAVIGATION.md` §2 and `HOMEPAGE_STRATEGY.md` §7, applied as a system-wide rule rather than a page-specific one.

**Duration scale** (reaffirms `DESIGN_SYSTEM.md`'s existing tokens, mapped explicitly to interaction type): micro-interactions (button/link hover, focus ring appearance) — 150ms (`fast`); content reveals (scroll-triggered fade-ins, accordion expand) — 250–400ms (`base`/`slow`); page-level or full-section transitions (modal open, mobile nav takeover) — 400–600ms (`slow`/`slower`). Nothing on this site should animate slower than ~600ms — beyond that, motion stops feeling premium and starts feeling like it's making the user wait.

**Easing**: the existing three-curve system is confirmed correct and sufficient — `standard` for most UI transitions, `emphasized` for content entering the viewport (a slightly more decisive curve for something asking for attention), `decelerate` for anything settling into its final position (modals, dropdowns). Explicitly excluded: bounce, elastic, or spring-overshoot easing on anything except drag-gesture-driven UI (a drawer being dragged can legitimately use a spring, per `DESIGN_SYSTEM.md`'s existing `springTransition` — a static element animating in with a bounce reads as playful/consumer-app, the wrong register here).

**Scroll behaviour**: content reveals once per element, on first entry into the viewport — never re-triggering on scroll-back, which reads as gimmicky rather than premium. Parallax, where used, is confined to imagery only (never text or interactive controls) and disabled entirely under reduced motion, consistent with the explicit exception already carved out in `NAVIGATION.md` for genuinely vestibular-triggering motion.

**Hover behaviour**: color/opacity transitions only for standard controls; the one exception is the deliberate, small image-scale shift on card/gallery hover (Part 7) — signalling interactivity and craft without the "everything jiggles" feeling of scale-on-hover applied indiscriminately.

**Loading animations**: shape-matched skeleton placeholders (already the documented preference in `DESIGN_SYSTEM.md` §6) wherever the eventual content's layout is known; the `Spinner` primitive only for genuinely indeterminate, short waits, and — per the existing, deliberate exception in `globals.css` — the one animation that keeps running under reduced motion, since a loading indicator is functionally essential, not decorative.

**Micro-interactions**: reserved for state changes that benefit from being noticed — a successful form submission, an item added to cart, a copied-to-clipboard confirmation. Each should be a single, quick (150–250ms) opacity/scale confirmation, never a multi-step animated sequence.

**Image transitions**: crossfade only between states (e.g., the Configurator Preview swapping a finish/color) — no slide or zoom transition between two different images, which reads as a slideshow rather than an instant, confident state change.

**Text reveals**: word- or line-level staggered reveals are reserved for hero headlines and major section headings only, used sparingly (once per page load, not on every scroll-triggered heading) — applying this to body copy or repeatedly through a long page would read as showing off rather than communicating.

**Card reveals**: fade-and-rise, staggered across a grid (the existing `staggerContainer` variant), triggered once on first viewport entry — this is the primary mechanism giving the page "rhythm" referenced in Part 1's luxury signals.

**Modal transitions**: fade plus a subtle scale from 95% to 100% (already implemented in `components/ui/dialog.tsx`) — confirmed correct, no change needed.

**Page transitions**: a simple cross-fade between routes, nothing more elaborate (no slide-wipe, no shared-element morph). A research-heavy buyer comparing information across pages needs the _next_ page's content as fast as possible — a showpiece page transition actively works against that goal, so restraint here is a usability decision as much as a taste one.

Every animation described above must collapse to an instant, static state under `prefers-reduced-motion`, using the existing `useMotionVariants` mechanism (`DESIGN_SYSTEM.md` §7) rather than a new, parallel reduced-motion implementation.

---

## 9. Photography & Video

**Photography style**: natural light, architectural composition — leading lines and negative space that respect the structure's own geometry rather than fighting it. Golden-hour and soft overcast light are preferred over harsh midday sun, which creates hard, distracting shadows that compete with the product's own clean lines rather than flattering them.

**Colour grading**: warm, slightly desaturated, filmic — never the oversaturated teal-and-orange Instagram grade that dates a photo to a specific era almost immediately. The grade should feel like it could have been shot last year or five years from now.

**Lens style**: moderate, slightly longer focal lengths (roughly 50–85mm equivalent) for architectural subjects, specifically avoiding wide-angle or fisheye distortion, which makes structures look cheaper and less true-to-scale than they are — a distortion-free, true-perspective image is itself a quiet credibility signal.

**Depth of field**: moderate — enough to separate a subject from its background, but structural lines and joinery should stay sharp. Excessive bokeh that blurs the actual product defeats the purpose of proof-of-quality photography (this is the same principle behind `HOMEPAGE_STRATEGY.md`'s Signature Benefits section existing at all — showing the engineering, not just implying it).

**Lifestyle imagery**: real people in genuine, candid moments — never posed "stock photography smiling at nothing." If a real customer photo isn't available for a given context, the honest choice is no photo (an icon or pattern instead, per `NAVIGATION.md`'s precedent for the mega menu's placeholder imagery), not a stock substitute that reads as generic the instant a design-literate visitor notices it.

**Product imagery**: macro/detail shots of joinery, motor housings, and louver mechanisms specifically — this is where "we sweat the details" gets _shown_, directly supporting the Signature Benefits section's engineering claims with visual evidence rather than adjectives.

**Installation photography**: paired wide establishing shots and macro detail shots per project, consistent with the Featured Projects section's need to serve both the aspirational (Persona A: "could this be my home") and the evidentiary (Persona B/D: "prove the engineering") reads simultaneously.

**Drone footage**: used sparingly, for genuinely large properties or resort-style projects where an aerial view adds real information about scale and site context — never used as a stylistic default on every project, which turns a legitimate technique into a gimmick.

**Background video**: short (6–10 second), seamlessly looping, real installation footage only — exactly per the hero strategy already defined in `HOMEPAGE_STRATEGY.md` §4, with the mandatory gradient scrim for text legibility restated here as a system-wide rule for _any_ text-over-video or text-over-image placement on the site, not just the hero.

**What to avoid, explicitly**: stock photography of unrelated generic lifestyle scenes; harsh on-camera flash; over-processed HDR; cluttered or over-styled scenes with excessive props; low-resolution or visibly amateur photography presented as hero-level content; and — a specific, important distinction — configurator renders must never be presented in a context where a visitor could mistake them for real installation photography. Renders are appropriate and expected _inside_ the configurator tool itself; anywhere else on the site (Projects, Testimonials, Hero), only real photography appears.

---

## 10. Iconography & Illustration

**Icon style**: thin-to-regular stroke line icons — Lucide, the library already implemented in `DESIGN_SYSTEM.md`, is confirmed as the correct, sufficient choice; no separate custom icon set is needed. **Stroke width**: Lucide's default ~1.5–1.75px at a 24px icon size is correct as-is. **Corner style**: Lucide's default slightly rounded caps/joins soften precision just enough without tipping into a playful register — also correct as shipped, no customization needed.

**Illustration direction**: minimal to none for customer-facing content. This brand should rely on real photography, not illustration, for anything selling the product or the brand story — illustration reads as "generic SaaS," the wrong register entirely for a physical, architectural product. Where a diagram is genuinely useful (spec sheets, sizing guides, installation clearance requirements), it should take a precise, blueprint-inspired technical line-diagram style: single-ink-color vector line art on an implied grid, with generous dimension callouts — reinforcing the engineering-credibility brand attribute rather than softening it with a friendlier illustration style.

**3D usage**: reserved specifically and exclusively for the configurator's functional product preview. Decorative 3D shapes, gradient blobs, or abstract geometric renders elsewhere on the site are explicitly excluded — this is one of the most dateable, trend-specific patterns from recent SaaS design, and the brief's "avoid trendy" instruction rules it out directly.

**Technical diagrams / specification graphics**: clean vector line drawings, one ink color, generous labeling, drawn in the convention of an actual architectural or engineering drawing rather than a marketing infographic — this is a deliberate credibility signal for Persona B (specs-driven) and Persona C (trade professionals) specifically.

---

## 11. Premium Details

**Glass effects**: used sparingly and only where it's functionally meaningful — the header's scroll-solidified state (already implemented) and any panel that needs to sit legibly over imagery. Never applied decoratively to static content that has no reason to show what's behind it.

**Shadows**: the existing warm-tinted, multi-layer soft shadow scale (`DESIGN_SYSTEM.md` §3) is confirmed correct — every shadow should read as "a real object lifted slightly off a surface, lit from above," never a harsh, high-contrast drop shadow, which is one of the fastest tells of a dated or low-budget interface.

**Elevation**: used purposefully to indicate interactive layering (the existing z-index scale: dropdown → sticky → overlay → drawer → modal → toast → tooltip), never piled onto static content decoratively — elevation should always mean something is temporarily on top of something else, not "this card looks nice with a shadow."

**Rounded corners**: the existing scale (4/8/12/16/24px) is confirmed correct, with the usage rule restated here explicitly: tighter radii (4–8px) for utilitarian controls (inputs, badges), larger radii (12–16px) for content containers (cards, media), reserving the largest step (24px) for hero-scale imagery moments. This keeps the system rectilinear-with-softened-corners throughout — avoiding both a brutalist zero-radius starkness and a consumer-app pill-shaped softness.

**Hairline borders**: 1px, low-contrast — the primary content-separation mechanism in this system, used in preference to a shadow wherever a shadow isn't specifically communicating elevation. This is one of the clearest visual markers distinguishing a restrained, architectural interface (Apple, Linear) from a heavier, shadow-everywhere convention common to less considered sites.

**Background textures / noise**: a very subtle grain texture (1–2% opacity) may be applied to large, flat color fields specifically to prevent visible gradient/color banding on large displays — the texture itself should never be consciously perceptible; if a visitor can see "there's a texture here," the opacity is too high.

**Gradients**: avoided almost entirely. The one legitimate use is a soft, single-hue-family scrim over hero video/imagery for text legibility (a functional necessity, not a decorative choice) — decorative multi-hue gradients (mesh gradients, "aurora" backgrounds) are excluded as a specific, recognizable, and already-dating design trend.

**Masking / image framing**: consistent aspect ratios per content type (already enforced via the `AspectRatio` primitive), images framed with either a hairline border or generous surrounding whitespace — never heavy card chrome (drop shadow + border + rounded corner + padding all stacked on one image) competing with the photography itself.

**Section dividers**: hairline rules or generous whitespace only — never a heavy graphic divider, angled section break, or decorative shape between sections, all of which read as templated rather than considered.

**Cursor behaviour**: the default system cursor everywhere, with the sole exception of a genuinely functional affordance (e.g., a grab/grabbing cursor on the Featured Projects draggable rail). Decorative custom cursor effects are explicitly excluded — a specific, recognizable "trendy portfolio site" pattern the brief's longevity instruction rules out.

**Scroll indicators**: the already-implemented thin top scroll-progress bar and the hero's subtle scroll-cue affordance (`NAVIGATION.md`/`HOMEPAGE_STRATEGY.md`) are sufficient — no additional decorative scroll indicator is needed anywhere else on the site.

---

## 12. Accessibility

**WCAG AA minimum**: every text/background pairing in Part 4's color system meets or exceeds AA (4.5:1 normal text, 3:1 large text/UI components), with the one documented, explicit exception (Accent as small body text) carrying its own usage restriction rather than being quietly out of compliance.

**Keyboard usability**: every interactive pattern described in this document — accordions, tabs, sliders, carousels, the configurator preview — must have a full keyboard-operable equivalent, consistent with the standard already set and met in `NAVIGATION.md`'s Radix-based components; no new custom interaction introduced by this visual language should regress that standard.

**Reduced motion**: every animation in Part 8 collapses to an instant/static equivalent under `prefers-reduced-motion`, through the single existing mechanism (`useMotionVariants`) rather than a parallel, easy-to-forget implementation — consistency of _mechanism_, not just intent, is what keeps this actually enforced as the system grows.

**Contrast**: Part 4's computed ratios are the enforcement mechanism — any new color introduced later must be checked against this same method before shipping, not approved by eye.

**Typography readability**: the measure limits already set (65ch body / 75ch body large) are confirmed correct and restated as a hard rule for any new long-form content (buying guides, blog-style resources) introduced later.

**Touch targets**: the existing 44×44px minimum (already enforced in the button/input sizing scale) applies to every new interactive element this document introduces — testimonial carousel controls, table row expanders, gallery navigation — with no exception.

**Colour blindness considerations**: no state (success/warning/error/information) is ever conveyed by color alone — each is always paired with an icon and a text label, which is the actual, robust mitigation (rather than attempting to choose hues that remain independently distinguishable across every type of color vision deficiency, which the deep bronze/terracotta/sage/brick-red family in this palette cannot fully guarantee on hue alone).

---

## 13. Final Design Bible

**Brand philosophy**: the quiet confidence of good architecture. Every decision serves craftsmanship, engineering integrity, quiet confidence, longevity, and architectural harmony — and is judged on whether it will still look right in five years, not whether it looks current today.

**Colour palette**: warm ivory background (`#FAF7F2`), warm near-black text (`#211A14`), deep anodized-bronze primary (`#4A3324`), brighter terracotta-bronze accent (`#A8683D`, large text/UI only), a narrow family of muted semantic colors (sage success, ochre warning, brick-red error, blue-gray information) — never a bright, generic, off-the-shelf hue anywhere in the system.

**Typography system**: one confident typeface family — Geist Sans — carrying every role from Display through Body via weight and size, not a competing display/body pairing; Geist Mono for code and specifications.

**Spacing rules**: an 8px-based rhythm, three-step section spacing (64/96/128px), three container widths (768/1120/1440px) — whitespace is treated as an active design element, not the absence of one.

**Component language**: soft-not-sharp, soft-not-pill corners (8–16px); hairline borders over shadows as the default separation mechanism; shadows reserved for genuine elevation; flat, confident buttons with no gradient or drop shadow.

**Motion principles**: motion communicates hierarchy and state, never decoration; 150–600ms duration ceiling; standard/emphasized/decelerate easing only, no bounce or elastic outside drag gestures; everything collapses under reduced motion.

**Photography direction**: real, warm, filmic, architecturally composed; never stock, never distorted wide-angle, never over-saturated; macro detail shots prove engineering, wide establishing shots prove aspiration.

**Accessibility principles**: AA minimum everywhere, checked by calculation not eye; state never conveyed by color alone; every custom interaction keyboard-operable; every animation reduced-motion-safe by construction.

### Do's

- Use whitespace generously — it is the system's primary luxury signal.
- State facts (materials, engineering, warranty terms) instead of adjectives.
- Use hairline borders as the default separation mechanism.
- Keep motion purposeful, brief, and reduced-motion-safe.
- Use real photography, even if that means using less imagery until more is available.
- Pair every status/state indicator with an icon and text label, not color alone.
- Check every new color against Part 4's contrast method before it ships.

### Don'ts

- Don't introduce a second display typeface, a second color palette, or a second motion system anywhere on the site.
- Don't use gradients, glassmorphism, or decorative 3D except in the narrow, functional exceptions named in Part 11.
- Don't use urgency gimmicks — countdown timers, "X people viewing this," fabricated scarcity.
- Don't use stock photography, wide-angle-distorted architecture shots, or over-saturated color grading.
- Don't scale, bounce, or elastic-ease anything that isn't a drag gesture.
- Don't rely on Accent as small body text on a light background — it doesn't clear AA there.
- Don't add a visual flourish that can't answer "what does this communicate to the user."

This document is the single source of truth for every visual decision made after it. Where a future decision seems to require deviating from it, the deviation should be written down here, with its reasoning — the same discipline this document itself was held to against `DESIGN_SYSTEM.md`.
