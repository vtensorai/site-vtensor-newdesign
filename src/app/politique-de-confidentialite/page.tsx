import type { Metadata } from "next";
import { LegalLayout } from "@/components/sections/LegalLayout";
import { CONTACT_EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  alternates: { canonical: "/politique-de-confidentialite/" },
  title: "Politique de confidentialité — Vtensor",
  description:
    "Comment V TENSOR AI collecte, utilise et protège vos données personnelles sur vtensor.ai.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalLayout
      kicker="// politique de confidentialité"
      title="Politique de confidentialité"
      updated="7 septembre 2026"
    >
      <p>
        Cette politique décrit les données personnelles collectées lorsque vous utilisez le site
        vtensor.ai, les raisons de cette collecte et vos droits, conformément au Règlement
        général sur la protection des données (RGPD) et à la loi Informatique et Libertés.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        <strong>V TENSOR AI</strong>, SAS au capital de 2 000 €, 15 rue de la Motte, 78720
        Saint-Forget, France — RCS Versailles 929 701 217. Contact :{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Données collectées</h2>
      <h3>Prise de rendez-vous</h3>
      <p>
        Lorsque vous réservez un audit gratuit, la réservation est réalisée sur le service
        tiers Cal.com. Nous recevons les informations que vous y saisissez : nom, adresse
        e-mail, et le cas échéant les précisions que vous ajoutez sur votre entreprise et vos
        besoins.
      </p>
      <h3>Échanges par e-mail</h3>
      <p>
        Lorsque vous nous écrivez, nous conservons votre adresse e-mail et le contenu de nos
        échanges pour vous répondre et assurer le suivi de votre demande.
      </p>
      <h3>Données techniques</h3>
      <p>
        Comme tout site web, notre hébergeur et notre prestataire de diffusion traitent des
        données techniques de connexion (adresse IP, type de navigateur, pages consultées,
        horodatage) à des fins de sécurité et de bon fonctionnement du site.
      </p>
      <p>
        <strong>Le site n&apos;utilise aucun cookie de mesure d&apos;audience ni traceur
        publicitaire.</strong> Aucune bannière de consentement n&apos;est donc nécessaire.
        Si cela devait évoluer, cette politique serait mise à jour avant toute mise en place.
      </p>

      <h2>Finalités et bases légales</h2>
      <ul>
        <li>
          <strong>Organiser l&apos;audit et répondre à vos demandes</strong> — exécution de
          mesures précontractuelles prises à votre demande (art. 6.1.b RGPD).
        </li>
        <li>
          <strong>Assurer la sécurité et le fonctionnement du site</strong> — intérêt légitime
          (art. 6.1.f RGPD).
        </li>
        <li>
          <strong>Vous recontacter au sujet de nos services</strong> à la suite d&apos;un
          premier échange, dans un cadre strictement professionnel (B2B) — intérêt légitime
          (art. 6.1.f RGPD), avec possibilité de vous y opposer à tout moment.
        </li>
      </ul>

      <h2>Durées de conservation</h2>
      <ul>
        <li>
          Données de contact et échanges : 3 ans après notre dernier échange, ou pendant la
          durée de la relation contractuelle si vous devenez client, puis selon les
          obligations légales applicables.
        </li>
        <li>Journaux techniques de connexion : au maximum 12 mois.</li>
      </ul>

      <h2>Destinataires et sous-traitants</h2>
      <p>
        Vos données sont traitées par l&apos;équipe de V TENSOR AI et par les prestataires
        techniques suivants, qui agissent sur nos instructions :
      </p>
      <ul>
        <li>
          <strong>Hetzner Online GmbH</strong> (Allemagne) — hébergement, données stockées
          dans l&apos;Union européenne.
        </li>
        <li>
          <strong>Cloudflare, Inc.</strong> (États-Unis) — diffusion et protection du site.
        </li>
        <li>
          <strong>Cal.com, Inc.</strong> (États-Unis) — prise de rendez-vous.
        </li>
      </ul>
      <p>
        Les transferts vers des prestataires situés hors de l&apos;Union européenne sont
        encadrés par les garanties prévues au chapitre V du RGPD (clauses contractuelles
        types de la Commission européenne). Nous ne vendons ni ne louons vos données.
      </p>

      <h2>Sécurité</h2>
      <p>
        Le site est servi exclusivement en HTTPS. Les données sont hébergées sur des
        datacenters situés en Allemagne, certifiés ISO 27001, et l&apos;accès aux systèmes
        est restreint aux personnes habilitées.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
        limitation, d&apos;opposition et de portabilité de vos données, ainsi que du droit de
        définir des directives relatives au sort de vos données après votre décès. Pour
        l&apos;exercer, écrivez-nous à <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        Nous répondons dans un délai d&apos;un mois.
      </p>
      <p>
        Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une
        réclamation auprès de la CNIL (
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          www.cnil.fr
        </a>
        ).
      </p>

      <h2>Modifications</h2>
      <p>
        Cette politique peut être mise à jour pour refléter l&apos;évolution du site ou de la
        réglementation. La date de dernière mise à jour figure en haut de page.
      </p>
    </LegalLayout>
  );
}
