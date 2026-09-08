import { Icon } from "./Icons";
import { Photo } from "./Photo";

const NB = " ";

const GUARDS: { icon: keyof typeof Icon; title: string; text: string }[] = [
  { icon: "server", title: `Allemagne, ISO${NB}27001`, text: "Serveurs Hetzner en Allemagne. Chaque client dispose de son propre espace isolé : vos données ne croisent jamais celles d'un autre." },
  { icon: "shield", title: "Un agent ne lit que ce qui le concerne", text: "Un agent qui répond à un email n'accède qu'aux données de son expéditeur. La restriction est appliquée par le système, pas par une consigne qu'un message malveillant pourrait contourner." },
  { icon: "file", title: "Pièces jointes analysées avant lecture", text: "Formats autorisés uniquement, antivirus, extraction isolée. Le contenu d'un fichier est traité comme une donnée, jamais comme une instruction." },
  { icon: "eye", title: "Vous gardez la main", text: "Les actions sensibles sortent en brouillon à valider. Chaque action est journalisée. Un agent qui sort de son périmètre vous passe la main." },
];

export function Security() {
  return (
    <section className="section" id="securite">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="kicker">Sécurité</div>
          <h2 className="h2">Vos données restent dans leur périmètre.</h2>
          <p className="p">Quatre garde-fous, actifs sur chaque agent.</p>
          <Photo name="datacenter" alt="Baie de serveurs dans un centre de données" width={1400} height={1738} className="photo mt-2" style={{ aspectRatio: "1 / 1" }} />
        </div>
        <div className="lg:col-start-7 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 lg:pt-2">
          {GUARDS.map((g) => {
            const Ic = Icon[g.icon];
            return (
              <div key={g.title} className="flex flex-col gap-3.5 pt-6 border-t border-ink">
                <span className="text-accent"><Ic size={22} /></span>
                <h3 className="h3" style={{ fontSize: 24 }}>{g.title}</h3>
                <p className="p text-[15px]">{g.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
