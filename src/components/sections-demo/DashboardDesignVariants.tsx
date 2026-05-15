"use client";

/**
 * DashboardDesignVariants — Preview des 3 directions design dashboard pour le site.
 *
 *  A — Dashboard-flavored : flow marketing identique, codes visuels dashboard (mono labels,
 *      acronymes colorés, KPI cards, pills AUTO/ACTIF, palette resserrée).
 *  B — Hybride : marketing en intro, dashboard immersif sur catalogue + pricing
 *      (KPI bar mockée, activity feed, organigramme acronymes colorés).
 *  C — Espace privé déguisé : layout app complet (sidebar gauche permanente, prompt CLI,
 *      sections rendues comme des pages de l'app).
 *
 * Sticky nav en haut pour switcher entre les 3.
 */

import { useState } from "react";
import { AGENTS, type Agent } from "@/data/agents";
import {
  CheckCircle,
  Star,
  CaretRight,
  Sparkle,
  ChartLineUp,
  ChatCircleDots,
  Clock,
  GridFour,
  House,
  Robot,
  Folder,
  Sparkle as SparkleStudio,
  Brain,
  ChatsCircle,
  Gear,
} from "@phosphor-icons/react/dist/ssr";

// ────────────────────────────────────────────────────────────────────
// Direction A — Dashboard-flavored : look mono cyan, acronymes colorés
// ────────────────────────────────────────────────────────────────────

