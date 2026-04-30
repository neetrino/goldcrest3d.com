# Admin Panel — Goldcrest 3D

> Admin-ին վերաբերող բոլոր մասերը մի տեղում. Ճանապարհներ, էկրաններ, Server Actions, env, ԲԴ, անվտանգություն։

**Վերջին թարմացում.** 2026-03-10

---

## 1. Ընդհանուր

### Նշանակություն
Admin panel-ը ծառայում է.
- **Leads Inbox** — landing-ի quote form-ից եկած հայտերի ցանկ, դիտում, պատասխան email-ով
- **Orders** — պատվերների ցանկ, ստեղծում/խմբագրում/ջնջում, payment link-ի ուղարկում/copy

### Օգտատեր
Միայն Admin (նախատեսված է Auth.js-ով session check; ներկայումս docs-ում նշված protection-ը կարող է դեռ չլինել կոդում — ստուգել `src/app/admin/layout.tsx` և middleware).

### Հղումներ
- [01-ARCHITECTURE.md](./01-ARCHITECTURE.md) — ճարտարապետություն
- [04-API.md](./04-API.md) — Server Actions / API
- [05-DATABASE.md](./05-DATABASE.md) — Lead / Order սխեմա

---

## 2. Ճանապարհներ (routes)

| URL | Նկարագրություն |
|-----|-----------------|
| `/auth/signin` | Admin sign-in (proxy redirects անauthenticated /admin այստեղ; callbackUrl պահպանվում է) |
| `/admin` | Layout only; նավիգացիա Leads / Orders (միայն auth-ից հետո) |
| `/admin/leads` | Leads ցանկ (fullName, email, message, createdAt, attachment count) |
| `/admin/leads/[id]` | Lead դիտում + Reply form (email client-ին) |
| `/admin/orders` | Orders ցանկ + «New order» |
| `/admin/orders/new` | Նոր պատվեր — Create form |
| `/admin/orders/[id]` | Order դիտում + Payment link (Send/Copy) + Edit form + Delete |

Client-ի payment page (public, առանց auth):
- `/order/[token]` — պատվերի վճարման էջ (Total / Paid / Remaining, Stripe checkout).

---

## 3. Կառուցվածք (ֆայլեր)

```
src/app/admin/
├── layout.tsx              # Header nav: Leads, Orders
├── leads/
│   ├── page.tsx             # List
│   └── [id]/
│       ├── page.tsx         # Detail + attachments + LeadReplyForm
│       └── LeadReplyForm.tsx
└── orders/
    ├── page.tsx             # List + link to new
    ├── new/
    │   ├── page.tsx         # New order page
    │   └── OrderNewForm.tsx
    └── [id]/
        ├── page.tsx         # Detail + PaymentLinkActions + OrderEditForm + DeleteOrderButton
        ├── OrderEditForm.tsx
        ├── DeleteOrderButton.tsx
        └── PaymentLinkActions.tsx
```

**Server Actions:**
- `src/app/actions/order.ts` — createOrder, updateOrder, deleteOrder, sendPaymentLink
- `src/app/actions/lead.ts` — replyToLeadAction

**Lib:**
- `src/lib/email.ts` — sendEmail, sendReplyToLead, sendNewLeadNotificationToAdmin
- `src/lib/appUrl.ts` — getOrderPaymentUrl(token)
- `src/lib/storage.ts` — uploadToR2, getR2PublicUrl
- `src/lib/validations/orderForm.ts` — orderFormSchema (clientName, clientEmail, productTitle, priceCents, paymentType)
- `src/lib/validations/leadReply.ts` — leadReplySchema (body, max 10k chars)

---

## 4. Leads

### 4.1 Ցանկ (`/admin/leads`)
- `prisma.lead.findMany({ orderBy: { createdAt: 'desc' } })`
- Յուրաքանչյուր lead: fullName, email, message (line-clamp 2), createdAt, attachment count

### 4.2 Դիտում (`/admin/leads/[id]`)
- Lead: fullName, email, message (whitespace-pre-wrap), createdAt
- Կցված ֆայլեր: `lead.attachmentKeys` → R2 public URL-ներ (`getR2PublicUrl(key)`)

