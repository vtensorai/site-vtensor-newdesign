/**
 * Photo du site : WebP avec repli JPEG, dimensions intrinsèques pour éviter
 * les sauts de mise en page. Fichiers générés dans /public/photos par le
 * script de préparation (1400 px de large max). `widths` : versions réduites
 * `{name}-{w}.webp|jpg` (même dossier) proposées au navigateur avec `sizes`.
 */

type Props = {
  name: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  /** Largeurs des versions réduites disponibles (ex. [480]). */
  widths?: readonly number[];
  /** Largeur affichée, pour que le navigateur choisisse la bonne version. */
  sizes?: string;
};

export function Photo({ name, alt, width, height, className = "photo", style, priority = false, widths, sizes }: Props) {
  const set = (ext: string) =>
    widths?.length ? [...widths.map((w) => `/photos/${name}-${w}.${ext} ${w}w`), `/photos/${name}.${ext} ${width}w`].join(", ") : `/photos/${name}.${ext}`;
  return (
    <picture>
      <source srcSet={set("webp")} sizes={widths?.length ? sizes : undefined} type="image/webp" />
      <img
        src={`/photos/${name}.jpg`}
        srcSet={widths?.length ? set("jpg") : undefined}
        sizes={widths?.length ? sizes : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        className={className}
        style={style}
      />
    </picture>
  );
}
