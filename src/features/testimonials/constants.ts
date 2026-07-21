import type { AggregateRating, Testimonial } from "@/features/testimonials/types";

/**
 * PLACEHOLDER TESTIMONIALS — written stand-ins that exist to design the
 * section's layout and typography, and nothing else. Fabricated reviews
 * presented as genuine are explicitly banned by the brand bible
 * (BRAND_IDENTITY.md §1) — these MUST be replaced with real, verifiable
 * customer reviews via Sanity (`features/testimonials/queries`, per
 * ARCHITECTURE.md §7's `testimonial` document) before launch. Names are
 * deliberately first-name-plus-initial so no entry reads as an
 * identifiable real person; the aggregate figures match the flagged
 * placeholders in config/trust.ts so no two sections quote different
 * numbers.
 */
export const aggregateRating: AggregateRating = {
  rating: 4.9,
  countLabel: "1,200+",
};

export const featuredTestimonial: Testimonial = {
  id: "featured-1",
  name: "Sarah K.",
  location: "Austin, TX",
  rating: 5,
  quote:
    "We expected a nice patio cover. What we got is a room we use ten months a year — the louvers close before the rain hits, and the install crew treated our yard like their own.",
  installedModel: "Freestanding Louvered · 13′ × 16′",
  projectImage: {
    src: "/images/project-hill-country-poolside.jpg",
    alt: "Poolside pergola installation in Austin, Texas",
  },
};

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Marcus D.",
    location: "Chicago, IL",
    rating: 5,
    quote:
      "The wind rating mattered to us on a rooftop. Two winters in, not a rattle — and the heating means we're out there in November.",
    installedModel: "Freestanding Louvered",
  },
  {
    id: "t-2",
    name: "Elena R.",
    location: "Scottsdale, AZ",
    rating: 5,
    quote:
      "Design consultation was the difference. They matched the finish to our window frames and it looks original to the house.",
    installedModel: "Fixed Panel",
  },
  {
    id: "t-3",
    name: "James W.",
    location: "Portland, OR",
    rating: 4,
    quote:
      "Rain runs through the posts, not off the edge onto the steps. Small thing until you live with it — then it's everything.",
    installedModel: "Attached Louvered",
  },
  {
    id: "t-4",
    name: "Priya N.",
    location: "Charleston, SC",
    rating: 5,
    quote:
      "Quoted eight weeks, installed in eight weeks, done in two days. The crew was theirs, not a subcontractor — you can tell.",
    installedModel: "Attached Louvered",
  },
];
