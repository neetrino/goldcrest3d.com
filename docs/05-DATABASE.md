# Բազային տվյալներ — Goldcrest 3D

> Սխեման — `prisma/schema.prisma`.  
> Ֆունկցիոնալ զադրանք — [project.md](../project.md).

**ՍՈՒԲԴ.** PostgreSQL 17 (Neon)  
**ORM.** Prisma  
**Վերջին թարմացում.** 2026-03-09

---

## Էնտիտիներ

### User (Auth.js)

Admin օգտատեր — մուտք admin panel.

| Դաշտ | Տիպ | Նշում |
|------|-----|-------|
| id | String (cuid) | PK |
| email | String? unique | |
| name | String? | |
| emailVerified | DateTime? | |
| image | String? | |
| createdAt, updatedAt | DateTime | |

Կապված. Account[], Session[] (Auth.js).

---

### Lead (Quote form)

Ֆորմայով եկած հայտ — Full Name, Email, Message, attachments (R2 keys).

| Դաշտ | Տիպ | Նշում |
|------|-----|-------|
| id | String (cuid) | PK |
| fullName | String | |
| email | String | |
| message | String (Text) | |
| attachmentKeys | String[] | R2 keys |
| createdAt, updatedAt | DateTime | |

---

### Order

Պատվեր — client, product, price, payment type, paid amount, public link token.

| Դաշտ | Տիպ | Նշում |
|------|-----|-------|
| id | String (cuid) | PK |
| token | String unique | Public link — /order/[token] |
| clientName | String | |
| clientEmail | String | |
| productTitle | String | |
| productImageKey | String? | R2 key |
| priceCents | Int | Custom price (cents) |
| paymentType | String | FULL \| SPLIT |
| paidCents | Int | default 0 |
| status | String | PENDING \| PAID (default PENDING) |
| createdAt, updatedAt | DateTime | |

**Client view (project.md).**  
Total price, Paid amount, Remaining balance, Payment type (Full / 50-50).  
50-50 — երկրորդ վճարումից հետո order → Paid 100%.

---

### Account, Session, VerificationToken

Auth.js — database sessions, OAuth accounts, verification.  
Տե՛ս `prisma/schema.prisma`.

---

## ER (համառոտ)

```
[User] 1 —— * Account, Session   (admin only)

[Lead] — fullName, email, message, attachmentKeys[], createdAt

[Order] — token, clientName, clientEmail, productTitle, productImageKey,
          priceCents, paymentType (FULL|SPLIT), paidCents, status
```

User-ը direct relation չունի Lead/Order-ի հետ; admin-ը մուտքով տեսնում է leads/orders list։

---

## Միգրացիաներ

- Ֆայլեր. `prisma/migrations/`
- Հրամաններ. `pnpm db:migrate`, `pnpm db:push` (dev)
- Seed. `prisma db seed` — dev-ում admin user (ըստ TECH_CARD)

---

## Timeouts (ադապտիվ)

Neon serverless — ըստ քարտի.  
connection limit, statement_timeout, idle_in_transaction_session_timeout, lock_timeout — կարգավորել համաձայնեցված արժեքներով։

---

**Կապված.** [01-ARCHITECTURE.md](./01-ARCHITECTURE.md) · [04-API.md](./04-API.md) · [prisma/schema.prisma](../prisma/schema.prisma)
