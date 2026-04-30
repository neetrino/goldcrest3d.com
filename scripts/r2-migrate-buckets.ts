/**
 * Copies every object from a source R2 bucket to a destination R2 bucket (S3 API).
 * Uses the repo's existing @aws-sdk/client-s3 — no AWS CLI required.
 *
 * Set env in the shell (do not commit secrets), then from repo root:
 *   pnpm exec tsx scripts/r2-migrate-buckets.ts
 *
 * Required:
 *   R2_MIGRATE_SRC_ENDPOINT, R2_MIGRATE_SRC_ACCESS_KEY_ID, R2_MIGRATE_SRC_SECRET_ACCESS_KEY, R2_MIGRATE_SRC_BUCKET
 *   R2_MIGRATE_DST_ENDPOINT, R2_MIGRATE_DST_ACCESS_KEY_ID, R2_MIGRATE_DST_SECRET_ACCESS_KEY, R2_MIGRATE_DST_BUCKET
 *
 * Optional:
 *   R2_MIGRATE_PREFIX — only keys starting with this prefix (e.g. "uploads/")
 *
 * Each object is loaded into memory once during copy (fine for typical attachments; very large
 * files may need a different tool).
 */

import {
  GetObjectCommand,
  ListObjectsV2Command,
  type ListObjectsV2CommandOutput,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const R2_REGION = "auto";

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v?.trim()) {
    throw new Error(`Missing or empty environment variable: ${name}`);
  }
  return v.trim();
}

function createR2Client(endpoint: string, accessKeyId: string, secretAccessKey: string): S3Client {
  const url = endpoint.replace(/\/$/, "");
  return new S3Client({
    region: R2_REGION,
    endpoint: url,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });
}

async function copyObject(
  source: S3Client,
  sourceBucket: string,
  dest: S3Client,
  destBucket: string,
  key: string,
): Promise<void> {
  const got = await source.send(
    new GetObjectCommand({ Bucket: sourceBucket, Key: key }),
  );
  if (!got.Body) {
    throw new Error(`Empty body for key: ${key}`);
  }
  // Buffer with known length — relaying the GetObject stream breaks signing (x-amz-decoded-content-length).
  const bytes = await got.Body.transformToByteArray();
  const body = Buffer.from(bytes);

  await dest.send(
    new PutObjectCommand({
      Bucket: destBucket,
      Key: key,
      Body: body,
      ContentLength: body.byteLength,
      ContentType: got.ContentType,
      CacheControl: got.CacheControl,
      ContentDisposition: got.ContentDisposition,
      Metadata: got.Metadata,
    }),
  );
}

async function migrateAll(params: {
  source: S3Client;
  sourceBucket: string;
  dest: S3Client;
  destBucket: string;
  prefix: string;
}): Promise<{ copied: number; skipped: number }> {
  let copied = 0;
  let skipped = 0;
  let continuationToken: string | undefined;

  do {
    const page: ListObjectsV2CommandOutput = await params.source.send(
      new ListObjectsV2Command({
        Bucket: params.sourceBucket,
        Prefix: params.prefix || undefined,
        ContinuationToken: continuationToken,
      }),
    );

    for (const obj of page.Contents ?? []) {
      const key = obj.Key;
      if (!key) {
        skipped += 1;
        continue;
      }
      if (key.endsWith("/") && (obj.Size ?? 0) === 0) {
        skipped += 1;
        continue;
      }
      await copyObject(params.source, params.sourceBucket, params.dest, params.destBucket, key);
      copied += 1;
      if (copied % 50 === 0) {
        process.stdout.write(`Copied ${copied} objects...\n`);
      }
    }

    continuationToken = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (continuationToken);

  return { copied, skipped };
}

async function main(): Promise<void> {
  const srcEndpoint = requiredEnv("R2_MIGRATE_SRC_ENDPOINT");
  const srcKey = requiredEnv("R2_MIGRATE_SRC_ACCESS_KEY_ID");
  const srcSecret = requiredEnv("R2_MIGRATE_SRC_SECRET_ACCESS_KEY");
  const srcBucket = requiredEnv("R2_MIGRATE_SRC_BUCKET");

  const dstEndpoint = requiredEnv("R2_MIGRATE_DST_ENDPOINT");
  const dstKey = requiredEnv("R2_MIGRATE_DST_ACCESS_KEY_ID");
  const dstSecret = requiredEnv("R2_MIGRATE_DST_SECRET_ACCESS_KEY");
  const dstBucket = requiredEnv("R2_MIGRATE_DST_BUCKET");

  const prefix = (process.env.R2_MIGRATE_PREFIX ?? "").trim();

  const sourceClient = createR2Client(srcEndpoint, srcKey, srcSecret);
  const destClient = createR2Client(dstEndpoint, dstKey, dstSecret);

  process.stdout.write(
    `Migrating s3://${srcBucket}/ → s3://${dstBucket}/${prefix ? `${prefix}*` : ""}\n`,
  );

  const { copied, skipped } = await migrateAll({
    source: sourceClient,
    sourceBucket: srcBucket,
    dest: destClient,
    destBucket: dstBucket,
    prefix,
  });

  process.stdout.write(`Done. Copied: ${copied}, skipped (no key / folder placeholder): ${skipped}\n`);
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
