"use client";

/**
 * DashboardMockup — Réplique fidèle du dashboard app.vtensor.ai (composant
 * DashboardHome.tsx du repo vtensorai/app-vtensor), avec données 100 % fictives :
 *   - Tenant : acme-studio
 *   - User : Alex (alex@acme.fr)
 *   - Téléphones : +33 6 12 34 56 78
 *   - 12 activités, 7 agents, KPIs réalistes (3 attentions, 2 min, 42h, 156 tâches)
 *
 * Pas d'onglet "Admin Vtensor" (c'est admin-only dans la vraie app, visible
 * uniquement pour la whitelist VTENSOR_ADMIN_EMAILS).
 *
 * Toutes les couleurs et structures sont prises directement du code de l'app —
 * pas de réinvention.
 */

import {
  LayoutDashboard,
  Sparkles,
  Folder,
  Wand2,
  BrainCircuit,
  MessageSquare,
  PanelLeftClose,
  Maximize2,
  Clock,
} from "lucide-react";

// ────────────────────────────────────────────────────────────────────
// Données fictives
// ────────────────────────────────────────────────────────────────────

const TENANT_SLUG = "acme-studio";
const USERNAME = "alex";
const FIRST_NAME = "Alex";
const EMAIL = "alex@acme.fr";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", shortcut: "⌘1", active: true },
  { icon: Sparkles, label: "Agents", shortcut: "⌘2", active: false },
  { icon: Folder, label: "Fichiers", shortcut: "⌘3", active: false },
  { icon: Wand2, label: "Studio", shortcut: "⌘4", active: false },
  { icon: BrainCircuit, label: "Brain", shortcut: "⌘5", active: false },
  { icon: MessageSquare, label: "Conversations", shortcut: "⌘6", active: false },
];

// 4 KPIs (couleurs reprises du code app : rose / violet / cyan / violet-soft)
const KPIS = [
  {
    key: "attention.requise",
    value: "3",
    accent: "#fb7185",
    label: "Attention requise (escalations + erreurs)",
    showDetail: true,
  },
  {
    key: "reactivite.moyenne",
    value: "2 min",
    accent: "#8B5CF6",
    label: "Réactivité moyenne (24h)",
    period: "24H" as const,
  },
  {
    key: "heures.economisees",
    value: "42 h",
    accent: "#22D3EE",
    label: "Heures économisées (7 jours)",
    period: "7J" as const,
  },
  {
    key: "taches.automatisees",
    value: "156",
    accent: "#a78bfa",
    label: "Tâches automatisées (7 jours)",
    period: "7J" as const,
  },
];

const PERIOD_CHIPS = ["24H", "7J", "30J", "1AN", "ALL"] as const;
type PeriodChip = (typeof PERIOD_CHIPS)[number];

