"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_INTERVAL_MS, HERO_SLIDES } from "@/content/home";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Full-height hero carousel, as in the design reference: three photographs
 * crossfading over 1.5s, a navy gradient behind the text, the story
 * bottom-left and brass dots bottom-right.
 *
 * Added to the reference because they are requirements rather than style:
 * - a pause control beside the dots (WCAG 2.2.2 — anything that moves on its
 *   own for more than five seconds must be stoppable);
 * - dots as real buttons with names and 44px targets;
 * - rotation holds while the pointer or keyboard focus is in the hero, and
 *   never starts under prefers-reduced-motion;
 * - all three texts share one grid cell, so changing slide moves nothing.
 */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [held, setHeld] = useState(false);
  const [mountRest, setMountRest] = useState(false);
  const regionRef = useRef<HTMLElement>(null);

  const playing = !reduced && !userPaused;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  /* Slides two and three are not rendered until the page has finished
     loading and the browser is idle. Mounting them on idle alone let their
     photographs start downloading while the first one was still arriving on
     a slow connection, which delayed the one that matters. */
  useEffect(() => {
    let handle: number | undefined;
    const schedule = () => {
      const idle = window.requestIdleCallback?.bind(window);
      handle = idle
        ? idle(() => setMountRest(true), { timeout: 3000 })
        : window.setTimeout(() => setMountRest(true), 1500);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (handle !== undefined) {
        window.cancelIdleCallback?.(handle);
        window.clearTimeout(handle);
      }
    };
  }, []);

  /* `index` is a dependency so that choosing a slide restarts the six-second
     count, as the reference's resetTimer does. */
  useEffect(() => {
    if (!playing || held) return;
    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % HERO_SLIDES.length),
      HERO_INTERVAL_MS,
    );
    return () => window.clearTimeout(timer);
  }, [playing, held, index]);

  const goTo = useCallback((next: number) => {
    setMountRest(true);
    setIndex(next);
  }, []);

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Featured"
      className="relative flex h-[calc(100svh-4rem)] min-h-[34rem] w-full items-center overflow-hidden pb-16 md:items-end md:pb-24 lg:h-[calc(100svh-5rem)]"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(event) => {
        if (!regionRef.current?.contains(event.relatedTarget as Node)) setHeld(false);
      }}
    >
      {/* ---------------- Photographs ---------------- */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, position) => {
          const active = position === index;
          if (position > 0 && !mountRest && !active) return null;
          return (
            <div
              key={slide.id}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
                active ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                /* Slide one is the LCP element. `preload` (Next 16's
                   replacement for `priority`) puts a <link rel="preload"> in
                   the <head>, so the browser asks for it before it has parsed
                   down to the <img>. It is not combined with `loading` or
                   `fetchPriority`, which the docs say it must not be. */
                loading={position === 0 ? "eager" : "lazy"}
                fetchPriority={position === 0 ? "high" : "low"}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
      <div
        className="absolute inset-0 z-[1] [background:var(--ec-hero-overlay)]"
        aria-hidden="true"
      />

      {/* ---------------- Text ---------------- */}
      <div className="relative z-[2] grid w-full max-w-[900px] px-[6%] text-white">
        {HERO_SLIDES.map((slide, position) => {
          const active = position === index;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${position + 1} of ${HERO_SLIDES.length}`}
              inert={!active}
              className={`col-start-1 row-start-1 transition-opacity duration-[400ms] ease-in-out ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <span className="mb-4 block font-sans text-[0.8rem] font-semibold tracking-[2px] text-brass uppercase">
                {slide.tag}
              </span>
              {/* Slide one carries the page's h1. The others are set the same
                  way as paragraphs, so the page keeps one top-level heading. */}
              {position === 0 ? (
                <h1 className="mb-6 font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-semibold text-white">
                  {slide.headline}
                </h1>
              ) : (
                <p className="mb-6 font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-semibold text-white">
                  {slide.headline}
                </p>
              )}
              <p className="mb-8 max-w-[650px] text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.6] font-light text-hero-sub">
                {slide.subheadline}
              </p>
              <Link
                href={slide.cta.href}
                className="inline-flex min-h-11 items-center gap-2 border-b border-brass pb-1 text-base font-medium text-brass transition-opacity duration-300 hover:opacity-80"
              >
                {slide.cta.text}
                <span className="sr-only">: {slide.headline}</span>
                <Arrow size={16} />
              </Link>
            </div>
          );
        })}
      </div>

      {/* ---------------- Controls ---------------- */}
      <div className="absolute right-1/2 bottom-3 z-[3] flex translate-x-1/2 items-center md:right-[6%] md:bottom-7 md:translate-x-0">
        <button
          type="button"
          onClick={() => setUserPaused((value) => !value)}
          aria-label={playing ? "Pause slideshow" : "Play slideshow"}
          className="group flex h-11 w-11 items-center justify-center"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brass text-brass transition-colors duration-300 group-hover:bg-brass group-hover:text-navy">
            {playing ? (
              <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true" focusable="false">
                <rect x="4" y="3" width="3" height="10" fill="currentColor" />
                <rect x="9" y="3" width="3" height="10" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true" focusable="false">
                <path d="M5 3l8 5-8 5z" fill="currentColor" />
              </svg>
            )}
          </span>
        </button>

        {HERO_SLIDES.map((slide, position) => {
          const active = position === index;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(position)}
              aria-label={`Show slide ${position + 1}: ${slide.tag}`}
              aria-current={active ? "true" : undefined}
              className="group flex h-11 w-7 items-center justify-center"
            >
              <span
                className={`block h-3 w-3 rounded-full border border-brass transition-[background-color,transform] duration-300 group-hover:scale-125 ${
                  active ? "bg-brass" : ""
                }`}
              />
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {`Slide ${index + 1} of ${HERO_SLIDES.length}: ${HERO_SLIDES[index].tag}`}
      </p>
    </section>
  );
}
