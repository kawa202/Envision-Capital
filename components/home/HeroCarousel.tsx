"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SLIDES, SLIDE_INTERVAL_MS } from "@/content/featured";

/**
 * The hero: three stories, crossfaded, with a labelled tab per story.
 *
 * The tabs replace anonymous dots. A dot tells you there is another slide; a
 * label tells you whether it is worth waiting for, which is the whole reason
 * a reader would use the control at all.
 *
 * WCAG 2.2.2 requires a visible way to stop anything that starts by itself
 * and runs past five seconds, so the pause button is part of the component
 * rather than a nicety. Three separate things also stop the timer, and they
 * are not the same thing:
 *
 *   held       — hover or focus inside the hero. Temporary. The reader is
 *                busy, not finished; leaving resumes it.
 *   userPaused — the pause button, or picking a tab. Deliberate. Nothing
 *                resumes it except pressing play.
 *   reduced    — prefers-reduced-motion. Read before the first tick, so a
 *                reduced-motion reader never sees a frame of movement.
 *
 * Conflating the first two is the common bug: a carousel that restarts the
 * moment your cursor leaves, having already thrown away the slide you
 * deliberately chose.
 */
const FADE_MS = 600;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [held, setHeld] = useState(false);
  const [mountRest, setMountRest] = useState(false);

  const regionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const playing = !reduced && !userPaused;
  const rotating = playing && !held;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  /* Slides two and three are not rendered until the browser goes idle, so
     their photographs never compete with the first paint. By the first
     advance they are decoded and ready to fade in. */
  useEffect(() => {
    const idle = window.requestIdleCallback?.bind(window);
    if (idle) {
      const handle = idle(() => setMountRest(true), { timeout: 2500 });
      return () => window.cancelIdleCallback?.(handle);
    }
    const timer = window.setTimeout(() => setMountRest(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % SLIDES.length),
      SLIDE_INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [rotating]);

  /** Choosing a slide is a deliberate act, so it stops the rotation. */
  const choose = useCallback((next: number) => {
    setMountRest(true);
    setIndex(next);
    setUserPaused(true);
  }, []);

  /* Arrow keys move between tabs and select as they go — the automatic
     activation pattern, which suits a tablist whose panels are already
     loaded. Home and End jump to the ends. */
  const onTabKeyDown = (event: React.KeyboardEvent) => {
    const last = SLIDES.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;

    event.preventDefault();
    choose(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Featured stories"
      /* A fixed height, not a content-driven one: every slide occupies the
         same box, so advancing cannot move the page. */
      className="relative isolate flex min-h-[34rem] items-end lg:min-h-[42rem]"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(event) => {
        if (!regionRef.current?.contains(event.relatedTarget as Node)) setHeld(false);
      }}
    >
      {/* ---------------- Photographs ---------------- */}
      {SLIDES.map((slide, position) => {
        const active = position === index;
        if (position > 0 && !mountRest && !active) return null;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 -z-10 transition-opacity ease-[var(--ec-ease)] ${
              active ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: `${FADE_MS}ms` }}
            /* Hidden from assistive technology as well as from view, so only
               the visible slide's alt text is ever announced. */
            aria-hidden={!active}
          >
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              fill
              priority={position === 0}
              loading={position === 0 ? "eager" : "lazy"}
              quality={position === 0 ? 85 : 75}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: slide.image.focus ?? "50% 50%" }}
            />
            <div className="hero-scrim absolute inset-0" aria-hidden="true" />
          </div>
        );
      })}

      {/* ---------------- Text ---------------- */}
      <div className="shell w-full pt-28 pb-[clamp(2.5rem,6vw,4rem)]">
        {/* All three panels share one grid cell, so the hero is as tall as
            its longest story and switching shifts nothing. */}
        <div className="grid">
          {SLIDES.map((slide, position) => {
            const active = position === index;
            return (
              <div
                key={slide.id}
                id={`hero-panel-${slide.id}`}
                role="tabpanel"
                aria-labelledby={`hero-tab-${slide.id}`}
                /* Inert rather than merely faded: a link you cannot see must
                   not be reachable by Tab or read out. */
                inert={!active}
                className={`col-start-1 row-start-1 transition-opacity ease-[var(--ec-ease)] ${
                  active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                style={{ transitionDuration: `${FADE_MS}ms` }}
              >
                {/* Slide one carries the page's h1 — and it is a statement,
                    not a link. The others are the same type set as
                    paragraphs, so the document keeps one heading here. */}
                {position === 0 ? (
                  <h1 className="max-w-[16ch] text-hero font-normal text-balance text-white">
                    {slide.headline}
                  </h1>
                ) : (
                  <p className="max-w-[16ch] font-serif text-hero leading-[var(--ec-leading-display)] font-normal tracking-[var(--ec-tracking-display)] text-balance text-white">
                    {slide.headline}
                  </p>
                )}

                <p className="mt-6 max-w-[52ch] text-[1rem] leading-[var(--ec-leading)] text-on-navy md:text-[1.125rem]">
                  {slide.body}
                </p>

                <p className="mt-8">
                  <Link href={slide.cta.href} className="btn-on-image">
                    {slide.cta.text}
                  </Link>
                </p>
              </div>
            );
          })}
        </div>

        {/* ---------------- Controls ---------------- */}
        <div className="mt-[var(--ec-s8)] flex items-center gap-[var(--ec-s4)]">
          <button
            type="button"
            onClick={() => setUserPaused((value) => !value)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/70 text-white transition-colors duration-[var(--ec-dur)] hover:bg-white/10"
          >
            {playing ? (
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" focusable="false">
                <rect x="4" y="3" width="3" height="10" fill="currentColor" />
                <rect x="9" y="3" width="3" height="10" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" focusable="false">
                <path d="M5 3l8 5-8 5z" fill="currentColor" />
              </svg>
            )}
          </button>

          {/* Scrolls sideways on a narrow phone rather than wrapping under
              the pause button. */}
          <div
            role="tablist"
            aria-label="Featured stories"
            onKeyDown={onTabKeyDown}
            className="flex min-w-0 gap-6 overflow-x-auto [scrollbar-width:none] sm:gap-9"
          >
            {SLIDES.map((slide, position) => {
              const active = position === index;
              return (
                <button
                  key={slide.id}
                  ref={(node) => {
                    tabRefs.current[position] = node;
                  }}
                  id={`hero-tab-${slide.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`hero-panel-${slide.id}`}
                  /* One tab stop for the whole list; arrows move within it. */
                  tabIndex={active ? 0 : -1}
                  onClick={() => choose(position)}
                  className="flex min-h-11 shrink-0 cursor-pointer flex-col justify-end whitespace-nowrap"
                >
                  {/* The rule sits above the label and only on the active
                      tab. It is the one piece of brass outside the header. */}
                  <span
                    className={`mb-2 block h-[2px] w-full ${active ? "bg-brass" : "bg-transparent"}`}
                    aria-hidden="true"
                  />
                  <span
                    className={`text-meta ${active ? "font-semibold text-white" : "text-white/70"}`}
                  >
                    {slide.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {`Slide ${index + 1} of ${SLIDES.length}: ${SLIDES[index].label}`}
        </p>
        {reduced && (
          <span className="sr-only">
            Autoplay is off because your system asks for reduced motion.
          </span>
        )}
      </div>
    </section>
  );
}
