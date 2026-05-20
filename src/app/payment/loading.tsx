import { PaymentResultShell } from "@/components/payment/PaymentResultShell";

export default function PaymentResultLoading() {
  return (
    <PaymentResultShell>
      <div
        className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 border-t-4 border-t-slate-300 bg-white p-10 shadow-[0_18px_50px_-12px_rgba(15,23,42,0.18)]"
        aria-busy="true"
        aria-label="Loading payment result"
      >
        <div className="mx-auto h-[33px] w-[57px] rounded bg-slate-200" />
        <div className="mx-auto mt-8 h-20 w-20 rounded-full bg-slate-200" />
        <div className="mx-auto mt-6 h-7 w-48 rounded bg-slate-200" />
        <div className="mx-auto mt-3 h-4 w-full max-w-sm rounded bg-slate-100" />
        <div className="mx-auto mt-2 h-4 w-[80%] max-w-xs rounded bg-slate-100" />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <div className="h-12 flex-1 rounded-full bg-slate-200 sm:max-w-[11rem]" />
          <div className="h-12 flex-1 rounded-full bg-slate-100 sm:max-w-[11rem]" />
        </div>
      </div>
    </PaymentResultShell>
  );
}
