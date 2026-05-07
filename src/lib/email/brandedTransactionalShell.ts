import { CUSTOMER_SUPPORT_INBOX_EMAIL } from "@/constants/customer-support-inbox";

/** Shared palette for payment / transactional client emails. */
export const BRANDED_EMAIL_HEADER_BG = "#000000";
export const BRANDED_EMAIL_HEADER_MUTED = "#94a3b8";
export const BRANDED_EMAIL_BODY_TEXT = "#334155";
export const BRANDED_EMAIL_FOOTER_BG = "#f8fafc";
export const BRANDED_EMAIL_FOOTER_TEXT = "#64748b";
export const BRANDED_EMAIL_ACCENT = "#b45309";

export function escapeHtmlForEmail(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Top banner: brand name + uppercase subtitle (e.g. "Payment received", "Secure payment").
 */
export function buildBrandedEmailHeaderRow(headerSubtitle: string): string {
  const sub = escapeHtmlForEmail(headerSubtitle);
  return `
  <tr>
    <td style="background-color:${BRANDED_EMAIL_HEADER_BG};padding:28px 32px 22px 32px;text-align:center;border-bottom:1px solid #1e293b;">
      <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;letter-spacing:-0.02em;color:#f8fafc;line-height:1.25;">Goldcrest 3D</p>
      <p style="margin:14px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${BRANDED_EMAIL_HEADER_MUTED};line-height:1.4;">${sub}</p>
      <div style="margin:18px auto 0 auto;width:40px;height:3px;background-color:${BRANDED_EMAIL_ACCENT};border-radius:2px;font-size:0;line-height:0;">&nbsp;</div>
    </td>
  </tr>`;
}

export function buildBrandedEmailFooterRow(siteLinkHref: string): string {
  const safeSite = escapeHtmlForEmail(siteLinkHref);
  const mail = escapeHtmlForEmail(CUSTOMER_SUPPORT_INBOX_EMAIL);
  return `
  <tr>
    <td style="background-color:${BRANDED_EMAIL_FOOTER_BG};padding:20px 32px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="margin:0 0 12px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:${BRANDED_EMAIL_FOOTER_TEXT};line-height:1.5;">
        If you have any questions about your order, simply reply to this email or contact us at
        <a href="mailto:${mail}" style="color:${BRANDED_EMAIL_ACCENT};text-decoration:underline;">${mail}</a>.
      </p>
      <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:${BRANDED_EMAIL_FOOTER_TEXT};line-height:1.5;">
        Visit our website:<br />
        <a href="${safeSite}" style="color:${BRANDED_EMAIL_ACCENT};text-decoration:underline;">${safeSite}</a>
      </p>
    </td>
  </tr>`;
}

export function buildBrandedEmailDocument(
  headerSubtitle: string,
  bodyInnerHtml: string,
  siteLinkHref: string,
): string {
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
          ${buildBrandedEmailHeaderRow(headerSubtitle)}
          <tr>
            <td style="padding:32px 32px 28px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              ${bodyInnerHtml}
            </td>
          </tr>
          ${buildBrandedEmailFooterRow(siteLinkHref)}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
