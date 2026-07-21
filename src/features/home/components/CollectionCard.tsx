import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import type { Collection } from "@/config/collections";

/**
 * Data-driven collection card. The entire card is one link (one tab stop
 * per card, not three competing ones), with the image zoom on hover kept
 * inside a fixed frame — the frame never moves, per BRAND_IDENTITY.md §7's
 * "the card itself never scales or lifts" rule. Hover motion is gated with
 * `motion-safe:` so reduced-motion users get a static (still fully
 * functional) card. Server Component — the hover treatment is pure CSS.
 */
export function CollectionCard({ collection }: { collection: Collection }) {
  const { title, description, keyFeature, href, image } = collection;

  return (
    <Link
      href={href}
      className="group focus-visible:ring-ring/50 block rounded-xl focus-visible:ring-2 focus-visible:outline-none"
    >
      <article>
        <div className="border-border relative aspect-[4/3] overflow-hidden rounded-xl border">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="duration-slow ease-standard object-cover transition-transform motion-safe:group-hover:scale-105"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-h4 text-foreground flex items-center gap-1.5">
            {title}
            <ArrowRight
              className="duration-fast ease-standard size-4 shrink-0 opacity-0 transition-all group-hover:opacity-100 motion-safe:-translate-x-1 motion-safe:group-hover:translate-x-0"
              aria-hidden="true"
            />
          </h3>
          <p className="text-caption text-muted-foreground mt-1.5">{description}</p>
          <p className="text-caption text-primary mt-2 flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
            {keyFeature}
          </p>
          <span className="text-button text-primary mt-4 inline-flex items-center gap-1 underline-offset-4 group-hover:underline">
            Explore the collection
          </span>
        </div>
      </article>
    </Link>
  );
}
