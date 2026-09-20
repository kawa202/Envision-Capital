import Link from "next/link";
import { services } from "@/content/services";

/**
 * The services grid.
 *
 * Six capability lines, set as an editorial index rather than six photographs:
 * there is no commissioned imagery for these, and six recycled stock frames
 * would say less about the firm than six precisely written lines do. It also
 * keeps the heaviest section on the page at zero kilobytes of image.
 *
 * Whole cards are links. No "Explore [the same title]" repeated underneath
 * the title it repeats.
 */
const featuredIds = [
  "corporate-finance",
  "mergers-acquisitions",
  "company-valuation",
  "virtual-cfo",
  "financial-reporting",
  "ai-transformation",
];

export function HowWeCanHelp() {
  const shown = featuredIds.flatMap((id) => {
    const service = services.find((item) => item.id === id);
    return service ? [service] : [];
  });

  return (
    <section className="section-y bg-white" aria-labelledby="help-heading">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 id="help-heading" className="max-w-[16ch] text-display-l text-navy">
            How we can help
          </h2>
          <Link
            href="/what-we-do"
            className="link-inline inline-flex min-h-11 items-center"
          >
            All services
          </Link>
        </div>

        <ul className="mt-12 grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((service) => (
            <li key={service.id} className="bg-white">
              <Link
                href={`/what-we-do#${service.id}`}
                className="group flex h-full flex-col px-1 py-8 sm:px-6"
              >
                <h3 className="text-display-m text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                  {service.name}
                </h3>
                <p className="mt-3 text-body text-muted">{service.summary}</p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10">
          <Link
            href="/what-we-do#advisory-products"
            className="link-inline inline-flex min-h-11 items-center"
          >
            Advisory Products
          </Link>
        </p>
      </div>
    </section>
  );
}
