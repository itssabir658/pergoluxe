import Link from "next/link";
import { ArrowRight, CheckCircle2, LayoutGrid } from "lucide-react";

import { AspectRatio } from "@/components/layout/AspectRatio";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
import { Divider } from "@/components/layout/Divider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import type { MegaMenuContent } from "@/config/nav";

/**
 * `ImagePlaceholder` stands in for real Cloudinary/Shopify product imagery
 * — a flat icon tile rather than a fake photo, so the layout is honestly
 * "no image yet" instead of pretending to show a product that doesn't
 * exist in any CMS/catalog. Swap for `next/image` once real assets exist;
 * the AspectRatio wrapper (already CLS-safe) doesn't need to change.
 */
function ImagePlaceholder() {
  return (
    <AspectRatio ratio={4 / 3}>
      <div className="bg-muted flex size-full items-center justify-center rounded-lg">
        <LayoutGrid className="text-muted-foreground size-6" aria-hidden="true" />
      </div>
    </AspectRatio>
  );
}

export function MegaMenu({ content }: { content: MegaMenuContent }) {
  return (
    <div className="w-screen max-w-4xl p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <Grid cols={2} gap="lg">
          {content.categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group duration-fast hover:bg-muted -m-2 rounded-lg p-2 transition-colors"
            >
              <Stack gap="sm">
                <ImagePlaceholder />
                <Stack gap="xs">
                  <span className="text-body flex items-center gap-1 font-medium">
                    {category.title}
                    <ArrowRight
                      className="duration-fast ease-standard size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </span>
                  <p className="text-caption text-muted-foreground">
                    {category.description}
                  </p>
                  <p className="text-caption text-primary flex items-center gap-1">
                    <CheckCircle2 className="size-3" aria-hidden="true" />
                    {category.keyFeature}
                  </p>
                </Stack>
              </Stack>
            </Link>
          ))}
        </Grid>

        <Stack gap="lg" className="border-border border-l pl-8">
          <Link href={content.featured.href} className="group">
            <Stack gap="sm">
              <ImagePlaceholder />
              <Stack gap="xs">
                <p className="text-label text-primary">Featured collection</p>
                <p className="text-body font-medium">{content.featured.title}</p>
                <p className="text-caption text-muted-foreground">
                  {content.featured.description}
                </p>
              </Stack>
              <span
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "mt-1 w-fit",
                )}
              >
                {content.featured.ctaLabel}
              </span>
            </Stack>
          </Link>

          <Divider />

          <Stack gap="sm">
            <p className="text-label text-muted-foreground">Support</p>
            <Stack gap="xs" as="ul">
              {content.supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-caption text-foreground/80 duration-fast hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </Stack>
          </Stack>

          <Stack gap="sm">
            <p className="text-label text-muted-foreground">Buying guides</p>
            <Stack gap="xs" as="ul">
              {content.buyingGuides.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-caption text-foreground/80 duration-fast hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}
