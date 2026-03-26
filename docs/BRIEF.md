# Նախագծի տեխզադրանք — Goldcrest 3D

> Լրացրու՛ այս ֆայլը զարգացումը սկսելուց առաջ։
> Լրացնելուց հետո — ուղարկի՛ր AI-ասիստենտին անալիզի և մեկնարկի համար `21-project-onboarding.mdc`-ի համաձայն։

---

## Նկարագրություն

**Goldcrest 3D** — Goldcrest-ի 3D մոդելավորման և արտադրության ծառայությունների պրոմո-կայք՝ single-page landing և admin panel-ով։ Նախագիծը լուծում է երկու խնդիր. (1) հաճախորդների հասնելիությունը — Apple-սթայլ landing + «Ուղարկել հայտ» ֆորմ, (2) կառավարում — հայտերի (leads) inbox, պատվերների ձեռքով ստեղծում և վճարումների հղումներ email-ով (Full կամ 50/50 split)։

---

## Թիրախային լսարան

- **Հիմնական.** Goldcrest-ի պոտենցիալ B2B/B2C հաճախորդներ — 3D մոդելավորում, արտադրություն, մասնագիտացված ինժեներական ծառայություններ փնտրողներ։
- **Օգտատեր.** Admin — Goldcrest թիմի անդամ(ներ), ովքեր ընդունում են հայտեր, ստեղծում պատվերներ և ուղարկում վճարման հղումներ։
- **Սցենարներ.** (1) Հաճախորդը լանդինգով ծանոթանում է ծառայություններին, լրացնում ֆորմ և կցում նկար։ (2) Admin-ը Inbox-ում տեսնում է հայտը, պատասխանում email-ով։ (3) Admin-ը ստեղծում է order, ուղարկում payment link client-ի email-ին, client-ը վճարում է (ամբողջությամբ կամ 50% + 50%)։

---

## Հիմնական ֆունկցիաներ (առաջնայնացված)

1. **Single-page Landing (scroll-to-section)** — 3 Power Banners, Goldcrest Engineering Philosophy, Modeling Specializations, Manufacturing Intelligence, Founder block, Process, Quote CTA, Footer; menu-ից սեղմելիս smooth scroll դեպի section — առաջնայնություն. **բարձր**
2. **Quote CTA — «Ուղարկել հայտ»** — Full Name, Email, Message, Image upload; submission → պահել + (ըստ ընտրության) notification — առաջնայնություն. **բարձր**
3. **Admin — Leads Inbox (Messages)** — list + detail view (client name, email, message, attachments), Reply → պատասխան ուղարկվում է client-ի email-ին — առաջնայնություն. **բարձր**
4. **Admin — Orders** — Add/Edit/Delete order: Client name, Client email, Product title, Product image (upload), Custom price; list + detail view — առաջնայնություն. **բարձր**
5. **Payment links** — Order detail-ում «Send Payment Link» և «Copy payment link»; Full (100%) կամ Split (50/50); Send → client-ի email-ին link; client-ի view-ում Total / Paid / Remaining / Payment type — առաջնայնություն. **բարձր**
6. **Admin authentication** — մուտք միայն admin panel (protected routes) — առաջնայնություն. **բարձր**
7. **Ֆայլերի պահոց** — quote attachments, order product images — առաջնայնություն. **միջին**
8. **Email** — reply to leads, payment link sending — առաջնայնություն. **միջին**
9. **SEO / metadata** — landing-ի համար հիմնական meta, title, description — առաջնայնություն. **ցածր**

---

## Stack (եթե որոշված է)

- **Խորհուրդ.** **Տարբերակ A** — fullstack Next.js (App Router) Vercel-ում. Նախագծի չափը A, մեկ դոմեն, API Routes / Server Actions, Prisma + Neon — բավարար են; NestJS-ի առանձին backend այս scope-ի համար չի պահանջվում։
- **Այլընտրանք.** Տարբերակ B — Next.js frontend + NestJS backend (Render / Fly.io), եթե ապագայում նախատեսվում է ծանր API, ռոբոտացիա կամ բազմա-սերվիս աճ։

---

## Դիզայն

- **Figma.** [հղում — ավելացնել երբ կլինի]
- **UI Kit / դիզայն-համակարգ.** [shadcn/ui կամ custom — որոշվելու է TECH_CARD-ում]

---

## Ինտեգրացիաներ

- [ ] **Վճարային համակարգ** — Stripe (խորհուրդ) / YooKassa / այլ — payment link generation, Full & Split (50/50)
- [ ] **Email** — Resend (խորհուրդ) / SendGrid / այլ — reply to leads, payment link email
- [ ] **Աուտենտիֆիկացիա** — Auth.js (խորհուրդ) / Clerk — միայն admin panel
- [ ] **Ֆայլերի պահոց** — Cloudflare R2 (լռելյայն) — quote attachments, order product images
- [ ] **Արտաքին API** — միայն վճարումների provider API (Stripe/YooKassa), email provider API

---

## Կոնտենտի լեզու

- **Ինտերֆեյսի հիմնական լեզու.** hy (հայերեն) — landing և admin UI
- **Պե՞տք է i18n.** ոչ (MVP) — մի լեզու; ապագայում հնարավոր է en

---

## Սահմանափակումներ

- **Ժամկետներ.** [ամսաթիվ կամ «առանց դեդլայնի» — լրացնել]
- **Բյուջե.** [վճարովի սերվիսներ — Neon free tier, Vercel, R2/Stripe/Resend — ըստ պլանավորման]
- **Տեխնիկական.** Vercel (frontend + serverless), Neon PostgreSQL, R2 — ըստ reference/platforms; admin-ը պետք է լինի protected, միայն auth օգտատեր

---

## Լրացուցիչ

- **Ֆունկցիոնալ մանրամաս.** Լրիվ spec — `project.md` (root).
- **Նախագծի չափ.** A (փոքր) — 1–3 ամիս, պարզ կառուցվածք `src/app`, `components`, `lib`.
- **Հաջորդ քայլ.** BRIEF հաստատել → TECH_CARD (reference/templates/TECH_CARD_TEMPLATE.md) → 01-ARCHITECTURE.md → մեկնարկ ըստ 21-project-onboarding.mdc։
