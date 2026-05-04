"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/**
 * Plasma Shader — vrai plasma WebGL (fragment shader sin/cos layered).
 *
 * Le plasma classique des demos 90s, recompose avec couleurs Vtensor
 * violet/cyan. 4 ondes superposees pour un mouvement organique fluide.
 *
 * Reduced-motion : uTime fige.
 */
const plasmaVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const plasmaFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0) * 4.0;

    float t = uTime * 0.5;

    // Plasma classique : superposition de sinusoides
    float v = 0.0;
    v += sin(p.x * 1.3 + t);
    v += sin((p.y * 1.5 + t) * 0.8);
    v += sin((p.x + p.y) * 1.1 + t * 0.7);
    v += sin(length(p) * 1.6 - t * 1.2);
    v += sin(length(p - vec2(sin(t * 0.4), cos(t * 0.5)) * 1.5) * 1.8 + t);

    v = v * 0.5 + 0.5; // normalize 0..1
    v = v / 2.5;

    // Mapping couleur : violet -> cyan via blanc, smooth
    vec3 violet = vec3(0.545, 0.361, 0.965);
    vec3 cyan   = vec3(0.133, 0.827, 0.933);
    vec3 dark   = vec3(0.04, 0.03, 0.07);

    float k = sin(v * 6.2831 + t * 0.3) * 0.5 + 0.5;
    vec3 col = mix(violet, cyan, k);
    col = mix(dark, col, smoothstep(0.0, 0.4, v));

    // Highlight pour les pics
    col += vec3(1.0) * pow(v, 4.0) * 0.5;

    // Vignette
    float vign = smoothstep(1.2, 0.4, distance(uv, vec2(0.5)));
    col *= mix(0.55, 1.0, vign);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function PlasmaPlane({ reducedMotion }: { reducedMotion: boolean }) {
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
        vertexShader={plasmaVert}
        fragmentShader={plasmaFrag}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function PlasmaShaderBackground({ className }: { className?: string }) {
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
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <PlasmaPlane reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
