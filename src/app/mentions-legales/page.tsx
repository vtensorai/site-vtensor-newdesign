import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";
import { CONTACT_EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  alternates: { canonical: "/mentions-legales/" },
  title: "Mentions légales — Vtensor",
  description: "Mentions légales du site vtensor.ai, édité par V TENSOR AI SAS.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout kicker="Mentions légales" title="Mentions légales" updated="7 septembre 2026">
      <p>
        Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie
        numérique, voici les informations relatives à l&apos;éditeur et à l&apos;hébergeur du site
        vtensor.ai.
      </p>

      <h2>Éditeur du site</h2>
      <ul>
        <li>
          <strong>V TENSOR AI</strong>, société par actions simplifiée au capital de 2 000 €
        </li>
        <li>Siège social : 15 rue de la Motte, 78720 Saint-Forget, France</li>
        <li>RCS Versailles 929 701 217 · SIRET 929 701 217 00010</li>
        <li>N° de TVA intracommunautaire : FR01 929 701 217</li>
        <li>Directeur de la publication : Victor Arnoul, Président</li>
        <li>
          Contact : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </li>
      </ul>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>Hetzner Online GmbH</strong>, Industriestr. 25, 91710
        Gunzenhausen, Allemagne (
        <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer">
          www.hetzner.com
        </a>
        ), sur des datacenters situés en Allemagne.
      </p>
      <p>
        La diffusion du site et sa protection sont assurées par <strong>Cloudflare, Inc.</strong>,
        101 Townsend Street, San Francisco, CA 94107, États-Unis.
      </p>
      <p>
        La prise de rendez-vous (« audit gratuit ») est opérée par le service tiers{" "}
        <strong>Cal.com, Inc.</strong>{" "}et s&apos;ouvre dans une page distincte du site.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus du site (textes, visuels, logos, marques, structure,
        code) est la propriété exclusive de V TENSOR AI ou de ses partenaires, et est protégé
        par le droit de la propriété intellectuelle. Toute reproduction, représentation,
        modification ou diffusion, totale ou partielle, sans autorisation écrite préalable
        est interdite.
      </p>

      <h2>Responsabilité</h2>
      <p>
        V TENSOR AI s&apos;efforce de fournir des informations exactes et à jour, sans pouvoir
        garantir l&apos;exhaustivité ou l&apos;absence d&apos;erreur. Les informations
        publiées, notamment les tarifs, sont indicatives et ne constituent pas une offre
        contractuelle : seul un devis signé engage V TENSOR AI. Le site peut contenir des liens
        vers des sites tiers dont V TENSOR AI n&apos;assume pas le contenu.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Les traitements de données personnelles réalisés via ce site sont décrits dans notre{" "}
        <a href="/politique-de-confidentialite/">politique de confidentialité</a>.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Le présent site est soumis au droit français. Tout litige relatif à son utilisation
        relève, à défaut d&apos;accord amiable, de la compétence des tribunaux du ressort de
        Versailles.
      </p>
    </LegalLayout>
  );
}
