"use client";

/**
 * KpiTransitionBar — Bande de 4 KPI cells dashboard-style à intercaler entre
 * Section 2 (HiddenCostB) et Section Solution Features.
 *
 * Style : reprend les codes du dashboard app.vtensor.ai — borders fines white/8,
 * labels uppercase mono cyan `[STAT.NAME]`, gros chiffre en font-display.
 *
 * Pont visuel : transition rythmée entre « voilà vos problèmes » et « voilà
 * notre solution », tout en glissant 4 arguments-clés (taille, dispo,
 * souveraineté, isolation) avant que le visiteur les lise dans la copy.
 */

import { motion } from "motion/react";

type Kpi = { label: string; value: string; accent: string };

const KPIS: Kpi[] = [
  { label: "Postes.IA", value: "7", accent: "#22D3EE" },
  { label: "Disponibilité", value: "24/7", accent: "#10B981" },
  { label: "Hébergement", value: "Souverain", accent: "#8B5CF6" },
  { label: "Isolation", value: "RLS", accent: "#F59E0B" },
];

export function KpiTransitionBar() {
  return (
    <section
      className="relative py-12 md:py-16"
      aria-label="Indicateurs clés de la solution Vtensor"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 border border-white/8">
          {KPIS.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-vt-bg-deep p-5 md:p-6 flex flex-col justify-center"
            >
              <div
                className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-3"
                style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)" }}
              >
                [{kpi.label.toUpperCase().replace(/ /g, ".")}]
              </div>
              <div
                className="font-display font-bold leading-none"
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  color: kpi.accent,
                  letterSpacing: "-0.02em",
                }}
              >
                {kpi.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
