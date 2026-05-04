"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * LazyBackground — wrapper qui mount/unmount son enfant selon la visibilité.
 *
 * Avec 30+ fonds animés simultanés, la page ramerait (toutes les RAF / canvas
 * / WebGL qui tournent en parallèle). On observe la visibilité de chaque
 * section : quand off-screen on unmount le composant pour stopper RAF /
 * canvas / WebGL ; quand visible on remount.
 *
 * Use : <LazyBackground><XxxBackground /></LazyBackground>
 */
export function LazyBackground({
  children,
  className,
  rootMargin = "200px",
}: {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setVisible(e.isIntersecting);
      },
      { threshold: 0.05, rootMargin }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("absolute inset-0", className)}
    >
      {visible ? children : null}
    </div>
  );
}
