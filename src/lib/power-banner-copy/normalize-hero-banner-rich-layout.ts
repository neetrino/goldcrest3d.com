/** TinyMCE often splits when bolding the last word(s), producing a second `<p>` with only `<strong>…</strong>` — that renders on its own line. */
const SHORT_INLINE_STRONG_EM_MAX_CHARS = 64;

/**
 * Fixes common WYSIWYG artifacts so hero copy matches the editor intent (single flowing paragraph).
 */
export function normalizeHeroBannerRichLayout(html: string): string {
  let out = html;
  // Soft line break immediately before bold/emphasis — pulls the word onto the previous line
  out = out.replace(/<br\s*\/?>\s*(?=<(?:strong|em)\b)/gi, " ");
  const mergeSecond = new RegExp(
    `</p>\\s*<p[^>]*>\\s*<strong>([^<]{1,${String(SHORT_INLINE_STRONG_EM_MAX_CHARS)}})</strong>\\s*</p>`,
    "gi",
  );
  out = out.replace(mergeSecond, " <strong>$1</strong></p>");
  const mergeSecondEm = new RegExp(
    `</p>\\s*<p[^>]*>\\s*<em>([^<]{1,${String(SHORT_INLINE_STRONG_EM_MAX_CHARS)}})</em>\\s*</p>`,
    "gi",
  );
  out = out.replace(mergeSecondEm, " <em>$1</em></p>");
  return out;
}
