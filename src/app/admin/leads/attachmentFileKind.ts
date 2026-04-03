/**
 * Attachment type derived from storage key filename extension (admin inbox).
 */
export type AttachmentFileKind =
  | "image"
  | "pdf"
  | "document"
  | "spreadsheet"
  | "presentation"
  | "archive"
  | "video"
  | "audio"
  | "generic";

const IMAGE_EXTENSIONS = new Set([
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "svg",
  "bmp",
  "heic",
  "heif",
  "avif",
  "tif",
  "tiff",
]);

const PDF_EXTENSIONS = new Set(["pdf"]);

const DOCUMENT_EXTENSIONS = new Set([
  "doc",
  "docx",
  "odt",
  "rtf",
  "txt",
  "md",
  "pages",
]);

const SPREADSHEET_EXTENSIONS = new Set(["xls", "xlsx", "csv", "ods", "numbers"]);

const PRESENTATION_EXTENSIONS = new Set(["ppt", "pptx", "odp", "key"]);

const ARCHIVE_EXTENSIONS = new Set([
  "zip",
  "rar",
  "7z",
  "tar",
  "gz",
  "bz2",
  "xz",
]);

const VIDEO_EXTENSIONS = new Set([
  "mp4",
  "webm",
  "mov",
  "avi",
  "mkv",
  "wmv",
  "m4v",
]);

const AUDIO_EXTENSIONS = new Set([
  "mp3",
  "wav",
  "ogg",
  "m4a",
  "flac",
  "aac",
  "wma",
]);

/**
 * Returns the lowercase extension without dot from an R2/storage object key.
 */
export function getAttachmentFileExtension(key: string): string {
  const name = key.split("/").pop() ?? key;
  const lastDot = name.lastIndexOf(".");
  if (lastDot <= 0 || lastDot === name.length - 1) {
    return "";
  }
  return name.slice(lastDot + 1).toLowerCase();
}

/**
 * Maps a file extension to a coarse kind for icon + styling.
 */
export function getAttachmentFileKind(ext: string): AttachmentFileKind {
  if (ext === "") return "generic";
  if (IMAGE_EXTENSIONS.has(ext)) return "image";
  if (PDF_EXTENSIONS.has(ext)) return "pdf";
  if (DOCUMENT_EXTENSIONS.has(ext)) return "document";
  if (SPREADSHEET_EXTENSIONS.has(ext)) return "spreadsheet";
  if (PRESENTATION_EXTENSIONS.has(ext)) return "presentation";
  if (ARCHIVE_EXTENSIONS.has(ext)) return "archive";
  if (VIDEO_EXTENSIONS.has(ext)) return "video";
  if (AUDIO_EXTENSIONS.has(ext)) return "audio";
  return "generic";
}

const ATTACHMENT_LABEL_MAX_CHARS = 5;

/**
 * Short lowercase label for the attachment badge (e.g. pdf, jpg, xlsx).
 * Long extensions are truncated so they fit the small tile.
 */
export function getAttachmentFormatLabel(ext: string): string {
  if (ext === "") {
    return "file";
  }
  const s = ext.toLowerCase();
  if (s.length <= ATTACHMENT_LABEL_MAX_CHARS) {
    return s;
  }
  return `${s.slice(0, ATTACHMENT_LABEL_MAX_CHARS - 1)}…`;
}

/** Tailwind classes for the attachment thumbnail wrapper (background + icon color). */
export function getAttachmentKindWrapperClass(kind: AttachmentFileKind): string {
  switch (kind) {
    case "image":
      return "bg-emerald-500/10 text-emerald-700";
    case "pdf":
      return "bg-rose-500/10 text-rose-700";
    case "document":
      return "bg-blue-500/10 text-blue-700";
    case "spreadsheet":
      return "bg-green-600/10 text-green-800";
    case "presentation":
      return "bg-orange-500/10 text-orange-800";
    case "archive":
      return "bg-violet-500/10 text-violet-700";
    case "video":
      return "bg-purple-500/10 text-purple-700";
    case "audio":
      return "bg-pink-500/10 text-pink-700";
    default:
      return "bg-slate-500/10 text-slate-600";
  }
}
