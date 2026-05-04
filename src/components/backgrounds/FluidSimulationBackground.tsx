"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fluid Simulation WebGL — version simplifiee inspiree de
 * pavel-dobryakov/WebGL-Fluid-Simulation.
 *
 * On fait tourner un solveur d'advection + injection sur deux textures
 * ping-pong (velocite et couleur). La souris injecte de la velocite + de
 * la couleur (palette violet/cyan) dans le fluide. Pas de pression /
 * divergence (full Navier-Stokes serait trop lourd pour un BG) — c'est
 * une advection pure avec un peu de diffusion. Toujours impressionnant
 * visuellement et 100% interactif.
 *
 * Reduced-motion : on stoppe la sim et le rendu (image fixe noire).
 */

const VERT = `#version 300 es
  in vec2 aPosition;
  out vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

// Advection : on lit la velocite, on remonte le temps, on echantillonne
// la quantite la-bas. Utilise pour faire bouger velocite ET couleur.
const ADVECT_FRAG = `#version 300 es
  precision highp float;
  in vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform float uDt;
  uniform float uDissipation;
  uniform vec2 uTexel;
  out vec4 outColor;

  void main() {
    vec2 vel = texture(uVelocity, vUv).xy;
    vec2 coord = vUv - uDt * vel * uTexel;
    outColor = uDissipation * texture(uSource, coord);
  }
`;

// Splat : on injecte de la velocite (ou couleur) dans un disque gaussien
// autour d'un point.
const SPLAT_FRAG = `#version 300 es
  precision highp float;
  in vec2 vUv;
  uniform sampler2D uTarget;
  uniform vec2 uPoint;
  uniform vec3 uColor;
  uniform float uRadius;
  uniform float uAspect;
  out vec4 outColor;

  void main() {
    vec2 p = vUv - uPoint;
    p.x *= uAspect;
    float falloff = exp(-dot(p, p) / uRadius);
    vec3 base = texture(uTarget, vUv).xyz;
    outColor = vec4(base + falloff * uColor, 1.0);
  }
`;

// Display : visualise la couleur. On etire la dynamique avec un peu
// de tone mapping doux + une vignette.
const DISPLAY_FRAG = `#version 300 es
  precision highp float;
  in vec2 vUv;
  uniform sampler2D uColor;
  out vec4 outColor;

  void main() {
    vec3 c = texture(uColor, vUv).rgb;
    c = c / (1.0 + c); // soft tonemap
    float vign = smoothstep(1.1, 0.45, distance(vUv, vec2(0.5)));
    c *= mix(0.55, 1.0, vign);
    outColor = vec4(c, 1.0);
  }
