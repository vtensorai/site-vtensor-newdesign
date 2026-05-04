"use client";

import { useMemo, useState } from "react";
import { LazyBackground } from "@/components/backgrounds/LazyBackground";
import { HeroPreview } from "@/components/sections/HeroPreview";

import { MistBackground } from "@/components/backgrounds/MistBackground";
import { AuroraDemoBackground } from "@/components/backgrounds/AuroraDemoBackground";
import { BeamsBackground } from "@/components/backgrounds/BeamsBackground";
import { AnimatedGridBackground } from "@/components/backgrounds/AnimatedGridBackground";
import { ConicGradientBackground } from "@/components/backgrounds/ConicGradientBackground";
import { ParticlesBackground } from "@/components/backgrounds/ParticlesBackground";
import { VideoBackground } from "@/components/backgrounds/VideoBackground";
import { VortexBackground } from "@/components/backgrounds/VortexBackground";
import { WavyBackground } from "@/components/backgrounds/WavyBackground";
import { GlobeBackground } from "@/components/backgrounds/GlobeBackground";
import { BeamsCollisionBackground } from "@/components/backgrounds/BeamsCollisionBackground";
import { ShaderGradientBackground } from "@/components/backgrounds/ShaderGradientBackground";
import { VolumetricFogBackground } from "@/components/backgrounds/VolumetricFogBackground";
import { Particles3DBackground } from "@/components/backgrounds/Particles3DBackground";
import { MeshDistortBackground } from "@/components/backgrounds/MeshDistortBackground";
import { AuroraShaderBackground } from "@/components/backgrounds/AuroraShaderBackground";
import { Galaxy3DBackground } from "@/components/backgrounds/Galaxy3DBackground";
import { BlackHoleBackground } from "@/components/backgrounds/BlackHoleBackground";
import { PlasmaShaderBackground } from "@/components/backgrounds/PlasmaShaderBackground";
import { FluidSimulationBackground } from "@/components/backgrounds/FluidSimulationBackground";

import { BackgroundBoxesBackground } from "@/components/backgrounds/BackgroundBoxesBackground";
import { LampBackground } from "@/components/backgrounds/LampBackground";
import { MeteorsBackground } from "@/components/backgrounds/MeteorsBackground";
import { ShootingStarsBackground } from "@/components/backgrounds/ShootingStarsBackground";
import { SparklesBackground } from "@/components/backgrounds/SparklesBackground";
import { SpotlightBackground } from "@/components/backgrounds/SpotlightBackground";
import { BackgroundGradientAnimationBackground } from "@/components/backgrounds/BackgroundGradientAnimationBackground";
import { BackgroundLinesBackground } from "@/components/backgrounds/BackgroundLinesBackground";
import { FlickeringGridBackground } from "@/components/backgrounds/FlickeringGridBackground";
import { DotPatternAnimatedBackground } from "@/components/backgrounds/DotPatternAnimatedBackground";
import { RippleBackground } from "@/components/backgrounds/RippleBackground";
import { RetroGridBackground } from "@/components/backgrounds/RetroGridBackground";
import { WarpBackground } from "@/components/backgrounds/WarpBackground";
import { AnimatedBeamBackground } from "@/components/backgrounds/AnimatedBeamBackground";
import { HyperspeedBackground } from "@/components/backgrounds/HyperspeedBackground";
import { LiquidChromeBackground } from "@/components/backgrounds/LiquidChromeBackground";
import { IridescenceBackground } from "@/components/backgrounds/IridescenceBackground";
import { GalaxyBackground } from "@/components/backgrounds/GalaxyBackground";
import { PlasmaBackground } from "@/components/backgrounds/PlasmaBackground";
import { ThreadsBackground } from "@/components/backgrounds/ThreadsBackground";
import { SilkBackground } from "@/components/backgrounds/SilkBackground";
import { LightningBackground } from "@/components/backgrounds/LightningBackground";
import { LetterGlitchBackground } from "@/components/backgrounds/LetterGlitchBackground";
import { ShaderGradientAppVtensorBackground } from "@/components/backgrounds/ShaderGradientAppVtensorBackground";
import { ShaderGradientVariantBackground } from "@/components/backgrounds/ShaderGradientVariantBackground";
import { SHADER_MIST_PRESETS } from "@/components/backgrounds/shaderMistPresets";

