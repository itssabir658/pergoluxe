import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const stackVariants = cva("flex flex-col", {
  variants: {
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    gap: "md",
    align: "stretch",
  },
});

type StackProps<T extends ElementType = "div"> = VariantProps<typeof stackVariants> & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Vertical flex primitive. Prefer this over ad-hoc `flex flex-col gap-*`
 * so gap values stay on-scale and align intent is explicit at the call site.
 */
export function Stack<T extends ElementType = "div">({
  as,
  gap,
  align,
  className,
  ...props
}: StackProps<T>) {
  const Component = as ?? "div";
  return (
    <Component className={cn(stackVariants({ gap, align }), className)} {...props} />
  );
}
