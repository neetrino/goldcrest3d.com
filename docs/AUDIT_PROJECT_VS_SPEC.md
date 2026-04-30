# Աուդիտ. Նախագիծ vs project.md (Functional Specification)

**Ամսաթիվ.** 2026-03-10  
**Հիմք.** `project.md` — functional specification, ստուգում ըստ իրական կոդի։

---

## 1. Implemented correctly

- **Landing — single-page, scroll-by-anchor**  
  Գլխավոր էջը մեկ էջ է (`src/app/page.tsx`), `LandingNav`-ում `href="#hero"`, `#philosophy`, `#specializations`, `#founder`, `#footer` — menu-ից սեղմելիս բrowser-ը scroll է անում համապատասխան section (native anchor behavior). ✅

- **Landing sections (1)**  
  Բոլոր section-ները առկա են `LandingSections.tsx`-ում.  
  - 3 Power Banners (`PowerBanners.tsx` — 3 բաններ, rotation)  
  - Goldcrest Engineering Philosophy  
  - Modeling Specializations  
  - Manufacturing Intelligence  
  - Founder — Authority Block  
  - Process  
  - Quote CTA (form)  
  - Footer Section  

- **Quote CTA form (2)**  
  - Դաշտեր. Full Name, Email, Message, Image upload (optional) — `QuoteForm.tsx` + `submitQuote` in `actions/quote.ts`.  
  - Վալիդացիա. `quoteFormSchema` (fullName, email, message).  
  - Կցված ֆայլ. upload to R2 (`uploadToR2(R2_PREFIXES.QUOTES, file)`), keys in `Lead.attachmentKeys`.  
  - Lead ստեղծում Prisma-ով.  
  - Admin-ին նոտիֆիկացիա (email) — `sendNewLeadNotificationToAdmin` (optional `ADMIN_NOTIFY_EMAIL`).  

- **Admin — Leads / Messages Inbox (3)**  
  - Module-ը կոչվում է «Leads» UI-ում, doc-ում «Messages/Inbox» — ֆունկցիոնալ նույնն է.  
  - Message list. `admin/leads` — ցուցադրում է բոլոր lead-երը (fullName, email, message preview, attachments count, date).  
  - Detail view. `admin/leads/[id]` — client name, email, message, attachments (links to R2 via `getR2PublicUrl`).  
  - Reply. `LeadReplyForm` — «Reply» / «Send» — `replyToLeadAction` → `sendReplyToLead` → email ուղարկվում է client-ի form-ում նշված email-ին (Resend).  

- **Admin — Orders module (4)**  
  - Orders list. `admin/orders` + «New order» link.  
  - Add New Order. `admin/orders/new` + `OrderNewForm`: Client name, Client email, Product title, Product image (upload), Custom price (AMD), Payment type (FULL / SPLIT). Save → Prisma `Order` create, redirect to order detail.  
  - Order detail. `admin/orders/[id]` — ցուցադրում է order-ի բոլոր դաշտերը + product image link.  
  - Edit order. `OrderEditForm` — update նույն դաշտերով.  
  - Delete. `DeleteOrderButton` + `deleteOrder` action.  

- **Payment link sending (5)**  
  - Order detail-ում «Payment link» section.  
  - «Send payment link» — `sendPaymentLink(orderId)` → email client-ի email-ին payment URL-ով (`getOrderPaymentUrl(order.token)` → `/order/[token]`).  
  - «Copy link» — clipboard copy of same URL.  
  - Payment link logic. Full Payment (100%) և Split 50/50 — order-ում `paymentType` (FULL | SPLIT), checkout-ում amount հաշվարկվում է համապատասխան.  

- **Client order page & payment (5–6)**  
  - Route. `/order/[token]` — public, token-ով order fetch.  
  - Ցուցադրում. Total price, Paid amount, Remaining balance, Payment type (Full amount / 50%+50%).  
  - 50-50. Ցուցադրում է «Pay first 50%» / «Pay second 50%» և «Pay the remaining 50%» text.  
  - Stripe Checkout. `createCheckoutSessionForOrder` — FULL = remaining total, SPLIT = first 50% or second 50%.  
  - Webhook. `api/webhooks/stripe` — `checkout.session.completed` → `paidCents += amount_total`, եթե `paidCents >= priceCents` → `status: "PAID"`.  

- **Database**  
  - PostgreSQL (Prisma). Models. `User`, `Account`, `Session`, `VerificationToken` (Auth), `Lead`, `Order`.  
  - Order. token, clientName, clientEmail, productTitle, productImageKey, priceCents, paymentType, paidCents, status.  

- **Storage**  
  - R2. Quote attachments → `R2_PREFIXES.QUOTES`, order product image → `R2_PREFIXES.ORDERS`. `uploadToR2`, `getR2PublicUrl` (env: R2_*, R2_PUBLIC_URL).  

- **Auth**  
  - Auth.js (next-auth v5), Credentials provider, JWT. Admin layout. `auth()` — no session → `AdminSignInGate` (sign-in form).  

- **Email**  
  - Resend. New lead notification (admin), reply to lead (client), payment link (client). Env: RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_REPLY_TO_EMAILS, ADMIN_NOTIFY_EMAIL.  

- **Validations**  
  - `quoteFormSchema`, `orderFormSchema`, `leadReplySchema` (Zod).  

---

## 2. Partially implemented