function VariantA() {
  return (
    <section className="bg-vt-bg-deep">
      {/* Header section */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-20 pb-12">
        <div
          className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4"
          style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
        >
          // catalogue agents
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.05] tracking-tight mb-3">
          Une équipe IA <span className="text-[#22D3EE]">à la carte</span>
        </h2>
        <p className="text-white/55 text-base max-w-2xl">
          7 postes spécialisés. Choisissez ceux qui vous manquent.
        </p>
      </div>

      {/* Stats KPI bar — style dashboard top row */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 border border-white/8">
          <KpiCellA label="Agents disponibles" value="7" />
          <KpiCellA label="Canaux supportés" value="5" accent="#22D3EE" />
          <KpiCellA label="Disponibilité" value="24/7" accent="#10B981" />
          <KpiCellA label="Tenant isolation" value="RLS" accent="#8B5CF6" />
        </div>
      </div>

      {/* Grille agents — style cards dashboard */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 border border-white/8">
          {AGENTS.map((a) => (
            <AgentCardA key={a.num} agent={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function KpiCellA({
  label,
  value,
  accent = "#FFFFFF",
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="bg-vt-bg-deep p-5">
      <div
        className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2"
        style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
      >
        [{label.toUpperCase().replace(/ /g, ".")}]
      </div>
      <div
        className="font-display font-bold leading-none"
        style={{ fontSize: "36px", color: accent, letterSpacing: "-0.02em" }}
      >
        {value}
      </div>
    </div>
  );
}

function AgentCardA({ agent }: { agent: Agent }) {
  const accent = agent.accent || "#22D3EE";
  return (
    <div className="bg-vt-bg-deep p-6 group hover:bg-white/[0.02] transition-colors">
      {/* Header : acronym + pills */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="inline-flex items-center justify-center font-mono font-bold leading-none"
          style={{
            width: 44,
            height: 28,
            fontSize: "13px",
            color: accent,
            background: `${accent}10`,
            border: `1px solid ${accent}40`,
          }}
        >
          {agent.acronym || agent.num}
        </span>
        {agent.autonomous && (
          <span
            className="px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] font-semibold border"
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
              color: "#22D3EE",
              borderColor: "#22D3EE40",
              background: "#22D3EE08",
            }}
          >
            Auto
          </span>
        )}
        <span
          className="px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] font-semibold border inline-flex items-center gap-1.5"
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
            color: "#10B981",
            borderColor: "#10B98140",
            background: "#10B98108",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          Actif
        </span>
        {agent.flagship && (
          <Star size={12} weight="fill" className="text-[#FBBF24] ml-auto" />
        )}
      </div>

      {/* Nom + métier */}
      <h3 className="font-display font-bold text-white text-lg leading-tight mb-1">
        {agent.name}
      </h3>
      <p
        className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-4"
        style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
      >
        // {agent.metier.toLowerCase()}
      </p>

      {/* Description */}
      <p className="text-white/65 text-sm leading-relaxed mb-5 line-clamp-3">
        {agent.description.split(".").slice(0, 2).join(".")}.
      </p>

      {/* Tarif */}
      <div className="flex items-center justify-between pt-4 border-t border-white/8">
        <div>
          <div
            className="text-[9px] uppercase tracking-[0.22em] text-white/40 mb-0.5"
            style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
          >
            // tarif
          </div>
          <div className="text-white text-sm font-semibold">{agent.price}</div>
        </div>
        <button
          className="text-[11px] font-semibold uppercase tracking-[0.15em] px-3 py-2 border transition-colors group-hover:border-white/30"
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
            color: "white",
            borderColor: "rgba(255,255,255,0.15)",
          }}
        >
          + ajouter →
        </button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Direction B — Hybride : marketing intro + dashboard immersif
// ────────────────────────────────────────────────────────────────────

function VariantB() {
  return (
    <section className="bg-vt-bg-deep">
      {/* Intro marketing classique */}
      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 pt-20 pb-10 text-center">
        <div
          className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE] mb-3"
          style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
        >
          // votre future équipe
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-4">
          Voici ce à quoi ressemblera{" "}
          <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
            votre cockpit
          </span>
          .
        </h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Au moment où vous nous rejoignez, voici le tableau de bord que vous aurez.
        </p>
      </div>

      {/* Mockup dashboard */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pb-20">
        <div className="border border-white/8 bg-[#08080C]">
          {/* Top bar fake breadcrumb */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
            <div
              className="text-[11px] tracking-[0.15em] text-white/40"
              style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
            >
              <span className="text-[#22D3EE]">votre-entreprise</span> / dashboard
            </div>
            <div className="flex items-center gap-2">
              <span
                className="px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] border inline-flex items-center gap-1.5"
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
                  color: "#8B5CF6",
                  borderColor: "#8B5CF640",
                  background: "#8B5CF608",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                actif
              </span>
            </div>
          </div>

          {/* Prompt CLI */}
          <div className="px-5 py-5 border-b border-white/8">
            <div
              className="text-[12px] text-white/50 mb-1"
              style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
            >
              <span className="text-[#22D3EE]">vous@votre-entreprise:~$</span> état --maintenant
            </div>
            <div className="text-2xl text-white font-bold">
              → Bonjour <span className="text-[#22D3EE]">[Vous]</span>, 5 actions en attente.
            </div>
          </div>

          {/* 4 KPI cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 border-b border-white/8">
            <KpiCellA label="Attention requise" value="2" accent="#F59E0B" />
            <KpiCellA label="Réactivité moyenne" value="47s" accent="#22D3EE" />
            <KpiCellA label="Heures économisées (7j)" value="42h" accent="#10B981" />
            <KpiCellA label="Tâches automatisées (7j)" value="183" accent="#8B5CF6" />
          </div>

          {/* 3 colonnes : Mon CEO + Activité + Agents */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/8">
            <div className="bg-vt-bg-deep p-5">
              <div
                className="text-[10px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4"
                style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
              >
                // mon ceo
              </div>
              <div className="text-white/85 text-sm">
                <span className="text-[#8B5CF6] font-semibold">→</span> &laquo; Briefing du
                matin stp &raquo;
                <div className="mt-3 text-white/65 leading-relaxed text-[13px]">
                  3 RDV aujourd&apos;hui, dont Camille Roux à 10h. Cash +4 230 € reçus
                  cette nuit. 2 impayés relancés par l&apos;ADV. Pierre Acme géré par le
                  SAV.
                </div>
              </div>
            </div>
            <div className="bg-vt-bg-deep p-5">
              <div
                className="text-[10px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4"
                style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
              >
                // activité [récent]
              </div>
              <ul className="space-y-3 text-[12px] text-white/70">
                <ActivityRow agentAcr="STA" accent="#67E8F9" text="Appel (37s) — devis demandé" age="7h" />
                <ActivityRow agentAcr="SAV" accent="#22D3EE" text="Ticket Pierre Acme résolu" age="9h" />
                <ActivityRow agentAcr="ADV" accent="#10B981" text="Import facture 26-307 (173€)" age="1j" />
                <ActivityRow agentAcr="CEO" accent="#8B5CF6" text="WhatsApp — idée mail prospection" age="1j" />
              </ul>
            </div>
            <div className="bg-vt-bg-deep p-5">
              <div
                className="text-[10px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4"
                style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
              >
                // agents [7/7]
              </div>
              <ul className="space-y-2.5">
                {AGENTS.map((a) => (
                  <AgentListRowB key={a.num} agent={a} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-center text-white/40 text-sm mt-6 italic">
          ↑ Aperçu réel de l&apos;interface. Vous obtenez cette vue le jour 1.
        </p>
      </div>
    </section>
  );
}

function ActivityRow({
  agentAcr,
  accent,
  text,
  age,
}: {
  agentAcr: string;
  accent: string;
  text: string;
  age: string;
}) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        className="font-mono font-bold text-[9px] px-1.5 py-0.5 leading-none shrink-0 mt-0.5"
        style={{ color: accent, border: `1px solid ${accent}40`, background: `${accent}08` }}
      >
        {agentAcr}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-white/85 truncate">{text}</div>
        <div className="text-white/35 text-[10px] mt-0.5">il y a {age}</div>
      </div>
    </li>
  );
}

function AgentListRowB({ agent }: { agent: Agent }) {
  const accent = agent.accent || "#22D3EE";
  return (
    <li className="flex items-center gap-2.5">
      <span
        className="font-mono font-bold text-[10px] px-1.5 py-0.5 leading-none shrink-0"
        style={{
          color: accent,
          border: `1px solid ${accent}40`,
          background: `${accent}08`,
          minWidth: 38,
          textAlign: "center",
        }}
      >
        {agent.acronym || agent.num}
      </span>
      <div className="flex-1 min-w-0 flex items-center gap-2">
        <span className="text-white text-[12px] font-semibold truncate">{agent.name}</span>
        {agent.autonomous && (
          <span
            className="px-1.5 py-0.5 text-[8px] uppercase tracking-[0.15em] border"
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
              color: "#22D3EE",
              borderColor: "#22D3EE40",
            }}
          >
            Auto
          </span>
        )}
        <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-[#10B981]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          actif
        </span>
      </div>
    </li>
  );
}

// ────────────────────────────────────────────────────────────────────
// Direction C — Espace privé déguisé (sidebar + dashboard complet)
// ────────────────────────────────────────────────────────────────────

const SIDEBAR_ITEMS = [
  { icon: GridFour, label: "Dashboard", shortcut: "⌘1", active: false },
  { icon: Robot, label: "Agents", shortcut: "⌘2", active: true },
  { icon: Folder, label: "Fichiers", shortcut: "⌘3", active: false },
  { icon: SparkleStudio, label: "Studio", shortcut: "⌘4", active: false },
  { icon: Brain, label: "Brain", shortcut: "⌘5", active: false },
  { icon: ChatsCircle, label: "Conversations", shortcut: "⌘6", active: false },
  { icon: Gear, label: "Admin Vtensor", shortcut: "⌘7", active: false },
];

function VariantC() {
  return (
    <section className="bg-vt-bg-deep">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="border border-white/8 bg-[#08080C] grid grid-cols-[200px_1fr] min-h-[700px]">
          {/* Sidebar */}
          <aside className="border-r border-white/8 p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-8 px-2">
              <span
                className="font-mono text-[14px] text-white"
                style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
              >
                [v]
              </span>
              <span
                className="font-mono text-[14px] text-white"
                style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
              >
                tensor
              </span>
            </div>
            <div
              className="text-[9px] uppercase tracking-[0.22em] text-white/35 px-2 mb-3"
              style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
            >
              › Espace
            </div>
            <nav className="flex flex-col gap-0.5">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={[
                      "flex items-center gap-3 px-2.5 py-2 text-[13px] text-left transition-colors",
                      item.active
                        ? "bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30"
                        : "text-white/65 hover:text-white hover:bg-white/[0.04] border border-transparent",
                    ].join(" ")}
                  >
                    <Icon size={14} weight="regular" />
                    <span className="flex-1">{item.label}</span>
                    <span
                      className="text-[9px] text-white/30 font-mono"
                      style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
                    >
                      {item.shortcut}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main content : Agents page */}
          <main className="p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div
                className="text-[11px] tracking-[0.15em] text-white/40"
                style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
              >
                <span className="text-[#22D3EE]">votre-entreprise</span> / agents
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] border inline-flex items-center gap-1.5"
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
                    color: "#8B5CF6",
                    borderColor: "#8B5CF640",
                    background: "#8B5CF608",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                  Founder
                </span>
              </div>
            </div>

            <div
              className="text-[10px] uppercase tracking-[0.22em] text-[#22D3EE] mb-2"
              style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
            >
              // catalogue agents [7/7]
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Votre équipe IA
            </h2>
            <p className="text-white/55 text-sm mb-6">
              Cliquez sur un agent pour le configurer. Ajoutez-en, retirez-en, ajustez à tout moment.
            </p>

            {/* Liste agents — style sidebar de droite du dashboard */}
            <div className="flex flex-col gap-2">
              {AGENTS.map((a) => (
                <AgentRowC key={a.num} agent={a} />
              ))}
            </div>
          </main>
        </div>

        <p className="text-center text-white/40 text-sm mt-6 italic">
          ↑ Vous êtes dans l&apos;app, pas sur le site marketing.
        </p>
      </div>
    </section>
  );
}

function AgentRowC({ agent }: { agent: Agent }) {
  const accent = agent.accent || "#22D3EE";
  return (
    <button
      type="button"
      className="flex items-center gap-3 p-3 border border-white/8 bg-vt-bg-deep hover:bg-white/[0.03] hover:border-white/15 transition-colors group text-left"
    >
      <span
        className="inline-flex items-center justify-center font-mono font-bold leading-none shrink-0"
        style={{
          width: 44,
          height: 32,
          fontSize: "12px",
          color: accent,
          background: `${accent}10`,
          border: `1px solid ${accent}40`,
        }}
      >
        {agent.acronym || agent.num}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white text-[14px] font-semibold">{agent.name}</span>
          {agent.autonomous && (
            <span
              className="px-1.5 py-0.5 text-[8px] uppercase tracking-[0.15em] border"
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
                color: "#22D3EE",
                borderColor: "#22D3EE40",
              }}
            >
              Auto
            </span>
          )}
          <span
            className="px-1.5 py-0.5 text-[8px] uppercase tracking-[0.15em] border inline-flex items-center gap-1"
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
              color: "#10B981",
              borderColor: "#10B98140",
            }}
          >
            <span className="w-1 h-1 rounded-full bg-[#10B981]" />
            Actif
          </span>
        </div>
        <div
          className="text-[10px] uppercase tracking-[0.18em] text-white/35 mt-1"
          style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
        >
          {agent.metier.toLowerCase().replace(/, /g, ".").replace(/ /g, "_").slice(0, 60)}
        </div>
      </div>
      <CaretRight size={14} className="text-white/30 group-hover:text-white/60" />
    </button>
  );
}

// ────────────────────────────────────────────────────────────────────
// Showcase wrapper — sticky nav A/B/C
// ────────────────────────────────────────────────────────────────────

export function DashboardDesignShowcase() {
  const [active, setActive] = useState<"A" | "B" | "C">("A");
  return (
    <div className="bg-vt-bg-deep min-h-screen">
      {/* Sticky switcher */}
      <div className="sticky top-0 z-50 bg-vt-bg-deep/95 backdrop-blur-md border-b border-white/8">
        <div className="max-w-[1280px] mx-auto px-6 py-3 flex items-center gap-3">
          <span
            className="text-[11px] uppercase tracking-[0.22em] text-white/40 mr-2"
            style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
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
              style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
            >
              {dir} ·{" "}
              {dir === "A" ? "Dashboard-flavored" : dir === "B" ? "Hybride" : "Espace privé"}
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
