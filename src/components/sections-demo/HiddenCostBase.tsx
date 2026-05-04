"use client";

/**
 * HiddenCostBase — primitives partagées par les 3 variantes du visuel central.
 *
 * Fournit :
 *  - Le tableau PAINS (5 douleurs Vtensor + positions)
 *  - Les composants Counter / CounterStatic
 *  - Le composant FloatingPill (chip strictement scroll-linked)
 *  - Le hook useHiddenCostScroll (scrollYProgress + compteurs h/€ liés)
 *  - Le wrapper StaticFallback (rendu reduced-motion commun)
 *
 * NOTE — Scroll-linked strict : tout (compteurs, chips, ondes) est piloté
 * par `useTransform(scrollYProgress, …, { clamp: true })`. Pas de `once`,
 * pas de `whileInView`. Si l'utilisateur remonte, tout revient en arrière.
 */

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";

export const PAINS = [
  {
    num: "01",
    label: "Capacité",
    title: "Les ressources que vous ne pouviez pas vous offrir",
    desc: "Vous savez précisément ce que votre entreprise pourrait accomplir avec un service client, un commercial et une équipe marketing dédiés à plein temps. Recruter ces profils représente un investissement souvent hors de portée. Vtensor vous donne accès à cette équipe complète pour le coût d'un stagiaire.",
    pos: { x: -32, y: -26 },
  },
  {
    num: "02",
    label: "Focus",
    title: "Vos ressources existantes arrêtent les tâches à faible valeur ajoutée",
    desc: "Vos collaborateurs consacrent une part importante de leur temps à des tâches répétitives — rédiger des mémoires techniques, relancer les factures impayées, mettre à jour les bases articles. Les agents de Vtensor prennent ces opérations en charge et libèrent votre équipe pour ce qui crée réellement de la valeur.",
    pos: { x: 32, y: -26 },
  },
  {
    num: "03",
    label: "Pilotage",
    title: "Vous reprenez le contrôle de votre temps",
    desc: "Le pilotage d'une entreprise mérite votre attention sur les décisions stratégiques, et non sur des tâches opérationnelles répétitives. Vtensor reprend ces dernières et vous restitue les heures que vous seul pouvez consacrer à la croissance de votre activité.",
    pos: { x: -36, y: 18 },
  },
  {
    num: "04",
    label: "Avance",
    title: "Prenez de l'avance tant que c'est encore un avantage",
    desc: "Dans quelques années, l'intégration d'agents IA sera devenue la norme dans toutes les entreprises. C'est aujourd'hui que les organisations qui s'équipent prennent une avance compétitive durable. Vtensor vous aide à prendre ce virage technologique.",
    pos: { x: 36, y: 18 },
  },
  {
    num: "05",
    label: "Souveraineté",
    title: "Made in France, hébergé en France",
    desc: "Vos données restent intégralement en Europe, sur une infrastructure française souveraine. Conformité RGPD garantie par construction, aucun transfert vers les grands fournisseurs cloud américains.",
    pos: { x: 0, y: 32 },
  },
] as const;

export type Pain = (typeof PAINS)[number];

export const TARGET_HOURS = 1040;
export const TARGET_EUROS = 52000;

/**
 * Bornes scroll-linked partagées (en fraction de scrollYProgress).
 * - SECTION_HEIGHT_VH : hauteur de la section parente (3x le viewport).
 * - PROGRESS_START : point où le compteur commence à monter.
 * - PROGRESS_END : point où le compteur a fini sa course (et toutes chips visibles).
 * - HEADER_FADE_START / HEADER_FADE_END : opacité du compteur top.
 * - TITLE_FADE_START / TITLE_FADE_END : opacité du titre central.
 * - CHIPS_START : début d'apparition des chips (laisse le compteur prendre de l'avance).
 * - CHIPS_WINDOW : largeur (en progress) que met UNE chip à apparaître.
 * - CHIPS_GAP : décalage entre chaque chip.
 */
