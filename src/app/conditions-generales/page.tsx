import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";
import { CONTACT_EMAIL } from "@/lib/links";

/**
 * Conditions générales de vente et d'utilisation — version publique (2026-09-08),
 * dérivée du brouillon CGU du 2026-05-02 (Output/legal), alignée sur l'offre
 * en vigueur : 100 € HT par agent et par mois ou 1 000 € HT par an, intégration
 * sur devis, mensuel sans engagement, plus d'agent maître.
 */

export const metadata: Metadata = {
  alternates: { canonical: "/conditions-generales/" },
  title: "Conditions générales — Vtensor",
  description: "Conditions générales de vente et d'utilisation des services d'agents IA de V TENSOR AI.",
};

const NB = " ";

export default function ConditionsGeneralesPage() {
  return (
    <LegalLayout kicker="Conditions générales" title="Conditions générales de vente et d'utilisation" updated="8 septembre 2026">
      <p>
        Les présentes conditions générales (les «{NB}Conditions{NB}») régissent la fourniture, par la société V TENSOR AI (le
        «{NB}Prestataire{NB}»), de ses services de conception, de mise en place et d&apos;exploitation d&apos;agents d&apos;intelligence
        artificielle (le «{NB}Service{NB}») à ses clients professionnels (le «{NB}Client{NB}»). Elles s&apos;appliquent à toute commande et
        sont complétées par le devis signé par le Client et, le cas échéant, par un accord de traitement des données.
      </p>
      <p>
        Le Service est réservé aux professionnels au sens du Code de la consommation. Toute commande emporte acceptation sans réserve des
        présentes Conditions.
      </p>

      <h2>1. Définitions</h2>
      <ul>
        <li>
          <strong>Agent</strong>{NB}: programme d&apos;intelligence artificielle conçu par le Prestataire pour le Client afin d&apos;exécuter
          un ensemble de tâches définies (service après-vente, gestion administrative et facturation, accueil téléphonique, etc.), connecté aux
          outils du Client et joignable par les canaux convenus (email, application, messagerie, téléphone).
        </li>
        <li>
          <strong>Application</strong>{NB}: l&apos;interface accessible à l&apos;adresse app.vtensor.ai permettant au Client de piloter ses
          Agents, de consulter leur activité, de valider leurs brouillons et de retrouver leurs fichiers.
        </li>
        <li>
          <strong>Devis</strong>{NB}: le document remis par le Prestataire à l&apos;issue de l&apos;audit, décrivant les Agents à mettre en
          place, les outils à connecter, les frais d&apos;intégration et le montant de l&apos;abonnement. Le Devis signé vaut commande.
        </li>
        <li>
          <strong>Données du Client</strong>{NB}: l&apos;ensemble des informations, documents, messages et contenus transmis par le Client ou
          ses outils au Service, ainsi que les contenus produits par les Agents pour le compte du Client.
        </li>
        <li>
          <strong>Brouillon</strong>{NB}: toute action préparée par un Agent et soumise à la validation du Client avant exécution (envoi
          d&apos;un email, émission d&apos;une facture, publication, etc.).
        </li>
      </ul>

      <h2>2. Objet et périmètre du Service</h2>
      <p>Le Service comprend, dans les limites fixées par le Devis{NB}:</p>
      <ul>
        <li>la conception et le développement sur mesure de chaque Agent, à partir des besoins identifiés lors de l&apos;audit{NB};</li>
        <li>la connexion des Agents aux outils du Client (messagerie, ERP, site web, téléphonie, etc.){NB};</li>
        <li>l&apos;hébergement et l&apos;exploitation des Agents, ainsi que l&apos;accès à l&apos;Application{NB};</li>
        <li>l&apos;évolution des Agents pendant toute la durée de l&apos;abonnement (nouvelles consignes, nouveaux outils, nouvelles générations de modèles){NB};</li>
        <li>un support par email, les jours ouvrés.</li>
      </ul>
      <p>Le Service ne comprend pas{NB}:</p>
      <ul>
        <li>la fourniture de conseils juridiques, comptables, fiscaux ou médicaux, même lorsqu&apos;un Agent produit des contenus dans ces domaines{NB};</li>
        <li>les abonnements aux outils tiers du Client (messagerie, ERP, téléphonie, publicité en ligne), qui restent souscrits et payés par le Client{NB};</li>
        <li>une garantie de résultat commercial ou opérationnel{NB}: les Agents assistent l&apos;entreprise du Client, ils ne se substituent pas à sa direction ni à son équipe.</li>
      </ul>

      <h2>3. Commande et mise en place</h2>
      <p>
        La relation débute par un audit gratuit d&apos;une trentaine de minutes, au cours duquel le Prestataire cartographie les outils et
        les besoins du Client. Le Prestataire remet ensuite un Devis. La commande est ferme à la signature du Devis par le Client.
      </p>
      <p>
        La mise en place comprend le développement des Agents, leur connexion aux outils du Client et une phase de validation en
        conditions réelles. Le Client valide chaque Agent avant sa mise en production. Les délais indiqués (quelques jours à deux
        semaines selon le périmètre) sont donnés à titre indicatif{NB}; ils dépendent notamment de la disponibilité des accès et des
        informations que le Client doit fournir.
      </p>
      <p>
        Le Client s&apos;engage à fournir au Prestataire les accès, identifiants, documents et informations nécessaires à la mise en place et
        au fonctionnement des Agents, et à les maintenir à jour.
      </p>

      <h2>4. Tarifs</h2>
      <ul>
        <li>
          <strong>Abonnement</strong>{NB}: 100{NB}€ hors taxes par Agent et par mois, ou 1{NB}000{NB}€ hors taxes par Agent et par an en
          règlement annuel d&apos;avance (soit deux mois offerts par rapport au règlement mensuel).
        </li>
        <li>
          <strong>Frais d&apos;intégration</strong>{NB}: facturés une seule fois, à partir de 1{NB}000{NB}€ hors taxes, selon les outils à
          connecter et les processus à modéliser. Leur montant exact figure au Devis.
        </li>
        <li>
          <strong>Sur-mesure</strong>{NB}: les besoins spécifiques (hébergement chez le Client ou dans un pays déterminé, applications
          dédiées, intégrations lourdes) font l&apos;objet d&apos;un Devis particulier.
        </li>
      </ul>
      <p>
        Les prix s&apos;entendent en euros, hors taxes{NB}; la TVA en vigueur s&apos;ajoute sur la facture. Le Prestataire peut faire évoluer
        ses tarifs{NB}: toute modification applicable à un abonnement en cours est notifiée par email au moins trente (30) jours avant
        son entrée en vigueur, et le Client peut résilier pour ce motif avant cette date. Les tarifs publiés sur le site vtensor.ai sont
        indicatifs{NB}; seul le Devis signé engage les parties.
      </p>

      <h2>5. Facturation et paiement</h2>
      <p>
        Les frais d&apos;intégration sont facturés à la signature du Devis. L&apos;abonnement mensuel est facturé d&apos;avance chaque mois{NB};
        l&apos;abonnement annuel est facturé d&apos;avance pour douze (12) mois. Les factures sont payables à réception, par virement bancaire
        ou par le moyen de paiement proposé dans l&apos;Application.
      </p>
      <p>
        Conformément aux articles L.{NB}441-10 et D.{NB}441-5 du Code de commerce, tout retard de paiement entraîne de plein droit des
        pénalités calculées au taux d&apos;intérêt appliqué par la Banque centrale européenne à son opération de refinancement la plus
        récente majoré de dix points, ainsi qu&apos;une indemnité forfaitaire de 40{NB}€ pour frais de recouvrement. En cas de facture
        impayée sept (7) jours après une mise en demeure restée sans effet, le Prestataire peut suspendre le Service jusqu&apos;à
        régularisation complète, sans que cette suspension ne dispense le Client du paiement des sommes dues.
      </p>

      <h2>6. Durée et résiliation</h2>
      <h3>6.1 Abonnement mensuel</h3>
      <p>
        L&apos;abonnement mensuel est sans engagement de durée. Il se renouvelle tacitement chaque mois. Chaque partie peut y mettre fin à
        tout moment par email, moyennant un préavis de trente (30) jours. Les sommes déjà versées restent acquises.
      </p>
      <h3>6.2 Abonnement annuel</h3>
      <p>
        L&apos;abonnement annuel est conclu pour douze (12) mois réglés d&apos;avance. Il est reconduit tacitement pour une nouvelle période
        de douze mois, sauf dénonciation par l&apos;une des parties par email au moins trente (30) jours avant l&apos;échéance. Les sommes
        versées au titre d&apos;une période annuelle en cours ne sont pas remboursables, sauf résiliation aux torts du Prestataire.
      </p>
      <h3>6.3 Résiliation pour manquement</h3>
      <p>
        En cas de manquement grave de l&apos;une des parties à ses obligations, l&apos;autre partie peut résilier le contrat de plein droit
        trente (30) jours après une mise en demeure restée sans effet, sans préjudice de dommages et intérêts. Le Prestataire peut
        résilier sans préavis en cas de violation grave des règles d&apos;usage de l&apos;article 8.
      </p>
      <h3>6.4 Effets de la fin du contrat</h3>
      <p>
        À la date d&apos;effet de la résiliation, les Agents sont arrêtés et l&apos;accès à l&apos;Application est fermé. Le Client dispose de
        trente (30) jours pour exporter ses Données depuis l&apos;Application ou en demander la remise. À l&apos;issue de ce délai, le
        Prestataire supprime les Données du Client, sous réserve des obligations légales de conservation.
      </p>

      <h2>7. Fonctionnement des Agents et responsabilité des contenus</h2>
      <p>
        Les Agents reposent sur des modèles d&apos;intelligence artificielle générative. Leurs productions peuvent comporter des erreurs,
        des approximations ou des omissions, même lorsqu&apos;elles paraissent fiables. Le Client en a connaissance et organise en
        conséquence la relecture des contenus sensibles.
      </p>
      <p>
        Les actions sensibles (envoi d&apos;un email à un client final, émission d&apos;une facture, publication, engagement contractuel)
        sont configurées pour produire un Brouillon soumis à la validation du Client. En validant un Brouillon, le Client en assume la
        responsabilité comme s&apos;il l&apos;avait lui-même rédigé et exécuté.
      </p>
      <p>
        Certaines tâches peuvent, à la demande du Client et selon les règles définies avec lui, être exécutées par un Agent sans
        validation préalable (par exemple répondre à une question courante d&apos;un client final ou envoyer une relance de paiement). Le
        Client définit ces règles, en assume la responsabilité éditoriale et peut les modifier à tout moment. Chaque action des Agents
        est journalisée dans l&apos;Application.
      </p>
      <p>
        Le Client reste seul responsable des décisions prises sur la base des contenus produits par les Agents, du respect des
        obligations qui lui incombent vis-à-vis de ses propres clients, prospects et salariés, et de l&apos;information de ceux-ci quant à
        l&apos;usage d&apos;un système d&apos;intelligence artificielle lorsque la réglementation l&apos;exige.
      </p>

      <h2>8. Règles d&apos;usage</h2>
      <p>Le Client s&apos;interdit d&apos;utiliser le Service, directement ou par l&apos;intermédiaire d&apos;un Agent, pour{NB}:</p>
      <ul>
        <li>produire, diffuser ou traiter des contenus illicites, diffamatoires, trompeurs, discriminatoires ou portant atteinte aux droits de tiers{NB};</li>
        <li>envoyer des communications non sollicitées en violation de la réglementation applicable à la prospection{NB};</li>
        <li>usurper une identité ou dissimuler la nature automatisée d&apos;un échange lorsque la loi impose de la révéler{NB};</li>
        <li>collecter ou traiter des données personnelles sans base légale, ou des données sensibles sans les garanties requises{NB};</li>
        <li>tenter de contourner les garde-fous techniques du Service, d&apos;accéder aux données d&apos;un autre client ou de perturber le fonctionnement de la plateforme{NB};</li>
        <li>tout usage prohibé par les conditions d&apos;utilisation des fournisseurs de modèles d&apos;intelligence artificielle auxquels le Prestataire a recours.</li>
      </ul>
      <p>
        En cas de manquement, le Prestataire peut, selon la gravité, avertir le Client, suspendre l&apos;Agent ou le Service concerné, ou
        résilier le contrat dans les conditions de l&apos;article 6.3.
      </p>

      <h2>9. Évolution du Service</h2>
      <p>
        Les évolutions des Agents demandées par le Client dans le périmètre du Devis (nouvelles consignes, ajustement du ton, nouvelles
        règles métier, connexion d&apos;un outil déjà pris en charge) sont comprises dans l&apos;abonnement. L&apos;ajout d&apos;un Agent ou
        d&apos;une intégration nouvelle fait l&apos;objet d&apos;un Devis complémentaire.
      </p>
      <p>
        Le Prestataire fait évoluer sa plateforme et déploie régulièrement de nouvelles générations de modèles. Ces évolutions
        n&apos;entraînent pas de réduction substantielle du périmètre souscrit. Toute évolution substantielle défavorable au Client est
        notifiée par email avec un préavis raisonnable et ouvre un droit de résiliation pour ce motif.
      </p>

      <h2>10. Disponibilité et support</h2>
      <p>
        Le Prestataire met en œuvre les moyens nécessaires pour assurer la disponibilité et le bon fonctionnement du Service, sans
        engagement de disponibilité chiffré. Les opérations de maintenance planifiée sont, dans la mesure du possible, réalisées en
        dehors des heures ouvrées et annoncées à l&apos;avance. Le Prestataire ne répond pas des indisponibilités imputables aux outils
        tiers du Client ou aux fournisseurs de modèles et d&apos;infrastructure. Le support est assuré par email, à l&apos;adresse{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, les jours ouvrés.
      </p>

      <h2>11. Données personnelles et confidentialité</h2>
      <p>
        Pour les Données du Client contenant des données personnelles, le Client est responsable du traitement et le Prestataire agit en
        qualité de sous-traitant, conformément au Règlement général sur la protection des données (RGPD). Un accord de traitement des
        données précisant les instructions, les mesures de sécurité et les sous-traitants ultérieurs est conclu sur demande et prévaut
        sur le présent article en cas de contradiction.
      </p>
      <p>
        Les Données du Client sont hébergées sur des serveurs situés en Allemagne (Hetzner Online GmbH), dans un espace isolé par
        client. Le Prestataire recourt aux sous-traitants ultérieurs suivants{NB}:
      </p>
      <ul>
        <li><strong>Hetzner Online GmbH</strong> (Allemagne){NB}: hébergement et stockage.</li>
        <li>
          <strong>Anthropic, PBC</strong> (États-Unis){NB}: fourniture des modèles d&apos;intelligence artificielle. Les contenus transmis
          pour le traitement d&apos;une demande le sont conformément à ses conditions commerciales, qui excluent leur utilisation pour
          l&apos;entraînement de ses modèles.
        </li>
        <li><strong>Cloudflare, Inc.</strong> (États-Unis){NB}: diffusion et protection des services en ligne.</li>
        <li>
          Les fournisseurs propres à certains Agents (téléphonie, voix, envoi d&apos;emails, recherche d&apos;entreprises), listés dans le
          Devis ou l&apos;accord de traitement des données.
        </li>
      </ul>
      <p>
        Les transferts de données hors de l&apos;Union européenne sont encadrés par les garanties prévues au chapitre V du RGPD. Le
        Prestataire n&apos;utilise pas les Données du Client pour entraîner des modèles et ne les communique à aucun tiers en dehors des
        sous-traitants nécessaires à l&apos;exécution du Service. Les données de navigation sur le site vtensor.ai sont décrites dans la{" "}
        <a href="/politique-de-confidentialite/">politique de confidentialité</a>.
      </p>
      <p>
        Chaque partie s&apos;engage à garder confidentielles les informations de l&apos;autre partie dont elle a connaissance à l&apos;occasion
        du contrat, pendant sa durée et cinq (5) ans après son terme.
      </p>

      <h2>12. Propriété intellectuelle</h2>
      <p>
        Le Prestataire reste titulaire de l&apos;ensemble des droits sur sa plateforme, son code, ses méthodes, ses interfaces et les
        composants génériques des Agents. Le contrat confère au Client un droit d&apos;utilisation personnel, non exclusif et non cessible
        du Service, pour ses besoins propres, pendant la durée de l&apos;abonnement.
      </p>
      <p>
        Le Client reste propriétaire de ses Données, de sa base de connaissances et des contenus produits par les Agents pour son
        compte, qu&apos;il peut utiliser librement. Le Client concède au Prestataire le droit d&apos;utiliser ses Données dans la seule
        mesure nécessaire à l&apos;exécution du Service.
      </p>

      <h2>13. Responsabilité</h2>
      <p>
        Le Prestataire est tenu d&apos;une obligation de moyens. Il ne saurait être tenu responsable des dommages indirects, tels que perte
        de chiffre d&apos;affaires, de clientèle, de données ou d&apos;image, ni des dommages résultant d&apos;un usage non conforme du
        Service, d&apos;une décision prise sur la base d&apos;un contenu produit par un Agent, d&apos;informations ou d&apos;accès erronés ou
        incomplets fournis par le Client, ou de la défaillance d&apos;un outil ou d&apos;un fournisseur tiers.
      </p>
      <p>
        Sous réserve des dispositions impératives de la loi, la responsabilité totale du Prestataire au titre du contrat, toutes causes
        confondues, est limitée au montant des sommes effectivement versées par le Client au cours des douze (12) mois précédant le fait
        générateur. Toute action à l&apos;encontre du Prestataire doit être engagée dans un délai d&apos;un (1) an à compter du fait
        générateur.
      </p>

      <h2>14. Suspension</h2>
      <p>
        Le Prestataire peut suspendre tout ou partie du Service, après en avoir informé le Client lorsque les circonstances le
        permettent, en cas d&apos;impayé dans les conditions de l&apos;article 5, de violation des règles d&apos;usage de l&apos;article 8, ou de
        risque avéré pour la sécurité de la plateforme ou des données. La suspension prend fin dès que sa cause a disparu.
      </p>

      <h2>15. Dispositions diverses</h2>
      <ul>
        <li>
          <strong>Force majeure</strong>{NB}: aucune partie ne peut être tenue responsable d&apos;un manquement dû à un événement de force
          majeure au sens de l&apos;article 1218 du Code civil.
        </li>
        <li>
          <strong>Modification des Conditions</strong>{NB}: le Prestataire peut modifier les présentes Conditions. Toute modification est
          notifiée par email au moins trente (30) jours avant son entrée en vigueur{NB}; à défaut d&apos;opposition écrite avant cette
          date, elle est réputée acceptée. En cas d&apos;opposition, le Client peut résilier sans pénalité à la date d&apos;entrée en vigueur.
        </li>
        <li>
          <strong>Cession</strong>{NB}: le contrat ne peut être cédé par le Client sans l&apos;accord écrit du Prestataire. Le Prestataire
          peut le céder à toute société qui lui succéderait dans l&apos;exploitation du Service, en le notifiant au Client.
        </li>
        <li>
          <strong>Intégralité</strong>{NB}: le Devis, les présentes Conditions et, le cas échéant, l&apos;accord de traitement des données
          constituent l&apos;intégralité de l&apos;accord des parties. En cas de contradiction, le Devis prévaut sur les Conditions.
        </li>
        <li>
          <strong>Divisibilité</strong>{NB}: la nullité d&apos;une clause n&apos;affecte pas la validité des autres. Le fait de ne pas se
          prévaloir d&apos;une clause ne vaut pas renonciation à s&apos;en prévaloir ultérieurement.
        </li>
      </ul>

      <h2>16. Droit applicable et litiges</h2>
      <p>
        Les présentes Conditions sont soumises au droit français. En cas de différend, les parties recherchent d&apos;abord une solution
        amiable. À défaut d&apos;accord dans un délai de trente (30) jours, le litige est porté devant le Tribunal de commerce de
        Versailles, nonobstant pluralité de défendeurs ou appel en garantie.
      </p>

      <h2>Éditeur</h2>
      <p>
        V TENSOR AI, société par actions simplifiée au capital de 2{NB}000{NB}€, 15 rue de la Motte, 78720 Saint-Forget, France, RCS
        Versailles 929{NB}701{NB}217, représentée par Victor Arnoul, Président. Contact{NB}:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Voir aussi les{" "}
        <a href="/mentions-legales/">mentions légales</a>.
      </p>
    </LegalLayout>
  );
}
