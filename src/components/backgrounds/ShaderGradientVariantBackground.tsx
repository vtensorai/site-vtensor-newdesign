"use client";

import { useEffect, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { cn } from "@/lib/utils";

/**
 * Composant générique ShaderGradient — toutes les variantes Mist passent par
 * ici, ce qui évite de dupliquer 12 fichiers quasi identiques. Toutes les
 * props sont passe-plat vers `<ShaderGradient>`. `uSpeed` est forcé à 0 si
 * l'utilisateur a activé reduced-motion.
 *
 * Usage :
 *   <ShaderGradientVariantBackground
 *     params={{ type: "waterPlane", color1: "#8B5CF6", ... }}
 *   />
 */
export type ShaderGradientParams = {
  type?: "plane" | "waterPlane" | "sphere";
  shader?: "defaults" | "a" | "b" | "c";
  color1?: string;
  color2?: string;
  color3?: string;
  uSpeed?: number;
  uTime?: number;
  uStrength?: number;
  uDensity?: number;
  uFrequency?: number;
  uAmplitude?: number;
  cAzimuthAngle?: number;
  cPolarAngle?: number;
  cDistance?: number;
  cameraZoom?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  positionX?: number;
  positionY?: number;
  positionZ?: number;
  envPreset?: "city" | "dawn" | "lobby";
  lightType?: "env" | "3d";
  brightness?: number;
  reflection?: number;
  grain?: "on" | "off";
  /** Couleur de fond derrière le canvas */
  bgColor?: string;
  /** Vignette pour focaliser le centre */
  vignette?: boolean;
};

export function ShaderGradientVariantBackground({
  className,
  params,
}: {
  className?: string;
  params: ShaderGradientParams;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const {
    type = "waterPlane",
    color1 = "#8B5CF6",
    color2 = "#22D3EE",
    color3 = "#0A0A0F",
    uSpeed = 0.2,
    uStrength = 2,
    uDensity = 1.2,
    uFrequency = 0,
    uAmplitude = 0,
    cAzimuthAngle = 180,
    cPolarAngle = 80,
    cDistance = 2.8,
    cameraZoom = 9.4,
    rotationX = 50,
    rotationY = 0,
    rotationZ = -60,
    positionX = 0,
    positionY = 0,
    positionZ = 0,
    envPreset = "city",
    lightType = "3d",
    brightness = 1.2,
    reflection = 0.1,
    grain = "on",
    shader = "defaults",
    bgColor = "#06060A",
    vignette = true,
  } = params;

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ background: bgColor }}
    >
      <ShaderGradientCanvas
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <ShaderGradient
          control="props"
          type={type}
          shader={shader}
          color1={color1}
          color2={color2}
          color3={color3}
          uSpeed={reducedMotion ? 0 : uSpeed}
          uStrength={uStrength}
          uDensity={uDensity}
          uFrequency={uFrequency}
          uAmplitude={uAmplitude}
          grain={grain}
          rotationX={rotationX}
          rotationY={rotationY}
          rotationZ={rotationZ}
          cameraZoom={cameraZoom}
          cAzimuthAngle={cAzimuthAngle}
          cPolarAngle={cPolarAngle}
          cDistance={cDistance}
          positionX={positionX}
          positionY={positionY}
          positionZ={positionZ}
          envPreset={envPreset}
          lightType={lightType}
          brightness={brightness}
          reflection={reflection}
        />
      </ShaderGradientCanvas>

      {vignette && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(6,6,10,0.55) 100%)",
          }}
        />
      )}
    </div>
  );
}
