# BACKEND

Server-side logic — DB, validation, email, R2, Stripe.

- `db.ts` — Prisma (Neon)
- `validations/` — Zod schemas
- `auth.ts` — Auth.js config
- `email.ts` — Resend (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_REPLY_TO_EMAILS`; optional `ADMIN_NOTIFY_EMAIL` for new-lead notice). `resendEmailConfig.ts` — `from` / customer `replyTo` from env.
- `storage.ts` — R2 upload (`uploadToR2`), public URL (`getR2PublicUrl`). Env: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL
- `stripe.ts` — payment link creation

Runs on the **server** (API routes, Server Actions). Not sent to the browser.

Frontend: `app/`, `components/`.
