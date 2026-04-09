/**
 * Resend — reply to leads, payment link email.
 */

import { type Attachment, Resend } from "resend";

import {
  LEAD_REPLY_LOGO_CONTENT_ID,
  LEAD_REPLY_LOGO_PATH,
  loadLeadReplyLogoAttachment,
} from "@/lib/emailLeadReplyLogo";

const FROM_DISPLAY_NAME = "Goldcrest 3D";

/** Email template — dark header matches `public/images/email-logo-mark.png` (gold on black). */
const EMAIL_HEADER_BG = "#000000";
const EMAIL_HEADER_MUTED = "#94a3b8";
const EMAIL_BODY_TEXT = "#334155";
const EMAIL_FOOTER_BG = "#f8fafc";
const EMAIL_FOOTER_TEXT = "#64748b";
const EMAIL_ACCENT = "#b45309";

const apiKey = process.env.RESEND_API_KEY;

/** Resend `from`: verified domain address, optionally "Name <addr>" if already in env. */
function getFromHeader(): string {
  const raw = process.env.RESEND_FROM_EMAIL?.trim();
  if (!raw) {
    return `${FROM_DISPLAY_NAME} <onboarding@resend.dev>`;
  }
  if (raw.includes("<") && raw.includes(">")) {
    return raw;
  }
  return `${FROM_DISPLAY_NAME} <${raw}>`;
}

const resend = apiKey ? new Resend(apiKey) : null;

export type SendEmailResult =
  | { success: true; id?: string }
  | { success: false; error: string };

/**
 * Sends a plain text/HTML email. Returns success or error message.
 */
export async function sendEmail({
  to,
  subject,
  text,
  html,
  attachments,
}: {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: Attachment[];
}): Promise<SendEmailResult> {
  if (!resend) {
    return { success: false, error: "Email is not configured (RESEND_API_KEY)." };
  }
  const toList = Array.isArray(to) ? to : [to];
  if (toList.length === 0) {
    return { success: false, error: "No recipient address." };
  }
  const htmlContent = html ?? (text ? escapeHtml(text).replace(/\n/g, "<br>") : "<p></p>");
  const textContent = text ?? (html ? stripHtml(html) : "");

  try {
    const { data, error } = await resend.emails.send({
      from: getFromHeader(),
      to: toList,
      subject,
      text: textContent,
      html: htmlContent,
      ...(attachments?.length ? { attachments } : {}),
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, id: data?.id };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Email could not be sent.";
    return { success: false, error: message };
  }
}

/**
 * Notifies admin about a new quote/lead (optional: set ADMIN_NOTIFY_EMAIL in env).
 */
export async function sendNewLeadNotificationToAdmin({
  fullName,
  email,
  message,
  attachmentCount,
}: {
  fullName: string;
  email: string;
  message: string;
  attachmentCount: number;
}): Promise<SendEmailResult> {
  const to = process.env.ADMIN_NOTIFY_EMAIL;
  if (!to?.trim()) {
    return { success: true };
  }
  const subject = "Goldcrest 3D — new lead";
  const text = [
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Message: ${message}`,
    attachmentCount > 0 ? `Attached files: ${attachmentCount}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const html = `<p>${escapeHtml(text).replace(/\n/g, "</p><p>")}</p>`;
  return sendEmail({ to: to.trim(), subject, text, html });
}

/**
 * Sends reply to a lead (client email).
 */
export async function sendReplyToLead({
  to,
  body,
}: {
  to: string;
  body: string;
}): Promise<SendEmailResult> {
  const subject = "Goldcrest 3D — reply to your request";
  const text = body.trim();
  const baseUrl = resolvePublicBaseUrl();
  const inlineLogo = await loadLeadReplyLogoAttachment();
  const logoImgSrc = inlineLogo
    ? `cid:${LEAD_REPLY_LOGO_CONTENT_ID}`
    : `${baseUrl}${LEAD_REPLY_LOGO_PATH}`;
  const html = buildLeadReplyBrandedHtml(text, logoImgSrc);
  return sendEmail({
    to,
    subject,
    text,
    html,
    attachments: inlineLogo ? [inlineLogo] : undefined,
  });
}

/**
 * Absolute site origin for assets in HTML email (logo, footer link). AUTH_URL, then VERCEL_URL.
 */
function resolvePublicBaseUrl(): string {
  const auth = process.env.AUTH_URL?.trim();
  if (auth) {
    return auth.replace(/\/$/, "");
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const normalized = vercel.replace(/\/$/, "");
    return normalized.startsWith("http") ? normalized : `https://${normalized}`;
  }
  return "http://localhost:3000";
}

function leadReplyBodyToHtmlParagraphs(plain: string): string {
  const trimmed = plain.trim();
  if (!trimmed) {
    return `<p style="margin:0 0 16px 0;color:${EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">&nbsp;</p>`;
  }
  const blocks = trimmed.split(/\n{2,}/);
  return blocks
    .map((block) => {
      const lines = escapeHtml(block).split(/\n/);
      const inner = lines.join("<br />");
      return `<p style="margin:0 0 16px 0;color:${EMAIL_BODY_TEXT};font-size:16px;line-height:1.6;">${inner}</p>`;
    })
    .join("");
}

function buildLeadReplyHeaderRow(logoImgSrc: string): string {
  const safeSrc = escapeHtml(logoImgSrc);
  return `
  <tr>
    <td style="background-color:${EMAIL_HEADER_BG};padding:28px 32px 22px 32px;text-align:center;border-bottom:1px solid #1e293b;">
      <img src="${safeSrc}" alt="Goldcrest 3D" width="120" height="120" style="display:block;margin:0 auto 18px auto;width:120px;max-width:120px;height:auto;border:0;outline:none;text-decoration:none;" />
      <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${EMAIL_HEADER_MUTED};line-height:1.4;">Reply to your request</p>
      <div style="margin:18px auto 0 auto;width:40px;height:3px;background-color:${EMAIL_ACCENT};border-radius:2px;font-size:0;line-height:0;">&nbsp;</div>
    </td>
  </tr>`;
}

function buildLeadReplyFooterRow(baseUrl: string): string {
  const safeBase = escapeHtml(baseUrl);
  return `
  <tr>
    <td style="background-color:${EMAIL_FOOTER_BG};padding:20px 32px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:${EMAIL_FOOTER_TEXT};line-height:1.5;">
        This message was sent by Goldcrest 3D in response to your inquiry.<br />
        <a href="${safeBase}" style="color:${EMAIL_ACCENT};text-decoration:underline;">Visit our website</a>
      </p>
    </td>
  </tr>`;
}

/**
 * Branded HTML for lead replies: header, logo, readable body, footer link.
 */
function buildLeadReplyBrandedHtml(plainBody: string, logoImgSrc: string): string {
  const baseUrl = resolvePublicBaseUrl();
  const bodyHtml = leadReplyBodyToHtmlParagraphs(plainBody);
  const headerRow = buildLeadReplyHeaderRow(logoImgSrc);
  const footerRow = buildLeadReplyFooterRow(baseUrl);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Goldcrest 3D</title>
</head>
<body style="margin:0;padding:0;background-color:#e2e8f0;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#e2e8f0;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);">
          ${headerRow}
          <tr>
            <td style="padding:32px 32px 28px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              ${bodyHtml}
            </td>
          </tr>
          ${footerRow}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
