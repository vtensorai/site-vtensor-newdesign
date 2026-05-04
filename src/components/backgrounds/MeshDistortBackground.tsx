"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/**
 * Mesh Distort Surface — r3f + drei (MeshDistortMaterial).
 *
 * Une icosphere qui ondule avec un shader de bruit. Materiau metallique
 * violet avec emissive cyan pour faire ressortir un edge profond.
 * Rotation lente de la sphere.
 *
 * Reduced-motion : speed = 0, rotation pause.
 */
function DistortScene({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.18;
      meshRef.current.rotation.x += delta * 0.06;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 3, 3]} intensity={1.2} color="#8B5CF6" />
      <directionalLight position={[-3, -2, 2]} intensity={0.7} color="#22D3EE" />
      <pointLight position={[0, 0, 4]} intensity={0.6} color="#ffffff" />

      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 32]} />
        <MeshDistortMaterial
          color="#8B5CF6"
          distort={0.55}
          speed={reducedMotion ? 0 : 1.6}
          roughness={0.18}
          metalness={0.7}
          emissive="#22D3EE"
          emissiveIntensity={0.18}
        />
      </mesh>
    </>
  );
}

export function MeshDistortBackground({ className }: { className?: string }) {
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
            "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.18) 0%, transparent 65%)",
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <DistortScene reducedMotion={reducedMotion} />
      </Canvas>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(6,6,10,0.85) 100%)",
        }}
      />
    </div>
  );
}
