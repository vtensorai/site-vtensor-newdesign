"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/**
 * Galaxy 3D Particulaire — r3f + BufferGeometry custom (spirale 3D).
 *
 * Spirale galactique 3D, 8000 etoiles. Couleur interpolee selon distance
 * au centre : cyan -> violet en peripherie. Bras spiraux en log-spiral.
 *
 * Reduced-motion : rotation du systeme = 0.
 */
const STAR_COUNT = 8000;
const ARMS = 5;
const RADIUS = 6;
const SPIN = 0.8;
const RANDOMNESS = 0.45;
const RANDOMNESS_POW = 3.5;

function GalaxyPoints({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);

    const inside = new THREE.Color("#22D3EE"); // cyan au centre
    const outside = new THREE.Color("#8B5CF6"); // violet en peripherie

    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;

      const radius = Math.random() * RADIUS;
      const branchAngle = ((i % ARMS) / ARMS) * Math.PI * 2;
      const spin = radius * SPIN;

      const rx =
        Math.pow(Math.random(), RANDOMNESS_POW) *
        (Math.random() < 0.5 ? 1 : -1) *
        RANDOMNESS *
        radius;
      const ry =
        Math.pow(Math.random(), RANDOMNESS_POW) *
        (Math.random() < 0.5 ? 1 : -1) *
        RANDOMNESS *
        0.4 *
        radius;
      const rz =
        Math.pow(Math.random(), RANDOMNESS_POW) *
        (Math.random() < 0.5 ? 1 : -1) *
        RANDOMNESS *
        radius;

      positions[i3] = Math.cos(branchAngle + spin) * radius + rx;
      positions[i3 + 1] = ry;
      positions[i3 + 2] = Math.sin(branchAngle + spin) * radius + rz;

      const mixed = inside.clone();
      mixed.lerp(outside, radius / RADIUS);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    return { positions, colors };
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (ref.current) {
      ref.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        transparent
      />
    </points>
  );
}

export function Galaxy3DBackground({ className }: { className?: string }) {
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
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.18) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(139,92,246,0.10) 30%, transparent 70%)",
        }}
      />

      <Canvas
        camera={{ position: [0, 4, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <GalaxyPoints reducedMotion={reducedMotion} />
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
