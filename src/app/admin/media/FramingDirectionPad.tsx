type FramingDirectionPadProps = {
  disabled: boolean;
  compact?: boolean;
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
};

export function FramingDirectionPad({
  disabled,
  compact = false,
  onUp,
  onDown,
  onLeft,
  onRight,
}: FramingDirectionPadProps) {
  const rootClassName = compact
    ? "flex flex-wrap items-center justify-center gap-1.5"
    : "flex flex-wrap items-center justify-center gap-2";
  const stackClassName = compact ? "flex flex-col gap-0.5" : "flex flex-col gap-1";

  return (
    <div className={rootClassName}>
      <PadBtn label="Move up" disabled={disabled} onClick={onUp} compact={compact}>
        ↑
      </PadBtn>
      <div className={stackClassName}>
        <PadBtn label="Move left" disabled={disabled} onClick={onLeft} compact={compact}>
          ←
        </PadBtn>
        <PadBtn label="Move right" disabled={disabled} onClick={onRight} compact={compact}>
          →
        </PadBtn>
      </div>
      <PadBtn label="Move down" disabled={disabled} onClick={onDown} compact={compact}>
        ↓
      </PadBtn>
    </div>
  );
}

type PadBtnProps = {
  label: string;
  disabled: boolean;
  compact: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function PadBtn({ label, disabled, compact, onClick, children }: PadBtnProps) {
  const className = compact
    ? "flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-base font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50"
    : "flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-lg font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}
