"use client";

/** Briques communes de l'aperçu V4 : étiquette d'agent, apparition au défilement, gras inline. */

import { useLayoutEffect, useRef } from "react";
import { AGENT_COLOR, agentByKey, type AgentKey } from "@/data/v4";

export function AgentTag({ k, full = false }: { k: AgentKey; full?: boolean }) {
  return (
    <span className="atag2" style={{ color: AGENT_COLOR[k] }}>
      <span className="atag2-dot" aria-hidden="true" />
      {full ? agentByKey(k).name : agentByKey(k).short}
    </span>
  );
}

/** Rend `**gras**` en <strong>. */
export function rich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="font-semibold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

/**
 * Apparition au défilement. Visible par défaut (HTML servi, sans JavaScript) ;
 * avant le premier rendu, ce qui est sous la ligne de flottaison passe en « out »
 * puis réapparaît en entrant dans l'écran.
 */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "li" }) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.dataset.reveal = "out";
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          window.setTimeout(() => (el.dataset.reveal = "in"), delay);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <Tag ref={ref} data-reveal="in" className={className}>
      {children}
    </Tag>
  );
}
