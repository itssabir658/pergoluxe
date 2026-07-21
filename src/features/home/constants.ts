import {
  CloudSun,
  Droplets,
  HardHat,
  Layers,
  ShieldCheck,
  SmartphoneNfc,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ROUTES } from "@/constants/routes";

export type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Optional deep link for "Learn more" — omitted where no target page
   * meaningfully expands on the claim yet. */
  learnMoreHref?: string;
};

/**
 * Signature benefits — HOMEPAGE_STRATEGY.md §3.5. Copy follows the brand
 * voice rule (BRAND_IDENTITY.md §1): state the concrete fact, not the
 * adjective. No invented alloy numbers or certifications — claims stay at
 * the level the business can stand behind until real spec sheets exist.
 */
export const benefits: Benefit[] = [
  {
    icon: Layers,
    title: "Aircraft-grade aluminium",
    description:
      "Extruded, powder-coated aluminium throughout — it will not rust, warp, or rot, and never needs repainting.",
  },
  {
    icon: CloudSun,
    title: "Built for all seasons",
    description:
      "Engineered wind and snow load ratings, so the same structure works in July heat and January storms.",
    learnMoreHref: ROUTES.buyingGuides,
  },
  {
    icon: Droplets,
    title: "Hidden drainage system",
    description:
      "Rainwater routes through the posts, not off the edges — no visible gutters, no drip line around your seating.",
  },
  {
    icon: SmartphoneNfc,
    title: "Motorised roof technology",
    description:
      "Louvers rotate from full sun to sealed shelter in seconds, from the wall switch, remote, or your phone.",
    learnMoreHref: ROUTES.collection("louvered-roofs"),
  },
  {
    icon: ShieldCheck,
    title: "10-year warranty",
    description:
      "Ten years on structure and finish, in writing — because the engineering makes it a safe promise.",
    learnMoreHref: ROUTES.warranty,
  },
  {
    icon: HardHat,
    title: "Professional installation",
    description:
      "Measured, engineered, and installed by our own certified teams — never handed off to a subcontractor.",
    learnMoreHref: ROUTES.support,
  },
];
