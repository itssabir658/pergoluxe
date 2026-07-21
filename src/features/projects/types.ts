export const PROJECT_CATEGORIES = [
  "Residential",
  "Commercial",
  "Poolside",
  "Garden",
  "Restaurant",
  "Rooftop",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Project = {
  slug: string;
  title: string;
  location: string;
  /** Display name of the installed system, from the collection taxonomy. */
  model: string;
  dimensions: string;
  description: string;
  categories: ProjectCategory[];
  image: {
    src: string;
    alt: string;
  };
};
