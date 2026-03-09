import { LANDING_SECTION_IDS } from "@/constants";
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
          Մենք հավատում ենք ճշգրտությանը, փոխզիջումից հրաժարվելուն և
          գաղափարից մինչև արտադրանք ամբողջ ցիկլի պատասխանատվությանը։ Յուրաքանչյուր
          նախագիծ — ինժեներական մոտեցում և արտադրական որակ։
        </p>
      </Section>

      <Section id={LANDING_SECTION_IDS.SPECIALIZATIONS}>
        <h2 className="text-2xl font-semibold md:text-3xl">
          Modeling Specializations
        </h2>
        <ul className="mt-6 grid gap-4 text-[var(--foreground)]/80 sm:grid-cols-2">
          <li>3D CAD մոդելավորում և օպտիմիզացիա</li>
          <li>Ռեվերս ինժեներինգ և ս캔ից մոդել</li>
          <li>Պրոտոտիպավորում և փորձնական շարքեր</li>
          <li>Մասնագիտացված ինժեներական լուծումներ</li>
        </ul>
      </Section>

      <Section id={LANDING_SECTION_IDS.MANUFACTURING}>
        <h2 className="text-2xl font-semibold md:text-3xl">
          Manufacturing Intelligence
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--foreground)]/80">
          Արտադրությունը ղեկավարվում է մոդելի և նյութի ընտրությամբ — CNC,
          ավելացնող տեխնոլոգիաներ, ճիշտ ճշգրտություն և ժամանակացույց։ Մենք
          ապահովում ենք կանխատեսելի արդյունք և թափանցիկ գործընթաց։
        </p>
      </Section>

      <Section id={LANDING_SECTION_IDS.FOUNDER}>
        <h2 className="text-2xl font-semibold md:text-3xl">
          Founder — Authority Block
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--foreground)]/80">
          Goldcrest 3D-ի հիմնադիրը բերում է ինժեներական և արտադրական փորձ,
          որպեսզի յուրաքանչյուր նախագիծ ստանա մասնագիտական մոտեցում և հուսալի
          արդյունք։
        </p>
      </Section>

      <Section id={LANDING_SECTION_IDS.PROCESS}>
        <h2 className="text-2xl font-semibold md:text-3xl">Process</h2>
        <ol className="mt-6 list-inside list-decimal space-y-2 text-[var(--foreground)]/80">
          <li>Հայտ / հարցում — դուք նկարագրում եք խնդիրը կամ գաղափարը</li>
          <li>Խորհրդատվություն — մենք որոշում ենք մոտեցումն ու նյութերը</li>
          <li>Մոդելավորում — CAD, revizii, հաստատում</li>
          <li>Արտադրություն — պատրաստի արտադրանք կամ փուլային առաքում</li>
        </ol>
      </Section>

      <Section id={LANDING_SECTION_IDS.QUOTE}>
        <h2 className="text-2xl font-semibold md:text-3xl">Ուղարկել հայտ</h2>
        <p className="mt-4 text-[var(--foreground)]/80">
          Ուզու՞մ եք քննարկել նախագիծը — լրացրեք հայտը, մենք կկապնվենք ձեզ հետ։
          Ձևը կհասանելի լինի հաջորդ փուլում։
        </p>
      </Section>

      <Section id={LANDING_SECTION_IDS.FOOTER} className="py-12">
        <footer className="border-t border-[var(--foreground)]/10 pt-8">
          <p className="text-sm text-[var(--foreground)]/70">
            Goldcrest 3D · Մոդելավորում և արտադրություն · Կապ
          </p>
        </footer>
      </Section>
    </>
  );
}
