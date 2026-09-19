import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { CredibilityStatement } from "@/components/sections/CredibilityStatement";
import { EditorialGallery } from "@/components/sections/EditorialGallery";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Leadership } from "@/components/sections/Leadership";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "About us",
  description:
    "A firm built on earned trust. Envision Capital advises — it does not take principal positions, manage funds or broker products. Harare, Zimbabwe, advising across the region.",
};

export default function AboutPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="About us"
        title="A firm built on earned trust."
        lede="We advise. We do not take principal positions, manage funds or broker products — and that clarity of purpose is what makes the counsel worth having."
      />
      <About />
      <Leadership />
      <EditorialGallery />
      <CredibilityStatement />
      <FinalCTA />
    </main>
  );
}
