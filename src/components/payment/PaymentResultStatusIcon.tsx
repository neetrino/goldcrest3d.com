export type PaymentStatusIconKind = "tick" | "x";

const ICON_PALETTE: Record<
  PaymentStatusIconKind,
  { outer: string; inner: string; stroke: string }
> = {
  tick: {
    outer: "bg-[#edf7ee]",
    inner: "bg-[#c8e6c9]",
    stroke: "#2e7d32",
  },
  x: {
    outer: "bg-[#fff0f0]",
    inner: "bg-[#ffcdd2]",
    stroke: "#c62828",
  },
};

type Props = {
  kind: PaymentStatusIconKind;
};

export function PaymentResultStatusIcon({ kind }: Props) {
  const palette = ICON_PALETTE[kind];

  return (
    <div
      className={`flex h-20 w-20 items-center justify-center rounded-full ${palette.outer}`}
      aria-hidden="true"
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ${palette.inner}`}
      >
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke={palette.stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {kind === "tick" ? (
            <path d="M7 12.5l3 3.5L17 9" />
          ) : (
            <>
              <path d="M8 8l8 8" />
              <path d="M16 8l-8 8" />
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
