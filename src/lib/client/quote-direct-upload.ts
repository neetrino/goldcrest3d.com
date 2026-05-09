import { requestQuoteAttachmentPresignedUploads } from "@/app/actions/quote";
import {
  resolveQuoteAttachmentContentType,
  validateQuoteAttachments,
} from "@/lib/validations/quoteAttachment";

/**
 * Client-only: presigned PUT to R2, then submit keys via Server Action (small body).
 */
export async function uploadQuoteAttachmentsWithPresignedUrls(
  files: File[],
): Promise<{ ok: true; keys: string[] } | { ok: false; error: string }> {
  const validationError = validateQuoteAttachments(files);
  if (validationError) {
    return { ok: false, error: validationError };
  }
  if (files.length === 0) {
    return { ok: true, keys: [] };
  }

  const items = files.map((f) => ({
    fileName: f.name,
    fileSize: f.size,
    fileType: resolveQuoteAttachmentContentType(f) ?? "",
  }));

  if (items.some((i) => i.fileType === "")) {
    return { ok: false, error: "Only PNG, JPG, JPEG, WebP, and PDF files are allowed." };
  }

  const presigned = await requestQuoteAttachmentPresignedUploads(items);
  if (!presigned.ok) {
    return presigned;
  }

  for (let i = 0; i < files.length; i++) {
    const slot = presigned.uploads[i];
    const res = await fetch(slot.uploadUrl, {
      method: "PUT",
      body: files[i],
      headers: { "Content-Type": slot.contentType },
    });
    if (!res.ok) {
      return {
        ok: false,
        error: "Upload failed. Please check your connection and try again.",
      };
    }
  }

  return { ok: true, keys: presigned.uploads.map((u) => u.objectKey) };
}
