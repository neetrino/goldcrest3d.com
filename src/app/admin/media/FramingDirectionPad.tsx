type FramingDirectionPadProps = {
  disabled: boolean;
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
};

export function FramingDirectionPad({
  disabled,
  onUp,
  onDown,
  onLeft,
  onRight,
}: FramingDirectionPadProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <PadBtn label="Move up" disabled={disabled} onClick={onUp}>
        ↑
      </PadBtn>
      <div className="flex flex-col gap-1">
        <PadBtn label="Move left" disabled={disabled} onClick={onLeft}>
          ←
        </PadBtn>
        <PadBtn label="Move right" disabled={disabled} onClick={onRight}>
          →
        </PadBtn>
      </div>
      <PadBtn label="Move down" disabled={disabled} onClick={onDown}>
        ↓
      </PadBtn>
    </div>
  );
}

type PadBtnProps = {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function PadBtn({ label, disabled, onClick, children }: PadBtnProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-lg font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50"
    >
      {children}
    </button>
  );
}
