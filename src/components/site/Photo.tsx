/**
 * Photo du site : WebP avec repli JPEG, dimensions intrinsèques pour éviter
 * les sauts de mise en page. Fichiers générés dans /public/photos par le
 * script de préparation (1400 px de large max).
 */

type Props = {
  name: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
};

export function Photo({ name, alt, width, height, className = "photo", style, priority = false }: Props) {
  return (
    <picture>
      <source srcSet={`/photos/${name}.webp`} type="image/webp" />
      <img
        src={`/photos/${name}.jpg`}
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
