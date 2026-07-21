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

/**
 * Positioned entirely off `data-vaul-drawer-direction` — an attribute vaul
 * sets on the content element matching whichever `direction` the parent
 * `<Drawer direction="...">` was given — rather than a responsive
 * `sm:`-breakpoint hack. A single vaul instance's drag physics only match
 * one edge at a time; faking a bottom-sheet-on-mobile/right-sheet-on-
 * desktop switch with CSS breakpoints alone would fight vaul's own gesture
 * transform the moment someone tried to drag it. Pick one `direction` per
 * call site (bottom for a mobile-style sheet, right for a cart-style
 * panel) and this styles correctly for it on every breakpoint.
 */
const directionStyles = cn(
  "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[92vh] data-[vaul-drawer-direction=bottom]:rounded-t-2xl data-[vaul-drawer-direction=bottom]:border-t",
  "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[92vh] data-[vaul-drawer-direction=top]:rounded-b-2xl data-[vaul-drawer-direction=top]:border-b",
  "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:h-full data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:max-w-md data-[vaul-drawer-direction=right]:border-l",
  "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:h-full data-[vaul-drawer-direction=left]:w-full data-[vaul-drawer-direction=left]:max-w-md data-[vaul-drawer-direction=left]:border-r",
);

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
          "group z-drawer border-border bg-popover text-popover-foreground fixed flex flex-col",
          directionStyles,
          className,
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-2 hidden h-1.5 w-10 shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]:block" />
        <DrawerPrimitive.Title className={hideTitle ? "sr-only" : "text-h4 px-6 pt-4"}>
          {title}
        </DrawerPrimitive.Title>
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}
