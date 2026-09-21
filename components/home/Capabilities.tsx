import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";
import { CAPABILITIES } from "@/content/home";

/** Three capabilities on navy, each under a hairline, lifting on hover. */
export function Capabilities() {
  return (
    <section className="bg-navy px-[6%] py-20 text-white md:py-32" aria-labelledby="capabilities-heading">
      <span className="eyebrow eyebrow-invert">{CAPABILITIES.eyebrow}</span>
      <h2 id="capabilities-heading" className="mb-12 text-[2.5rem] leading-normal text-white">
        {CAPABILITIES.heading}
      </h2>

      <ul className="grid gap-12 lg:grid-cols-3">
        {CAPABILITIES.items.map((item) => (
          <li
            key={item.number}
            className="border-t border-white/15 pt-8 transition-transform duration-300 ease-in-out hover:-translate-y-[5px]"
          >
            <span className="mb-6 block font-sans text-[0.85rem] font-semibold tracking-[1px] text-brass">
              {item.number}
            </span>
            <h3 className="mb-4 text-[1.5rem] leading-normal text-white">{item.title}</h3>
            <p className="mb-6 text-[0.95rem] leading-[1.7] text-on-navy">{item.body}</p>
            <Link href={item.href} className="text-link text-link-invert">
              Learn more
              <span className="sr-only"> about {item.title}</span>
              <Arrow />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
