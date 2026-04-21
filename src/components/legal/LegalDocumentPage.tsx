import type { LegalDocumentContent } from "@/lib/legal/legal-content.types";

type LegalDocumentPageProps = {
  content: LegalDocumentContent;
};

export function LegalDocumentPage({ content }: LegalDocumentPageProps) {
  return (
    <main className="bg-[#f8f7f6] px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {content.title}
          </h1>
        </header>

        <section className="space-y-4 text-slate-700">
          {content.introduction.map((paragraph) => (
            <p key={paragraph} className="leading-7">
              {paragraph}
            </p>
          ))}
        </section>

        <div className="mt-10 space-y-8">
          {content.sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-slate-700">
                  {paragraph}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="list-disc space-y-2 pl-6 text-slate-700">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="leading-7">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <footer className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-slate-700">
            For questions, contact us at{" "}
            <a
              href={`mailto:${content.contactEmail}`}
              className="font-medium text-slate-900 underline underline-offset-2 hover:text-slate-700"
            >
              {content.contactEmail}
            </a>
            .
          </p>
        </footer>
      </article>
    </main>
  );
}
