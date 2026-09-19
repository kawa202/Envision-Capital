import Link from "next/link";
import { utilityNav } from "@/content/navigation";
import { quickLinks } from "@/content/home";

/**
 * Discover more — the last stop before the footer: search on one side, the
 * most-used routes as quick links on the other.
 *
 * The search control is static, like the one in the navigation: there is no
 * search backend yet.
 */
export function DiscoverMore() {
  return (
    <section
      className="border-b border-line-invert-soft bg-navy-2 py-16 md:py-20"
      aria-labelledby="discover-heading"
    >
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="discover-heading" className="font-display text-display-m text-white">
            Discover more
          </h2>
          {/* TODO: open site search once a search backend exists. */}
          <button
            type="button"
            className="mt-7 inline-flex cursor-pointer items-center gap-3 bg-white px-6 py-3.5 text-[0.875rem] font-medium text-navy transition-colors duration-300 hover:bg-paper-2"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M13.5 13.5L18 18" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            {utilityNav.searchLabel} Envision
          </button>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h3 className="font-sans text-[0.9375rem] font-medium text-white">Popular links</h3>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex border border-white/35 px-3.5 py-2 text-[0.8125rem] font-medium text-white transition-colors duration-300 hover:border-brass-light hover:bg-white/6"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
