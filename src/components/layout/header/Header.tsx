import type { ReactNode } from "react";

import { HeaderShell } from "@/components/layout/header/HeaderShell";
import { Logo } from "@/components/layout/header/Logo";
import { PrimaryNav } from "@/components/layout/header/PrimaryNav";
import { HeaderActions } from "@/components/layout/header/HeaderActions";
import { MobileNavTrigger } from "@/components/layout/mobile-nav";

type HeaderProps = {
  transparentUntilScroll?: boolean;
  /** Rendered inside the same fixed stack, above the nav row — see
   * HeaderShell's doc comment for why this can't be a separate sibling. */
  announcementBar?: ReactNode;
};

/**
 * Server Component at the composition root — only `HeaderShell` (the
 * scroll listener) and the interactive leaves beneath it (`PrimaryNav`,
 * `HeaderActions`, `MobileNavTrigger`) are Client Components. Nothing here
 * needs the router or any per-request data, so this stays static and cheap
 * to render on every route.
 */
export function Header({ transparentUntilScroll, announcementBar }: HeaderProps) {
  return (
    <HeaderShell
      transparentUntilScroll={transparentUntilScroll}
      announcementBar={announcementBar}
      left={
        <>
          <MobileNavTrigger />
          <Logo adaptive />
        </>
      }
      center={
        <div className="hidden lg:block">
          <PrimaryNav />
        </div>
      }
      right={<HeaderActions />}
    />
  );
}
