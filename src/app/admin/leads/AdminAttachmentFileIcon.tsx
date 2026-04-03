import type { AttachmentFileKind } from "./attachmentFileKind";

type AdminAttachmentFileIconProps = {
  kind: AttachmentFileKind;
  className?: string;
};

const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

/**
 * Small stroke icon for lead attachment cards (by coarse file kind).
 */
export function AdminAttachmentFileIcon({
  kind,
  className,
}: AdminAttachmentFileIconProps) {
  switch (kind) {
    case "image":
      return (
        <svg {...ICON_PROPS} className={className}>
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      );
    case "pdf":
      return (
        <svg {...ICON_PROPS} className={className}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M10 12h4" />
          <path d="M10 16h4" />
          <path d="M8 12h.01" />
          <path d="M8 16h.01" />
        </svg>
      );
    case "document":
      return (
        <svg {...ICON_PROPS} className={className}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      );
    case "spreadsheet":
      return (
        <svg {...ICON_PROPS} className={className}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h2" />
          <path d="M8 17h2" />
          <path d="M14 13h2" />
          <path d="M14 17h2" />
          <path d="M8 9h8" />
        </svg>
      );
    case "presentation":
      return (
        <svg {...ICON_PROPS} className={className}>
          <path d="M2 3h20v14H2z" />
          <path d="M7 21h10" />
          <path d="M12 17v4" />
          <path d="m7 8 3 3 3-3 3 3" />
        </svg>
      );
    case "archive":
      return (
        <svg {...ICON_PROPS} className={className}>
          <path d="M21 8v13H3V8" />
          <path d="M10 22V12h4v10" />
          <path d="M12 8V2" />
          <path d="M8 2h8" />
          <path d="M8 12h8" />
        </svg>
      );
    case "video":
      return (
        <svg {...ICON_PROPS} className={className}>
          <rect width="20" height="14" x="2" y="5" rx="2" ry="2" />
          <path d="m10 9 5 3-5 3z" />
        </svg>
      );
    case "audio":
      return (
        <svg {...ICON_PROPS} className={className}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    default:
      return (
        <svg {...ICON_PROPS} className={className}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </svg>
      );
  }
}
