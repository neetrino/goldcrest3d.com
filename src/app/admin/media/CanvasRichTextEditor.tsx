"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import {
  createCanvasRichTextDocumentFromHtml,
  serializeCanvasRichTextDocument,
} from "@/lib/canvas-rich-text/canvas-rich-text-document";

type CanvasRichTextEditorProps = {
  id: string;
  ariaLabelledBy: string;
  value: string;
  onChange: (html: string) => void;
  onDocChange?: (json: string) => void;
  visualLayout?: ReactNode;
  editableClassName?: string;
  normalizeInput?: boolean;
};

type CommandButtonProps = {
  label: string;
  command: string;
  value?: string;
};

function useExecCommand() {
  return (command: string, value?: string): void => {
    if (typeof document === "undefined") return;
    document.execCommand(command, false, value);
  };
}

function CommandButton({ label, command, value }: CommandButtonProps) {
  const runCommand = useExecCommand();
  return (
    <button
      type="button"
      onClick={() => runCommand(command, value)}
      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
    >
      {label}
    </button>
  );
}

function Toolbar({ onColorPick, onBackgroundPick }: { onColorPick: (v: string) => void; onBackgroundPick: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 px-2 py-2">
      <CommandButton label="B" command="bold" />
      <CommandButton label="I" command="italic" />
      <CommandButton label="U" command="underline" />
      <CommandButton label="UL" command="insertUnorderedList" />
      <CommandButton label="OL" command="insertOrderedList" />
      <CommandButton label="Left" command="justifyLeft" />
      <CommandButton label="Center" command="justifyCenter" />
      <CommandButton label="Right" command="justifyRight" />
      <CommandButton label="Clear" command="removeFormat" />
      <label className="ml-2 inline-flex items-center gap-1 text-xs text-slate-600">
        Text
        <input
          type="color"
          onChange={(e) => onColorPick(e.target.value)}
          className="h-6 w-8 cursor-pointer rounded border border-slate-300 bg-white p-0"
          aria-label="Text color"
        />
      </label>
      <label className="inline-flex items-center gap-1 text-xs text-slate-600">
        Bg
        <input
          type="color"
          onChange={(e) => onBackgroundPick(e.target.value)}
          className="h-6 w-8 cursor-pointer rounded border border-slate-300 bg-white p-0"
          aria-label="Background color"
        />
      </label>
    </div>
  );
}

export function CanvasRichTextEditor({
  id,
  ariaLabelledBy,
  value,
  onChange,
  onDocChange,
  visualLayout,
  editableClassName,
  normalizeInput = true,
}: CanvasRichTextEditorProps) {
  const editableRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<"text" | "visual">("text");
  const hasVisual = Boolean(visualLayout);
  const runCommand = useExecCommand();

  const editorValue = useMemo(
    () => (normalizeInput ? createCanvasRichTextDocumentFromHtml(value).html : value),
    [normalizeInput, value],
  );

  useEffect(() => {
    const el = editableRef.current;
    if (!el) return;
    if (el.innerHTML !== editorValue) {
      el.innerHTML = editorValue;
    }
  }, [editorValue]);

  const syncFromEditor = (): void => {
    const rawHtml = editableRef.current?.innerHTML ?? "";
    const nextHtml = normalizeInput ? createCanvasRichTextDocumentFromHtml(rawHtml).html : rawHtml;
    onChange(nextHtml);
    onDocChange?.(serializeCanvasRichTextDocument(createCanvasRichTextDocumentFromHtml(nextHtml)));
  };

  return (
    <div
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100 transition focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-slate-200/80"
      aria-labelledby={ariaLabelledBy}
    >
      {hasVisual ? (
        <div className="flex gap-1 border-b border-slate-200 bg-white px-2 py-2">
          <button
            type="button"
            onClick={() => setMode("text")}
            className={`rounded-md px-2 py-1 text-xs font-medium ${mode === "text" ? "bg-slate-900 text-white" : "border border-slate-300 text-slate-700"}`}
          >
            Rich text
          </button>
          <button
            type="button"
            onClick={() => setMode("visual")}
            className={`rounded-md px-2 py-1 text-xs font-medium ${mode === "visual" ? "bg-slate-900 text-white" : "border border-slate-300 text-slate-700"}`}
          >
            Visual layout
          </button>
        </div>
      ) : null}

      {mode === "visual" && visualLayout ? (
        <div className="bg-slate-50 p-3">{visualLayout}</div>
      ) : (
        <>
          <Toolbar
            onColorPick={(color) => runCommand("foreColor", color)}
            onBackgroundPick={(color) => runCommand("hiliteColor", color)}
          />
          <div
            id={id}
            ref={editableRef}
            className={`min-h-[320px] w-full px-4 py-3 text-sm leading-6 text-slate-900 outline-none ${
              editableClassName ?? "whitespace-pre-wrap"
            }`}
            contentEditable
            suppressContentEditableWarning
            onInput={syncFromEditor}
            onBlur={syncFromEditor}
            data-testid={`${id}-canvas-editor`}
          />
        </>
      )}
    </div>
  );
}

