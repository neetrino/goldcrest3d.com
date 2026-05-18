export type ArcaRegisterResponse = {
  orderId?: string;
  formUrl?: string;
  errorCode?: string | number;
  errorMessage?: string;
};

export type ArcaOrderStatusExtendedResponse = {
  errorCode?: string | number;
  errorMessage?: string;
  orderStatus?: number;
  actionCode?: number;
  amount?: number;
  paymentAmountInfo?: {
    paymentState?: string;
  };
};
