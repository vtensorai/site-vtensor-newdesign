"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/**
 * Aurora Borealis 3D — shader fragment custom (r3f + ShaderMaterial).
 *
 * Plan plein ecran avec un fragment shader qui simule des "rideaux" d'aurore
 * boreale qui ondulent verticalement. Bruit fbm + sin layered. Couleurs
 * Vtensor : violet -> cyan + un soupcon de blanc pour les highlights.
 *
 * Reduced-motion : uTime fige a 0.
 */
const auroraVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const auroraFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;

  // Hash + noise classique
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  // Ribbon / rideau d'aurore : on calcule une distance signee a une ligne
  // sinueuse qui se decale avec le temps.
  float ribbon(vec2 p, float offset, float speed, float thick) {
    float wave = sin(p.x * 1.5 + uTime * speed + offset) * 0.18
               + sin(p.x * 3.2 + uTime * speed * 0.7 + offset * 1.3) * 0.08
               + fbm(p * 0.9 + vec2(uTime * 0.05, offset)) * 0.25;
    float d = abs(p.y - wave);
    return smoothstep(thick, 0.0, d);
  }

  void main() {
    vec2 uv = vUv;
    // On etire en x pour avoir un sky panoramique
    vec2 p = (uv - 0.5) * vec2(2.4, 1.4);

    // Trois rideaux superposes
    float r1 = ribbon(p + vec2(0.0, 0.30), 0.0, 0.45, 0.42);
    float r2 = ribbon(p + vec2(0.0, 0.05), 1.7, 0.35, 0.32);
    float r3 = ribbon(p + vec2(0.0,-0.22), 3.4, 0.55, 0.28);

    // Couleurs Vtensor
    vec3 violet = vec3(0.545, 0.361, 0.965); // #8B5CF6
    vec3 cyan   = vec3(0.133, 0.827, 0.933); // #22D3EE
    vec3 white  = vec3(1.0);

    vec3 col = vec3(0.0);
    col += r1 * mix(violet, white, 0.15) * 0.9;
    col += r2 * mix(cyan, violet, 0.45) * 0.95;
    col += r3 * mix(violet, cyan, 0.7) * 0.7;

    // Glow vertical doux (les aurores brillent par le bas)
    float glow = smoothstep(0.0, 1.0, 1.0 - uv.y) * 0.18;
    col += glow * mix(violet, cyan, 0.5);

    // Etoiles fines en haut (constellation discrete)
    vec2 sp = uv * vec2(uResolution.x / uResolution.y * 60.0, 60.0);
    float star = step(0.992, hash(floor(sp)));
    col += star * smoothstep(0.65, 1.0, uv.y) * 0.9;

    // Background tres sombre
    vec3 bg = mix(vec3(0.024, 0.024, 0.039), vec3(0.04, 0.03, 0.07), uv.y);
    col = bg + col;

    // Vignette
    float vign = smoothstep(1.1, 0.45, distance(uv, vec2(0.5, 0.55)));
    col *= mix(0.55, 1.0, vign);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function AuroraPlane({ reducedMotion }: { reducedMotion: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const startRef = useRef<number>(performance.now());

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame(({ size }) => {
    if (!matRef.current) return;
    if (!reducedMotion) {
      matRef.current.uniforms.uTime.value =
        (performance.now() - startRef.current) / 1000;
    }
    matRef.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={auroraVert}
        fragmentShader={auroraFrag}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function AuroraShaderBackground({ className }: { className?: string }) {
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
        camera={{ position: [0, 0, 1], fov: 60 }}
        orthographic={false}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <AuroraPlane reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
