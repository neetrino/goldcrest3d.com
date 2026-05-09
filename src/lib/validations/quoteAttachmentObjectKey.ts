import { R2_PREFIXES } from "@/constants";

/** Matches keys minted by `buildQuoteAttachmentObjectKey` in storage. */
const QUOTE_ATTACHMENT_KEY_REGEX = new RegExp(
  `^${R2_PREFIXES.QUOTES}/[0-9]+-[0-9a-f]{8}\\.[^/]+$`,
);

export function isValidQuoteAttachmentObjectKey(key: unknown): key is string {
  return typeof key === "string" && key.length < 512 && QUOTE_ATTACHMENT_KEY_REGEX.test(key);
}
