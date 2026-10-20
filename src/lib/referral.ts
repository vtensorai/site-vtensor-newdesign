/**
 * Programme de parrainage (2026-10-20) : code du parrain mémorisé dans le navigateur.
 *
 * Contrat avec l'API (api.vtensor.ai) :
 *  - GET /api/public/referral/<CODE> → 200 { ok: true, code, parrain } ou 404 { ok: false } ;
 *  - POST /api/public/checkout accepte en plus `parrain: <CODE>` (code inconnu ignoré par le serveur).
 * Lien de parrainage : https://vtensor.ai/?parrain=<CODE> (alias ?ref=), code du type BRAVEL-K7Q,
 * insensible à la casse.
 *
 * Stockage : localStorage `vt-parrain` = { code, parrain, savedAt } pendant 90 jours. Toute lecture ou
 * écriture est protégée : sans stockage (navigation privée, données bloquées), le site fonctionne,
 * seul le code n'est pas retenu d'une page à l'autre.
 */

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/links";

export const REFERRAL_KEY = "vt-parrain";
export const REFERRAL_DAYS = 90;
const REFERRAL_TTL_MS = REFERRAL_DAYS * 24 * 60 * 60 * 1000;
/** Événement émis dans la page quand le code change (bandeau d'arrivée → ligne des Tarifs). */
const CHANGE_EVENT = "vt-parrain-change";

export type StoredReferral = { code: string; parrain: string; savedAt: number };
export type ReferralCheck = { status: "valid"; code: string; parrain: string } | { status: "unknown" } | { status: "error" };

/** Copie en mémoire de la page : garde le code jusqu'à la commande quand le stockage est bloqué. */
let memory: StoredReferral | null = null;

/** Majuscules, sans espaces ; null si le texte ne peut pas être un code (lettres, chiffres, tiret). */
export function normalizeCode(raw: string | null | undefined): string | null {
  const code = (raw ?? "").trim().toUpperCase();
  return /^[A-Z0-9][A-Z0-9-]{0,63}$/.test(code) ? code : null;
}

function notify() {
  try {
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    /* hors navigateur */
  }
}

/** Code mémorisé et encore valable ; un code de plus de 90 jours est supprimé. */
export function getStoredReferral(): StoredReferral | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(REFERRAL_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;
  let value: Partial<StoredReferral> | null = null;
  try {
    value = JSON.parse(raw) as Partial<StoredReferral>;
  } catch {
    value = null;
  }
  const code = normalizeCode(typeof value?.code === "string" ? value.code : null);
  const parrain = typeof value?.parrain === "string" ? value.parrain.trim() : "";
  const savedAt = typeof value?.savedAt === "number" ? value.savedAt : NaN;
  const fresh = Number.isFinite(savedAt) && Date.now() - savedAt < REFERRAL_TTL_MS && savedAt <= Date.now() + 60_000;
  if (!code || !parrain || !fresh) {
    try {
      window.localStorage.removeItem(REFERRAL_KEY);
    } catch {
      /* stockage indisponible */
    }
    return null;
  }
  return { code, parrain, savedAt };
}

/** Mémorise un code validé par l'API (remplace le précédent). Renvoie false si le stockage est indisponible. */
export function saveReferral(ref: { code: string; parrain: string }): boolean {
  const value: StoredReferral = { code: ref.code, parrain: ref.parrain, savedAt: Date.now() };
  let ok = true;
  try {
    window.localStorage.setItem(REFERRAL_KEY, JSON.stringify(value));
  } catch {
    ok = false;
  }
  memory = value;
  notify();
  return ok;
}

export function clearReferral(): void {
  try {
    window.localStorage.removeItem(REFERRAL_KEY);
  } catch {
    /* stockage indisponible */
  }
  memory = null;
  notify();
}

/** Code à utiliser maintenant : stockage du navigateur, sinon copie en mémoire de la page. */
export function currentReferral(): StoredReferral | null {
  const stored = getStoredReferral();
  if (stored) return stored;
  if (memory && Date.now() - memory.savedAt < REFERRAL_TTL_MS) return memory;
  return null;
}

/** Vérifie un code auprès de l'API. « unknown » = 404 ou texte qui ne peut pas être un code ; « error » = API injoignable. */
export async function validateReferral(raw: string): Promise<ReferralCheck> {
  const code = normalizeCode(raw);
  if (!code) return { status: "unknown" };
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(`${API_URL}/api/public/referral/${encodeURIComponent(code)}`, { signal: ctrl.signal, headers: { Accept: "application/json" } });
    if (res.status === 404) return { status: "unknown" };
    if (!res.ok) return { status: "error" };
    const data = (await res.json().catch(() => null)) as { ok?: boolean; code?: string; parrain?: string } | null;
    const parrain = typeof data?.parrain === "string" ? data.parrain.trim() : "";
    if (!data?.ok || !parrain) return { status: "unknown" };
    return { status: "valid", code: normalizeCode(data.code) ?? code, parrain };
  } catch {
    return { status: "error" };
  } finally {
    window.clearTimeout(timer);
  }
}

/** Code mémorisé, tenu à jour (même page et autres onglets). null au premier rendu, comme côté serveur. */
export function useStoredReferral(): StoredReferral | null {
  const [ref, setRef] = useState<StoredReferral | null>(null);
  useEffect(() => {
    const sync = () => setRef(currentReferral());
    sync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === REFERRAL_KEY) sync();
    };
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return ref;
}
