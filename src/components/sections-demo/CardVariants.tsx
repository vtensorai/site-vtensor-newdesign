"use client";

/**
 * CardVariants — 4 propositions de design pour les cartes "ressources libérées".
 *
 * Chaque variante implémente le même contenu (PAINS[0]) avec une direction
 * artistique distincte, pour permettre la comparaison côte à côte.
 *
 * Inspirations : Linear, Anthropic, Vercel, Resend, Stripe Press, Cal.com.
 */

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkle } from "@phosphor-icons/react/dist/ssr";

const SAMPLE = {
  num: "01",
  label: "Capacité",
  title: "Les ressources que vous ne pouviez pas vous offrir",
  desc:
    "Vous savez précisément ce que votre entreprise pourrait accomplir avec un service client, un commercial et une équipe marketing dédiés à plein temps. Recruter ces profils représente un investissement souvent hors de portée. Vtensor vous donne accès à cette équipe complète pour le coût d'un stagiaire.",
};

// ─── A — Aurora Frame ─────────────────────────────────────────────────────────
// Inspiration : Anthropic (claude.ai), Lovable. Bordure gradient subtile,
// glow latent intérieur. Hover : la bordure s'illumine, légère élévation.

export function CardVariantA() {
  return (
    <article
      className="group relative overflow-hidden rounded-3xl p-[1px] transition-transform duration-500 will-change-transform hover:-translate-y-1"
      style={{
        background:
          "linear-gradient(135deg, rgba(139,92,246,0.4) 0%, rgba(34,211,238,0.2) 50%, rgba(139,92,246,0.1) 100%)",
      }}
    >
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-[#0E0E13] p-7 sm:p-8">
        {/* glow latent en haut */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-50 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.25), transparent 65%)",
          }}
          aria-hidden
        />

        <div className="relative">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[11px] font-mono font-semibold text-[#A78BFA]">
              {SAMPLE.num}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
              {SAMPLE.label}
            </span>
          </div>
          <h3 className="font-display text-[20px] sm:text-[22px] font-bold leading-[1.2] tracking-[-0.01em] text-white mb-4">
            {SAMPLE.title}
          </h3>
          <p className="text-[14px] leading-[1.65] text-white/60">
            {SAMPLE.desc}
          </p>
        </div>
      </div>
    </article>
  );
}

// ─── B — Editorial ────────────────────────────────────────────────────────────
// Inspiration : Stripe Press, Linear blog. Numéro géant en arrière-plan,
// typo magazine. Hover : le numéro s'intensifie + ligne basse révélée.

export function CardVariantB() {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/8 bg-[#0A0A0F] p-7 sm:p-9 transition-colors duration-500 hover:border-white/15">
      {/* Numéro géant background */}
      <div
        className="pointer-events-none absolute -top-12 -right-4 select-none font-display text-[180px] font-black leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-white/[0.07]"
        aria-hidden
      >
        {SAMPLE.num}
      </div>

      <div className="relative">
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#22D3EE] font-semibold mb-6">
          {SAMPLE.label}
        </div>
        <h3
          className="font-display font-bold leading-[1.15] tracking-[-0.01em] text-white mb-5"
          style={{ fontSize: "clamp(20px, 2vw, 24px)" }}
        >
          {SAMPLE.title}
        </h3>
        <p className="text-[14px] leading-[1.7] text-white/65 mb-6">
          {SAMPLE.desc}
        </p>

        {/* Ligne basse + arrow révélé au hover */}
        <div className="flex items-center justify-between border-t border-white/8 pt-4 transition-colors duration-500 group-hover:border-white/15">
          <span className="text-[11px] uppercase tracking-[0.16em] text-white/30 font-medium">
            Vtensor / Catalogue
          </span>
          <ArrowUpRight
            size={16}
            weight="bold"
            className="text-white/30 transition-all duration-500 group-hover:text-[#22D3EE] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </article>
  );
}

// ─── C — Brutalist Clean ──────────────────────────────────────────────────────
// Inspiration : Linear, Resend. Bordure simple, focus sur le texte.
// Hover : translation + bordure intensifiée. Le moins "AI-fancy", le plus pro.

