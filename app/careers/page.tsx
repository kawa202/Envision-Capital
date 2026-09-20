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
          <p className="mt-6 text-body text-muted">
            [OPEN ROLES REQUIRED] — This page is ready for live vacancies.
            Supply the role, the practice, the location and the closing date,
            and each one renders here with its own detail page.
          </p>

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

          <p className="mt-16 text-meta leading-relaxed text-muted">
            [CAREERS CONTENT REQUIRED] — Nothing on this page describes
            Envision&rsquo;s hiring process, benefits or team size. Those are
            facts about the firm and come from the firm.
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
