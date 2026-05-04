"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";

/**
 * Re-export wrapper of the existing Aurora used in Hero,
 * so the demo page can reference all candidates uniformly.
 */
export function AuroraDemoBackground({ className }: { className?: string }) {
  return <AuroraBackground className={className ?? "h-full w-full"} />;
}
