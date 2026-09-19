import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { PageHeader } from "@/components/sections/PageHeader";
import { caseStudies } from "@/content/caseStudies";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Outcomes that speak to our rigour — the structure of the mandates Envision Capital undertakes across transactions, capital and financial performance.",
};

export default function WorkIndexPage() {
  return (
    <main id="main">
      <PageHeader
        title="Outcomes that speak to our rigour."
        lede="Client identities remain confidential unless consent is given. Where a name cannot be used, the sector stands in its place."
      />

      <section className="section-y bg-paper" aria-label="All case studies">
        <div className="shell">
          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((item) => (
              <li key={item.slug} className="h-full">
                <CaseStudyCard caseStudy={item} size="small" />
              </li>
            ))}
          </ul>

          <p className="mt-14 border-t border-line pt-5 text-meta leading-relaxed text-muted">
            [CASE STUDY CONTENT REQUIRED] — Every entry above is an empty
            placeholder. No client, mandate or outcome shown here represents
            work Envision Capital has performed. Replace with verified,
            client-consented case studies before launch.
          </p>
        </div>
      </section>
    </main>
  );
}
