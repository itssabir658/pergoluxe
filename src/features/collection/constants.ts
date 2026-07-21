import { ROUTES } from "@/constants/routes";
import type {
  CollectionContent,
  CollectionProduct,
  SortOption,
} from "@/features/collection/types";

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "best-selling", label: "Best Selling" },
  { value: "most-popular", label: "Most Popular" },
];

/**
 * PLACEHOLDER CATALOGUE — pending real Shopify products. Prices, specs,
 * and lead times for the three canonical models (`fixed-panel`,
 * `attached-louvered`, `freestanding-louvered`) are copied verbatim from
 * `features/product/constants.ts` and `features/configurator/constants.ts`
 * (size/colour labels, accessory prices) so this listing page can never
 * quote a different number than the comparison table, configurator, or
 * homepage for the same product — the same rule those files already state
 * for each other. `pergolaModelId` on those three is what lets "Quick
 * Compare" reuse `features/product`'s existing `ComparisonTable` rather
 * than a second comparison implementation.
 *
 * The remaining products (a second freestanding pergola, two enclosures,
 * five accessories) exist to make every collection and filter facet in
 * this milestone demonstrable with more than one or two cards — they are
 * not `pergolaModelId`-bearing, so they're correctly excluded from Quick
 * Compare (comparing an LED kit against a pergola isn't a comparison).
 */
