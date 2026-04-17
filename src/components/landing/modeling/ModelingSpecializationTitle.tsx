import { ModelingPlainText } from "./ModelingPlainText";

const H2_CLASS_BASE =
  "text-center text-[#e2c481]";

const H2_CLASS_MOBILE_ONLY =
  "-translate-y-[calc(1rem*var(--ms,1))] font-sans text-[calc(30px*var(--ms,1))] font-medium leading-[calc(36px*var(--ms,1))] tracking-[0.396px]";

const H2_CLASS_DESKTOP_ONLY =
  "-translate-y-[calc(2rem*var(--ms,1))] font-manrope text-[calc(48px*var(--ms,1))] font-normal leading-[calc(40px*var(--ms,1))] tracking-[-0.9px]";

type ModelingSpecializationTitleProps =
  | { title: string; titleMobile?: undefined; titleDesktop?: undefined; previewForceViewport?: never }
  | {
      title?: undefined;
      titleMobile: string;
      titleDesktop: string;
      /** Admin preview: bypass `md:` so narrow frame still shows chosen breakpoint copy. */
      previewForceViewport?: "mobile" | "desktop";
    };

/**
 * Modeling Specialization section title.
 * Mobile (Figma): Inter 30px/500, line-height 36px, tracking 0.396px, #DDAB52, one line.
 * md+: Manrope 48px, tracking -0.9px (existing desktop spec).
 */
export function ModelingSpecializationTitle(props: ModelingSpecializationTitleProps) {
  const titleDesktop =
    "titleDesktop" in props && props.titleDesktop != null
      ? props.titleDesktop
      : "title" in props
        ? props.title
        : "";
  const titleMobile =
    "titleMobile" in props && props.titleMobile != null
      ? props.titleMobile
      : "title" in props
        ? props.title
        : "";

  const force = "previewForceViewport" in props ? props.previewForceViewport : undefined;

  if (force === "mobile") {
    return (
      <div className="flex h-full w-full min-w-0 items-center justify-center px-1">
        <h2
          id="modeling-specialization"
          className={`${H2_CLASS_BASE} ${H2_CLASS_MOBILE_ONLY} max-w-full whitespace-pre-line`}
        >
          <ModelingPlainText text={titleMobile} />
        </h2>
      </div>
    );
  }

  if (force === "desktop") {
    return (
      <div className="flex h-full w-full min-w-0 items-center justify-center px-1">
        <h2
          id="modeling-specialization"
          className={`${H2_CLASS_BASE} ${H2_CLASS_DESKTOP_ONLY} max-w-full whitespace-pre-line`}
        >
          <ModelingPlainText text={titleDesktop} />
        </h2>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full min-w-0 items-center justify-center px-1">
      <h2
        id="modeling-specialization"
        className={`-translate-y-[calc(1rem*var(--ms,1))] ${H2_CLASS_BASE} max-w-full whitespace-pre-line font-sans text-[calc(30px*var(--ms,1))] font-medium leading-[calc(36px*var(--ms,1))] tracking-[0.396px] md:font-manrope md:text-[calc(48px*var(--ms,1))] md:font-normal md:leading-[calc(40px*var(--ms,1))] md:tracking-[-0.9px] md:-translate-y-[calc(2rem*var(--ms,1))]`}
      >
        {titleMobile !== titleDesktop ? (
          <>
            <span className="md:hidden">
              <ModelingPlainText text={titleMobile} />
            </span>
            <span className="hidden md:inline">
              <ModelingPlainText text={titleDesktop} />
            </span>
          </>
        ) : (
          <ModelingPlainText text={titleDesktop} />
        )}
      </h2>
    </div>
  );
}
