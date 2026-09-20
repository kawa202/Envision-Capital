import Link from "next/link";
import { services } from "@/content/services";

/**
 * Services as a list, not a grid of cards.
 *
 * Six rows, each one a hairline apart: the name in serif, the line that
 * explains it in the sans, and the whole row is the link. No box, no border
 * except the rule between rows, no arrow, and nothing that repeats the title
 * underneath the title.
 *
 * A grid of six boxes asks the eye to scan in two directions and makes every
 * service look like a product. A list reads top to bottom at the pace of a
 * contents page, which is what this is.
 */
const shown = [
  "corporate-finance",
  "mergers-acquisitions",
  "company-valuation",
  "virtual-cfo",
  "financial-reporting",
  "ai-transformation",
];

export function ServicesList() {
  const rows = shown.flatMap((id) => {
    const service = services.find((item) => item.id === id);
    return service ? [service] : [];
  });

  return (
    <section className="section-y bg-stone" aria-labelledby="services-heading">
      <div className="shell">
        <h2 id="services-heading" className="max-w-[18ch] text-display-l text-navy">
          What we do
        </h2>

        <ul className="mt-14 border-t border-line">
          {rows.map((service) => (
            <li key={service.id} className="border-b border-line">
              <Link
                href={`/services#${service.id}`}
                className="group grid items-baseline gap-x-12 gap-y-2 py-7 lg:grid-cols-12"
              >
                <span className="text-h4 font-normal text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline lg:col-span-5">
                  <span className="font-serif">{service.name}</span>
                </span>
                <span className="text-body text-muted lg:col-span-6">
                  {service.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12">
          <Link
            href="/services#advisory-products"
            className="link-inline inline-flex min-h-11 items-center"
          >
            Advisory Products
          </Link>
        </p>
      </div>
    </section>
  );
}
