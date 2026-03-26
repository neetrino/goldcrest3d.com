/**
 * R2 upload — quote attachments, order product images.
 * S3-compatible API via @aws-sdk/client-s3.
 */

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

function getR2Client(): S3Client | null {
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    return null;
  }
  return new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
  });
}

import {
  QUOTE_ATTACHMENT_ALLOWED_MIME_TYPES,
  QUOTE_ATTACHMENT_MAX_BYTES,
} from "@/lib/validations/quoteAttachment";

const ALLOWED_TYPES = new Set(QUOTE_ATTACHMENT_ALLOWED_MIME_TYPES);

/**
 * Uploads a file to R2 under prefix (e.g. "quotes" or "orders").
 * Returns the object key or null if R2 is not configured / upload fails.
 */
export async function uploadToR2(
  prefix: string,
  file: File,
): Promise<string | null> {
  if (!R2_BUCKET_NAME) return null;
  const client = getR2Client();
  if (!client) return null;

  if (file.size > QUOTE_ATTACHMENT_MAX_BYTES) return null;
  const contentType = (file.type ?? "").toLowerCase();
  if (!ALLOWED_TYPES.has(contentType)) return null;

  const ext = file.name.split(".").pop() ?? "bin";
  const key = `${prefix}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  try {
    const body = new Uint8Array(await file.arrayBuffer());
    await client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
    return key;
  } catch {
    return null;
  }
}

/**
 * Builds public URL for an R2 object key (e.g. for leads attachments, order product image).
 * Returns null if R2_PUBLIC_URL is not set (e.g. bucket not exposed).
 */
export function getR2PublicUrl(key: string): string | null {
  if (!R2_PUBLIC_URL || !key) return null;
  const base = R2_PUBLIC_URL.replace(/\/$/, "");
  return `${base}/${key}`;
}
