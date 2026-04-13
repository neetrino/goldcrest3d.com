"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { POWER_BANNER_TINYMCE_SCRIPT_SRC } from "./power-banner-tinymce";

const TinyEditor = dynamic(
  () => import("@tinymce/tinymce-react").then((m) => m.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[320px] w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50/80 text-sm text-slate-500">
        Loading editor…
      </div>
    ),
  },
);

type PowerBannerDescriptionEditorProps = {
  id: string;
  /** Associates the visible title with the editor (TinyMCE loads async; avoid <label htmlFor> until the textarea exists). */
  ariaLabelledBy: string;
  value: string;
  onChange: (html: string) => void;
};

export function PowerBannerDescriptionEditor({
  id,
  ariaLabelledBy,
  value,
  onChange,
}: PowerBannerDescriptionEditorProps) {
  const init = useMemo(
    () => ({
      height: 320,
      menubar: "file edit view insert format tools help",
      plugins: [
        "advlist",
        "autolink",
        "lists",
        "searchreplace",
        "visualblocks",
        "help",
        "wordcount",
      ],
      toolbar:
        "undo redo | blocks | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | removeformat | help",
      toolbar_mode: "sliding" as const,
      branding: false,
      promotion: false,
      resize: true,
      statusbar: true,
      browser_spellcheck: true,
      block_formats: "Paragraph=p;",
      content_style: `
        body {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #0f172a;
          margin: 12px 14px;
        }
        p { margin: 0 0 0.75em 0; }
        p:last-child { margin-bottom: 0; }
      `,
    }),
    [],
  );

  return (
    <div
      className="power-banner-description-editor overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100 transition focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-slate-200/80"
      aria-labelledby={ariaLabelledBy}
    >
      <TinyEditor
        id={id}
        licenseKey="gpl"
        tinymceScriptSrc={POWER_BANNER_TINYMCE_SCRIPT_SRC}
        value={value}
        onEditorChange={(content) => onChange(content)}
        init={init}
      />
    </div>
  );
}
