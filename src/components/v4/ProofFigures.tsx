/**
 * Chiffres réels de 3D NUM, mesurés en lecture seule dans la base de
 * production le 2026-10-08 (15 h 50, heure de Paris). Formulations limitées à
 * ce que les données permettent (cf. Output/Vtensor_Site_Revue_2026-10-08.md).
 * À valider par Victor avant mise en ligne.
 */

const NB = " ";

const FIGURES = [
  { n: "52", l: "mails de clients et de partenaires traités par l'agent SAV depuis mai" },
  { n: `1${NB}min${NB}51`, l: "pour qu'une réponse soit prête, en médiane, après l'envoi du mail" },
  { n: "92", l: "factures fournisseurs saisies dans Odoo, pour 30 fournisseurs" },
  { n: "284", l: "recherches et lectures dans la documentation technique pour répondre juste" },
];

export function ProofFigures() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <span className="mono text-[11px] tracking-[0.14em] uppercase text-muted">3D NUM · chiffres réels, mesurés dans l&apos;application</span>
        <a href="https://www.3dnum.fr" target="_blank" rel="noopener noreferrer" className="small hover:text-accent transition-colors">
          3dnum.fr
        </a>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
        {FIGURES.map((f) => (
          <div key={f.l} className="flex flex-col gap-3 pt-4 border-t border-ink">
            <span className="fig">{f.n}</span>
            <span className="small text-[14px]">{f.l}</span>
          </div>
        ))}
      </div>
      <p className="small text-faint m-0">Mesure du 8 octobre 2026, sur la période de mai à octobre 2026. Le délai court de l&apos;heure d&apos;envoi indiquée par l&apos;expéditeur à la réponse rédigée (75 mails).</p>
    </div>
  );
}
