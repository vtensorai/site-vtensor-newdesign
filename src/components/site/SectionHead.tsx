/** En-tête de section : repère mono, titre serif, phrase d'accroche alignée à droite sur desktop. */

export function SectionHead({ kicker, title, lead, id }: { kicker: string; title: string; lead?: string; id?: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end" id={id}>
      <div className="lg:col-span-7 flex flex-col gap-5">
        <div className="kicker">{kicker}</div>
        <h2 className="h2">{title}</h2>
      </div>
      {lead && <p className="p lg:col-start-9 lg:col-span-4">{lead}</p>}
    </div>
  );
}