type Tech =
  | "css-svg"
  | "canvas-2d"
  | "webgl"
  | "interactive"
  | "video"
  | "shader-mist";

type Candidate = {
  id: string;
  name: string;
  tech: Tech;
  source: string;
  overlayOpacity?: number;
  Component: React.ComponentType<{ className?: string }>;
};

const CATEGORIES: { tech: Tech; label: string; emoji: string }[] = [
  { tech: "css-svg", label: "CSS / SVG pur", emoji: "🎨" },
  { tech: "canvas-2d", label: "Canvas 2D", emoji: "🖼️" },
  { tech: "webgl", label: "WebGL / Three.js", emoji: "🚀" },
  { tech: "shader-mist", label: "Shader Mist (variantes)", emoji: "🌫️" },
  { tech: "interactive", label: "Interactif", emoji: "⚡" },
  { tech: "video", label: "Vidéo", emoji: "🎬" },
];

const TECH_BADGE: Record<Tech, string> = {
  "css-svg": "🎨 SVG",
  "canvas-2d": "🖼️ Canvas",
  webgl: "🚀 WebGL",
  "shader-mist": "🌫️ Mist",
  interactive: "⚡ Interactif",
  video: "🎬 Vidéo",
};

const CANDIDATES: Candidate[] = [
  // ===== CSS / SVG =====
  {
    id: "mist",
    name: "Mist v2",
    tech: "css-svg",
    source: "Vtensor / SVG turbulence",
    Component: MistBackground,
  },
  {
    id: "aurora",
    name: "Aurora",
    tech: "css-svg",
    source: "Aceternity",
    Component: AuroraDemoBackground,
  },
  {
    id: "conic",
    name: "Conic Rotating",
    tech: "css-svg",
    source: "Vtensor / CSS",
    Component: ConicGradientBackground,
  },
  {
    id: "beams",
    name: "Beams",
    tech: "css-svg",
    source: "Vtensor / CSS",
    Component: BeamsBackground,
  },
  {
    id: "lamp",
    name: "Lamp Effect",
    tech: "css-svg",
    source: "Aceternity",
    Component: LampBackground,
  },
  {
    id: "spotlight",
    name: "Spotlight",
    tech: "interactive",
    source: "Aceternity",
    Component: SpotlightBackground,
  },
  {
    id: "bg-gradient-animation",
    name: "Background Gradient Animation",
    tech: "css-svg",
    source: "Aceternity",
    Component: BackgroundGradientAnimationBackground,
  },
  {
    id: "bg-lines",
    name: "Background Lines",
    tech: "css-svg",
    source: "Aceternity",
    Component: BackgroundLinesBackground,
  },
  {
    id: "dot-pattern-animated",
    name: "Dot Pattern (animé)",
    tech: "css-svg",
    source: "Magic UI variant",
    Component: DotPatternAnimatedBackground,
  },
  {
    id: "retro-grid",
    name: "Retro Grid",
    tech: "css-svg",
    source: "Magic UI",
    Component: RetroGridBackground,
  },
  {
    id: "warp",
    name: "Warp",
    tech: "css-svg",
    source: "Magic UI",
    Component: WarpBackground,
  },
  {
    id: "animated-beam",
    name: "Animated Beam",
    tech: "css-svg",
    source: "Magic UI",
    Component: AnimatedBeamBackground,
  },
  {
    id: "ripple",
    name: "Ripple",
    tech: "css-svg",
    source: "Magic UI",
    Component: RippleBackground,
  },
  {
    id: "meteors",
    name: "Meteors",
    tech: "css-svg",
    source: "Aceternity",
    Component: MeteorsBackground,
  },
  {
    id: "liquid-chrome",
    name: "Liquid Chrome",
    tech: "css-svg",
    source: "ReactBits / SVG",
    Component: LiquidChromeBackground,
  },
  {
    id: "iridescence",
    name: "Iridescence",
    tech: "css-svg",
    source: "ReactBits / CSS",
    Component: IridescenceBackground,
  },
  {
    id: "plasma",
    name: "Plasma",
    tech: "css-svg",
    source: "ReactBits / SVG",
    Component: PlasmaBackground,
  },
  {
    id: "silk",
    name: "Silk",
    tech: "css-svg",
    source: "ReactBits / SVG",
    Component: SilkBackground,
  },

  // ===== Canvas 2D =====
  {
    id: "particles",
    name: "Particules flottantes",
    tech: "canvas-2d",
    source: "Vtensor",
    Component: ParticlesBackground,
  },
  {
    id: "vortex",
    name: "Vortex",
    tech: "canvas-2d",
    source: "Aceternity",
    Component: VortexBackground,
  },
  {
    id: "wavy",
    name: "Wavy",
    tech: "canvas-2d",
    source: "Aceternity",
    Component: WavyBackground,
  },
  {
    id: "beams-collision",
    name: "Beams Collision",
    tech: "canvas-2d",
    source: "Aceternity",
    Component: BeamsCollisionBackground,
  },
  {
    id: "sparkles",
    name: "Sparkles",
    tech: "canvas-2d",
    source: "Aceternity",
    Component: SparklesBackground,
  },
  {
    id: "shooting-stars",
    name: "Shooting Stars",
    tech: "canvas-2d",
    source: "Aceternity",
    Component: ShootingStarsBackground,
  },
  {
    id: "flickering-grid",
    name: "Flickering Grid",
    tech: "canvas-2d",
    source: "Magic UI",
    Component: FlickeringGridBackground,
  },
  {
    id: "hyperspeed",
    name: "Hyperspeed",
    tech: "canvas-2d",
    source: "ReactBits",
    Component: HyperspeedBackground,
  },
  {
    id: "galaxy",
    name: "Galaxy",
    tech: "canvas-2d",
    source: "ReactBits",
    Component: GalaxyBackground,
  },
  {
    id: "threads",
    name: "Threads",
    tech: "canvas-2d",
    source: "ReactBits",
    Component: ThreadsBackground,
  },
  {
    id: "lightning",
    name: "Lightning",
    tech: "canvas-2d",
    source: "ReactBits",
    Component: LightningBackground,
  },
  {
    id: "letter-glitch",
    name: "Letter Glitch",
    tech: "canvas-2d",
    source: "ReactBits",
    Component: LetterGlitchBackground,
  },

  // ===== WebGL / Three.js =====
  {
    id: "globe",
    name: "Globe 3D",
    tech: "webgl",
    source: "Magic UI / cobe",
    Component: GlobeBackground,
  },
  {
    id: "shader-gradient",
    name: "Shader Gradient",
    tech: "webgl",
    source: "shadergradient.co",
    Component: ShaderGradientBackground,
  },
  {
    id: "fluid-simulation",
    name: "Fluid Simulation (interactif)",
    tech: "webgl",
    source: "Custom WebGL2 — advection + souris",
    Component: FluidSimulationBackground,
  },
  {
    id: "volumetric-fog",
    name: "Volumetric Fog 3D",
    tech: "webgl",
    source: "Three.js + drei (Clouds)",
    Component: VolumetricFogBackground,
  },
  {
    id: "particles-3d",
    name: "Particles 3D Field",
    tech: "webgl",
    source: "Three.js + drei (Sparkles + Stars)",
    Component: Particles3DBackground,
  },
  {
    id: "mesh-distort",
    name: "Mesh Distort Surface",
    tech: "webgl",
    source: "Three.js + drei (MeshDistortMaterial)",
    Component: MeshDistortBackground,
  },
  {
    id: "aurora-shader",
    name: "Aurora Borealis 3D",
    tech: "webgl",
    source: "Custom Three.js Fragment Shader",
    Component: AuroraShaderBackground,
  },
  {
    id: "galaxy-3d",
    name: "Galaxy 3D Particulaire",
    tech: "webgl",
    source: "Three.js — BufferGeometry spirale 3D",
    Component: Galaxy3DBackground,
  },
  {
    id: "black-hole",
    name: "Black Hole / Singularity",
    tech: "webgl",
    source: "Custom Three.js Shader (ShaderToy port)",
    Component: BlackHoleBackground,
  },
  {
    id: "plasma-shader",
    name: "Plasma Shader (WebGL)",
    tech: "webgl",
    source: "Custom Three.js Fragment Shader",
    Component: PlasmaShaderBackground,
  },

  // ===== Shader Mist (variantes) =====
  {
    id: "shader-mist-app-vtensor",
    name: "App Vtensor (référence)",
    tech: "shader-mist",
    source: "@paper-design/shaders-react · Voronoi (config prod app.vtensor.ai)",
    Component: ShaderGradientAppVtensorBackground,
  },
  ...SHADER_MIST_PRESETS.map((p) => ({
    id: p.id,
    name: p.name,
    tech: "shader-mist" as const,
    source: `@shadergradient/react · ${p.description}`,
    Component: function ShaderMistVariant({ className }: { className?: string }) {
      return (
        <ShaderGradientVariantBackground className={className} params={p.params} />
      );
    },
  })),

  // ===== Interactif =====
  {
    id: "grid",
    name: "Animated Grid (interactive)",
    tech: "interactive",
    source: "Vtensor",
    Component: AnimatedGridBackground,
  },
  {
    id: "bg-boxes",
    name: "Background Boxes",
    tech: "interactive",
    source: "Aceternity",
    Component: BackgroundBoxesBackground,
  },

  // ===== Vidéo =====
  {
    id: "video-serenity",
    name: "Vidéo Sérénité",
    tech: "video",
    source: "MP4 local",
    overlayOpacity: 0.55,
    Component: VideoBackground,
  },
  {
    id: "video-server-room",
    name: "Vidéo Server Room",
    tech: "video",
    source: "Seedance 2.0 — couloir serveurs néon violet/cyan",
    overlayOpacity: 0.55,
    Component: function ServerRoomVideo({ className }: { className?: string }) {
      return <VideoBackground className={className} src="/videos/server-room.mp4" />;
    },
  },
  {
    id: "video-dashboard",
    name: "Vidéo Dashboard",
    tech: "video",
    source: "Seedance 2.0 — dashboard SaaS auto-update",
    overlayOpacity: 0.55,
    Component: function DashboardVideo({ className }: { className?: string }) {
      return <VideoBackground className={className} src="/videos/dashboard.mp4" />;
    },
  },
  {
    id: "video-morning-desk",
    name: "Vidéo Bureau Matinal",
    tech: "video",
    source: "Seedance 2.0 — bureau bois + écran flouté",
    overlayOpacity: 0.55,
    Component: function MorningDeskVideo({ className }: { className?: string }) {
      return <VideoBackground className={className} src="/videos/morning-desk.mp4" />;
    },
  },
  {
    id: "video-city-dawn",
    name: "Vidéo Ville Aurore",
    tech: "video",
    source: "Seedance 2.0 — time-lapse skyline sunrise",
    overlayOpacity: 0.55,
    Component: function CityDawnVideo({ className }: { className?: string }) {
      return <VideoBackground className={className} src="/videos/city-dawn.mp4" />;
    },
  },
];

