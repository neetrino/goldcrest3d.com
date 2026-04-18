import { createCanvasRichTextDocumentFromHtml, parseCanvasRichTextDocumentJson } from "./canvas-rich-text-document";

type CanvasRichTextInput = {
  html: string;
  docJson?: string | null;
};

export function extractCanvasRichTextHtml(input: CanvasRichTextInput): string {
  const parsedDoc = input.docJson ? parseCanvasRichTextDocumentJson(input.docJson) : null;
  if (parsedDoc) {
    return parsedDoc.html;
  }
  return createCanvasRichTextDocumentFromHtml(input.html).html;
}

