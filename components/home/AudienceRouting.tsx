import Link from "next/link";

/**
 * Where are you coming from?
 *
 * The same firm looks different depending on which side of the table you sit
 * on, and a reader who recognises themselves in one line gets to the right
 * page in one click instead of reading a capability list to find out whether
 * it applies to them. Each route ends at the service that audience actually
 * needs, not at a generic landing page.
 */
const audiences = [
  {
    label: "Boards",
    line: "An independent view you can put in the minutes.",
    href: "/services#company-valuation",
  },
  {
    label: "Investors",
    line: "Diligence that holds up on both sides of a deal.",
    href: "/services#mergers-acquisitions",
  },
  {
    label: "Lenders",
    line: "A funding case built the way credit reads one.",
    href: "/services#corporate-finance",
  },
  {
    label: "Founders",
    line: "Capital structured on terms you can live with.",
    href: "/services#capital-advisory",
  },
  {
    label: "CFOs",
    line: "Senior finance capacity without the permanent hire.",
    href: "/services#virtual-cfo",
  },
];

export function AudienceRouting() {
  return (
    <section className="section-y bg-white" aria-labelledby="audience-heading">
      <div className="shell">
        <h2 id="audience-heading" className="max-w-[18ch] text-display-l text-navy">
          Where are you coming from?
        </h2>

        <ul className="mt-12 border-t border-line">
          {audiences.map((audience) => (
            <li key={audience.label} className="border-b border-line">
              <Link
                href={audience.href}
                className="group flex flex-wrap items-baseline gap-x-8 gap-y-1 py-6"
              >
                <span className="w-32 shrink-0 text-display-m text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                  {audience.label}
                </span>
                <span className="text-body text-muted">{audience.line}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
