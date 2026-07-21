"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { useLenis } from "@/providers/smooth-scroll-provider";
import { useMotionVariants } from "@/animations/framer";
import { transitions } from "@/animations/framer/transitions";

const SHOW_AFTER_PX = 560;

const variants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollTo } = useLenis();
  const motionVariants = useMotionVariants(variants);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => scrollTo(0)}
          aria-label="Back to top"
          variants={motionVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={transitions.fast}
          className="z-sticky border-border bg-popover text-popover-foreground duration-fast hover:bg-muted focus-visible:ring-ring/50 fixed right-6 bottom-6 flex size-11 items-center justify-center rounded-full border shadow-lg transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <ArrowUp className="size-4" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
