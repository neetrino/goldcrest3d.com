import {
  canvasRichTextDocumentToHtml,
  htmlToCanvasRichTextDocument,
} from "@/lib/canvas-rich-text/canvas-rich-text-document";

type HeroBannerBodyRichTextProps = {
  body: string;
  className?: string;
};

/**
 * Renders admin-authored hero description HTML with the same sanitization used when saving.
 */
export function HeroBannerBodyRichText({ body, className }: HeroBannerBodyRichTextProps) {
  const html = canvasRichTextDocumentToHtml(htmlToCanvasRichTextDocument(body));
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
