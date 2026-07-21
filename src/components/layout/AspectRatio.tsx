import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

/**
 * Reserves layout space for media before it loads (prevents CLS) using
 * Radix's padding-box trick rather than a hand-rolled `pb-[56.25%]` hack
 * repeated per component.
 */
export const AspectRatio = AspectRatioPrimitive.Root;
