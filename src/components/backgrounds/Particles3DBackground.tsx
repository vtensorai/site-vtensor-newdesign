"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/**
 * Particles 3D Field — r3f + drei (Sparkles + Stars).
 *
 * Champ de particules 3D type "espace deep", parallax avec rotation lente.
 * Sparkles violet en premier plan, Sparkles cyan en moyen plan, Stars
 * blanches en fond pour la profondeur.
 *
 * Reduced-motion : speed = 0 sur tous les emitters.
 */
function ParticlesScene({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.025;
      groupRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={50}
        depth={40}
        count={2500}
        factor={4}
        saturation={0}
        fade
        speed={reducedMotion ? 0 : 0.4}
      />
      <Sparkles
        count={120}
        scale={[10, 6, 6]}
        size={3}
        speed={reducedMotion ? 0 : 0.4}
        color="#8B5CF6"
        opacity={0.9}
      />
      <Sparkles
        count={80}
        scale={[12, 5, 8]}
        size={2.2}
        speed={reducedMotion ? 0 : 0.6}
        color="#22D3EE"
        opacity={0.85}
      />
      <Sparkles
        count={60}
        scale={[8, 4, 5]}
        size={1.6}
        speed={reducedMotion ? 0 : 0.3}
        color="#ffffff"
        opacity={0.5}
      />
    </group>
  );
}

export function Particles3DBackground({ className }: { className?: string }) {
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
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 70 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#06060A"]} />
        <ParticlesScene reducedMotion={reducedMotion} />
      </Canvas>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(6,6,10,0.7) 100%)",
        }}
      />
    </div>
  );
}
