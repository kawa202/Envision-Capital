"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { featuredSlides, HERO_ACTIONS, SLIDE_INTERVAL_MS } from "@/content/featured";
import { site } from "@/content/site";
import { keepCompoundsTogether } from "@/lib/typography";
import { EASE_EDITORIAL, EASE_IMAGE } from "@/lib/motion";

/**
 * Full-bleed editorial hero, built as a tabbed carousel (WAI-ARIA APG).
 *
 * The photograph carries the frame; the copy sits low on the left over a
 * gradient that is dense only where the words are. The headline is the
 * slide's link. Slide 1 is the firm's positioning and is always first — a
 * visitor who looks for five seconds still learns who Envision is.
 *
 * Rotation stops while the pointer is over the tab band, while keyboard
 * focus is anywhere in the hero, while the browser tab is hidden, and
 * entirely under prefers-reduced-motion. There is deliberately no visible
 * pause button (client decision) — note that WCAG 2.2.2 asks for one on
 * content that moves on its own for more than five seconds.
 */
export function Hero() {
  const shouldReduce = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  /** Announced only when the reader caused the change. */
  const [announcement, setAnnouncement] = useState("");

  const slide = featuredSlides[index];
  const count = featuredSlides.length;
  const rotating = !shouldReduce && !hovering && !focusInside && !tabHidden;
  const asLinks = HERO_ACTIONS === "links";
  /* In link mode the headline already goes to `href`; a primary action is
     shown beneath it only when it leads somewhere else. */
  const quietLink =
    asLinks && slide.primaryCta.href !== slide.href ? slide.primaryCta : null;

  const goTo = useCallback(
    (next: number, { announce = false, focus = false } = {}) => {
      const wrapped = (next + count) % count;
      setIndex(wrapped);
      if (focus) tabRefs.current[wrapped]?.focus();
      if (announce) {
        setAnnouncement(
          `Slide ${wrapped + 1} of ${count}: ${featuredSlides[wrapped].headline}`,
        );
      }
    },
    [count],
  );

  useEffect(() => {
    if (!rotating) return;
    const timer = setTimeout(
      () => setIndex((current) => (current + 1) % count),
      SLIDE_INTERVAL_MS,
    );
    return () => clearTimeout(timer);
  }, [rotating, index, count]);

  /* A carousel rotating in a background tab is wasted work. */
  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* Roving focus across the tabs, as the APG tabs pattern specifies: one tab
     stop for the whole list, arrows move between slides. */
  const onTabKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: count - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    goTo(keys[event.key], { announce: true, focus: true });
  };

  const rise = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Featured"
      onFocusCapture={() => setFocusInside(true)}
      onBlurCapture={() => setFocusInside(false)}
      /* Phones: tall enough that the photograph shows clear above the copy.
         Desktop: a sliver of the next section shows beneath the hero, so the
         page reads as continuing rather than as a single slide. */
      className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-navy md:min-h-[88svh] lg:min-h-[calc(100svh-3rem)]"
    >
      {/* ---------- Photography ---------- */}
      <div className="absolute inset-0">
        {featuredSlides.map((item, itemIndex) => (
          <motion.div
            key={item.slug}
            aria-hidden={itemIndex !== index}
            initial={false}
            animate={{
              opacity: itemIndex === index ? 1 : 0,
              scale: shouldReduce || itemIndex === index ? 1 : 1.03,
            }}
            transition={{ duration: shouldReduce ? 0.2 : 1.2, ease: EASE_IMAGE }}
            className="absolute inset-0"
          >
            <Image
              src={item.image.src}
              alt={itemIndex === index ? item.image.alt : ""}
              fill
              priority={itemIndex === 0}
              /* Every slide must be in memory before its turn comes round.
                 Left lazy behind an opacity-0 wrapper they never load at all,
                 and the carousel rotates onto an empty navy panel. */
              loading={itemIndex === 0 ? undefined : "eager"}
              sizes="100vw"
              quality={85}
              className="object-cover"
              /* Per-image crop from content — data, not styling. */
              style={{ objectPosition: item.image.focus ?? "50% 50%" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Gradient behind the copy and the controls only — the rest of the
          frame is left as photograph. Defined in globals.css (.hero-scrim). */}
      <div className="hero-scrim absolute inset-0" aria-hidden="true" />

      {/* ---------- Copy ---------- */}
      <div className="relative z-10 w-full pt-28 md:pt-32">
        <div className="shell">
          <div
            id="hero-panel"
            role="tabpanel"
            aria-roledescription="slide"
            aria-labelledby={`hero-tab-${index}`}
            /* Anchored to the bottom: copy of differing length grows
               upwards, so the controls beneath never move. */
            className="hero-copy max-w-[54rem]"
          >
            {/* Keyed remount rather than AnimatePresence with `mode="wait"`:
                that mode holds the outgoing slide until its exit animation
                finishes, and if the frame loop is throttled (background tab,
                minimised window) the exit never completes — the carousel
                freezes on screen while its state carries on advancing. */}
            <motion.div
              key={slide.slug}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
            >
              <motion.p
                variants={rise}
                transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
                className="flex items-center gap-3"
              >
                {/* The brass rule carries the accent; the label itself is
                    white, which holds contrast over a bright photograph
                    where small gold type cannot. */}
                <span className="h-0.5 w-8 bg-brass-light" aria-hidden="true" />
                <span
                  data-hero-eyebrow
                  className="text-[0.8125rem] font-semibold tracking-[0.1em] text-white uppercase"
                >
                  {slide.kind}
                </span>
              </motion.p>

              <motion.h1
                variants={rise}
                transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
                className="mt-4 max-w-[52rem] font-display text-hero text-white"
              >
                {asLinks ? (
                  /* The headline is the link, as in the reference: the
                     underline arrives on hover and keyboard focus. */
                  <Link
                    href={slide.href}
                    className="decoration-brass-light decoration-2 underline-offset-[0.14em] hover:underline focus-visible:underline"
                  >
                    {keepCompoundsTogether(slide.headline)}
                  </Link>
                ) : (
                  keepCompoundsTogether(slide.headline)
                )}
              </motion.h1>

              <motion.p
                variants={rise}
                transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
                className="relative mt-5 max-w-[44rem] pl-5 text-base leading-relaxed text-white/90 sm:mt-6 sm:pl-6 sm:text-lede"
              >
                {/* A drawn rule rather than a border: a border spans the
                    line boxes, leading included, and overshoots the text.
                    Inset by the half-leading plus the gap above the cap
                    height, it starts at the first line's capitals and ends
                    at the last line's baseline. */}
                <span
                  aria-hidden="true"
                  className="absolute top-[0.42em] bottom-[0.3em] left-0 w-1 bg-brass"
                />
                {slide.dek}
              </motion.p>

              {asLinks
                ? quietLink && (
                    <motion.div
                      variants={rise}
                      transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
                      className="mt-7"
                    >
                      <Link
                        href={quietLink.href}
                        data-hero-cta="primary"
                        className="inline-flex min-h-11 items-center gap-2.5 text-[0.9375rem] font-semibold text-white"
                      >
                        <span className="border-b-2 border-brass-light pb-0.5 transition-colors duration-300 hover:border-white">
                          {quietLink.label}
                        </span>
                        <ArrowIcon />
                      </Link>
                    </motion.div>
                  )
                : (
                    <motion.div
                      variants={rise}
                      transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
                      className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
                    >
                      <Link href={slide.primaryCta.href} data-hero-cta="primary" className="btn-primary">
                        {slide.primaryCta.label}
                        <ArrowIcon />
                      </Link>
                      {slide.secondaryCta && (
                        <Link
                          href={slide.secondaryCta.href}
                          data-hero-cta="secondary"
                          className="btn-secondary-invert"
                        >
                          {slide.secondaryCta.label}
                          <ArrowIcon />
                        </Link>
                      )}
                    </motion.div>
                  )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ---------- Tabs and motto ----------
          Tabs bottom-left, the brand motto bottom-right. Hovering anywhere
          along this band holds the rotation. */}
      <div
        className="relative z-10 w-full pt-9 pb-8 md:pt-11 md:pb-12"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="shell flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div
            role="tablist"
            aria-label="Featured stories"
            onKeyDown={onTabKeyDown}
            className="flex min-w-0 items-end gap-5 sm:gap-9"
          >
            {featuredSlides.map((item, itemIndex) => {
              const isActive = itemIndex === index;
              return (
                <button
                  key={item.slug}
                  ref={(node) => {
                    tabRefs.current[itemIndex] = node;
                  }}
                  id={`hero-tab-${itemIndex}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="hero-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => goTo(itemIndex, { announce: true })}
                  /* The whole block is the target — rule and label — and it
                     is at least 44px tall. */
                  className="group flex min-h-11 cursor-pointer flex-col justify-end pt-3 pb-1 text-left"
                >
                  {/* Only the active tab carries a rule, as in the reference;
                      it doubles as the progress indicator. */}
                  <span className="relative block h-[3px] w-full overflow-hidden">
                    {isActive ? (
                      <motion.span
                        key={`${item.slug}-${String(rotating)}`}
                        className="absolute inset-y-0 left-0 block bg-brass-light"
                        initial={{ width: rotating ? "0%" : "100%" }}
                        animate={{ width: "100%" }}
                        transition={
                          rotating
                            ? { duration: SLIDE_INTERVAL_MS / 1000, ease: "linear" }
                            : { duration: 0 }
                        }
                      />
                    ) : (
                      <span className="absolute inset-y-0 left-0 block w-0 bg-white/60 transition-[width] duration-300 group-hover:w-full" />
                    )}
                  </span>
                  {/* Active state is carried by weight and the rule as well
                      as colour. */}
                  <span
                    data-tab-label
                    className={`mt-2.5 block text-[0.9375rem] whitespace-nowrap transition-colors duration-300 ${
                      isActive
                        ? "font-semibold text-white"
                        : "text-white/75 group-hover:text-white"
                    }`}
                  >
                    {item.tab}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Brand motto — bottom right, on every slide, so the firm is
              named whichever story is showing. */}
          {/* On a phone the motto gives way: height there belongs to the
              photograph, and the motto closes the footer on every page. */}
          <div className="hidden items-center gap-4 pb-2 sm:flex">
            <span className="h-px w-8 bg-brass-light" aria-hidden="true" />
            <p className="font-display text-base tracking-wide text-white/85 italic">
              {site.philosophy}
            </p>
          </div>
        </div>
      </div>

      {/* Slide changes are announced only when the reader caused them — a
          carousel that narrates its own auto-rotation is hostile. */}
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </section>
  );
}
