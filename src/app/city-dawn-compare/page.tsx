"use client";

import { useState } from "react";
import { LazyBackground } from "@/components/backgrounds/LazyBackground";
import { VideoBackground } from "@/components/backgrounds/VideoBackground";
import { HeroPreview } from "@/components/sections/HeroPreview";

type VideoCandidate = {
  num: number;
  id: string;
  src: string;
  title: string;
  author: string;
  duration: string;
  resolution: string;
  size: string;
  warning?: string;
  current?: boolean;
};

const VIDEOS: VideoCandidate[] = [
  {
    num: 1,
    id: "brno-current",
    src: "/videos/city-dawn.mp4",
    title: "Brno · Jour → Nuit · 58s",
    author: "Ben Kyselka (Pexels)",
    duration: "58s",
    resolution: "1920×1080",
    size: "6.7 MB",
    current: true,
  },
  {
    num: 2,
    id: "sp-aerial",
    src: "/videos/city-saopaulo-aerial.mp4",
    title: "São Paulo aérien · Jour → Nuit · 31s",
    author: "Pexels (#14549980)",
    duration: "31s",
    resolution: "1920×1080",
    size: "4.2 MB",
  },
  {
    num: 3,
    id: "brno-winter",
    src: "/videos/city-brno-winter.mp4",
    title: "Brno hiver · Nuit → Jour · 28s",
    author: "Pexels (#36282125)",
    duration: "28s",
    resolution: "1920×1080",
    size: "5.1 MB",
  },
  {
    num: 4,
    id: "sunset",
    src: "/videos/city-sunset.mp4",
    title: "Ville · Coucher → Nuit · 18s",
    author: "Pexels (#6606212)",
    duration: "18s",
    resolution: "1920×1080",
    size: "2.3 MB",
  },
  {
    num: 5,
    id: "sp-long",
    src: "/videos/city-saopaulo-long.mp4",
    title: "São Paulo long · Jour ↔ Nuit · 102s",
    author: "Pexels (#13438455)",
    duration: "102s",
    resolution: "1920×1080",
    size: "14 MB",
    warning: "⚠️ 2 clips concaténés, cut visible à mi-vidéo",
  },
];

const NAV_LABELS: Record<string, string> = {
  "brno-current": "1 · Brno actuel",
  "sp-aerial": "2 · SP aérien",
  "brno-winter": "3 · Brno hiver",
  sunset: "4 · Coucher",
  "sp-long": "5 · SP long",
};

export default function CityDawnComparePage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0F] text-white">
      {/* Sticky top nav */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0F]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 overflow-x-auto px-4 py-3 sm:px-8">
          <span className="mr-3 shrink-0 text-xs font-semibold uppercase tracking-widest text-white/50">
            Comparer →
          </span>
          {VIDEOS.map((v) => (
            <a
              key={v.id}
              href={`#${v.id}`}
              className="shrink-0 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/85 transition-colors hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
            >
              {NAV_LABELS[v.id]}
            </a>
          ))}
          {selected && (
            <span className="ml-auto shrink-0 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-200">
              Sélection : {NAV_LABELS[selected]}
            </span>
          )}
        </div>
      </nav>

      {/* 5 sections en stack */}
      {VIDEOS.map((v) => (
        <section
          key={v.id}
          id={v.id}
          className="relative h-screen w-full overflow-hidden"
        >
          {/* Lazy-mounted video background : ne joue qu'à l'écran */}
          <LazyBackground rootMargin="300px">
            <VideoBackground src={v.src} overlayOpacity={0.55} />
          </LazyBackground>

          {/* Hero overlay réutilisé */}
          <HeroPreview overlayOpacity={0.35} />

          {/* Identification card bottom-right */}
          <div className="absolute bottom-6 right-6 z-30 max-w-sm rounded-2xl border border-white/15 bg-black/70 p-5 shadow-2xl backdrop-blur-md">
            <div className="mb-3 flex items-center gap-3">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-bold ${
                  v.current
                    ? "bg-amber-400/20 text-amber-200 ring-1 ring-amber-400/40"
                    : "bg-white/10 text-white"
                }`}
              >
                {v.num}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-tight text-white">
                  {v.title}
                </span>
                <span className="text-[11px] text-white/60">{v.author}</span>
              </div>
            </div>

            <div className="mb-3 flex flex-wrap gap-1.5">
              {v.current && (
                <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
                  En place
                </span>
              )}
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/80">
                {v.duration}
              </span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/80">
                {v.resolution}
              </span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/80">
                {v.size}
              </span>
            </div>

            {v.warning && (
              <p className="mb-3 rounded-lg border border-orange-400/30 bg-orange-400/10 px-2.5 py-1.5 text-[11px] leading-relaxed text-orange-100">
                {v.warning}
              </p>
            )}

            <button
              type="button"
              onClick={() => setSelected(v.id)}
              className={`w-full rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                selected === v.id
                  ? "bg-emerald-400 text-emerald-950 shadow-[0_0_24px_-6px_rgba(52,211,153,0.7)]"
                  : "bg-white text-black hover:bg-white/90"
              }`}
            >
              {selected === v.id
                ? "✓ Sélectionnée"
                : "Sélectionner cette vidéo"}
            </button>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0A0A0F] px-6 py-10 text-center">
        <p className="text-sm text-white/60">
          5 vidéos time-lapse jour/nuit comparées avec le Hero overlay réel.
        </p>
        <p className="mt-2 text-xs text-white/40">
          Sticky nav top pour ancrer rapidement · Reduced-motion : pause sur
          1ère frame.
        </p>
      </footer>
    </div>
  );
}
