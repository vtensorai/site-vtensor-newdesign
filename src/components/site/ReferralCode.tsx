"use client";

/**
 * Ligne « code parrain » sous le bouton S'abonner (Tarifs, 2026-10-20).
 * Code mémorisé : « Code parrain CODE (Parrain) » et ✕ pour le retirer. Sinon : « J'ai un code parrain »
 * ouvre un champ ; le code est vérifié auprès de l'API puis mémorisé (lib/referral.ts). La commande
 * envoie le code mémorisé (Pricing.tsx, subscribe()).
 */

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { clearReferral, saveReferral, useStoredReferral, validateReferral } from "@/lib/referral";

const NB = " ";

type Message = { kind: "ok" | "error"; text: string } | null;

export function ReferralCode() {
  const id = useId();
  const ref = useStoredReferral();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState<Message>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  /** Où remettre le focus après un changement d'état (le bouton qui avait le focus disparaît). */
  const focusNext = useRef<"input" | "toggle" | "line" | null>(null);

  useEffect(() => {
    const target = focusNext.current;
    focusNext.current = null;
    if (target === "input") inputRef.current?.focus();
    else if (target === "toggle") toggleRef.current?.focus();
    else if (target === "line") lineRef.current?.focus();
  }, [open, ref]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (checking) return;
    if (!value.trim()) {
      setMessage({ kind: "error", text: "Saisissez le code que votre parrain vous a transmis." });
      inputRef.current?.focus();
      return;
    }
    setChecking(true);
    setMessage(null);
    const check = await validateReferral(value);
    setChecking(false);
    if (check.status === "valid") {
      focusNext.current = "line";
      saveReferral({ code: check.code, parrain: check.parrain });
      setOpen(false);
      setValue("");
      setMessage({ kind: "ok", text: `Code parrain ${check.code} enregistré.` });
      return;
    }
    setMessage({
      kind: "error",
      text:
        check.status === "unknown"
          ? "Nous ne trouvons pas ce code. Vérifiez-le auprès de la personne qui vous l'a transmis."
          : `Vérification impossible pour le moment. Réessayez dans un instant${NB}; votre commande reste possible sans le code.`,
    });
    inputRef.current?.focus();
  }

  function remove() {
    focusNext.current = "toggle";
    clearReferral();
    setMessage({ kind: "ok", text: "Code parrain retiré." });
  }

  return (
    <div className="flex flex-col items-center gap-2 text-[13px]">
      {ref ? (
        <div ref={lineRef} tabIndex={-1} className="inline-flex items-center gap-1.5 text-muted outline-none">
          <span>
            Code parrain <span className="mono text-ink">{ref.code}</span> ({ref.parrain})
          </span>
          <button
            type="button"
            onClick={remove}
            aria-label={`Retirer le code parrain ${ref.code}`}
            className="w-7 h-7 inline-flex items-center justify-center text-muted hover:text-ink hover:bg-alt transition-colors cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={`${id}-form`}
            onClick={() => {
              focusNext.current = open ? null : "input";
              setOpen((o) => !o);
              setMessage(null);
            }}
            className="text-muted underline underline-offset-4 decoration-rule hover:text-ink hover:decoration-ink transition-colors cursor-pointer"
          >
            J&apos;ai un code parrain
          </button>
          {open && (
            <form id={`${id}-form`} onSubmit={submit} noValidate className="w-full flex flex-col gap-1.5 text-left">
              <label htmlFor={`${id}-input`} className="text-[12.5px] text-muted">
                Code parrain
              </label>
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  id={`${id}-input`}
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  maxLength={64}
                  aria-invalid={message?.kind === "error" || undefined}
                  aria-describedby={`${id}-msg`}
                  className="flex-1 min-w-0 px-3 py-2.5 border border-rule bg-paper mono text-[14px] uppercase text-ink placeholder:normal-case placeholder:font-sans placeholder:text-faint hover:border-ink transition-colors"
                  placeholder="Ex. : ABCD-123"
                />
                <button type="submit" disabled={checking} className="btn btn-sm">
                  {checking ? "Vérification…" : "Valider"}
                </button>
              </div>
            </form>
          )}
        </>
      )}
      {/* Erreurs affichées ; confirmations (code enregistré ou retiré) seulement annoncées, la ligne elle-même change. */}
      <p id={`${id}-msg`} aria-live="polite" className={`m-0 text-center text-[12.5px] text-offer ${message?.kind === "error" ? "" : "sr-only"}`}>
        {message?.text ?? ""}
      </p>
    </div>
  );
}
