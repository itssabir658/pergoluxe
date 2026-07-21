# Pergoluxe — Homepage UX Strategy & Conversion Blueprint

Companion to [`ARCHITECTURE.md`](./ARCHITECTURE.md), [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md), and [`NAVIGATION.md`](./NAVIGATION.md). Those cover how the codebase is built; this covers what the homepage should say, in what order, and why — before a single component is written. No React, HTML, or Tailwind appears in this document by design.

This is a high-ticket, high-consideration purchase (a $15k–$60k+ architectural structure), not an impulse buy. Every recommendation below optimizes for that reality: this homepage's job is not to "sell in one page," it's to move a skeptical, research-heavy buyer from _unaware or uncertain_ to _confident enough to take the next real step_ — configure, request a consultation, or (for a smaller share of visitors) buy outright.

## Table of Contents

1. [Customer Personas](#1-customer-personas)
2. [The Buying Journey](#2-the-buying-journey)
3. [Homepage Information Hierarchy](#3-homepage-information-hierarchy)
4. [Hero Section Strategy](#4-hero-section-strategy)
5. [Homepage Structure — Summary Flow](#5-homepage-structure--summary-flow)
6. [Trust-Building Strategy](#6-trust-building-strategy)
7. [Premium Interaction Recommendations](#7-premium-interaction-recommendations)
8. [Mobile-First Strategy](#8-mobile-first-strategy)
9. [SEO Strategy](#9-seo-strategy)
10. [Performance Strategy](#10-performance-strategy)
11. [Accessibility Strategy](#11-accessibility-strategy)
12. [Wireframe & Competitive Rationale](#12-wireframe--competitive-rationale)

---

## 1. Customer Personas

### Persona A — The Design-Led Homeowner (primary persona)

- **Goals**: an architecturally cohesive outdoor room that matches their home's aesthetic; a space that photographs well and impresses guests; a meaningful, visible increase in how the property looks and feels.
- **Pain points**: fear of ending up with something that reads as a "big-box kit"; overwhelmed by decisions (size, finish, roof type); cannot visualize the finished result from a spec sheet; anxious about contractor reliability and timeline.
- **Buying behavior**: heavy research across Pinterest, Instagram, and Houzz before ever visiting a brand site; compares 3–5 companies; explicitly discounts renders and stock photography — wants real installation photos; decision cycle of 1–6 months; usually a joint household decision.
- **Objections**: "Will this look mass-produced?" · "Is this actually customizable or just a kit in different colors?" · "Will it suit my home's architecture?" · "Why does this cost more than the one at the hardware store?"
- **Questions before buying**: What finishes/materials are available? Do you have examples that look like my house? What does the design process actually involve? How long from order to installed?
- **Needs first**: visual proof (real projects), evidence of design flexibility, and a brand point of view that reads as premium, not generic.

### Persona B — The Practical Outdoor-Living Upgrader

- **Goals**: a backyard that's usable in more weather (shade in summer, dry in rain), protection for existing furniture/patio, a defensible return on a large spend.
- **Pain points**: skeptical of "weatherproof" marketing claims; worried about maintenance and long-term durability; needs to justify the cost to a partner or to themselves with function, not just looks.
- **Buying behavior**: compares hard specs across brands (wind rating, motor brand/reliability, warranty length) and against unbranded local fabricators; more price-sensitive within the premium tier than Persona A; requests a quote earlier in the journey to get a real number.
- **Objections**: "Is this worth it over a standard patio cover?" · "What does it actually cost, installed?" · "How does it perform in real storms/snow/heat?" · ongoing maintenance concerns.
- **Questions before buying**: Wind/snow load rating? How does the louvered roof behave in rain? Warranty terms? Typical all-in cost? Installation timeline?
- **Needs first**: functional benefits stated plainly, engineering specifics, warranty terms, and a transparent starting price or price range — hiding the number entirely reads as evasive to this persona specifically.

### Persona C — The Trade Professional (architect, landscape designer, builder)

- **Goals**: a reliable, premium-grade product they can specify on client projects without risking their own reputation; fast access to technical documentation.
- **Pain points**: most pergola sites have no real spec sheets, CAD files, or load data; unclear whether a trade/dealer program even exists; unreliable lead times that blow up a project schedule.
- **Buying behavior**: looks for a dedicated trade/professional resource path rather than the general consumer flow; downloads documentation before ever calling sales.
- **Objections**: "Is there trade pricing or a volume program?" · "Do you provide CAD/spec sheets?" · "What's your real lead time on a job site?"
- **Questions before buying**: technical specs, certifications, install-support process, trade account setup, lead times.
- **Needs first**: the homepage doesn't need to serve this persona's full journey — it needs to signal engineering credibility fast (certifications, specificity, not vague marketing) and route them cleanly to a dedicated trade/resources path rather than trying to convert them directly on the homepage.

### Persona D — The Comparison Shopper (competitor-aware)

- **Goals**: confirm they're choosing the best combination of quality, trust, and value among brands they already know (Pergolux, StruXure, Renson, Brustor) or a local fabricator.
- **Pain points**: every competitor's site looks similar — generic outdoor-living stock photography, vague differentiation, unclear what's actually different about the aluminum, the motor, the warranty.
- **Buying behavior**: multiple tabs open simultaneously; explicitly checks warranty terms, review counts/ratings, and material/engineering specifics side by side; wary of anything that feels like a sales pitch.
- **Objections**: "Why you over [competitor]?" · "What's actually different about your roof system?" · "Do you have as long a track record / as many reviews?"
- **Questions before buying**: a direct point of differentiation, third-party proof (reviews, ratings), warranty comparison.
- **Needs first**: this is the persona a tasteful, fact-based **comparison section** exists for — stated early enough (mid-page) that they don't bounce to a competitor tab looking for it.

---

## 2. The Buying Journey

A single homepage visit can contain a user at any of these stages — paid social traffic skews early-funnel, branded search skews late-funnel. The section sequence in Part 3 is designed so each stage's needs are met _in order_, letting early-stage visitors stop scrolling once satisfied and late-stage visitors skip straight to what they need via anchor navigation/CTAs.

| Stage              | What's happening                                                                                                                              | What the homepage must achieve                                                                                                                                                                                                                                                                              |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Awareness**      | Visitor may not know the product category well, or doesn't know this brand exists yet (social, influencer, display ad, broad organic search). | Communicate category + premium positioning within 3 seconds. Zero generic stock photography. Make clear this is engineered, not a big-box kit — first impression _is_ the differentiation.                                                                                                                  |
| **Research**       | Learning what's actually available and how it works.                                                                                          | Present a clear product taxonomy (Collections), explain benefits in plain non-jargon language, offer low-commitment next steps (gallery, buying guides) that don't force a purchase decision yet.                                                                                                           |
| **Comparison**     | Actively weighing this brand against named competitors or local alternatives.                                                                 | State differentiation explicitly and back every claim with a specific (spec, certification, warranty term), not adjectives. A dedicated Comparison section prevents this visitor from leaving to find one on a competitor's site.                                                                           |
| **Trust Building** | Deciding whether to trust _this specific company_ with a five-figure purchase.                                                                | Surface reviews, real project photography, certifications, years in business, installation counts, warranty terms, financing, and a transparent process — concentrated enough that skepticism is addressed before it becomes a bounce.                                                                      |
| **Decision**       | Choosing between final options, or deciding to act now versus "someday."                                                                      | Remove remaining friction: one obvious next step, FAQ mopping up last objections, honest urgency where it's real (seasonal install scheduling) — never a fabricated countdown timer.                                                                                                                        |
| **Purchase**       | Commits — configures and buys, or books a consultation.                                                                                       | Make the primary conversion action frictionless, repeated at sensible intervals, and unambiguous (one primary CTA phrase used consistently, not five different button labels for the same action).                                                                                                          |
| **After Purchase** | Mid-project or post-install.                                                                                                                  | Not the homepage's primary job — this lives in account/order-status/email/support. But the homepage's brand-trust impression is what turns this customer into a referral and a review later, so the same standard of craft applies even though this stage isn't optimizing for a homepage conversion event. |

---

## 3. Homepage Information Hierarchy

Thirteen sections, in this exact order, with the reasoning behind each. The order itself is a deliberate psychological arc: **hook → qualify → prove → convert** — never asking for commitment before the objection that would block it has been addressed.

### 1. Hero

- **Purpose**: establish premium positioning and category clarity in under 3 seconds.
- **Psychology**: first impressions form fast and anchor everything after them; a hero that looks like a stock-photo patio-cover site caps how "premium" anything below it can ever feel, regardless of copy.
- **Conversion goal**: get the visitor to do one of two things — start scrolling, or click a CTA. Not to explain the whole product.
- **Why here**: it's the only section guaranteed to be seen by 100% of visitors.
- **CTA strategy**: one primary ("Design Your Pergola"), one secondary, lower-emphasis ("Book a Free Consultation") — see Part 4.
- **Content requirements**: a short, benefit-and-category-clear headline; one supporting sentence; two CTAs; a thin inline trust line.
- **Imagery/video**: real installation footage, not stock — see Part 4.
- **Motion ideas**: subtle scale/opacity shift on scroll exit only; nothing that delays the CTA becoming interactive.

### 2. Trust Bar

- **Purpose**: a fast, low-friction credibility signal immediately after the hero, before any selling begins.
- **Psychology**: visitors extend more trust to _specific numbers_ (years in business, installs completed, warranty length, review score) than to adjectives ("premium," "trusted") — numbers read as falsifiable, so they read as honest.
- **Conversion goal**: prevent an early bounce from a skeptical visitor who hasn't yet seen enough to trust the brand.
- **Why here**: this is the single highest-leverage placement for trust signals — it's seen by everyone who scrolls even one section past the hero, and it primes everything that follows to be read more generously.
- **CTA strategy**: none — this section's job is credibility, not conversion. Adding a CTA here dilutes both.
- **Content requirements**: 3–4 short stats (e.g., "5,000+ Installations," "10-Year Structural Warranty," "4.9★ from 1,200+ Reviews," "Licensed & Insured Nationwide") — real numbers only, never rounded up dishonestly.
- **Imagery/video**: none — icon-accented text, kept fast and lightweight.
- **Motion ideas**: numbers count up once, on first scroll into view, respecting reduced motion (static final value shown immediately if motion is reduced).

### 3. Collections (Product Range Overview)

- **Purpose**: let the visitor self-select into the product category relevant to them (Attached / Freestanding / Louvered Roof / Enclosures).
- **Psychology**: research-stage visitors don't yet know which product fits their space — presenting the taxonomy visually (not as a nav dropdown they have to already know to open) teaches the category while it sells it.
- **Conversion goal**: click-through to a collection page, or absorb enough to keep scrolling with better context for what follows.
- **Why here**: it must land before the Configurator (section 4) and Benefits (section 5) — a visitor can't meaningfully engage with either without first knowing what the product options are.
- **CTA strategy**: each card's entire surface is a link to that collection; no separate "Learn more" button competing for attention.
- **Content requirements**: 4 cards — name, one-line differentiator, key spec (matches the mega menu's taxonomy from `NAVIGATION.md` exactly, so nav and homepage never contradict each other).
- **Imagery/video**: one strong real photo per collection, consistent crop/aspect ratio across all four for visual rhythm.
- **Motion ideas**: gentle image scale on hover (signals interactivity and product quality) — see Part 7.

### 4. Configurator Preview

- **Purpose**: prove, experientially, that this is a technology-forward, made-to-order product — not a fixed catalog SKU.
- **Psychology**: letting a visitor _do something_ (swap a roof color, toggle open/closed) creates a sense of ownership and investment far stronger than reading a paragraph about customization — this is the IKEA-effect/endowment principle applied to a pre-purchase interaction.
- **Conversion goal**: drive the visitor into the real configurator flow while their interest is highest, immediately after Collections has framed the options.
- **Why here**: it's the site's single strongest differentiator against competitors' static brochure-ware — it needs to appear early enough to change how the visitor reads everything that follows ("this company thinks differently"), not buried after generic content.
- **CTA strategy**: one CTA — "Start Designing Yours" — leading directly into the full configurator, not a generic "Learn more."
- **Content requirements**: a short framing line ("See it before you build it") plus the live preview interaction itself.
- **Imagery/video**: a lightweight interactive preview (a handful of pre-rendered states, not a full 3D engine on the homepage — see Part 10 on performance).
- **Motion ideas**: instant crossfade between states on interaction; no animation delay between user action and visible response — an interactive element that feels laggy actively damages the "premium/technology-forward" impression it exists to build.

### 5. Signature Benefits / Engineering Differentiators

- **Purpose**: answer "why is this better/different, concretely" for Persona B and Persona D before they have to go looking for the answer elsewhere.
- **Psychology**: specific, falsifiable claims (aluminum alloy grade, motor brand, IP rating, wind rating) build more trust than superlatives, and they pre-empt the exact objections both practical buyers and comparison shoppers arrive with.
- **Conversion goal**: keep a specification-driven visitor on the page instead of tabbing to a competitor to find this information.
- **Why here**: it follows the Configurator specifically so "here's what you can design" is immediately followed by "and here's why it's built to last" — capability, then substance.
- **CTA strategy**: none required; a secondary link to full specs/buying guides is enough — this section's job is reassurance, not a hard conversion push.
- **Content requirements**: 3–5 differentiators, each with one concrete fact, not a paragraph (e.g., "Marine-grade aluminum — won't rust, warp, or rot").
- **Imagery/video**: macro/detail shots (joinery, motor housing, louver mechanism) rather than full-scene photography — this is where "we sweat the details" gets shown, not told.
- **Motion ideas**: sequential scroll-reveal, one differentiator at a time, so each fact gets a moment of individual attention rather than arriving as a wall of text.

### 6. Featured Projects / Gallery

- **Purpose**: the single most persuasive section for Persona A — real, diverse, aspirational installations.
- **Psychology**: this is where "will it suit my home" gets answered — variety of architectural styles (modern, traditional, coastal, desert) lets more visitors see themselves in the result than any one hero image could.
- **Conversion goal**: click through to a full case study, or simply build enough desire to reach the next CTA with less resistance.
- **Why here**: it needs the Benefits section (5) to precede it so the visitor already trusts the engineering — now they get to _want_ it.
- **CTA strategy**: "View all projects" — low-pressure, browsing-oriented, matching this section's inspiration-stage intent rather than a hard sell.
- **Content requirements**: 6–9 real projects, varied styles/regions/product types, each with a one-line location/style tag, never staged stock photography.
- **Imagery/video**: this is the section most worth investing real photography/videography budget in — it directly drives Persona A's decision more than any copy on the page.
- **Motion ideas**: a horizontally scrollable/draggable rail on desktop and touch-swipe on mobile — browsing behavior, not a fixed grid, matches how people actually explore inspiration content (Pinterest/Instagram habits).

### 7. Comparison

- **Purpose**: directly serve Persona D — the visitor actively comparing named alternatives — before they leave to find this information themselves.
- **Psychology**: naming the comparison openly (even generically, e.g., "Pergoluxe vs. a standard aluminum pergola kit") signals confidence; avoiding the topic entirely reads as having something to hide from a visitor who is _already_ making the comparison whether the site engages with it or not.
- **Conversion goal**: resolve the comparison stage on-page instead of losing the visitor to a competitor's tab.
- **Why here**: only after Benefits and Projects have established real substance — a comparison table with no supporting context above it reads as defensive marketing rather than earned confidence.
- **CTA strategy**: "See full specifications" or directly into the configurator — this visitor is often close to decision-ready once the comparison resolves in the brand's favor.
- **Content requirements**: a short table (4–6 rows) — warranty length, materials, motorization, install support, price transparency — factual and specific, never disparaging a named competitor by name (compare against category norms/generic alternatives, which is more credible and avoids legal/brand risk).
- **Imagery/video**: none needed; clarity matters more than visuals here.
- **Motion ideas**: none beyond a standard scroll-reveal — this section should feel like reading a spec sheet, not a marketing moment.

### 8. Testimonials

- **Purpose**: deepen trust with real customer voices after the visitor has seen product substance, not before.
- **Psychology**: testimonials placed too early read as unearned; placed here, after Benefits/Projects/Comparison have done the rational case, they supply the emotional/social confirmation ("people like me made this choice and were happy") right when the visitor is close to deciding.
- **Conversion goal**: reduce residual risk perception right before the Process and final-CTA sections ask for commitment.
- **Why here**: this is the emotional payoff after the rational buildup — sequencing it any earlier would waste its persuasive power.
- **CTA strategy**: none required, or a soft link to a full reviews page.
- **Content requirements**: a mix of short video testimonials (highest trust value) and written quotes with real names/locations/photos — never anonymous or stock-photo attributed quotes.
- **Imagery/video**: real customers in front of their real installation is the single most credible image type on the entire homepage.
- **Motion ideas**: swipeable carousel, autoplay paused by default (or very slow) and always pausable — see Part 7 for why autoplay testimonial carousels are usually a usability mistake.

### 9. Installation Process

- **Purpose**: remove the operational/logistical fear that blocks high-ticket purchases — "what actually happens after I say yes."
- **Psychology**: uncertainty about an unfamiliar process (a big install project in your yard) is itself a conversion blocker independent of price or product quality; making the process concrete and finite reduces perceived risk.
- **Conversion goal**: position the next step (consultation/configurator) as the _first step of a known, comfortable process_, not a leap into the unknown.
- **Why here**: placed right before the final trust/guarantee block and CTA, so the last thing the visitor learns before being asked to commit is exactly what committing involves.
- **Content requirements**: 4–5 numbered steps (Consultation → Design & Engineering → Manufacturing → Professional Installation → Enjoy/Warranty Registration), each with a realistic timeframe.
- **Imagery/video**: simple iconography or a short process-illustration; real behind-the-scenes install photography if available adds credibility.
- **Motion ideas**: a horizontal or vertical step progression that reveals sequentially on scroll — reinforces "this is a clear, linear path," which is the section's entire point.

### 10. Guarantees & Financing

- **Purpose**: remove the last financial/risk objection immediately before the FAQ and final CTA.
- **Psychology**: loss aversion is stronger than the appeal of gains — a clearly stated warranty and satisfaction guarantee reduces the _fear of a bad outcome_ more effectively than any additional feature claim would increase desire.
- **Conversion goal**: neutralize "what if this goes wrong" and "can I actually afford this" simultaneously.
- **Content requirements**: warranty terms restated in full (not just the trust-bar summary), financing/payment-plan options if available, a plain-language satisfaction guarantee.
- **Imagery/video**: certification/badge iconography (structural engineering certification, insurance, financing partner logos).
- **Motion ideas**: none needed — this is a read-and-trust section, not a look-and-feel one.

### 11. FAQ

- **Purpose**: address the long tail of remaining objections in the visitor's own words, right before the final ask.
- **Psychology**: an unanswered question at the point of decision is a near-guaranteed bounce; an FAQ lets a visitor self-serve the specific thing blocking _them_, which varies by persona.
- **Conversion goal**: last-chance objection handling — every question here maps to a real objection identified in Part 1.
- **Content requirements**: 8–12 questions spanning all four personas (cost range, timeline, materials/durability, warranty, trade/professional inquiries, service area, financing) — sourced from real sales/support questions, not invented ones.
- **Imagery/video**: none.
- **Motion ideas**: accordion expand/collapse (already built as a foundation primitive) — no more than one open at a time, so the page doesn't grow unpredictably long.

### 12. Final CTA

- **Purpose**: one last, unambiguous, dual-path conversion moment after every objection has had a chance to be addressed.
- **Psychology**: offering the same two clear choices as the hero (Configure vs. Consultation) — not new options — avoids decision fatigue right at the moment of highest intent.
- **Conversion goal**: convert visitors who scrolled the full page but hadn't yet acted — this section exists specifically for them.
- **Content requirements**: a short, confidence-reinforcing headline (not a repeat of the hero headline), the same two CTAs as the hero for consistency.
- **Imagery/video**: a strong closing image — ideally the single best project photo on the site.
- **Motion ideas**: none beyond a standard reveal — clarity and directness matter more than flourish in the section whose entire job is "make the decision easy right now."

### 13. Footer

Already specified in `NAVIGATION.md` — the homepage doesn't change the footer, it inherits it.

---

## 4. Hero Section Strategy

**Messaging hierarchy** (three tiers, in strict visual priority order): headline → one supporting sentence → thin trust line. Nothing else competes for attention in the first viewport.

**Headline strategy**: avoid both generic category language ("Beautiful Pergolas for Every Home") and vague lifestyle fluff ("Live Your Best Outdoor Life"). The headline should fuse _category clarity_ with _emotional/aesthetic promise_ in one line, e.g. **"Outdoor Living, Engineered to Last."** or **"Your Backyard, Architecturally Reimagined."** — a visitor should know what the company sells and what tier it plays in within one sentence, without reading further. This matters because Persona A and D both decide "is this brand premium" in the first few seconds, before any proof is presented — the headline is doing positioning work, not just informing.

**Supporting copy**: one sentence, plain language, resolves the "what/who is this for" ambiguity a punchy headline necessarily creates — e.g. _"Custom aluminum pergolas and motorized louvered roofs, designed around your home and installed by our own certified teams."_ This sentence should contain the category keywords (see Part 9) naturally, since it's also prime real SEO text.

**Primary CTA**: **"Design Your Pergola"** (routes into the configurator). This is the CTA for the visitor who is ready to engage now — it's phrased as an action the visitor takes ("design yours"), not a company action ("shop now"), which reads as more personalized and lower-pressure for a customization-led product.

**Secondary CTA**: **"Book a Free Consultation"** — visually subordinate (outline/ghost style, not a second filled button competing for equal attention) because offering two _equally weighted_ choices at the very first decision point measurably increases hesitation (choice overload). One clear default action, one clear lower-commitment alternative for visitors not ready to self-configure.

**Trust indicators**: one thin line beneath the CTAs — e.g. _"10-Year Warranty · 5,000+ Installations · Licensed & Insured"_ — small enough not to compete with the headline, present enough to pre-empt the very first skepticism ("is this a real, established company") before it fully forms.

**Background video recommendation**: a short (6–10 second), seamlessly looping clip of a real installation — ideally a motorized louvered roof closing, or a slow reveal of a pergola-shaded seating area at golden hour. It must be **real footage**, never stock — Persona A specifically distrusts anything that reads as generic, and stock outdoor-living footage is exactly the tell. Muted, `autoplay`, `loop`, `playsinline`, with a poster frame that is itself a strong static image (so the perceived hero looks complete even before video loads — see Part 10). A subtle gradient scrim over the lower third of the video is mandatory, not optional — it's what guarantees headline/CTA contrast regardless of the footage's brightness, which is an accessibility requirement, not a stylistic one (see Part 11).

**Scroll behavior**: a small, subtle scroll-cue affordance (not an obnoxious bouncing arrow) signals there's more below without being asked; the hero content very slightly scales/fades as the user scrolls past it (reinforcing forward progress) rather than being pinned or doing anything more elaborate — restraint here matters because the hero's job is a fast first impression, not a scroll-jacking set piece.

**Mobile behavior**: video is replaced by a static, art-directed image (a tighter, vertical-friendly crop of the same real installation) rather than the same video at a smaller size — see Part 10 for why. Headline shortens slightly if needed to avoid awkward line-wrapping at narrow widths; both CTAs stack full-width, primary on top; the trust line either stays as one wrapped line or condenses to the single strongest stat (installations or warranty) if space is tight — three competing priorities on a 375px-wide screen is one too many.

**Why these decisions improve conversion**: every choice above targets a _specific, named_ drop-off risk from Part 1/2 — generic imagery loses Persona A in the first three seconds; two equal-weight CTAs adds hesitation at the highest-intent moment on the page; low video contrast fails Persona A/D's snap credibility judgment and fails accessibility outright; and a cluttered mobile hero loses the majority of paid-social traffic (which skews mobile) before it ever reaches proof content further down the page.

---

## 5. Homepage Structure — Summary Flow

Full rationale for each section is in Part 3; this is the at-a-glance sequence for stakeholder review.

```
Hero
  ↓  (fast premium first impression, dual CTA)
Trust Bar
  ↓  (credibility before selling)
Collections
  ↓  (teach the taxonomy, let visitor self-select)
Configurator Preview
  ↓  (prove technology-forward customization, experientially)
Signature Benefits / Engineering
  ↓  (concrete substance behind the design)
Featured Projects / Gallery
  ↓  (aspirational proof — "this could be my home")
Comparison
  ↓  (resolve competitive evaluation on-page)
Testimonials
  ↓  (emotional/social confirmation)
Installation Process
  ↓  (de-risk the unfamiliar next step)
Guarantees & Financing
  ↓  (neutralize financial/risk objections)
FAQ
  ↓  (mop up remaining, persona-specific objections)
Final CTA
  ↓  (one last unambiguous, dual-path conversion moment)
Footer
```

---

## 6. Trust-Building Strategy

| Trust signal                                       | Primary placement            | Secondary placement                                |
| -------------------------------------------------- | ---------------------------- | -------------------------------------------------- |
| Warranty (length/terms)                            | Hero trust line (short form) | Trust Bar, Guarantees section (full terms), Footer |
| Reviews / aggregate rating                         | Trust Bar (score)            | Testimonials (full detail), near Final CTA         |
| Certifications / engineering standards             | Signature Benefits           | Guarantees section, footer badges                  |
| Years in business                                  | Trust Bar (stat counter)     | About page                                         |
| Installations completed                            | Trust Bar (stat counter)     | Projects section intro line                        |
| Manufacturing quality / materials                  | Signature Benefits           | Buying guides (linked, not homepage content)       |
| Service/shipping coverage area                     | Installation Process         | FAQ                                                |
| Satisfaction guarantee                             | Guarantees section           | FAQ                                                |
| Financing options                                  | Guarantees section           | Near Final CTA, footer                             |
| Installation support (own crews vs. subcontracted) | Installation Process         | FAQ                                                |
| Real customer photos/video testimonials            | Projects, Testimonials       | —                                                  |
| Licensing & insurance                              | Trust Bar                    | Footer                                             |
| Press/media mentions or trade affiliations         | Trust Bar (logo row)         | About page                                         |

**Principle behind the placement pattern**: every trust signal appears at least twice — once as a fast, low-detail signal early (Trust Bar/hero) for visitors who won't scroll far, and once in full, specific detail later (Guarantees/Testimonials/Process) for visitors doing genuine due diligence. Relying on a single trust mention anywhere on the page under-serves whichever visitor type doesn't happen to reach that spot.

---

## 7. Premium Interaction Recommendations

Every recommendation below is included because it improves comprehension, reduces friction, or reduces perceived risk — not because it looks impressive. Where an interaction doesn't clear that bar, it's explicitly excluded.

- **Scroll-reveal (fade/slide-up), once per section**: gives the page rhythm and signals quality craftsmanship, without being applied per-element (which would make scrolling feel like waiting through a slideshow).
- **Subtle parallax on hero/gallery imagery only, never on text**: reinforces depth in photography; parallax applied to text or interactive controls actively harms readability and precision clicking, so it's scoped out.
- **Configurator live preview (instant crossfade on selection)**: this is the single highest-value interaction on the page — it lets the visitor _experience_ customization rather than read about it. Response must be instant; any perceptible lag undermines the "premium, technology-forward" impression it exists to create.
- **Before/after or open/closed slider (louvered roof: open sun vs. closed shade)**: directly demonstrates the product's core functional benefit experientially — this is usability-justified, not decorative, because it answers a real product question (Persona B's "how does it actually work") faster than a paragraph could.
- **Animated stat counters (Trust Bar), once on first scroll into view**: makes numbers memorable at negligible cost; must show the static final value immediately for reduced-motion users rather than skipping the number entirely.
- **Sticky/persistent CTA (mobile primarily, see Part 8)**: keeps the conversion path available at all times without the visitor having to scroll back to find it — a usability fix for long-scroll pages, not a decorative addition.
- **Hover image shift on Collection cards (desktop)**: a small, quick crop/zoom shift signals interactivity and product quality; kept subtle and fast so it reads as responsive, not showy.
- **Draggable/swipeable project gallery rail**: matches how people already browse inspiration content (Pinterest/Instagram habits) rather than forcing a fixed grid that under-serves the browsing behavior this section exists to support.
- **Testimonial carousel, manually controlled, autoplay off or very slow with a visible pause control**: see below — this is the one interaction pattern worth calling out as a common mistake to avoid.

**Explicitly avoided**: aggressive multi-layer parallax, animated custom cursors, scroll-jacking (hijacking native scroll speed/direction), decorative particle/background effects, and — specifically — **autoplaying testimonial or logo carousels with no pause control**. Autoplay carousels measurably reduce the read-rate of everything in them past the first slide (users don't have time to read before it advances, and most never manually intervene), which defeats the entire purpose of a testimonials section. Every carousel on this homepage must be user-controlled by default, or autoplay only at a slow, easily-interrupted pace with an always-visible pause affordance.

---

## 8. Mobile-First Strategy

Mobile traffic will skew highest for early-funnel (paid social, Instagram/Pinterest referral) visitors — exactly the audience least willing to tolerate friction, so mobile is not a scaled-down desktop experience here, it's the primary design target.

- **Section adaptation, generally**: every multi-column section (Collections, Benefits, Comparison) becomes a single vertical column or a swipeable horizontal rail — never a horizontally-scrolling _page_ (no horizontal body scroll, ever) and never a shrunk multi-column grid that forces pinch-zooming to read.
- **Hero**: static art-directed image instead of video (bandwidth/battery), shorter headline if needed, stacked full-width CTAs.
- **Configurator Preview**: the interaction target sizes increase (swap swatches/options sized for a thumb, not a cursor); the live preview image itself gets more vertical real estate since horizontal space is scarce.
- **Comparison table**: becomes a stacked card-per-row or a horizontally swipeable table with a frozen label column — never a shrunk table with 8pt text.
- **Gallery**: swipeable single-image-at-a-time rail rather than a grid, matching native mobile photo-browsing conventions.
- **Touch interactions**: every tappable target meets a minimum ~44×44px touch area (already a hard rule in the design system's button/input sizing); swipe gestures on carousels/galleries/sliders are native-feeling (momentum, no artificial resistance).
- **Sticky CTA behavior**: after the hero has been scrolled past, a slim, persistent bottom bar appears with the two core actions (Configure / Call or Consultation) — mirroring the mobile nav's existing quick-actions pattern from `NAVIGATION.md` rather than inventing a new mechanism. It hides again only if the visitor scrolls back up into the hero (where the same CTAs already exist), avoiding redundant stacked CTAs on screen at once.
- **Scrolling experience**: relies on the same Lenis-driven smooth scroll already established for the shell, respecting `prefers-reduced-motion` exactly as documented in `NAVIGATION.md` — no separate mobile-specific scroll behavior to maintain.
- **Thumb-friendly navigation**: the existing mobile nav drawer's bottom-anchored quick actions (`NAVIGATION.md` §1) already solve global navigation reachability; the homepage's own sticky CTA bar uses the same "bottom = thumb zone" principle rather than placing a floating action button top-right, which is a common and well-documented mobile usability mistake (unreachable one-handed).
- **Performance considerations**: hero video swapped for image (see above), below-the-fold sections lazy-mount, the configurator preview and comparison table specifically are the two heaviest interactive sections and should be the two most aggressively deferred (loaded only as they near the viewport) — detailed in Part 10.

---

## 9. SEO Strategy

**Primary keywords** (homepage should be able to rank for and clearly targets): "custom aluminum pergolas," "luxury outdoor living pergolas," "motorized louvered roof pergola."

**Secondary keywords** (supported by Collections/section copy and internal links, not homepage-primary): "attached pergola," "freestanding pergola," "louvered roof system," "pergola with retractable roof," "aluminum patio cover alternative," "outdoor living structures." Informational-intent secondary terms ("how much does a pergola cost," "pergola vs. patio cover") are deliberately **not** targeted by the homepage itself — that content belongs in Buying Guides/Resources, linked _from_ the homepage (Signature Benefits, FAQ), so search intent match stays clean (a homepage trying to rank for both transactional and informational queries typically ranks weakly for both).

**Internal linking from the homepage**:

- Collections cards → their respective collection pages (exact match anchor text, e.g. "Louvered Roof Systems").
- Configurator Preview CTA → the full configurator.
- Projects section → individual case-study pages and the full Projects gallery.
- Comparison section → a full specifications page.
- FAQ entries that reference a topic in more depth → the relevant Buying Guide.
- Footer (already built) provides the sitewide link graph — the homepage's in-content links should complement it with contextual, keyword-relevant anchor text rather than duplicating generic "click here" links.

**Schema recommendations**: `Organization` and `WebSite` (with `SearchAction`) are already implemented at the root layout level per `NAVIGATION.md`. For the homepage specifically: `BreadcrumbList` is not needed (homepage has no breadcrumb), but `FAQPage` schema should wrap the FAQ section's actual content once built (directly reusable, real markup driving real schema — never schema describing content that isn't visibly present, which risks a manual action). `Product`/`Offer`/`AggregateRating` schema belongs on collection/product pages, not the homepage — attempting to mark up the homepage as if it were a single product page would be inaccurate structured data for a multi-product catalog entry point.

**Content hierarchy**: exactly one `<h1>` — the hero headline. Each of the thirteen sections gets one `<h2>` as its section heading (e.g., "Explore Our Collections," "Real Projects, Real Homes"). Sub-items within a section (individual collection names, individual FAQ questions, individual process steps) are `<h3>` — never skipping from `<h2>` to `<h4>`. This isn't just a technical nicety: it's also literally how a screen reader user navigates the page by heading (see Part 11), so the SEO heading structure and the accessibility heading structure are the same requirement, not two separate ones.

---

## 10. Performance Strategy

**Image loading**: `next/image` throughout (per `ARCHITECTURE.md`/`DESIGN_SYSTEM.md` conventions already established); the hero's poster/static image is the page's LCP candidate and must load with `priority` and explicit `sizes`, served as AVIF/WebP with a responsive `srcset`. Gallery and collection images are Cloudinary-transformed to the exact display size needed, never a full-resolution source image scaled down in the browser.

**Video loading**: the hero video is not the LCP element — the poster image is, and it must render first. The video itself loads immediately after (not blocking first paint), compressed (H.264 baseline + a WebM/AV1 fallback), muted/`playsinline`/`loop` for autoplay-policy compliance across browsers, and on mobile is replaced entirely by the static art-directed image (Part 8) rather than a smaller video — a "smaller" video is still a video request, decode cost, and battery draw a static image simply doesn't have, and mobile visitors disproportionately are the early-funnel, patience-scarce audience least willing to wait for it.

**Lazy loading**: everything from the Collections section downward mounts progressively as it nears the viewport (Suspense boundaries per section, consistent with the streaming pattern already established in `ARCHITECTURE.md` §5). The **Configurator Preview** and **Comparison** sections specifically are the two heaviest interactive pieces on the page and should be dynamically imported (`next/dynamic`) so their JavaScript isn't part of the initial bundle at all — a visitor who never scrolls past the Trust Bar shouldn't pay the bytes-and-parse cost for a comparison table they never saw.

**Priority assets**: hero poster image, the logo, and the specific font weights actually used in the hero (display + one sans weight) are the only things that should be treated as render-blocking-critical; everything else is deliberately deferred.

**Font loading**: already self-hosted via `next/font` with `display: swap` per `DESIGN_SYSTEM.md` — no additional homepage-specific font work needed, which is itself a benefit of having solved this once at the foundation level.

**Animation optimization**: every homepage animation — scroll-reveals, hero scale/fade, counter count-up, image hover shifts — animates only `transform`/`opacity`/`filter`, per the hard rule already established in `ARCHITECTURE.md`. GSAP `ScrollTrigger` instances (mega-menu/gallery-adjacent, if used) must be scoped to their section and disposed on unmount, not left accumulating as the user scrolls a long page.

**Core Web Vitals goals**: **LCP < 2.5s** (hero poster image, priority-loaded, correctly sized — this is the single most important number on this page given the hero _is_ the LCP element); **CLS < 0.1** (every image/video on the page reserves its box via aspect-ratio before load — no exceptions, given how much of this page is imagery); **INP < 200ms** (kept achievable specifically by deferring the Configurator Preview and Comparison sections' JS via dynamic import, so their hydration cost never competes with the hero's own interactivity for main-thread time on load).

---

## 11. Accessibility Strategy

**Semantic structure**: one `<h1>`, sequential `<h2>`/`<h3>` per Part 9, each of the thirteen sections as a landmark `<section aria-label="…">` (or labelled by its own visible heading, which satisfies the same requirement without a redundant `aria-label`) so a screen reader user can jump section-to-section exactly as a sighted user scrolls section-to-section.

**Keyboard navigation**: every interactive element on the homepage — Configurator Preview swatches, the before/after slider, gallery navigation, testimonial carousel controls, FAQ accordion triggers — must be reachable and operable via keyboard alone, with visible focus rings per the design system's existing `:focus-visible` treatment (`DESIGN_SYSTEM.md` §8). A slider or carousel that only responds to drag/swipe is not acceptable; each needs a keyboard-operable equivalent (arrow keys / explicit prev-next controls).

**Reduced motion**: every homepage-specific animation (scroll-reveals, hero scale-on-scroll, stat counters, hover image shifts, carousel autoplay) collapses to an instant or static state under `prefers-reduced-motion`, using the same `useMotionVariants`/reduced-motion plumbing already built at the foundation level (`DESIGN_SYSTEM.md` §7) rather than introducing a second, homepage-specific reduced-motion mechanism. Parallax specifically should be fully disabled (not just slowed) under reduced motion, consistent with the precedent set for the shell's own parallax utility.

**Focus management**: the Configurator Preview, if it opens any overlay/expanded state on the homepage itself (versus linking straight to the full configurator), must trap and return focus exactly as the existing Dialog/Drawer primitives already do — no new focus-trap implementation should be written for the homepage when a correct one already exists in `components/ui`.

**Screen reader support**: the hero's background video is decorative (the headline/copy carries the actual message) and should be `aria-hidden`, not narrated; stat counters need a static text equivalent available immediately (not solely conveyed through an animating number a screen reader can't meaningfully track); the before/after slider needs a text alternative describing both states for a user who can't perceive the visual comparison; testimonial video content should be captioned.

**Color contrast**: every text element must meet WCAG AA against its actual background — the hero is the one section requiring special attention, since its background is a video, not a fixed color: the gradient scrim specified in Part 4 is what guarantees the headline/CTA/trust-line contrast ratio regardless of the underlying footage's brightness, and its opacity should be verified against the _brightest_ frame of the loop, not an average.

---

## 12. Wireframe & Competitive Rationale

### Text Wireframe

```
┌────────────────────────────────────────────┐
│ ANNOUNCEMENT BAR + HEADER (existing shell)   │
├────────────────────────────────────────────┤
│ HERO                                         │
│   H1 headline                                │
│   Supporting sentence                        │
│   [Primary CTA]  [Secondary CTA]             │
│   Trust line (warranty · installs · rating)  │
│   — real installation video background —     │
├────────────────────────────────────────────┤
│ TRUST BAR                                    │
│   [Years] [Installs] [Rating] [Licensed]     │
├────────────────────────────────────────────┤
│ COLLECTIONS                                  │
│   H2                                         │
│   [Card] [Card] [Card] [Card]                │
├────────────────────────────────────────────┤
│ CONFIGURATOR PREVIEW                         │
│   H2 + framing line                          │
│   [ live interactive preview ]               │
│   [Start Designing Yours]                    │
├────────────────────────────────────────────┤
│ SIGNATURE BENEFITS / ENGINEERING              │
│   H2                                         │
│   [Fact] [Fact] [Fact] [Fact] [Fact]          │
├────────────────────────────────────────────┤
│ FEATURED PROJECTS                            │
│   H2                                         │
│   [ swipeable/draggable project rail ]        │
│   [View all projects]                        │
├────────────────────────────────────────────┤
│ COMPARISON                                   │
│   H2                                         │
│   [ spec comparison table ]                  │
├────────────────────────────────────────────┤
│ TESTIMONIALS                                 │
│   H2                                         │
│   [ carousel: video + written, user-paced ]   │
├────────────────────────────────────────────┤
│ INSTALLATION PROCESS                         │
│   H2                                         │
│   [1 Consult] [2 Design] [3 Build]           │
│   [4 Install] [5 Enjoy]                      │
├────────────────────────────────────────────┤
│ GUARANTEES & FINANCING                       │
│   H2                                         │
│   Warranty terms · Financing · Guarantee      │
├────────────────────────────────────────────┤
│ FAQ                                          │
│   H2                                         │
│   [Accordion] × 8–12                         │
├────────────────────────────────────────────┤
│ FINAL CTA                                    │
│   Short headline                             │
│   [Primary CTA]  [Secondary CTA]             │
├────────────────────────────────────────────┤
│ FOOTER (existing shell)                      │
└────────────────────────────────────────────┘
```

### Why This Should Outperform Typical Pergola Company Websites

Most competitor and local-fabricator sites in this category share the same five weaknesses — this blueprint was built specifically against each one:

1. **Generic stock photography and vague copy.** Nearly every pergola site opens with the same handful of stock-photo outdoor scenes and adjective-heavy headlines ("beautiful," "premium," "quality"). This blueprint requires real installation photography/video everywhere and specific, falsifiable claims instead of adjectives — the single biggest lever on Persona A and D's snap credibility judgment.
2. **Hidden pricing with no interactive path to an estimate.** Most sites force a phone call or generic contact form before revealing anything about cost or configuration. The Configurator Preview gives visitors something to _do_ early, and the Guarantees section states financing/warranty terms plainly rather than gatekeeping every detail behind a sales call.
3. **No real differentiation from competitors.** Sites in this space rarely address the comparison a research-heavy buyer is already making. A dedicated, fact-based Comparison section resolves this on-page instead of exporting the comparison shopper to a competitor's tab.
4. **Weak, scattered, or absent trust signals.** Reviews, warranty terms, and credentials are often buried in a footer or a separate page nobody reaches. This blueprint places every trust signal at least twice — once fast and early, once in full detail later — matched to where each persona actually needs it.
5. **Slow, heavy, poorly-structured mobile experiences.** Image-and-video-heavy pergola sites are frequently slow and awkward on mobile specifically, which is disproportionately where early-funnel discovery traffic lands. Mobile-first section adaptation, deferred/dynamic-imported heavy interactions, and CLS-safe media loading directly target this gap.

The result is a homepage that treats this as what it actually is — a five-figure, research-heavy purchase decision — rather than applying an ecommerce-impulse-buy playbook (countdown timers, aggressive discounting, generic template sections) to a product category where that playbook actively erodes the trust it needs to build.
