/**
 * Ce que produit chaque agent dans la journée type (exemple fictif) :
 * un mail envoyé, un appel pris, une relance, une liste de prospects, un article.
 * On montre le résultat, pas la technique.
 */

import type { Moment } from "@/data/v4";
import { Icon } from "../site/Icons";
import { AgentTag } from "./Bits";

const NB = " ";

function Head({ m, label }: { m: Moment; label: string }) {
  return (
    <div className="art-head">
      <AgentTag k={m.agent} full />
      <span className="art-meta">
        {label} · {m.time.replace(":", " h ")}
      </span>
    </div>
  );
}

function Ok({ children }: { children: React.ReactNode }) {
  return (
    <span className="art-ok">
      <Icon.check size={14} /> {children}
    </span>
  );
}

function Wait({ children }: { children: React.ReactNode }) {
  return (
    <span className="art-wait">
      <span className="atag2-dot" aria-hidden="true" /> {children}
    </span>
  );
}

function Wave() {
  const bars = [6, 12, 18, 9, 22, 14, 26, 11, 19, 8, 16, 24, 10, 20, 7, 15, 23, 12, 18, 9, 14, 6];
  return (
    <svg width="132" height="28" viewBox="0 0 132 28" aria-hidden="true" style={{ color: "var(--app-indigo)" }}>
      {bars.map((h, i) => (
        <rect key={i} x={i * 6} y={(28 - h) / 2} width="3" height={h} rx="1.5" fill="currentColor" opacity={i < 15 ? 1 : 0.3} />
      ))}
    </svg>
  );
}

export function Artefact({ m }: { m: Moment }) {
  switch (m.kind) {
    case "mail":
      return (
        <div className="art">
          <Head m={m} label="email" />
          <div className="art-body">
            <div className="mono text-[11.5px] leading-[1.7] text-faint">
              À{NB}: Mme Leroy
              <br />
              Objet{NB}: Re: Votre escalier
            </div>
            <p className="m-0 text-ink">
              Bonjour Madame Leroy, la fabrication avance bien{NB}: la pose est prévue la semaine du 26 octobre. Je reviens vers vous pour le choix de la teinte…
            </p>
          </div>
          <div className="art-foot">
            <Ok>Envoyé 3 min après réception</Ok>
            <span className="art-meta">vous en copie</span>
          </div>
        </div>
      );
    case "call":
      return (
        <div className="art">
          <Head m={m} label="appel entrant" />
          <div className="art-body">
            <div className="flex items-center gap-4">
              <Wave />
              <span className="art-meta">1 min 20</span>
            </div>
            <p className="m-0 text-ink">
              <strong className="font-semibold">M. Durand</strong> veut un devis pour un escalier en chêne, maison à Montfort-l&apos;Amaury. Rappel souhaité demain avant 10{NB}h.
            </p>
          </div>
          <div className="art-foot">
            <Ok>Message envoyé sur votre téléphone</Ok>
          </div>
        </div>
      );
    case "invoice":
      return (
        <div className="art">
          <Head m={m} label="relance" />
          <div className="art-body">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="text-ink">Facture F-2026-118</span>
              <span className="mono text-[20px] font-medium text-ink">1{NB}240,00{NB}€ HT</span>
            </div>
            <span className="badge badge-offer self-start">échue depuis 32 jours</span>
            <p className="m-0">Relance courtoise envoyée à M. Garnier, avec la facture en pièce jointe.</p>
          </div>
          <div className="art-foot">
            <Ok>Relance envoyée</Ok>
            <span className="art-meta">suivante à 60 jours</span>
          </div>
        </div>
      );
    case "prospects":
      return (
        <div className="art">
          <Head m={m} label="prospection" />
          <div className="art-body">
            <span className="text-ink">
              <strong className="font-semibold">38 entreprises</strong> trouvées dans les Yvelines
            </span>
            <ul className="m-0 p-0 list-none flex flex-col">
              {["Syndic de copropriété · Versailles", "Agence immobilière · Rambouillet", "Gestionnaire de biens · Saint-Cyr-l'École"].map((l) => (
                <li key={l} className="flex items-center justify-between gap-3 py-2 border-t border-rule-2 text-[13.5px]">
                  <span>{l}</span>
                  <span className="art-meta">mail prêt</span>
                </li>
              ))}
              <li className="pt-2 border-t border-rule-2 art-meta">+ 35 autres</li>
            </ul>
          </div>
          <div className="art-foot">
            <Wait>31 mails à valider</Wait>
            <span className="mini-btn mini-btn-on">Valider</span>
          </div>
        </div>
      );
    case "article":
      return (
        <div className="art">
          <Head m={m} label="site web" />
          <div className="art-body">
            <div className="grid grid-cols-[72px_1fr] gap-4 items-center">
              <div className="h-[72px] border border-rule bg-alt flex items-center justify-center text-faint">
                <Icon.file size={22} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="serif text-[18px] leading-tight text-ink">Un escalier en chêne posé en une journée à Montfort-l&apos;Amaury</span>
                <span className="art-meta">article · 4 photos · « escalier chêne Yvelines »</span>
              </div>
            </div>
          </div>
          <div className="art-foot">
            <Wait>Prêt à publier</Wait>
            <span className="mini-btn">Relire</span>
          </div>
        </div>
      );
  }
}
