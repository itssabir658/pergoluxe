"use client";

import { useEffect, useState } from "react";

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function diffToParts(targetMs: number): CountdownParts {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    expired: diff <= 0,
  };
}

/** Ticks once per second toward `target`. Returns `expired: true` once
 * reached rather than going negative — callers hide the countdown then. */
export function useCountdown(target: Date | string | null): CountdownParts {
  const targetMs = target ? new Date(target).getTime() : null;
  const [parts, setParts] = useState<CountdownParts>(() =>
    targetMs
      ? diffToParts(targetMs)
      : { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true },
  );

  useEffect(() => {
    if (!targetMs) return;
    setParts(diffToParts(targetMs));
    const interval = setInterval(() => setParts(diffToParts(targetMs)), 1000);
    return () => clearInterval(interval);
  }, [targetMs]);

  return parts;
}
