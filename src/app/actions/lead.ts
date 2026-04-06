"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { sendReplyToLead } from "@/lib/email";
import { logger } from "@/lib/logger";
import { deleteObjectFromR2 } from "@/lib/storage";
import { leadReplySchema } from "@/lib/validations/leadReply";

export type ReplyToLeadResult = { error?: string; sent?: boolean };
export type DeleteLeadResult = { error?: string; deleted?: boolean } | null;

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
    if (lead.repliedAt != null) {
      return { error: "A response has already been sent for this lead." };
    }

    const replyLockedAt = new Date();
    const lockResult = await prisma.lead.updateMany({
      where: { id: leadId, repliedAt: null },
      data: { repliedAt: replyLockedAt },
    });
    if (lockResult.count === 0) {
      return { error: "A response has already been sent for this lead." };
    }

    const result = await sendReplyToLead({
      to: lead.email,
      body: parsed.data.body.trim(),
    });

    if (!result.success) {
      await prisma.lead.updateMany({
        where: { id: leadId, repliedAt: replyLockedAt },
        data: { repliedAt: null },
      });
      return { error: result.error };
    }

    revalidatePath("/admin/leads");
    return { sent: true };
  } catch (err) {
    logger.error("replyToLeadAction failed", err);
    return { error: "Reply could not be sent. Please try again later." };
  }
}

/**
 * Server Action: delete lead (admin). Removes R2 attachments best-effort, then DB row.
 */
export async function deleteLead(leadId: string): Promise<DeleteLeadResult> {
  const session = await requireAdminSession();
  if (!session) return { error: "Unauthorized." };

  try {
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) return { error: "Lead not found." };

    for (const key of lead.attachmentKeys) {
      await deleteObjectFromR2(key);
    }

    await prisma.lead.delete({ where: { id: leadId } });
    revalidatePath("/admin/leads");
    return { deleted: true };
  } catch (err) {
    logger.error("deleteLead failed", err);
    return { error: "Lead could not be deleted." };
  }
}
