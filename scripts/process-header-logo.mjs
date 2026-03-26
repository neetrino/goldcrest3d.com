/**
 * Remove near-black background from header logo → transparent PNG.
 * Source: scripts/header-logo-source.png (not served; replace to re-run)
 * Output: public/images/header-logo.png
 * Run from repo root: node scripts/process-header-logo.mjs
 */
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT = resolve(__dirname, "header-logo-source.png");
const OUTPUT = resolve(__dirname, "../public/images/header-logo.png");

const BLACK_CEILING = 28;
const EDGE_TOP = 88;
const ALPHA_CROP_THRESHOLD = 8;
const CROP_PADDING_PX = 2;

async function main() {
  const buf = await readFile(INPUT);
  const { data, info } = await sharp(buf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  if (channels !== 4) {
    throw new Error(`Expected RGBA, got ${channels} channels`);
  }

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const m = Math.max(r, g, b);

    let a;
    if (m <= BLACK_CEILING) {
      a = 0;
    } else if (m < EDGE_TOP) {
      a = Math.round(((m - BLACK_CEILING) / (EDGE_TOP - BLACK_CEILING)) * 255);
    } else {
      a = 255;
    }

    data[i + 3] = a;
  }

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4;
      if (data[i + 3] > ALPHA_CROP_THRESHOLD) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX < minX) {
    throw new Error("No visible pixels after background removal");
  }

  const left = Math.max(0, minX - CROP_PADDING_PX);
  const top = Math.max(0, minY - CROP_PADDING_PX);
  const extractWidth = Math.min(width - left, maxX - minX + 1 + 2 * CROP_PADDING_PX);
  const extractHeight = Math.min(height - top, maxY - minY + 1 + 2 * CROP_PADDING_PX);

  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .extract({ left, top, width: extractWidth, height: extractHeight })
    .png({ compressionLevel: 9 })
    .toFile(OUTPUT);

  const meta = await sharp(OUTPUT).metadata();
  console.log("Wrote", OUTPUT, `${meta.width}x${meta.height}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
