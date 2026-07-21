import Image from "next/image";
import Link from "next/link";
import { Check, Minus } from "lucide-react";

import { cn } from "@/utils/cn";
import { formatPrice } from "@/utils/formatPrice";
import { buttonVariants } from "@/components/ui/button";
import { pergolaModels, specRows } from "@/features/product/constants";
import type { SpecValue } from "@/features/product/types";

/** The compact model strip that stays pinned while spec rows scroll —
 * solid background + z-index so rows pass beneath it. Desktop only: on
 * mobile the overflow-x wrapper is the scroll container and CSS sticky
 * cannot stick within it. `top` clears the fixed site-header stack. */
const stickyHeaderCell =
  "border-b border-border bg-background align-bottom lg:sticky lg:top-28 lg:z-10";

/**
 * Boolean cells pair an icon with sr-only text (never colour or icon
 * alone); Check/Minus differ by shape as well as colour, so the states
 * survive colour-blindness and grayscale.
 */
function SpecCell({ value }: { value: SpecValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center">
        <Check className="text-success size-4" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center">
        <Minus className="text-muted-foreground/60 size-4" aria-hidden="true" />
        <span className="sr-only">Not available</span>
      </span>
    );
  }
  if (value === "optional") {
    return <span className="text-muted-foreground">Optional</span>;
  }
  return <span>{value}</span>;
}

/**
 * A real `<table>` — comparison data IS tabular, and table semantics are
 * what give screen readers row/column context for free. The premium
 * treatment is in the two-row header: a rich model-card row (`<td>`s —
 * visual content, not the accessible column headers) above a compact
 * sticky strip of `<th scope="col">` name+price cells. Only the compact
 * strip sticks on desktop, so comparing the bottom rows never costs half
 * the viewport to a pinned image. On mobile the wrapper scrolls
 * horizontally (position:sticky can't operate inside an overflow
 * container, so sticky is desktop-only by construction — exactly the
 * required split). Server Component; hover states are pure CSS.
 *
 * Shopify-ready: `pergolaModels` maps 1:1 to future products by handle,
 * with specs moving to metafields — the table renders whatever the array
 * contains.
 */
export function ComparisonTable() {
  return (
    // `contain-paint`: without it, this div's clipped-and-scrollable content
    // still contributes its full unclipped width to the page's scrollable
    // overflow on mobile — a flex-layout quirk (see layout.tsx's `min-w-0`
    // comment) where the leak resurfaces the moment this section is
    // scrolled into view or reached via a `#compare` anchor link, even
    // though this div's own visible box is already correctly clipped.
    // `contain: paint` (this div is the actual overflow source, so it's the
    // right place to stop it) guarantees nothing here is ever painted, laid
    // out, or measured outside its own box — the same guarantee `overflow`
    // alone doesn't quite give this specific ancestor chain.
    <div className="overflow-x-auto pb-2 contain-paint lg:overflow-visible">
      <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
        <caption className="sr-only">
          Comparison of Pergoluxe pergola models across key specifications
        </caption>
        <thead>
          <tr>
            <td className="align-bottom" />
            {pergolaModels.map((model) => (
              <td key={model.id} className="w-[28%] px-3 pb-5 align-top">
                <div className="group">
                  <div className="border-border relative aspect-[4/3] overflow-hidden rounded-xl border">
                    <Image
                      src={model.image.src}
                      alt={model.image.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 240px"
                      className="duration-slow ease-standard object-cover transition-transform motion-safe:group-hover:scale-105"
                    />
                  </div>
                  <p className="text-body text-muted-foreground mt-4">
                    {model.description}
                  </p>
                  <p className="text-caption text-primary mt-2">{model.idealFor}</p>
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <th scope="col" className={stickyHeaderCell}>
              <span className="sr-only">Specification</span>
            </th>
            {pergolaModels.map((model) => (
              <th key={model.id} scope="col" className={cn(stickyHeaderCell, "px-3")}>
                <div className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <div>
                    <span className="text-h4 text-foreground block">{model.name}</span>
                    <span className="text-caption text-muted-foreground block font-normal">
                      From {formatPrice(model.startingPrice)}
                    </span>
                  </div>
                  <Link
                    href={model.ctaHref}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                  >
                    Design this model
                    <span className="sr-only"> — {model.name}</span>
                  </Link>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specRows.map((row) => (
            <tr
              key={row.id}
              className="duration-fast ease-standard hover:bg-muted/60 transition-colors"
            >
              <th
                scope="row"
                className="text-caption border-border text-foreground border-b py-3.5 pr-4 font-medium"
              >
                {row.label}
              </th>
              {pergolaModels.map((model) => (
                <td
                  key={model.id}
                  className="text-caption border-border text-foreground border-b px-3 py-3.5"
                >
                  <SpecCell value={model.specs[row.id]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
