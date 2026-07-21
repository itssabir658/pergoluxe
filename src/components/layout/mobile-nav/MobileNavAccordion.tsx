import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { primaryNav } from "@/config/nav";

/**
 * One nesting level deep (nav item → its mega-menu categories), matching
 * what the desktop mega menu shows — mobile doesn't get a *reduced* nav,
 * just a differently-shaped one. Items without a mega menu render as a
 * plain large-touch-target row instead of an accordion with nothing to
 * expand.
 */
export function MobileNavAccordion({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Accordion type="single" collapsible className="flex flex-col">
      {primaryNav.map((item) =>
        item.megaMenu ? (
          <AccordionItem key={item.href} value={item.href} className="border-border">
            <AccordionTrigger className="text-h4 font-display px-1 py-4 hover:no-underline">
              {item.label}
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              <ul className="flex flex-col">
                {item.megaMenu.categories.map((category) => (
                  <li key={category.href}>
                    <Link
                      href={category.href}
                      onClick={onNavigate}
                      className="text-body border-border/60 text-foreground flex min-h-14 items-center justify-between border-b py-3"
                    >
                      {category.title}
                      <ArrowUpRight
                        className="text-muted-foreground size-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="text-body text-primary flex min-h-14 items-center font-medium"
                  >
                    Shop all {item.label.toLowerCase()}
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="text-h4 border-border font-display flex min-h-14 items-center border-b px-1 py-4"
          >
            {item.label}
          </Link>
        ),
      )}
    </Accordion>
  );
}
