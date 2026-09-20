"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { caseStudies } from "@/content/caseStudies";

/**
 * Case studies, as a row you push sideways.
 *
 * The scrolling is CSS — overflow plus scroll-snap — so it works with
 * JavaScript switched off, works with a thumb, works with a trackpad, and
 * respects the platform's own scrollbar and momentum. The arrows are the
 * only part that needs script, and they are an addition for pointer users
 * rather than the mechanism: a keyboard reader tabs through the cards and
 * the browser brings each one into view on its own.
 */
export function CaseStudyRow() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const nudge = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    /* One card plus its gap, whatever the breakpoint made that. */
    const card = track.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 32 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  const arrow =
    "hidden h-11 w-11 items-center justify-center border border-navy/30 text-navy transition-colors duration-200 hover:border-navy disabled:border-line disabled:text-muted lg:flex";

  return (
    <section className="section-y bg-stone" aria-labelledby="work-heading">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 id="work-heading" className="text-display-l text-navy">
            Selected work
          </h2>

          <div className="flex items-center gap-6">
            <Link href="/work" className="link-inline inline-flex min-h-11 items-center">
              All case studies
            </Link>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => nudge(-1)}
                disabled={atStart}
                aria-label="Show previous case studies"
                className={arrow}
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" focusable="false">
                  <path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                disabled={atEnd}
                aria-label="Show more case studies"
                className={arrow}
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" focusable="false">
                  <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed track: the row runs to the edge of the screen so it reads
          as continuing, but the first card still lines up with the column. */}
      <ul
        ref={trackRef}
        className="mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:thin] ps-[var(--shell-edge)] pe-[var(--shell-edge)]"
      >
        {caseStudies.map((item) => (
          <li
            key={item.slug}
            className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[30%] xl:w-[27%]"
          >
            <Link href={item.href} className="group block">
              {item.image && (
                <span className="relative block aspect-[4/3] w-full overflow-hidden bg-navy">
                  <Image
                    src={item.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 340px, (min-width: 640px) 44vw, 78vw"
                    className="object-cover"
                  />
                </span>
              )}
              <span className="mt-5 block text-meta text-muted">
                {item.client} · {item.mandate}
              </span>
              <span className="mt-3 block text-display-m text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                {item.title}
              </span>
              <span className="mt-3 block text-body text-muted">{item.outcome}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="shell">
        <p className="mt-6 text-meta leading-relaxed text-muted">
          [CASE STUDY CONTENT REQUIRED] — Every card above is an empty
          placeholder. No client, mandate or outcome shown here represents work
          Envision Capital has performed.
        </p>
      </div>
    </section>
  );
}
