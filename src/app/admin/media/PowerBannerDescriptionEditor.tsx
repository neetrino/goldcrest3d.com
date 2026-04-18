"use client";

import { useEffect, useState } from "react";

import { createCanvasRichTextDocumentFromHtml, serializeCanvasRichTextDocument } from "@/lib/canvas-rich-text/canvas-rich-text-document";

import { CanvasRichTextEditor } from "./CanvasRichTextEditor";

export type PowerBannerDescriptionEditorProps = {
  id: string;
  ariaLabelledBy: string;
  value: string;
  onChange: (html: string) => void;
  docFieldName?: string;
  editableClassName?: string;
  normalizeInput?: boolean;
};

export function PowerBannerDescriptionEditor({
  id,
  ariaLabelledBy,
  value,
  onChange,
  docFieldName = "bodyDoc",
  editableClassName,
  normalizeInput = true,
}: PowerBannerDescriptionEditorProps) {
  const [docJson, setDocJson] = useState(() =>
    serializeCanvasRichTextDocument(createCanvasRichTextDocumentFromHtml(value)),
  );

  useEffect(() => {
    setDocJson(serializeCanvasRichTextDocument(createCanvasRichTextDocumentFromHtml(value)));
  }, [value]);

  return (
    <>
      <input type="hidden" name={docFieldName} value={docJson} />
      <CanvasRichTextEditor
        id={id}
        ariaLabelledBy={ariaLabelledBy}
        value={value}
        onChange={onChange}
        onDocChange={setDocJson}
        editableClassName={editableClassName}
        normalizeInput={normalizeInput}
      />
    </>
  );
}
