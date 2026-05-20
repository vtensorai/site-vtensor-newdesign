"use client";

import { useEffect, useState } from "react";
import { Warp } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

/**
 * Shader exact de app.vtensor.ai (référence Victor).
 *
 * Ce n'est PAS un ShaderGradient (shadergradient.co) — c'est un shader
 * `@paper-design/shaders-react` `Warp` configuré avec la palette violet
 * profond Vtensor sur fond noir. Config extraite du bundle production
 * `app.vtensor.ai/assets/index-D65Zq5ID.js` :
 *   colors:[`#121212`,`#9470ff`,`#121212`,`#8838ff`]
 *   proportion:.45, softness:1, distortion:.25,
 *   swirl:.8, swirlIterations:10, shapeScale:.1, shape:`checks`
 *
 * Reduced-motion : `speed=0` pour figer le shader.
 */
export function ShaderGradientAppVtensorBackground({
  className,
}: {
  className?: string;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#121212]",
        className
      )}
    >
      <Warp
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        colors={["#121212", "#9470ff", "#121212", "#8838ff"]}
        proportion={0.45}
        softness={1}
        distortion={0.25}
        swirl={0.8}
        swirlIterations={10}
        shapeScale={0.1}
        shape="checks"
        speed={reducedMotion ? 0 : 1}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}
