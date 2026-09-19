"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { UnverifiedFlag } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { services, servicesByGroup } from "@/content/services";
import { EASE_EDITORIAL, EASE_IMAGE } from "@/lib/motion";

/**
 * A capability presentation, not a card grid.
 *
 * The grouped index on the right is the interface; the panel on the left is
 * the detail view for whatever is selected. Hover, click and keyboard all
 * drive the same state, implemented as a real vertical tablist.
 */
/* The URL hash is external state: /what-we-do#company-valuation opens that
   capability. Read through useSyncExternalStore so server and client agree on
   the first render and later hash changes are picked up without an effect. */
const subscribeHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const readHash = () => window.location.hash.slice(1);
const readServerHash = () => "";

export function CapabilityExplorer() {
  const hash = useSyncExternalStore(subscribeHash, readHash, readServerHash);
  const hashIndex = services.findIndex((item) => item.id === hash);
  /* A selection made on the page wins until the hash changes again. */
  const [picked, setPicked] = useState<{ index: number; hash: string } | null>(null);
  const active =
    picked && (picked.hash === hash || hashIndex < 0)
      ? picked.index
      : Math.max(hashIndex, 0);
  const setActive = (index: number) => setPicked({ index, hash });
  const sectionRef = useRef<HTMLElement>(null);

  /* Deep links name a capability, not an element, so the browser has nothing
     to scroll to by itself. */
  useEffect(() => {
    if (hashIndex >= 0) sectionRef.current?.scrollIntoView({ block: "start" });
  }, [hashIndex]);

  const shouldReduce = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const service = services[active];

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = services.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = active === last ? 0 : active + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = active === 0 ? last : active - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    }

    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      className="section-y bg-paper-2"
      aria-labelledby="what-we-do-heading"
    >
      <div className="shell">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2
              id="what-we-do-heading"
              className="font-display text-display-l text-navy"
            >
              Capability across the decision, not one part of it.
            </h2>
          </div>
          <p className="max-w-xl text-lede text-muted lg:col-span-6 lg:col-start-7 lg:pt-12">
            We combine financial expertise, strategic insight and practical
            execution to help organisations make better decisions — and to make
            them stand up afterwards.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* ---------------- Detail panel ---------------- */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div
              role="tabpanel"
              id={`capability-panel-${service.id}`}
              aria-labelledby={`capability-tab-${service.id}`}
              tabIndex={-1}
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-navy lg:aspect-auto lg:h-[clamp(17rem,38vh,23rem)]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: shouldReduce ? 1 : 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE_IMAGE }}
                    className="absolute inset-0"
                  >
                    <EditorialImage
                      image={service.image}
                      sizes="(max-width: 1024px) 100vw, 38vw"
                      overlayClassName="bg-navy/20"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                  className="pt-7"
                >
                  <p className="text-meta text-analytical">{service.group}</p>
                  <h3 className="mt-3 font-display text-display-s text-navy">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[0.84rem] leading-snug text-graphite"
                      >
                        <span className="text-muted" aria-hidden="true">
                          ·
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {service.unconfirmed && (
                    <p className="mt-5">
                      <UnverifiedFlag>
                        Capability line not in supplied Envision material — confirm
                      </UnverifiedFlag>
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ---------------- Grouped index ---------------- */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Capabilities"
            onKeyDown={onKeyDown}
            className="lg:col-span-6 lg:col-start-7"
          >
            {servicesByGroup.map(({ group, summary, items }) => (
              <div key={group} className="mb-10 last:mb-0">
                <div className="border-b border-line pb-3">
                  <h3 className="font-display text-[1.0625rem] text-navy">
                    {group}
                  </h3>
                  <p className="mt-1 text-[0.8125rem] text-muted">{summary}</p>
                </div>

                {items.map((item) => {
                  const index = services.indexOf(item);
                  const isActive = index === active;

                  return (
                    <button
                      key={item.id}
                      ref={(el) => {
                        tabRefs.current[index] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`capability-tab-${item.id}`}
                      aria-selected={isActive}
                      aria-controls={`capability-panel-${item.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onClick={() => setActive(index)}
                      className="group relative block w-full cursor-pointer border-b border-line-soft py-5 text-left"
                    >
                      <span className="flex items-baseline justify-between gap-6">
                        <span>
                          <span
                            className={`block text-[1.0625rem] leading-snug transition-colors duration-300 ${
                              isActive ? "text-analytical" : "text-navy group-hover:text-analytical"
                            }`}
                          >
                            {item.name}
                          </span>
                          <span className="mt-1 block text-[0.84rem] leading-relaxed text-muted">
                            {item.summary}
                          </span>
                        </span>
                        <span
                          className={`shrink-0 text-[0.9rem] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isActive
                              ? "translate-x-0 text-analytical opacity-100"
                              : "-translate-x-1 text-navy/40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }`}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