export const products: CollectionProduct[] = [
  {
    id: "fixed-panel",
    handle: "fixed-panel-pergola",
    name: "Fixed Panel Pergola",
    collectionHandles: ["attached-pergolas"],
    model: "Fixed Panel",
    roofType: "Fixed Panel",
    motorized: false,
    size: "10′ × 10′",
    colour: "Graphite Black",
    windRatingMph: 120,
    snowLoadPsf: 40,
    startingPrice: 11900,
    financeAvailable: true,
    warrantyYears: 10,
    availability: "made-to-order",
    leadTimeWeeks: [6, 10],
    image: {
      src: "/images/collection-attached-pergolas.jpg",
      alt: "Fixed panel pergola",
    },
    hoverImage: {
      src: "/images/configurator-bronze.jpg",
      alt: "Fixed panel pergola in anodized bronze",
    },
    keySpecs: [
      { label: "Wind rating", value: "120 mph" },
      { label: "Snow load", value: "40 psf" },
      { label: "Install time", value: "1 day" },
    ],
    pergolaModelId: "fixed-panel",
    href: ROUTES.product("fixed-panel-pergola"),
  },
  {
    id: "attached-louvered",
    handle: "attached-louvered-pergola",
    name: "Attached Louvered Pergola",
    collectionHandles: ["attached-pergolas", "louvered-roofs"],
    model: "Attached Louvered",
    roofType: "Motorized Louvers",
    motorized: true,
    size: "10′ × 13′",
    colour: "Graphite Black",
    windRatingMph: 110,
    snowLoadPsf: 35,
    startingPrice: 16100,
    financeAvailable: true,
    warrantyYears: 10,
    availability: "made-to-order",
    leadTimeWeeks: [6, 10],
    image: {
      src: "/images/collection-louvered-roofs.jpg",
      alt: "Attached louvered pergola",
    },
    hoverImage: {
      src: "/images/configurator-alpine.jpg",
      alt: "Attached louvered pergola in alpine white",
    },
    keySpecs: [
      { label: "Wind rating", value: "110 mph" },
      { label: "Motorized", value: "Yes" },
      { label: "Install time", value: "1–2 days" },
    ],
    pergolaModelId: "attached-louvered",
    href: ROUTES.product("attached-louvered-pergola"),
  },
  {
    id: "freestanding-louvered",
    handle: "freestanding-louvered-pergola",
    name: "Freestanding Louvered Pergola",
    collectionHandles: ["freestanding-pergolas", "louvered-roofs"],
    model: "Freestanding Louvered",
    roofType: "Motorized Louvers",
    motorized: true,
    size: "13′ × 16′",
    colour: "Anodized Bronze",
    windRatingMph: 110,
    snowLoadPsf: 35,
    startingPrice: 17500,
    financeAvailable: true,
    warrantyYears: 10,
    availability: "made-to-order",
    leadTimeWeeks: [6, 10],
    image: {
      src: "/images/collection-freestanding-pergolas.jpg",
      alt: "Freestanding louvered pergola",
    },
    hoverImage: {
      src: "/images/configurator-graphite.jpg",
      alt: "Freestanding louvered pergola in graphite black",
    },
    keySpecs: [
      { label: "Wind rating", value: "110 mph" },
      { label: "Motorized", value: "Yes" },
      { label: "Install time", value: "2 days" },
    ],
    pergolaModelId: "freestanding-louvered",
    href: ROUTES.product("freestanding-louvered-pergola"),
  },
  {
    id: "freestanding-fixed-panel",
    handle: "freestanding-fixed-panel-pergola",
    name: "Freestanding Fixed Panel Pergola",
    collectionHandles: ["freestanding-pergolas"],
    model: "Fixed Panel",
    roofType: "Fixed Panel",
    motorized: false,
    size: "10′ × 10′",
    colour: "Alpine White",
    windRatingMph: 120,
    snowLoadPsf: 40,
    startingPrice: 13300,
    financeAvailable: true,
    warrantyYears: 10,
    availability: "made-to-order",
    leadTimeWeeks: [6, 10],
    image: {
      src: "/images/collection-freestanding-pergolas.jpg",
      alt: "Freestanding fixed panel pergola",
    },
    hoverImage: {
      src: "/images/configurator-graphite.jpg",
      alt: "Freestanding fixed panel pergola in graphite black",
    },
    keySpecs: [
      { label: "Wind rating", value: "120 mph" },
      { label: "Snow load", value: "40 psf" },
      { label: "Install time", value: "1 day" },
    ],
    href: ROUTES.product("freestanding-fixed-panel-pergola"),
  },
  {
    id: "screen-enclosure",
    handle: "screen-enclosure-kit",
    name: "Screen Enclosure Kit",
    collectionHandles: ["enclosures"],
    roofType: "Screen Enclosure",
    colour: "Charcoal Mesh",
    startingPrice: 3200,
    financeAvailable: true,
    warrantyYears: 5,
    availability: "in-stock",
    image: {
      src: "/images/collection-enclosures.jpg",
      alt: "Retractable screen enclosure",
    },
    hoverImage: {
      src: "/images/project-courtyard-restaurant-canopy.jpg",
      alt: "Screen enclosure installed on a courtyard canopy",
    },
    keySpecs: [
      { label: "Retract time", value: "Under 30 sec" },
      { label: "Mesh", value: "UV-resistant" },
    ],
    href: ROUTES.product("screen-enclosure-kit"),
  },
  {
    id: "glass-wall-enclosure",
    handle: "glass-wall-enclosure",
    name: "Glass Wall Enclosure",
    collectionHandles: ["enclosures"],
    roofType: "Glass Enclosure",
    colour: "Clear Tempered",
    startingPrice: 8600,
    financeAvailable: true,
    warrantyYears: 10,
    availability: "made-to-order",
    leadTimeWeeks: [4, 6],
    image: { src: "/images/collection-enclosures.jpg", alt: "Glass wall enclosure" },
    hoverImage: {
      src: "/images/project-garden-pavilion.jpg",
      alt: "Glass wall enclosure installed on a garden pavilion",
    },
    keySpecs: [
      { label: "Panel type", value: "Tempered glass" },
      { label: "Install time", value: "1 day" },
    ],
    href: ROUTES.product("glass-wall-enclosure"),
  },
  {
    id: "led-lighting-kit",
    handle: "led-lighting-kit",
    name: "Perimeter LED Lighting Kit",
    collectionHandles: ["accessories"],
    colour: "Warm White",
    startingPrice: 1150,
    warrantyYears: 2,
    availability: "in-stock",
    image: {
      src: "/images/accessory-led-lighting-kit.jpg",
      alt: "Perimeter LED lighting kit",
    },
    keySpecs: [
      { label: "Control", value: "App + remote" },
      { label: "Colour temp", value: "2700K–6500K" },
    ],
    href: ROUTES.product("led-lighting-kit"),
  },
  {
    id: "retractable-screens",
    handle: "retractable-screens",
    name: "Retractable Screens",
    collectionHandles: ["accessories"],
    startingPrice: 2400,
    warrantyYears: 5,
    availability: "made-to-order",
    leadTimeWeeks: [2, 4],
    image: {
      src: "/images/accessory-retractable-screens.jpg",
      alt: "Retractable motorized screens",
    },
    keySpecs: [
      { label: "Operation", value: "Motorized" },
      { label: "Retract time", value: "Under 20 sec" },
    ],
    href: ROUTES.product("retractable-screens"),
  },
  {
    id: "infrared-heater",
    handle: "infrared-heater",
    name: "Infrared Heater",
    collectionHandles: ["accessories"],
    startingPrice: 1800,
    warrantyYears: 3,
    availability: "in-stock",
    image: { src: "/images/accessory-infrared-heater.jpg", alt: "Infrared patio heater" },
    keySpecs: [
      { label: "Heat output", value: "1500W" },
      { label: "Coverage", value: "~130 sq ft" },
    ],
    href: ROUTES.product("infrared-heater"),
  },
  {
    id: "smart-remote",
    handle: "smart-remote-control",
    name: "Smart Remote Control",
    collectionHandles: ["accessories"],
    startingPrice: 220,
    warrantyYears: 2,
    availability: "in-stock",
    image: {
      src: "/images/accessory-smart-remote-control.jpg",
      alt: "Smart remote control",
    },
    keySpecs: [
      { label: "Range", value: "Up to 100 ft" },
      { label: "Compatibility", value: "All motorized models" },
    ],
    href: ROUTES.product("smart-remote-control"),
  },
  {
    id: "wind-rain-sensor",
    handle: "wind-rain-sensor",
    name: "Wind & Rain Sensor",
    collectionHandles: ["accessories"],
    startingPrice: 340,
    warrantyYears: 2,
    availability: "in-stock",
    image: { src: "/images/accessory-wind-rain-sensor.jpg", alt: "Wind and rain sensor" },
    keySpecs: [
      { label: "Trigger", value: "Auto-close on wind or rain" },
      { label: "Range", value: "Up to 100 ft" },
    ],
    href: ROUTES.product("wind-rain-sensor"),
  },
];

