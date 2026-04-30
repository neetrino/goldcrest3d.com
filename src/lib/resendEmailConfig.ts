/**
 * Resend outbound identity: `from` and customer `replyTo` from env (with inbox default).
 */

const DEFAULT_FROM_DISPLAY_NAME = "GoldCrest";

const DEV_FALLBACK_FROM = `${DEFAULT_FROM_DISPLAY_NAME} <onboarding@resend.dev>`;

/**
 * When `RESEND_REPLY_TO_EMAILS` is unset or empty, customer-facing mail uses this Reply-To
 * so the mail client "Reply" targets the team inbox (independent of `RESEND_FROM_EMAIL`).
 */
const DEFAULT_CUSTOMER_REPLY_TO_EMAIL = "info@goldcrest3d.com";

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
 * Resend `replyTo` for customer-facing mail. Uses `RESEND_REPLY_TO_EMAILS` when set;
 * otherwise `info@goldcrest3d.com` so "Reply" does not follow a legacy `From`.
 */
export function getCustomerReplyTo(): string | string[] {
  const list = parseResendReplyToList();
  if (list.length === 0) {
    return DEFAULT_CUSTOMER_REPLY_TO_EMAIL;
  }
  if (list.length === 1) {
    return list[0];
  }
  return list;
}
