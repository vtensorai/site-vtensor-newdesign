"use client";

/**
 * PricingV2 — grille "par agent" (décision Victor 2026-09-07).
 *
 *  - 1 agent = 100 € HT / mois, ou 1 000 € HT / an (2 mois offerts)
 *  - Sélecteur mensuel / annuel avec la remise affichée
 *  - Frais d'intégration à partir de 1 000 € HT (devis après audit)
 *  - Offre Sur-mesure conservée (devis)
 *
 * Plus d'agent maître (2026-09-07) : chaque agent est un poste, le client lui parle en direct.
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Minus, Plus } from "lucide-react";
import { AUDIT_URL } from "@/lib/links";

const mono = {
  fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
};

const MONTHLY_PER_AGENT = 100;
const ANNUAL_PER_AGENT = 1000;
const MIN_AGENTS = 1;
const MAX_AGENTS = 10;

type Billing = "monthly" | "annual";

/** Format déterministe (SSR = client) : espace insécable comme séparateur de milliers. */
function eur(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €";
}

const SUR_MESURE_FEATURES = [
  "Hébergement chez vous ou dans le pays de votre choix",
  "Agents métiers conçus et entraînés pour votre activité",
  "Applications dédiées, taillées sur vos workflows",
  "Intégration ERP sur-mesure et conseil sécurité dédié",
];

const TEAM_FEATURES = [
  "Vous parlez à chaque agent en direct : email, application, WhatsApp, téléphone",
  "Chaque agent développé sur mesure pour votre activité",
  "Évolutions et nouvelles générations de modèles incluses",
  "Hébergement en Allemagne, isolation stricte par client",
  "Mensuel sans engagement · annuel réglé d'avance",
];

