# BACKEND

Սերվերային լոգիկա — DB, validation, email, R2, Stripe.

- `db.ts` — Prisma (Neon)
- `validations/` — Zod schemas
- `auth.ts` — Auth.js config
- `email.ts` — Resend
- `storage.ts` — R2 upload
- `stripe.ts` — payment link creation

Աշխատում է **սերվերում** (API routes, Server Actions). Չի գնում բրաուզեր։

Frontend-ը՝ `app/`, `components/`.
