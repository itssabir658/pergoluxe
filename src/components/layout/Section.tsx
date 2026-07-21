import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const sectionVariants = cva("", {
  variants: {
    spacing: {
      none: "",
      sm: "section-py-sm",
      md: "section-py-md",
      lg: "section-py-lg",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
});

type SectionProps<T extends ElementType = "section"> = VariantProps<
  typeof sectionVariants
> & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Vertical rhythm primitive for page-level content blocks. `spacing` maps
 * to the section-spacing tokens in tokens.css — never set section padding
 * with an ad-hoc `py-*` value in a feature component.
 */
export function Section<T extends ElementType = "section">({
  as,
  spacing,
  className,
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";
  return <Component className={cn(sectionVariants({ spacing }), className)} {...props} />;
}
