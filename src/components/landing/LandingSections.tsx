import { LANDING_SECTION_IDS } from "@/constants";

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
      <Section id={LANDING_SECTION_IDS.HERO} className="flex items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Goldcrest 3D
          </h1>
          <p className="mt-4 text-lg text-[var(--foreground)]/80">
            Մոդելավորում և արտադրություն
          </p>
          {/* 1.2 Power Banners / carousel will replace this */}
        </div>
      </Section>

      <Section id={LANDING_SECTION_IDS.PHILOSOPHY}>
        <h2 className="text-2xl font-semibold md:text-3xl">
          Goldcrest Engineering Philosophy
        </h2>
        <p className="mt-4 text-[var(--foreground)]/80">
          Բաժին — փիլիսոփայություն (1.3)
        </p>
      </Section>

      <Section id={LANDING_SECTION_IDS.SPECIALIZATIONS}>
        <h2 className="text-2xl font-semibold md:text-3xl">
          Modeling Specializations
        </h2>
        <p className="mt-4 text-[var(--foreground)]/80">
          Բաժին — մասնագիտացումներ (1.4)
        </p>
      </Section>

      <Section id={LANDING_SECTION_IDS.MANUFACTURING}>
        <h2 className="text-2xl font-semibold md:text-3xl">
          Manufacturing Intelligence
        </h2>
        <p className="mt-4 text-[var(--foreground)]/80">
          Բաժին — արտադրություն (1.5)
        </p>
      </Section>

      <Section id={LANDING_SECTION_IDS.FOUNDER}>
        <h2 className="text-2xl font-semibold md:text-3xl">
          Founder — Authority Block
        </h2>
        <p className="mt-4 text-[var(--foreground)]/80">
          Բաժին — հիմնադիր (1.6)
        </p>
      </Section>

      <Section id={LANDING_SECTION_IDS.PROCESS}>
        <h2 className="text-2xl font-semibold md:text-3xl">Process</h2>
        <p className="mt-4 text-[var(--foreground)]/80">
          Բաժին — գործընթաց (1.7)
        </p>
      </Section>

      <Section id={LANDING_SECTION_IDS.QUOTE}>
        <h2 className="text-2xl font-semibold md:text-3xl">Ուղարկել հայտ</h2>
        <p className="mt-4 text-[var(--foreground)]/80">
          Quote CTA — form-ը փուլ 2-ում (1.8)
        </p>
      </Section>

      <Section id={LANDING_SECTION_IDS.FOOTER} className="py-12">
        <footer className="border-t border-[var(--foreground)]/10 pt-8">
          <p className="text-sm text-[var(--foreground)]/70">
            Goldcrest 3D · Կապ (1.9 Footer)
          </p>
        </footer>
      </Section>
    </>
  );
}
