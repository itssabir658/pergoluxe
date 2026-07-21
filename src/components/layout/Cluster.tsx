import { type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const clusterVariants = cva("flex flex-wrap", {
  variants: {
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    gap: "sm",
    align: "center",
    justify: "start",
  },
});

type ClusterProps = VariantProps<typeof clusterVariants> &
  ComponentPropsWithoutRef<"div">;

/**
 * Horizontal, wrapping flex primitive for groups of same-sized items
 * (tags, filter chips, button rows) where a rigid Grid is the wrong tool
 * because the item count and width are unpredictable.
 */
export function Cluster({ gap, align, justify, className, ...props }: ClusterProps) {
  return (
    <div className={cn(clusterVariants({ gap, align, justify }), className)} {...props} />
  );
}