/**
 * CMS-EDITABLE COPY PLACEHOLDER, keyed by collection handle (matching
 * `config/collections.ts` for the four existing collections, plus
 * `accessories` — added here rather than to that file since the mega menu's
 * taxonomy is a Navigation-milestone decision this milestone doesn't touch).
 * Every field maps directly to the future Sanity `collectionPage` document
 * described in PRODUCT_LISTING.md's Sanity integration plan.
 */
export const collectionContent: Record<string, CollectionContent> = {
  "attached-pergolas": {
    handle: "attached-pergolas",
    heroImage: {
      src: "/images/collection-attached-pergolas.jpg",
      alt: "Attached pergola mounted to a home",
    },
    heroEyebrow: "Attached Pergolas",
    heroTitle: "An architectural extension of your home.",
    heroSupportingCopy:
      "Mounted directly to your home's structure for a seamless transition from indoor to outdoor living — engineered wind and snow load ratings built in, not bolted on.",
    heroPrimaryCta: { label: "Design Your Pergola", href: ROUTES.configurator },
    heroStats: [
      { value: "120 mph", label: "Max wind rating" },
      { value: "10-Year", label: "Structural warranty" },
      { value: "1–2 Days", label: "Typical install" },
    ],
    introHeading: "Two systems, one standard of engineering",
    introBody:
      "Every attached pergola shares the same certified frame and finish quality — the choice between a Fixed Panel and a Motorized Louvered roof comes down to how much control you want over sun and rain, not how well-built either one is.",
    seoHeading: "Choosing an attached pergola",
    seoOverview:
      "An attached pergola mounts to your home's existing structure, sharing its footing and extending your roofline rather than standing independently. That mounting is what makes it the most cost-efficient way to add engineered outdoor shade — you're not paying for a second freestanding structure's worth of footings and posts. It suits homes where the patio, kitchen, or living room already opens onto a usable outdoor footprint along an exterior wall.",
    seoFaqs: [
      {
        id: "attachment",
        question: "Can any wall support an attached pergola?",
        answer:
          "Most masonry, brick, and properly-framed stucco or siding walls can, once a structural attachment point is confirmed at your free consultation — this is checked before any order is finalized, not after.",
      },
      {
        id: "fixed-vs-louvered",
        question: "Fixed Panel or Motorized Louvered — how do I choose?",
        answer:
          "Fixed Panel gives permanent, maintenance-free shade at the lowest price point. Motorized Louvered costs more but lets you open the roof fully on mild days and close it completely before rain — most homeowners extending a kitchen or living room choose louvered for that flexibility.",
      },
    ],
    seoInternalLinks: [
      { label: "Compare all pergola models", href: "/#compare" },
      {
        label: "Freestanding Pergolas",
        href: ROUTES.collection("freestanding-pergolas"),
      },
      { label: "Louvered Roof Systems", href: ROUTES.collection("louvered-roofs") },
    ],
    buyingGuide: {
      heading: "Not sure an attached pergola is right for your home?",
      body: "Our buying guide walks through mounting requirements, permit considerations, and how to tell if your space suits attached or freestanding.",
      cta: { label: "Read the Buying Guide", href: ROUTES.buyingGuides },
      image: {
        src: "/images/project-lakeside-outdoor-kitchen.jpg",
        alt: "Attached pergola over an outdoor kitchen",
      },
    },
  },
  "freestanding-pergolas": {
    handle: "freestanding-pergolas",
    heroImage: {
      src: "/images/collection-freestanding-pergolas.jpg",
      alt: "Freestanding pergola beside a pool",
    },
    heroEyebrow: "Freestanding Pergolas",
    heroTitle: "Shade, anywhere on your property.",
    heroSupportingCopy:
      "No structural attachment required — freestanding systems go poolside, mid-garden, or anywhere else your home's exterior wall can't reach, with the same engineering standard as every attached model.",
    heroPrimaryCta: { label: "Design Your Pergola", href: ROUTES.configurator },
    heroStats: [
      { value: "120 mph", label: "Max wind rating" },
      { value: "10-Year", label: "Structural warranty" },
      { value: "No", label: "Structural attachment" },
    ],
    introHeading: "Independent by design",
    introBody:
      "A freestanding pergola carries its own load on four footings, so it can go wherever the space calls for it — a pool deck, a detached patio, the middle of a garden — without touching your home's structure at all.",
    seoHeading: "Choosing a freestanding pergola",
    seoOverview:
      "A freestanding pergola stands on its own footings rather than sharing a load-bearing wall, which is the right choice whenever the space you want covered isn't directly against your home — a pool deck, a detached entertaining area, or a garden pavilion. It costs somewhat more than an equivalent attached system (four footings instead of a wall connection) but places no constraints on where it goes.",
    seoFaqs: [
      {
        id: "footings",
        question: "What kind of foundation does a freestanding pergola need?",
        answer:
          "Four engineered concrete footings, sized to your model and local frost line — confirmed during your site visit, not estimated from a floor plan.",
      },
      {
        id: "poolside",
        question: "Is a freestanding pergola safe to install poolside?",
        answer:
          "Yes — this is one of the most common placements. Finish options are chosen to resist chlorine/salt exposure, and drainage is engineered to route water away from the pool deck.",
      },
    ],
    seoInternalLinks: [
      { label: "Compare all pergola models", href: "/#compare" },
      { label: "Attached Pergolas", href: ROUTES.collection("attached-pergolas") },
      { label: "Louvered Roof Systems", href: ROUTES.collection("louvered-roofs") },
    ],
    buyingGuide: {
      heading: "Planning a poolside or garden installation?",
      body: "Our buying guide covers footing requirements, drainage planning, and how freestanding sizing works for open-yard spaces.",
      cta: { label: "Read the Buying Guide", href: ROUTES.buyingGuides },
      image: {
        src: "/images/project-hill-country-poolside.jpg",
        alt: "Freestanding pergola beside a pool",
      },
    },
  },
  "louvered-roofs": {
    handle: "louvered-roofs",
    heroImage: {
      src: "/images/collection-louvered-roofs.jpg",
      alt: "Motorized louvered roof system",
    },
    heroEyebrow: "Louvered Roof Systems",
    heroTitle: "Sun and rain, on your terms.",
    heroSupportingCopy:
      "Motorized aluminum louvers rotate from fully open to fully closed in seconds — available on both attached and freestanding mounts, controlled from an app, a remote, or a wall switch.",
    heroPrimaryCta: { label: "Design Your Pergola", href: ROUTES.configurator },
    heroStats: [
      { value: "110 mph", label: "Max wind rating" },
      { value: "35 psf", label: "Snow load, closed" },
      { value: "App", label: "+ remote control" },
    ],
    introHeading: "One roof, both mounting styles",
    introBody:
      "The louvered system itself is identical whether it's mounted to your home or standing freestanding — this collection groups both so you can compare the roof technology first and decide on mounting after.",
    seoHeading: "How motorized louvered roofs work",
    seoOverview:
      "A louvered roof is made of individually-rotating aluminum blades on a shared drive shaft, motorized to open (for full sun and airflow) or close completely (for rain protection) in under a minute. Unlike a fixed panel, it gives you both states from the same structure — the tradeoff is a higher price point and one motorized component to maintain, checked during your annual service visit if you opt into one.",
    seoFaqs: [
      {
        id: "power",
        question: "Does a louvered roof need a dedicated power run?",
        answer:
          "Yes — a standard 120V outlet run to the motor housing, which your installation crew handles as part of the scheduled install, not a separate electrician visit.",
      },
      {
        id: "manual-override",
        question: "What happens if the motor loses power?",
        answer:
          "Every motorized system ships with a manual crank override, so a power outage never leaves the roof stuck in one position.",
      },
    ],
    seoInternalLinks: [
      { label: "Compare all pergola models", href: "/#compare" },
      { label: "Attached Pergolas", href: ROUTES.collection("attached-pergolas") },
      {
        label: "Freestanding Pergolas",
        href: ROUTES.collection("freestanding-pergolas"),
      },
    ],
    buyingGuide: {
      heading: "Weighing motorized louvers against a fixed roof?",
      body: "Our buying guide compares upfront cost, long-term maintenance, and the actual day-to-day difference between fixed and louvered.",
      cta: { label: "Read the Buying Guide", href: ROUTES.buyingGuides },
      image: {
        src: "/images/project-rooftop-terrace-lounge.jpg",
        alt: "Louvered roof over a rooftop terrace lounge",
      },
    },
  },
  enclosures: {
    handle: "enclosures",
    heroImage: {
      src: "/images/collection-enclosures.jpg",
      alt: "Retractable glass and screen enclosure",
    },
    heroEyebrow: "Glass & Screen Enclosures",
    heroTitle: "Extend the season, not just the shade.",
    heroSupportingCopy:
      "Retractable glass and screen walls close in an existing pergola against wind, insects, and cooler evenings — retracting fully out of sight when you don't need them.",
    heroPrimaryCta: { label: "Design Your Pergola", href: ROUTES.configurator },
    heroStats: [
      { value: "<30 sec", label: "Full retraction" },
      { value: "2", label: "Enclosure types" },
      { value: "10-Year", label: "Warranty, glass panels" },
    ],
    introHeading: "Screen or glass, fully retractable either way",
    introBody:
      "A screen enclosure keeps insects and light wind out at the lowest cost; a glass wall enclosure adds real weather protection and extends usable months further into the shoulder seasons. Both retract completely when the weather doesn't call for them.",
    seoHeading: "Screen vs. glass enclosures",
    seoOverview:
      "Enclosures attach to an existing (or newly-installed) pergola's perimeter rather than replacing the roof — they're the difference between a shaded space and a fully weather-protected one. Screens handle insects and wind at a lower price; tempered glass panels add real thermal and weather protection, at roughly triple the cost, and suit climates with a longer cool season.",
    seoFaqs: [
      {
        id: "retrofit",
        question: "Can an enclosure be added to a pergola I already own?",
        answer:
          "In most cases, yes — a site visit confirms your existing structure's perimeter can accept the track system either enclosure type requires.",
      },
      {
        id: "climate",
        question: "Which enclosure suits a colder climate better?",
        answer:
          "Glass wall enclosures, since tempered glass panels provide meaningfully more thermal protection than mesh screens — worth the added cost if you're extending use well into fall or winter.",
      },
    ],
    seoInternalLinks: [
      { label: "Compare all pergola models", href: "/#compare" },
      { label: "Accessories", href: ROUTES.collection("accessories") },
      { label: "Louvered Roof Systems", href: ROUTES.collection("louvered-roofs") },
    ],
    buyingGuide: {
      heading: "Deciding between a screen and a glass enclosure?",
      body: "Our buying guide breaks down cost, climate fit, and installation timelines for both enclosure types.",
      cta: { label: "Read the Buying Guide", href: ROUTES.buyingGuides },
      image: {
        src: "/images/project-courtyard-restaurant-canopy.jpg",
        alt: "Screen-enclosed courtyard canopy",
      },
    },
  },
  accessories: {
    handle: "accessories",
    heroImage: {
      src: "/images/accessory-led-lighting-kit.jpg",
      alt: "Pergola accessories",
    },
    heroEyebrow: "Accessories",
    heroTitle: "Everything that makes it yours.",
    heroSupportingCopy:
      "Lighting, screens, heating, and control hardware — sold on their own, whether you're outfitting a new system or adding to one you already have.",
    heroPrimaryCta: { label: "Book Free Consultation", href: ROUTES.quote },
    heroStats: [
      { value: "5", label: "Accessory types" },
      { value: "In Stock", label: "Most items" },
      { value: "All Models", label: "Compatibility" },
    ],
    introHeading: "Sold separately, built to fit",
    introBody:
      "Every accessory here works with any current Pergoluxe system — whether you're adding it during your original configuration or ordering a replacement years later.",
    seoHeading: "Pergola accessories, explained",
    seoOverview:
      "Accessories extend what a pergola can do without changing the structure itself: lighting for evening use, screens or heating to extend the usable season, and remotes or sensors to control a motorized roof. Unlike the pergola models themselves, most accessories are in-stock, standard-fit items — no manufacturing lead time, and no obligation to buy them only as part of a new system.",
    seoFaqs: [
      {
        id: "replacement",
        question: "Can I buy a replacement part without a new pergola?",
        answer:
          "Yes — every accessory here is sold on its own; you don't need to be ordering a new system to buy a replacement remote, sensor, or lighting kit.",
      },
      {
        id: "compatibility",
        question: "Will these work with a pergola I bought elsewhere?",
        answer:
          "Compatibility is confirmed at checkout by model and roof type — most standard-mount hardware fits comparable third-party systems, but we recommend a quick call with support first.",
      },
    ],
    seoInternalLinks: [
      { label: "Attached Pergolas", href: ROUTES.collection("attached-pergolas") },
      {
        label: "Freestanding Pergolas",
        href: ROUTES.collection("freestanding-pergolas"),
      },
      { label: "Glass & Screen Enclosures", href: ROUTES.collection("enclosures") },
    ],
    buyingGuide: {
      heading: "Not sure which accessories you need?",
      body: "Our buying guide covers what each accessory actually does and which combinations homeowners choose most often.",
      cta: { label: "Read the Buying Guide", href: ROUTES.buyingGuides },
      image: {
        src: "/images/accessory-infrared-heater.jpg",
        alt: "Infrared heater accessory",
      },
    },
  },
};
