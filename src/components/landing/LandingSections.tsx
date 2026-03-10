import { LANDING_SECTION_IDS } from "@/constants";
import { QuoteForm } from "@/components/quote-form/QuoteForm";
import { PowerBanners } from "./PowerBanners";

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`min-h-[50vh] px-4 py-16 md:px-6 md:py-24 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function LandingSections() {
  return (
    <>
      <PowerBanners />

      <Section id={LANDING_SECTION_IDS.PHILOSOPHY}>
        <h2 className="text-2xl font-semibold md:text-3xl">
          Goldcrest Engineering Philosophy
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--foreground)]/80">
          We believe in precision, no compromise, and full responsibility from
          idea to product. Every project gets an engineering approach and
          production quality.
        </p>
      </Section>

      <Section id={LANDING_SECTION_IDS.SPECIALIZATIONS}>
        <h2 className="text-2xl font-semibold md:text-3xl">
          Modeling Specializations
        </h2>
        <ul className="mt-6 grid gap-4 text-[var(--foreground)]/80 sm:grid-cols-2">
          <li>3D CAD modelling and optimisation</li>
          <li>Reverse engineering and scan-to-model</li>
          <li>Prototyping and pilot runs</li>
          <li>Specialised engineering solutions</li>
        </ul>
      </Section>

      <Section id={LANDING_SECTION_IDS.MANUFACTURING}>
        <h2 className="text-2xl font-semibold md:text-3xl">
          Manufacturing Intelligence
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--foreground)]/80">
          Manufacturing is driven by model and material choice — CNC, additive
          technologies, precise tolerances and scheduling. We deliver
          predictable results and a transparent process.
        </p>
      </Section>

      <Section id={LANDING_SECTION_IDS.FOUNDER}>
        <h2 className="text-2xl font-semibold md:text-3xl">
          Founder — Authority Block
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--foreground)]/80">
          The founder of Goldcrest 3D brings engineering and manufacturing
          experience so every project gets a professional approach and reliable
          results.
        </p>
      </Section>

      <Section id={LANDING_SECTION_IDS.PROCESS}>
        <h2 className="text-2xl font-semibold md:text-3xl">Process</h2>
        <ol className="mt-6 list-inside list-decimal space-y-2 text-[var(--foreground)]/80">
          <li>Request / enquiry — you describe the problem or idea</li>
          <li>Consultation — we define approach and materials</li>
          <li>Modelling — CAD, revisions, approval</li>
          <li>Manufacturing — finished product or phased delivery</li>
        </ol>
      </Section>

      <Section id={LANDING_SECTION_IDS.QUOTE}>
        <h2 className="text-2xl font-semibold md:text-3xl">Send a request</h2>
        <p className="mt-4 text-[var(--foreground)]/80">
          Want to discuss a project? Fill in the form and we will get back to you.
        </p>
        <QuoteForm />
      </Section>

      <Section id={LANDING_SECTION_IDS.FOOTER} className="py-12">
        <footer className="border-t border-[var(--foreground)]/10 pt-8">
          <p className="text-sm text-[var(--foreground)]/70">
            Goldcrest 3D · Modelling and manufacturing · Contact
          </p>
        </footer>
      </Section>
    </>
  );
}
