import type { FounderSectionEntry } from "@/lib/founder-section/founder-section.types";

import { FounderSectionEditor } from "./FounderSectionEditor";

type FounderSectionProps = {
  initial: FounderSectionEntry;
};

export function FounderSection({ initial }: FounderSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-sm sm:p-8">
      <div className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          Founder &amp; Lead CAD Engineer
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
          Section content
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Manage the founder&apos;s name, bio text, and portrait photo. Use the framing controls to
          adjust image position and zoom — changes apply to the live site on save.
        </p>
      </div>

      <div className="mt-8">
        <FounderSectionEditor initial={initial} />
      </div>
    </section>
  );
}