### 4.3 Պատասխան (Reply)
- **LeadReplyForm** — textarea «Reply text», Submit → `replyToLeadAction(leadId, prev, formData)`
- **replyToLeadAction** (Lead): body → Zod (leadReplySchema) → `sendReplyToLead({ to: lead.email, body })` (Resend)
- Subject: «Goldcrest 3D — reply to your request»

**Env.** Resend: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_REPLY_TO_EMAILS` (comma-separated customer Reply-To). Նոր հայտի ծանուցում ադմինին (ոչ պարտադիր): `ADMIN_NOTIFY_EMAIL`.

---

## 5. Orders

### 5.1 Ցանկ (`/admin/orders`)
- `prisma.order.findMany({ orderBy: { createdAt: 'desc' } })`
- Յուրաքանչյուր order: clientName, clientEmail, productTitle, priceCents (AMD), paymentType, status (PAID/Pending), createdAt
- Կոճակ «New order» → `/admin/orders/new`

### 5.2 Նոր պատվեր (`/admin/orders/new`)
- **OrderNewForm**: clientName, clientEmail, productTitle, productImage (optional file), priceCents, paymentType (FULL / SPLIT)
- **createOrder** (Server Action): Zod (orderFormSchema) → optional R2 upload (prefix `orders`) → `prisma.order.create` (token = 16 chars UUID-based)
- Հաջողության դեպքում redirect → `/admin/orders/[id]`

### 5.3 Order դիտում (`/admin/orders/[id]`)
- Ցուցադրում: productTitle, clientName, clientEmail, priceCents, paymentType, status, paidCents (եթե > 0), token, createdAt, product image link (R2)

**Payment link:**
- **PaymentLinkActions**: «Send payment link» → `sendPaymentLink(orderId)` (email client-ին), «Copy link» → clipboard `getOrderPaymentUrl(order.token)` (= `AUTH_URL` origin + `/order/[token]`)
- **sendPaymentLink**: Subject «Goldcrest 3D — payment link», text/html with link, product, price. Պահանջվում է `AUTH_URL` (origin) configured.

**Խմբագրում:**
- **OrderEditForm**: clientName, clientEmail, productTitle, product image (change — optional new file), priceCents, paymentType → **updateOrder(orderId, prev, formData)**

**Ջնջում:**
- **DeleteOrderButton**: confirm → **deleteOrder(orderId)** → redirect to `/admin/orders`

### 5.4 Order դաշտեր (Prisma)
- id, token (unique), clientName, clientEmail, productTitle, productImageKey (R2), priceCents, paymentType (FULL | SPLIT), paidCents, status (PENDING | PAID), createdAt, updatedAt

---

## 6. Server Actions — ամփոփ

| Action | Ֆայլ | Նկարագրություն |
|--------|------|-----------------|
| createOrder | order.ts | Form → validation → R2 image (optional) → Order create, token |
| updateOrder | order.ts | Form → validation → R2 image (optional) → Order update |
| deleteOrder | order.ts | Order delete by id |
| sendPaymentLink | order.ts | Email to order.clientEmail with payment URL (AUTH_URL + /order/[token]) |
| replyToLeadAction | lead.ts | Form body → validation → sendReplyToLead(lead.email, body) |

Բոլոր մուտքերը վալիդացվում են Zod-ով; սխալների դեպքում վերադարձվում է error message։

---

## 7. Env փոփոխականներ (Admin-ի համար անհրաժեշտ)

| Փոփոխական | Նշանակություն |
|------------|----------------|
| **Auth (admin մուտք)** | |
| AUTH_SECRET | Auth.js secret (openssl rand -base64 32) |
| AUTH_URL | Site origin (http://localhost:3000 / https://yourdomain.com) — payment link-ի base |
| **ԲԴ** | |
| DATABASE_URL, DIRECT_URL | Neon PostgreSQL |
| **Ֆայլեր (R2)** | Lead attachments, order product image |
| R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL | |
| **Email (Resend)** | Reply to leads, payment link email |
| RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_REPLY_TO_EMAILS | |
| ADMIN_NOTIFY_EMAIL | Նոր lead-ի ծանուցում ադմինին (ոչ պարտադիր) |
| **Stripe (client payment)** | |
| STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET | Payment link / checkout |

Մանրամասն `.env.example` արմատում։

---

## 8. ԲԴ (Lead & Order)

- **Lead**: id, fullName, email, message, attachmentKeys[], createdAt, updatedAt
- **Order**: id, token, clientName, clientEmail, productTitle, productImageKey?, priceCents, paymentType, paidCents, status, createdAt, updatedAt

Միգրացիաներ. `prisma/migrations/`. Հրամաններ. `pnpm db:migrate`, `pnpm db:push` (dev).

---

## 9. Անվտանգություն և պրոտեկցիա

- **Նախատեսված.** Admin routes (`/admin/*`) — session check (Auth.js). TECH_CARD: Auth.js 5.x, Database sessions, ADMIN role.
- **Proxy (Next.js 16).** Պրոտեկցիա միայն `src/proxy.ts`-ով. `middleware.ts` **ոչ միատեղ չի օգտագործվում** (խնդիրներից խուսափելու համար).
  - Անauthenticated հարցումներ `/admin` կամ `/admin/*` → proxy-ն redirect է անում `/auth/signin?callbackUrl=<path>`.
  - Admin էջը **երբեք** չի բացվում առանց auth; նախ միշտ sign-in էջ։
- **Layout (server-side).** `src/app/admin/layout.tsx` — `auth()` session check; absence-ի դեպքում redirect `/auth/signin?callbackUrl=/admin` (defense in depth).
- **Sign-in.** Custom էջ `src/app/auth/signin/page.tsx` — Auth.js `pages.signIn: "/auth/signin"`. Սխալ login-ի դեպքում ապահով հաղորդագրություն. «Invalid email or password. Please try again.»
- **Server Actions.** createOrder, updateOrder, deleteOrder, sendPaymentLink, replyToLeadAction — session check action-ների ներսում (admin only).
- **Գաղտնիքներ.** Միասնական env; production-ում AUTH_SECRET, DB, R2, Resend, Stripe — protected.

---

## 10. Օգտագործման հակիրճ հոսք (Admin)

1. **Leads:** Բացել `/admin/leads` → ընտրել lead → կարդալ հաղորդագրություն և կցված ֆայլեր → «Reply to the requester» — գրել տեքստ → Send (email կգնա lead.email).
2. **Պատվեր ստեղծել:** `/admin/orders` → «New order» → լրացնել client, product, price, payment type, optional image → Save → redirect to order detail.
3. **Payment link:** Order detail-ում «Send payment link» (email client-ին) կամ «Copy link» (paste anywhere). Client-ը բացում է `/order/[token]` և վճարում Stripe-ով.
4. **Խմբագրել պատվեր:** Order detail → Edit block → փոխել դաշտեր / նկար → Update.
5. **Ջնջել պատվեր:** Order detail → Danger → «Delete order» → confirm.

---

## 11. .env-ի օգտագործում

- **Next.js** (dev/build/start) — ինքնաբերաբար բեռնում է արմատի `.env`.
- **Prisma** (migrate, push, generate) — `prisma.config.ts`-ում `import "dotenv/config"`, այսինքն `.env`-ը բեռնվում է.
- **Seed** (`pnpm db:seed`) — `prisma/seed.ts` (ներկայումս admin seed չի պարունակում; տվյալները DB-ում են)։ Migrate-ի ժամանակ `dotenv`-ը բեռնվում է `prisma.config.ts`-ով։

---

## 12. Կապված փաստաթղթեր

- [01-ARCHITECTURE.md](./01-ARCHITECTURE.md)
- [03-STRUCTURE.md](./03-STRUCTURE.md)
- [04-API.md](./04-API.md)
- [05-DATABASE.md](./05-DATABASE.md)
- [TECH_CARD.md](./TECH_CARD.md) (Auth.js, Resend, R2, Stripe)
- [.env.example](../.env.example)