export const SECTION_HEIGHT_VH = 300;
export const PROGRESS_START = 0.1;
export const PROGRESS_END = 0.85;
export const HEADER_FADE_IN = [0.02, 0.1] as const;
export const HEADER_FADE_OUT = [0.92, 1.0] as const;
export const TITLE_FADE_IN = [0.02, 0.12] as const;
export const TITLE_FADE_OUT = [0.92, 1.0] as const;
export const CHIPS_START = 0.18;
export const CHIPS_WINDOW = 0.12;
export const CHIPS_GAP = 0.1;

/**
 * Hook : expose scrollYProgress (lié au viewport, pas à la sticky window),
 * la ref section, et les compteurs h/€ TEXTUELS — qui suivent le scroll
 * en temps réel (montent ET descendent).
 *
 * `offset: ["start end", "end start"]` → la section est "active" depuis le
 * moment où son haut touche le bas du viewport jusqu'au moment où son bas
 * touche le haut du viewport. C'est ça qui permet d'avoir une vraie
 * progression linéaire en montant ET en descendant.
 */
export function useHiddenCostScroll(reduce: boolean | null) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Interpolation directe scroll → valeur, clamp pour ne jamais dépasser.
  const hoursMV = useTransform(
    scrollYProgress,
    [PROGRESS_START, PROGRESS_END],
    [0, TARGET_HOURS],
    { clamp: true },
  );
  const eurosMV = useTransform(
    scrollYProgress,
    [PROGRESS_START, PROGRESS_END],
    [0, TARGET_EUROS],
    { clamp: true },
  );

  const [hours, setHours] = useState(0);
  const [euros, setEuros] = useState(0);

  useMotionValueEvent(hoursMV, "change", (v) => {
    if (reduce) return;
    setHours(Math.round(v));
  });
  useMotionValueEvent(eurosMV, "change", (v) => {
    if (reduce) return;
    // Arrondi 100€ pour éviter le scintillement
    setEuros(Math.round(v / 100) * 100);
  });

  return { sectionRef, scrollYProgress, hours, euros };
}

