import NextImage from "next/image";
import type { Image as ImageContent } from "@/content/types";

/**
 * Every photographic slot on the site renders through this component.
 *
 * Where a usable placeholder exists it renders the photograph. Where one does
 * not, it renders a branded commission panel at the *same* aspect ratio and
 * position, so the composition is still demonstrated while making it
 * unmistakable that final photography is outstanding.
 *
 * This exists because a wrong photograph is more damaging to an advisory firm
 * than an obvious gap: a stock image of a US tax form, a trading screen or a
 * novelty hand-drawn chart quietly tells a CFO that nobody was paying
 * attention. An empty, labelled frame tells them the opposite.
 */
export function EditorialImage({
  image,
  sizes,
  className = "",
  priority = false,
  quality,
  overlayClassName,
}: {
  image: ImageContent;
  sizes: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  /** Optional scrim applied above the photograph. */
  overlayClassName?: string;
}) {
  if (image.commission || !image.src) {
    return <CommissionPanel image={image} />;
  }

  return (
    <>
      <NextImage
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={sizes}
        quality={quality}
        className={`object-cover ${className}`}
      />
      {overlayClassName && (
        <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden="true" />
      )}
    </>
  );
}

/** The labelled, on-brand stand-in for photography still to be art-directed. */
function CommissionPanel({ image }: { image: ImageContent }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-navy-2 p-5">
      <p className="relative text-meta text-on-navy">
        Photography to be commissioned
      </p>

      <div className="relative">
        <p className="max-w-xs text-meta leading-relaxed text-on-navy/70">
          {image.brief ?? image.alt}
        </p>
      </div>
    </div>
  );
}
