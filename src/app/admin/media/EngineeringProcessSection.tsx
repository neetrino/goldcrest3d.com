import type { EngineeringProcessCopyEntry } from "@/lib/engineering-process-copy/engineering-process-copy.types";

import { EngineeringProcessEditor } from "./EngineeringProcessEditor";

type EngineeringProcessSectionProps = {
  initial: EngineeringProcessCopyEntry;
};

export function EngineeringProcessSection({ initial }: EngineeringProcessSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-sm sm:p-8">
      <div className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          Our Engineering Process
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
          Section content
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Edit the process section title and each step text displayed on the homepage. You can
          leave any field empty and still save successfully.
        </p>
      </div>

      <div className="mt-8">
        <EngineeringProcessEditor initial={initial} />
      </div>
    </section>
  );
}

