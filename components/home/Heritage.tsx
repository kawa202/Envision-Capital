import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";
import { HERITAGE } from "@/content/home";

/** Heritage: photograph left, statement and three figures right, on navy. */
export function Heritage() {
  return (
    <section className="grid bg-navy text-white min-[1025px]:grid-cols-2" aria-labelledby="heritage-heading">
      <div className="relative min-h-[300px] min-[1025px]:min-h-[500px]">
        <Image
          src={HERITAGE.image.src}
          alt={HERITAGE.image.alt}
          fill
          fetchPriority="low"
          sizes="(min-width: 1025px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="relative flex flex-col justify-center px-[8%] py-24">
        <span className="eyebrow eyebrow-invert">{HERITAGE.eyebrow}</span>
        <h2 id="heritage-heading" className="mb-6 text-[2.5rem] leading-[1.2] text-white">
          {HERITAGE.heading}
        </h2>
        <p className="mb-8 text-base leading-[1.8] text-on-navy">{HERITAGE.body}</p>

        {/* One row, as in the reference, with labels wrapping inside each
            figure. Only a phone is too narrow for that: there the row wraps
            rather than pushing a figure off the screen. */}
        <dl className="mb-8 flex flex-wrap gap-x-12 gap-y-6 sm:flex-nowrap">
          {HERITAGE.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-[0.75rem] tracking-[1px] text-on-navy uppercase">
                {metric.label}
              </dt>
              <dd className="font-serif text-[2rem] font-bold text-brass">{metric.value}</dd>
            </div>
          ))}
        </dl>

        <p>
          {/* The reference's link is a plain inline one; 24px keeps it at
              the WCAG 2.2 minimum without adding height to the section. */}
          <Link href={HERITAGE.link.href} className="text-link text-link-invert min-h-6">
            {HERITAGE.link.text}
            <Arrow />
          </Link>
        </p>

        {/* Sits in the section's bottom padding, so labelling the figures
            as illustrative adds no height. */}
        <p className="absolute bottom-8 left-[8%] text-[0.75rem] text-on-navy">
          {HERITAGE.metricsNote}
        </p>
      </div>
    </section>
  );
}
