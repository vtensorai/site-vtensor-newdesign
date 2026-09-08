import { Photo } from "./Photo";

const NB = " ";

const ITEMS = [
  {
    title: "L'équipe que vous ne pouviez pas vous offrir",
    text: "Un service client, un commercial, une équipe marketing à plein temps : recruter ces profils est souvent hors de portée. Vtensor vous donne accès à cette équipe complète, pour une fraction du coût d'un recrutement.",
  },
  {
    title: "Votre équipe revient à ce pour quoi vous l'avez recrutée",
    text: "Relancer les impayés, rédiger les mémoires techniques, mettre à jour les catalogues : les agents prennent le répétitif en charge.",
  },
  {
    title: "Vous récupérez les heures que vous seul pouvez investir",
    text: "Le pilotage demande votre attention sur la stratégie, pas sur l'opérationnel répétitif.",
  },
  {
    title: "Prenez de l'avance tant que c'est encore un avantage",
    text: "Dans quelques années, les agents IA seront la norme. Les entreprises qui s'équipent aujourd'hui prennent une avance durable.",
  },
  {
    title: "Vos données en Allemagne, ou chez vous",
    text: `Serveurs Hetzner en Allemagne, certifiés ISO${NB}27001. Déploiement possible sur vos propres serveurs. Équipe et développement en France.`,
  },
];

const PILLARS = [
  { title: "Les modèles les plus performants", text: "Mis à jour au rythme du marché, génération après génération." },
  { title: "Branchés sur vos outils", text: "ERP, messagerie, site web, téléphonie : intégration sur mesure." },
  { title: "Données sous haute protection", text: "Chiffrement, hébergement en Allemagne, isolation stricte par client." },
  { title: "Une équipe à la carte", text: "Du SAV au standard, choisissez les postes qui vous manquent." },
];

export function ChangeSection() {
  return (
    <section className="section" id="ce-que-ca-change">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="kicker">Ce que ça change</div>
          <h2 className="h2">Cinq situations que vous reconnaissez.</h2>
          <p className="p">Et ce qu&apos;une équipe d&apos;agents y change, concrètement.</p>
          <Photo name="dirigeant" alt="Un dirigeant de PME à son bureau, face à ses factures" width={1400} height={1875} className="photo hidden lg:block mt-4" style={{ aspectRatio: "4 / 5" }} />
        </div>
        <div className="lg:col-start-6 lg:col-span-7 flex flex-col">
          {ITEMS.map((it, i) => (
            <div key={it.title} className="grid grid-cols-[40px_1fr] md:grid-cols-[48px_1fr] gap-4 md:gap-5 py-6 md:py-7 border-t border-rule last:border-b">
              <span className="num pt-2">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-2">
                <h3 className="h3">{it.title}</h3>
                <p className="p">{it.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 lg:mt-14">
          {PILLARS.map((p) => (
            <div key={p.title} className="flex flex-col gap-2 pt-4 border-t border-ink">
              <span className="text-[15px] font-medium">{p.title}</span>
              <span className="small">{p.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
