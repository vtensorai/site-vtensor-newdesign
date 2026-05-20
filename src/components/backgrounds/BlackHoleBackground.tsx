"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/**
 * Black Hole / Singularity — shader fragment custom inspire ShaderToy.
 *
 * Trou noir avec disque d'accretion qui tourne. Lensing simule par une
 * deformation polaire (1/r), disque chaud violet/cyan/blanc, halo radial.
 * Centre noir parfait, jet vertical leger.
 *
 * Reduced-motion : uTime fige.
 */
const bhVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const bhFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(
      mix(hash(i), hash(i+vec2(1.0,0.0)), u.x),
      mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x),
      u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a*noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv - 0.5;
    uv.x *= uResolution.x / uResolution.y;

    float r = length(uv);
    float a = atan(uv.y, uv.x);

    // Disque d'accretion : on echantillonne le fbm en coordonnees polaires
    // tordues (lensing), avec rotation angulaire dans le temps.
    float rot = uTime * 0.45 / max(r, 0.05);
    vec2 polar = vec2(r * 6.0, a * 1.6 + rot);
    float disk = fbm(polar + vec2(uTime * 0.2, 0.0));
    disk *= fbm(polar * 2.5 - vec2(uTime * 0.1, 0.0));

    // Anneau principal entre 0.18 et 0.45
    float ring = smoothstep(0.18, 0.30, r) * smoothstep(0.55, 0.30, r);
    disk *= ring;

    // Couleur de l'anneau : centre chaud blanc/cyan, exterieur violet
    vec3 hot   = vec3(1.0, 0.95, 0.95);
    vec3 cyan  = vec3(0.133, 0.827, 0.933);
    vec3 violet = vec3(0.545, 0.361, 0.965);

    vec3 col = mix(hot, cyan, smoothstep(0.20, 0.32, r));
    col = mix(col, violet, smoothstep(0.32, 0.55, r));
    col *= disk * 4.0;

    // Trou noir au centre (event horizon)
    float horizon = smoothstep(0.15, 0.18, r);
    col *= horizon;

    // Halo radial
    float halo = exp(-r * 5.5) * 0.6;
    col += halo * mix(violet, cyan, 0.5);

    // Jet vertical fin
    float jet = exp(-pow(uv.x * 8.0, 2.0)) * smoothstep(0.0, 0.5, abs(uv.y));
    jet *= smoothstep(1.0, 0.4, abs(uv.y));
    col += jet * mix(cyan, hot, 0.7) * 0.35;

    // Etoiles arriere-plan
    vec2 sp = (vUv) * 80.0;
    float star = step(0.992, hash(floor(sp))) * smoothstep(0.6, 1.0, r);
    col += vec3(star * 0.8);

    // Background noir profond
    vec3 bg = vec3(0.012, 0.012, 0.022);
    col += bg;

    // Vignette
    float vign = smoothstep(1.4, 0.4, length(uv));
    col *= mix(0.4, 1.0, vign);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function BlackHolePlane({ reducedMotion }: { reducedMotion: boolean }) {
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
        vertexShader={bhVert}
        fragmentShader={bhFrag}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function BlackHoleBackground({ className }: { className?: string }) {
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
        <BlackHolePlane reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
