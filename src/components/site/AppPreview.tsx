"use client";

/**
 * Aperçu de l'application : reproduit le tableau de bord réel (barre latérale,
 * accueil terminal, 4 indicateurs, conversations / activité / agents, fichiers).
 * Données d'exemple. Le sélecteur d'agent de la carte conversations est actif.
 */

import { useState } from "react";
import { AGENTS } from "@/data/agents";
import { Icon } from "./Icons";
import { LogoMark } from "./Logo";
import { Scaler } from "./Scaler";
import { SectionHead } from "./SectionHead";

const NB = " ";
const TAG: Record<string, string> = { SAV: "var(--app-cyan)", ATC: "var(--app-blue)", ADM: "var(--app-green)", WEB: "var(--app-amber)", MKT: "var(--app-pink)", STA: "var(--app-indigo)" };

const ACTIVITY: [string, string, string, string?][] = [
  ["STA", `Appel (37${NB}s) de +33 6 12 34 56 78 — Devis demandé sur la gamme produit`, `il y a 1${NB}h`],
  ["SAV", `Ticket #1024 résolu — contournement envoyé en 47${NB}s`, `il y a 2${NB}h`],
  ["ADM", `Import facture #00427 — Atelier Lumière 173,60${NB}€`, `il y a 3${NB}h`, "3 tool_calls"],
  ["ATC", "Email — relance devis #00412 envoyée", `il y a 6${NB}h`, "1 tool_call"],
  ["MKT", "Carrousel LinkedIn en brouillon — 3 erreurs d'automatisation en PME", `il y a 8${NB}h`],
  ["WEB", "Article SEO publié — Audit Google Ads PME", `il y a 1${NB}j`],
  ["ADM", "Relance impayé #00385 J+30 envoyée", `il y a 1${NB}j`, "2 tool_calls"],
];

const ROLES: Record<string, string> = {
  SAV: "email.kb.tickets",
  ATC: "email.crm.devis.appels_d_offres",
  ADM: "devis.suivi_commande.facturation",
  WEB: "cms.seo.search_console",
  MKT: "contenu.visuels.publication",
  STA: "accueil_telephonique.messages.escalation",
};

const KPIS = [
  ["attention.requise", "3", "Attention requise (escalations + erreurs)"],
  ["reactivite.moyenne", `2${NB}min`, "Réactivité moyenne (24h)"],
  ["heures.economisees", `42${NB}h`, "Heures économisées (7 jours)"],
  ["taches.automatisees", "156", "Tâches automatisées (7 jours)"],
];

const NAV: [keyof typeof Icon, string][] = [
  ["grid", "Tableau de bord"],
  ["users", "Agents"],
  ["folder", "Fichiers"],
  ["wand", "Studio"],
  ["brain", "Brain"],
  ["chat", "Conversations"],
  ["globe", "Web Designer"],
];

const REPLIES: Record<string, [string, string]> = {
  SAV: [`Où en est le ticket de Pierre${NB}?`, `Résolu en 47${NB}s : contournement envoyé, correctif sous 24${NB}h. Pierre a confirmé.`],
  ATC: [`Des nouvelles du devis #00412${NB}?`, `Relance envoyée ce matin. Le prospect a ouvert le devis deux fois ; je vous propose un appel jeudi.`],
  ADM: [`Combien d'impayés à plus de 30 jours${NB}?`, `4 factures, 8 720${NB}€${NB}HT au total. Toutes relancées, un virement confirmé pour vendredi.`],
  WEB: [`L'article sur Google Ads est publié${NB}?`, `Publié hier, indexé ce matin. 3 requêtes déjà positionnées en page 2.`],
  MKT: [`Le carrousel LinkedIn est prêt${NB}?`, `En brouillon, 8 visuels. Dites-moi si vous validez l'accroche et je programme la publication.`],
  STA: [`Qui a appelé ce matin${NB}?`, `Un appel à 9h12 : demande de devis sur la gamme produit. Message transmis à l'Agent Commercial.`],
};

function Tag({ acr }: { acr: string }) {
  return (
    <span className="atag" style={{ color: TAG[acr] }}>
      {acr}
    </span>
  );
}

