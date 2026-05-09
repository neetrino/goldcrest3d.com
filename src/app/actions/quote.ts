"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendNewLeadNotificationToAdmin } from "@/lib/email";
import { logger } from "@/lib/logger";
import {
  buildQuoteAttachmentObjectKey,
  createQuoteAttachmentPresignedPutUrl,
  verifyR2ObjectExists,
} from "@/lib/storage";
import {
  QUOTE_ATTACHMENT_MAX_BYTES,
  QUOTE_ATTACHMENT_MAX_FILES,
  resolveQuoteAttachmentContentTypeFromMeta,
} from "@/lib/validations/quoteAttachment";
import { isValidQuoteAttachmentObjectKey } from "@/lib/validations/quoteAttachmentObjectKey";
import { quoteFormSchema } from "@/lib/validations/quoteForm";

const FORM_FIELD_ATTACHMENT_KEYS = "attachmentKeys";

const presignItemSchema = z.object({
  fileName: z.string().min(1).max(255),
  fileSize: z.number().int().positive().max(QUOTE_ATTACHMENT_MAX_BYTES),
  fileType: z.string().max(200),
});

export type QuoteSubmitResult =
  | { success: true }
  | { success: false; error: string }
  | null;

export type QuotePresignUploadResult =
  | {
      ok: true;
      uploads: { uploadUrl: string; objectKey: string; contentType: string }[];
    }
  | { ok: false; error: string };

function parseAttachmentKeysField(
  raw: FormDataEntryValue | null,
): { ok: true; keys: string[] } | { ok: false; error: string } {
  if (raw == null || raw === "") {
    return { ok: true, keys: [] };
  }
  if (typeof raw !== "string") {
    return { ok: false, error: "Invalid attachment data." };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return { ok: false, error: "Invalid attachment data." };
  }
  if (!Array.isArray(parsed)) {
    return { ok: false, error: "Invalid attachment data." };
  }
  const keys = parsed.filter((k): k is string => typeof k === "string");
  if (keys.length !== parsed.length) {
    return { ok: false, error: "Invalid attachment data." };
  }
  if (keys.length > QUOTE_ATTACHMENT_MAX_FILES) {
    return {
      ok: false,
      error: `You can attach up to ${QUOTE_ATTACHMENT_MAX_FILES} files.`,
    };
  }
  for (const key of keys) {
    if (!isValidQuoteAttachmentObjectKey(key)) {
      return { ok: false, error: "Invalid attachment data." };
    }
  }
  return { ok: true, keys };
}

async function verifyUploadedQuoteKeys(
  keys: string[],
): Promise<{ ok: true } | { ok: false; error: string }> {
  for (const key of keys) {
    const exists = await verifyR2ObjectExists(key);
    if (!exists) {
      return {
        ok: false,
        error: "One or more uploads are missing. Please try submitting again.",
      };
    }
  }
  return { ok: true };
}

/**
 * Mint presigned PUT URLs so the client uploads directly to R2 (avoids platform body limits).
 */
export async function requestQuoteAttachmentPresignedUploads(
  items: { fileName: string; fileSize: number; fileType: string }[],
): Promise<QuotePresignUploadResult> {
  const parsedList = z.array(presignItemSchema).max(QUOTE_ATTACHMENT_MAX_FILES).safeParse(items);
  if (!parsedList.success) {
    return { ok: false, error: "Invalid upload request." };
  }
  const list = parsedList.data;
  if (list.length === 0) {
    return { ok: true, uploads: [] };
  }

  const uploads: { uploadUrl: string; objectKey: string; contentType: string }[] = [];

  for (const item of list) {
    const contentType = resolveQuoteAttachmentContentTypeFromMeta({
      fileName: item.fileName,
      fileType: item.fileType,
    });
    if (!contentType) {
      return {
        ok: false,
        error: "Only PNG, JPG, JPEG, WebP, and PDF files are allowed.",
      };
    }

    const objectKey = buildQuoteAttachmentObjectKey(item.fileName);
    const uploadUrl = await createQuoteAttachmentPresignedPutUrl({
      objectKey,
      contentType,
      contentLength: item.fileSize,
    });
    if (!uploadUrl) {
      return {
        ok: false,
        error: "Upload could not be started. Please try again later.",
      };
    }
    uploads.push({ uploadUrl, objectKey, contentType });
  }

  return { ok: true, uploads };
}

/**
 * Server Action: validate quote form, attach R2 keys from direct upload, create Lead.
 * Signature compatible with useActionState(prevState, formData).
 */
export async function submitQuote(
  _prev: QuoteSubmitResult,
  formData: FormData,
): Promise<QuoteSubmitResult> {
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const message = formData.get("message");

  const parsedKeys = parseAttachmentKeysField(formData.get(FORM_FIELD_ATTACHMENT_KEYS));
  if (!parsedKeys.ok) {
    return { success: false, error: parsedKeys.error };
  }

  const parsed = quoteFormSchema.safeParse({
    fullName: typeof fullName === "string" ? fullName : "",
    email: typeof email === "string" ? email : "",
    message: typeof message === "string" ? message : "",
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.fullName?.[0] ?? first.email?.[0] ?? first.message?.[0] ?? "Invalid data";
    return { success: false, error: msg };
  }

  const attachmentKeys = parsedKeys.keys;
  const verified = await verifyUploadedQuoteKeys(attachmentKeys);
  if (!verified.ok) {
    return { success: false, error: verified.error };
  }

  try {
    await prisma.lead.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        message: parsed.data.message,
        attachmentKeys,
      },
    });
  } catch (err) {
    logger.error("submitQuote: lead create failed", err);
    return { success: false, error: "Request could not be saved. Please try again later." };
  }

  await sendNewLeadNotificationToAdmin({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    message: parsed.data.message,
    attachmentCount: attachmentKeys.length,
  });

  revalidatePath("/admin", "layout");
  revalidatePath("/admin/leads");

  return { success: true };
}
