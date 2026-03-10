/**
 * Resend — reply to leads, payment link email.
 */

import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

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
}: {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
}): Promise<SendEmailResult> {
  if (!resend) {
    return { success: false, error: "Email-ը կարգավորված չէ (RESEND_API_KEY)։" };
  }
  const toList = Array.isArray(to) ? to : [to];
  if (toList.length === 0) {
    return { success: false, error: "Ստացողի հասցե չկա։" };
  }
  const htmlContent = html ?? (text ? escapeHtml(text).replace(/\n/g, "<br>") : "<p></p>");
  const textContent = text ?? (html ? stripHtml(html) : "");

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toList,
      subject,
      text: textContent,
      html: htmlContent,
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, id: data?.id };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Email-ը չի ուղարկվել։";
    return { success: false, error: message };
  }
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
  const subject = "Goldcrest 3D — պատասխան Ձեր հայտին";
  const text = body.trim();
  const html = `<p>${escapeHtml(text).replace(/\n/g, "</p><p>")}</p>`;
  return sendEmail({ to, subject, text, html });
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
