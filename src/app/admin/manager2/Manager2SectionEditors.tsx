"use client";

import type { ManagedHomeBundle } from "@/lib/managed-home/managed-home-schemas";

type PhilosophyEditorProps = {
  value: ManagedHomeBundle["philosophy"];
  onChange: (v: ManagedHomeBundle["philosophy"]) => void;
  onSave: () => void;
  pending: boolean;
};

export function PhilosophyEditor({
  value,
  onChange,
  onSave,
  pending,
}: PhilosophyEditorProps) {
  return (
    <div className="space-y-3">
      {(
        ["goldcrest", "engineering", "philosophy"] as const
      ).map((k) => (
        <label key={k} className="block text-sm">
          <span className="text-slate-600">{k}</span>
          <input
            value={value[k]}
            onChange={(e) => onChange({ ...value, [k]: e.target.value })}
            className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
          />
        </label>
      ))}
      <label className="block text-sm">
        Quote lines (one per line)
        <textarea
          value={value.quoteLines.join("\n")}
          onChange={(e) =>
            onChange({
              ...value,
              quoteLines: e.target.value.split("\n").filter(Boolean),
            })
          }
          rows={5}
          className="mt-1 w-full rounded border border-slate-200 px-2 py-1 font-mono text-sm"
        />
      </label>
      <label className="block text-sm">
        Emphasis
        <input
          value={value.emphasis}
          onChange={(e) => onChange({ ...value, emphasis: e.target.value })}
          className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
        />
      </label>
      <button
        type="button"
        onClick={onSave}
        disabled={pending}
        className="rounded-lg bg-[#e2c481] px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save philosophy"}
      </button>
    </div>
  );
}

type ModelingEditorProps = {
  value: ManagedHomeBundle["modeling"];
  onChange: (v: ManagedHomeBundle["modeling"]) => void;
  onSave: () => void;
  pending: boolean;
};

export function ModelingEditor({
  value,
  onChange,
  onSave,
  pending,
}: ModelingEditorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm">
        Section title
        <input
          value={value.sectionTitle}
          onChange={(e) =>
            onChange({ ...value, sectionTitle: e.target.value })
          }
          className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
        />
      </label>
      <p className="text-xs text-slate-500">
        Card copy overrides for Hip-Hop, Bridal, and Portrait — use Media Manager for
        images. Advanced JSON for all cards can be added via API later.
      </p>
      <button
        type="button"
        onClick={onSave}
        disabled={pending}
        className="rounded-lg bg-[#e2c481] px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save modeling"}
      </button>
    </div>
  );
}

type ManufacturingEditorProps = {
  value: ManagedHomeBundle["manufacturing"];
  onChange: (v: ManagedHomeBundle["manufacturing"]) => void;
  onSave: () => void;
  pending: boolean;
};

export function ManufacturingEditor({
  value,
  onChange,
  onSave,
  pending,
}: ManufacturingEditorProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm">
        Section title
        <input
          value={value.sectionTitle}
          onChange={(e) =>
            onChange({ ...value, sectionTitle: e.target.value })
          }
          className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
        />
      </label>
      <div className="space-y-4">
        {value.items.map((item, idx) => (
          <div
            key={item.id}
            className="rounded-lg border border-slate-200 p-3"
          >
            <p className="text-xs font-mono text-slate-500">{item.id}</p>
            <label className="mt-2 block text-sm">
              Title
              <input
                value={item.title}
                onChange={(e) => {
                  const items = [...value.items];
                  const row = items[idx];
                  if (!row) return;
                  items[idx] = { ...row, title: e.target.value };
                  onChange({ ...value, items });
                }}
                className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
              />
            </label>
            <label className="mt-2 block text-sm">
              Description
              <textarea
                value={item.description ?? ""}
                onChange={(e) => {
                  const items = [...value.items];
                  const row = items[idx];
                  if (!row) return;
                  items[idx] = { ...row, description: e.target.value };
                  onChange({ ...value, items });
                }}
                rows={4}
                className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
              />
            </label>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onSave}
        disabled={pending}
        className="rounded-lg bg-[#e2c481] px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save manufacturing"}
      </button>
    </div>
  );
}

type FounderEditorProps = {
  value: ManagedHomeBundle["founder"];
  onChange: (v: ManagedHomeBundle["founder"]) => void;
  onSave: () => void;
  pending: boolean;
};

export function FounderEditor({
  value,
  onChange,
  onSave,
  pending,
}: FounderEditorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm">
        Section heading
        <input
          value={value.sectionHeading}
          onChange={(e) =>
            onChange({ ...value, sectionHeading: e.target.value })
          }
          className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
        />
      </label>
      <label className="block text-sm">
        Name
        <input
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
        />
      </label>
      <label className="block text-sm">
        Bio (mobile — paragraphs, one per line)
        <textarea
          value={value.bioMobileParagraphs.join("\n\n")}
          onChange={(e) =>
            onChange({
              ...value,
              bioMobileParagraphs: e.target.value
                .split(/\n\n+/)
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
          rows={8}
          className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
        />
      </label>
      <label className="block text-sm">
        Bio desktop block 1
        <textarea
          value={value.bioDesktopBlock1}
          onChange={(e) =>
            onChange({ ...value, bioDesktopBlock1: e.target.value })
          }
          rows={5}
          className="mt-1 w-full rounded border border-slate-200 px-2 py-1 font-mono text-xs"
        />
      </label>
      <label className="block text-sm">
        Bio desktop block 2
        <textarea
          value={value.bioDesktopBlock2}
          onChange={(e) =>
            onChange({ ...value, bioDesktopBlock2: e.target.value })
          }
          rows={5}
          className="mt-1 w-full rounded border border-slate-200 px-2 py-1 font-mono text-xs"
        />
      </label>
      <button
        type="button"
        onClick={onSave}
        disabled={pending}
        className="rounded-lg bg-[#e2c481] px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save founder"}
      </button>
    </div>
  );
}
