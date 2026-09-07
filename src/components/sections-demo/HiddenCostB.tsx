"use client";

/**
 * HiddenCostB — Sanjaya + compteur Vtensor (scroll-linked strict).
 *
 * Reprend l'architecture Sanjaya (sticky + cercles + chips) et ajoute un
 * compteur en haut qui suit le scroll en temps réel :
 *   "0 → 520h/an perdues" + "0 → 26 000 € gaspillés".
 *
 * Tout est dérivé de `scrollYProgress` via `useTransform({ clamp: true })`
 * — donc remonter le scroll fait redescendre le compteur et disparaître
 * les chips dans l'ordre inverse.
 *
 * Props :
 *  - withGrid?: boolean → ajoute un fond AnimatedGridBackground (dots qui
 *    suivent la souris) en arrière-plan, derrière les cercles.
 *
 * 2026-09-07 (QA) :
 *  - < lg (1024 px) → rendu empilé (HiddenCostMobile) : les cartes positionnées
 *    en vw/vh sortaient du viewport sur tablette (820 / 768 px).
 *  - Desktop : layout anti-chevauchement. Les positions naturelles (vw/vh)
 *    sont conservées tant que tout tient ; sinon les compteurs remontent, les
 *    cartes du haut passent sous les compteurs, celles du bas se calent sur
 *    le bord inférieur, le titre se recale entre les deux, et en dernier
 *    recours le contenu des cartes est réduit (≥ 0.7). Aucune position n'est
 *    appliquée avant montage → premier rendu client identique au SSR.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion, motion, useTransform } from "motion/react";
import {
  PAINS,
  Counter,
  FloatingPill,
  StaticFallback,
  CenterTitle,
  useHiddenCostScroll,
  SECTION_HEIGHT_VH,
  HEADER_FADE_IN,
  HEADER_FADE_OUT,
  TITLE_FADE_IN,
  TITLE_FADE_OUT,
  TARGET_HOURS,
  TARGET_EUROS,
} from "./HiddenCostBase";
import { HiddenCostMobile } from "./HiddenCostMobile";

export function HiddenCostB({
  withGrid = false,
  hideKickerLabel = false,
}: {
  withGrid?: boolean;
  /** Cache le label `// ce que vous vivez` du CenterTitle (utilisé quand un SectionDivider amont rend déjà ce label). */
  hideKickerLabel?: boolean;
} = {}) {
  const reduce = useReducedMotion();

  if (reduce) return <StaticFallback />;

  return (
    <>
      {/* < lg — stack vertical, pas de chips flottantes ni cercles */}
      <div className="lg:hidden">
        <HiddenCostMobile />
      </div>
      {/* ≥ lg — version Sanjaya complète */}
      <div className="hidden lg:block">
        <HiddenCostBDesktop withGrid={withGrid} hideKickerLabel={hideKickerLabel} />
      </div>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────
// Layout anti-chevauchement (desktop)
// ────────────────────────────────────────────────────────────────────

type Size = { w: number; h: number };

export type HiddenCostLayout = {
  /** Bord haut des compteurs (px). */
  countersTop: number;
  /** Centre vertical du titre (px). */
  titleCenter: number;
  /** Centres des 5 cartes (px), dans l'ordre de PAINS. */
  centers: Array<{ x: number; y: number }>;
  /** Réduction du contenu des cartes (1 = taille normale). */
  cardScale: number;
};

/** Marge minimale avec les bords du viewport. */
const EDGE = 16;
/** Espace minimal entre deux éléments qui se recouvrent horizontalement. */
const GAP = 18;
/** En dessous, on arrête de réduire les cartes (lisibilité). */
const MIN_CARD_SCALE = 0.7;
/** Position historique des compteurs : `top-[12vh]`. */
const COUNTERS_TOP_RATIO = 0.12;
const TOP_ROW = [0, 1] as const;
const BOTTOM_ROW = [2, 3, 4] as const;

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const overlapsX = (aL: number, aR: number, bL: number, bR: number) => aL < bR && bL < aR;

/**
 * Calcule les positions à partir des tailles mesurées (compteurs à leur
 * largeur finale, titre, cartes) dans un viewport W×H. Déterministe.
 */
export function computeHiddenCostLayout(
  W: number,
  H: number,
  counters: Size,
  title: Size,
  cards: Size[],
  /** Bord haut utilisable (px) : sous la nav fixe du site. */
  topInset: number = EDGE,
): HiddenCostLayout {
  const natX = PAINS.map((p) => W / 2 + (p.pos.x / 100) * W);
  const natY = PAINS.map((p) => H / 2 + (p.pos.y / 100) * H);

  let cardScale = 1;
  let countersTop = Math.max(COUNTERS_TOP_RATIO * H, topInset);
  let cw: number[] = [];
  let ch: number[] = [];
  let cx: number[] = [];
  let cy: number[] = [];

  // Résout les positions pour (countersTop, cardScale) et renvoie le
  // dépassement vertical résiduel (0 = tout tient).
  const solve = () => {
    cw = cards.map((c) => c.w * cardScale);
    ch = cards.map((c) => c.h * cardScale);
    cx = natX.map((x, i) => clamp(x, EDGE + cw[i] / 2, W - EDGE - cw[i] / 2));
    cy = [...natY];

    const cBottom = countersTop + counters.h;
    const cL = W / 2 - counters.w / 2;
    const cR = W / 2 + counters.w / 2;

    // Rangée du haut : sous les compteurs si elle les recouvre horizontalement.
    for (const i of TOP_ROW) {
      const underCounters = overlapsX(cx[i] - cw[i] / 2, cx[i] + cw[i] / 2, cL, cR);
      const minTop = underCounters ? cBottom + GAP : topInset;
      cy[i] = Math.max(natY[i], minTop + ch[i] / 2);
    }

    // Rangée du bas (+ carte centrale) : sous la rangée du haut, dans le viewport.
    // Le "déficit" ne compte que le conflit avec la rangée du haut : une carte
    // qui déborde simplement du bas (position naturelle) est juste remontée.
    let deficit = 0;
    for (const b of BOTTOM_ROW) {
      let minTop = -Infinity;
      for (const t of TOP_ROW) {
        if (overlapsX(cx[t] - cw[t] / 2, cx[t] + cw[t] / 2, cx[b] - cw[b] / 2, cx[b] + cw[b] / 2)) {
          minTop = Math.max(minTop, cy[t] + ch[t] / 2 + GAP);
        }
      }
      const maxY = H - EDGE - ch[b] / 2;
      const required = minTop + ch[b] / 2;
      if (Number.isFinite(required) && required > maxY) {
        deficit = Math.max(deficit, required - maxY);
      }
      cy[b] = Math.min(Math.max(natY[b], required), maxY);
    }
    return deficit;
  };

  let deficit = solve();
  // 1. Remonter les compteurs (jamais sous la nav).
  if (deficit > 0.5) {
    countersTop = Math.max(topInset, countersTop - deficit);
    deficit = solve();
  }
  // 2. Dernier recours : réduire le contenu des cartes.
  for (let k = 0; k < 4 && deficit > 0.5 && cardScale > MIN_CARD_SCALE; k++) {
    const column = ch[0] + ch[2];
    cardScale = Math.max(MIN_CARD_SCALE, cardScale * (1 - (deficit + 1) / column));
    deficit = solve();
  }

  // Titre : centré ; remonté si la carte 05 (centre bas) le recouvre ;
  // jamais au-dessus des compteurs.
  const cBottom = countersTop + counters.h;
  const i5 = 4;
  let titleCenter = H / 2;
  const tL = W / 2 - title.w / 2;
  const tR = W / 2 + title.w / 2;
  if (overlapsX(tL, tR, cx[i5] - cw[i5] / 2, cx[i5] + cw[i5] / 2)) {
    titleCenter = Math.min(titleCenter, cy[i5] - ch[i5] / 2 - GAP - title.h / 2);
  }
  titleCenter = Math.max(titleCenter, cBottom + GAP + title.h / 2);

  return {
    countersTop: Math.round(countersTop),
    titleCenter: Math.round(titleCenter),
    centers: cx.map((x, i) => ({ x: Math.round(x), y: Math.round(cy[i]) })),
    cardScale: Math.round(cardScale * 1000) / 1000,
  };
}

/** "52000" → "52 000" (séparateur fin insécable), sans dépendre de l'ICU (SSR = client). */
const formatThousands = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

function HiddenCostBDesktop({
  withGrid = false,
  hideKickerLabel = false,
}: {
  withGrid?: boolean;
  hideKickerLabel?: boolean;
} = {}) {
  const { sectionRef, scrollYProgress, hours, euros } = useHiddenCostScroll(false);

  // Mesures → layout (après montage uniquement)
  const stickyRef = useRef<HTMLDivElement>(null);
  const countersMaxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [layout, setLayout] = useState<HiddenCostLayout | null>(null);

  useEffect(() => {
    const sticky = stickyRef.current;
    if (!sticky || typeof ResizeObserver === "undefined") return;
    let raf = 0;

    const measure = () => {
      raf = 0;
      const counters = countersMaxRef.current;
      const title = titleRef.current;
      const cards = cardRefs.current.slice(0, PAINS.length);
      if (!counters || !title || cards.length < PAINS.length || cards.some((c) => !c)) return;
      const h2 = title.querySelector("h2");
      // Nav fixe du site (Hero) : rien ne doit passer dessous.
      const nav = document.querySelector<HTMLElement>("nav.fixed");
      const navBottom = nav ? nav.getBoundingClientRect().bottom : 0;
      const next = computeHiddenCostLayout(
        sticky.clientWidth,
        sticky.clientHeight,
        { w: counters.offsetWidth, h: counters.offsetHeight },
        { w: h2 ? h2.offsetWidth : title.offsetWidth, h: title.offsetHeight },
        cards.map((c) => ({ w: c!.offsetWidth, h: c!.offsetHeight })),
        Math.max(EDGE, Math.round(navBottom) + 12),
      );
      setLayout((prev) =>
        prev && JSON.stringify(prev) === JSON.stringify(next) ? prev : next,
      );
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    const ro = new ResizeObserver(schedule);
    ro.observe(sticky);
    [countersMaxRef.current, titleRef.current, ...cardRefs.current].forEach((el) => {
      if (el) ro.observe(el);
    });
    schedule();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(schedule).catch(() => {});
    }
    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Cercles : pulse léger sur la traversée
  const ringScale = useTransform(
    scrollYProgress,
    [0.1, 0.5, 0.9],
    [0.85, 1.05, 0.95],
    { clamp: true },
  );
  const ringOpacity = useTransform(
    scrollYProgress,
    [HEADER_FADE_IN[0], HEADER_FADE_IN[1], HEADER_FADE_OUT[0], HEADER_FADE_OUT[1]],
    [0, 1, 1, 0.6],
    { clamp: true },
  );

  // Compteur top
  const headerOpacity = useTransform(
    scrollYProgress,
    [HEADER_FADE_IN[0], HEADER_FADE_IN[1], HEADER_FADE_OUT[0], HEADER_FADE_OUT[1]],
    [0, 1, 1, 0.5],
    { clamp: true },
  );

  // Titre central
  const titleOpacity = useTransform(
    scrollYProgress,
    [TITLE_FADE_IN[0], TITLE_FADE_IN[1], TITLE_FADE_OUT[0], TITLE_FADE_OUT[1]],
    [0, 1, 1, 0.5],
    { clamp: true },
  );

  return (
    <section
      ref={sectionRef}
      className="relative text-white"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
      aria-label="Le coût caché du travail manuel"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        {/* V0.18.0 : grid+glow body suffisent (signature dev/tech). withGrid kept for backwards compat */}

        {/* Gabarit invisible des compteurs à leur valeur finale : largeur stable
            pour le calcul du layout (le compteur visible s'élargit en montant). */}
        <div
          ref={countersMaxRef}
          aria-hidden
          className="absolute top-0 left-0 invisible pointer-events-none w-max max-w-[calc(100vw-32px)] flex flex-wrap justify-center gap-3 md:gap-5"
        >
          <Counter value={`+${TARGET_HOURS} h`} label="libérées / an" accent="#22D3EE" />
          <Counter
            value={`+${formatThousands(TARGET_EUROS)} €`}
            label="économisés / an"
            accent="#8B5CF6"
          />
        </div>

        {/* Sticky counter top */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-20 w-max max-w-[calc(100vw-32px)] flex flex-wrap justify-center gap-3 md:gap-5"
          style={{ top: layout ? layout.countersTop : "12vh", opacity: headerOpacity }}
        >
          <Counter
            value={`+${hours} h`}
            label="libérées / an"
            accent="#22D3EE"
          />
          <Counter
            value={`+${euros.toLocaleString("fr-FR")} €`}
            label="économisés / an"
            accent="#8B5CF6"
          />
        </motion.div>

        {/* Concentric circles — light shadow uniquement sur le 1er cercle pour réduire le paint */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]"
          style={{
            scale: ringScale,
            opacity: ringOpacity,
            willChange: "transform, opacity",
          }}
          aria-hidden
        >
          {[180, 320, 480, 660].map((size, i) => (
            <div
              key={size}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                width: size,
                height: size,
                borderColor: `rgba(34, 211, 238, ${0.22 - i * 0.04})`,
              }}
            />
          ))}
          {/* Halo central léger en absolute, ne se repaint pas pendant le scroll */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: 180,
              height: 180,
              background:
                "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Central title */}
        <CenterTitle
          ref={titleRef}
          opacity={titleOpacity}
          hideKickerLabel={hideKickerLabel}
          centerY={layout ? layout.titleCenter : null}
        />

        {/* Pills — scroll-linked strict */}
        {PAINS.map((p, i) => {
          const fromX = i % 2 === 0 ? -32 : 32;
          const fromY = i === 4 ? -20 : i < 2 ? -14 : 14;
          return (
            <FloatingPill
              key={p.title}
              pain={p}
              progress={scrollYProgress}
              index={i}
              fromX={fromX}
              fromY={fromY}
              centerPx={layout ? layout.centers[i] : null}
              contentScale={layout ? layout.cardScale : 1}
              cardRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
