import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Working at Envision Capital — corporate finance and advisory in Harare, Zimbabwe.",
};

/**
 * Placeholder.
 *
 * A careers page makes claims about a firm that only the firm can make: what
 * it is like to work there, what it is hiring for, what it pays attention to
 * in a candidate. None of that has been supplied, so the page holds its
 * structure and says plainly that the content is outstanding.
 */
export default function CareersPage() {
  return (
    <main id="main">
      <PageHeader
        title="Work that has to hold up."
        lede="Advisory work carries the name of whoever gives it. That shapes who we look for."
      />

      <section className="section-y bg-white">
        <div className="shell measure">
          <h2 className="text-display-m text-navy">Open roles</h2>
          <ul className="mt-6 border-t border-line">
            {[
              {
                title: "Analyst, Corporate Finance",
                meta: "Transactions & Capital · Harare",
                body: "Build financial models, prepare information memoranda and support capital raises and valuations from first draft to close.",
              },
              {
                title: "Associate, Finance & Performance",
                meta: "Finance & Performance · Harare",
                body: "Lead reporting and virtual CFO engagements, working directly with client finance teams and boards.",
              },
            ].map((role) => (
              <li key={role.title} className="border-b border-line py-6">
                <h3 className="text-[1.25rem] leading-normal">{role.title}</h3>
                <p className="mt-1 text-meta text-muted">{role.meta}</p>
                <p className="mt-3 text-body text-muted">{role.body}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 text-display-m text-navy">
            Speculative applications
          </h2>
          <p className="mt-6 text-body text-muted">
            We read every approach from people whose work would stand up in
            front of a board. Write to us with what you have done and the kind
            of mandate you want to be part of.
          </p>
          <p className="mt-6">
            <a
              href={`mailto:${site.contact.email}`}
              className="link-inline inline-flex min-h-11 items-center"
            >
              {site.contact.email}
            </a>
          </p>

          <p className="mt-10">
            <Link
              href="/about"
              className="link-inline inline-flex min-h-11 items-center"
            >
              About Envision
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
