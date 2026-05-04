"use client";

import { cn } from "@/lib/utils";
import React from "react";

/**
 * Aurora Background — Vtensor
 * Soft, slow-moving violet/cyan radial gradient clouds.
 * Uses two animated radial gradients drifting across the viewport for a perceptible
 * but subtle motion. Respects prefers-reduced-motion via the `.animate-aurora-vt`
 * keyframes (handled in globals.css).
 */
export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
}: {
  className?: string;
  children?: React.ReactNode;
  showRadialGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-full items-center justify-center bg-[#0A0A0F] text-white",
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          data-aurora
          className={cn(
            "pointer-events-none absolute inset-0 animate-aurora-vt will-change-[background-position]",
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_50%_40%,black_30%,transparent_80%)]"
          )}
          style={{
            opacity: 0.6,
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(139,92,246,0.55), transparent 60%), radial-gradient(ellipse 60% 50% at 70% 60%, rgba(34,211,238,0.45), transparent 60%), radial-gradient(ellipse 50% 40% at 50% 80%, rgba(167,139,250,0.35), transparent 60%)",
            backgroundSize: "200% 200%, 200% 200%, 200% 200%",
            filter: "blur(40px)",
          }}
        />
      </div>
      {children}
    </div>
  );
};
