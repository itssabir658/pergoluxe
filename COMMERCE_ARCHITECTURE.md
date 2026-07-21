# Pergoluxe — Commerce Architecture Document

Written before any commerce implementation exists, in the same spirit as `HOMEPAGE_STRATEGY.md` and `BRAND_IDENTITY.md` — this is the blueprint the Shopify, Sanity, and frontend implementation teams build from, not a retrospective of what was built. No UI, no components, no page layouts exist yet for the product/collection/configurator/cart/checkout surface; this document is what makes building those unambiguous when that milestone starts.

It extends, and does not contradict, `ARCHITECTURE.md` §6–7 (the folder-level Shopify/Sanity organization already agreed) and the placeholder shapes already shipped in `features/configurator` and `features/product` from the homepage milestones — every recommendation below states explicitly which existing placeholder it replaces and how.

## Table of Contents

1. [Product Catalogue Strategy](#1-product-catalogue-strategy)
2. [Product Modelling](#2-product-modelling)
3. [Variant Strategy](#3-variant-strategy)
4. [Accessories](#4-accessories)
5. [Pricing Strategy](#5-pricing-strategy)
6. [Configurator Data Model](#6-configurator-data-model)
7. [Shopify Data Architecture](#7-shopify-data-architecture)
8. [Sanity CMS](#8-sanity-cms)
9. [Search Strategy](#9-search-strategy)
10. [Inventory & Fulfilment](#10-inventory--fulfilment)
11. [Customer Journey](#11-customer-journey)
12. [Future Scalability](#12-future-scalability)
13. [Technical Recommendations](#13-technical-recommendations)

---

## Guiding Principle

Every decision below answers one question: **who is the system of record for this fact, and what breaks if two systems disagree about it?**

- If getting a fact wrong could overcharge, undercharge, oversell, or misrepresent what's actually buildable — **Shopify is the system of record.** Price, inventory, variant existence, structural specs that gate a sale.
- If getting a fact wrong is an embarrassing typo, not a financial or fulfilment error — **Sanity is the system of record.** Marketing copy, imagery direction, editorial structure.
- Nothing is ever duplicated as a second source of truth for convenience. The homepage's current placeholder data (`features/configurator/constants.ts`, `features/product/constants.ts`) exists specifically because Shopify isn't wired up yet — every placeholder below has a named, specific Shopify replacement, not a vague "eventually load from an API."

---

## 1. Product Catalogue Strategy

**Recommendation: Collections for browsing, a Standard Product Taxonomy category for classification, Products for anything sellable, Metaobjects for structured non-product content, and no native "Bundle" product type in the configurator path.**

| Concept                                                                            | Shopify mechanism                                                                                              | Why                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Customer-facing browse taxonomy                                                    | **Manual Collections**                                                                                         | `config/collections.ts` already established the four-way taxonomy (Attached Pergolas, Freestanding Pergolas, Louvered Roof Systems, Glass & Screen Enclosures) as the site's primary mental model. These become manually-curated Shopify Collections whose `handle` values are exactly the strings already in that file — the file's own doc comment ("once Shopify collections are wired, this becomes the static fallback") is honored literally, not reinterpreted.                                                                                                                                                                                                                                                         |
| Cross-cutting facets ("Motorized," "Under $15k," "Ships in 6 weeks")               | **Smart (automated) Collections**, tag-driven                                                                  | These cut across the manual taxonomy and change as pricing/lead-time/stock changes. Automating them from product tags means marketing never manually re-curates a "Motorized" collection every time a new motorized model ships — it's a query, not a list.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Classification for tax, analytics, Google Shopping                                 | **Shopify's built-in Standard Product Taxonomy category field**                                                | This is a distinct concept from Collections — collections are _ours_ to design for browsing, the taxonomy category is _Shopify's_ standardized classification consumed by tax engines and shopping feeds. Every product gets both; conflating them (using collections for tax purposes) would make the browse taxonomy hostage to an external classification scheme.                                                                                                                                                                                                                                                                                                                                                           |
| Models (Fixed Panel, Attached Louvered, Freestanding Louvered, and future lines)   | **Products**                                                                                                   | See Part 2.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Accessories (LED, screens, heaters, remotes, sensors, fans)                        | **Products**, tagged and cross-referenced                                                                      | See Part 4. Must be independently sellable, which rules out modeling them as anything less than a real Product.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Replacement Parts                                                                  | **Products**, in their own collection, tagged by compatible model via a metafield (list of product references) | A customer on a model's PDP should be able to find "parts for this model" without hand-maintained cross-links; the metafield reference makes compatibility a data query, not a content-editing task.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Service Products (extended warranty, re-leveling, winterization)                   | **Products** with `requiresShipping: false`                                                                    | These are real line items with real prices that must appear correctly in tax/reporting — not a checkout add-on hack. Modeling them as virtual products keeps them inside Shopify's native order/fulfillment/tax machinery instead of a bespoke side-channel.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Fixed marketing bundles ("Comfort Pack": heater + screens + LED at a set discount) | **Shopify's native Bundle product type** (component-based)                                                     | Reserved _only_ for a merchant-curated, fixed-composition bundle sold as its own SKU outside the configurator. This is explicitly **not** how the configurator's flexible accessory selection works (Part 4) — a native Bundle has a fixed component list; the configurator's accessory selection is customer-adjustable per order, which a Bundle product cannot express. Using Bundles for the configurator's job would force fixed accessory sets on customers who want to mix and match, and using flexible line items for the marketing bundle's job would lose the merchandising/discount benefits Shopify Bundles are actually built for. Two different jobs, two different mechanisms — not a compromise between them. |

**Future categories (furniture, outdoor kitchens) are designed for from day one**, not bolted on later: nothing in this catalogue structure references "pergola" by name in a schema-defining way. A new category is a new Collection + a new set of metafield _definitions_ scoped to that category's product type (Shopify metafield definitions are namespaced per resource, so a furniture-specific "seating capacity" field cannot collide with a pergola's "wind resistance" field) — never a redesign of the catalogue mechanism itself.

---

## 2. Product Modelling

**Recommendation: hybrid. One Shopify Product per structurally-distinct model line, using native Variants only for the options that are low-cardinality and purely price/SKU-affecting (Size, Colour/Finish, and — where applicable — Motorization). Everything else (roof-type-as-a-different-model, accessories, installation options) lives outside the variant system entirely.**

### Why not one giant product with every option as a variant dimension?

Shopify cap options per product at **3 dimensions** (e.g., Size / Colour / Material), and even with the higher variant-count ceilings Shopify has rolled out over time, the combinatorial surface here — mount type × roof type × size × colour × motorization × LED × screens × heaters × installation option — is easily in the tens of thousands of theoretical combinations. Cramming that into native variants isn't just against a hard limit; it's the wrong mental model. Most of those axes (LED, screens, heaters, installation) are _additive accessories_, not _structural variations of the same thing_, and Shopify's variant system is built for the latter.

### Why not a separate product for every combination (e.g., one product per size)?

This fragments the one thing a Shopify product is good at: being a single, coherent purchase decision with one review history, one SEO-indexed page, one add-to-cart action. "I want an Attached Louvered Pergola" is one customer decision with several refinements (size, colour) — not several unrelated products a customer has to know to compare.

### The actual split

| Axis                                                                              | Mechanism                                                                                                 | Why                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mount + roof family** (Fixed Panel / Attached Louvered / Freestanding Louvered) | **Separate Products**                                                                                     | These aren't refinements of one thing — they're structurally distinct SKUs with different manufacturing processes, different wind/snow certifications, different warranty terms, and (per `features/product/constants.ts`, already shipped) different spec sheets entirely. A "Fixed Panel" and a "Freestanding Louvered" pergola do not share a bill of materials. Modeling them as variants of one product would force one shared image gallery, one shared spec-sheet metafield set, and one shared review thread across genuinely different things — exactly the failure mode variants are wrong for. |
| **Size**                                                                          | **Variant option**                                                                                        | Small, fixed cardinality (three sizes today, per `configSteps`), purely price/SKU-affecting, and customers expect Shopify's native size-picker UX.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Colour / Finish**                                                               | **Variant option**                                                                                        | Same reasoning — three finishes today (Graphite, Bronze, Alpine), each with its own price delta and its own preview image, which is exactly what Shopify's per-variant image field is built for (see Part 6).                                                                                                                                                                                                                                                                                                                                                                                             |
| **Motorization** (Motorized vs. Manual)                                           | **Variant option, only on product lines where it's a real binary choice**                                 | Binary, price-affecting, predictable — a legitimate third option slot. Not present at all on the Fixed Panel product, since that product doesn't have this choice; options only exist on the products they apply to, never as a universally-present-but-usually-disabled option.                                                                                                                                                                                                                                                                                                                          |
| **Accessories** (LED, screens, heaters, remotes, sensors, fans)                   | **Not variants — separate Products added as additional cart line items**                                  | See Part 4 for the full reasoning. The short version: these must be independently sellable (a returning customer buying just a replacement remote), which a variant of the pergola product can never be.                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Installation options**                                                          | **Not variants — a Service Product or a Cart Transform-computed line, depending on complexity**           | See Part 5.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Fulfilment type** (standard vs. made-to-order)                                  | **A metafield** (`fulfillmentType: "standard" \| "made-to-order"`) on the Product, not a structural split | This drives lead-time display and inventory policy (Part 10); it is a fact _about_ the product, not a different kind of product.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

This directly generalizes what's already shipped: `features/product/constants.ts`'s three `PergolaModel` entries (`fixed-panel`, `attached-louvered`, `freestanding-louvered`) map 1:1 to three Shopify Products by handle — exactly as that file's own doc comment already promises ("Model ids double as future Shopify product handles"). Nothing about that placeholder needs to change shape when Shopify lands; it needs its `specs` values sourced from metafields instead of hardcoded strings.

---

## 3. Variant Strategy

### Shopify limitations, stated plainly

- **Maximum 3 option dimensions per product** (e.g., Size, Colour, Motorization) — a hard platform ceiling, not a soft recommendation.
- **A finite variant-count ceiling per product** that has moved upward over time (historically 100, since raised considerably on eligible plans/APIs) — treat the exact number as something to verify against the current Shopify Plus plan at implementation time, and architect so the count is comfortably low regardless (see below), rather than designing right up against whatever the current ceiling happens to be.
- **Each option value is shared platform-wide vocabulary within a product**, not free text per variant — this is a feature, not a limitation: it's what makes "Graphite Black" mean the same swatch everywhere it's used.

### The scalable allocation (avoiding SKU explosion)

1. **Roof-type-as-different-model is not a variant dimension** (Part 2) — this alone removes the single largest multiplier from the variant matrix.
2. **Accessories are never variants** (Part 4) — removes LED × Screens × Heaters × Remotes × Sensors × Fans as a multiplicative factor entirely; they're additive cart lines instead, which scale linearly, not combinatorially.
3. **Structural specs (wind rating, snow load, warranty term, install time) are metafields, not options** — these describe the product, they aren't choices a customer is making, so they never belong in the option system at all. A common mistake this avoids: teams sometimes model a spec as a fake "option" just to display it near the variant picker, which silently multiplies real variant count for a value the customer never actually chooses.
4. **Colour/finish stays a real variant even for made-to-order items** — each colour still gets its own SKU (for costing/reporting), but its _inventory policy_ is what changes for made-to-order lines (Part 10), not its status as a variant.
5. **Combined Listings** (Shopify's mechanism for sharing option-value definitions — the same "Graphite Black" swatch/metafield-backed value — across otherwise-separate products) keeps the three model-line products visually and structurally distinct while guaranteeing "Graphite Black" can never mean a subtly different colour on one product than another. This is the mechanism that makes "separate products per model, shared option vocabulary" coherent instead of three independently-drifting colour lists.

With this allocation, each model-line product's variant count is `sizes × colours × (motorization if applicable)` — a small double-or-triple-digit number per product, not a combinatorial explosion, regardless of how many accessories or installation options the business adds later, because those live outside the variant system entirely.

---

## 4. Accessories

**Recommendation: separate, lightweight, independently-sellable Shopify Products, added as additional cart line items during configuration, with compatibility declared via a metafield/metaobject reference — never bundles, never metaobjects-as-a-substitute-for-real-products, and never priced line-item properties.**

Walking through why each alternative is wrong for the _configurator's_ accessory selection (fixed marketing bundles are a different, valid use of Shopify Bundles — see Part 1):

- **Not Metaobjects.** A Metaobject is a structured content record — it has no price, no inventory, no ability to be a cart line item or appear on an order. An LED kit that a customer might one day buy on its own (to replace a broken unit, or add after initial purchase) _must_ be a real Product to be independently purchasable and to appear correctly in order history, returns, and inventory reporting. Metaobjects remain the right tool for the _compatibility rule_ connecting accessories to models (below) — just not for the accessory itself.
- **Not Bundles.** Shopify's native Bundle product has a fixed component list set by the merchant. The configurator's accessory selection is customer-adjustable per order (choose LED, skip screens, add heaters) — the opposite of what a Bundle product is for.
- **Not (priced) line-item properties.** Line-item properties are metadata attached to an existing cart line — they carry no price of their own and Shopify's tax/discount engine does not treat them as separately-priced entities. Using them to fake a priced add-on produces a cart where the displayed total and the actual taxable/discountable total can disagree — exactly the "two systems disagree about a financial fact" failure this document's guiding principle rules out up front. Line-item properties are used here for something else entirely: _linkage_, not pricing (below).

### The actual mechanism

- **Each accessory (LED Kits, Screens, Heaters, Remote Controls, Sensors, Fans) is its own Product** — own price, own inventory, own images, own tags (`accessory`, `accessory:lighting`, `accessory:comfort`, etc. for the smart-collection facets from Part 1).
- **Compatibility is declared data, not frontend logic**: each pergola model Product carries a metafield of type "list of product references" (or a small `AccessoryCompatibility` Metaobject if the relationship needs its own attributes later, e.g. "requires professional install: true") listing which accessory products are available for it. The configurator queries this to populate its accessory step — compatibility is never hardcoded in a component.
- **Linkage at cart time**: when an accessory is added alongside a configured pergola, a line-item property (e.g., `_configuredFor: <pergola line item id>`) ties the two together for the merchant's order view and fulfilment picking, without affecting price, tax, or discount calculation in any way — those are governed entirely by the accessory's own real Product price.

---

## 5. Pricing Strategy

**Recommendation: Shopify's native pricing engine is the only source of truth for anything that appears on an invoice. The frontend never computes a price that isn't a direct read of a Shopify-provided number.**

| Component                                            | Mechanism                                                                                                                                                                                                                                                                                                                                        | Replaces this placeholder                                                                                                                                                                                        |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Base price**                                       | The model's default-variant `Money` price, read from the Storefront API                                                                                                                                                                                                                                                                          | `BASE_PRICE = 11900` in `features/configurator/constants.ts`                                                                                                                                                     |
| **Variant adjustments** (size, colour, motorization) | Each variant's own native Shopify price — Shopify computes the "selected combination's price" out of the box                                                                                                                                                                                                                                     | The `priceDelta` field on every `ConfigOption`                                                                                                                                                                   |
| **Accessory pricing**                                | Each accessory's own Product/variant price, summed as additional cart line items                                                                                                                                                                                                                                                                 | The `priceDelta` field on every `Accessory`                                                                                                                                                                      |
| **Installation pricing**                             | A Service Product line (flat, per region tier) to start; a **Shopify Function-based Cart Transform** only if/when true formula-based pricing (by distance, by model complexity) becomes a real business requirement                                                                                                                              | Not yet placeholder-modeled in the shipped code — introduce simple first, since a Cart Transform is meaningfully more implementation cost and isn't justified until the flat-tier model demonstrably doesn't fit |
| **Shipping**                                         | Freight/white-glove delivery for made-to-order pergolas is quoted at consultation (matches the site's existing "confirmed at consultation" copy pattern already used in the Configurator Preview and Final CTA) rather than computed at checkout; small-parcel accessories/parts ordered standalone use Shopify's native real-time carrier rates | —                                                                                                                                                                                                                |
| **Taxes**                                            | Shopify Tax (native), keyed correctly off each product's Standard Product Taxonomy category (Part 1) since some jurisdictions have category-dependent tax rules                                                                                                                                                                                  | —                                                                                                                                                                                                                |
| **Promotional pricing**                              | Shopify's native discount engine — automatic discounts, discount codes, and Shopify Functions for anything rules-based that the native discount UI can't express                                                                                                                                                                                 | —                                                                                                                                                                                                                |
| **"Was / now" pricing**                              | Each variant's native `compareAtPrice` field                                                                                                                                                                                                                                                                                                     | —                                                                                                                                                                                                                |

**Why this matters more than it sounds:** the current placeholder pricing (`calculatePreviewPrice`, now living in `src/utils/formatPrice.ts` + `features/configurator/utils/pricing.ts`) exists _specifically_ because there is no live Shopify data yet — it was never meant to become the production pricing engine, and this document is the explicit confirmation that it doesn't. Once variants are live, price computation stops being "sum some JS numbers" and becomes "read the number Shopify already computed for this exact selection" — which is also what prevents the classic headless-commerce bug where a promotion, a currency conversion, or a tax rule updates in Shopify but the frontend's cached mental model of the price doesn't.

---

## 6. Configurator Data Model

This generalizes the shipped `ConfigStep` / `ConfigOption` / `Accessory` / `PreviewSelection` shapes (`features/configurator/types/index.ts`) from a hardcoded 4-step flow into a data-driven one, without changing the _shape_ those types already commit to — only where the data comes from.

### Flow

```
Model selection (which Product)
  → Size (variant option)
  → Colour / Finish (variant option)
  → Motorization (variant option, only if the selected product has this option)
  → Accessories (multi-select, from the model's AccessoryCompatibility list)
  → Installation option (Service Product or computed line)
  → Add to Cart
```

### User selections & dependencies

The configurator's step list is **derived from the live product's actual options array**, not from a static constant — `ConfigStepId` generalizes from today's fixed `"model" | "size" | "finish" | "roof"` union to "whatever option names this product actually has." This is the mechanism that makes dependency handling correct by construction rather than by hand-maintained rules: if the selected model doesn't have a Motorization option (e.g., Fixed Panel), the Motorization step simply isn't in that product's options array, so it never renders — there is no separate "is this step visible" logic to keep in sync with the catalogue.

### Validation & unavailable combinations

Shopify's variant system inherently prevents an invalid combination from existing: a variant either exists for a given option-value tuple or it doesn't. The configurator calls the Storefront API's variant-matching (`variantBySelectedOptions`) for the current selection; a `null` result means "not currently sellable" and the UI greys out that combination — **never** a hand-maintained "valid combinations" table living in the frontend, which drifts the moment merchandising adjusts what's actually offered. Accessory-level compatibility (which isn't expressible via Shopify variants at all) is validated the same way conceptually — against the `AccessoryCompatibility` reference from Part 4, not a parallel frontend rule set.

### Price updates

Every selection change re-resolves: the live variant's price + the sum of currently-selected accessory prices. No client-side delta math survives once this is live (Part 5).

### SKU generation

Shopify auto-generates or accepts merchant-set SKUs per variant at creation time (Admin API / bulk import) — never generated client-side. A recommended convention: `PGL-{MODEL}-{SIZE}-{COLOUR}-{MOTOR}` (e.g., `PGL-ATLV-10X13-GRPH-MOTR`), set once per variant, stable for the variant's lifetime.

### Lead-time updates

A `leadTimeWeeks` (or structured min/max range) metafield on the Product or Variant replaces today's hardcoded `leadTimeByRoof` map — ops can adjust manufacturing-capacity-driven lead times without a frontend deploy.

### Image updates

Shopify's native per-variant image field replaces today's hardcoded `configurator-{finish}.jpg` mapping — selecting a colour swaps the configurator preview to that variant's actual assigned image, sourced the same way the rest of the PDP's gallery is.

### Future 3D support

Reserve a 3D/AR media slot now, even unpopulated: Shopify Media natively supports a `Model3d` media type on Product. Consuming it later (a `<model-viewer>`/WebXR component reading the same `.glb`/`.usdz` file Shopify already hosts) requires no new asset pipeline and no schema change — only a new component that reads a field the data model already has room for.

---

## 7. Shopify Data Architecture

| Shopify concept          | What lives here                                                                                                                                                                             | What does not                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Products**             | Model lines, accessories, service products, replacement parts                                                                                                                               | Marketing/editorial content (Sanity, Part 8)                                                                                                                                                        |
| **Variants**             | Size × Colour × (Motorization, where applicable) per product                                                                                                                                | Roof type, accessories, installation options (Part 2–4)                                                                                                                                             |
| **Collections**          | Manual browse taxonomy + tag-driven smart collections (Part 1)                                                                                                                              | —                                                                                                                                                                                                   |
| **Metaobjects**          | `AccessoryCompatibility`, `InstallationRegion` / service-area definitions, structured `WarrantyTerms` reused across products                                                                | A substitute for a real, purchasable Product (Part 4)                                                                                                                                               |
| **Metafields**           | Structural specs (wind/snow rating, warranty term, install time, lead time), fulfilment-type flag, 3D/AR asset references, accessory-compatibility list, Standard Product Taxonomy category | Anything that needs its own price, inventory, or line-item existence — that's a Product                                                                                                             |
| **Files**                | Spec-sheet PDFs, install manuals, warranty documents attached to a specific product                                                                                                         | General marketing downloads not tied to a specific product's spec sheet (Sanity, Part 8)                                                                                                            |
| **Customer data**        | Identity, order history, saved addresses, marketing consent                                                                                                                                 | Which projects/photos a customer's install used (Sanity/Cloudinary, cross-referenced by order ID — Shopify is system-of-record for identity/orders/consent only, not for editorial project content) |
| **Cart attributes**      | Whole-cart context (e.g., `referredBySalesRep`, `consultationBookingId` linking a configurator session that started from a booked consultation)                                             | Per-line context — that's a line-item property                                                                                                                                                      |
| **Line item properties** | Per-item configurator context: accessory-belongs-to-pergola linkage (Part 4), chosen sub-options not modeled as variants, customer-entered install notes                                    | Anything priced (Part 5)                                                                                                                                                                            |
| **Selling plans**        | Reserved for future subscription/service-plan products (Part 12)                                                                                                                            | The core one-time pergola purchase                                                                                                                                                                  |

---

## 8. Sanity CMS

**What belongs in Sanity, and why**, following directly from the guiding principle: Sanity owns story and marketing structure; Shopify owns commerce facts.

| Content                                                                                     | Home                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Homepage                                                                                    | Sanity (per `ARCHITECTURE.md` §7's existing section-registry singleton)                                                                                                                                                                                            |
| Projects / case studies                                                                     | Sanity — cross-references a Shopify product handle by string (not a hard reference), since Shopify remains the system of record for what that model actually is                                                                                                    |
| Buying Guides                                                                               | Sanity                                                                                                                                                                                                                                                             |
| FAQs (general/informational — delivery, warranty terms in plain language, ordering process) | Sanity, already shipped as `features/faq` on the homepage                                                                                                                                                                                                          |
| Testimonials                                                                                | Sanity, already shipped as `features/testimonials`                                                                                                                                                                                                                 |
| Comparison Tables                                                                           | **Hybrid, not purely one or the other** — see below                                                                                                                                                                                                                |
| Landing Pages                                                                               | Sanity                                                                                                                                                                                                                                                             |
| Navigation                                                                                  | Sanity singleton, with `config/nav.ts` as the static fallback (already the documented pattern)                                                                                                                                                                     |
| SEO (page-level overrides)                                                                  | Sanity `seo` object type, falling back to `siteSettings`                                                                                                                                                                                                           |
| Downloads                                                                                   | Sanity, for general brochure/guide downloads not tied to one product's spec sheet — a product-specific spec-sheet PDF lives in Shopify Files instead (Part 7), since it's commerce-bound content that must stay attached to the exact product/variant it describes |

**Comparison Tables deserve their own note** because the homepage already shipped a comparison feature (`features/product/components/ComparisonTable.tsx`) sourced entirely from static `constants.ts`. The long-term architecture is a join, not a migration of the whole thing to one system: **row labels and marketing framing** (which specs matter enough to show, how they're phrased) are Sanity's job — that's editorial judgment. **The actual values in each cell** (the real wind rating, the real price) must come from Shopify metafields/variant prices at request time, because a comparison table showing a stale or hand-typed spec value that disagrees with the PDP is exactly the "two systems disagree" failure this document exists to prevent. The component doesn't need to change shape for this — only its data source, from a single static array to a merge of a Sanity row-definition query and a Shopify metafield read per model.

---

## 9. Search Strategy

Builds directly on `ARCHITECTURE.md` §6's already-decided `services/search.ts` merge point (Shopify commerce results + Sanity editorial results), with the specifics filled in:

- **Search**: Shopify's native Storefront `search`/`predictiveSearch` queries for products; a parallel Sanity GROQ full-text query for editorial content (Projects, Buying Guides); merged at the service layer, never inside a component.
- **Filtering**: Shopify's collection-query filter facets (`filters`/`productFilters`), which return _available_ facets with live counts — never a hardcoded filter option list, which would show a facet with zero matching results.
- **Sorting**: Shopify's native collection sort keys (price, best-selling, newest, relevance) — no custom sort logic needed.
- **Autocomplete**: Shopify's `predictiveSearch` query returns typeahead-ready product/collection/page suggestions (with images) directly — no separate autocomplete index needed for launch.
- **Synonyms**: a known, explicit gap — Shopify's native search has limited merchant-configurable synonym support. Documented here rather than silently discovered later.
- **Future Algolia**: introduce only when synonym management, typo-tolerance, or merchandised ranking becomes a real business need (i.e., justified by catalogue size/traffic, not adopted speculatively) — fed via a scheduled sync job triggered by Shopify webhooks. Architect `features/search` against a `lib/search` interface from day one, mirroring the isolation principle `ARCHITECTURE.md` already applies to `lib/shopify`, so swapping the backing search engine later is a `lib/` change, not a component rewrite.

---

## 10. Inventory & Fulfilment

| Product type                                          | Inventory policy                                                                                                                                                                                                                                                                                                | Fulfilment                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Standard (in-stock) products** — accessories, parts | Native Shopify tracked inventory, real stock counts, per variant                                                                                                                                                                                                                                                | Standard automatic fulfilment                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Custom / made-to-order pergolas**                   | Inventory tracking **disabled** (or repurposed as a soft "production slot" count if manufacturing capacity truly needs a hard cap); `inventoryPolicy: CONTINUE` so "no stock" never blocks a sale that's actually buildable — paired with the honest lead-time messaging from Part 6, never a fake stock number | Manual/custom fulfilment workflow — see below                                                                                                                                                                                                                                                                                                                                                                                        |
| **Accessories bundled into a configured order**       | Normal tracked inventory (they're physical, stocked items even when sold alongside a made-to-order pergola)                                                                                                                                                                                                     | Coordinated with the pergola's fulfilment via the line-item linkage from Part 4                                                                                                                                                                                                                                                                                                                                                      |
| **Made-to-order fulfilment generally**                | —                                                                                                                                                                                                                                                                                                               | A Shopify Custom Fulfillment Service, or at minimum explicit order tagging + a fulfilment-stage metafield (`Awaiting Manufacturing` → `In Production` → `Scheduled for Delivery` → `Installed`) surfaced to the customer via Order Tracking (Part 11) — Shopify's default assumption of "ship from stock" does not fit a manufacture-then-install order, so this must be modeled explicitly rather than forced into the default flow |

**Future warehouse expansion**: model each regional install-hub/warehouse as a Shopify **Location** — inventory-tracked accessory stock allocated per location for faster regional fulfilment. Made-to-order pergolas themselves aren't location-bound (manufactured centrally), so installation-crew scheduling should reference the nearest crew via a lightweight tag/metafield, not by overloading Shopify Locations (an inventory construct) to represent a service territory it wasn't built to model.

---

## 11. Customer Journey

```
Homepage
  ↓  category tiles link to live Shopify collections
Collection
  ↓  Collection page queries live Shopify data (config/collections.ts becomes
     the static fallback/display-metadata layer, exactly as its own doc
     comment already states)
Product (PDP)
  ↓  getProductByHandle resolves the full product + variants + images +
     metafields in one query (ARCHITECTURE.md §6)
Configurator
  ↓  Not a separate step in the funnel so much as the PDP's primary
     interaction — selecting size/colour/accessories progressively resolves
     the live variant and updates price/image/lead-time in place (Part 6).
     The dedicated "/configurator" route already reserved in
     `constants/routes.ts` hosts a more guided, step-by-step presentation of
     the exact same underlying data model/hooks for marketing-driven entry
     points (Hero, Final CTA) — one configurator engine, two presentations,
     never two implementations.
Cart
  ↓  "Add to Cart" creates/updates a Shopify Cart via Server Actions
     (createCart/addCartLines, per ARCHITECTURE.md §6), adding the resolved
     variant plus any selected accessory products as separate, linked lines
Checkout
  ↓  Hand off to Shopify's hosted checkoutUrl — not rebuilt (already decided,
     ARCHITECTURE.md §6; rebuilding PCI-scoped payment UI is a compliance
     liability, not an architecture win)
Confirmation
  ↓  Shopify's native order-status/thank-you page
Order Tracking
  ↓  features/customer's order history (Customer Account API), augmented
     with the fulfilment-stage metafield from Part 10 so made-to-order
     status reads as "In Production" rather than a bare "Unfulfilled"
Installation
  ↓  The storefront surfaces STATUS and lets the customer confirm/reschedule
     an appointment; actual crew dispatch/scheduling logistics stay in
     dedicated field-service software, not rebuilt inside this app — the
     storefront is a status mirror, not the operational system of record
Warranty Registration
     Post-install prompt (Customer Account Server Action) writes
     warrantyRegisteredAt/ExpiresAt — modeled as order metafields, since
     warranty is fundamentally commerce/product-bound data and doesn't need
     a second, parallel system of record
```

---

## 12. Future Scalability

| Capability                                                  | Mechanism                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dealer accounts, trade pricing, B2B, wholesale              | Shopify B2B (Plus): Company/Location customer objects, Catalogs for per-customer price lists, Payment Terms (net-30, etc.). Architect an `accountType: "retail" \| "trade" \| "dealer"` concept in the account area now, even before B2B is switched on, so the branch point already exists.                                                                                           |
| Internationalization, multiple currencies                   | Shopify Markets for commerce-side localization (currency, duties, regional pricing/content); paired with a UI-string localization library (a separate concern — Markets doesn't localize component copy). Sanity content needs its own localization strategy (field-level or document-per-locale) kept conceptually in sync with the Markets region list, not solved by Markets alone. |
| Multiple warehouses                                         | Shopify Locations (Part 10).                                                                                                                                                                                                                                                                                                                                                           |
| Additional product categories (furniture, outdoor kitchens) | Already designed for, not deferred — Part 1's catalogue strategy is category-agnostic by construction. A new category is a new Collection + new category-scoped metafield definitions, never a rework of the catalogue mechanism.                                                                                                                                                      |
| AR / 3D Configurator                                        | The reserved 3D/AR metafield slot (Part 6) plus Shopify's native 3D media type — no separate asset pipeline required when this is built.                                                                                                                                                                                                                                               |
| AI recommendations                                          | Shopify's native `productRecommendations` query as the zero-extra-infrastructure baseline; a more advanced personalization layer later sits behind a `lib/recommendations` interface, mirroring the same isolation principle already applied to search (Part 9) and Shopify access generally (`ARCHITECTURE.md` §6).                                                                   |
| Subscriptions                                               | Shopify Selling Plans (Part 7), reserved for maintenance/service-plan products specifically — not the core one-time pergola purchase, which stays a standard order.                                                                                                                                                                                                                    |

---

## 13. Technical Recommendations

- **Storefront API**: pin an explicit API version (matches `.env.example`'s `SHOPIFY_STOREFRONT_API_VERSION`); generate types via GraphQL codegen (`@graphql-codegen/cli`, already a devDependency) rather than hand-typing responses — one source of truth for the wire shape.
- **Caching**: Next.js fetch caching with resource-scoped tags (`product-${handle}`, `collection-${handle}`), invalidated by Shopify webhooks hitting `/api/webhooks/shopify` → `revalidateTag` — so a price or inventory change propagates immediately rather than waiting out a fixed ISR window.
- **Server Components**: product/collection pages fetch directly as Server Components (no client-side waterfall); only configurator selection state and cart mutations are Client Components/Server Actions — the same "Server Components by default" rule already enforced across the homepage.
- **ISR / Partial Prerendering**: the static shell (layout, non-price marketing content) prerenders; price/availability-sensitive fragments use Partial Prerendering (or a narrowly-scoped dynamic segment) so a page isn't forced fully dynamic just because one number on it must stay live.
- **Error handling**: every `lib/shopify` query returns a typed success/failure result; Server Components render the existing `error-state`/`empty-state` UI components rather than an unhandled throw. Cart mutation Server Actions return a typed state object — the same pattern already established by `actions/subscribeNewsletter.ts`'s `SubscribeNewsletterState` — so failures render inline instead of a full page reload.
- **Optimistic updates**: cart line changes update the zustand store immediately, reconciled against the Server Action's real response (`ARCHITECTURE.md` §6); configurator price display updates instantly from the already-fetched product's local variant match, since that resolution is a pure function over data already in hand, not itself a new network round-trip.
- **Cart persistence**: cart ID in an HTTP-only cookie (already decided) — never `localStorage`. Anonymous carts merge into the authenticated customer's cart on login via Shopify's native cart-customer association.
- **Authentication**: Shopify's newer, OAuth-based Customer Account API rather than legacy classic customer accounts, for durability as Shopify continues moving the platform toward it; session token in an HTTP-only cookie, never `localStorage`.
- **Performance**: one Storefront API round-trip per PDP — product + all variants + images + metafields composed via shared fragments (already the plan in `ARCHITECTURE.md` §6). Accessory compatibility resolves via the metafield's referenced products _inside that same query_ (GraphQL nested reference resolution), not a second round-trip per accessory.

---

## Summary: what changes in already-shipped code, and when

Nothing changes today. This document defines the target state for when Shopify is actually wired up. At that point:

- `features/configurator/constants.ts`'s `BASE_PRICE`, `priceDelta` fields, `leadTimeByRoof`, and the `configurator-{finish}.jpg` image map are replaced by live Storefront API reads — the `ConfigStep`/`ConfigOption`/`Accessory`/`PreviewSelection` _shapes_ don't need to change, only their data source.
- `features/product/constants.ts`'s `pergolaModels` array is replaced by `getProductByHandle` calls keyed on the same three handles already in use, with `specs` sourced from metafields instead of hardcoded strings.
- `config/collections.ts` becomes the static fallback for the four Shopify Collections it already names.
- The homepage's static comparison table gains a live-data join (Part 8) without a component rewrite.

No UI work, no component changes, and no page layouts were produced as part of this document, per this phase's scope.
