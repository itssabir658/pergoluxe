import type { FAQItem } from "@/features/faq/types";

/**
 * PLACEHOLDER ANSWERS — figures below (manufacturing lead time, financing
 * terms, cancellation window) are stand-ins pending real operations/finance
 * data, per the same rule as config/trust.ts and features/product/constants.ts.
 * Every number that overlaps another section (wind/snow rating, warranty
 * term, installation time) is copied verbatim from features/product/constants.ts
 * and features/installation-journey/constants.ts so the FAQ can never
 * contradict the comparison table or the process timeline on the same page.
 *
 * Order follows the brief's list, which is itself ordered logistics → risk
 * → commercial — roughly the order a hesitant buyer works through them.
 */
export const faqItems: FAQItem[] = [
  {
    id: "delivery",
    question: "How does delivery work?",
    answer:
      "Your system is delivered by our own installation team on the day your install is scheduled — never handed off to a separate freight carrier. You'll get a delivery window in advance, and someone is always on-site to receive and inspect it with the crew before work begins.",
  },
  {
    id: "installation",
    question: "Who installs my pergola?",
    answer:
      "Our own certified crews, never a subcontractor. Installation takes 1 day for a Fixed Panel system and 1–2 days for a Louvered system, depending on size and site conditions. A final walkthrough covers your controls and warranty before the crew leaves.",
  },
  {
    id: "warranty",
    question: "What does the warranty cover?",
    answer:
      "Every model carries a 10-year structural and finish warranty, covering the frame, moving louver components, and powder-coat finish against manufacturing defects. It's the same term across every model — it isn't a paid upgrade on the entry-level system.",
  },
  {
    id: "maintenance",
    question: "How much maintenance does it need?",
    answer:
      "Very little. The frame is marine-grade aluminum, so it won't rust, warp, or rot — an occasional hose-down is all the structure itself needs. Motorized louver systems recommend a yearly check of the drive mechanism, which your installation team can walk you through at handoff.",
  },
  {
    id: "custom-sizing",
    question: "Can it be custom-sized to my space?",
    answer:
      "Yes — every model supports custom dimensions; nothing here ships in fixed off-the-shelf sizes. Your design specialist takes precise site measurements during the planning step and your system is manufactured to those exact specifications, not fitted afterward.",
  },
  {
    id: "wind-resistance",
    question: "What wind conditions is it rated for?",
    answer:
      "The Fixed Panel system is rated to 120 mph; both louvered systems are rated to 110 mph. Ratings reflect the structural frame — the same figures shown in the model comparison above, so what you compare there is what actually gets installed.",
  },
  {
    id: "snow-load",
    question: "How much snow load can it handle?",
    answer:
      "The Fixed Panel system carries a 40 psf snow load rating. Louvered systems are rated to 35 psf with the louvers closed — closing the roof is what gives it that rating, so closing up ahead of a heavy snowfall is part of normal use, not a workaround.",
  },
  {
    id: "financing",
    question: "Do you offer financing?",
    answer:
      "Yes — monthly payment plans are available through our financing partner, with a soft credit check that won't affect your credit score to see your rate. Your design specialist can walk through options during your free consultation, before you commit to anything.",
  },
  {
    id: "lead-time",
    question: "How long from order to installation?",
    answer:
      "Typically 8–12 weeks from final design approval: manufacturing alone runs 6–10 weeks since every system is built to order, plus delivery and installation once it's ready. Consultation and measurement happen in the first week and don't add to that manufacturing window.",
  },
  {
    id: "returns",
    question: "What if I need to cancel or change my order?",
    answer:
      "You can cancel or adjust your design at no cost any time before manufacturing begins. Because every system is custom-built to your measurements and finish selection, we're not able to accept returns once manufacturing has started — your design specialist will confirm final specs with you before that happens, specifically so there are no surprises.",
  },
];
