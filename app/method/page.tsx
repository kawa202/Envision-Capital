import type { Metadata } from "next";
import { EnvisionMethod } from "@/components/sections/EnvisionMethod";
import { CredibilityStatement } from "@/components/sections/CredibilityStatement";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "The Envision Method",
  description:
    "Diagnose, Architect, Validate, Transform, Mobilise, Sustain — the disciplined sequence every Envision Capital mandate runs.",
};

export default function MethodPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="The Envision Method"
        title="Six stages, in sequence."
        lede="Every mandate runs the same disciplined sequence. It is how we make sure a conclusion still holds once someone sets out to dismantle it."
      />
      <EnvisionMethod />
      <CredibilityStatement />
      <FinalCTA />
    </main>
  );
}