- **Landing nav coverage**  
  Doc-ը նշում է menu-ից scroll to section. Nav-ում կան. Home (hero), Specializations, Engineering (philosophy), Founder, Contact (footer). **Մենյուում բացակայում են.** Manufacturing, Process, Quote — այդ section-ներին scroll անելու համար օգտատերը կարող է only manually scroll or use URL hash. Ֆունկցիոնալությունը ամբողջությամբ աշխատում է (anchor links աշխատում են), բայց մենյուում section-ների ամբողջական ցանկ չկա.  

- **Quote form rate limiting**  
  `constants`: `RATE_LIMIT_QUOTE_WINDOW_MS`, `RATE_LIMIT_QUOTE_MAX`. `proxy.ts`-ում կա rate limit logic (POST `/` by IP). **Սակայն** նախագծում **չկա `middleware.ts`**, որ export default և կանչի `proxy`. Այդ իսկ պատճառով proxy-ի կոդը **չի կատարվում** — rate limiting **de facto անջատված** է. (Admin protection-ը աշխատում է layout-ի միջոցով, ոչ middleware-ի.)  

---

## 3. Missing

- **Ոչինչ կրիտիկական** — doc-ում նշված հիմնական ֆլոուները (landing, quote form, leads inbox, reply email, orders CRUD, payment link send/copy, client order page, Full/Split payment, Stripe webhook) իրականացված են.  
- **Փաստաթղթում նշված «Messages/Inbox»** — UI-ում օգտագործվում է «Leads» (տերմինի տարբերություն, ոչ ֆունկցիայի բացակայություն).  

---

## 4. Mismatches

- **Doc: «Admin panel-ում լինելու է Messages/Inbox module»**  
  Կոդում. «Leads» (Leads list, Leads detail). Նույն entity-ն (form-ից եկած հաղորդագրություններ), այլ անվանում.  

- **Doc: «Ուղարկել հայտ» (form button)**  
  UI-ում. «Send request» (անգլերեն). Տեքստի տարբերություն, ոչ ֆունկցիայի.  

- **Doc: «Add New Order»**  
  UI-ում. «New order» (link) և «Save order» (button). Ֆունկցիոնալ նույնն է.  

---

## 5. Risks / important notes

- **`proxy.ts` (auth + rate limit) unused**  
  Ֆայլը export է անում `proxy(req)` և `config.matcher`, բայց Next.js-ում middleware-ը պետք է լինի `middleware.ts` (root or src) և export default. Այդ ֆայլ չկա, այդ պատճառով.  
  - Admin protection. **Աշխատում է** layout-ի միջոցով (`auth()`, `AdminSignInGate`).  
  - Quote rate limiting. **Չի աշխատում** — POST `/` rate limit-ը never runs. Անհրաժեշտության դեպքում ավելացնել `middleware.ts`, որ default export-ը կանչի `proxy`.  

- **Stripe currency `amd`**  
  `lib/stripe.ts`-ում `currency: "amd"` (Armenian Dram). Stripe-ը AMD support ունի; production-ում պետք է հաստատել, որ Stripe account-ը AMD ակտիվացրած է.  

- **Payment success redirect**  
  Checkout `success_url` — `${baseUrl}?session_id=...&paid=1`. Client page-ը status-ը կարդում է DB-ից (order.paidCents, order.status). Webhook-ը թարմացնում է DB-ն, այդ պատճառով redirect-ից հետո refresh/revisit-ում արդեն «Order is fully paid» կերևա. Եթե webhook-ը delay ունենա, օգտատերը կարճ ժամանակ կարող է դեռ «Pay» տեսնել — ընդունելի trade-off.  

- **R2 public URL**  
  `getR2PublicUrl` վերադարձնում է `null`, եթե `R2_PUBLIC_URL` չկա. Lead attachments և order product image links-ը այդ դեպքում աշխատել չեն (link չի բացվի). Env-ը պետք է կարգավորված լինի (R2 public bucket or custom domain).  

- **Price display**  
  `formatPriceAmd` — արժեքը պահվում է cents-ով, ցուցադրում `cents/100` (AMD whole numbers). Doc-ը «Custom price (manual price input)» — իրականացված է price in AMD (integer), UI-ում «Price (AMD)».  

---

## 6. Final summary

- **Completeness (by doc).** Մոտ **95%**.  
  - Բոլոր հիմնական ֆիչերը (landing sections, quote form + file upload, leads list/detail + reply email, orders CRUD, payment link send/copy, client order page, Full/Split payment, Stripe checkout + webhook) **իրականացված և aligned** են doc-ի հետ.  
  - Մասնակի. nav-ում section-ների ամբողջ ցանկ չկա; quote rate limiting կոդը կա, բայց middleware չի միացված, այդ պատճառով inactive.  
  - Mismatches-ը միայն անվանումներ/լեզու (Leads vs Messages/Inbox, «Send request» vs «Ուղարկել հայտ»).  

- **Conclusion.**  
  Նախագիծը **de facto համապատասխանում է** `project.md` functional specification-ին. Բացակայող միակ «ակտիվ» մասը quote form-ի rate limiting-ն է (logic-ը գրված է, բայց middleware-ը չի միացված). Մնացածը աշխատում է. Կարող եք ավելացնել `middleware.ts` և nav-ում բոլոր section-ների link-երը, եթե doc-ի 100% compliance է պահանջվում.
