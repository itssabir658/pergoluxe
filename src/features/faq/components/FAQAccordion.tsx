"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQItem } from "@/features/faq/types";

/**
 * Takes `items` as a prop rather than importing `faqItems` itself — the
 * same reusability seam as `TestimonialCard`/`FeaturedTestimonial` (Part 3),
 * so a future dedicated FAQ page or a CMS-driven subset can render this
 * exact component against different data.
 *
 * `type="single" collapsible` is what keeps at most one question open at a
 * time (the brief's "avoid clutter" requirement) — enforced by Radix, not
 * by hand-rolled open-state bookkeeping. Expand/collapse itself is the
 * existing `animate-accordion-down`/`-up` keyframes already defined for
 * every accordion in the design system (`tailwind.config`), which already
 * collapse to instant under `prefers-reduced-motion` (globals.css's global
 * rule) — nothing FAQ-specific needed for that.
 */
export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-body-lg text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
