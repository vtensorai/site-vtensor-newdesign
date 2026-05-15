"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CheckCircle,
  ArrowRight,
  List,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { Marquee } from "@/components/ui/marquee";
import { WordSwitcherTagline } from "@/components/WordSwitcherTagline";

/**
 * Hero — V0.18.0 (Victor 2026-05-05) : refonte au design system dev/tech.
 *
 * Changements vs ancienne version :
 * - VideoBackground retiré → grid+glow body (du design system) suffit, plus
 *   épuré et cohérent avec l'app.
 * - Logo wordmark remplacé par le logo officiel V0.18.0 ([v]tensor JetBrains
 *   Mono italique).
 * - Kicker en mono `// l'agence...` au lieu d'uppercase letterspaced standard.
 * - CTAs : bordures carrées (pas rounded-full), accents mono uppercase pour
 *   le primaire, sans-serif pour le secondaire.
 * - Réassurances en pills mono `[done]` style.
 * - Ticker garde le marquee mais avec un kicker mono unifié.
 *
 * Le contenu (copy, URLs, structure) est intégralement préservé.
 */

const ROTATION_ITEMS = [
  "de votre temps",
  "de votre business",
  "de votre quotidien",
];

// Ordre cohérent avec l'ordre d'apparition sur la home
const NAV_LINKS = [
  { label: "Agents", href: "#agents" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
];

const INTEGRATIONS = [
  { name: "Odoo", slug: "odoo" },
  { name: "HubSpot", slug: "hubspot" },
  { name: "Sage", slug: "sage" },
  { name: "Microsoft", slug: "microsoft" },
  { name: "Google", slug: "google" },
  { name: "Notion", slug: "notion" },
  { name: "Slack", slug: "slack" },
  { name: "Zapier", slug: "zapier" },
  { name: "Stripe", slug: "stripe" },
  { name: "Make", slug: "make" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const headlineLineVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  }),
};

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">
      {/* V0.18.0 — pas de VideoBackground : le grid+glow body (du design system
          dev/tech) fournit l'ambiance. Plus épuré, plus cohérent avec l'app. */}

      {/* Top scanline gradient — signature Vtensor */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px z-[2]"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-violet, #8B5CF6), var(--color-cyan, #22D3EE), transparent)",
          opacity: 0.6,
        }}
      />

      {/* V0.18.0 : pas de bottom fade — le body grid+glow doit rester continu
          entre les sections (sinon bande opaque visible en jonction Hero/section 2) */}

      {/* Nav fixed */}
      <nav
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-20 py-4 md:py-5 grid md:grid-cols-[1fr_auto_1fr] grid-cols-[1fr_auto] items-center gap-6">
          <a href="/" className="inline-flex items-center" aria-label="Vtensor">
            <Image
              src="/logos/vtensor.svg"
              alt="Vtensor"
              width={140}
              height={36}
              priority
              className="h-9 w-auto"
            />
          </a>
          <ul className="hidden md:flex items-center gap-7 justify-self-center">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/65 hover:text-[#22D3EE] transition-colors"
                  style={{ fontFamily: "var(--font-mono, 'JetBrains Mono')" }}
                >
                  // {link.label.toLowerCase()}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 justify-self-end">
            <a
              href="https://app.vtensor.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider text-white/90 hover:bg-white/[0.05] transition-colors"
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono')",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.15)",
                letterSpacing: "0.05em",
              }}
            >
              accéder à l&apos;app
              <ArrowRight size={12} weight="bold" />
            </a>
            <a
              href="https://cal.com/vtensor/audi-30min"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider text-white hover:opacity-90 transition-all"
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono')",
                fontWeight: 700,
                background: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
                letterSpacing: "0.05em",
                boxShadow: "0 0 16px rgba(139,92,246,0.35)",
              }}
            >
              audit gratuit
              <ArrowRight size={12} weight="bold" />
            </a>
            <button
              type="button"
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="md:hidden inline-flex items-center justify-center h-10 w-10 text-white/90 hover:bg-white/[0.05] transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <List size={20} weight="bold" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative w-full bg-[#0A0A0F] border-b border-white/10 px-5 pt-5 pb-8"
            >
              <div className="flex items-center justify-between mb-8">
                <Image
                  src="/logos/vtensor.svg"
                  alt="Vtensor"
                  width={120}
                  height={30}
                  className="h-7 w-auto"
                />
                <button
                  type="button"
                  aria-label="Fermer le menu"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center h-10 w-10 text-white/90"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <X size={20} weight="bold" />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 text-lg text-white/85 hover:text-white transition-colors border-b border-white/5"
                      style={{ fontFamily: "var(--font-mono, 'JetBrains Mono')" }}
                    >
                      {link.label.toLowerCase()}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="https://cal.com/vtensor/audi-30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-white text-sm uppercase tracking-wider"
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono')",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
                  letterSpacing: "0.05em",
                  boxShadow: "0 0 24px rgba(139,92,246,0.4)",
                }}
              >
                audit gratuit · 30 min
                <ArrowRight size={14} weight="bold" />
              </a>
              <a
                href="https://app.vtensor.ai"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-white/90 text-sm uppercase tracking-wider hover:bg-white/[0.05] transition-colors"
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono')",
                  fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.15)",
                  letterSpacing: "0.05em",
                }}
              >
                accéder à l&apos;app
                <ArrowRight size={14} weight="bold" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full px-5 sm:px-10 py-10 sm:py-14 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center w-full max-w-full"
        >
          {/* Logo wordmark grand — V0.18.0 signature */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8 flex justify-center">
            <Image
              src="/logos/vtensor.svg"
              alt="Vtensor"
              width={200}
              height={80}
              priority
              className="h-[64px] sm:h-[80px] md:h-[96px] lg:h-[112px] w-auto select-none drop-shadow-[0_0_40px_rgba(139,92,246,0.25)]"
              draggable={false}
            />
          </motion.div>

          {/* Kicker — V0.18.0 : style mono signature // xxx */}
          <motion.div variants={itemVariants} className="mb-5 md:mb-6 px-2">
            <span
              className="text-[10.5px] sm:text-xs"
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono')",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              // l&apos;agence qui automatise votre entreprise
            </span>
          </motion.div>

          {/* H1 — Inter big, garde le WordSwitcher */}
          <div className="mb-5 md:mb-6 w-full">
            <h1 className="font-display font-bold mx-auto w-full max-w-[20ch] text-[clamp(36px,8vw,96px)] leading-[1.05] tracking-[-0.02em] flex flex-col items-center gap-2 sm:gap-3">
              <motion.span
                custom={0.1}
                variants={headlineLineVariants}
                initial="hidden"
                animate="show"
                className="block text-white"
                style={{ fontWeight: 700 }}
              >
                Reprenez le contrôle
              </motion.span>
              <motion.span
                custom={0.2}
                variants={headlineLineVariants}
                initial="hidden"
                animate="show"
                className="block w-full"
              >
                <WordSwitcherTagline items={ROTATION_ITEMS} intervalMs={5000} />
              </motion.span>
            </h1>
          </div>

          {/* Sub */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-10 w-full">
            <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-[60ch] mx-auto leading-relaxed px-2">
              Des assistants intelligents qui gèrent vos opérations à votre
              place. Vous récupérez vos heures perdues pour vous concentrer sur
              l&apos;essentiel.
            </p>
          </motion.div>

          {/* CTAs — bordures carrées, mono uppercase */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-10 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              <a
                href="https://cal.com/vtensor/audi-30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta inline-flex w-full sm:w-auto justify-center items-center gap-2 px-7 py-3.5 text-white text-sm transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono')",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  boxShadow: "0 0 40px -10px rgba(34,211,238,0.5)",
                }}
              >
                audit gratuit · 30 min
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="transition-transform group-hover/cta:translate-x-0.5"
                />
              </a>
              <a
                href="#tarifs"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-7 py-3.5 text-white/90 text-sm hover:bg-white/[0.05] hover:scale-[1.03] active:scale-[0.98] transition-all"
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono')",
                  fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.15)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                voir les tarifs
              </a>
            </div>
          </motion.div>

          {/* Réassurances — pills carrées mono [check] style */}
          <motion.div
            variants={itemVariants}
            className="mb-10 sm:mb-14 md:mb-16"
          >
            <div className="flex flex-wrap justify-center items-center gap-2">
              {[
                "Données sécurisées en Europe",
                "Sans engagement de durée",
                "Réponse sous 24 h",
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10.5px] sm:text-[11px]"
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono')",
                    color: "rgba(255,255,255,0.7)",
                    background: "rgba(34,211,238,0.06)",
                    border: "1px solid rgba(34,211,238,0.2)",
                    letterSpacing: "0.02em",
                  }}
                >
                  <CheckCircle
                    size={11}
                    weight="fill"
                    className="text-[#22D3EE]"
                  />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Ticker intégrations — kicker mono unifié */}
          <motion.div variants={itemVariants} className="w-full">
            <div className="w-full max-w-[1100px] mx-auto">
              <p
                className="text-center text-[10.5px] mb-6"
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono')",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                // compatible avec vos outils du quotidien
              </p>
              <div
                className="relative"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent 0, black 96px, black calc(100% - 96px), transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0, black 96px, black calc(100% - 96px), transparent 100%)",
                }}
              >
                <Marquee className="[--duration:50s]" pauseOnHover>
                  {INTEGRATIONS.map((logo) => (
                    <div
                      key={logo.slug}
                      className="flex items-center justify-center mx-6 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                      title={logo.name}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://api.iconify.design/simple-icons/${logo.slug}.svg?color=white`}
                        alt={logo.name}
                        width={28}
                        height={28}
                        className="h-7 w-auto"
                      />
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
