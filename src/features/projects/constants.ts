import type { Project } from "@/features/projects/types";

/**
 * PLACEHOLDER PROJECT DATA — these entries exist to design and test the
 * gallery's layout, filtering, and card anatomy. They are generic
 * compositions (no customer names, no real addresses, abstract generated
 * imagery), and MUST be replaced with real, documented installations from
 * Sanity (`features/projects/queries`, per ARCHITECTURE.md §7) before
 * launch — shipping fictional projects as social proof would violate the
 * brand's own trust rules (BRAND_IDENTITY.md §1). Model names reference
 * the real collection taxonomy, not invented SKUs.
 */
export const featuredProjects: Project[] = [
  {
    slug: "hill-country-poolside",
    title: "Hill Country Poolside",
    location: "Austin, TX",
    model: "Freestanding · Motorized louvered roof",
    dimensions: "13′ × 16′",
    description:
      "A freestanding louvered system shading the pool deck's western exposure, with perimeter lighting for evening swims.",
    categories: ["Residential", "Poolside"],
    image: {
      src: "/images/project-hill-country-poolside.jpg",
      alt: "Poolside pergola installation",
    },
  },
  {
    slug: "lakeside-outdoor-kitchen",
    title: "Lakeside Outdoor Kitchen",
    location: "Lake Geneva, WI",
    model: "Attached · Motorized louvered roof",
    dimensions: "10′ × 16′",
    description:
      "An attached system extending the kitchen outdoors, closing to a sealed roof when lake weather turns.",
    categories: ["Residential", "Garden"],
    image: {
      src: "/images/project-lakeside-outdoor-kitchen.jpg",
      alt: "Outdoor kitchen pergola installation",
    },
  },
  {
    slug: "courtyard-restaurant-canopy",
    title: "Courtyard Restaurant Canopy",
    location: "Charleston, SC",
    model: "Freestanding · Motorized louvered roof",
    dimensions: "16′ × 26′",
    description:
      "Year-round covered seating for forty, with retractable screens that hold the courtyard open through three seasons.",
    categories: ["Commercial", "Restaurant"],
    image: {
      src: "/images/project-courtyard-restaurant-canopy.jpg",
      alt: "Restaurant courtyard pergola installation",
    },
  },
  {
    slug: "desert-modern-retreat",
    title: "Desert Modern Retreat",
    location: "Scottsdale, AZ",
    model: "Attached · Fixed panel roof",
    dimensions: "13′ × 13′",
    description:
      "A fixed-panel shade structure matched to the home's stucco and steel, engineered for triple-digit summers.",
    categories: ["Residential", "Garden"],
    image: {
      src: "/images/project-desert-modern-retreat.jpg",
      alt: "Desert home pergola installation",
    },
  },
  {
    slug: "rooftop-terrace-lounge",
    title: "Rooftop Terrace Lounge",
    location: "Chicago, IL",
    model: "Freestanding · Motorized louvered roof",
    dimensions: "10′ × 13′",
    description:
      "A wind-rated rooftop installation with infrared heating, extending the terrace season past October.",
    categories: ["Residential", "Rooftop"],
    image: {
      src: "/images/project-rooftop-terrace-lounge.jpg",
      alt: "Rooftop terrace pergola installation",
    },
  },
  {
    slug: "garden-pavilion",
    title: "Garden Pavilion",
    location: "Portland, OR",
    model: "Freestanding · Fixed panel roof",
    dimensions: "10′ × 10′",
    description:
      "A quiet pavilion at the end of the garden path, with hidden drainage keeping the seating dry through Northwest winters.",
    categories: ["Residential", "Garden"],
    image: {
      src: "/images/project-garden-pavilion.jpg",
      alt: "Garden pavilion pergola installation",
    },
  },
];
