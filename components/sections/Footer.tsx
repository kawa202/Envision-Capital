import Link from "next/link";
import { FooterSignup } from "@/components/sections/FooterSignup";
import { Logo } from "@/components/ui/Logo";
import { TOPICS } from "@/content/insights";
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
    heading: "Services",
    links: services.map((service) => ({
      label: service.name,
      href: `/services#${service.id}`,
    })),
  },
  {
    heading: "Insights",
    links: [
      ...TOPICS.map((topic) => ({
        label: topic,
        href: `/insights?topic=${encodeURIComponent(topic)}`,
      })),
      { label: "Newsroom", href: "/newsroom" },
      { label: "On the agenda", href: "/events" },
    ],
  },
  {
    heading: "Firm",
    links: [
      { label: "About us", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "The Envision Method", href: "/method" },
      { label: "Industries", href: "/industries" },
      { label: "Selected work", href: "/work" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/legal#privacy" },
      { label: "Terms of use", href: "/legal#terms" },
      { label: "Regulatory", href: "/legal#regulatory" },
      { label: "Cookies", href: "/legal#cookies" },
      { label: "Fraud awareness", href: "/fraud-awareness" },
      { label: "Client portal", href: "/portal" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
          {/* ---------- Brand and contact ---------- */}
          <div className="lg:col-span-3">
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

          {/* ---------- Site map ---------- */}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-4">
            {columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="text-meta text-on-navy">{column.heading}</h2>
                <ul className="mt-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        /* The footer is a site map, not the likely next
                           click. Prefetching every one of these cost more
                           bandwidth than every photograph on the homepage. */
                        prefetch={false}
                        className="link-draw inline-flex min-h-11 items-center text-meta text-on-navy/80 transition-colors duration-[var(--ec-dur)] hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* ---------- Sign-up ---------- */}
          <div className="lg:col-span-3">
            <FooterSignup />
          </div>
        </div>

        {/* ---------- Legal ---------- */}
        <div className="mt-16 border-t border-line-invert pt-8">
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
