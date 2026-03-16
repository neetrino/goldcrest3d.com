import Image from "next/image";

/** Props for one Modeling Specialization card. Figma: 942×495, rounded-16, title 40px/28, body 16px/26. */
export type ModelingCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  /** data-landing-image id for this card's image (section-by-section replacement). */
  imageId: string;
  /** If set, card uses gradient background and image in one half; if not, image is full-cover with text overlay. */
  gradient?: string;
  imageOnLeft: boolean;
  /** Figma: left, right, or center (Bridal is center). */
  textAlign: "left" | "right" | "center";
  /** Figma: blocks 1–3 ExtraBold, 4–6 Bold */
  titleBold?: boolean;
  /** Figma: only Ancient & Heritage uses rgba(255,255,255,0.6) for description */
  descriptionMuted?: boolean;
  /** Critical: where the image is anchored (e.g. "right center" so pendant stays visible). */
  imagePosition?: string;
};

const DEFAULT_IMAGE_POSITION = "center center";

export function ModelingCard({
  title,
  description,
  imageSrc,
  imageId,
  gradient,
  imageOnLeft,
  textAlign,
  titleBold = false,
  descriptionMuted = false,
  imagePosition = DEFAULT_IMAGE_POSITION,
}: ModelingCardProps) {
  const imageStyle = { objectPosition: imagePosition };
  const textAlignClass =
    textAlign === "center"
      ? "text-center"
      : textAlign === "right"
        ? "text-right"
        : "text-left";

  if (!gradient) {
    return (
      <article className="relative min-h-[320px] overflow-hidden rounded-[16px] md:min-h-[400px] lg:min-h-[495px]">
        <div className="absolute inset-0" data-landing-image={imageId}>
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover"
            style={imageStyle}
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </div>
        <div
          className={`absolute inset-0 z-10 flex flex-col justify-center gap-6 px-6 py-8 text-white md:px-8 md:py-10 ${
            imageOnLeft ? "items-end pl-[50%]" : "items-start pr-[50%]"
          } ${textAlignClass}`}
        >
          <h3 className={`font-manrope text-[40px] leading-[28px] ${titleBold ? "font-bold" : "font-extrabold"}`}>
            {title}
          </h3>
          <p className={`font-manrope max-w-[407px] font-light text-[16px] leading-[26px] ${descriptionMuted ? "text-white/60" : "text-white"}`}>
            {description}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article
      className="flex min-h-[320px] flex-col overflow-hidden rounded-[16px] md:min-h-[400px] md:flex-row md:items-stretch lg:min-h-[495px]"
      style={{ background: gradient }}
    >
      {imageOnLeft ? (
        <>
          <div
            className="relative order-2 h-[240px] shrink-0 overflow-hidden md:order-1 md:h-auto md:min-h-0 md:w-1/2"
            data-landing-image={imageId}
          >
            <Image
              src={imageSrc}
              alt=""
              fill
              className="object-cover"
              style={imageStyle}
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
          <div
            className={`order-1 flex flex-col justify-center gap-6 px-6 py-8 text-white md:order-2 md:w-1/2 md:px-8 md:py-10 ${textAlignClass}`}
          >
            <h3
              className={`font-manrope text-[40px] leading-[28px] ${
                titleBold ? "font-bold" : "font-extrabold"
              }`}
            >
              {title}
            </h3>
            <p
              className={`font-manrope font-light text-[16px] leading-[26px] ${
                descriptionMuted ? "text-white/60" : "text-white"
              }`}
            >
              {description}
            </p>
          </div>
        </>
      ) : (
        <>
          <div
            className={`flex flex-col justify-center gap-6 px-6 py-8 text-white md:w-1/2 md:px-8 md:py-10 ${textAlignClass}`}
          >
            <h3
              className={`font-manrope text-[40px] leading-[28px] ${
                titleBold ? "font-bold" : "font-extrabold"
              }`}
            >
              {title}
            </h3>
            <p
              className={`font-manrope font-light text-[16px] leading-[26px] ${
                descriptionMuted ? "text-white/60" : "text-white"
              }`}
            >
              {description}
            </p>
          </div>
          <div
            className="relative h-[240px] shrink-0 overflow-hidden md:h-auto md:min-h-0 md:w-1/2"
            data-landing-image={imageId}
          >
            <Image
              src={imageSrc}
              alt=""
              fill
              className="object-cover"
              style={imageStyle}
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
        </>
      )}
    </article>
  );
}
