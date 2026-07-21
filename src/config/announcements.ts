export type Announcement = {
  id: string;
  message: string;
  href?: string;
  linkLabel?: string;
  /** ISO date string; when present the bar renders a live countdown. */
  countdownTo?: string;
};

/**
 * Static placeholder until this is backed by a Sanity singleton
 * (`siteSettings.announcements`, per ARCHITECTURE.md §7). The shape is
 * deliberately flat and serializable so swapping this array for a GROQ
 * query result later is a data-source change only — `AnnouncementBar`
 * itself doesn't know or care where the array came from.
 */
export const announcements: Announcement[] = [
  {
    id: "free-consultation-2026",
    message: "Book a free in-home design consultation this month.",
    href: "/contact/quote",
    linkLabel: "Reserve your slot",
  },
];
