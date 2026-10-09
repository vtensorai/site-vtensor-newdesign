"use client";

import { useSyncExternalStore } from "react";

/** Permet au visiteur de ne plus être compté par la mesure d'audience Umami.
 *  Réglage gardé dans ce navigateur (clé « umami.disabled », lue par le script Umami à chaque page). */
const KEY = "umami.disabled";
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): boolean {
  try {
    return !!localStorage.getItem(KEY);
  } catch {
    return false;
  }
}

/** Page statique : rien n'est affiché avant que le navigateur ait lu le réglage. */
function getServerSnapshot(): boolean | null {
  return null;
}

export function OptOutAudience() {
  const off = useSyncExternalStore<boolean | null>(subscribe, getSnapshot, getServerSnapshot);
  if (off === null) return null;

  const toggle = () => {
    try {
      if (off) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, "1");
    } catch {
      /* stockage du navigateur indisponible : rien à mémoriser */
    }
    listeners.forEach((l) => l());
  };

  return (
    <p>
      {off ? "Vos visites ne sont plus comptées dans ce navigateur. " : "Vous pouvez demander à ne pas être compté : "}
      <button
        type="button"
        onClick={toggle}
        className="cursor-pointer text-accent underline underline-offset-4 hover:text-ink transition-colors"
      >
        {off ? "être compté à nouveau" : "ne plus compter mes visites"}
      </button>
      {off ? "" : " (réglage gardé dans ce navigateur)."}
    </p>
  );
}
