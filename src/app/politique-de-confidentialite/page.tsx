import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";
import { CONTACT_EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  alternates: { canonical: "/politique-de-confidentialite/" },
  title: "Politique de confidentialité — Vtensor",
  description:
    "Comment V TENSOR AI collecte, utilise et protège vos données personnelles : site vtensor.ai et prospection commerciale par e-mail.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalLayout
      kicker="Politique de confidentialité"
      title="Politique de confidentialité"
      updated="8 octobre 2026"
    >
      <p>
        Cette politique décrit les données personnelles collectées lorsque vous utilisez le site
        vtensor.ai, les raisons de cette collecte et vos droits, conformément au Règlement
        général sur la protection des données (RGPD) et à la loi Informatique et Libertés.
      </p>
      <p>
        Elle s&apos;applique aussi aux professionnels que nous contactons par e-mail : voir la
        section <a href="#prospection-commerciale">Prospection commerciale</a>.
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
        publicitaire.</strong> La fréquentation est mesurée avec Cloudflare Web Analytics, un
        outil sans cookie ni identifiant individuel, qui ne suit pas les visiteurs d&apos;un site
        à l&apos;autre et ne fournit que des statistiques agrégées (pages vues, pays, type
        d&apos;appareil). Aucune bannière de consentement n&apos;est donc nécessaire. Si cela
        devait évoluer, cette politique serait mise à jour avant toute mise en place.
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
        <li>
          <strong>Vous présenter nos services par e-mail</strong> si vous dirigez une entreprise
          (prospection commerciale) — intérêt légitime (art. 6.1.f RGPD). Détails dans la
          section <a href="#prospection-commerciale">Prospection commerciale</a>.
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
        <li>
          Données de prospection commerciale : voir la section{" "}
          <a href="#prospection-commerciale">Prospection commerciale</a>.
        </li>
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
        <li>
          <strong>IONOS SARL</strong> (France) — messagerie électronique, données traitées dans
          l&apos;Espace économique européen.
        </li>
        <li>
          <strong>Anthropic Ireland, Limited</strong> (Irlande) — modèle d&apos;intelligence
          artificielle qui nous aide à rédiger nos messages de prospection, avec un traitement
          possible aux États-Unis.
        </li>
        <li>
          <strong>SideGuide Technologies, Inc.</strong> (Firecrawl, États-Unis) — lecture des
          pages publiques de sites internet, pour nos recherches de prospection.
        </li>
      </ul>
      <p>
        Les transferts vers Cloudflare, Cal.com et Anthropic sont encadrés par les garanties
        prévues au chapitre V du RGPD (clauses contractuelles types de la Commission
        européenne). Nous ne vendons ni ne louons vos données.
      </p>

      <h2 id="prospection-commerciale">Prospection commerciale</h2>
      <p>
        Nous écrivons par e-mail à des dirigeants d&apos;entreprises françaises pour leur
        présenter nos services. Si vous avez reçu l&apos;un de ces messages, cette section
        vous explique d&apos;où viennent vos coordonnées, ce que nous en faisons et comment ne
        plus être contacté. Le responsable du traitement est V TENSOR AI (coordonnées
        ci-dessus).
      </p>

      <h3>Pourquoi nous vous écrivons</h3>
      <p>
        Pour vous présenter nos agents d&apos;intelligence artificielle, qui peuvent aider
        votre entreprise. Nous écrivons uniquement à des professionnels, au sujet de leur
        activité professionnelle.
      </p>
      <p>
        Base légale : notre intérêt légitime à faire connaître nos services aux entreprises
        (art. 6.1.f RGPD). Vous pouvez vous y opposer à tout moment, sans donner de motif.
      </p>

      <h3>Données utilisées</h3>
      <ul>
        <li>votre nom, votre prénom et votre fonction dans l&apos;entreprise ;</li>
        <li>
          des informations sur votre entreprise : nom, numéro SIREN, activité, effectif, site
          internet ;
        </li>
        <li>votre adresse e-mail professionnelle ;</li>
        <li>
          nos échanges : messages envoyés, vos réponses, dates et statut (envoyé, répondu,
          désinscrit).
        </li>
      </ul>

      <h3>D&apos;où viennent ces données</h3>
      <ul>
        <li>
          Le <strong>Registre national des entreprises</strong>, tenu par l&apos;INPI, et le
          répertoire <strong>Sirene</strong> de l&apos;Insee, consultés via l&apos;API publique
          «&nbsp;Recherche d&apos;entreprises&nbsp;» de l&apos;État : nom, numéro SIREN, activité
          et effectif de l&apos;entreprise, nom et fonction de ses dirigeants.
        </li>
        <li>
          Le <strong>site internet de votre entreprise</strong>, ou à défaut sa fiche dans un
          annuaire professionnel public (l&apos;annuaire des professionnels RGE de
          l&apos;ADEME, par exemple) : l&apos;adresse e-mail qui y est publiée.
        </li>
      </ul>

      <h3>Comment nous les utilisons</h3>
      <p>
        Vos données sont enregistrées dans notre application, hébergée en Allemagne. Nos
        messages sont rédigés avec l&apos;aide d&apos;un agent d&apos;intelligence artificielle, à
        partir de ces informations. Ils sont envoyés en texte brut, sans pixel de suivi ni
        lien traçant : nous ne savons pas si vous les avez ouverts.
      </p>
      <p>
        Après notre premier message, nous envoyons au plus deux relances. Elles s&apos;arrêtent
        dès que vous répondez ou que vous vous désinscrivez.
      </p>

      <h3>Qui y a accès</h3>
      <p>
        L&apos;équipe de V TENSOR AI et les prestataires suivants, qui agissent sur nos
        instructions :
      </p>
      <ul>
        <li>
          <strong>Hetzner Online GmbH</strong> (Allemagne) — hébergement de notre application
          et de sa base de données, dans l&apos;Union européenne.
        </li>
        <li>
          <strong>IONOS SARL</strong> (France) — envoi et réception des e-mails. Les données
          sont traitées dans l&apos;Espace économique européen.
        </li>
        <li>
          <strong>Anthropic Ireland, Limited</strong> (Irlande) — fournit le modèle
          d&apos;intelligence artificielle qui nous aide à rechercher les informations
          publiques sur votre entreprise et à rédiger les messages. Les données qui
          lui sont transmises peuvent être traitées hors de l&apos;Union européenne, y compris
          aux États-Unis. Ce transfert est encadré par les clauses contractuelles types de la
          Commission européenne, prévues par l&apos;accord de traitement des données
          d&apos;Anthropic. Anthropic s&apos;engage par contrat à ne pas utiliser ces données
          pour entraîner ses modèles.
        </li>
        <li>
          <strong>SideGuide Technologies, Inc.</strong> (Firecrawl, États-Unis) — lit pour nous
          les pages publiques des sites internet, dont celle où votre adresse e-mail est
          publiée. Ces pages sont traitées aux États-Unis.
        </li>
      </ul>

      <h3>Combien de temps nous les gardons</h3>
      <ul>
        <li>
          Vos données de prospection : 3 ans à compter de leur collecte ou du dernier contact
          venant de vous (une réponse à l&apos;un de nos messages, par exemple), puis elles sont
          supprimées.
        </li>
        <li>
          Notre liste d&apos;opposition : si vous vous désinscrivez, nous y inscrivons une
          empreinte de votre adresse e-mail (un code calculé à partir de l&apos;adresse par
          hachage SHA-256, qui ne la contient pas en clair). Elle sert uniquement à ne plus vous
          écrire. Nous la conservons tant que nous faisons de la prospection, et au moins 3 ans,
          comme le recommande la CNIL.
        </li>
      </ul>

      <h3>Vous opposer et exercer vos droits</h3>
      <p>
        Vous pouvez refuser nos messages à tout moment, gratuitement et sans donner de motif :
      </p>
      <ul>
        <li>en cliquant sur le lien de désinscription présent en bas de chaque message ;</li>
        <li>en répondant «&nbsp;STOP&nbsp;» à l&apos;un de nos messages ;</li>
        <li>
          en écrivant à <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </li>
      </ul>
      <p>
        Une fois votre demande prise en compte, vous ne recevez plus aucun message de notre
        part, relances comprises.
      </p>
      <p>
        Vous pouvez aussi demander l&apos;accès à vos données, leur rectification, leur
        effacement ou la limitation de leur traitement, à la même adresse. Si vous demandez
        l&apos;effacement, nous gardons seulement l&apos;empreinte de votre adresse dans la liste
        d&apos;opposition, pour ne plus vous écrire. Nous répondons dans un délai d&apos;un mois.
        Vous pouvez enfin introduire une réclamation auprès de la CNIL (
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          www.cnil.fr
        </a>
        ).
      </p>

      <h2>Sécurité</h2>
      <p>
        Le site est servi exclusivement en HTTPS. Le site et notre application sont hébergés
        sur des datacenters situés en Allemagne, certifiés ISO 27001, et l&apos;accès aux
        systèmes est restreint aux personnes habilitées.
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
