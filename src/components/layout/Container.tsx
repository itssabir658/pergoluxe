import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      narrow: "max-w-narrow",
      content: "max-w-content",
      wide: "max-w-wide",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "content",
  },
});

type ContainerProps<T extends ElementType = "div"> = VariantProps<
  typeof containerVariants
> & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Horizontal measure + gutter primitive. Every page-level width decision
 * should route through `size`, not a one-off `max-w-[...]` in a feature.
 */
export function Container<T extends ElementType = "div">({
  as,
  size,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return <Component className={cn(containerVariants({ size }), className)} {...props} />;
}
