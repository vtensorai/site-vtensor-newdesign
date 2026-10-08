/**
 * « Une journée avec vos agents » : cinq situations qu'un dirigeant de TPE
 * reconnaît, chacune avec ce que l'agent produit (exemple fictif), puis le
 * récapitulatif du soir. Remplace « Ce que ça change » et ses piliers.
 */

import { DAY } from "@/data/home";
import { Artefact } from "./Artefacts";
import { Reveal } from "./Bits";

const NB = " ";

export function Journee() {
  return (
    <section className="band py-[clamp(64px,7vw,104px)]" id="journee">
      <div className="shell flex flex-col gap-12 lg:gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="kicker">Une journée avec vos agents</div>
            <h2 className="h2">Cinq situations que vous reconnaissez.</h2>
          </div>
          <p className="p lg:col-start-9 lg:col-span-4">
            Et ce que vos agents en font pendant que vous travaillez. L&apos;équipe que vous ne pouviez pas vous offrir, sur une journée.{" "}
            <span className="text-faint">Exemple{NB}: un atelier de menuiserie.</span>
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:gap-0">
        <span className="small text-faint lg:hidden">Faites défiler la journée →</span>
        <ol className="tl list-none lg:gap-12">
          {DAY.map((m) => (
            <Reveal key={m.time} as="li" className="tl-row grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start content-start" delay={60}>
              <div className="lg:col-span-5 flex flex-col gap-3 lg:pt-1">
                <span className="tl-time">{m.time.replace(":", " h ")}</span>
                <p className="tl-quote">«{NB}{m.situation}{NB}»</p>
              </div>
              <div className="lg:col-start-7 lg:col-span-6">
                <Artefact m={m} />
              </div>
            </Reveal>
          ))}

        </ol>
        </div>

          {/* Le soir : ce qui a été fait, ce qui vous attend */}
          <Reveal className="lg:pl-9">
            <div className="strong grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-7 md:p-10">
              <div className="lg:col-span-5 flex flex-col gap-3">
                <span className="mono accent text-[13px] tracking-[0.06em]">19 h 30 · le soir</span>
                <p className="serif m-0 text-[clamp(26px,2.6vw,36px)] leading-[1.1]">Vous ouvrez l&apos;application. Tout est fait, sauf deux décisions.</p>
              </div>
              <div className="lg:col-start-7 lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5">
                {[
                  ["12", "mails clients traités"],
                  ["4", "appels pris"],
                  ["3", "relances envoyées"],
                  ["2", "décisions pour vous"],
                ].map(([n, l]) => (
                  <div key={l} className="flex flex-col gap-1.5 pt-3" style={{ borderTop: "1px solid color-mix(in srgb, var(--strong-muted) 35%, transparent)" }}>
                    <span className="serif text-[40px] leading-none">{n}</span>
                    <span className="muted text-[13px] leading-[1.35]">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
      </div>
    </section>
  );
}
