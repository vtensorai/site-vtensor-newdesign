import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

const NB = " ";

const STEPS = [
  { meta: `01 · 30${NB}min, en visio`, title: "Audit gratuit", text: "On cartographie vos outils et les tâches qui vous coûtent le plus de temps." },
  { meta: "02 · après l'audit", title: "Proposition", text: "Les postes à créer, ce que chaque agent fera concrètement, et le devis d'intégration." },
  { meta: "03 · quelques jours à deux semaines", title: "Mise en place", text: "On connecte vos outils, on développe chaque agent, et vous le validez en conditions réelles avant la mise en production." },
  { meta: "04 · en continu", title: "En production", text: "Vous parlez à chaque agent par email, depuis l'application, WhatsApp ou téléphone. Les évolutions sont incluses." },
];

export function HowItWorks() {
  return (
    <section className="section" id="comment-ca-marche">
      <div className="container flex flex-col gap-10 lg:gap-12">
        <SectionHead kicker="Comment ça marche" title="De l'audit à la production, en quatre étapes." lead="Tout commence par une visio de trente minutes. Aucune ligne de code de votre côté." />
        <Photo name="visio" alt="Un dirigeant en visio dans un bureau lumineux" width={1376} height={768} className="photo h-[260px] sm:h-[340px] lg:h-[440px]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((s) => (
            <div key={s.title} className="flex flex-col gap-3 pt-6 border-t border-ink">
              <span className="num">{s.meta}</span>
              <h3 className="h3">{s.title}</h3>
              <p className="p text-[15px]">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
