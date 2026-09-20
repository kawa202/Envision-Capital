"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { featuredSlides } from "@/content/featured";

const INTERVAL = 7000;

/**
 * Hero carousel. Three stories, crossfaded.
 *
 * WCAG 2.2.2 wants any movement that starts by itself and runs longer than
 * five seconds to have a visible control that stops it, so the pause button
 * is part of the component rather than a nicety. It also stops on hover and
 * on keyboard focus, because nobody should have to race a timer to finish
 * reading a sentence or click a link.
 *
 * Under prefers-reduced-motion nothing starts on its own: the carousel loads
 * paused, the button reads Play, and the indicators still work. That keeps
 * all three stories reachable without moving anything unasked.
 *
 * Weight: slide one is eager and priority — it is the LCP element. Slides two
 * and three are not rendered at all until the browser goes idle, so their
 * photographs never compete with the first paint. By the time the first
 * seven seconds are up they are decoded and ready to fade in.
 */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [mountRest, setMountRest] = useState(false);
  const [held, setHeld] = useState(false);
  const regionRef = useRef<HTMLElement>(null);

  /* Autoplay is opt-out, not opt-in — but the opt-out is read before the
     first tick, so a reduced-motion reader never sees a frame of movement. */
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(query.matches);
      setPlaying(!query.matches);
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  /* Bring the other two slides in once the browser has nothing better to do. */
  useEffect(() => {
    const idle = window.requestIdleCallback?.bind(window);
    if (idle) {
      const handle = idle(() => setMountRest(true), { timeout: 2500 });
      return () => window.cancelIdleCallback?.(handle);
    }
    const timer = window.setTimeout(() => setMountRest(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const advance = useCallback(
    (step: number) =>
      setIndex((current) => (current + step + featuredSlides.length) % featuredSlides.length),
    [],
  );

  useEffect(() => {
    if (!playing || held) return;
    const timer = window.setInterval(() => advance(1), INTERVAL);
    return () => window.clearInterval(timer);
  }, [playing, held, advance]);

  /* Hover and focus hold the timer without changing what the button says:
     the reader has not paused it, they are just busy. */
  const hold = { onMouseEnter: () => setHeld(true), onMouseLeave: () => setHeld(false) };

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Featured stories"
      className="relative isolate flex min-h-[32rem] items-end lg:min-h-[40rem]"
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(event) => {
        if (!regionRef.current?.contains(event.relatedTarget as Node)) setHeld(false);
      }}
      {...hold}
    >
      {featuredSlides.map((slide, position) => {
        const active = position === index;
        if (position > 0 && !mountRest && !active) return null;

        return (
          <div
            key={slide.slug}
            className={`absolute inset-0 -z-10 transition-opacity duration-400 ease-[var(--ec-ease)] ${
              active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!active}
          >
            <Image
              src={slide.image.src}
              alt=""
              fill
              priority={position === 0}
              loading={position === 0 ? "eager" : "lazy"}
              quality={position === 0 ? 85 : 75}
              sizes="100vw"
              className="object-cover"
            />
            <div className="hero-scrim absolute inset-0" aria-hidden="true" />
          </div>
        );
      })}

      <div className="shell w-full pt-24 pb-[clamp(3rem,7vw,5.5rem)]">
        {/* All three sit in one grid cell, so the hero is always as tall as
            its longest story and advancing shifts nothing. Inactive ones are
            `inert`: invisible, unfocusable, and not read out. */}
        <div className="grid">
          {featuredSlides.map((slide, position) => {
            const active = position === index;
            return (
              <div
                key={slide.slug}
                role="group"
                aria-roledescription="slide"
                aria-label={`${position + 1} of ${featuredSlides.length}`}
                inert={!active}
                className={`col-start-1 row-start-1 transition-opacity duration-300 ease-[var(--ec-ease)] ${
                  active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <p className="text-meta text-white">{slide.category}</p>

                {/* Slide one carries the page's h1. The others are the same
                    type at the same size, set as paragraphs, so the document
                    keeps exactly one heading at this level. */}
                {position === 0 ? (
                  <h1 className="mt-4 max-w-[18ch] text-hero font-normal text-white">
                    {slide.headline}
                  </h1>
                ) : (
                  <p className="mt-4 max-w-[18ch] font-serif text-hero leading-[var(--ec-leading-display)] tracking-[var(--ec-tracking-display)] text-white">
                    {slide.headline}
                  </p>
                )}

                <p className="mt-6 max-w-xl text-lede text-white/85">{slide.standfirst}</p>

                <p className="mt-9">
                  <Link href={slide.cta.href} className="btn-primary">
                    {slide.cta.label}
                  </Link>
                </p>
              </div>
            );
          })}
        </div>

        {/* ---------------- Controls ---------------- */}
        <div className="mt-10 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Pause the carousel" : "Play the carousel"}
            className="flex h-11 w-11 items-center justify-center border border-white/50 text-white transition-colors duration-200 hover:bg-white/10"
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

          <ul className="flex items-center gap-2">
            {featuredSlides.map((slide, position) => (
              <li key={slide.slug}>
                <button
                  type="button"
                  onClick={() => {
                    setMountRest(true);
                    setIndex(position);
                  }}
                  aria-label={`Show story ${position + 1}: ${slide.headline}`}
                  aria-current={position === index ? "true" : undefined}
                  /* 44px of target around a 2px mark: the hit area is the
                     button, the line is only what you see. */
                  className="flex h-11 w-11 items-center justify-center"
                >
                  <span
                    className={`block h-0.5 transition-[width,background-color] duration-300 ${
                      position === index ? "w-8 bg-white" : "w-4 bg-white/45"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>

          <p className="sr-only" aria-live="polite">
            {`Story ${index + 1} of ${featuredSlides.length}: ${featuredSlides[index].headline}`}
          </p>

          {reduced && (
            <span className="sr-only">
              Autoplay is off because your system asks for reduced motion.
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
