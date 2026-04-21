import type { LegalDocumentContent } from "@/lib/legal/legal-content.types";

export const privacyPolicyContent: LegalDocumentContent = {
  title: "Privacy Policy",
  lastUpdated: "April 21, 2026",
  introduction: [
    "This Privacy Policy explains how Goldcrest 3D (\"we\", \"us\", \"our\") collects, uses, and protects personal information when you use www.goldcrest3d.com and related services.",
    "By using our website, requesting a quote, or placing an order, you acknowledge the practices described in this policy.",
  ],
  sections: [
    {
      title: "1. Information We Collect",
      paragraphs: [
        "We may collect personal information that you voluntarily provide when you submit a quote request, place an order, or contact us.",
      ],
      bullets: [
        "Name",
        "Email address",
        "Phone number",
        "Project details, files, and communication history",
        "Payment-related metadata required to process transactions securely",
      ],
    },
    {
      title: "2. When We Collect Information",
      bullets: [
        "When you submit forms on our website",
        "When you request a quote or place an order",
        "When you communicate with us by email or other channels",
      ],
    },
    {
      title: "3. How We Use Information",
      paragraphs: [
        "We use collected information to deliver services and operate our business in a secure and reliable way.",
      ],
      bullets: [
        "To evaluate projects and provide quotations",
        "To process transactions and deliver ordered files",
        "To provide support and project updates",
        "To improve website experience and service quality",
        "To send service-related and marketing communications where permitted by law",
      ],
    },
    {
      title: "4. Cookies and Similar Technologies",
      paragraphs: [
        "We may use cookies and similar technologies required for core website functionality, performance measurement, and advertising features.",
        "You can control cookies through your browser settings. Disabling cookies may affect certain website features.",
      ],
    },
    {
      title: "5. Google Services and Advertising",
      paragraphs: [
        "Our website may use Google advertising and analytics services, including Google AdSense, Google Analytics, and remarketing features.",
        "Google and other third parties may use cookies (including Google Analytics and DoubleClick cookies) to understand interactions with ads and website content.",
        "You can manage ad personalization through Google Ads Settings and available opt-out tools from Google and the Network Advertising Initiative.",
      ],
    },
    {
      title: "6. Third-Party Disclosure",
      paragraphs: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "We may share limited information with trusted service providers strictly when needed to operate our website, process payments, deliver services, or comply with legal obligations.",
      ],
    },
    {
      title: "7. Third-Party Links",
      paragraphs: [
        "Our website may include links to third-party websites. We are not responsible for the content or privacy practices of external websites.",
      ],
    },
    {
      title: "8. Data Security",
      paragraphs: [
        "We implement reasonable technical and organizational measures to protect personal information against unauthorized access, alteration, disclosure, or destruction.",
      ],
    },
    {
      title: "9. California Online Privacy Protection Act (CalOPPA)",
      paragraphs: [
        "In accordance with CalOPPA, users can visit our site anonymously. A clear Privacy Policy link is available on our website.",
        "If this policy changes, updates will be posted on this page.",
      ],
      bullets: [
        "Users may request updates to their personal information by contacting us via email.",
      ],
    },
    {
      title: "10. Data Breach Response",
      paragraphs: [
        "If a data breach affects personal information, we will take responsive action in accordance with applicable law, including notifying affected users by email when required.",
        "Our target notification window is within 7 business days after confirmation of a reportable incident.",
      ],
    },
    {
      title: "11. CAN-SPAM Compliance",
      paragraphs: [
        "If you no longer wish to receive non-essential marketing emails, you can unsubscribe at any time by contacting us.",
      ],
    },
    {
      title: "12. Changes to This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The latest version is always published on this page with an updated effective date.",
      ],
    },
  ],
  contactEmail: "info@goldcrest3d.com",
};
