import { ClipboardCheck, Factory, PartyPopper, Ruler, Truck, Wrench } from "lucide-react";

import type { ProcessStep } from "@/features/installation-journey/types";

/**
 * PLACEHOLDER TIMEFRAMES — estimates pending real fulfilment data from
 * operations; directionally consistent with the configurator's lead-time
 * figures (features/configurator/constants.ts) so the two sections don't
 * quote contradictory timelines for the same roof type.
 */
export const processSteps: ProcessStep[] = [
  {
    id: "consultation",
    icon: ClipboardCheck,
    title: "Consultation",
    description:
      "A design specialist walks your space with you — in person or over video — to understand how you want to use it.",
    timeframe: "Day 1",
  },
  {
    id: "measure-planning",
    icon: Ruler,
    title: "Measure & planning",
    description:
      "We take precise site measurements and finalize your model, size, finish, and roof type.",
    timeframe: "Week 1",
  },
  {
    id: "manufacturing",
    icon: Factory,
    title: "Manufacturing",
    description:
      "Your pergola is built to order at our facility — engineered to your exact specifications.",
    timeframe: "6–10 weeks",
  },
  {
    id: "delivery",
    icon: Truck,
    title: "Delivery",
    description:
      "Your system arrives with your installation team, scheduled around your availability.",
    timeframe: "1 day",
  },
  {
    id: "installation",
    icon: Wrench,
    title: "Professional installation",
    description:
      "Our own certified crew installs and commissions your system — never a subcontractor.",
    timeframe: "1–2 days",
  },
  {
    id: "enjoy",
    icon: PartyPopper,
    title: "Enjoy your outdoor space",
    description:
      "A final walkthrough covers your controls and warranty, then it's yours to live in.",
    timeframe: "Day 1 of many",
  },
];
