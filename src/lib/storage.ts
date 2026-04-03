/**
 * R2 upload — quote attachments, order product images, site media.
 * S3-compatible API via @aws-sdk/client-s3.
 */

import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { R2_PREFIXES } from "@/constants";
import { logger } from "@/lib/logger";
import { processModelingMobileImageBuffer } from "@/lib/site-media/process-modeling-mobile-image";
import {
  SITE_MEDIA_IMAGE_ALLOWED_MIME_TYPES,
  SITE_MEDIA_IMAGE_MAX_BYTES,
} from "@/lib/validations/siteMediaImage";

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
  QUOTE_ATTACHMENT_MAX_BYTES,
  resolveQuoteAttachmentContentType,
} from "@/lib/validations/quoteAttachment";

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
  const contentType = resolveQuoteAttachmentContentType(file);
  if (!contentType) return null;

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

const SITE_MEDIA_TYPES = new Set(SITE_MEDIA_IMAGE_ALLOWED_MIME_TYPES);

/**
 * Удаляет объект из R2 (замена/удаление медиа). Без ошибки в лог при отсутствии ключа.
 */
export async function deleteObjectFromR2(objectKey: string): Promise<boolean> {
  if (!R2_BUCKET_NAME || !objectKey) return false;
  const client = getR2Client();
  if (!client) return false;
  try {
    await client.send(
      new DeleteObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: objectKey,
      }),
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * Загрузка изображения для лендинга (только image/* из allowlist).
 */
export async function uploadSiteMediaToR2(file: File): Promise<string | null> {
  if (!R2_BUCKET_NAME) return null;
  const client = getR2Client();
  if (!client) return null;

  if (file.size > SITE_MEDIA_IMAGE_MAX_BYTES) return null;
  const contentType = (file.type ?? "").toLowerCase();
  if (!SITE_MEDIA_TYPES.has(contentType)) return null;

  const ext = file.name.split(".").pop() ?? "bin";
  const key = `${R2_PREFIXES.SITE_MEDIA}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

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
 * Modeling Specialization — mobile slot: center-crop to card aspect, WebP, then R2.
 */
export async function uploadModelingMobileImageToR2(file: File): Promise<string | null> {
  if (!R2_BUCKET_NAME) return null;
  const client = getR2Client();
  if (!client) return null;

  if (file.size > SITE_MEDIA_IMAGE_MAX_BYTES) return null;
  const contentType = (file.type ?? "").toLowerCase();
  if (!SITE_MEDIA_TYPES.has(contentType)) return null;

  let body: Buffer;
  try {
    const raw = Buffer.from(new Uint8Array(await file.arrayBuffer()));
    body = await processModelingMobileImageBuffer(raw);
  } catch (e) {
    logger.error("uploadModelingMobileImageToR2: process failed", e);
    return null;
  }

  if (body.length > SITE_MEDIA_IMAGE_MAX_BYTES) {
    logger.error("uploadModelingMobileImageToR2: output too large");
    return null;
  }

  const key = `${R2_PREFIXES.SITE_MEDIA}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.webp`;

  try {
    await client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: "image/webp",
      }),
    );
    return key;
  } catch {
    return null;
  }
}
