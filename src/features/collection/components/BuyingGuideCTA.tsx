import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "@/components/layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import type { CollectionContent } from "@/features/collection/types";

/**
 * For visitors still researching, not ready to filter/compare yet — sits
 * between the product grid and the long-form SEO content, so it's found
 * before someone scrolls past into reading material they may not want yet.
 * `content.buyingGuide` is CMS-ready (see PRODUCT_LISTING.md); the target
 * route (`ROUTES.buyingGuides`) is shared across every collection, so this
 * section's only per-collection variable is the heading/body/image.
 */
export function BuyingGuideCTA({ content }: { content: CollectionContent }) {
  const { heading, body, cta, image } = content.buyingGuide;

  return (
    <Section spacing="md" className="bg-surface">
      <Container size="content">
        <ScrollReveal className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="border-border relative aspect-[4/3] overflow-hidden rounded-xl border">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-label text-primary">Still researching?</p>
            <h2 className="text-h3 text-foreground mt-2">{heading}</h2>
            <p className="text-body-lg text-muted-foreground mt-3">{body}</p>
            <Link
              href={cta.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-6 gap-2",
              )}
            >
              {cta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
