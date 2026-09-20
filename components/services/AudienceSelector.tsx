import Link from "next/link";

/**
 * "I am a…" — a compact router, on the page where the question comes up.
 *
 * The same firm looks different depending on which side of the table you sit
 * on. Someone already reading a capability list is asking which part applies
 * to them, so the answer belongs here rather than on the homepage, where it
 * was competing with the firm's own positioning.
 *
 * Five links on one line, not five cards. It is a shortcut, not a section.
 */
const audiences = [
  { label: "Board", href: "#company-valuation" },
  { label: "Investor", href: "#mergers-acquisitions" },
  { label: "Lender", href: "#corporate-finance" },
  { label: "Founder", href: "#capital-advisory" },
  { label: "CFO", href: "#virtual-cfo" },
];

export function AudienceSelector() {
  return (
    <section className="border-b border-line bg-stone py-6" aria-labelledby="audience-heading">
      <div className="shell flex flex-wrap items-center gap-x-8 gap-y-2">
        <h2 id="audience-heading" className="text-meta text-muted">
          I am a…
        </h2>
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-1">
          {audiences.map((audience) => (
            <li key={audience.label}>
              <Link
                href={`/services${audience.href}`}
                className="link-draw inline-flex min-h-11 items-center text-body text-navy"
              >
                {audience.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
