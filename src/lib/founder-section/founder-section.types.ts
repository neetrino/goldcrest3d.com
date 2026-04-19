import type { ManufacturingImageTransform } from "@/lib/manufacturing-intelligence/manufacturing-image-transform";

export type FounderSectionContent = {
  heading: string;
  name: string;
  bioParagraphs: [string, string, string, string];
  stats: {
    yearsValue: string;
    yearsCaption: string;
    projectsValue: string;
    projectsCaption: string;
  };
  image: {
    src: string;
    alt: string;
    transform: ManufacturingImageTransform;
  };
};
