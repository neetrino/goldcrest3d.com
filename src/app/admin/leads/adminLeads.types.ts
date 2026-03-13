/**
 * Lead list item for inbox list column.
 */
export type LeadListItem = {
  id: string;
  fullName: string;
  email: string;
  message: string;
  createdAt: Date;
};

/**
 * Lead with resolved attachment URLs for detail view.
 */
export type LeadWithAttachments = LeadListItem & {
  attachmentUrls: Array<{
    key: string;
    url: string | null;
    isImage: boolean;
  }>;
};
