"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cloud, Clouds } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/**
 * Volumetric Fog 3D — Three.js + r3f + drei (Clouds).
 *
 * Brouillard volumetrique anime, deux nappes (violet + cyan) qui glissent
 * et se croisent. Camera fixe, on bouge les volumes plutot que la camera
 * pour un effet plus calme.
 *
 * Reduced-motion : la rotation des clouds est mise a 0.
 */
function FogScene({ reducedMotion }: { reducedMotion: boolean }) {
  const purpleRef = useRef<THREE.Group>(null);
  const cyanRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (purpleRef.current) {
      purpleRef.current.rotation.y += delta * 0.04;
    }
    if (cyanRef.current) {
      cyanRef.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#8B5CF6" />
      <directionalLight position={[-5, -2, 3]} intensity={0.4} color="#22D3EE" />

      <group ref={purpleRef}>
        <Clouds material={THREE.MeshBasicMaterial}>
          <Cloud
            seed={1}
            segments={28}
            bounds={[10, 2, 4]}
            volume={6}
            color="#8B5CF6"
            opacity={0.35}
            position={[0, 0.5, 0]}
            speed={reducedMotion ? 0 : 0.15}
          />
        </Clouds>
      </group>

      <group ref={cyanRef}>
        <Clouds material={THREE.MeshBasicMaterial}>
          <Cloud
            seed={4}
            segments={24}
            bounds={[10, 1.6, 3]}
            volume={4}
            color="#22D3EE"
            opacity={0.25}
            position={[0, -0.6, -1]}
            speed={reducedMotion ? 0 : 0.2}
          />
        </Clouds>
      </group>
    </>
  );
}

export function VolumetricFogBackground({ className }: { className?: string }) {
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
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#06060A"]} />
        <FogScene reducedMotion={reducedMotion} />
      </Canvas>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(6,6,10,0.85) 100%)",
        }}
      />
    </div>
  );
}
