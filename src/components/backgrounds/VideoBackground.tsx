"use client";

import { useEffect, useRef, useState } from "react";

type VideoBackgroundProps = {
  /** Source MP4 (relative to /public). Default: serenity-coffee.mp4 */
  src?: string;
  /**
   * Vidéo qui prend le relais quand `src` finit (cross-fade 500ms).
   * La 1ère frame de `loopSrc` doit matcher la dernière frame de `src` pour un raccord invisible.
   *
   * Comportement contrôlé par `loopMode` :
   *  - "infinite" (défaut) : la vidéo secondaire boucle indéfiniment.
   *  - "pause" : la vidéo secondaire est jouée une seule fois et se fige
   *     sur sa dernière frame (utile pour finir l'intro et fixer un visuel).
   */
  loopSrc?: string;
  /** Voir `loopSrc`. Défaut : "infinite". */
  loopMode?: "infinite" | "pause";
  /** Optional className passed by the demo page (so it can position absolute). */
  className?: string;
  /** Dark overlay opacity over the video to keep foreground text readable. */
  overlayOpacity?: number;
  /**
   * Si true (default), la vidéo principale boucle en continu.
   * Ignoré quand `loopSrc` est fourni (le secondaire s'occupe du loop).
   */
  loop?: boolean;
  /** Si true, redémarre la vidéo depuis le début à chaque réentrée dans le viewport (utile combiné avec loop=false). */
  replayOnReenter?: boolean;
};

/**
 * VideoBackground — fond vidéo muet, mode "ambiance".
 *
 * - autoPlay + muted + playsInline pour démarrer tout seul sur tous navigateurs
 * - loop optionnel (default true)
 * - loopSrc optionnel : 2e vidéo en relais infini après la 1ère, cross-fade 500ms
 * - replayOnReenter : recalcul scroll qui rejoue à 0 quand le bloc revient en viewport
 * - Respecte prefers-reduced-motion : pause à la 1ère frame
 * - object-cover pour remplir sans déformer
 * - aria-hidden : décoratif uniquement
 */
export function VideoBackground({
  src = "/videos/serenity-coffee.mp4",
  loopSrc,
  loopMode = "infinite",
  className = "",
  overlayOpacity = 0.55,
  loop = true,
  replayOnReenter = false,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [primaryEnded, setPrimaryEnded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      v.pause();
    }
  }, []);

  useEffect(() => {
    if (!replayOnReenter) return;
    const v = videoRef.current;
    const c = containerRef.current;
    if (!v || !c) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // On utilise `getBoundingClientRect` (déterministe, contrôlé) plutôt qu'un
    // IntersectionObserver (qui fire des `intersectionRatio: 0` parasites lors
    // d'optimisations browser sur micro-scroll). Logique :
    //   - hasFullyExited devient `true` UNIQUEMENT quand `rect.bottom <= 0`
    //     (le Hero est entièrement passé au-dessus du viewport).
    //   - Quand le Hero re-entre dans le viewport ET que le flag est armé →
    //     reset + play.
    // Initialisé à `true` pour permettre le 1er play au mount.
    let hasFullyExited = true;
    let rafId = 0;
    let pending = false;

    const check = () => {
      pending = false;
      const rect = c.getBoundingClientRect();
      if (rect.bottom <= 0) {
        // Hero entièrement passé au-dessus du viewport → arme le replay.
        hasFullyExited = true;
        return;
      }
      if (hasFullyExited && rect.top < window.innerHeight && rect.bottom > 0) {
        // Hero ré-entre dans le viewport après sortie totale → play.
        hasFullyExited = false;
        try {
          v.currentTime = 0;
          const p = v.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } catch {
          /* noop */
        }
      }
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      rafId = requestAnimationFrame(check);
    };

    // 1er check au mount → permet le play initial.
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [replayOnReenter]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden bg-[#0A0A0F] ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop={loop && !loopSrc}
        playsInline
        preload="auto"
        onEnded={() => {
          if (loopSrc) setPrimaryEnded(true);
        }}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: loopSrc && primaryEnded ? 0 : 1 }}
        aria-hidden="true"
      />
      {loopSrc && (
        <video
          src={loopSrc}
          autoPlay
          muted
          loop={loopMode === "infinite"}
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: primaryEnded ? 1 : 0 }}
          aria-hidden="true"
        />
      )}
      {/* Dark overlay pour lisibilité texte */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: `rgba(10, 10, 15, ${overlayOpacity})` }}
      />
    </div>
  );
}
