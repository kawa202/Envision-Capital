import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { keepCompoundsTogether } from "@/lib/typography";

/**
 * Photograph-led card for the hub: image, optional label, headline, optional
 * standfirst, and a footer line. The whole card is one link.
 *
 * `dark` sits on navy — a brass rule caps the card and the body takes a
 * slightly lifted panel. `light` sits on warm white with no panel at all, so
 * the photograph and the headline carry it.
 */
export function ImageCard({
  href,
  image,
  title,
  label,
  dek,
  footer,
  tone = "light",
  sizes = "(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw",
}: {
  href: string;
  image?: { src: string; alt: string };
  title: string;
  label?: string;
  dek?: string;
  footer?: ReactNode;
  tone?: "dark" | "light";
  sizes?: string;
}) {
  const dark = tone === "dark";

  return (
    <article className="h-full">
      <Link
        href={href}
        /* Hover and keyboard focus get the same treatment, and colour is
           never the only signal: the dark card lifts and casts a shadow, and
           on both tones the headline underlines. The brass cap is a border
           on the card itself, so it travels with the lift. */
        className={`group flex h-full flex-col ${
          dark
            ? "border-t-[3px] border-brass bg-navy-2 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_10px_15px_rgba(0,0,0,0.3)] focus-visible:-translate-y-1 focus-visible:shadow-[0_10px_15px_rgba(0,0,0,0.3)]"
            : ""
        }`}
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-navy">
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
            />
          )}
        </div>

        <div className={`flex flex-1 flex-col ${dark ? "p-6 md:p-7" : "pt-5"}`}>
          {label && (
            <span className={`eyebrow ${dark ? "text-brass-light" : "text-analytical"}`}>
              {label}
            </span>
          )}

          <h3
            className={`font-display text-[1.25rem] leading-snug transition-colors duration-300 md:text-[1.3125rem] underline-offset-[0.2em] decoration-1 group-hover:underline group-focus-visible:underline ${
              label ? "mt-4" : ""
            } ${
              dark
                ? "text-white decoration-brass-light group-hover:text-brass-light group-focus-visible:text-brass-light"
                : "text-navy decoration-analytical group-hover:text-analytical group-focus-visible:text-analytical"
            }`}
          >
            {keepCompoundsTogether(title)}
          </h3>

          {dek && (
            <p
              className={`mt-3 text-base leading-relaxed ${dark ? "text-white/80" : "text-muted"}`}
            >
              {dek}
            </p>
          )}

          {footer && <div className="mt-auto pt-5">{footer}</div>}
        </div>
      </Link>
    </article>
  );
}
