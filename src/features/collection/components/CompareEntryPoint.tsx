import Link from "next/link";
import { Scale } from "lucide-react";

import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "@/components/layout";

/**
 * The brief's own distinct "Compare Products Entry Point" section — a
 * static, always-visible invitation, separate from `CompareBar` (which
 * only appears once a visitor has actually selected products via a card's
 * Quick Compare toggle). Links to the homepage's full comparison table
 * (`/#compare`, `features/product`'s `ComparisonTable`) so "compare
 * everything" and "compare just what I selected here" are two paths to
 * the same underlying comparison feature, not two different ones.
 */
export function CompareEntryPoint({
  hasComparableProducts,
}: {
  hasComparableProducts: boolean;
}) {
  if (!hasComparableProducts) return null;

  return (
    <Section spacing="sm">
      <Container size="content">
        <div className="border-border bg-card flex flex-col items-center gap-4 rounded-xl border p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-full">
              <Scale className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-h4 text-foreground">Not sure which model fits?</p>
              <p className="text-body text-muted-foreground mt-1">
                Select up to 3 with &ldquo;Compare&rdquo; on any card, or see every model
                side-by-side.
              </p>
            </div>
          </div>
          <Link
            href="/#compare"
            className={cn(buttonVariants({ variant: "outline", size: "md" }), "shrink-0")}
          >
            Compare All Models
          </Link>
        </div>
      </Container>
    </Section>
  );
}
