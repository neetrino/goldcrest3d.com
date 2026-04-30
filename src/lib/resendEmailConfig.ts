/**
 * Resend outbound identity: `from` and default customer `replyTo` from env.
 */

import { logger } from "@/lib/logger";

const DEFAULT_FROM_DISPLAY_NAME = "GoldCrest";

const DEV_FALLBACK_FROM = `${DEFAULT_FROM_DISPLAY_NAME} <onboarding@resend.dev>`;

let warnedMissingReplyTo = false;

/** Resend `from`: use full "Name <addr>" from env, or wrap plain email with display name. */
export function getResendFromHeader(): string {
  const raw = process.env.RESEND_FROM_EMAIL?.trim();
  if (!raw) {
    return DEV_FALLBACK_FROM;
  }
  if (raw.includes("<") && raw.includes(">")) {
    return raw;
  }
  return `${DEFAULT_FROM_DISPLAY_NAME} <${raw}>`;
}

/** Parses `RESEND_REPLY_TO_EMAILS` (comma-separated, trimmed, empty segments dropped). */
export function parseResendReplyToList(): string[] {
  const raw = process.env.RESEND_REPLY_TO_EMAILS?.trim();
  if (!raw) {
    return [];
  }
  return raw
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

/**
 * Resend `replyTo` for customer-facing mail. Omit when env has no addresses
 * (email still sends; clients typically reply to From).
 */
export function getCustomerReplyTo(): string | string[] | undefined {
  const list = parseResendReplyToList();
  if (list.length === 0) {
    if (process.env.NODE_ENV === "development" && !warnedMissingReplyTo) {
      warnedMissingReplyTo = true;
      logger.info(
        "Resend: RESEND_REPLY_TO_EMAILS is unset; customer emails are sent without an explicit Reply-To header. Set RESEND_REPLY_TO_EMAILS (comma-separated) so replies go to the intended inboxes.",
      );
    }
    return undefined;
  }
  if (list.length === 1) {
    return list[0];
  }
  return list;
}