export function PricingV2({ compactTop = false }: { compactTop?: boolean } = {}) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [agents, setAgents] = useState(3);

  return (
    <section
      className={[
        "relative",
        compactTop ? "pt-8 pb-24 md:pt-10 md:pb-32" : "py-24 md:py-32",
      ].join(" ")}
      id="tarifs"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4" style={mono}>
            // nos offres
          </div>
          <h3
            className="font-display font-bold text-white leading-[1.08] tracking-[-0.02em] mb-3"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            Un prix simple,{" "}
            <span className="bg-gradient-to-r from-vt-violet to-vt-cyan bg-clip-text text-transparent">
              par agent
            </span>
            .
          </h3>
          <p className="text-white/45 text-[12px] tracking-[0.18em] uppercase" style={mono}>
            // tarifs hors taxes · b2b france
          </p>
        </div>

        {/* Sélecteur mensuel / annuel */}
        <div className="flex justify-center mb-10">
          <BillingToggle billing={billing} onChange={setBilling} />
        </div>

        {/* 2 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-px bg-white/8 border border-white/8">
          <TeamCard billing={billing} agents={agents} onAgentsChange={setAgents} />
          <SurMesureCard />
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────
// Toggle mensuel / annuel — chips segmentées (même code visuel que le
// sélecteur de période 24H / 7J / 30J de l'app)
// ────────────────────────────────────────────────────────────────────

function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
}) {
  const items: { id: Billing; label: string; badge?: string }[] = [
    { id: "monthly", label: "Mensuel" },
    { id: "annual", label: "Annuel", badge: "2 mois offerts" },
  ];
  return (
    <div
      role="tablist"
      aria-label="Fréquence de facturation"
      className="inline-flex items-center border border-white/12 bg-white/[0.03] p-1"
    >
      {items.map((it) => {
        const active = billing === it.id;
        return (
          <button
            key={it.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(it.id)}
            className={[
              "inline-flex items-center gap-2 px-4 py-2 text-[12px] uppercase tracking-[0.12em] font-semibold",
              "transition-colors cursor-pointer",
              active ? "text-white" : "text-white/55 hover:text-white hover:bg-white/[0.05]",
            ].join(" ")}
            style={{
              ...mono,
              background: active
                ? "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(34,211,238,0.35))"
                : undefined,
              border: active ? "1px solid rgba(34,211,238,0.4)" : "1px solid transparent",
            }}
          >
            {it.label}
            {it.badge && (
              <span
                className="px-1.5 py-0.5 text-[9px] tracking-[0.14em]"
                style={{
                  color: "#22D3EE",
                  border: "1px solid rgba(34,211,238,0.4)",
                  background: "rgba(34,211,238,0.08)",
                }}
              >
                {it.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Card 1 — Votre équipe IA (par agent + simulateur)
// ────────────────────────────────────────────────────────────────────

function TeamCard({
  billing,
  agents,
  onAgentsChange,
}: {
  billing: Billing;
  agents: number;
  onAgentsChange: (n: number) => void;
}) {
  const annual = billing === "annual";
  const perAgent = annual ? ANNUAL_PER_AGENT : MONTHLY_PER_AGENT;
  const total = perAgent * agents;
  const annualEquivMonthly = Math.round((ANNUAL_PER_AGENT * agents) / 12);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="relative p-8 md:p-9 flex flex-col bg-[#0E0E13] transition-colors hover:bg-[#101017]"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-vt-violet to-vt-cyan" />

      <header className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] uppercase tracking-[0.22em] text-white/40" style={mono}>
            // offre_01 · équipe_ia
          </div>
          <span
            className="px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] font-semibold border inline-flex items-center gap-1.5"
            style={{
              ...mono,
              color: "#22D3EE",
              borderColor: "rgba(34,211,238,0.4)",
              background: "rgba(34,211,238,0.08)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
            développé sur mesure
          </span>
        </div>
        <h4
          className="font-display font-bold text-white leading-tight mb-2"
          style={{ fontSize: "clamp(24px, 2.4vw, 30px)", letterSpacing: "-0.015em" }}
        >
          Votre équipe IA
        </h4>
        <p className="text-white/55 text-[13px] leading-relaxed">
          Composez votre équipe parmi nos modèles, ou décrivez-nous le poste qu&apos;il vous
          manque. Vous payez par agent, rien d&apos;autre.
        </p>
      </header>

      {/* Prix par agent */}
      <div className="mb-6 pb-6 border-b border-white/8">
        <div
          className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-semibold mb-2"
          style={mono}
        >
          Abonnement · par agent
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className="font-display font-bold text-white text-3xl md:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            {eur(perAgent)} HT
          </span>
          <span className="text-white/55 text-base">{annual ? "/ an" : "/ mois"}</span>
          {annual && (
            <span className="text-white/30 line-through text-sm">
              {eur(MONTHLY_PER_AGENT * 12)}
            </span>
          )}
        </div>
        <div className="text-white/45 text-xs mt-1.5">
          {annual
            ? `soit ${eur(Math.round(ANNUAL_PER_AGENT / 12))} HT / mois par agent, 2 mois offerts`
            : `ou ${eur(ANNUAL_PER_AGENT)} HT / an par agent, 2 mois offerts`}
        </div>
      </div>

      {/* Simulateur */}
      <div className="mb-6 pb-6 border-b border-white/8">
        <div
          className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-semibold mb-3"
          style={mono}
        >
          Simulez votre équipe
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="inline-flex items-center border border-white/12">
            <button
              type="button"
              aria-label="Retirer un agent"
              disabled={agents <= MIN_AGENTS}
              onClick={() => onAgentsChange(Math.max(MIN_AGENTS, agents - 1))}
              className="w-9 h-9 inline-flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <Minus size={14} />
            </button>
            <span
              className="min-w-[110px] text-center text-[13px] text-white font-semibold"
              style={mono}
            >
              {agents} agent{agents > 1 ? "s" : ""}
            </span>
            <button
              type="button"
              aria-label="Ajouter un agent"
              disabled={agents >= MAX_AGENTS}
              onClick={() => onAgentsChange(Math.min(MAX_AGENTS, agents + 1))}
              className="w-9 h-9 inline-flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <Plus size={14} />
            </button>
          </div>
          <div className="text-right">
            <div
              className="font-display font-bold text-white text-xl md:text-2xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              {eur(total)} HT
              <span className="text-white/55 text-sm font-normal ml-1.5">
                {annual ? "/ an" : "/ mois"}
              </span>
            </div>
            {annual && (
              <div className="text-white/45 text-xs mt-0.5">
                soit {eur(annualEquivMonthly)} HT / mois
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Frais d'intégration */}
      <div className="mb-7">
        <div
          className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-semibold mb-1.5"
          style={mono}
        >
          Frais d&apos;intégration
        </div>
        <div className="text-white/85 font-semibold text-lg">à partir de {eur(1000)} HT</div>
        <div className="text-white/45 text-xs mt-1">
          Selon vos outils et vos process. Devis précis à l&apos;issue de l&apos;audit gratuit.
        </div>
      </div>

      <ul className="space-y-3 flex-1 mb-7">
        {TEAM_FEATURES.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/75 leading-relaxed">
            <Check size={14} strokeWidth={2.5} className="mt-1 flex-shrink-0 text-[#22D3EE]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <CtaLink featured label="Réserver mon audit gratuit" />
    </motion.article>
  );
}

// ────────────────────────────────────────────────────────────────────
// Card 2 — Sur-mesure
// ────────────────────────────────────────────────────────────────────

function SurMesureCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.08 }}
      className="relative p-8 md:p-9 flex flex-col bg-vt-bg-deep transition-colors hover:bg-[#0C0C11]"
    >
      <header className="mb-6">
        <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-4" style={mono}>
          // offre_02 · sur_mesure
        </div>
        <h4
          className="font-display font-bold text-white leading-tight mb-2"
          style={{ fontSize: "clamp(24px, 2.4vw, 30px)", letterSpacing: "-0.015em" }}
        >
          Sur-mesure
        </h4>
        <p className="text-white/55 text-[13px] leading-relaxed">
          Pour les besoins spécifiques et les organisations sensibles qui exigent un
          environnement taillé pour elles.
        </p>
      </header>

      <div className="mb-6 pb-6 border-b border-white/8">
        <div
          className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-semibold mb-2"
          style={mono}
        >
          Abonnement
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className="font-display font-bold text-white text-3xl md:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Devis
          </span>
          <span className="text-white/55 text-base">personnalisé</span>
        </div>
      </div>

      <div className="mb-7">
        <div
          className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-semibold mb-1.5"
          style={mono}
        >
          Frais d&apos;intégration
        </div>
        <div className="text-white/85 font-semibold text-lg">Sur demande</div>
      </div>

      <ul className="space-y-3 flex-1 mb-7">
        {SUR_MESURE_FEATURES.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/75 leading-relaxed">
            <Check size={14} strokeWidth={2.5} className="mt-1 flex-shrink-0 text-[#22D3EE]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <CtaLink label="Demander un devis" />
    </motion.article>
  );
}

function CtaLink({ label, featured = false }: { label: string; featured?: boolean }) {
  return (
    <a
      href={AUDIT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-[12px] uppercase tracking-[0.06em] font-semibold transition-all group/cta hover:-translate-y-0.5"
      style={{
        ...mono,
        color: "#FFFFFF",
        background: featured
          ? "linear-gradient(135deg, #8B5CF6, #22D3EE)"
          : "rgba(255,255,255,0.04)",
        border: featured ? "1px solid transparent" : "1px solid rgba(255,255,255,0.18)",
        boxShadow: featured ? "0 0 24px -8px rgba(34,211,238,0.4)" : "none",
      }}
    >
      {label}
      <span className="transition-transform group-hover/cta:translate-x-0.5">→</span>
    </a>
  );
}
