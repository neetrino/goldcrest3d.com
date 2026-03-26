# BACKEND

Server-side logic — DB, validation, email, R2, Stripe.

- `db.ts` — Prisma (Neon)
- `validations/` — Zod schemas
- `auth.ts` — Auth.js config
- `email.ts` — Resend
- `storage.ts` — R2 upload (`uploadToR2`), public URL (`getR2PublicUrl`). Env: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL
- `stripe.ts` — payment link creation

Runs on the **server** (API routes, Server Actions). Not sent to the browser.

Frontend: `app/`, `components/`.
