import { LANDING_SECTION_IDS } from "@/constants";
import { QuoteForm } from "@/components/quote-form/QuoteForm";

export function SectionQuote() {
  return (
    <section
      id={LANDING_SECTION_IDS.QUOTE}
      className="bg-white px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="quote-heading"
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-center font-bold uppercase tracking-[0.2em] text-[#c69f58] text-[10px]">
          Inquiry
        </p>
        <h2
          id="quote-heading"
          className="mt-2 text-center font-extrabold leading-tight tracking-[-0.025em] text-[#181610] text-[clamp(2rem,5vw,48px)]"
        >
          Submit Project
        </h2>
        <p className="mt-4 text-center font-light text-[var(--foreground)]/50 text-[20px]">
          Start your next engineering project with precision.
        </p>
        <div className="mt-12">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
