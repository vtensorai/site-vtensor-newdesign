"use client";

/**
 * SecuritySection — 4 garde-fous réellement en place (2026-09-07).
 * Sources : hébergement Hetzner DE + schéma isolé par client, whitelist runtime
 * anti-extraction (V0.18.9), sécurité pièces jointes 5 couches (V0.18.10),
 * brouillons à valider + escalade + journalisation des runs.
 */

import { motion } from "motion/react";
import { Server, ShieldCheck, FileSearch, Eye, type LucideIcon } from "lucide-react";

const mono = {
  fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
};

type Guard = { icon: LucideIcon; kicker: string; title: string; desc: string };

const GUARDS: Guard[] = [
  {
    icon: Server,
    kicker: "hébergement",
    title: "Allemagne, ISO 27001",
    desc: "Serveurs Hetzner en Allemagne. Chaque client dispose de son propre espace isolé : vos données ne croisent jamais celles d'un autre.",
  },
  {
    icon: ShieldCheck,
    kicker: "runtime",
    title: "Un agent ne lit que ce qui le concerne",
    desc: "Un agent qui répond à un email n'accède qu'aux données de son expéditeur. La restriction est appliquée par le système, pas par une consigne qu'un message malveillant pourrait contourner.",
  },
  {
    icon: FileSearch,
    kicker: "pièces jointes",
    title: "Analysées avant lecture",
    desc: "Formats autorisés uniquement, antivirus, extraction isolée. Le contenu d'un fichier est traité comme une donnée, jamais comme une instruction.",
  },
  {
    icon: Eye,
    kicker: "contrôle",
    title: "Vous gardez la main",
    desc: "Les actions sensibles sortent en brouillon à valider. Chaque action est journalisée. Un agent qui sort de son périmètre vous escalade.",
  },
];

export function SecuritySection() {
  return (
    <section className="relative py-20 md:py-28" id="securite">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4" style={mono}>
            // sécurité
          </div>
          <h2
            className="font-display font-bold text-white leading-[1.08] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
          >
            Vos données restent{" "}
            <span className="bg-gradient-to-r from-vt-violet to-vt-cyan bg-clip-text text-transparent">
              dans leur périmètre
            </span>
            .
          </h2>
          <p className="text-white/55 text-base md:text-lg max-w-2xl mx-auto">
            Quatre garde-fous, actifs sur chaque agent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GUARDS.map((g, i) => {
            const idx = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={g.kicker}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative bg-vt-bg-deep p-6 group hover:scale-[1.04] transition-transform duration-200"
                style={{ border: "1px solid rgba(139,92,246,0.24)" }}
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#8B5CF6] mb-4" style={mono}>
                  // {g.kicker}_{idx}
                </div>
                <div
                  className="inline-flex items-center justify-center w-9 h-9 mb-5"
                  style={{
                    border: "1px solid rgba(139,92,246,0.35)",
                    background: "rgba(139,92,246,0.08)",
                  }}
                >
                  <g.icon size={16} className="text-[#8B5CF6]" />
                </div>
                <h3 className="font-display font-semibold text-white text-[15px] md:text-base leading-snug mb-2.5">
                  {g.title}
                </h3>
                <p className="text-white/55 text-[13px] leading-relaxed">{g.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[13px] text-white/45">
          Hébergement chez vous ou dans le pays de votre choix :{" "}
          <a href="#tarifs" className="text-[#22D3EE] hover:text-white transition-colors underline underline-offset-4">
            offre Sur-mesure
          </a>
          .
        </p>
      </div>
    </section>
  );
}
