/**
 * Application : un téléphone lisible (même sur mobile) qui montre ce que voit
 * le dirigeant le soir — les décisions à prendre et ce qui a été fait. Remplace
 * la réplique du tableau de bord (invite de terminal, tool_calls, réduite à 28 % sur mobile).
 * Données d'exemple.
 */

import { APP_URL } from "@/lib/links";
import type { AgentKey } from "@/data/home";
import { AGENT_COLOR } from "@/data/home";
import { Icon } from "./Icons";
import { LogoMark } from "./Logo";
import { AgentTag, Reveal } from "./Bits";

const NB = " ";

const DONE: [AgentKey, string][] = [
  ["SAV", "12 mails clients traités"],
  ["STA", "4 appels pris, dont 1 urgent"],
  ["ADM", "3 relances envoyées"],
];

const POINTS = [
  ["Validez d'un geste", "Mails de prospection, articles, devis : vous validez avant l'envoi."],
  ["Parlez à chaque agent", "Par écrit dans l'application ou par email, comme à un collègue."],
  ["Retrouvez tout", "Messages, appels, fichiers, historique de chaque agent, au même endroit."],
] as const;

function Screen() {
  return (
    <div className="phone" aria-label="Aperçu de l'application sur téléphone (données d'exemple)" role="img">
      <div className="phone-screen">
        <div className="phone-notch" aria-hidden="true" />
        <div className="flex items-center justify-between px-5 pt-3 pb-2">
          <span className="inline-flex items-center gap-2 text-[13px] font-medium">
            <LogoMark id="phone" size={18} /> Vtensor
          </span>
          <span className="w-7 h-7 rounded-full bg-accent text-on-accent text-[12px] font-semibold inline-flex items-center justify-center">S</span>
        </div>
        <div className="px-5 pt-2 pb-3">
          <span className="serif text-[24px] leading-tight">Bonsoir Sophie</span>
        </div>

        <div className="px-4 flex flex-col gap-2.5">
          <span className="mono text-[10px] tracking-[0.14em] uppercase text-accent px-1">À valider · 2</span>
          <div className="border border-rule bg-card p-3 flex flex-col gap-2">
            <AgentTag k="COM" full />
            <span className="text-[13px] leading-snug text-ink">31 mails de prospection · syndics et agences, Yvelines</span>
            <div className="flex gap-2">
              <span className="mini-btn">Voir</span>
              <span className="mini-btn mini-btn-on">Valider</span>
            </div>
          </div>
          <div className="border border-rule bg-card p-3 flex flex-col gap-2">
            <AgentTag k="WEB" full />
            <span className="text-[13px] leading-snug text-ink">Article : Un escalier en chêne posé en une journée</span>
            <div className="flex gap-2">
              <span className="mini-btn">Relire</span>
              <span className="mini-btn mini-btn-on">Publier</span>
            </div>
          </div>

          <span className="mono text-[10px] tracking-[0.14em] uppercase text-muted px-1 pt-2">Aujourd&apos;hui</span>
          <div className="flex flex-col">
            {DONE.map(([k, t]) => (
              <div key={k} className="flex items-center gap-2.5 py-2 border-t border-rule-2 text-[12.5px]">
                <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: AGENT_COLOR[k] }} aria-hidden="true" />
                <span className="text-ink">{t}</span>
                <span className="ml-auto" style={{ color: "var(--app-green)" }}>
                  <Icon.check size={13} />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto px-4 pb-5">
          <div className="border border-rule bg-card px-3 py-2.5 flex items-center justify-between text-[12px] text-faint">
            <span>Écrire à un agent…</span>
            <span className="text-accent"><Icon.send size={14} /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppPhone() {
  return (
    <section className="band py-[clamp(64px,7vw,104px)]" id="application">
      <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="kicker">Application</div>
          <h2 className="h2">Vous gardez la main, d&apos;un coup d&apos;œil.</h2>
          <p className="lead">Chaque agent vous rend compte dans une seule application, sur votre téléphone ou votre ordinateur.</p>
          <ul className="m-0 p-0 list-none flex flex-col">
            {POINTS.map(([t, d]) => (
              <li key={t} className="grid grid-cols-[28px_1fr] gap-3 py-4 border-t border-rule last:border-b">
                <span className="text-accent pt-0.5"><Icon.check size={18} /></span>
                <span className="flex flex-col gap-1">
                  <span className="text-[16px] font-medium text-ink">{t}</span>
                  <span className="p text-[15px]">{d}</span>
                </span>
              </li>
            ))}
          </ul>
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost self-start">
            Accéder à l&apos;application <Icon.external size={15} />
          </a>
        </div>
        <Reveal className="lg:col-start-8 lg:col-span-5 flex justify-center">
          <div className="relative">
            <Screen />
            <span className="absolute -bottom-8 left-0 right-0 text-center small text-faint">Données d&apos;exemple{NB}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
