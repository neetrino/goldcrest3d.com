import { describe, expect, it } from "vitest";

import {
  canvasRichTextDocumentToHtml,
  createCanvasRichTextDocumentFromHtml,
  parseCanvasRichTextDocumentJson,
  serializeCanvasRichTextDocument,
} from "./canvas-rich-text-document";

describe("canvas rich text document", () => {
  it("normalizes html when creating document", () => {
    const doc = createCanvasRichTextDocumentFromHtml("<p>Hello</p><script>alert(1)</script>");
    expect(doc.version).toBe(1);
    expect(doc.html).toContain("<p>Hello</p>");
    expect(doc.html).not.toContain("script");
  });

  it("round-trips through json serialization", () => {
    const doc = createCanvasRichTextDocumentFromHtml("<p>Text <strong>bold</strong></p>");
    const json = serializeCanvasRichTextDocument(doc);
    const parsed = parseCanvasRichTextDocumentJson(json);
    expect(parsed).not.toBeNull();
    expect(parsed?.html).toBe(doc.html);
  });

  it("rejects invalid json payload", () => {
    const parsed = parseCanvasRichTextDocumentJson('{"version":2,"html":"<p>x</p>"}');
    expect(parsed).toBeNull();
  });

  it("renders safe html from document", () => {
    const doc = createCanvasRichTextDocumentFromHtml("<p><img src=x />Safe</p>");
    const html = canvasRichTextDocumentToHtml(doc);
    expect(html).toContain("Safe");
    expect(html).not.toContain("<img");
  });
});