/** Compteur sticky (haut de section), couleur d'accent. */
export function Counter({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: string;
}) {
  return (
    <div
      className="flex items-baseline gap-2 rounded-2xl border border-white/10 bg-black/55 backdrop-blur-md px-4 py-2.5"
      style={{ boxShadow: `0 0 32px ${accent}22` }}
    >
      <span
        className="font-display font-bold tabular-nums"
        style={{
          color: accent,
          fontSize: "clamp(20px, 2.6vw, 32px)",
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </span>
      <span className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/60">
        {label}
      </span>
    </div>
  );
}

/** Compteur statique (rendu reduced-motion). */
export function CounterStatic({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
      <span className="font-display text-white text-2xl font-bold tabular-nums">
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-[0.18em] text-white/60">
        {label}
      </span>
    </div>
  );
}

/**
 * Helpers — calcule les bornes [start, end] d'une chip i (0..n-1).
 * À utiliser à la fois pour FloatingPill et pour les triggers ondes/lignes.
 */
export function chipBounds(i: number) {
  const start = CHIPS_START + i * CHIPS_GAP;
  const end = start + CHIPS_WINDOW;
  return { start, end };
}

/**
 * FloatingPill — chip totalement scroll-linked.
 *
 * Tout (opacity, scale, x, y) est `useTransform(scrollYProgress, …, { clamp: true })`.
 * Pas de `whileInView`, pas de `once`. Si l'utilisateur remonte, la chip
 * disparaît proprement.
 *
 * `onAppear` est déclenché UNE FOIS quand la chip dépasse 0.5 d'opacité en
 * descendant. Si l'utilisateur remonte sous 0.2 puis redescend, l'event
 * peut être re-déclenché — c'est volontaire pour les ondes V1 / lignes V2 /
 * particules V3 qui doivent re-jouer.
 */
export function FloatingPill({
  pain,
  progress,
  index,
  fromX,
  fromY,
  onAppear,
  onDisappear,
}: {
  pain: Pain;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  fromX: number;
  fromY: number;
  onAppear?: () => void;
  onDisappear?: () => void;
}) {
  const { start, end } = chipBounds(index);

  const opacity = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const scale = useTransform(progress, [start, end], [0.5, 1], { clamp: true });
  const tx = useTransform(progress, [start, end], [fromX, 0], { clamp: true });
  const ty = useTransform(progress, [start, end], [fromY, 0], { clamp: true });

  // Trigger onAppear / onDisappear avec hystérésis sur seuils
  // (évite d'osciller autour de 0.5 si le scroll s'arrête juste là).
  const wasVisible = useRef(false);
  useMotionValueEvent(opacity, "change", (v) => {
    if (!wasVisible.current && v > 0.55) {
      wasVisible.current = true;
      onAppear?.();
    } else if (wasVisible.current && v < 0.2) {
      wasVisible.current = false;
      onDisappear?.();
    }
  });

  return (
    <motion.div
      className="absolute z-10"
      style={{
        left: `calc(50% + ${pain.pos.x}vw)`,
        top: `calc(50% + ${pain.pos.y}vh)`,
        x: tx,
        y: ty,
        scale,
        opacity,
        translateX: "-50%",
        translateY: "-50%",
        width: "min(360px, 88vw)",
        willChange: "transform, opacity",
      }}
    >
      <div
        className="relative overflow-hidden rounded-3xl px-7 py-7 text-left"
        style={{
          background: "rgba(10,10,15,0.94)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 16px 40px -12px rgba(0,0,0,0.55), inset 0 1px 0 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Numéro géant en watermark coin haut-droit */}
        <div
          className="pointer-events-none absolute -top-6 -right-2 select-none font-display font-black leading-none text-white/[0.05]"
          style={{ fontSize: "150px" }}
          aria-hidden
        >
          {pain.num}
        </div>

        <div className="relative">
          {/* Label uppercase cyan tout en haut */}
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#22D3EE] font-semibold mb-4">
            {pain.label}
          </div>

          {/* Titre display blanc, gauche-aligné */}
          <h3
            className="font-display font-bold text-white leading-[1.18] tracking-[-0.005em] mb-4"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)" }}
          >
            {pain.title}
          </h3>

          {/* Description gris discret */}
          <p
            className="text-white/60"
            style={{
              fontSize: "13px",
              lineHeight: 1.6,
              fontFamily:
                "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {pain.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/** Rendu reduced-motion commun aux 3 variantes. */
export function StaticFallback() {
  return (
    <section className="relative bg-[#0A0A0F] text-white py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <CounterStatic
            value={`+${TARGET_HOURS} h`}
            label="récupérées / an"
          />
          <CounterStatic
            value={`+${TARGET_EUROS.toLocaleString("fr-FR")} €`}
            label="de valeur retrouvée / an"
          />
        </div>
        <div className="flex flex-col items-center gap-3 mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/vtensor-wordmark-white.svg"
            alt="Vtensor"
            className="h-12 sm:h-16 md:h-20 w-auto select-none"
            draggable={false}
          />
          <h2
            className="font-display text-center text-white/90 font-semibold mx-auto"
            style={{
              fontSize: "clamp(20px, 2.2vw, 32px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              maxWidth: "20ch",
            }}
          >
            c&apos;est concrètement…
          </h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[820px] mx-auto">
          {PAINS.map((p) => (
            <li
              key={p.title}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
            >
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[#22D3EE] shrink-0" />
              <div>
                <h3 className="font-display text-white text-base font-semibold">
                  {p.title}
                </h3>
                <p className="text-white/60 text-sm mt-1">{p.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Le titre central (commun aux 3 variantes), opacité contrôlée par le scroll. */
export function CenterTitle({
  opacity,
}: {
  opacity: MotionValue<number> | number;
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-[480px] px-4 text-center pointer-events-none flex flex-col items-center gap-3"
      style={{ opacity }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logos/vtensor-wordmark-white.svg"
        alt="Vtensor"
        className="h-12 sm:h-16 md:h-20 w-auto select-none"
        draggable={false}
      />
      <h2
        className="font-display text-white/90 font-semibold mx-auto"
        style={{
          fontSize: "clamp(20px, 2.2vw, 32px)",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          maxWidth: "20ch",
        }}
      >
        c&apos;est concrètement…
      </h2>
    </motion.div>
  );
}
