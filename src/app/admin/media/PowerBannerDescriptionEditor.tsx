"use client";

import dynamic from "next/dynamic";
import type { Editor } from "tinymce";
import { useEffect, useMemo, useRef } from "react";

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

/** Shown only inside the TinyMCE iframe — does not change saved HTML (inline colors stay for the live site). */
const POWER_BANNER_DESCRIPTION_ADMIN_EDITOR_TEXT_COLOR = "#0f172a";

const POWER_BANNER_DESCRIPTION_CONTENT_STYLE = `
        body {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: ${POWER_BANNER_DESCRIPTION_ADMIN_EDITOR_TEXT_COLOR};
          margin: 12px 14px;
        }
        p { margin: 0 0 0.75em 0; }
        p:last-child { margin-bottom: 0; }
        /*
          Admin-only: force readable text in the editor. Saved markup still contains the real forecolor
          (e.g. white on the hero) — getContent() serializes inline styles, not this preview override.
          Selectors avoid matching "background-color" (which also contains "color" as a substring).
        */
        body.mce-content-body :is(span, p, li)[style^="color:"],
        body.mce-content-body :is(span, p, li)[style*="; color:"],
        body.mce-content-body :is(span, p, li)[style*=";color:"] {
          color: ${POWER_BANNER_DESCRIPTION_ADMIN_EDITOR_TEXT_COLOR} !important;
        }
      `;

const DESCRIPTION_EDITOR_STATIC_INIT = {
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
  content_style: POWER_BANNER_DESCRIPTION_CONTENT_STYLE,
};

type PowerBannerDescriptionEditorProps = {
  id: string;
  /** Associates the visible title with the editor (TinyMCE loads async; avoid <label htmlFor> until the textarea exists). */
  ariaLabelledBy: string;
  value: string;
  onChange: (html: string) => void;
};

function usePowerBannerDescriptionEditorInit(onChange: (html: string) => void) {
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  return useMemo(
    () => ({
      ...DESCRIPTION_EDITOR_STATIC_INIT,
      setup: (editor: Editor) => {
        const syncHtml = (): void => {
          onChangeRef.current(editor.getContent());
        };
        editor.on("ExecCommand", (e) => {
          if (
            e.command === "ForeColor" ||
            e.command === "HiliteColor" ||
            e.command === "BackColor"
          ) {
            queueMicrotask(syncHtml);
          }
        });
      },
    }),
    [],
  );
}

export function PowerBannerDescriptionEditor({
  id,
  ariaLabelledBy,
  value,
  onChange,
}: PowerBannerDescriptionEditorProps) {
  const init = usePowerBannerDescriptionEditorInit(onChange);

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
        /** Controlled mode: avoid rolling back when React state updates slightly after TinyMCE (e.g. color picker). */
        rollback={false}
        init={init}
      />
    </div>
  );
}
