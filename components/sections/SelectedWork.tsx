"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { UnverifiedFlag } from "@/components/ui/Bits";
import { HubHeader } from "@/components/ui/HubHeader";
import { Reveal } from "@/components/ui/Reveal";
import { caseStudies } from "@/content/caseStudies";
import { EASE_EDITORIAL } from "@/lib/motion";

/**
 * Featured case studies — one mandate at a time in a navy panel, text left and
 * photograph right, stepped through with arrows or dots.
 *
 * It does not rotate on its own. The hero already moves; a second timed
 * carousel further down the page would be the kind of gimmick the brand
 * direction rules out, and it would need its own pause control.
 */
export function SelectedWork() {
  const [index, setIndex] = useState(0);
  const shouldReduce = useReducedMotion();
  const count = caseStudies.length;
  const item = caseStudies[index];

  const go = (next: number) => setIndex((next + count) % count);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  };

  return (
    <section id="work" className="section-y bg-paper-2" aria-labelledby="work-heading">
      <div className="shell">
        <HubHeader
          id="work-heading"
          title="Featured case studies"
          link={{ label: "All case studies", href: "/work" }}
        />

        <Reveal className="mt-8 lg:mt-10">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured case studies"
            onKeyDown={onKeyDown}
          >
            <div
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              className="bg-navy"
            >
              <motion.div
                key={item.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: shouldReduce ? 0.15 : 0.6, ease: EASE_EDITORIAL }}
                className="grid lg:min-h-[23rem] lg:grid-cols-2"
              >
                <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
                  <p className="text-[0.8125rem] text-white/70">
                    {item.mandate} · {item.client}
                  </p>
                  <h3 className="mt-4 font-display text-display-m text-white">
                    {item.outcome}
                  </h3>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href={item.href}
                      className="border-b border-brass-light pb-1 text-[0.875rem] font-medium text-white transition-colors duration-300 hover:border-white"
                    >
                      Read the case study
                    </Link>
                    {item.unverified && <UnverifiedFlag>Placeholder</UnverifiedFlag>}
                  </div>
                </div>

                <div className="relative aspect-[3/2] lg:aspect-auto">
                  {item.image && (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
              </motion.div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-5">
              <ArrowButton direction="previous" onClick={() => go(index - 1)} />

              <ul className="flex items-center gap-1">
                {caseStudies.map((study, dot) => (
                  <li key={study.slug}>
                    <button
                      type="button"
                      onClick={() => go(dot)}
                      aria-label={`Case study ${dot + 1}: ${study.client}`}
                      aria-current={dot === index ? "true" : undefined}
                      className="flex h-8 cursor-pointer items-center px-1"
                    >
                      <span
                        className={`block h-[3px] transition-all duration-300 ${
                          dot === index ? "w-10 bg-brass" : "w-6 bg-navy/25 hover:bg-navy/55"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <ArrowButton direction="next" onClick={() => go(index + 1)} />
            </div>
          </div>
        </Reveal>

        <p className="mt-8 text-meta leading-relaxed text-muted">
          [CASE STUDY CONTENT REQUIRED] — Every entry above is an empty
          placeholder. No client, mandate or outcome shown here represents work
          Envision Capital has performed. Replace with verified,
          client-consented case studies before launch.
        </p>
      </div>
    </section>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${direction === "next" ? "Next" : "Previous"} case study`}
      className="flex h-11 w-11 cursor-pointer items-center justify-center border border-navy/40 text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
    >
      <span aria-hidden="true">{direction === "next" ? "→" : "←"}</span>
    </button>
  );
}
