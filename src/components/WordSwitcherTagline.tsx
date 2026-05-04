"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * WordSwitcherTagline — ligne 2 de tagline qui change en rotation auto.
 *
 * - Liste de compléments rotatifs (toutes les `intervalMs`, défaut 2500ms)
 * - Transition AnimatePresence wait : y + opacity + blur
 * - Flash radial blanc/violet ~220ms à chaque switch
 * - Gradient violet→cyan via bg-clip-text
 * - Reduced-motion : pas de rotation, premier élément reste affiché
 */
export function WordSwitcherTagline({
  items,
  intervalMs = 2500,
  reduced = false,
}: {
  items: string[];
  intervalMs?: number;
  reduced?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setFlash(true);
      setIndex((i) => (i + 1) % items.length);
      const ft = setTimeout(() => setFlash(false), 220);
      return () => clearTimeout(ft);
    }, intervalMs);
    return () => clearInterval(t);
  }, [reduced, intervalMs, items.length]);

  const sharedTextStyle = {
    fontFamily: "var(--font-display), Manrope, sans-serif",
    lineHeight: 1.1,
    backgroundImage:
      "linear-gradient(90deg, #A78BFA 0%, #22D3EE 100%)",
    WebkitBackgroundClip: "text" as const,
    backgroundClip: "text" as const,
    color: "transparent",
  };

  if (reduced) {
    return (
      <div
        className="flex items-center justify-center w-full max-w-full"
        style={{
          minHeight: "1.4em",
          fontSize: "clamp(24px, 6vw, 48px)",
          fontWeight: 600,
          ...sharedTextStyle,
        }}
      >
        {items[0]}
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center w-full max-w-full overflow-hidden"
      style={{
        minHeight: "1.4em",
        fontSize: "clamp(24px, 6vw, 48px)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
            fontWeight: 600,
            maxWidth: "100%",
            ...sharedTextStyle,
          }}
        >
          {items[index]}
        </motion.div>
      </AnimatePresence>

      {/* Flash overlay */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: flash ? 0.28 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute inset-x-0 inset-y-[-60%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.9), rgba(167,139,250,0.45) 40%, transparent 70%)",
          filter: "blur(22px)",
        }}
      />
    </div>
  );
}
