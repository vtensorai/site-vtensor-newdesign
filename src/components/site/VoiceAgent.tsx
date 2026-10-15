"use client";

/**
 * Agent vocal du site (2026-10-14, demande de Victor) : un rond en bas à droite de toutes les pages,
 * « Essayez notre agent standardiste » (2026-10-15) ; au clic, le visiteur parle à l'agent dans son navigateur.
 *
 * Chaîne : Cloudflare Turnstile (invisible) → SDK Retell `RetellClient` dont le `fetch` envoie la
 * création d'appel à notre API (`/api/public/voice`, qui garde la clé, vérifie Turnstile et
 * applique les limites) → audio direct navigateur ↔ Retell. Le SDK et Turnstile ne sont chargés qu'au
 * premier clic. Le rond s'anime avec le niveau de la voix de l'agent (snapshots `onAudio`).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { API_URL, AUDIT_URL } from "@/lib/links";

const TURNSTILE_SITEKEY = "0x4AAAAAAFWxZq7b6SVbkgSU";
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const NB = " ";
const UNAVAILABLE = "Le service est momentanément indisponible. Réessayez dans un instant.";

type Phase = "idle" | "checking" | "connecting" | "live" | "ended" | "error";

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
type WebCall = { end: () => Promise<void>; mute: () => void; unmute: () => void };

declare global {
  interface Window {
    turnstile?: Turnstile;
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}

function loadTurnstile(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = TURNSTILE_SRC;
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error(UNAVAILABLE)));
    s.onerror = () => reject(new Error(UNAVAILABLE));
    document.head.appendChild(s);
  });
}

/** Jeton Turnstile à usage unique (widget invisible, rendu puis retiré à chaque conversation). */
async function turnstileToken(host: HTMLElement): Promise<string> {
  const ts = await loadTurnstile();
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("La vérification a pris trop de temps. Réessayez.")), 20000);
    const id = ts.render(host, {
      sitekey: TURNSTILE_SITEKEY,
      action: "voice-agent",
      callback: (token: string) => {
        window.clearTimeout(timer);
        resolve(token);
        window.setTimeout(() => ts.remove(id), 0);
      },
      "error-callback": () => {
        window.clearTimeout(timer);
        reject(new Error(UNAVAILABLE));
        window.setTimeout(() => ts.remove(id), 0);
      },
    });
  });
}

function track(event: string) {
  try {
    window.umami?.track(event);
  } catch {
    /* mesure d'audience facultative */
  }
}

const STATUS: Record<Phase, string> = {
  idle: "",
  checking: "Préparation…",
  connecting: "Connexion…",
  live: "Je vous écoute",
  ended: "Conversation terminée",
  error: "",
};

