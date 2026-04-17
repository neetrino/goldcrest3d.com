/**
 * Renders CMS copy with real line breaks (\\n) on the public site and in admin preview.
 */
export function ModelingPlainText({ text }: { text: string }) {
  if (!text.includes("\n")) {
    return text;
  }
  return <span className="whitespace-pre-line">{text}</span>;
}
