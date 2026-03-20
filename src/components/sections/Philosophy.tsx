import { SectionContainer } from "./SectionContainer";

export function Philosophy() {
  return (
    <SectionContainer className="bg-[var(--color-bg-philosophy)]">
      <div className="container-narrow mx-auto max-w-4xl text-center">
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">
          <span className="text-[var(--color-primary-light)] font-normal">
            Goldcrest Engineering{" "}
          </span>
          <span className="text-[var(--color-charcoal)]">Philosophy</span>
        </h2>
        <blockquote className="mt-8 text-[clamp(1.125rem,2vw,1.5rem)] leading-relaxed text-[var(--color-charcoal-soft)] font-light italic">
          &ldquo;We design with manufacturing awareness. We engineer with
          structural responsibility. We eliminate risks at the digital stage.
          <br />
          <br />
          <cite className="not-italic text-[var(--color-charcoal)]">
            Precision is not optional. It is the standard
          </cite>
          .&rdquo;
        </blockquote>
      </div>
    </SectionContainer>
  );
}