export function VoiceAgent() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [muted, setMuted] = useState(false);
  const [level, setLevel] = useState(0);
  // Mobile : l'étiquette s'affiche 8 secondes puis seul le rond reste (il ne masque pas le contenu).
  const [hint, setHint] = useState(true);
  const callRef = useRef<WebCall | null>(null);
  const turnstileHost = useRef<HTMLDivElement>(null);
  const smooth = useRef(0);

  const busy = phase === "checking" || phase === "connecting" || phase === "live";

  const start = useCallback(async () => {
    if (busy) return;
    setError("");
    setMuted(false);
    setPhase("checking");
    track("Agent vocal : démarrage");
    try {
      const token = await turnstileToken(turnstileHost.current!);
      setPhase("connecting");
      const { RetellClient } = await import("retell-client-js-sdk");
      const client = new RetellClient({
        key: "site",
        // Les requêtes de contrôle (création d'appel) passent par notre API, avec le jeton Turnstile.
        // Pas de `baseURL` : le SDK en dérive aussi l'adresse de la passerelle audio, qui doit rester
        // celle de Retell (api.retellai.com/webrtc-proxy/…, authentifiée par le jeton d'accès de l'appel).
        fetch: (url, init) => {
          const headers = new Headers(init?.headers);
          headers.set("X-Turnstile-Token", token);
          return fetch(`${API_URL}/api/public/voice${new URL(String(url)).pathname}`, { ...init, headers });
        },
      });
      const call = client.createWebCall({
        agent_id: "site",
        audio: { emitRawAudioSamples: true },
        hooks: {
          onStatus: (s: string) => {
            if (s === "live") setPhase("live");
          },
          onAudio: (samples: Float32Array) => {
            let sum = 0;
            for (let i = 0; i < samples.length; i++) sum += samples[i] * samples[i];
            const rms = Math.sqrt(sum / Math.max(1, samples.length));
            smooth.current = smooth.current * 0.7 + Math.min(1, rms * 4) * 0.3;
            setLevel(smooth.current);
          },
          onEnd: () => {
            callRef.current = null;
            smooth.current = 0;
            setLevel(0);
            setPhase((p) => (p === "error" ? p : "ended"));
          },
          onError: (err: Error) => {
            const msg = err?.message || "";
            setError(
              /permission|notallowed|denied/i.test(msg)
                ? `Le micro est bloqué. Autorisez-le dans votre navigateur, puis réessayez.`
                : msg && !/^\d{3}\b/.test(msg)
                  ? msg
                  : "La conversation n'a pas pu démarrer. Réessayez dans un instant.",
            );
            setPhase("error");
          },
        },
      }) as unknown as WebCall;
      callRef.current = call;
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "La conversation n'a pas pu démarrer.");
      setPhase("error");
    }
  }, [busy]);

  const hangUp = useCallback(async () => {
    track("Agent vocal : raccroché");
    try {
      await callRef.current?.end();
    } catch {
      /* déjà terminé */
    }
    callRef.current = null;
    setPhase("ended");
    setLevel(0);
  }, []);

  const toggleMute = useCallback(() => {
    const call = callRef.current;
    if (!call) return;
    if (muted) call.unmute();
    else call.mute();
    setMuted(!muted);
  }, [muted]);

  // Fermer le panneau raccroche ; quitter la page aussi.
  const close = useCallback(() => {
    if (busy) void hangUp();
    setOpen(false);
    setPhase("idle");
    setError("");
  }, [busy, hangUp]);

  useEffect(() => () => void callRef.current?.end().catch(() => {}), []);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 639px)").matches) return;
    const t = window.setTimeout(() => setHint(false), 8000);
    return () => window.clearTimeout(t);
  }, []);

  const scale = 1 + level * 0.18;

  return (
    <div className="voice-agent fixed z-40 right-4 bottom-4 sm:right-6 sm:bottom-6 flex flex-col items-end gap-3">
      <div ref={turnstileHost} className="hidden" aria-hidden="true" />

      {open && (
        <section
          role="dialog"
          aria-label="Démonstration de l'agent standardiste de Vtensor"
          className="box w-[calc(100vw-32px)] max-w-[340px] p-5 flex flex-col gap-5"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <header className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">Démonstration</span>
              <span className="text-[16px] font-medium text-ink">Essayez notre agent standardiste</span>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Fermer"
              className="w-8 h-8 -mr-2 -mt-1 flex items-center justify-center text-muted hover:text-ink hover:bg-alt transition-colors cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </header>

          <div className="flex flex-col items-center gap-4 py-2">
            <div className="relative w-[112px] h-[112px] flex items-center justify-center">
              {phase === "live" && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-accent voice-ring"
                  style={{ opacity: 0.25 + level * 0.6, transform: `scale(${1 + level * 0.32})` }}
                />
              )}
              <span
                aria-hidden="true"
                className={`w-[88px] h-[88px] rounded-full bg-accent voice-disc ${phase === "connecting" || phase === "checking" ? "voice-wait" : ""}`}
                style={{ transform: `scale(${scale})`, opacity: phase === "ended" || phase === "error" ? 0.35 : 1 }}
              />
            </div>
            <p className="text-[14px] text-muted min-h-[20px] text-center" aria-live="polite">
              {phase === "live" && muted ? "Micro coupé" : STATUS[phase]}
            </p>
            {error && <p className="text-[14px] text-offer text-center" role="alert">{error}</p>}
          </div>

          <div className="flex gap-3">
            {busy ? (
              <>
                <button type="button" onClick={toggleMute} disabled={phase !== "live"} className="btn-ghost flex-1 justify-center">
                  {muted ? "Réactiver le micro" : "Couper le micro"}
                </button>
                <button type="button" onClick={hangUp} className="btn btn-sm flex-1">
                  Raccrocher
                </button>
              </>
            ) : (
              <button type="button" onClick={start} className="btn btn-sm flex-1" data-umami-event="Agent vocal : parler">
                {phase === "ended" || phase === "error" ? "Reparler à l'agent" : "Commencer la conversation"}
              </button>
            )}
          </div>

          {(phase === "ended" || phase === "error") && (
            <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" className="text-[14px] text-accent underline underline-offset-4 hover:text-ink transition-colors text-center" data-umami-event="Réserver un échange" data-umami-event-emplacement="agent vocal">
              Réserver l&apos;audit gratuit de 30{NB}minutes
            </a>
          )}

          <p className="text-[12px] leading-[1.45] text-faint">
            Votre micro sert uniquement pendant la conversation. Elle est transcrite pour que nous puissions vous répondre{NB}:{" "}
            <a href="/politique-de-confidentialite/" className="underline underline-offset-2 hover:text-ink transition-colors">politique de confidentialité</a>.
          </p>
        </section>
      )}

      <button
        type="button"
        onClick={() => {
          // Un seul clic sur le rond : le panneau s'ouvre et la conversation démarre.
          if (open) return close();
          setOpen(true);
          void start();
        }}
        aria-label={open ? "Fermer l'agent standardiste" : "Essayez notre agent standardiste"}
        aria-expanded={open}
        className="group flex items-center gap-3 cursor-pointer"
        data-umami-event={open ? undefined : "Agent vocal : ouvrir"}
      >
        {!open && (
          <span className={`${hint ? "inline-flex" : "hidden sm:inline-flex"} box px-3 py-2 text-[13px] sm:text-[14px] text-ink group-hover:border-ink transition-colors`} style={{ boxShadow: "var(--shadow-soft)" }}>
            Essayez notre agent standardiste
          </span>
        )}
        <span
          className="w-14 h-14 rounded-full bg-accent text-on-accent flex items-center justify-center transition-transform group-hover:scale-105 group-active:scale-95"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="9" y="3" width="6" height="11" rx="3" />
              <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
