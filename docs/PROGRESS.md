# Զարգացման առաջընթաց — Goldcrest 3D

**Նախագիծ.** Goldcrest 3D  
**Փուլ.** Payment link + Client page ավարտված  
**Ընդհանուր առաջընթաց.** ~75%

**Վերջին թարմացում.** 2026-03-10

---

## 📊 ԱՄԲՈՂՋԱԿ

| Փուլ | Ստատուս | Առաջընթաց |
|------|---------|------------|
| 1. Նախաձեռնում (փաստաթղթեր) | 🔄 Աշխատանքի մեջ | 95% |
| 2. Landing + Quote form | 🔄 Աշխատանքի մեջ | 85% |
| 3. Admin — Leads Inbox | ✅ Պատրաստ | 100% |
| 4. Admin — Orders + Payments | ✅ Պատրաստ | 100% |
| 5. Payment link + Client page | ✅ Պատրաստ | 100% |
| 6. Թեստավորում + Դեպլոյ | ⏳ Սպասվում է | 0% |

---

## ✅ ԿԱՏԱՐՎԱԾ

### Փուլ 1. Նախաձեռնում
- [x] Նախագծի չափի որոշում (A)
- [x] docs/BRIEF.md — լրացված
- [x] docs/TECH_CARD.md — ստեղծված (սևագիր, սպասվում է հաստատում)
- [x] docs/01-ARCHITECTURE.md — ստեղծված
- [x] docs/02-TECH_STACK.md, 03-STRUCTURE.md, 04-API.md, 05-DATABASE.md — ստեղծված
- [x] docs/DECISIONS.md — ստեղծված
- [x] docs/archive/ — ստեղծված
- [x] docs/PROGRESS.md — այս ֆայլը
- [x] README.md — նախագծի նկարագրություն + մեկնարկի հրահանգ (src/, project.md)
- [x] .env.example — DATABASE_URL, DIRECT_URL, R2, Resend, Stripe, Auth
- [ ] TECH_CARD հաստատում → կոդի մեկնարկ

---

## 🔄 ԱՇԽԱՏԱՆՔԻ ՄԵՋ

### Փուլ 1 (95%)
- [ ] TECH_CARD — մշակողի հաստատում

### Փուլ 2 — Landing (85%)
- [x] Landing sections 1.2–1.10 — Power Banners, Philosophy, Specializations, Manufacturing, Founder, Process, Quote CTA, Footer, SEO
- [x] Quote form — Full Name, Email, Message, Image upload → Server Action → Prisma + R2

**Բլոկեր.** Փուլ 0.3 — DB migrate reset (մշակողի հաստատում) — եթե ցանկանում եք db:migrate-ը անխափան աշխատի

---

## 📋 ՀԱՋՈՐԴ ԱՌԱՋԱԴՐԱՆՔՆԵՐ

### Փուլ 2 — Landing + Quote form
1. [x] Next.js նախագիծ (pnpm, TypeScript, Tailwind, shadcn)
2. [x] Prisma + Neon, schema (Lead, User)
3. [x] Landing page — sections (Banners, Philosophy, Specializations, Manufacturing, Founder, Process, Quote CTA, Footer), scroll-to-section
4. [x] Quote form — Full Name, Email, Message, Image upload → Server Action → Prisma + R2
5. [x] SEO — metadata, title, description

### Փուլ 3 — Admin Leads Inbox
6. [x] Auth.js — admin auth, protected /admin (Credentials, JWT, middleware, /auth/signin, seed)
7. [x] Leads Inbox — list + detail view (name, email, message, attachments)
8. [x] Reply → Resend, client email (sendReplyToLead, LeadReplyForm)

### Փուլ 4 — Admin Orders + Payments
9. [ ] Orders — CRUD (client name/email, product title, product image, custom price)
10. [ ] Order detail — «Send Payment Link», «Copy payment link»; payment type Full / 50-50
11. [ ] Stripe — payment link generation, 50/50 logic
12. [ ] Email — payment link ուղարկում client-ին
13. [ ] Client payment page — /order/[token] — Total / Paid / Remaining / type, pay button

### Փուլ 5 — Polish + Deploy
14. [ ] Rate limiting, validation, error handling
15. [ ] Թեստեր (Vitest, RTL)
16. [ ] Vercel deploy, env, Neon migration
17. [ ] PROGRESS 100%, TECH_CARD 12-րդ բաժին

---

## 🚧 ԲԼՈԿԵՐՆԵՐ

### 🔴 Կրիտիկական
- Դեռ չկա

### 🟡 Ոչ կրիտիկական
- Figma / դիզայն — [հղում ավելացնել երբ կլինի]

---

## 💡 Նշումներ և որոշումներ

### 2026-03-09
- Փաստաթղթերի փաթեթ պատրաստված — BRIEF, TECH_CARD, 01-ARCHITECTURE, PROGRESS (project.md + repo հիման վրա)
- Չափ A, fullstack Next.js, Vercel, Neon, R2, Resend, Stripe, Auth.js

### 2026-03-09 (թարմացում)
- Ավելացվել են docs/02-TECH_STACK.md, 03-STRUCTURE.md, 04-API.md, 05-DATABASE.md, DECISIONS.md, archive/
- README.md — ուղղված (src/, project.md, մեկնարկի հրահանգ, փաստաթղթերի աղյուսակ)
- .env.example — DATABASE_URL, DIRECT_URL, R2, Resend, Stripe, Auth
- 02-FRONTEND-BACKEND.md — _project → src/
- 01-ARCHITECTURE.md — կապված փաստաթղթերի ցանկ և docs tree թարմացված

### 2026-03-10
- Quote form — QuoteForm.tsx (react-hook-form + useActionState), Server Action submitQuote
- R2 upload — src/lib/storage.ts (@aws-sdk/client-s3), uploadToR2("quotes", file)
- .env.example — ավելացվել է R2_ACCOUNT_ID
- LandingSections — «Ուղարկել հայտ» սեկցիայում ներդրված QuoteForm

### 2026-03-10 (Փուլ 3)
- Auth.js — next-auth@beta, Credentials (email/password, argon2), PrismaAdapter, JWT session
- Middleware — /admin պաշտպանություն, /auth/signin, /auth/error
- Admin layout — նավ (Հայտեր, Պատվերներ), Դուրս գալ
- Seed — prisma db seed, admin user (SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD)
- Leads Inbox — ցանկ (fullName, email, message, createdAt), detail /admin/leads/[id]
- Կցված ֆայլեր — R2 public URL-ներ lead detail-ում
- Resend — sendEmail, sendReplyToLead; LeadReplyForm → replyToLeadAction

---

## 📈 ՄԵՏՐԻԿՆԵՐ

### Կոդ
- Կոդի տողեր. —
- Ֆայլեր. —
- Թեստեր. —

### Թեստերի ծածկույթ
- Unit. —
- Integration. —

---

## 🔗 Օգտակար հղումներ

- [project.md](../project.md) — ֆունկցիոնալ զադրանք
- [docs/BRIEF.md](./BRIEF.md)
- [docs/TECH_CARD.md](./TECH_CARD.md)
- [docs/01-ARCHITECTURE.md](./01-ARCHITECTURE.md)
- [docs/02-TECH_STACK.md](./02-TECH_STACK.md) · [03-STRUCTURE.md](./03-STRUCTURE.md) · [04-API.md](./04-API.md) · [05-DATABASE.md](./05-DATABASE.md) · [DECISIONS.md](./DECISIONS.md)
- reference/platforms/ — Vercel, Neon, R2, Resend, Auth

---

**Հաջորդ թարմացում.** Փուլ 4 — Orders + Payments
