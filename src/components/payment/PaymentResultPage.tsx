import {
  PaymentResultCard,
  type PaymentResultCardProps,
  type PaymentResultVariant,
} from "@/components/payment/PaymentResultCard";
import { PaymentResultShell } from "@/components/payment/PaymentResultShell";

export type { PaymentResultVariant };

type Props = PaymentResultCardProps;

export function PaymentResultPage(props: Props) {
  return (
    <PaymentResultShell>
      <PaymentResultCard {...props} />
    </PaymentResultShell>
  );
}

export type { PaymentResultCardProps };