// 12 activités (cohérent avec subtitle "12 dernières")
const ACTIVITY: Array<{
  acr: string;
  accent: { bg: string; fg: string; border: string };
  text: string;
  age: string;
  tools?: string;
}> = [
  {
    acr: "STA",
    accent: { bg: "rgba(79,70,229,0.12)", fg: "#4f46e5", border: "rgba(79,70,229,0.35)" },
    text: "Appel (37s) de +33 6 12 34 56 78 — Devis demandé sur la gamme produit",
    age: "il y a 1h",
  },
  {
    acr: "SAV",
    accent: { bg: "rgba(34,211,238,0.10)", fg: "#22D3EE", border: "rgba(34,211,238,0.30)" },
    text: "Ticket #1024 résolu — workaround envoyé en 47s",
    age: "il y a 2h",
  },
  {
    acr: "ADV",
    accent: { bg: "rgba(16,185,129,0.12)", fg: "#10b981", border: "rgba(16,185,129,0.35)" },
    text: "Import facture #00427 — Atelier Lumière 173.60 €",
    age: "il y a 3h",
    tools: "3 tool_calls",
  },
  {
    acr: "CEO",
    accent: { bg: "rgba(139,92,246,0.10)", fg: "#8B5CF6", border: "rgba(139,92,246,0.30)" },
    text: "WhatsApp — Briefing du matin envoyé",
    age: "il y a 6h",
    tools: "1 tool_call",
  },
  {
    acr: "MKT",
    accent: { bg: "rgba(244,114,182,0.12)", fg: "#f472b6", border: "rgba(244,114,182,0.35)" },
    text: "Carrousel LinkedIn draft — 3 erreurs automation PME",
    age: "il y a 8h",
  },
  {
    acr: "ATC",
    accent: { bg: "rgba(59,130,246,0.12)", fg: "#3b82f6", border: "rgba(59,130,246,0.35)" },
    text: "Prospection : 47 ETI qualifiées Auvergne-Rhône-Alpes",
    age: "il y a 12h",
  },
  {
    acr: "WEB",
    accent: { bg: "rgba(234,179,8,0.12)", fg: "#eab308", border: "rgba(234,179,8,0.35)" },
    text: "Article SEO publié — Audit Google Ads PME",
    age: "il y a 1j",
  },
  {
    acr: "ADV",
    accent: { bg: "rgba(16,185,129,0.12)", fg: "#10b981", border: "rgba(16,185,129,0.35)" },
    text: "Relance impayé #00385 J+30 envoyée",
    age: "il y a 1j",
    tools: "2 tool_calls",
  },
  {
    acr: "SAV",
    accent: { bg: "rgba(34,211,238,0.10)", fg: "#22D3EE", border: "rgba(34,211,238,0.30)" },
    text: "Réponse WhatsApp en 32s — question facturation",
    age: "il y a 1j",
  },
  {
    acr: "STA",
    accent: { bg: "rgba(79,70,229,0.12)", fg: "#4f46e5", border: "rgba(79,70,229,0.35)" },
    text: "Appel (1m12s) — Nouvelle demande transmise à ATC",
    age: "il y a 1j",
  },
  {
    acr: "MKT",
    accent: { bg: "rgba(244,114,182,0.12)", fg: "#f472b6", border: "rgba(244,114,182,0.35)" },
    text: "Newsletter envoyée — 850 destinataires",
    age: "il y a 2j",
  },
  {
    acr: "CEO",
    accent: { bg: "rgba(139,92,246,0.10)", fg: "#8B5CF6", border: "rgba(139,92,246,0.30)" },
    text: "Synthèse rapport trimestriel — PDF prêt",
    age: "il y a 2j",
    tools: "5 tool_calls",
  },
];

// 7 agents (couleurs officielles agent-colors.ts)
const AGENTS_LIST: Array<{
  acr: string;
  bg: string;
  fg: string;
  border: string;
  name: string;
  role: string;
  auto?: boolean;
}> = [
  { acr: "CEO", bg: "rgba(139,92,246,0.10)", fg: "#8B5CF6", border: "rgba(139,92,246,0.30)", name: "Directeur Exécutif", role: "strategie.orchestration.conseil" },
  { acr: "SAV", bg: "rgba(34,211,238,0.10)", fg: "#22D3EE", border: "rgba(34,211,238,0.30)", name: "Agent SAV", role: "email.kb.tickets", auto: true },
  { acr: "ATC", bg: "rgba(59,130,246,0.12)", fg: "#3b82f6", border: "rgba(59,130,246,0.35)", name: "Agent Commercial", role: "email.crm.devis.appels_d_offres", auto: true },
  { acr: "ADV", bg: "rgba(16,185,129,0.12)", fg: "#10b981", border: "rgba(16,185,129,0.35)", name: "Agent ADV", role: "devis.suivi_commande.facturation", auto: true },
  { acr: "WEB", bg: "rgba(234,179,8,0.12)", fg: "#eab308", border: "rgba(234,179,8,0.35)", name: "Agent Webmaster", role: "cms.seo.search_console" },
  { acr: "MKT", bg: "rgba(244,114,182,0.12)", fg: "#f472b6", border: "rgba(244,114,182,0.35)", name: "Agent Marketing", role: "contenu.visuels.publication" },
  { acr: "STA", bg: "rgba(79,70,229,0.12)", fg: "#4f46e5", border: "rgba(79,70,229,0.35)", name: "Agent Standardiste", role: "accueil_telephonique.messages.escalation", auto: true },
];

