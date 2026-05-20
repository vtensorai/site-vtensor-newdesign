"use client";

import { useEffect, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { cn } from "@/lib/utils";

/**
 * Shader Gradient Background — shadergradient.co (WebGL via Three.js).
 *
 * Vrai shader WebGL premium, type Linear / Apple / Vercel. Couleurs
 * Vtensor : violet → cyan → fond sombre.
 *
 * Reduced-motion : `uSpeed` est mis a 0 pour que le shader soit fige.
 */
export function ShaderGradientBackground({ className }: { className?: string }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
    >
      <ShaderGradientCanvas
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <ShaderGradient
          control="props"
          type="waterPlane"
          color1="#8B5CF6"
          color2="#22D3EE"
          color3="#0A0A0F"
          uSpeed={reducedMotion ? 0 : 0.2}
          uStrength={3}
          uDensity={1.3}
          uFrequency={0}
          uAmplitude={0}
          grain="on"
          rotationX={50}
          rotationY={0}
          rotationZ={-60}
          cameraZoom={9.4}
          cAzimuthAngle={180}
          cPolarAngle={80}
          cDistance={2.8}
          positionX={0}
          positionY={0}
          positionZ={0}
          envPreset="city"
          lightType="3d"
          brightness={1.2}
          reflection={0.1}
        />
      </ShaderGradientCanvas>

      {/* Vignette pour focaliser le centre et durcir le fond */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(6,6,10,0.55) 100%)",
        }}
      />
    </div>
  );
}
