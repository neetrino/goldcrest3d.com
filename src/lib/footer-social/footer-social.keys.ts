export const FOOTER_SOCIAL_KEYS = {
  INSTAGRAM: "instagram",
  LINKEDIN: "linkedin",
  BEHANCE: "behance",
  YOUTUBE: "youtube",
  WHATSAPP_PHONE: "whatsapp_phone",
} as const;

export type FooterSocialKey = (typeof FOOTER_SOCIAL_KEYS)[keyof typeof FOOTER_SOCIAL_KEYS];

export type FooterSocialLinks = {
  instagram: string | null;
  linkedin: string | null;
  behance: string | null;
  youtube: string | null;
  whatsappPhone: string | null;
};

export const EMPTY_FOOTER_SOCIAL_LINKS: FooterSocialLinks = {
  instagram: null,
  linkedin: null,
  behance: null,
  youtube: null,
  whatsappPhone: null,
};
