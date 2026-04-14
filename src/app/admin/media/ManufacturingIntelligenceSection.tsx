import type { ManufacturingIntelligenceCopyEntry } from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-copy.types";

import { ManufacturingIntelligenceCopyEditor } from "./ManufacturingIntelligenceCopyEditor";

type ManufacturingIntelligenceSectionProps = {
  initial: ManufacturingIntelligenceCopyEntry;
};

export function ManufacturingIntelligenceSection({
  initial,
}: ManufacturingIntelligenceSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-sm sm:p-8">
      <div className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          Manufacturing Intelligence
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
          Section content
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Manage the heading and optional intro copy for the Manufacturing Intelligence block. This
          is the same section visitors see on the homepage below Modeling Specialization.
        </p>
      </div>

      <div className="mt-8">
        <ManufacturingIntelligenceCopyEditor initial={initial} />
      </div>
    </section>
  );
}
