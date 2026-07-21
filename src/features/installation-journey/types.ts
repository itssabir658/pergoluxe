import type { LucideIcon } from "lucide-react";

export type ProcessStep = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /** Placeholder pending real fulfilment-time data. */
  timeframe: string;
};
