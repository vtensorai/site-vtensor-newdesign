/** Comment ça marche V4 : quatre étapes sur une ligne de progression, sans photo d'illustration. */

import { Reveal } from "./Bits";

const NB = " ";

const STEPS = [
  { meta: `30${NB}min, en visio`, title: "Audit gratuit", text: "On repère avec vous les tâches qui vous coûtent le plus de temps, et les outils que vous utilisez déjà." },
  { meta: "après l'audit", title: "Proposition", text: "Les agents à créer, ce que chacun fera chez vous, le prix de l'abonnement et de l'intégration." },
  { meta: "quelques jours à deux semaines", title: "Mise en place", text: "On branche vos outils, on développe chaque agent, vous le testez en conditions réelles avant de l'activer." },
  { meta: "en continu", title: "Au travail", text: "Vous parlez à vos agents par email, téléphone ou depuis l'application. Ils évoluent avec votre entreprise, sans surcoût." },
];

export function HowV4() {
  return (
    <section className="section" id="comment-ca-marche">
      <div className="shell flex flex-col gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="kicker">Comment ça marche</div>
            <h2 className="h2">De la première visio au premier agent au travail.</h2>
          </div>
          <p className="p lg:col-start-9 lg:col-span-4">Aucune ligne de code de votre côté, aucun logiciel à changer.</p>
        </div>
        <ol className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 relative">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="mono inline-flex items-center justify-center w-9 h-9 rounded-full border border-ink text-[13px] font-medium shrink-0">{i + 1}</span>
                <span className="h-px flex-1 bg-rule" aria-hidden="true" />
              </div>
              <span className="num">{s.meta}</span>
              <h3 className="h3">{s.title}</h3>
              <p className="p text-[15px]">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
