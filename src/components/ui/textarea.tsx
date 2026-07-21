import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/cn";

type TextareaProps = ComponentPropsWithoutRef<"textarea">;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "text-body border-input bg-background text-foreground duration-fast ease-standard flex min-h-24 w-full rounded-md border px-3.5 py-2.5 transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none",
        "disabled:opacity-disabled disabled:cursor-not-allowed",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/30",
        className,
      )}
      {...props}
    />
  );
}