// Couleurs CSS communes (alignées sur l'app)
const C = {
  surface: "#08080a",
  surface2: "#111114",
  surface3: "#16161a",
  border: "rgba(255, 255, 255, 0.08)",
  borderViolet: "rgba(139, 92, 246, 0.30)",
  text: "#FAFAFA",
  textMuted: "#8B8B97",
  textFaint: "#5A5A66",
  violet: "#8B5CF6",
  violetSoft: "rgba(139, 92, 246, 0.10)",
  cyan: "#22D3EE",
};

const monoStyle = {
  fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
};

// ────────────────────────────────────────────────────────────────────
// Composant principal
// ────────────────────────────────────────────────────────────────────

export function DashboardMockup() {
  return (
    <div
      className="w-full bg-[#08080a] text-[#FAFAFA] flex overflow-hidden"
      style={{ aspectRatio: "16 / 10" }}
    >
      <Sidebar />
      <Main />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Sidebar gauche (240px sur desktop)
// ────────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside
      className="flex flex-col flex-shrink-0"
      style={{
        width: "200px",
        background: C.surface,
        borderRight: `1px solid ${C.border}`,
      }}
    >
      {/* Brand Vtensor + collapse toggle */}
      <div
        className="flex items-center justify-between px-3 py-3"
        style={{ minHeight: 64, borderBottom: `1px solid ${C.border}` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/vtensor.svg"
          alt="Vtensor"
          style={{ height: 30, width: "auto", objectFit: "contain" }}
          className="select-none"
        />
        <PanelLeftClose size={13} style={{ color: C.textMuted }} />
      </div>

      {/* Section header */}
      <div
        className="px-3 pt-3 pb-1"
        style={{
          ...monoStyle,
          fontSize: 9,
          color: C.textFaint,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        › Espace
      </div>

      {/* Nav onglets */}
      <nav className="flex-1 px-2 space-y-0 overflow-hidden">
        {SIDEBAR_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-2 px-2 py-1.5"
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: item.active ? C.violet : C.textMuted,
                background: item.active ? "linear-gradient(90deg, rgba(139,92,246,0.10), transparent)" : "transparent",
                borderLeft: `2px solid ${item.active ? C.violet : "transparent"}`,
              }}
            >
              <Icon size={12} strokeWidth={1.6} />
              <span className="flex-1">{item.label}</span>
              <span
                style={{
                  ...monoStyle,
                  fontSize: 8,
                  color: C.textFaint,
                  background: C.surface2,
                  border: `1px solid ${C.border}`,
                  padding: "1px 4px",
                  borderRadius: 2,
                }}
              >
                {item.shortcut}
              </span>
            </div>
          );
        })}
      </nav>

      {/* Footer User */}
      <div
        className="px-3 py-2.5 flex items-center gap-2"
        style={{ borderTop: `1px solid ${C.border}` }}
      >
        <div
          className="rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0"
          style={{
            width: 24,
            height: 24,
            background: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
            color: "#fff",
            ...monoStyle,
          }}
        >
          A
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-semibold truncate" style={{ color: C.text }}>
            {FIRST_NAME}
          </div>
          <div className="text-[9px] truncate" style={{ color: C.textFaint, ...monoStyle }}>
            {EMAIL}
          </div>
        </div>
      </div>
      <div
        className="px-3 pb-2 flex items-center gap-1.5"
        style={{
          ...monoStyle,
          fontSize: 8,
          color: C.textFaint,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
        système en ligne
      </div>
    </aside>
  );
}

// ────────────────────────────────────────────────────────────────────
// Main content
// ────────────────────────────────────────────────────────────────────

function Main() {
  return (
    <main className="flex-1 flex flex-col p-3 gap-2.5 overflow-hidden min-w-0">
      <Header />
      <KpiRow />
      <CardGrid />
      <FilesRow />
    </main>
  );
}

// Header — terminal greeting
function Header() {
  return (
    <header
      className="flex-shrink-0 px-3.5 py-2.5"
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
      }}
    >
      <div
        style={{
          ...monoStyle,
          fontSize: 9,
          color: C.textFaint,
          letterSpacing: "0.04em",
        }}
      >
        <span style={{ color: C.violet }}>{USERNAME}@{TENANT_SLUG}</span>:~$ état --espace {TENANT_SLUG} --maintenant
      </div>
      <h1
        className="font-semibold leading-tight mt-1"
        style={{ fontSize: 15, color: C.text, letterSpacing: "-0.01em" }}
      >
        <span
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          →{" "}
        </span>
        Bonsoir, {FIRST_NAME}
      </h1>
    </header>
  );
}

