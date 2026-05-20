"use client";

/**
 * AppPreview — Section qui montre l'interface de l'application Vtensor
 * dans un mockup navigateur premium (style Linear / Stripe).
 *
 * La capture d'écran est passée en prop `screenshot` (chemin /public/...).
 * Si absente, affiche un placeholder propre.
 */

import { motion, useReducedMotion } from "motion/react";
import { AnimatedGridBackground } from "@/components/backgrounds/AnimatedGridBackground";

type Props = {
  /** Chemin vers la capture d'écran (default: /screenshots/app-vtensor.png si présent) */
  screenshot?: string;
  /** Grille animée interactive en arrière-plan (cohérent avec sections 2 et 3). Default true. */
  withGrid?: boolean;
};

export function AppPreview({
  screenshot = "/screenshots/app-vtensor.png",
  withGrid = true,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative bg-[#0A0A0F] text-white py-24 md:py-32 px-5 sm:px-10 overflow-hidden"
      aria-label="Aperçu de l'application Vtensor"
    >
      {/* Grille animée interactive en arrière-plan (même que sections 2/3) */}
      {withGrid && (
        <>
          <div className="absolute inset-0 z-0 pointer-events-none">
            <AnimatedGridBackground />
          </div>
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{ background: "rgba(10,10,15,0.55)" }}
            aria-hidden
          />
        </>
      )}

      {/* Glows ambient violet/cyan en arrière-plan */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full z-[2]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.18), transparent 65%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 h-[420px] w-[420px] rounded-full z-[2]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.14), transparent 65%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Header de section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#22D3EE] font-semibold mb-4">
            Application Vtensor
          </div>
          <h2
            className="font-display font-bold leading-[1.1] tracking-[-0.02em] mb-5"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
          >
            Une interface{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
              tout-en-un
            </span>{" "}
            pour piloter vos agents.
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-[60ch] mx-auto">
            Suivez leurs actions, validez les drafts en attente, ajustez leurs
            instructions, accédez à toutes leurs créations — depuis un seul
            tableau de bord.
          </p>
        </div>

        {/* Mockup navigateur */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto w-full max-w-[1200px]"
        >
          {/* Halo lumineux derrière le mockup */}
          <div
            className="pointer-events-none absolute inset-x-12 -top-8 h-32 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "linear-gradient(90deg, rgba(139,92,246,0.4), rgba(34,211,238,0.4))",
            }}
            aria-hidden
          />

          <div
            className="relative overflow-hidden rounded-2xl border border-white/10"
            style={{
              boxShadow:
                "0 60px 120px -30px rgba(139,92,246,0.25), 0 30px 60px -15px rgba(0,0,0,0.7), inset 0 1px 0 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Browser chrome — barre du haut */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#15151B] border-b border-white/8">
              {/* Dots Mac */}
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>
              {/* Barre URL */}
              <div className="flex-1 mx-3 px-3 py-1.5 rounded-md bg-[#0A0A0F] border border-white/8 text-[12px] text-white/55 font-mono truncate">
                app.vtensor.ai
              </div>
            </div>

            {/* Zone capture d'écran */}
            <div className="relative bg-[#06060A] aspect-[16/10] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screenshot}
                alt="Interface de l'application Vtensor — tableau de bord agents"
                className="w-full h-full object-cover object-top"
                draggable={false}
                onError={(e) => {
                  // Si l'image n'existe pas encore, laisse le placeholder visible
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />

              {/* Placeholder si screenshot absent (visible quand img dispatch onError) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/35 pointer-events-none">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="mb-4 opacity-60"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
                <span className="text-[12px] uppercase tracking-[0.2em] font-semibold">
                  Capture d&apos;écran à venir
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
