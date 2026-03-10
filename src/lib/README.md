# BACKEND

Սերվերային լոգիկա — DB, validation, email, R2, Stripe.

- `db.ts` — Prisma (Neon)
- `validations/` — Zod schemas
- `auth.ts` — Auth.js config
- `email.ts` — Resend
- `storage.ts` — R2 upload (`uploadToR2`), public URL (`getR2PublicUrl`). Env: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL
- `stripe.ts` — payment link creation

Աշխատում է **սերվերում** (API routes, Server Actions). Չի գնում բրաուզեր։

Frontend-ը՝ `app/`, `components/`.
