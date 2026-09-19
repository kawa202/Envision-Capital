"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Reveal } from "@/components/ui/Reveal";
import { galleryItems } from "@/content/gallery";
import { EASE_EDITORIAL } from "@/lib/motion";

/**
 * Envision / In context — the economies the firm advises within.
 *
 * A horizontal editorial sequence, built on a native scroll container with
 * scroll-snap: touch, trackpad, keyboard and the arrow controls all drive one
 * mechanism, and it degrades to a plain scrollable strip without JavaScript.
 */
export function EditorialGallery() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const shouldReduce = useReducedMotion();

  const readPosition = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    setAtStart(scrollLeft < 8);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 8);

    const card = track.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const stride = card.offsetWidth + 24;
    setActive(Math.min(galleryItems.length - 1, Math.round(scrollLeft / stride)));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    readPosition();
    track.addEventListener("scroll", readPosition, { passive: true });
    window.addEventListener("resize", readPosition);
    return () => {
      track.removeEventListener("scroll", readPosition);
      window.removeEventListener("resize", readPosition);
    };
  }, [readPosition]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-card]");
    if (!track || !card) return;
    track.scrollBy({
      left: direction * (card.offsetWidth + 24),
      behavior: shouldReduce ? "auto" : "smooth",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
  };

  const arrowClass =
    "flex h-11 w-11 cursor-pointer items-center justify-center border border-line text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white disabled:cursor-default disabled:opacity-25 disabled:hover:border-line disabled:hover:bg-transparent disabled:hover:text-navy";

  return (
    <section className="section-y overflow-hidden bg-paper" aria-labelledby="context-heading">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 id="context-heading" className="font-display text-display-l text-navy">
              The economies we advise within.
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[0.7rem] text-muted tnum">
              <span className="text-navy">{galleryItems[active].index}</span>
              {" / "}
              {galleryItems.length.toString().padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={atStart}
                aria-label="Previous image"
                className={arrowClass}
              >
                <svg viewBox="0 0 24 12" className="h-3 w-6" aria-hidden="true">
                  <path d="M24 6H2M7 1L2 6l5 5" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={atEnd}
                aria-label="Next image"
                className={arrowClass}
              >
                <svg viewBox="0 0 24 12" className="h-3 w-6" aria-hidden="true">
                  <path d="M0 6h22M17 1l5 5-5 5" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* The track breaks the shell on the right so the next frame is cropped —
          the signal that the sequence continues. */}
      <ul
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Envision in context — image sequence"
        className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingInlineStart: "max(1.25rem, calc((100vw - 88rem) / 2 + 4.5vw))",
          paddingInlineEnd: "22vw",
        }}
      >
        {galleryItems.map((item, index) => (
          <motion.li
            key={item.index}
            data-card
            initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              delay: Math.min(index, 3) * 0.05,
              ease: EASE_EDITORIAL,
            }}
            className="w-[76vw] shrink-0 snap-start sm:w-[52vw] lg:w-[36vw] xl:w-[30rem]"
          >
            <figure className="group">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-navy">
                <EditorialImage
                  image={item.image}
                  /* The first frames are visible or half-visible immediately;
                     lazy-loading them leaves a navy block where the crop
                     should be teasing the next photograph. */
                  priority={index < 2}
                  sizes="(max-width: 640px) 76vw, (max-width: 1024px) 52vw, 30rem"
                  className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
                />
              </div>

              <figcaption className="mt-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.66rem] text-analytical tnum">
                    {item.index}
                  </span>
                  <span className="text-meta text-muted">{item.category}</span>
                </div>
                <p className="mt-2.5 font-display text-[1.125rem] leading-snug text-navy">
                  {item.title}
                </p>
                <p className="mt-1.5 max-w-md text-[0.84rem] leading-relaxed text-muted">
                  {item.caption}
                </p>
              </figcaption>
            </figure>
          </motion.li>
        ))}
      </ul>

      <p className="shell mt-2 text-meta text-muted">
        Drag, scroll or use the arrow keys to move through the sequence.
      </p>
    </section>
  );
}
