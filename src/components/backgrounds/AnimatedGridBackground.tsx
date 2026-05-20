"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Animated Grid Background — interactive magnetic dot grid.
 * Dots grow, become more opaque, and shift toward cyan when the cursor is near.
 * Uses SVG <circle> + requestAnimationFrame + direct DOM mutations via refs
 * (no React re-render on mousemove).
 *
 * Reduced-motion: dots stay at rest state, no mouse tracking.
 */

const SPACING = 32; // px between dots
const DOT_RADIUS = 1.5; // px base circle radius
const INFLUENCE_RADIUS = 180; // px — area where the cursor affects dots
const MAX_SCALE = 2.5; // peak scale at cursor center
const REST_OPACITY = 0.2;
const PEAK_OPACITY = 1;
const REST_FILL = "rgba(255,255,255,0.6)";
const NEAR_FILL = "#22D3EE"; // cyan when very close
const LERP = 0.18; // smoothing of cursor position per frame

export function AnimatedGridBackground({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const mouseTarget = useRef({ x: -99999, y: -99999 });
  const mouseSmooth = useRef({ x: -99999, y: -99999 });
  const insideRef = useRef(false);

  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  // Recompute viewport size on mount + resize
  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setSize({ w: Math.ceil(rect.width), h: Math.ceil(rect.height) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Generate the grid of dots once we know the size
  const dots = useMemo(() => {
    if (!size.w || !size.h) return [] as { x: number; y: number }[];
    const cols = Math.ceil(size.w / SPACING) + 1;
    const rows = Math.ceil(size.h / SPACING) + 1;
    const arr: { x: number; y: number }[] = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        arr.push({ x: i * SPACING, y: j * SPACING });
      }
    }
    return arr;
  }, [size.w, size.h]);

  // Reset refs array length when dot count changes
  useEffect(() => {
    dotRefs.current = dotRefs.current.slice(0, dots.length);
  }, [dots.length]);

  // Mouse tracking + animation loop
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Pause RAF + mouse listener si la section n'est pas dans le viewport
    // (économise du GPU/CPU sur les sections off-screen).
    const containerEl = containerRef.current;
    if (!containerEl) return;
    let isVisible = false;
    let frame = 0;
    let mouseAttached = false;

    const handleMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseTarget.current.x = x;
      mouseTarget.current.y = y;
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (inside && !insideRef.current) {
        mouseSmooth.current.x = x;
        mouseSmooth.current.y = y;
      }
      insideRef.current = inside;
    };

    const tick = () => {
      // Lerp the smoothed cursor toward the raw target for fluidity
      const tx = mouseTarget.current.x;
      const ty = mouseTarget.current.y;
      if (insideRef.current) {
        mouseSmooth.current.x += (tx - mouseSmooth.current.x) * LERP;
        mouseSmooth.current.y += (ty - mouseSmooth.current.y) * LERP;
      } else {
        // Snap to far-away when not interacting so dots return to rest
        mouseSmooth.current.x = -99999;
        mouseSmooth.current.y = -99999;
      }

      const mx = mouseSmooth.current.x;
      const my = mouseSmooth.current.y;
      const r = INFLUENCE_RADIUS;
      const r2 = r * r;

      const refs = dotRefs.current;
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const ref = refs[i];
        if (!ref) continue;

        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist2 = dx * dx + dy * dy;

        if (dist2 > r2) {
          // Outside influence — only update if we were modified
          ref.style.transform = "scale(1)";
          ref.style.opacity = String(REST_OPACITY);
          ref.style.fill = REST_FILL;
          continue;
        }

        const dist = Math.sqrt(dist2);
        const t = 1 - dist / r; // 0..1, 1 at cursor
        // Smoothstep for a softer falloff
        const e = t * t * (3 - 2 * t);
        const scale = 1 + (MAX_SCALE - 1) * e;
        const opacity = REST_OPACITY + (PEAK_OPACITY - REST_OPACITY) * e;
        ref.style.transform = `scale(${scale.toFixed(3)})`;
        ref.style.opacity = opacity.toFixed(3);
        ref.style.fill = e > 0.35 ? NEAR_FILL : REST_FILL;
      }

      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!mouseAttached) {
        document.addEventListener("mousemove", handleMove, { passive: true });
        mouseAttached = true;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (mouseAttached) {
        document.removeEventListener("mousemove", handleMove);
        mouseAttached = false;
      }
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      // Snap les dots au repos pour économiser du paint
      mouseSmooth.current.x = -99999;
      mouseSmooth.current.y = -99999;
      insideRef.current = false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
          if (isVisible) start();
          else stop();
        }
      },
      { threshold: 0.05, rootMargin: "100px" },
    );
    observer.observe(containerEl);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [dots]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#0A0A0F]",
        className
      )}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        width={size.w || undefined}
        height={size.h || undefined}
      >
        {dots.map((dot, i) => (
          <circle
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            cx={dot.x}
            cy={dot.y}
            r={DOT_RADIUS}
            fill={REST_FILL}
            opacity={REST_OPACITY}
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              transition: "fill 180ms linear",
              willChange: "transform, opacity",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
