function normalizeMultilineValue(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

export function splitMultilineText(text: string): string[] {
  return normalizeMultilineValue(text)
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function splitMultilineTextPreservingLines(text: string): string[] {
  const normalized = normalizeMultilineValue(text).trim();
  if (normalized.length === 0) {
    return [];
  }
  return normalized.split("\n");
}

/** Desktop hero modeling title: non-empty lines joined with spaces (admin may use multiple lines). */
export function resolveModelingTitleDesktop(title: string): string {
  return splitMultilineText(title).join(" ");
}

export function resolveRenderingSubtitleDesktop(body: string): {
  line1: string;
  line2: string;
} {
  const parts = splitMultilineText(body);
  if (parts.length === 0) return { line1: "", line2: "" };
  if (parts.length === 1) return { line1: parts[0], line2: "" };
  return {
    line1: parts[0],
    line2: parts.slice(1).join(" "),
  };
}

export function resolveDesignSubtitleDisplay(body: string): {
  line1: string;
  line2: string;
} {
  const parts = splitMultilineText(body);
  if (parts.length === 0) return { line1: "", line2: "" };
  if (parts.length === 1) return { line1: parts[0], line2: "" };
  return { line1: parts[0], line2: parts.slice(1).join(" ") };
}
