import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

/**
 * Positioning, then what the firm does.
 *
 * Three practices, each an edge-to-edge photograph with its name beneath it,
 * and the whole block is the link — no border, no panel, no "Explore
 * [the same title]" repeated underneath the title it repeats.
 */
const practices = [
  {
    name: "Transactions & Capital",
    summary:
      "Corporate finance, M&A, valuation and capital advisory — from first structure to signed terms.",
    href: "/what-we-do#corporate-finance",
    image: {
      src: "/images/services/corporate-finance-advisory.jpg",
      alt: "Advisers working through transaction documents at a boardroom table.",
    },
  },
  {
    name: "Finance & Performance",
    summary:
      "Virtual CFO, reporting and performance improvement, for finance functions that have to stand up to diligence.",
    href: "/what-we-do#virtual-cfo",
    image: {
      src: "/images/services/virtual-cfo.jpg",
      alt: "A finance lead reviewing management accounts at a desk.",
    },
  },
  {
    name: "Intelligence & Transformation",
    summary:
      "Finance transformation and decision tooling, applied where they shorten the distance to a defensible answer.",
    href: "/what-we-do#ai-transformation",
    image: {
      src: "/images/services/ai-transformation.jpg",
      alt: "An analyst working at a screen of financial data.",
    },
  },
];

export function PracticeSnapshot() {
  return (
    <section className="section-y bg-white" aria-labelledby="practices-heading">
      <div className="shell">
        <h2 id="practices-heading" className="max-w-[20ch] text-display-l text-navy">
          {site.intro.heading}
        </h2>
        <p className="measure mt-6 text-body text-muted">{site.intro.body[0]}</p>

        <ul className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {practices.map((practice) => (
            <li key={practice.name}>
              <Link href={practice.href} className="group block">
                <span className="relative block aspect-[4/3] w-full overflow-hidden bg-navy">
                  <Image
                    src={practice.image.src}
                    alt={practice.image.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ec-ease)] group-hover:scale-[1.03]"
                  />
                </span>
                <h3 className="mt-5 text-display-m text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                  {practice.name}
                </h3>
                <span className="mt-3 block text-body text-muted">
                  {practice.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12">
          <Link href="/what-we-do#advisory-products" className="link-inline">
            Advisory Products
          </Link>
        </p>
      </div>
    </section>
  );
}
