import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { TAGLINE } from "@/lib/brand";

/**
 * The footer carries the routes the four-item header does not, so the shorter
 * bar costs nothing: every page on the site is one click away from here.
 *
 * Text on navy is set in --ec-on-navy rather than a white opacity. A white at
 * 45% over navy measures 4.3:1, which fails; the tint measures 11.8:1 and the
 * 80% step 8:1, so nothing in here is below AA.
 */
const columns = [
  {
    heading: "What we do",
    links: services.map((service) => ({
      label: service.name,
      href: `/services#${service.id}`,
    })),
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/legal#privacy" },
      { label: "Terms of use", href: "/legal#terms" },
      { label: "Regulatory", href: "/legal#regulatory" },
      { label: "Cookies", href: "/legal#cookies" },
    ],
  },
  {
    heading: "Firm",
    links: [
      { label: "About us", href: "/about" },
      { label: "The Envision Method", href: "/method" },
      { label: "Industries", href: "/industries" },
      { label: "Selected work", href: "/work" },
      { label: "Insights", href: "/insights" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo className="text-white" />
            <p className="mt-6 max-w-[18rem] font-serif text-body leading-snug text-on-navy">
              {TAGLINE}
            </p>

            <address className="mt-6 text-body not-italic text-on-navy/80">
              <p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-draw inline-flex min-h-11 items-center"
                >
                  {site.contact.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}
                  className="link-draw inline-flex min-h-11 items-center"
                >
                  {site.contact.phone}
                </a>
              </p>
              <p>{site.contact.address}</p>
            </address>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="text-meta text-on-navy">{column.heading}</h2>
                <ul className="mt-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        /* The footer is a site map, not the likely next
                           click. Prefetching all sixteen of these cost more
                           bandwidth on the homepage than every photograph
                           on it put together. */
                        prefetch={false}
                        className="link-draw inline-flex min-h-11 items-center text-meta text-on-navy/80 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

        </div>

        {/* ---------- Legal ---------- */}
        <div className="mt-14 border-t border-line-invert pt-8">
          <p className="max-w-3xl text-meta leading-relaxed text-on-navy/80">
            {site.disclaimer}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-meta text-on-navy/80">
              © {new Date().getFullYear()} {site.name}
            </p>
            <p className="text-meta text-on-navy/80">
              PROTOTYPE — CONTENT PENDING VERIFICATION
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
