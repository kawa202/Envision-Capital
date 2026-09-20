import Image from "next/image";
import Link from "next/link";
import { services } from "@/content/services";

/**
 * Three practices, side by side.
 *
 * A tall 4:5 crop, the practice name in serif, two lines of what it is, then
 * its services as plain links. The services are the links — there is no
 * "Explore Transactions & Capital" repeating the heading above it, and no
 * 01/02/03, which on a professional-services homepage reads as a design
 * system showing its work.
 *
 * The service names come from content/services.ts by id, so the columns
 * cannot drift from the pages they point at.
 */
const practices = [
  {
    name: "Transactions & Capital",
    description:
      "Raising it, structuring it, and knowing what a business is worth before anyone else puts a number on it.",
    serviceIds: [
      "corporate-finance",
      "capital-advisory",
      "mergers-acquisitions",
      "company-valuation",
    ],
    image: {
      src: "/images/services/corporate-finance-advisory.jpg",
      alt: "Advisers working through transaction documents at a boardroom table.",
    },
  },
  {
    name: "Finance & Performance",
    description:
      "Senior finance capability inside the business, and reporting that holds up the first time it is examined.",
    serviceIds: ["virtual-cfo", "financial-reporting", "financial-performance"],
    image: {
      src: "/images/services/virtual-cfo.jpg",
      alt: "A finance lead reviewing management accounts at a desk.",
    },
  },
  {
    name: "Intelligence & Transformation",
    description:
      "Tooling and method applied where they shorten the distance between a question and a defensible answer.",
    serviceIds: ["ai-transformation", "advisory-products"],
    image: {
      src: "/images/services/ai-transformation.jpg",
      alt: "An analyst reviewing financial data across two screens.",
    },
  },
];

export function Practices() {
  return (
    <section className="section-y bg-white" aria-labelledby="practices-heading">
      <div className="shell">
        <h2 id="practices-heading" className="max-w-[20ch] text-display-l text-navy">
          Three practices, one standard of evidence.
        </h2>

        <ul className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-3">
          {practices.map((practice) => {
            const lines = practice.serviceIds.flatMap((id) => {
              const service = services.find((item) => item.id === id);
              return service ? [service] : [];
            });

            return (
              <li key={practice.name}>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy">
                  <Image
                    src={practice.image.src}
                    alt={practice.image.alt}
                    fill
                    sizes="(min-width: 768px) 31vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-6 font-serif text-h4 text-navy">{practice.name}</h3>
                <p className="mt-3 text-body text-muted">{practice.description}</p>

                <ul className="mt-5 border-t border-line">
                  {lines.map((service) => (
                    <li key={service.id} className="border-b border-line">
                      <Link
                        href={`/services#${service.id}`}
                        className="link-draw flex min-h-11 items-center text-body text-navy"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
