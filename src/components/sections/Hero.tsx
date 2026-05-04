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
import { VideoBackground } from "@/components/backgrounds/VideoBackground";
import { WordSwitcherTagline } from "@/components/WordSwitcherTagline";

const ROTATION_ITEMS = [
  "de votre temps",
  "de votre business",
  "de votre quotidien",
];

const NAV_LINKS = [
  { label: "Tarifs", href: "#tarifs" },
  { label: "Agents", href: "#agents" },
  { label: "Process", href: "#process" },
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

  // Verrouille le scroll du body quand le drawer mobile est ouvert
  useEffect(() => {
    if (menuOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [menuOpen]);

  // Détecte le scroll pour activer le fond blur de la nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0A0F] flex flex-col">
      {/* Video background — Seedance 15s, puis 2ème vidéo 12s à la suite, puis freeze sur la dernière frame */}
      <div className="absolute inset-0 z-0">
        <VideoBackground
          src="/videos/city-dawn-seedance-15s.mp4"
          loopSrc="/videos/city-dawn-loop-seamless.mp4"
          loopMode="pause"
          overlayOpacity={0.5}
        />
      </div>

      {/* Top radial gradient violet */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 h-[600px] z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 92, 246, 0.15), transparent 70%)",
        }}
      />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A0A0F] to-transparent z-10" />

      {/* Nav fixed — reste ancrée au top pendant tout le scroll */}
      <nav
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-20 py-4 md:py-5 flex items-center justify-between">
        <a href="/" className="inline-flex items-center" aria-label="Vtensor">
          <Image
            src="/logos/vtensor-wordmark-white.svg"
            alt="Vtensor"
            width={112}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href="https://app.vtensor.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-sm text-white/90 hover:bg-white/[0.05] transition-colors"
          >
            Accéder à l&apos;app
            <ArrowRight size={14} weight="bold" />
          </a>
          <a
            href="https://cal.com/vtensor/audi-30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-sm text-white/90 hover:bg-white/[0.05] transition-colors"
          >
            Audit gratuit
            <ArrowRight size={14} weight="bold" />
          </a>
          <button
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/15 text-white/90 hover:bg-white/[0.05] transition-colors"
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
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            {/* Panel */}
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative w-full bg-[#0A0A0F] border-b border-white/10 px-5 pt-5 pb-8"
            >
              <div className="flex items-center justify-between mb-8">
                <Image
                  src="/logos/vtensor-wordmark-white.svg"
                  alt="Vtensor"
                  width={112}
                  height={28}
                  className="h-7 w-auto"
                />
                <button
                  type="button"
                  aria-label="Fermer le menu"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/15 text-white/90"
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
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="https://cal.com/vtensor/audi-30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-semibold text-sm shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)]"
                style={{
                  background:
                    "linear-gradient(90deg, #8B5CF6 0%, #22D3EE 100%)",
                }}
              >
                Audit gratuit · 30 min
                <ArrowRight size={16} weight="bold" />
              </a>
              <a
                href="https://app.vtensor.ai"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white/90 font-semibold text-sm hover:bg-white/[0.05] transition-colors"
              >
                Accéder à l&apos;app
                <ArrowRight size={16} weight="bold" />
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
          {/* Kicker */}
          <motion.div variants={itemVariants} className="mb-5 md:mb-6 px-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-white/50 font-medium">
              L&apos;agence qui automatise votre entreprise
            </span>
          </motion.div>

          {/* H1 — Word Switcher rotation */}
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

          {/* CTAs */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-10 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              <a
                href="https://cal.com/vtensor/audi-30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-white font-semibold text-sm shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_50px_-5px_rgba(34,211,238,0.7)] transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(90deg, #8B5CF6 0%, #22D3EE 100%)",
                }}
              >
                Audit gratuit · 30 min
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform group-hover/cta:translate-x-0.5"
                />
              </a>
              <a
                href="#tarifs"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 sm:px-7 py-3 rounded-full border border-white/15 text-white/90 font-semibold text-sm hover:bg-white/[0.05] hover:scale-[1.03] active:scale-[0.98] transition-all"
              >
                Voir les tarifs
              </a>
            </div>
          </motion.div>

          {/* Réassurance line */}
          <motion.div variants={itemVariants} className="mb-10 sm:mb-14 md:mb-16">
            <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-[11px] sm:text-xs text-white/50">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle
                  size={14}
                  weight="fill"
                  className="text-[#22D3EE]"
                />
                Données sécurisées en Europe
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle
                  size={14}
                  weight="fill"
                  className="text-[#22D3EE]"
                />
                Sans engagement de durée
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle
                  size={14}
                  weight="fill"
                  className="text-[#22D3EE]"
                />
                Réponse sous 24 h
              </span>
            </div>
          </motion.div>

          {/* Ticker */}
          <motion.div variants={itemVariants} className="w-full">
            <div className="w-full max-w-[1100px] mx-auto">
              <p className="text-center text-[11px] uppercase tracking-[0.18em] text-white/40 mb-6">
                Compatible avec vos outils du quotidien
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