`;

type FBO = {
  fbo: WebGLFramebuffer;
  texture: WebGLTexture;
  width: number;
  height: number;
};

function createFBO(
  gl: WebGL2RenderingContext,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  filter: number
): FBO {
  const texture = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

  const fbo = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  );
  gl.viewport(0, 0, w, h);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return { fbo, texture, width: w, height: h };
}

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error("Shader compile error: " + log);
  }
  return shader;
}

function program(gl: WebGL2RenderingContext, vert: string, frag: string) {
  const v = compile(gl, gl.VERTEX_SHADER, vert);
  const f = compile(gl, gl.FRAGMENT_SHADER, frag);
  const p = gl.createProgram()!;
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error("Program link error: " + gl.getProgramInfoLog(p));
  }
  return p;
}

export function FluidSimulationBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      depth: false,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      setFailed(true);
      return;
    }

    // Float textures support
    const ext = gl.getExtension("EXT_color_buffer_float");
    if (!ext) {
      // fallback : on tourne quand meme en HALF_FLOAT si dispo
    }

    const SIM_W = 256;
    const SIM_H = 256;
    const DYE_W = 512;
    const DYE_H = 512;

    // Quad fullscreen
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);

    let advectProg: WebGLProgram;
    let splatProg: WebGLProgram;
    let displayProg: WebGLProgram;

    try {
      advectProg = program(gl, VERT, ADVECT_FRAG);
      splatProg = program(gl, VERT, SPLAT_FRAG);
      displayProg = program(gl, VERT, DISPLAY_FRAG);
    } catch (err) {
      console.error("[FluidSim] shader error", err);
      setFailed(true);
      return;
    }

    function bindAttrib(p: WebGLProgram) {
      const loc = gl!.getAttribLocation(p, "aPosition");
      gl!.enableVertexAttribArray(loc);
      gl!.vertexAttribPointer(loc, 2, gl!.FLOAT, false, 0, 0);
    }

    // FBOs
    const HALF = (ext as unknown as { HALF_FLOAT?: number })?.HALF_FLOAT ?? gl.HALF_FLOAT;
    const RGBA16F = gl.RGBA16F;
    const RG16F = gl.RG16F;

    let velocity = createFBO(gl, SIM_W, SIM_H, RG16F, gl.RG, HALF, gl.LINEAR);
    let velocityTmp = createFBO(gl, SIM_W, SIM_H, RG16F, gl.RG, HALF, gl.LINEAR);
    let dye = createFBO(gl, DYE_W, DYE_H, RGBA16F, gl.RGBA, HALF, gl.LINEAR);
    let dyeTmp = createFBO(gl, DYE_W, DYE_H, RGBA16F, gl.RGBA, HALF, gl.LINEAR);

    // Pointer
    const pointer = {
      x: 0.5,
      y: 0.5,
      dx: 0,
      dy: 0,
      down: false,
      moved: false,
      color: [0.8, 0.4, 1.0] as [number, number, number],
    };

    // Couleurs dispo : palette violet -> cyan
    const PALETTE: [number, number, number][] = [
      [0.545, 0.361, 0.965], // violet
      [0.133, 0.827, 0.933], // cyan
      [0.7, 0.55, 1.0], // light violet
      [0.45, 0.85, 0.95], // light cyan
    ];

    let raf = 0;
    let running = true;

    function resize() {
      const w = container!.clientWidth;
      const h = container!.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    function setPointer(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      pointer.dx = (x - pointer.x) * 8.0;
      pointer.dy = (y - pointer.y) * 8.0;
      pointer.x = x;
      pointer.y = y;
      pointer.moved = true;
    }
    canvas.addEventListener("pointermove", setPointer);
    canvas.addEventListener(
      "pointerdown",
      (e) => {
        pointer.down = true;
        // changer la couleur a chaque pression
        const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        pointer.color = c;
        setPointer(e);
      }
    );
    window.addEventListener("pointerup", () => (pointer.down = false));

    // Auto-injection regulieres pour avoir un mouvement meme sans souris
    let autoT = 0;

    function splat(
      target: FBO,
      tmp: FBO,
      x: number,
      y: number,
      dx: number,
      dy: number,
      color: [number, number, number],
      radius: number
    ) {
      gl!.useProgram(splatProg);
      bindAttrib(splatProg);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, tmp.fbo);
      gl!.viewport(0, 0, tmp.width, tmp.height);
      gl!.uniform1i(gl!.getUniformLocation(splatProg, "uTarget"), 0);
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, target.texture);
      gl!.uniform2f(gl!.getUniformLocation(splatProg, "uPoint"), x, y);
      gl!.uniform3f(
        gl!.getUniformLocation(splatProg, "uColor"),
        dx ?? color[0],
        dy ?? color[1],
        color[2]
      );
      gl!.uniform1f(gl!.getUniformLocation(splatProg, "uRadius"), radius);
      gl!.uniform1f(
        gl!.getUniformLocation(splatProg, "uAspect"),
        target.width / target.height
      );
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      // swap
      [target.fbo, tmp.fbo] = [tmp.fbo, target.fbo];
      [target.texture, tmp.texture] = [tmp.texture, target.texture];
    }

    function advect(
      target: FBO,
      tmp: FBO,
      vel: FBO,
      dt: number,
      dissipation: number
    ) {
      gl!.useProgram(advectProg);
      bindAttrib(advectProg);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, tmp.fbo);
      gl!.viewport(0, 0, tmp.width, tmp.height);
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, vel.texture);
      gl!.uniform1i(gl!.getUniformLocation(advectProg, "uVelocity"), 0);
      gl!.activeTexture(gl!.TEXTURE1);
      gl!.bindTexture(gl!.TEXTURE_2D, target.texture);
      gl!.uniform1i(gl!.getUniformLocation(advectProg, "uSource"), 1);
      gl!.uniform1f(gl!.getUniformLocation(advectProg, "uDt"), dt);
      gl!.uniform1f(
        gl!.getUniformLocation(advectProg, "uDissipation"),
        dissipation
      );
      gl!.uniform2f(
        gl!.getUniformLocation(advectProg, "uTexel"),
        1.0 / target.width,
        1.0 / target.height
      );
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      [target.fbo, tmp.fbo] = [tmp.fbo, target.fbo];
      [target.texture, tmp.texture] = [tmp.texture, target.texture];
    }

    function display() {
      gl!.useProgram(displayProg);
      bindAttrib(displayProg);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.clearColor(0.024, 0.024, 0.039, 1);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, dye.texture);
      gl!.uniform1i(gl!.getUniformLocation(displayProg, "uColor"), 0);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    }

    let last = performance.now();

    function frame(now: number) {
      if (!running) return;
      const dt = Math.min(0.016, (now - last) / 1000);
      last = now;
      autoT += dt;

      // Auto-injection legere pour vie ambiante
      if (autoT > 0.6) {
        autoT = 0;
        const ax = 0.2 + Math.random() * 0.6;
        const ay = 0.2 + Math.random() * 0.6;
        const adx = (Math.random() - 0.5) * 1.2;
        const ady = (Math.random() - 0.5) * 1.2;
        const ac = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        splat(velocity, velocityTmp, ax, ay, adx, ady, [adx, ady, 0], 0.0006);
        splat(dye, dyeTmp, ax, ay, 0, 0, ac, 0.00025);
      }

      // Splat from pointer
      if (pointer.moved) {
        pointer.moved = false;
        const power = 1.0;
        splat(
          velocity,
          velocityTmp,
          pointer.x,
          pointer.y,
          pointer.dx * power,
          pointer.dy * power,
          [pointer.dx, pointer.dy, 0],
          0.0006
        );
        splat(
          dye,
          dyeTmp,
          pointer.x,
          pointer.y,
          0,
          0,
          pointer.color,
          0.0003
        );
        pointer.dx *= 0.85;
        pointer.dy *= 0.85;
      }

      // Advect velocity (auto-advection) + dye
      advect(velocity, velocityTmp, velocity, dt * 1.5, 0.99);
      advect(dye, dyeTmp, velocity, dt * 1.5, 0.985);

      display();
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", setPointer);
      gl.deleteProgram(advectProg);
      gl.deleteProgram(splatProg);
      gl.deleteProgram(displayProg);
      gl.deleteFramebuffer(velocity.fbo);
      gl.deleteFramebuffer(velocityTmp.fbo);
      gl.deleteFramebuffer(dye.fbo);
      gl.deleteFramebuffer(dyeTmp.fbo);
      gl.deleteTexture(velocity.texture);
      gl.deleteTexture(velocityTmp.texture);
      gl.deleteTexture(dye.texture);
      gl.deleteTexture(dyeTmp.texture);
      gl.deleteBuffer(buf);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden bg-[#06060A]",
        className
      )}
      aria-hidden="true"
    >
      {!failed && !reducedMotion && (
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          style={{ touchAction: "none" }}
        />
      )}

      {/* Fallback gradient si WebGL2 indispo OU reduced-motion */}
      {(failed || reducedMotion) && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(139,92,246,0.35) 0%, transparent 55%), radial-gradient(circle at 70% 60%, rgba(34,211,238,0.30) 0%, transparent 55%), #06060A",
          }}
        />
      )}

      {/* Hint discret */}
      {!failed && !reducedMotion && (
        <div
          className="pointer-events-none absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.16em] text-white/35"
        >
          souris : cliquer/bouger pour interagir
        </div>
      )}
    </div>
  );
}
