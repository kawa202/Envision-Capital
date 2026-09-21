import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { FOOTER_BLURB } from "@/content/home";
import { site } from "@/content/site";

/**
 * Footer from the design reference: the name and one line on the left, three
 * columns of links, and a bar with copyright and legal links. The reference's
 * in-page anchors are pointed at the real pages instead.
 */
const columns = [
  {
    heading: "Services",
    links: [
      { label: "Mergers & Acquisitions", href: "/services#mergers-acquisitions" },
      { label: "Capital Raising", href: "/services#capital-advisory" },
      { label: "Strategic Advisory", href: "/services#corporate-finance" },
      { label: "Restructuring", href: "/services#corporate-finance" },
    ],
  },
  {
    heading: "Firm",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Insights",
    links: [
      { label: "Market Outlook", href: "/insights?topic=Capital" },
      { label: "Transaction Advisory", href: "/insights?topic=Transactions" },
      { label: "Infrastructure", href: "/insights/financing-infrastructure" },
      { label: "All Insights", href: "/insights" },
    ],
  },
];

const legal = [
  { label: "Privacy Policy", href: "/legal#privacy" },
  { label: "Terms of Use", href: "/legal#terms" },
  { label: "Disclaimer", href: "/legal#regulatory" },
  { label: "Fraud Awareness", href: "/fraud-awareness" },
];

const linkClass =
  "inline-flex min-h-8 items-center text-on-navy transition-colors duration-300 hover:text-brass";

export function Footer() {
  return (
    <footer className="bg-navy px-[6%] pt-16 pb-8 text-[0.85rem] text-on-navy">
      <div className="mb-16 grid gap-8 md:grid-cols-2 md:gap-16 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Logo showMark={false} className="mb-4" />
          <p className="max-w-[300px] leading-[1.7]">{FOOTER_BLURB}</p>
        </div>

        {columns.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h2 className="mb-6 font-sans text-[0.9rem] font-semibold tracking-[0.5px] text-white">
              {column.heading}
            </h2>
            <ul className="space-y-1.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  {/* A site map, not the likely next click: no prefetch. */}
                  <Link href={link.href} prefetch={false} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-[0.75rem] md:flex-row md:text-left">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap justify-center gap-x-6">
          {legal.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                prefetch={false}
                className="inline-flex min-h-8 items-center text-on-navy transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
