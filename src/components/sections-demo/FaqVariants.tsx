"use client";

/**
 * FaqVariants — 5 layouts pour la section FAQ.
 *
 *  A — Accordéon classique (déjà validé dans FaqSection.tsx)
 *  B — Catégories tabbées (chips horizontales filtrent les Q)
 *  C — Split-screen sticky (sidebar Q gauche + réponse droite)
 *  D — Two-column grid (toutes les Q+R visibles, pas d'interaction)
 *  E — Chat-style (Q bubble user droite + A bubble agent gauche)
 *
 * Toutes consomment les mêmes FAQS et catégories définies dans FaqSection.tsx.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { FAQS, FAQ_CATEGORIES, type Faq, type FaqCategory } from "./FaqSection";

const monoStyle = {
  fontFamily: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
};

// ────────────────────────────────────────────────────────────────────
// Header partagé
// ────────────────────────────────────────────────────────────────────

function FaqHeader({ subtitle }: { subtitle?: string }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <div
        className="text-[11px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4"
        style={monoStyle}
      >
        // foire aux questions
      </div>
      <h2
        className="font-display font-bold text-white leading-[1.08] tracking-[-0.02em] mb-3"
        style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
      >
        Vos questions,{" "}
        <span className="bg-gradient-to-r from-vt-violet to-vt-cyan bg-clip-text text-transparent">
          nos réponses
        </span>
      </h2>
      {subtitle && (
        <p className="text-white/55 text-base md:text-lg">{subtitle}</p>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// A — Accordéon classique
// ────────────────────────────────────────────────────────────────────

function VariantA() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-[860px] mx-auto px-6 sm:px-10">
        <FaqHeader subtitle="Les 10 questions que les dirigeants nous posent le plus souvent." />
        <div className="flex flex-col">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            const idx = String(i + 1).padStart(2, "0");
            return (
              <div
                key={i}
                className="border-b"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-start gap-4 py-5 text-left group cursor-pointer"
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.22em] text-[#22D3EE] mt-1.5 flex-shrink-0"
                    style={monoStyle}
                  >
                    q_{idx}
                  </span>
                  <h3 className="flex-1 font-display font-semibold text-white text-base md:text-lg leading-snug group-hover:text-[#22D3EE] transition-colors">
                    {faq.question}
                  </h3>
                  <span className="flex-shrink-0 w-7 h-7 inline-flex items-center justify-center border border-white/15 mt-0.5 group-hover:border-[#22D3EE]/40 transition-colors">
                    {isOpen ? (
                      <Minus size={14} className="text-[#22D3EE]" />
                    ) : (
                      <Plus size={14} className="text-white/75 group-hover:text-[#22D3EE] transition-colors" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-[60px] pr-11 pb-6">
                        <p className="text-white/70 text-[15px] leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────
// B — Catégories tabbées
// ────────────────────────────────────────────────────────────────────

function VariantB() {
  const allCategories = Array.from(new Set(FAQS.map((f) => f.category).filter(Boolean))) as FaqCategory[];
  const [activeCat, setActiveCat] = useState<FaqCategory | "all">("all");

  const filtered = activeCat === "all" ? FAQS : FAQS.filter((f) => f.category === activeCat);

  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-[960px] mx-auto px-6 sm:px-10">
        <FaqHeader subtitle="Filtrez par sujet ou parcourez l'ensemble." />

        {/* Chips catégories */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          <CategoryChip
            label="Tout"
            count={FAQS.length}
            active={activeCat === "all"}
            onClick={() => setActiveCat("all")}
          />
          {allCategories.map((cat) => (
            <CategoryChip
              key={cat}
              label={FAQ_CATEGORIES[cat]}
              count={FAQS.filter((f) => f.category === cat).length}
              active={activeCat === cat}
              onClick={() => setActiveCat(cat)}
            />
          ))}
        </div>

        {/* Liste filtrée */}
        <motion.div
          key={activeCat}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {filtered.map((faq, i) => (
            <details
              key={i}
              className="group bg-vt-bg-deep p-5"
              style={{ border: "1px solid rgba(34,211,238,0.20)" }}
            >
              <summary className="flex items-center justify-between gap-3 cursor-pointer list-none">
                <h3 className="flex-1 font-display font-semibold text-white text-base leading-snug">
                  {faq.question}
                </h3>
                <Plus
                  size={14}
                  className="text-[#22D3EE] flex-shrink-0 group-open:hidden"
                />
                <Minus
                  size={14}
                  className="text-[#22D3EE] flex-shrink-0 hidden group-open:block"
                />
              </summary>
              <p className="mt-4 text-white/70 text-[14px] leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CategoryChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold transition-colors"
      style={{
        ...monoStyle,
        color: active ? "#0A0A0A" : "rgba(255,255,255,0.75)",
        background: active ? "#22D3EE" : "rgba(255,255,255,0.04)",
        border: `1px solid ${active ? "#22D3EE" : "rgba(255,255,255,0.15)"}`,
      }}
    >
      {label}
      <span
        className="px-1 py-0 text-[10px]"
        style={{
          color: active ? "#0A0A0A" : "rgba(255,255,255,0.45)",
          background: active ? "rgba(10,10,10,0.10)" : "rgba(255,255,255,0.06)",
        }}
      >
        {count}
      </span>
    </button>
  );
}

// ────────────────────────────────────────────────────────────────────
// C — Split-screen sticky (sidebar Q + réponse droite) — variant choisi pour live
// ────────────────────────────────────────────────────────────────────

export function FaqSplitSection() {
  return <VariantC />;
}

function VariantC() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = FAQS[activeIdx];
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <FaqHeader subtitle="Sélectionnez une question dans la liste à gauche." />

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
          {/* Sidebar Q */}
          <nav
            className="lg:sticky lg:top-24"
            aria-label="Liste des questions"
          >
            <div
              className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-3 px-2"
              style={monoStyle}
            >
              // 10 questions
            </div>
            <ul className="flex flex-col gap-px bg-white/8 border border-white/8">
              {FAQS.map((faq, i) => {
                const isActive = i === activeIdx;
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => setActiveIdx(i)}
                      className="w-full flex items-start gap-3 px-3 py-2.5 text-left transition-colors"
                      style={{
                        background: isActive ? "rgba(34,211,238,0.06)" : "rgba(8,8,12,1)",
                        borderLeft: `2px solid ${isActive ? "#22D3EE" : "transparent"}`,
                      }}
                    >
                      <span
                        className="text-[10px] uppercase tracking-[0.18em] mt-0.5 flex-shrink-0"
                        style={{
                          ...monoStyle,
                          color: isActive ? "#22D3EE" : "rgba(255,255,255,0.35)",
                        }}
                      >
                        q_{String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="text-[12.5px] leading-snug"
                        style={{
                          color: isActive ? "#FAFAFA" : "rgba(255,255,255,0.65)",
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {faq.question}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Réponse */}
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-vt-bg-deep p-8 md:p-10"
            style={{ border: "1px solid rgba(34,211,238,0.20)" }}
          >
            <div
              className="text-[10px] uppercase tracking-[0.22em] text-[#22D3EE] mb-4"
              style={monoStyle}
            >
              q_{String(activeIdx + 1).padStart(2, "0")}
              {active.category && (
                <span className="text-white/40 ml-3">
                  · {FAQ_CATEGORIES[active.category]}
                </span>
              )}
            </div>
            <h3
              className="font-display font-bold text-white mb-5 leading-snug"
              style={{ fontSize: "clamp(22px, 2.4vw, 30px)", letterSpacing: "-0.01em" }}
            >
              {active.question}
            </h3>
            <p className="text-white/75 text-[16px] leading-relaxed">{active.answer}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────
// D — Two-column grid (tout visible, pas d'interaction)
// ────────────────────────────────────────────────────────────────────

function VariantD() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <FaqHeader subtitle="Toutes les réponses, d'un coup d'œil." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FAQS.map((faq, i) => (
            <article
              key={i}
              className="bg-vt-bg-deep p-6"
              style={{ border: "1px solid rgba(34,211,238,0.20)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[10px] uppercase tracking-[0.22em] text-[#22D3EE]"
                  style={monoStyle}
                >
                  q_{String(i + 1).padStart(2, "0")}
                </span>
                {faq.category && (
                  <span
                    className="text-[10px] uppercase tracking-[0.14em] text-white/40"
                    style={monoStyle}
                  >
                    · {FAQ_CATEGORIES[faq.category]}
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-white text-[16px] leading-snug mb-3">
                {faq.question}
              </h3>
              <p className="text-white/65 text-[13.5px] leading-relaxed">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────
// E — Chat-style conversational
// ────────────────────────────────────────────────────────────────────

function VariantE() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-[820px] mx-auto px-6 sm:px-10">
        <FaqHeader subtitle="Comme une conversation avec votre Directeur Exécutif." />

        <div
          className="bg-vt-bg-deep p-6 md:p-8 flex flex-col gap-5"
          style={{ border: "1px solid rgba(34,211,238,0.20)" }}
        >
          {/* Browser-style header */}
          <div
            className="flex items-center gap-3 -mx-6 -mt-6 md:-mx-8 md:-mt-8 px-5 py-2.5 mb-2 border-b"
            style={{ background: "#15151B", borderColor: "rgba(34,211,238,0.15)" }}
          >
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>
            <span
              className="text-[11px] text-white/55"
              style={monoStyle}
            >
              // conversation avec le directeur exécutif
            </span>
          </div>

          {FAQS.map((faq, i) => (
            <ChatExchange key={i} faq={faq} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChatExchange({ faq, idx }: { faq: Faq; idx: number }) {
  return (
    <div className="flex flex-col gap-3">
      {/* User question — bubble right */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.3 }}
        className="flex justify-end"
      >
        <div
          className="max-w-[85%] px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <p className="text-white text-[15px] leading-snug">{faq.question}</p>
        </div>
      </motion.div>

      {/* Agent answer — bubble left with CEO badge */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="flex items-start gap-2.5"
      >
        <div
          className="inline-flex items-center justify-center font-mono font-bold leading-none flex-shrink-0 mt-0.5"
          style={{
            width: 32,
            height: 32,
            fontSize: 10,
            color: "#8B5CF6",
            background: "rgba(139,92,246,0.10)",
            border: "1px solid rgba(139,92,246,0.30)",
          }}
        >
          CEO
        </div>
        <div
          className="max-w-[85%] px-4 py-3"
          style={{
            background: "rgba(139,92,246,0.06)",
            border: "1px solid rgba(139,92,246,0.20)",
          }}
        >
          <p className="text-white/85 text-[14px] leading-relaxed">{faq.answer}</p>
          <div
            className="text-[9px] uppercase tracking-[0.14em] text-white/35 mt-2"
            style={monoStyle}
          >
            // réponse n°{String(idx + 1).padStart(2, "0")}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Showcase wrapper avec sticky switcher
// ────────────────────────────────────────────────────────────────────

export function FaqShowcase() {
  const [active, setActive] = useState<"A" | "B" | "C" | "D" | "E">("A");
  const labels: Record<typeof active, string> = {
    A: "Accordéon",
    B: "Tabbed catégories",
    C: "Split-screen sticky",
    D: "Grid 2 col",
    E: "Chat-style",
  };
  return (
    <div className="relative min-h-screen">
      <div className="sticky top-0 z-50 bg-vt-bg-deep/95 backdrop-blur-md border-b border-white/8">
        <div className="max-w-[1280px] mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto">
          <span
            className="text-[11px] uppercase tracking-[0.22em] text-white/40 mr-2 whitespace-nowrap"
            style={monoStyle}
          >
            // format :
          </span>
          {(["A", "B", "C", "D", "E"] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => setActive(dir)}
              className={[
                "text-xs px-3 py-1.5 border transition-colors font-semibold whitespace-nowrap",
                active === dir
                  ? "border-[#22D3EE]/50 bg-[#22D3EE]/10 text-[#22D3EE]"
                  : "border-white/10 bg-white/[0.02] text-white/55 hover:text-white hover:border-white/25",
              ].join(" ")}
              style={monoStyle}
            >
              {dir} · {labels[dir]}
            </button>
          ))}
        </div>
      </div>

      {active === "A" && <VariantA />}
      {active === "B" && <VariantB />}
      {active === "C" && <VariantC />}
      {active === "D" && <VariantD />}
      {active === "E" && <VariantE />}
    </div>
  );
}