export function CardVariantC() {
  return (
    <article className="group relative rounded-2xl border border-white/8 bg-[#0E0E13] p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <span
          className="font-mono text-[13px] font-semibold tracking-tight"
          style={{
            background: "linear-gradient(90deg, #8B5CF6, #22D3EE)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {SAMPLE.num}
        </span>
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
          {SAMPLE.label}
        </span>
      </div>
      <h3 className="font-display text-[20px] sm:text-[22px] font-bold leading-[1.2] tracking-[-0.01em] text-white mb-4">
        {SAMPLE.title}
      </h3>
      <p className="text-[14px] leading-[1.7] text-white/60">{SAMPLE.desc}</p>
    </article>
  );
}

// ─── D — Holographic Spotlight ────────────────────────────────────────────────
// Inspiration : Higgsfield, Vercel récent. Glass effect + spotlight qui suit
// la souris (radial gradient au cursor). Plus "premium AI" mais plus lourd.

export function CardVariantD() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  return (
    <article
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      onMouseLeave={() => setPos({ x: 50, y: 50 })}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0E0E13]/80 p-7 sm:p-8 transition-all duration-500 hover:border-white/20"
      style={{ backdropFilter: "blur(8px)" }}
    >
      {/* Spotlight qui suit la souris */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${pos.x}% ${pos.y}%, rgba(139,92,246,0.18), transparent 60%)`,
        }}
        aria-hidden
      />
      {/* Sparkle accent top-right */}
      <Sparkle
        size={14}
        weight="fill"
        className="absolute top-5 right-5 text-[#22D3EE]/60 transition-all duration-500 group-hover:text-[#22D3EE] group-hover:rotate-90"
      />

      <div className="relative">
        <div className="flex items-center gap-2 mb-5">
          <span
            className="inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-mono font-semibold tracking-tight"
            style={{
              background:
                "linear-gradient(90deg, rgba(139,92,246,0.18), rgba(34,211,238,0.15))",
              border: "1px solid rgba(139,92,246,0.3)",
              color: "#A78BFA",
            }}
          >
            {SAMPLE.num} · {SAMPLE.label}
          </span>
        </div>
        <h3
          className="font-display font-bold leading-[1.2] tracking-[-0.01em] mb-4"
          style={{
            fontSize: "clamp(20px, 2vw, 24px)",
            background:
              "linear-gradient(135deg, #FFFFFF 0%, #E5E7EB 50%, #A78BFA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {SAMPLE.title}
        </h3>
        <p className="text-[14px] leading-[1.7] text-white/65">{SAMPLE.desc}</p>
      </div>
    </article>
  );
}

// ─── Showcase ─────────────────────────────────────────────────────────────────

const VARIANTS = [
  {
    id: "A",
    name: "Aurora Frame",
    inspiration: "Anthropic / Lovable",
    desc: "Bordure gradient subtile + glow latent. Premium discret.",
    Cmp: CardVariantA,
  },
  {
    id: "B",
    name: "Editorial",
    inspiration: "Stripe Press / Linear blog",
    desc: "Numéro géant en watermark, structure magazine, ligne révélée.",
    Cmp: CardVariantB,
  },
  {
    id: "C",
    name: "Brutalist Clean",
    inspiration: "Linear / Resend",
    desc: "Bordure simple, hiérarchie typo nette. Le moins « AI-fancy », le plus pro.",
    Cmp: CardVariantC,
  },
  {
    id: "D",
    name: "Holographic Spotlight",
    inspiration: "Vercel / Higgsfield",
    desc: "Glass + spotlight qui suit la souris. Plus visuel, plus lourd.",
    Cmp: CardVariantD,
  },
];

export function CardVariantsShowcase() {
  return (
    <section className="relative bg-[#0A0A0F] text-white py-20 px-5 sm:px-10">
      <div className="max-w-[1200px] mx-auto">
        <header className="text-center mb-16">
          <h1
            className="font-display font-bold leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            4 directions{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
              design
            </span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-[60ch] mx-auto">
            Même contenu, 4 traitements visuels différents. Survole chaque carte
            pour voir le hover. Choisis ton préféré ou demande des ajustements.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {VARIANTS.map(({ id, name, inspiration, desc, Cmp }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[11px] font-mono font-bold text-white/70">
                  {id}
                </span>
                <span className="font-display font-bold text-white text-[15px]">
                  {name}
                </span>
                <span className="text-[11px] text-white/35 italic">
                  · inspiration {inspiration}
                </span>
              </div>
              <p className="mb-4 text-[12px] text-white/50 leading-relaxed">
                {desc}
              </p>
              <Cmp />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
