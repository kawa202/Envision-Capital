"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { news } from "@/content/news";

/** "24 Mar 2026" — short and tabular, so the row reads straight across. */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Latest news. Four items, moved by the previous and next buttons.
 *
 * Nothing here starts on its own. The hero already autoplays and carries the
 * pause control WCAG 2.2.2 requires for it; a second self-starting carousel
 * on the same page would need its own, and two things moving unasked is one
 * too many. So this waits to be pressed.
 *
 * The track is scroll-snap underneath, which means it also answers to a
 * thumb, a trackpad and the Tab key when the buttons are not used.
 */
const items = news.slice(0, 4);

export function NewsCarousel() {
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
    const card = track.querySelector("li");
    const step = card
      ? card.getBoundingClientRect().width + 40
      : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  const arrow =
    "flex h-11 w-11 items-center justify-center border border-navy/30 text-navy transition-colors duration-[var(--ec-dur)] hover:border-navy disabled:border-line disabled:text-muted";

  return (
    <section
      className="section-y bg-stone"
      aria-roledescription="carousel"
      aria-labelledby="news-heading"
    >
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 id="news-heading" className="text-display-l text-navy">
            Latest news
          </h2>

          <div className="flex items-center gap-6">
            <Link
              href="/newsroom"
              className="link-inline inline-flex min-h-11 items-center"
            >
              All announcements
            </Link>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => nudge(-1)}
                disabled={atStart}
                aria-label="Show previous announcements"
                aria-controls="news-track"
                className={arrow}
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M10 3L5 8l5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                disabled={atEnd}
                aria-label="Show more announcements"
                aria-controls="news-track"
                className={arrow}
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M6 3l5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ul
        id="news-track"
        ref={trackRef}
        className="mt-12 flex snap-x snap-mandatory gap-10 overflow-x-auto pb-4 [scrollbar-width:thin] ps-[var(--shell-edge)] pe-[var(--shell-edge)]"
      >
        {items.map((item, position) => (
          <li
            key={item.slug}
            className="w-[76vw] shrink-0 snap-start sm:w-[42vw] lg:w-[27%]"
          >
            {/* The slide role goes on a wrapper, not the <li>. role="group"
                on a list item is not an allowed role and strips the list of
                its own semantics — the items stop counting as a list. */}
            <div
              role="group"
              aria-roledescription="slide"
              aria-label={`${position + 1} of ${items.length}`}
            >
              <Link href={item.href} className="group block">
                {item.image && (
                  <span className="relative mb-5 block aspect-[3/2] w-full overflow-hidden bg-navy">
                    <Image
                      src={item.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 27vw, (min-width: 640px) 42vw, 76vw"
                      className="object-cover"
                    />
                  </span>
                )}
                <span className="block text-meta text-muted">Announcement</span>
                <span className="mt-2 block font-serif text-h4 text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                  {item.title}
                </span>
                <time
                  dateTime={item.date}
                  className="mt-3 block text-meta tnum text-muted"
                >
                  {formatDate(item.date)}
                </time>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="shell">
        <p className="mt-8 text-meta leading-relaxed text-muted">
          [ANNOUNCEMENT CONTENT REQUIRED] — Every headline and date above is an
          empty slot demonstrating the layout.
        </p>
      </div>
    </section>
  );
}
