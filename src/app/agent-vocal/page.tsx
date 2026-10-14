/**
 * Page d'essai de l'agent vocal du site (2026-10-14), non indexée et hors plan du site.
 * Le rond en bas à droite est le composant qui ira sur toutes les pages après validation de Victor.
 */

import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { VoiceAgent } from "@/components/site/VoiceAgent";

export const metadata: Metadata = {
  title: "Agent vocal (essai) — Vtensor",
  robots: { index: false, follow: false },
  alternates: { canonical: "/agent-vocal/" },
};

export default function AgentVocalPage() {
  return (
    <>
      <Nav />
      <main className="flex flex-col flex-1">
        <section className="shell max-w-[960px] py-16 md:py-24 flex flex-col gap-5">
          <div className="kicker">Page d&apos;essai</div>
          <h1 className="h2">Agent vocal du site</h1>
          <p className="lead max-w-[640px]">
            Cliquez sur le rond en bas à droite : la conversation démarre aussitôt, votre navigateur vous demande l&apos;accès au micro.
          </p>
        </section>
      </main>
      <Footer />
      <VoiceAgent />
    </>
  );
}
