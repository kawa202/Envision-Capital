"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { methodSteps } from "@/content/method";
import { EASE_EDITORIAL } from "@/lib/motion";

/**
 * The Envision Method.
 *
 * Presented as a methodology document, not a scroll-jacked slideshow: six
 * stages on a continuous rail that fills as the reader moves through it. The
 * only motion is the rail and a per-stage reveal, which means the desktop and
 * mobile experiences are the same progression rather than two different
 * interactions — and nothing is hidden behind a scroll position.
 *
 * Deliberately unillustrated. A methodology is an argument; photographs beside
 * each stage would be decoration competing with it.
 */
export function EnvisionMethod() {
  const railRef = useRef<HTMLOListElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 65%"],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="method" className="section-y bg-navy" aria-labelledby="method-heading">
      <div className="shell">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionLabel invert>The Envision Method</SectionLabel>
            <h2 id="method-heading" className="mt-6 font-display text-display-l text-white">
              Six stages, in sequence.
            </h2>
          </div>
          <p className="max-w-lg text-lede text-white/60 lg:col-span-5 lg:col-start-8 lg:pt-12">
            Every mandate runs the same disciplined sequence. It is how we make
            sure a conclusion still holds once someone sets out to dismantle it.
          </p>
        </Reveal>

        <ol ref={railRef} className="relative mt-14 lg:mt-20">
          {/* Continuous rail. The brass fill is the progress indicator — the
              one piece of scroll-linked motion this section allows itself. */}
          <span
            className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-white/12 md:left-[4.6875rem]"
            aria-hidden="true"
          />
          <motion.span
            className="absolute top-2 bottom-2 left-[0.6875rem] w-px origin-top bg-brass md:left-[4.6875rem]"
            style={shouldReduce ? { scaleY: 1 } : { scaleY: railScale }}
            aria-hidden="true"
          />

          {methodSteps.map((step) => (
            <li key={step.index} className="relative">
              <motion.div
                initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
                className="grid grid-cols-[1.375rem_1fr] gap-x-6 pb-12 md:grid-cols-[4rem_1.375rem_1fr] md:gap-x-8 md:pb-14"
              >
                {/* Stage number, outside the rail on desktop */}
                <span className="hidden pt-0.5 text-right font-mono text-[0.7rem] text-white/35 tnum md:block">
                  {step.index}
                </span>

                {/* Rail node */}
                <span className="relative pt-1.5" aria-hidden="true">
                  <span className="block h-[0.5625rem] w-[0.5625rem] translate-x-[0.40625rem] rounded-full bg-brass ring-4 ring-navy" />
                </span>

                <div className="pb-1">
                  <h3 className="font-display text-[1.375rem] text-white md:text-[1.5rem]">
                    <span className="mr-3 font-mono text-[0.7rem] text-brass tnum md:hidden">
                      {step.index}
                    </span>
                    {step.name}
                  </h3>

                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/75">
                    {step.summary}
                  </p>

                  <p className="mt-3 max-w-2xl text-[0.875rem] leading-relaxed text-white/50">
                    {step.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5">
                    {step.outputs.map((output) => (
                      <li
                        key={output}
                        className="font-mono text-[0.66rem] tracking-[0.04em] text-white/35"
                      >
                        {output}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
