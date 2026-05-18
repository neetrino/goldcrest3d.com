export type CreateCheckoutSessionResult =
  | { success: true; url: string }
  | { success: false; error: string };
