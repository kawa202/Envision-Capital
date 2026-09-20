import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { PortalDemo } from "@/components/portal/PortalDemo";

/**
 * Noindex on its own account as well as under the site-wide rule: a sign-in
 * page for a system that does not exist has no business in a search result.
 */
export const metadata: Metadata = {
  title: "Client portal",
  description:
    "A demonstration of the Envision Capital client portal. No account is checked and nothing is stored.",
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  return (
    <main id="main">
      <PageHeader
        title="Client portal."
        lede="Where a client sees their engagements, documents and next steps."
      />

      <section className="section-y bg-white">
        <div className="shell">
          <p className="measure text-meta text-ink">
            Demo — this portal authenticates nobody. It asks for no password,
            stores nothing and sends nothing.
          </p>
          <div className="mt-10">
            <PortalDemo />
          </div>
        </div>
      </section>
    </main>
  );
}
