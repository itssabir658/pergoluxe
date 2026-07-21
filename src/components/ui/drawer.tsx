import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/utils/cn";

/**
 * Vaul over a hand-rolled Radix Dialog + CSS transform: it already solves
 * drag-to-dismiss, snap points, and background scaling for the mobile cart/
 * filter-drawer pattern this site needs everywhere — reimplementing that
 * gesture physics would be a worse version of what this library ships.
 */
export const Drawer = DrawerPrimitive.Root;
export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerClose = DrawerPrimitive.Close;
export const DrawerPortal = DrawerPrimitive.Portal;

export function DrawerOverlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      className={cn("z-overlay bg-scrim fixed inset-0", className)}
      {...props}
    />
  );
}

type DrawerContentProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Content
> & {
  title: string;
  hideTitle?: boolean;
};

export function DrawerContent({
  className,
  children,
  title,
  hideTitle = true,
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          "z-drawer border-border bg-popover text-popover-foreground fixed inset-x-0 bottom-0 mt-24 flex h-auto max-h-[92vh] flex-col rounded-t-2xl border-t",
          "sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:max-h-none sm:w-full sm:max-w-md sm:rounded-t-none sm:rounded-l-2xl sm:border-t-0 sm:border-l",
          className,
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-2 h-1.5 w-10 shrink-0 rounded-full sm:hidden" />
        <DrawerPrimitive.Title className={hideTitle ? "sr-only" : "text-h4 px-6 pt-4"}>
          {title}
        </DrawerPrimitive.Title>
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}
