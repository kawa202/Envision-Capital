import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";
import { HERITAGE } from "@/content/home";

/** Heritage: photograph left, statement and three figures right, on navy. */
export function Heritage() {
  return (
    <section className="grid bg-navy text-white lg:grid-cols-2" aria-labelledby="heritage-heading">
      <div className="relative min-h-[300px] lg:min-h-[500px]">
        <Image
          src={HERITAGE.image.src}
          alt={HERITAGE.image.alt}
          fill
          fetchPriority="low"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center px-[8%] py-24">
        <span className="eyebrow eyebrow-invert">{HERITAGE.eyebrow}</span>
        <h2 id="heritage-heading" className="mb-6 text-[2.5rem] leading-[1.2] text-white">
          {HERITAGE.heading}
        </h2>
        <p className="mb-8 text-base leading-[1.8] text-on-navy">{HERITAGE.body}</p>

        <dl className="mb-8 flex flex-wrap gap-x-12 gap-y-6">
          {HERITAGE.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-[0.75rem] tracking-[1px] text-on-navy uppercase">
                {metric.label}
              </dt>
              <dd className="font-serif text-[2rem] font-bold text-brass">{metric.value}</dd>
            </div>
          ))}
        </dl>
        <p className="-mt-4 mb-8 text-[0.75rem] text-on-navy">{HERITAGE.metricsNote}</p>

        <p>
          <Link href={HERITAGE.link.href} className="text-link text-link-invert">
            {HERITAGE.link.text}
            <Arrow />
          </Link>
        </p>
      </div>
    </section>
  );
}
