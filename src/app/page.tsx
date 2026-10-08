/**
 * Accueil — refonte du 2026-10-08 (validée par Victor).
 *
 * Flux : nav → hero (« Des agents IA qui [tâche] », métier, notification, équipe)
 * → une journée avec vos agents (cinq situations et ce que l'agent produit)
 * → agents → témoignages → application → comment ça marche → tarifs (composer
 * son équipe) → sécurité → FAQ → qui est derrière → appel final → pied de page.
 */

import { Agents } from "@/components/site/Agents";
import { AppPhone } from "@/components/site/AppPhone";
import { FinalCta, Founder, Security, StickyCta } from "@/components/site/Closing";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Journee } from "@/components/site/Journee";
import { Nav } from "@/components/site/Nav";
import { Pricing } from "@/components/site/Pricing";
import { Testimonials } from "@/components/site/Testimonials";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col flex-1">
        <Hero />
        <Journee />
        <Agents />
        <Testimonials />
        <AppPhone />
        <HowItWorks />
        <Pricing />
        <Security />
        <Faq />
        <Founder />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
