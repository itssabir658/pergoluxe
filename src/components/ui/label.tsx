import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/utils/cn";

type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-label text-foreground peer-disabled:opacity-disabled peer-disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}
