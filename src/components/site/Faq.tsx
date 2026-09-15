"use client";

/**
 * FAQ en accordéon : toutes les réponses repliées au chargement, une question
 * s'ouvre au clic (une seule ouverte à la fois). Les données structurées
 * FAQPage restent complètes pour les moteurs de recherche.
 */

import { useState } from "react";
import { FAQS } from "@/data/faq";
import { LAUNCH_OFFER_ACTIVE } from "@/data/slides";
import { CONTACT_EMAIL } from "@/lib/links";

const NB = " ";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="section" id="faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="kicker">FAQ</div>
          <h2 className="h2">Vos questions, nos réponses.</h2>
          <p className="p">
            Il en manque une{NB}?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline underline-offset-4 hover:text-ink transition-colors">
              Écrivez-nous
            </a>
            , on répond sous 24{NB}h.
          </p>
        </div>
        <div className="lg:col-start-6 lg:col-span-7 flex flex-col">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const panelId = `faq-a-${i}`;
            return (
              <div key={f.question} className="border-t border-rule last:border-b">
                <button
                  type="button"
                  className="qa w-full text-left cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="num pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="qa-q serif text-[21px] md:text-[24px] leading-[1.2]">{f.question}</span>
                  <span className="qa-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M5 12h14" />
                      <path d="M12 5v14" className="qa-v" />
                    </svg>
                  </span>
                </button>
                <div id={panelId} className="qa-panel" data-open={isOpen} role="region">
                  <div className="qa-panel-inner">
                    <p className="p text-[15px] pb-7">
                      {f.answer}
                      {f.offer && LAUNCH_OFFER_ACTIVE && (
                        <>
                          {" "}
                          <span className="text-offer font-medium">{f.offer}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
