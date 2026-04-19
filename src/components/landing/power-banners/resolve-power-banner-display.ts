export function splitMultilineText(text: string): string[] {
  return text
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function resolveModelingTitleDesktop(title: string): string {
  return splitMultilineText(title).join(" ");
}

export function resolveModelingBodyDesktop(body: string): string {
  return splitMultilineText(body).join(" ");
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
