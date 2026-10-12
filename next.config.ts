import type { NextConfig } from "next";

/** Date du build, heure de Paris (AAAA-MM-JJ) : inlinée côté serveur ET navigateur, pour que les valeurs qui
 *  dépendent de la date (offre de lancement) soient identiques à l'hydratation. */
const BUILT_ON_PARIS = new Intl.DateTimeFormat("fr-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_BUILT_ON_PARIS: BUILT_ON_PARIS },
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
