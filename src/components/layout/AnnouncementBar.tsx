"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/utils/cn";
import { useCountdown } from "@/hooks/useCountdown";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMotionVariants } from "@/animations/framer";
import { transitions } from "@/animations/framer/transitions";
import type { Announcement } from "@/config/announcements";

const ROTATE_INTERVAL_MS = 6000;

const variants = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0 },
};

function Countdown({ target }: { target: string }) {
  const { days, hours, minutes, seconds, expired } = useCountdown(target);
  if (expired) return null;

  const parts = [
    days > 0 ? `${days}d` : null,
    `${String(hours).padStart(2, "0")}h`,
    `${String(minutes).padStart(2, "0")}m`,
    `${String(seconds).padStart(2, "0")}s`,
  ].filter(Boolean);

  return (
    <span className="font-semibold tabular-nums" aria-live="off">
      {parts.join(" ")}
    </span>
  );
}

type AnnouncementBarProps = {
  announcements: Announcement[];
  className?: string;
};

/**
 * Reusable, CMS-shaped announcement rail. Dismissal is keyed to the joined
 * set of announcement IDs currently passed in, not a static string — when
 * content changes (a new Sanity-authored announcement replaces the old
 * one), the bar reappears for visitors who'd dismissed the previous set.
 */
export function AnnouncementBar({ announcements, className }: AnnouncementBarProps) {
  const dismissKey = useMemo(
    () => announcements.map((a) => a.id).join("|"),
    [announcements],
  );
  const [dismissed, setDismissed] = useLocalStorage<string | null>(
    "announcement-dismissed",
    null,
  );
  const [index, setIndex] = useState(0);
  const motionVariants = useMotionVariants(variants);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % announcements.length),
      ROTATE_INTERVAL_MS,
    );
    return () => clearInterval(interval);
  }, [announcements.length]);

  if (announcements.length === 0 || dismissed === dismissKey) return null;

  const current = announcements[index % announcements.length];
  if (!current) return null;

  return (
    <div
      className={cn(
        "text-caption bg-primary text-primary-foreground relative flex items-center justify-center px-10 py-2",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          variants={motionVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={transitions.fast}
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center"
        >
          <span>{current.message}</span>
          {current.countdownTo && <Countdown target={current.countdownTo} />}
          {current.href && (
            <Link
              href={current.href}
              className="font-semibold underline underline-offset-2 hover:no-underline"
            >
              {current.linkLabel ?? "Learn more"}
            </Link>
          )}
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setDismissed(dismissKey)}
        aria-label="Dismiss announcement"
        className="duration-fast hover:bg-primary-foreground/15 focus-visible:ring-primary-foreground/60 absolute right-2 flex size-7 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        <X className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
