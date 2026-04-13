type ModelingFramePositionHelpTextProps = {
  variant: "desktop" | "mobile";
};

/**
 * Explains which live-site asset the framing editor affects (Modeling Specialization slots only).
 */
export function ModelingFramePositionHelpText({ variant }: ModelingFramePositionHelpTextProps) {
  if (variant === "desktop") {
    return (
      <p className="mt-1 text-xs leading-relaxed text-slate-600">
        <span className="font-semibold text-slate-800">Desktop / tablet.</span> Drag the image in the
        preview below or use the controls. These values apply to the medium-and-up image on the live
        site.
      </p>
    );
  }
  return (
    <p className="mt-1 text-xs leading-relaxed text-slate-600">
      <span className="font-semibold text-indigo-950">Mobile.</span> Drag the image in the preview
      below or use the controls. These values apply only to the separate mobile upload (phones /
      small viewports).
    </p>
  );
}
