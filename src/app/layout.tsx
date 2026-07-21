import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { fontVariables } from "@/config/fonts";
import {
  defaultMetadata,
  jsonLdScriptProps,
  organizationJsonLd,
  websiteJsonLd,
} from "@/config/seo";
import { announcements } from "@/config/announcements";
import { AppProviders } from "@/providers";
import {
  AnnouncementBar,
  BackToTop,
  CookieConsent,
  ScrollProgress,
} from "@/components/layout";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = defaultMetadata;

/**
 * Everything a future page inherits without re-declaring it: metadata
 * defaults, fonts, the provider stack, structured data, and the shell
 * (announcement bar → header → `{children}` → footer → the two floating
 * utilities). Nothing below the App Router's own required files
 * (`layout.tsx`/route segments) needs to touch any of this again.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="bg-background text-foreground flex min-h-dvh flex-col font-sans antialiased">
        <script {...jsonLdScriptProps(organizationJsonLd())} />
        <script {...jsonLdScriptProps(websiteJsonLd())} />

        <AppProviders>
          <ScrollProgress />
          <a
            href="#main-content"
            className="focus:z-tooltip focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:rounded-md focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <Header announcementBar={<AnnouncementBar announcements={announcements} />} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <BackToTop />
          <CookieConsent />
        </AppProviders>
      </body>
    </html>
  );
}
