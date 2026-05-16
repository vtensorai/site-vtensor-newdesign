"use client";

/**
 * CaseStudyVariants — 3 layouts pour la section "Ils nous font confiance".
 *
 *  A — Carousel horizontal : 3 cards côte à côte, snap-x, dense.
 *  B — Split-screen stack : 3 sections empilées, chacune en 2 colonnes
 *      (contexte + KPI à gauche / quote + personne à droite). Plus narratif.
 *  C — Mosaïque logos + citation rotative : 3 logos en grid + 1 grosse
 *      citation centrale dessous. Style Stripe/Linear.
 *
 * Données : 3 clients réels (Bravel / 3DNum / Maeva Refford) avec
 * placeholders à ajuster par Victor (citations + KPI fictifs réalistes).
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Quote as QuoteIcon, ArrowLeft, ArrowRight } from "lucide-react";

type Kpi = { value: string; label: string };
type Case = {
  id: string;
  company: string;
  sector: string;
  person: string;
  role: string;
  quote: string;
  kpis: Kpi[];
  accent: string;
};

const CASES: Case[] = [
  {
    id: "3dnum",
    company: "3DNum",
    sector: "Industrie · Numérisation 3D",
    person: "Victor Arnoul",
    role: "Fondateur",
    quote:
      "Vtensor a doublé notre capacité commerciale sans embaucher. Les devis sortent en 24 h au lieu de 3 jours, et l'ADV relance les impayés à ma place.",
    kpis: [
      { value: "+47", label: "ETI prospectées" },
      { value: "−32 %", label: "DSO" },
      { value: "4 230 €", label: "récupérés / mois" },
    ],
    accent: "#22D3EE",
  },
  {
    id: "bravel",
    company: "Bravel",
    sector: "B2B · Services",
    person: "[Prénom Nom]",
    role: "Directeur Général",
    quote:
      "Notre agent SAV gère 80 % des demandes clients en moins d'une minute. Notre équipe peut enfin se concentrer sur les comptes stratégiques.",
    kpis: [
      { value: "80 %", label: "tickets auto-résolus" },
      { value: "−2 h", label: "libérées / jour / pers." },
      { value: "24 / 7", label: "disponibilité" },
    ],
    accent: "#8B5CF6",
  },
  {
    id: "maeva-refford",
    company: "Maeva Refford",
    sector: "Architecte d'intérieur",
    person: "Maeva Refford",
    role: "Fondatrice",
    quote:
      "Mon agent répond aux clients 24 / 7, prépare mes devis, et me prévient des appels urgents. J'ai retrouvé mes soirées.",
    kpis: [
      { value: "12 h", label: "libérées / semaine" },
      { value: "+3", label: "nouveaux clients / mois" },
      { value: "100 %", label: "appels traités" },
    ],
    accent: "#10b981",
  },
];

const monoStyle = {
  fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
};

// ────────────────────────────────────────────────────────────────────
// Header commun
// ────────────────────────────────────────────────────────────────────

function SectionHeader({ subtitle }: { subtitle?: string }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <div
        className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4"
        style={monoStyle}
      >
        // ils nous font confiance
      </div>
      <h2
        className="font-display font-bold text-white leading-[1.08] tracking-[-0.02em] mb-3"
        style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
      >
        Premiers Founders,{" "}
        <span className="bg-gradient-to-r from-vt-violet to-vt-cyan bg-clip-text text-transparent">
          premiers résultats
        </span>
      </h2>
      {subtitle && (
        <p className="text-white/55 text-base md:text-lg max-w-[60ch] mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// A — Carousel horizontal (3 cards côte à côte) — variant choisi pour live
// ────────────────────────────────────────────────────────────────────

export function CaseStudySection() {
  return <VariantA />;
}

function VariantA() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <SectionHeader subtitle="3 entreprises, 3 contextes, le même résultat : leurs équipes ont retrouvé du temps." />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {CASES.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative bg-vt-bg-deep p-7 flex flex-col"
              style={{ border: `1px solid ${c.accent}30` }}
            >
              {/* Label mono `// case_NN` */}
              <div
                className="text-[10px] uppercase tracking-[0.22em] mb-4"
                style={{ ...monoStyle, color: c.accent }}
              >
                // case_{String(i + 1).padStart(2, "0")}
              </div>

              {/* Logo + secteur */}
              <header className="mb-5">
                <h3
                  className="font-display font-bold text-white text-2xl md:text-3xl mb-1"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {c.company}
                </h3>
                <p className="text-white/45 text-[12px] uppercase tracking-[0.14em]" style={monoStyle}>
                  {c.sector}
                </p>
              </header>

              {/* Quote */}
              <blockquote className="flex-1 mb-6">
                <QuoteIcon size={20} className="text-[#22D3EE]/40 mb-3" />
                <p className="text-white/85 text-[15px] leading-relaxed italic">
                  « {c.quote} »
                </p>
                <footer className="mt-4 text-[12px] text-white/55">
                  <span className="font-semibold text-white/75">{c.person}</span> · {c.role}
                </footer>
              </blockquote>

              {/* KPIs */}
              <div className="grid grid-cols-3 gap-px bg-white/8" style={{ border: `1px solid ${c.accent}20` }}>
                {c.kpis.map((k) => (
                  <div key={k.label} className="bg-vt-bg-deep p-3 text-center">
                    <div
                      className="font-display font-bold leading-none mb-1"
                      style={{ fontSize: 18, color: c.accent, letterSpacing: "-0.02em" }}
                    >
                      {k.value}
                    </div>
                    <div
                      className="text-[9px] uppercase tracking-[0.12em] text-white/45"
                      style={monoStyle}
                    >
                      {k.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────
// B — Split-screen stack (3 sections empilées, narratif)
// ────────────────────────────────────────────────────────────────────

function VariantB() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <SectionHeader subtitle="3 entreprises qui nous font confiance, chacune avec son contexte et ses résultats." />

        <div className="flex flex-col gap-12 md:gap-16">
          {CASES.map((c, i) => {
            // Quinconce : alternance gauche/droite selon l'index
            const quoteOnRight = i % 2 === 0;
            const infoBlock = (
              <div>
                <div
                  className="text-[10px] uppercase tracking-[0.22em] mb-4"
                  style={{ ...monoStyle, color: c.accent }}
                >
                  // case_{String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  className="font-display font-bold text-white mb-1"
                  style={{ fontSize: "clamp(28px, 3vw, 40px)", letterSpacing: "-0.02em" }}
                >
                  {c.company}
                </h3>
                <p
                  className="text-white/45 text-[12px] uppercase tracking-[0.14em] mb-8"
                  style={monoStyle}
                >
                  {c.sector}
                </p>

                <div className="space-y-3">
                  {c.kpis.map((k) => (
                    <div
                      key={k.label}
                      className="flex items-baseline gap-3 pb-3"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div
                        className="font-display font-bold leading-none"
                        style={{ fontSize: 28, color: c.accent, letterSpacing: "-0.02em", minWidth: 90 }}
                      >
                        {k.value}
                      </div>
                      <div
                        className="text-[11px] uppercase tracking-[0.14em] text-white/55"
                        style={monoStyle}
                      >
                        {k.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );

            const quoteBlock = (
              <div
                className="relative p-8 md:p-10 bg-vt-bg-deep"
                style={{ border: `1px solid ${c.accent}30` }}
              >
                <QuoteIcon
                  size={32}
                  className="absolute -top-4 -left-4 p-1"
                  style={{ color: `${c.accent}80`, background: "#0A0A0F" }}
                />
                <blockquote>
                  <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6">
                    « {c.quote} »
                  </p>
                  <footer
                    className="flex items-center gap-3 pt-5"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="rounded-full flex items-center justify-center font-bold text-white text-sm"
                      style={{
                        width: 40,
                        height: 40,
                        background: `linear-gradient(135deg, ${c.accent}, ${c.accent}60)`,
                      }}
                    >
                      {c.person.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{c.person}</div>
                      <div className="text-white/50 text-[12px]">
                        {c.role} · {c.company}
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            );

            return (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className={[
                  "grid grid-cols-1 gap-8 items-start",
                  quoteOnRight
                    ? "lg:grid-cols-[1fr_1.3fr]"
                    : "lg:grid-cols-[1.3fr_1fr]",
                ].join(" ")}
                style={{
                  borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  paddingTop: i > 0 ? 48 : 0,
                }}
              >
                {quoteOnRight ? (
                  <>
                    {infoBlock}
                    {quoteBlock}
                  </>
                ) : (
                  <>
                    {quoteBlock}
                    {infoBlock}
                  </>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────
// C — Mosaïque logos + citation centrale rotative
// ────────────────────────────────────────────────────────────────────

function VariantC() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CASES[activeIdx];

  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <SectionHeader />

        {/* Logos en grid cliquable */}
        <div className="grid grid-cols-3 gap-px bg-white/8 border border-white/8 mb-12">
          {CASES.map((c, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveIdx(i)}
                className="bg-vt-bg-deep p-6 md:p-8 flex flex-col items-center gap-2 transition-colors group"
                style={{
                  background: isActive ? `${c.accent}08` : "rgba(8,8,12,1)",
                  borderTop: `2px solid ${isActive ? c.accent : "transparent"}`,
                }}
              >
                <div
                  className="font-display font-bold leading-none"
                  style={{
                    fontSize: "clamp(20px, 2.4vw, 32px)",
                    color: isActive ? "white" : "rgba(255,255,255,0.55)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {c.company}
                </div>
                <div
                  className="text-[10px] uppercase tracking-[0.14em]"
                  style={{ ...monoStyle, color: isActive ? c.accent : "rgba(255,255,255,0.35)" }}
                >
                  {c.sector}
                </div>
              </button>
            );
          })}
        </div>

        {/* Citation centrale + KPIs */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-[860px] mx-auto text-center"
        >
          <QuoteIcon size={32} className="mx-auto mb-6" style={{ color: `${active.accent}80` }} />
          <blockquote>
            <p
              className="font-display text-white leading-snug mb-6"
              style={{ fontSize: "clamp(20px, 2.4vw, 32px)", letterSpacing: "-0.01em", fontWeight: 500 }}
            >
              « {active.quote} »
            </p>
            <footer className="text-white/65 text-sm">
              <span className="font-semibold text-white">{active.person}</span> · {active.role} · {active.company}
            </footer>
          </blockquote>

          <div
            className="mt-10 grid grid-cols-3 gap-px bg-white/8 border border-white/8 max-w-[640px] mx-auto"
          >
            {active.kpis.map((k) => (
              <div key={k.label} className="bg-vt-bg-deep p-4 text-center">
                <div
                  className="font-display font-bold leading-none mb-1.5"
                  style={{ fontSize: 24, color: active.accent, letterSpacing: "-0.02em" }}
                >
                  {k.value}
                </div>
                <div
                  className="text-[9.5px] uppercase tracking-[0.14em] text-white/45"
                  style={monoStyle}
                >
                  {k.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Nav prev/next */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setActiveIdx((i) => (i - 1 + CASES.length) % CASES.length)}
            className="w-9 h-9 inline-flex items-center justify-center border border-white/15 text-white/65 hover:text-white hover:border-white/30 transition-colors"
            aria-label="Précédent"
          >
            <ArrowLeft size={14} />
          </button>
          <div className="flex items-center gap-1.5">
            {CASES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIdx(i)}
                className="h-1.5 transition-all"
                style={{
                  width: i === activeIdx ? 24 : 8,
                  background: i === activeIdx ? active.accent : "rgba(255,255,255,0.25)",
                }}
                aria-label={`Cas client ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setActiveIdx((i) => (i + 1) % CASES.length)}
            className="w-9 h-9 inline-flex items-center justify-center border border-white/15 text-white/65 hover:text-white hover:border-white/30 transition-colors"
            aria-label="Suivant"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────
// Showcase wrapper avec sticky switcher
// ────────────────────────────────────────────────────────────────────

export function CaseStudyShowcase() {
  const [active, setActive] = useState<"A" | "B" | "C">("A");
  return (
    <div className="relative min-h-screen">
      <div className="sticky top-0 z-50 bg-vt-bg-deep/95 backdrop-blur-md border-b border-white/8">
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-3">
          <span
            className="text-[11px] uppercase tracking-[0.22em] text-white/40 mr-2"
            style={monoStyle}
          >
            // direction :
          </span>
          {(["A", "B", "C"] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => setActive(dir)}
              className={[
                "text-xs px-3 py-1.5 border transition-colors font-semibold",
                active === dir
                  ? "border-[#22D3EE]/50 bg-[#22D3EE]/10 text-[#22D3EE]"
                  : "border-white/10 bg-white/[0.02] text-white/55 hover:text-white hover:border-white/25",
              ].join(" ")}
              style={monoStyle}
            >
              {dir} ·{" "}
              {dir === "A"
                ? "Carousel cards"
                : dir === "B"
                  ? "Split-screen narratif"
                  : "Mosaïque + quote rotative"}
            </button>
          ))}
        </div>
      </div>

      {active === "A" && <VariantA />}
      {active === "B" && <VariantB />}
      {active === "C" && <VariantC />}
    </div>
  );
}
