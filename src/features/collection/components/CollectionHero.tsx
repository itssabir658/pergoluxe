import Image from "next/image";
import Link from "next/link";

import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Container } from "@/components/layout";
import { ROUTES } from "@/constants/routes";
import type { CollectionContent } from "@/features/collection/types";

/**
 * Same full-bleed-image-plus-scrim family as the homepage Hero and Final
 * CTA (component consistency, not three different hero patterns on one
 * site) — shorter than the homepage hero (this isn't the first thing a
 * visitor sees on the whole site) but built the same way: a real `<Image>`
 * with `priority` (this is the route's LCP element) behind a bottom-heavy
 * gradient scrim guaranteeing text contrast regardless of the image
 * underneath, exactly like `HeroMedia`'s own scrim requirement.
 *
 * Every string here is a `CollectionContent` field — see
 * PRODUCT_LISTING.md's Sanity integration plan for the `collectionPage`
 * document this maps to verbatim; nothing in this component assumes the
 * copy is hardcoded.
 */
export function CollectionHero({
  content,
  collectionTitle,
}: {
  content: CollectionContent;
  collectionTitle: string;
}) {
  return (
    <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden lg:min-h-[80vh]">
      <Image
        src={content.heroImage.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/20"
      />

      <Container size="wide" className="py-12 lg:py-16">
        <Breadcrumb>
          <BreadcrumbList className="text-white/70">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={ROUTES.home} className="hover:text-white">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">{collectionTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6 max-w-2xl text-white">
          <p className="text-label text-white/80">{content.heroEyebrow}</p>
          <h1 className="text-h1 mt-2">{content.heroTitle}</h1>
          <p className="text-body-lg max-w-measure mt-4 text-white/85">
            {content.heroSupportingCopy}
          </p>
          <Link
            href={content.heroPrimaryCta.href}
            className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-8")}
          >
            {content.heroPrimaryCta.label}
          </Link>
        </div>

        {content.heroStats && content.heroStats.length > 0 && (
          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/20 pt-6">
            {content.heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dd className="text-h4 order-1 text-white">{stat.value}</dd>
                <dt className="text-caption order-2 text-white/70">{stat.label}</dt>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
