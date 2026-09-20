import Link from "next/link";

/**
 * The rest of the firm, from the About page.
 *
 * Case studies, the newsroom and the agenda came off the homepage, which is
 * the right call for a landing page and the wrong one if they then have no
 * front door. This is it: three routes, named plainly, on the page a reader
 * lands on when they want to know who the firm is.
 */
const destinations = [
  {
    label: "Selected work",
    line: "The structure of the mandates we take, and what changed.",
    href: "/work",
  },
  {
    label: "Newsroom",
    line: "Announcements, publications and firm news.",
    href: "/newsroom",
  },
  {
    label: "On the agenda",
    line: "Briefings, roundtables and the rooms we are speaking in.",
    href: "/events",
  },
];

export function AboutHub() {
  return (
    <section className="section-y bg-stone" aria-labelledby="about-hub-heading">
      <div className="shell">
        <h2 id="about-hub-heading" className="max-w-[18ch] text-display-l text-navy">
          More from the firm
        </h2>

        <ul className="mt-12 border-t border-line">
          {destinations.map((item) => (
            <li key={item.href} className="border-b border-line">
              <Link
                href={item.href}
                className="group grid items-baseline gap-x-12 gap-y-2 py-7 lg:grid-cols-12"
              >
                <span className="text-h4 font-serif text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline lg:col-span-4">
                  {item.label}
                </span>
                <span className="text-body text-muted lg:col-span-7">
                  {item.line}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
