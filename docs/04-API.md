# API և Server Actions — Goldcrest 3D

> Ըստ [project.md](../project.md).  
> Չափ A — հիմնականում Server Actions; REST API ըստ անհրաժեշտության։

**Վերջին թարմացում.** 2026-03-09

---

## Ընդհանուր

- **Վալիդացիա.** Zod բոլոր մուտքերում
- **Սխալներ.** try/catch, լոգ, կայուն պատասխան
- **Auth.** Admin routes — session check (Auth.js)

---

## Quote form (Landing)

**Նկարագրություն.** «Ուղարկել հայտ» — Full Name, Email, Message, optional file upload (PNG, JPG, PDF, max 10MB).

| Ընտրանք | Մեթոդ | Նկարագրություն |
|----------|--------|-----------------|
| Server Action | `submitQuoteForm` | Form data + optional file → Zod → Lead create, file → R2 |

**Մուտք.** `fullName`, `email`, `message`, `image?: File`  
**Ելք.** `{ success: boolean, error?: string }`

**Լոգիկա.**  
1. Zod validation  
2. Upload image to R2 (եթե կա) — `uploadToR2(prefix, file)`, prefix `quotes`  
3. `prisma.lead.create({ fullName, email, message, attachmentKeys })`  
4. (Ըստ ընտրության) email notification to admin  

**R2.** Env: `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL`. Կցված ֆայլերի public URL — `getR2PublicUrl(key)` (lib/storage).  

---

## Admin — Leads Inbox

**Նկարագրություն.** List + detail, Reply → client email.

| Ընտրանք | Մեթոդ | Նկարագրություն |
|----------|--------|-----------------|
| Server / fetch | leads list | `prisma.lead.findMany({ orderBy: { createdAt: 'desc' } })` |
| Server Action | `replyToLead` | Admin reply text → Resend → lead’s email |

**replyToLead.**  
**Մուտք.** `leadId`, `replyText`  
**Լոգիկա.** Load lead → send email via Resend to `lead.email` with `replyText`.

---

## Admin — Orders

**Նկարագրություն.** CRUD — Client name/email, Product title, Product image, Custom price; list + detail.

| Ընտրանք | Մեթոդ | Նկարագրություն |
|----------|--------|-----------------|
| Server | orders list | `prisma.order.findMany(...)` |
| Server Action | `createOrder` | Form → validation → R2 image upload → Order create (token generated) |
| Server Action | `updateOrder` | Id + fields → validation → update |
| Server Action | `deleteOrder` | Id → delete |

**createOrder.**  
**Մուտք.** `clientName`, `clientEmail`, `productTitle`, `productImage?: File`, `priceCents`, `paymentType: 'FULL' | 'SPLIT'`  
**Ելք.** `{ orderId, token }` — token for client payment link.

---

## Payment link

**Նկարագրություն.** Order detail — «Send Payment Link», «Copy payment link»; Full (100%) or Split (50/50).

| Ընտրանք | Մեթոդ | Նկարագրություն |
|----------|--------|-----------------|
| Server Action | `sendPaymentLink` | orderId → build URL `/order/[token]` (կամ Stripe link) → send email to `order.clientEmail` via Resend |
| Client | Copy link | Copy `origin + /order/[token]` to clipboard |

**Client payment page.** `GET /order/[token]` — public, no auth.  
Ցուցադրում է. Total price, Paid amount, Remaining balance, Payment type (Full / 50-50).  
50-50-ի դեպքում — մնացած 50% վճարման պարտավորություն։  
Վճարում — Stripe (payment link / checkout session).

---

## REST endpoints (եթե ավելացվեն)

| Method | Path | Նշանակություն |
|--------|------|-----------------|
| GET | /api/leads | Admin — leads list (auth) |
| GET | /api/orders | Admin — orders list (auth) |
| GET | /api/order/[token] | Public — order by token (client view) |

API-ն ներքին օգտագործման համար; Չափ A-ում Server Components + Server Actions առաջնայնություն են։

---

**Կապված.** [01-ARCHITECTURE.md](./01-ARCHITECTURE.md) · [05-DATABASE.md](./05-DATABASE.md) · [project.md](../project.md)
