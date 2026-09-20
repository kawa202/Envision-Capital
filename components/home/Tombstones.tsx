import Link from "next/link";
import { mandates, MANDATES_NOTE } from "@/content/mandates";

/**
 * Tombstones — the row of completed mandates.
 *
 * Pure CSS: overflow plus scroll-snap, no JavaScript at all. There are
 * already two things on this homepage that move when you press something,
 * and a row of five cards does not need to be the third. A thumb, a
 * trackpad, a scrollbar and the Tab key all work on their own.
 *
 * Hairlines between, nothing around: a tombstone is a record, not a card.
 */
export function Tombstones() {
  return (
    <section className="section-y bg-white" aria-labelledby="mandates-heading">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 id="mandates-heading" className="text-display-l text-navy">
            Selected mandates
          </h2>
          <Link href="/work" className="link-inline inline-flex min-h-11 items-center">
            All case studies
          </Link>
        </div>
      </div>

      {/* Full-bleed track, so the row reads as continuing past the edge while
          its first card still lines up with the content column. */}
      <ul
        className="mt-12 flex snap-x snap-mandatory gap-10 overflow-x-auto pb-4 [scrollbar-width:thin] ps-[var(--shell-edge)] pe-[var(--shell-edge)]"
        aria-label="Selected mandates"
      >
        {mandates.map((mandate) => (
          <li
            key={mandate.id}
            className="w-[76vw] shrink-0 snap-start border-t border-line pt-6 sm:w-[42vw] lg:w-[22%]"
          >
            <p className="text-meta tnum text-muted">{mandate.year}</p>
            <p className="mt-4 font-serif text-h4 text-navy">{mandate.client}</p>
            <p className="mt-3 text-body text-muted">{mandate.mandate}</p>

            <dl className="mt-6 border-t border-line pt-4">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-meta text-muted">Value</dt>
                <dd className="text-body tnum text-navy">{mandate.value}</dd>
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-4">
                <dt className="text-meta text-muted">Sector</dt>
                <dd className="text-body text-navy">{mandate.sector}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <div className="shell">
        <p className="mt-8 text-meta text-muted">{MANDATES_NOTE}</p>
        <p className="mt-3 text-meta leading-relaxed text-muted">
          [MANDATES REQUIRED] — Every field above is an empty slot. A tombstone
          names a client, a transaction and a number, and implies that the
          client agreed to be named; none of that can be prototyped.
        </p>
      </div>
    </section>
  );
}
