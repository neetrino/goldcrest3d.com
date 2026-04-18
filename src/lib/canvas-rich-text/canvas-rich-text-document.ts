import { z } from "zod";

import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";

const MAX_DOC_JSON_CHARS = 80000;

export const CANVAS_RICH_TEXT_DOC_VERSION = 1;

export const canvasRichTextDocumentSchema = z.object({
  version: z.literal(CANVAS_RICH_TEXT_DOC_VERSION),
  html: z.string(),
});

export type CanvasRichTextDocument = z.infer<typeof canvasRichTextDocumentSchema>;

function normalizeHtml(html: string): string {
  return finalizeHeroBannerBodyHtml(html);
}

export function createCanvasRichTextDocumentFromHtml(html: string): CanvasRichTextDocument {
  return {
    version: CANVAS_RICH_TEXT_DOC_VERSION,
    html: normalizeHtml(html),
  };
}

export function parseCanvasRichTextDocumentJson(raw: string): CanvasRichTextDocument | null {
  const trimmed = raw.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_DOC_JSON_CHARS) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(trimmed);
    const validated = canvasRichTextDocumentSchema.safeParse(parsed);
    if (!validated.success) {
      return null;
    }
    return createCanvasRichTextDocumentFromHtml(validated.data.html);
  } catch {
    return null;
  }
}

export function serializeCanvasRichTextDocument(doc: CanvasRichTextDocument): string {
  return JSON.stringify(createCanvasRichTextDocumentFromHtml(doc.html));
}

export function canvasRichTextDocumentToHtml(doc: CanvasRichTextDocument): string {
  return normalizeHtml(doc.html);
}

export function htmlToCanvasRichTextDocument(html: string): CanvasRichTextDocument {
  return createCanvasRichTextDocumentFromHtml(html);
}

