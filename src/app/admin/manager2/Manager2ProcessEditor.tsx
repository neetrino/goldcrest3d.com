"use client";

import type { ManagedHomeBundle } from "@/lib/managed-home/managed-home-schemas";

type ProcessEditorProps = {
  value: ManagedHomeBundle["process"];
  onChange: (v: ManagedHomeBundle["process"]) => void;
  onSave: () => void;
  pending: boolean;
};

export function ProcessEditor({
  value,
  onChange,
  onSave,
  pending,
}: ProcessEditorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm">
        Heading
        <input
          value={value.heading}
          onChange={(e) => onChange({ ...value, heading: e.target.value })}
          className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
        />
      </label>
      {value.steps.map((step, idx) => (
        <div key={step.num} className="rounded-xl border border-slate-200 p-3">
          <p className="text-xs font-semibold text-slate-500">Step {step.num}</p>
          <input
            value={step.title}
            onChange={(e) => {
              const steps = [...value.steps];
              const s = steps[idx];
              if (!s) return;
              steps[idx] = { ...s, title: e.target.value };
              onChange({ ...value, steps });
            }}
            className="mt-2 w-full rounded border border-slate-200 px-2 py-1 text-sm"
          />
          <textarea
            value={step.description}
            onChange={(e) => {
              const steps = [...value.steps];
              const s = steps[idx];
              if (!s) return;
              steps[idx] = { ...s, description: e.target.value };
              onChange({ ...value, steps });
            }}
            rows={3}
            className="mt-2 w-full rounded border border-slate-200 px-2 py-1 text-sm"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={onSave}
        disabled={pending}
        className="rounded-lg bg-[#e2c481] px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save process"}
      </button>
    </div>
  );
}