// KPI row — 4 cards
function KpiRow() {
  return (
    <div
      className="flex-shrink-0 grid grid-cols-4"
      style={{ border: `1px solid ${C.border}` }}
    >
      {KPIS.map((k, idx) => (
        <div
          key={k.key}
          className="px-3 py-2.5 flex flex-col gap-1.5"
          style={{
            background: C.surface,
            borderRight: idx < 3 ? `1px solid ${C.border}` : "none",
          }}
        >
          <div
            style={{
              ...monoStyle,
              fontSize: 8,
              color: k.accent,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            [{k.key}]
          </div>
          <div
            style={{
              ...monoStyle,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: C.text,
            }}
          >
            {k.value}
          </div>
          <div
            style={{
              fontSize: 9,
              color: C.textFaint,
              ...monoStyle,
            }}
          >
            // {k.label}
          </div>
          {k.period && (
            <div className="flex items-center">
              {PERIOD_CHIPS.map((p, i) => {
                const isActive = p === k.period;
                return (
                  <span
                    key={p}
                    style={{
                      ...monoStyle,
                      fontSize: 7,
                      letterSpacing: "0.06em",
                      fontWeight: isActive ? 700 : 500,
                      padding: "1px 4px",
                      borderTop: `1px solid ${C.border}`,
                      borderBottom: `1px solid ${C.border}`,
                      borderLeft: i === 0 ? `1px solid ${C.border}` : "none",
                      borderRight: `1px solid ${C.border}`,
                      background: isActive ? k.accent : "transparent",
                      color: isActive ? "#0A0A0A" : C.textFaint,
                    }}
                  >
                    {p}
                  </span>
                );
              })}
            </div>
          )}
          {k.showDetail && (
            <span
              className="self-start"
              style={{
                ...monoStyle,
                fontSize: 8,
                letterSpacing: "0.06em",
                fontWeight: 600,
                padding: "1.5px 5px",
                border: `1px solid ${k.accent}`,
                background: "transparent",
                color: k.accent,
                textTransform: "uppercase",
              }}
            >
              voir le détail →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// Grid 3 cards : Mon CEO / Activité / Agents
function CardGrid() {
  return (
    <div className="grid grid-cols-3 gap-2.5 flex-1 min-h-0 overflow-hidden">
      <CeoCard />
      <ActivityCard />
      <AgentsCard />
    </div>
  );
}

function CardShell({
  title,
  subtitle,
  actionLabel,
  children,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="flex flex-col overflow-hidden min-h-0"
      style={{ background: C.surface, border: `1px solid ${C.border}` }}
    >
      <header
        className="flex-shrink-0 flex items-center justify-between px-3 py-1.5"
        style={{
          borderBottom: `1px solid ${C.border}`,
          background: C.surface2,
        }}
      >
        <h3 className="flex items-center gap-1.5 min-w-0 truncate" style={{ ...monoStyle, fontSize: 10, color: C.text, fontWeight: 600 }}>
          <span>// {title}</span>
          {subtitle && (
            <span
              style={{ fontWeight: 500, fontSize: 9, color: C.textFaint }}
            >
              [{subtitle}]
            </span>
          )}
        </h3>
        {actionLabel && (
          <span
            className="flex items-center gap-1"
            style={{ ...monoStyle, fontSize: 9, color: C.textMuted }}
          >
            <span>{actionLabel}</span>
            <Maximize2 size={9} strokeWidth={1.8} />
          </span>
        )}
      </header>
      <div className="flex-1 overflow-hidden p-2.5 min-h-0">{children}</div>
    </section>
  );
}

// Mon CEO Card
function CeoCard() {
  return (
    <CardShell title="mon ceo" subtitle="12" actionLabel="étendre">
      <div className="h-full flex flex-col">
        {/* Toolbar : historique + nouvelle */}
        <div
          className="flex items-center gap-1 px-1 pb-1.5 flex-shrink-0"
          style={{ borderBottom: `1px solid ${C.border}` }}
        >
          <span
            className="flex items-center gap-1 px-1.5 py-0.5"
            style={{
              ...monoStyle,
              fontSize: 8.5,
              color: C.textMuted,
              letterSpacing: "0.04em",
            }}
          >
            <Clock size={8} strokeWidth={1.8} />
            historique
            <span
              style={{
                background: C.surface3,
                color: C.cyan,
                padding: "0 3px",
                fontSize: 8,
                fontWeight: 700,
                border: `1px solid ${C.border}`,
              }}
            >
              12
            </span>
          </span>
          <span
            className="ml-auto flex items-center gap-1 px-1.5 py-0.5"
            style={{
              background: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
              color: "#fff",
              ...monoStyle,
              fontSize: 8.5,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            + nouvelle
          </span>
        </div>

        {/* Zone chat (vide / accueil) — logo du tenant (fictif Acme Studio) */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 px-2">
          <AcmeStudioLogo />
          <div style={{ ...monoStyle, fontSize: 8, color: C.cyan, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            // directeur exécutif
          </div>
          <div className="text-[10px] text-center mt-1" style={{ color: C.textMuted }}>
            Sur quoi veux-tu qu&apos;on avance ?
          </div>
        </div>

        {/* Input */}
        <div
          className="flex items-center gap-1.5 px-2 py-1.5 mt-1 flex-shrink-0"
          style={{ background: C.surface2, border: `1px solid ${C.border}` }}
        >
          <span style={{ color: C.cyan, fontSize: 9 }}>$</span>
          <span style={{ fontSize: 8.5, color: C.textFaint, flex: 1 }} className="truncate">
            Posez-moi votre question...
          </span>
          <span style={{ ...monoStyle, fontSize: 7, color: C.textMuted, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            envoyer ↑
          </span>
        </div>

        {/* Suggestions */}
        <div className="mt-1.5 flex flex-wrap gap-1">
          {["Briefing du matin", "Statut SAV"].map((s) => (
            <span
              key={s}
              className="px-1.5 py-0.5"
              style={{
                ...monoStyle,
                fontSize: 8,
                color: C.textMuted,
                border: `1px solid ${C.border}`,
              }}
            >
              › {s}
            </span>
          ))}
        </div>
      </div>
    </CardShell>
  );
}

// Activité Card
function ActivityCard() {
  return (
    <CardShell title="activité" subtitle="12 dernières" actionLabel="tout voir">
      <ul className="space-y-0 overflow-hidden">
        {ACTIVITY.map((a, i) => (
          <li
            key={i}
            className="flex items-start gap-1.5 px-1 py-1.5"
            style={{ borderBottom: i < ACTIVITY.length - 1 ? `1px solid ${C.border}` : "none" }}
          >
            <span
              className="flex-shrink-0 font-bold"
              style={{
                ...monoStyle,
                fontSize: 8,
                padding: "1.5px 4px",
                background: a.accent.bg,
                color: a.accent.fg,
                border: `1px solid ${a.accent.border}`,
                marginTop: 1,
                letterSpacing: "0.04em",
              }}
            >
              {a.acr}
            </span>
            <div className="min-w-0 flex-1">
              <div
                className="truncate"
                style={{ fontSize: 9.5, color: C.textMuted, lineHeight: 1.3 }}
                title={a.text}
              >
                {a.text}
              </div>
              <div
                className="flex items-center gap-1.5 mt-0.5"
                style={{ ...monoStyle, fontSize: 7.5, color: C.textFaint }}
              >
                <span>{a.age}</span>
                {a.tools && (
                  <>
                    <span>·</span>
                    <span>{a.tools}</span>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

// Agents Card
function AgentsCard() {
  return (
    <CardShell title="agents" subtitle="7/7" actionLabel="catalogue">
      <ul className="space-y-0 -mx-2.5 overflow-hidden">
        {AGENTS_LIST.map((a, i) => (
          <li
            key={a.acr}
            className="flex items-center gap-2 px-2.5 py-1.5"
            style={{
              borderBottom: i < AGENTS_LIST.length - 1 ? `1px solid ${C.border}` : "none",
            }}
          >
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 26,
                height: 26,
                background: a.bg,
                border: `1px solid ${a.border}`,
                ...monoStyle,
                fontSize: 9,
                fontWeight: 700,
                color: a.fg,
              }}
            >
              {a.acr}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-semibold truncate" style={{ fontSize: 10, color: C.text }}>
                  {a.name}
                </span>
                {a.auto && (
                  <span
                    className="px-1 py-0.5"
                    style={{
                      ...monoStyle,
                      fontSize: 7,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: C.cyan,
                      border: `1px solid rgba(34,211,238,0.4)`,
                    }}
                  >
                    auto
                  </span>
                )}
                <span
                  className="ml-auto flex items-center gap-1 px-1 py-0.5"
                  style={{
                    ...monoStyle,
                    fontSize: 7,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#86efac",
                  }}
                >
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "#86efac",
                      boxShadow: "0 0 4px #86efac",
                      display: "inline-block",
                    }}
                  />
                  actif
                </span>
              </div>
              <div
                className="truncate mt-0.5"
                style={{ ...monoStyle, fontSize: 8, color: C.textFaint }}
              >
                {a.role}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

// Files row bottom
function FilesRow() {
  return (
    <section
      className="flex-shrink-0 px-3 py-1.5 flex items-center gap-3"
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
      }}
    >
      <div className="flex-shrink-0" style={{ minWidth: 140 }}>
        <div
          style={{
            ...monoStyle,
            fontSize: 8,
            color: C.cyan,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            background: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 2,
          }}
        >
          // fichiers
        </div>
        <div className="flex items-center gap-1.5" style={{ ...monoStyle, fontSize: 9 }}>
          <span style={{ color: C.textMuted }}>8 créations</span>
          <span style={{ color: C.textFaint }}>•</span>
          <span style={{ color: C.cyan }}>4.2K/50K crédits</span>
          <span style={{ color: C.textFaint }}>•</span>
          <span style={{ color: C.textFaint }}>17j</span>
        </div>
      </div>

      {/* Thumbnails génériques : gradients colorés (pas photos personnelles) */}
      <div className="flex-1 min-w-0 flex items-center gap-1 overflow-hidden">
        {[
          "linear-gradient(135deg, #8B5CF6, #22D3EE)",
          "linear-gradient(135deg, #f472b6, #8B5CF6)",
          "linear-gradient(135deg, #22D3EE, #10b981)",
          "linear-gradient(135deg, #eab308, #f472b6)",
          "linear-gradient(135deg, #3b82f6, #22D3EE)",
          "linear-gradient(135deg, #10b981, #22D3EE)",
          "linear-gradient(135deg, #f472b6, #eab308)",
          "linear-gradient(135deg, #4f46e5, #8B5CF6)",
        ].map((g, i) => (
          <div
            key={i}
            className="flex-shrink-0 relative"
            style={{
              width: 32,
              height: 32,
              border: `1px solid ${C.border}`,
              background: g,
            }}
          >
            <div
              className="absolute top-0 left-0 px-1"
              style={{
                ...monoStyle,
                fontSize: 6,
                fontWeight: 700,
                color: "white",
                background: "rgba(139,92,246,0.85)",
                letterSpacing: "0.02em",
              }}
            >
              40c
            </div>
          </div>
        ))}
      </div>

      <span
        className="flex-shrink-0 flex items-center gap-1"
        style={{
          ...monoStyle,
          fontSize: 8.5,
          color: C.cyan,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        tout voir →
      </span>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────
// Logo fictif Acme Studio — inline SVG, no asset file needed.
// Représente le logo du tenant (équivalent du logo 3DNum dans le vrai dashboard).
// Losange split cyan/violet + wordmark "acme.studio".
// ────────────────────────────────────────────────────────────────────
function AcmeStudioLogo() {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Losange — moitié haute cyan, moitié basse violet */}
        <defs>
          <linearGradient id="acme-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <path
          d="M14 2 L26 14 L14 26 L2 14 Z"
          stroke="url(#acme-grad)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M14 8 L20 14 L14 20 L8 14 Z"
          fill="url(#acme-grad)"
          opacity="0.85"
        />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-display, var(--font-sans), Inter, sans-serif)",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#FAFAFA",
        }}
      >
        acme
        <span style={{ color: "#22D3EE" }}>.</span>
        <span style={{ fontWeight: 400, color: "#8B8B97" }}>studio</span>
      </span>
    </div>
  );
}
