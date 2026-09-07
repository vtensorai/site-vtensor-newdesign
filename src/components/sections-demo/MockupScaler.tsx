"use client";

/**
 * MockupScaler — sous lg (1024 px), rend son contenu à une largeur fixe
 * desktop (1200 px) et le met à l'échelle pour tenir dans son conteneur
 * (`transform: scale(k)`, hauteur du conteneur ajustée). Au-dessus, rendu
 * natif inchangé.
 *
 * Le mode mis à l'échelle n'est activé qu'après montage : premier rendu
 * client identique au SSR (pas d'erreur d'hydratation), sans saut de
 * layout puisque le mock garde le même ratio 16/10.
 */

import { useEffect, useRef, useState } from "react";

/** Largeur desktop de référence (= max-w du cadre navigateur). */
const DESIGN_WIDTH = 1200;
/** Sous cette largeur de viewport, on passe en mode mis à l'échelle. */
const BREAKPOINT = 1024;

export function MockupScaler({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const [innerHeight, setInnerHeight] = useState<number>(DESIGN_WIDTH * (10 / 16));

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner || typeof ResizeObserver === "undefined") return;

    const mq = window.matchMedia(`(max-width: ${BREAKPOINT - 1}px)`);
    const update = () => {
      setScale(mq.matches ? outer.clientWidth / DESIGN_WIDTH : null);
      setInnerHeight(inner.offsetHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    ro.observe(inner);
    mq.addEventListener("change", update);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", update);
    };
  }, []);

  const scaled = scale !== null && scale < 1;

  return (
    <div
      ref={outerRef}
      className="relative w-full overflow-hidden"
      style={scaled ? { height: Math.round(innerHeight * scale) } : undefined}
      data-mock-scale={scaled ? scale.toFixed(3) : undefined}
    >
      <div
        ref={innerRef}
        style={
          scaled
            ? { width: DESIGN_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left" }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}
