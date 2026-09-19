"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { UnverifiedFlag } from "@/components/ui/Bits";
import { CREDENTIALS_WARNING, credentials } from "@/content/credentials";
import { EASE_EDITORIAL } from "@/lib/motion";

/**
 * Count-up runs only where it aids comprehension — the figure resolving draws
 * the eye to a number worth registering. Never under reduced motion, and the
 * true value is always in the DOM for assistive technology.
 */
function Figure({ value }: { value: string }) {
  const target = Number(value);
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (!inView || shouldReduce || Number.isNaN(target)) return;
    const controls = animate(count, target, {
      duration: 1.5,
      ease: EASE_EDITORIAL,
    });
    return () => controls.stop();
  }, [inView, shouldReduce, target, count]);

  if (shouldReduce || Number.isNaN(target)) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <motion.span aria-hidden="true">{rounded}</motion.span>
    </span>
  );
}

export function Credentials() {
  const hasUnverified = credentials.some((item) => item.unverified);

  return (
    <section className="section-y bg-paper" aria-labelledby="credentials-heading">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2
              id="credentials-heading"
              className="font-display text-display-l text-navy"
            >
              Experience that informs decisions.
            </h2>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-muted">
              Advisory judgement is cumulative. What follows is the shape of the
              work behind it — the transactions, mandates and sectors that
              inform how we approach a new one.
            </p>
          </div>

          <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7 lg:gap-y-0">
            {credentials.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: EASE_EDITORIAL,
                }}
                className="border-t border-line pt-5"
              >
                <dd className="font-display text-[clamp(2rem,3.4vw,2.875rem)] leading-none text-navy tnum">
                  {item.prefix && (
                    <span className="mr-0.5 align-super text-[0.4em] tracking-wide text-muted">
                      {item.prefix.trim()}
                    </span>
                  )}
                  <Figure value={item.value} />
                  {item.suffix && <span className="text-analytical">{item.suffix}</span>}
                </dd>
                <dt className="mt-4 text-[0.875rem] text-graphite">{item.label}</dt>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">
                  {item.note}
                </p>
              </motion.div>
            ))}
          </dl>
        </div>

        {hasUnverified && (
          <p className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-5">
            <UnverifiedFlag>Prototype placeholder</UnverifiedFlag>
            <span className="font-mono text-[0.68rem] tracking-[0.04em] text-muted">
              {CREDENTIALS_WARNING}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
