"use client";

/**
 * HowItWorks — « Comment ça marche » en 4 étapes (2026-09-07).
 * Même code visuel que les piliers : cards bordées cyan, kicker mono `// étape_NN`.
 * Les durées reprennent celles annoncées dans la FAQ (aucune promesse nouvelle).
 */

import { motion } from "motion/react";

const mono = {
  fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
};

type Step = { num: string; title: string; when: string; desc: string };

const STEPS: Step[] = [
  {
    num: "01",
    title: "Audit gratuit",
    when: "30 min, en visio",
    desc: "On cartographie vos outils et les tâches qui vous coûtent le plus de temps.",
  },
  {
    num: "02",
    title: "Proposition",
    when: "après l'audit",
    desc: "Les postes à créer, ce que chaque agent fera concrètement, et le devis d'intégration.",
  },
  {
    num: "03",
    title: "Mise en place",
    when: "quelques jours à 2 semaines",
    desc: "On connecte vos outils, on développe chaque agent, et vous le validez en conditions réelles avant la mise en production.",
  },
  {
    num: "04",
    title: "En production",
    when: "en continu",
    desc: "Vous parlez à chaque agent par email, depuis l'application, WhatsApp ou téléphone. Les évolutions sont incluses.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 md:py-28" id="comment-ca-marche">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4" style={mono}>
            // comment ça marche
          </div>
          <h2
            className="font-display font-bold text-white leading-[1.08] tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
          >
            De l&apos;audit à la production,{" "}
            <span className="bg-gradient-to-r from-vt-violet to-vt-cyan bg-clip-text text-transparent">
              en quatre étapes
            </span>
            .
          </h2>
        </div>

        <div className="relative">
          {/* Ligne de liaison (desktop) */}
          <div
            className="hidden lg:block absolute left-0 right-0 h-px"
            style={{ top: 44, background: "rgba(34,211,238,0.18)" }}
            aria-hidden
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative bg-vt-bg-deep p-6 group hover:scale-[1.04] transition-transform duration-200"
                style={{ border: "1px solid rgba(34,211,238,0.20)" }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 font-bold text-[#22D3EE]"
                    style={{
                      ...mono,
                      fontSize: 13,
                      border: "1px solid rgba(34,211,238,0.3)",
                      background: "rgba(34,211,238,0.06)",
                    }}
                  >
                    {s.num}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-[0.16em] text-white/45"
                    style={mono}
                  >
                    {s.when}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-white text-[15px] md:text-base leading-snug mb-2.5">
                  {s.title}
                </h3>
                <p className="text-white/55 text-[13px] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
