"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendReplyToLead } from "@/lib/email";

export type ReplyToLeadResult = { error?: string; sent?: boolean };

const MAX_BODY_LENGTH = 10_000;

/**
 * Server Action: send reply email to lead (client).
 * Admin only; lead must exist.
 */
export async function replyToLeadAction(
  leadId: string,
  _prev: ReplyToLeadResult,
  formData: FormData,
): Promise<ReplyToLeadResult> {
  const session = await auth();
  if (!session?.user) return { error: "Sign in required." };

  const body = formData.get("body");
  if (typeof body !== "string" || !body.trim()) {
    return { error: "Please enter the reply text." };
  }
  if (body.length > MAX_BODY_LENGTH) {
    return { error: "Text is too long." };
  }

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
  });
  if (!lead) return { error: "Lead not found." };

  const result = await sendReplyToLead({
    to: lead.email,
    body: body.trim(),
  });

  if (!result.success) return { error: result.error };
  return { sent: true };
}