export function AppPreview() {
  const [pick, setPick] = useState("SAV");
  const [q, r] = REPLIES[pick];
  const name = AGENTS.find((a) => a.acronym === pick)?.name ?? "l'agent";

  return (
    <section className="section" id="application">
      <div className="container flex flex-col gap-10">
        <SectionHead kicker="Application" title="Une interface pour piloter vos agents." lead="Suivez leurs actions, validez les brouillons en attente, ajustez leurs instructions, retrouvez leurs fichiers. Depuis un seul endroit." />
        <div className="flex flex-col gap-2.5">
          <Scaler width={1200}>
            <div className="app">
              <div className="app-side">
                <div className="flex items-center gap-2 px-1.5 pb-4 pt-1" style={{ color: "var(--app-text)" }}>
                  <LogoMark id="app" size={22} />
                  <span className="mono text-[15px] tracking-[0.5px]">tensor</span>
                </div>
                <div className="app-label px-2 pb-1.5">› espace</div>
                {NAV.map(([ic, label], i) => {
                  const Ic = Icon[ic];
                  return (
                    <div key={label} className="app-nav" data-on={i === 0}>
                      <Ic size={14} /> {label}
                      <span className="kbd">⌘{i + 1}</span>
                    </div>
                  );
                })}
                <div className="mt-auto flex items-center gap-2.5 p-2">
                  <span className="avatar">A</span>
                  <div>
                    <div className="app-name">Alex</div>
                    <div className="app-meta">alex@acme-industrie.fr</div>
                  </div>
                </div>
                <div className="app-meta px-2">
                  <span className="online" /> système en ligne
                </div>
              </div>

              <div className="app-main">
                <div className="app-card app-band flex flex-col gap-1.5" style={{ padding: "16px 20px" }}>
                  <span className="app-meta">alex@acme-industrie:~$ état --espace acme-industrie --maintenant</span>
                  <span className="text-[20px] font-semibold">→ Bonsoir, Alex</span>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                  {KPIS.map(([k, v, l]) => (
                    <div key={k} className="kpi-app">
                      <span className="app-label">[{k}]</span>
                      <span className="app-big">{v}</span>
                      <span className="app-meta">// {l}</span>
                      <span className="chips">
                        {["24H", "7J", "30J", "1AN", "ALL"].map((c, i) => (
                          <span key={c} className="chip-app" data-on={i === 0}>
                            {c}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid gap-2.5 items-stretch" style={{ gridTemplateColumns: "1fr 1.3fr 1fr" }}>
                  <div className="app-card flex flex-col">
                    <div className="app-head">
                      <span>
                        // conversations <span className="app-meta">[12]</span>
                      </span>
                      <span className="app-meta">étendre ↗</span>
                    </div>
                    <div className="flex flex-col gap-3 flex-1" style={{ padding: "12px 14px" }}>
                      <div className="flex justify-between items-center">
                        <span className="app-meta">
                          historique <span className="pill">12</span>
                        </span>
                        <span className="pill pill-violet">+ nouvelle</span>
                      </div>
                      <div className="flex flex-col items-center gap-2.5 pt-4 pb-2">
                        <span className="app-label" style={{ color: "var(--app-cyan)" }}>
                          // à qui voulez-vous parler{NB}?
                        </span>
                        <div className="flex flex-wrap justify-center gap-1.5" role="tablist" aria-label="Choisir un agent">
                          {AGENTS.map((a) => (
                            <button key={a.acronym} type="button" role="tab" aria-selected={pick === a.acronym} className="agentpick" onClick={() => setPick(a.acronym)}>
                              {a.acronym}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="bubble-app self-end">{q}</div>
                      <div className="bubble-app bubble-app-in">
                        <span className="app-label" style={{ color: "var(--app-cyan)" }}>
                          {name.toLowerCase()}
                        </span>
                        <br />
                        {r}
                      </div>
                      <div className="mt-auto flex items-center gap-2" style={{ padding: "9px 12px", border: "1px solid var(--app-border)" }}>
                        <span style={{ color: "var(--app-cyan)" }}>$</span>
                        <span className="app-meta flex-1">Écrire à l&apos;{name}…</span>
                        <span className="app-label">envoyer ↑</span>
                      </div>
                    </div>
                  </div>

                  <div className="app-card">
                    <div className="app-head">
                      <span>
                        // activité <span className="app-meta">[12 dernières]</span>
                      </span>
                      <span className="app-meta">tout voir ↗</span>
                    </div>
                    <div style={{ padding: "4px 14px" }}>
                      {ACTIVITY.map(([acr, text, when, extra], i) => (
                        <div key={i} className="arow-app">
                          <Tag acr={acr} />
                          <div>
                            <div className="app-line">{text}</div>
                            <div className="app-meta">
                              {when}
                              {extra ? ` · ${extra}` : ""}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="app-card">
                    <div className="app-head">
                      <span>
                        // agents <span className="app-meta">[6/6]</span>
                      </span>
                      <span className="app-meta">catalogue ↗</span>
                    </div>
                    <div style={{ padding: "4px 14px" }}>
                      {AGENTS.map((a) => (
                        <div key={a.acronym} className="agrow">
                          <Tag acr={a.acronym} />
                          <div className="flex flex-col gap-[3px] min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="app-name">{a.name}</span>
                              {a.autonomous && <span className="pill">auto</span>}
                            </div>
                            <div className="app-meta">{ROLES[a.acronym]}</div>
                          </div>
                          <span className="pill pill-on">actif</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="app-card app-band flex items-center gap-4" style={{ padding: "12px 20px" }}>
                  <span className="app-label" style={{ color: "var(--app-cyan)" }}>
                    // fichiers
                  </span>
                  <span className="app-meta">8 créations · 4,2K/50K crédits · 17{NB}j</span>
                  <span className="thumbs">
                    <span /><span /><span /><span /><span /><span />
                  </span>
                  <span className="app-meta ml-auto" style={{ color: "var(--app-cyan)" }}>
                    tout voir →
                  </span>
                </div>
              </div>
            </div>
          </Scaler>
          <span className="text-[12px] text-faint">Aperçu de l&apos;application, données d&apos;exemple.</span>
        </div>
      </div>
    </section>
  );
}
