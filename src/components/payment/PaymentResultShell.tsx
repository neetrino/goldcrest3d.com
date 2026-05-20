import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/** Minimal branded backdrop for bank payment return pages. */
export function PaymentResultShell({ children }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f7f6]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(226,196,129,0.14),transparent)]"
        aria-hidden="true"
      />
      <main className="relative flex min-h-screen flex-col justify-center px-4 py-12 sm:px-6">
        <div className="mx-auto w-full max-w-lg">{children}</div>
      </main>
    </div>
  );
}
