import Link from "next/link";
import { Wordmark } from "@/components/ui/Bits";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { site } from "@/content/site";

const columns = [
  {
    heading: "What we do",
    links: services.map((service) => ({ label: service.name, href: "/what-we-do" })),
  },
  {
    heading: "Industries",
    links: industries.map((industry) => ({ label: industry.name, href: "/industries" })),
  },
  {
    heading: "Firm",
    links: [
      { label: "About us", href: "/about" },
      { label: "The Envision Method", href: "/method" },
      { label: "Leadership", href: "/about#leadership" },
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
          <div className="lg:col-span-3">
            <Wordmark invert />
            <p className="mt-5 max-w-[16rem] font-display text-[1.0625rem] leading-snug text-white/75 italic">
              {site.philosophy}
            </p>
            <p className="mt-5 max-w-[16rem] text-[0.8125rem] leading-relaxed text-white/45">
              {site.descriptor} — {site.location}, advising across {site.region}.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:col-start-5">
            {columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="text-meta border-b border-line-invert pb-3 text-on-navy">
                  {column.heading}
                </h2>
                <ul className="mt-4 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="link-draw text-[0.8125rem] text-white/55 transition-colors duration-300 hover:text-white"
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
        <div className="mt-14 border-t border-line-invert-soft pt-8">
          <p className="max-w-3xl text-[0.75rem] leading-relaxed text-white/40">
            {site.disclaimer}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[0.66rem] tracking-[0.06em] text-white/35">
              © {new Date().getFullYear()} {site.name}
            </p>
            <p className="text-meta text-on-navy/60">
              PROTOTYPE — CONTENT PENDING VERIFICATION
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
