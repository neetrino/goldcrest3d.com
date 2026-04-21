import Link from "next/link";

import type { LegalSection } from "@/lib/legal/legal-content.types";

type LegalDocumentPageProps = {
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
};

function renderSection(section: LegalSection) {
  return (
    <section key={section.title} className="space-y-3">
      <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="text-sm leading-7 text-slate-700 md:text-base">
          {paragraph}
        </p>
      ))}
      {section.bullets ? (
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 md:text-base">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function LegalDocumentPage({
  title,
  lastUpdated,
  intro,
  sections,
}: LegalDocumentPageProps) {
  return (
    <main className="min-h-screen bg-[#f8f7f6] px-4 py-12 sm:px-6 md:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-6">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Back to Home
          </Link>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Last updated: {lastUpdated}
          </p>
        </div>

        <header className="mb-10 space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
          {intro.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-7 text-slate-700 md:text-base">
              {paragraph}
            </p>
          ))}
        </header>

        <div className="space-y-8">{sections.map((section) => renderSection(section))}</div>
      </div>
    </main>
  );
}