export default function BackgroundsDemoPage() {
  const [filter, setFilter] = useState<Tech | "all">("all");

  const filtered = useMemo(
    () => (filter === "all" ? CANDIDATES : CANDIDATES.filter((c) => c.tech === filter)),
    [filter]
  );

  const counts = useMemo(() => {
    const by: Record<string, number> = {};
    for (const c of CANDIDATES) by[c.tech] = (by[c.tech] || 0) + 1;
    return by;
  }, []);

  return (
    <div className="min-h-screen bg-[#06060A] text-white">
      {/* Top intro */}
      <header className="mx-auto max-w-[1200px] px-6 py-14 text-center sm:px-10 lg:px-20">
        <h1 className="font-display text-4xl font-bold tracking-[-0.02em] md:text-5xl">
          Galerie de fonds animés Vtensor — {CANDIDATES.length} candidats
        </h1>
        <p className="mx-auto mt-3 max-w-[64ch] text-base text-white/60 md:text-lg">
          Le Hero text est posé sur chaque fond pour juger la lisibilité réelle.
          Filtre par catégorie tech ci-dessous, puis scroll.
        </p>
      </header>

      {/* Sticky category nav */}
      <nav
        className="sticky top-0 z-40 border-y border-white/10 bg-[#06060A]/85 backdrop-blur-md"
        aria-label="Filtres par catégorie"
      >
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-2 px-4 py-3 sm:gap-3 sm:px-10 lg:px-20">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              filter === "all"
                ? "border-white/40 bg-white/10 text-white"
                : "border-white/10 text-white/70 hover:border-white/25 hover:text-white"
            }`}
          >
            Tous · {CANDIDATES.length}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.tech}
              type="button"
              onClick={() => setFilter(cat.tech)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                filter === cat.tech
                  ? "border-white/40 bg-white/10 text-white"
                  : "border-white/10 text-white/70 hover:border-white/25 hover:text-white"
              }`}
            >
              <span className="mr-1">{cat.emoji}</span>
              {cat.label} · {counts[cat.tech] || 0}
            </button>
          ))}
        </div>
      </nav>

      {/* Stack of full-screen sections */}
      <main>
        {filtered.map((c) => (
          <section
            key={c.id}
            id={c.id}
            className="relative flex min-h-screen flex-col overflow-hidden border-b border-white/5"
          >
            {/* Fond animé lazy mount/unmount */}
            <LazyBackground>
              <c.Component className="absolute inset-0" />
            </LazyBackground>

            {/* Hero overlay sur chaque section */}
            <HeroPreview overlayOpacity={c.overlayOpacity ?? 0.45} />

            {/* Card identification bottom-right */}
            <div className="pointer-events-auto absolute bottom-6 right-6 z-30 max-w-[280px]">
              <div className="rounded-xl border border-white/10 bg-black/55 p-4 backdrop-blur-md">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-white/50">
                    Candidat
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/[0.05] px-2 py-0.5 text-[10px] text-white/70">
                    {TECH_BADGE[c.tech]}
                  </span>
                </div>
                <div className="mb-1 font-display text-base font-bold leading-tight text-white">
                  {c.name}
                </div>
                <div className="mb-3 text-[11px] text-white/50">{c.source}</div>
                <button
                  type="button"
                  onClick={() =>
                    // eslint-disable-next-line no-alert
                    alert(
                      `Sélection : ${c.name}\n\nPlaceholder — l'intégration finale au Hero se fera plus tard.`
                    )
                  }
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-[0_0_24px_-8px_rgba(34,211,238,0.5)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(90deg, #8B5CF6 0%, #22D3EE 100%)",
                  }}
                >
                  Sélectionner pour le Hero
                </button>
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className="px-6 py-12 text-center text-sm text-white/40 sm:px-10 lg:px-20">
        Page de démo interne · backgrounds-demo · {CANDIDATES.length} candidats
        · IntersectionObserver actif
      </footer>
    </div>
  );
}
