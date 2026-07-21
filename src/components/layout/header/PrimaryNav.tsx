import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MegaMenu } from "@/components/layout/header/MegaMenu";
import { primaryNav } from "@/config/nav";

/**
 * Desktop-only (hidden below `lg`, see Header.tsx) — mobile gets the
 * dedicated full-screen MobileNavDrawer instead of a squeezed version of
 * this, per ARCHITECTURE.md's stance that the two are different enough
 * problems to deserve different components rather than one responsive one.
 */
export function PrimaryNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {primaryNav.map((item) =>
          item.megaMenu ? (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <MegaMenu content={item.megaMenu} />
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href={item.href}>{item.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
