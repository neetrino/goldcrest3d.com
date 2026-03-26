"use server";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { sendReplyToLead } from "@/lib/email";
import { logger } from "@/lib/logger";
import { leadReplySchema } from "@/lib/validations/leadReply";

export type ReplyToLeadResult = { error?: string; sent?: boolean };

/**
 * Server Action: send reply email to lead (client).
 * Lead must exist.
 */
export async function replyToLeadAction(
  leadId: string,
  _prev: ReplyToLeadResult,
  formData: FormData,
): Promise<ReplyToLeadResult> {
  const session = await requireAdminSession();
  if (!session) return { error: "Unauthorized." };

  const body = formData.get("body");
  const parsed = leadReplySchema.safeParse({
    body: typeof body === "string" ? body : "",
  });
  if (!parsed.success) {
    const msg = parsed.error.flatten().fieldErrors.body?.[0] ?? "Invalid data";
    return { error: msg };
  }

  try {
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    });
    if (!lead) return { error: "Lead not found." };

    const result = await sendReplyToLead({
      to: lead.email,
      body: parsed.data.body.trim(),
    });

    if (!result.success) return { error: result.error };
    return { sent: true };
  } catch (err) {
    logger.error("replyToLeadAction failed", err);
    return { error: "Reply could not be sent. Please try again later." };
  }
}
