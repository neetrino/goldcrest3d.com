# ACBA / Arca EPG — թեստային միջավայր (goldcrest3d.com)

Պարզ ուղեցույց՝ թեստային vPOS-ը ստուգելու համար։  
Տվյալները տրամադրվել են ACBA-ի կողմից **միայն test** միջավայրի համար։

> **Կարևոր.** Այս ֆայլում կան թեստային գաղտնիքներ։ Մի վերբեռնեք հանրային repo, մի կիսեք արտաքին կողմերի հետ։ Production-ի համար բանկը կտա առանձին live տվյալներ։

---

## 1. Ինչ ինչի համար է

| Տեսակ | Ինչի համար |
|--------|------------|
| **WEB** | Բանկի merchant պորտալ — պատվերներ դիտել, կարգավորումներ |
| **API** | Կայքից վճարում սկսել (`register.do`) և կարգավիճակ ստուգել |
| **BINDING** | Քարտ կապել (կրկնակի վճարումներ) — սովորական checkout-ի համար հիմա պետք չէ |

Մեր կայքի checkout-ը օգտագործում է **API** մուտքը։

---

## 2. Թեստային մուտքեր

### Merchant պորտալ (WEB)

- **URL:** https://testepg.arca.am/epg_gui/#login  
- **Login:** `goldcrest3depg_web`  
- **Password:** `pe4tM2mL7gLeUWg`

### REST API (կայքի ինտեգրման)

- **Base URL:** `https://testepg.arca.am/payment/rest/`  
- **Login:** `goldcrest3depg_api`  
- **Password:** `pe4tM2mL7gLeUWg`

### Binding (քարտ կապել — optional)

- **Base URL:** `https://testepg.arca.am/payment/rest/`  
- **Login:** `goldcrest3depg_binding`  
- **Password:** `pe4tM2mL7gLeUWg`

---

## 3. Քայլ 1 — `.env` ֆայլում կարգավորել

Նախագծի root-ում բացեք `.env` (կամ պատճենեք `.env.example`-ից) և ավելացրեք/թարմացրեք.

```env
ARCA_API_BASE_URL=https://testepg.arca.am
ARCA_API_USERNAME=goldcrest3depg_api
ARCA_API_PASSWORD=pe4tM2mL7gLeUWg
ARCA_BANK=epg
ARCA_CURRENCY_CODE=840
ARCA_LANGUAGE=en
ARCA_FORCE_3DS2=true
```

Պարտադիր է նաև կայքի URL-ը (վճարումից հետո վերադարձի համար).

```env
AUTH_URL=https://goldcrest3d.com
```

Լոկալ թեստի դեպքում կարող եք դնել `AUTH_URL=http://localhost:3000` (եթե dev server-ը աշխատում է)։

Պահպանեք ֆայլը և վերագործարկեք dev server-ը (`pnpm dev`)։

---

## 4. Քայլ 2 — Postman-ով API ստուգել (ընտրովի, բայց արագ)

### 4.1 Պատվեր գրանցել

1. Բացեք **Postman** → նոր **POST** request  
2. **URL:**  
   `https://testepg.arca.am/payment/rest/register.do`  
3. **Body** → **x-www-form-urlencoded** (ոչ JSON)

| Դաշտ | Արժեք |
|------|--------|
| userName | goldcrest3depg_api |
| password | pe4tM2mL7gLeUWg |
| orderNumber | test-001 *(յուրաքանչյուր անգամ նոր համար)* |
| amount | 100 *(1.00 USD — minor units)* |
| currency | 840 |
| returnUrl | https://goldcrest3d.com |
| failUrl | https://goldcrest3d.com?payment=failed |
| description | Test payment |
| language | en |
| pageView | DESKTOP |
| jsonParams | {"FORCE_3DS2":"true"} |

4. Սեղմեք **Send**

Հաջող պատասխանում կտեսնեք `orderId` և `formUrl`։  
Պահեք `orderId`-ն։

### 4.2 Քարտով վճարել (բրաոուզեր)

1. Պատճենեք `formUrl`-ը և բացեք **Chrome / Edge**-ում  
2. Մուտքագրեք թեստային քարտ (տես քայլ 6)  
3. 3D Secure OTP՝ **800345**  
4. Վճարից հետո կվերահղվեք `returnUrl` — դա նորմալ է

### 4.3 Կարգավիճակ ստուգել

1. Postman → նոր **POST** request  
2. **URL:**  
   `https://testepg.arca.am/payment/rest/getOrderStatusExtended.do`  
3. **Body** → x-www-form-urlencoded

| Դաշտ | Արժեք |
|------|--------|
| userName | goldcrest3depg_api |
| password | pe4tM2mL7gLeUWg |
| orderId | *(քայլ 4.1-ի orderId)* |
| language | en |

Վճարումը հաջող լինելու դեպքում `orderStatus` = **2** (վճարված)։

---

## 5. Քայլ 3 — Կայքում թեստ (իրական հոսք)

1. `.env`-ը լրացրած լինի (քայլ 3)  
2. Գործարկեք `pnpm dev`  
3. Admin panel-ից ստեղծեք պատվեր և ուղարկեք payment link (կամ բացեք client payment page-ը token-ով)  
4. Սեղմեք վճարման կոճակը → բացվում է Arca-ի էջը  
5. Մուտքագրեք թեստային քարտ + OTP **800345**  
6. Վերադարձից հետո կայքում պետք է ցուցադրվի, որ վճարումը կատարվել է

Լրացուցիչ՝ merchant պորտալում (քայլ 2 WEB) կարող եք տեսնել նույն պատվերը։

---

## 6. Թեստային քարտեր

### MasterCard

| | |
|--|--|
| Քարտի համար | 5181 8000 0060 7963 |
| Վավերացում | 08/27 |
| CVV | 571 |

### VISA

| | |
|--|--|
| Քարտի համար | 4355 0539 2607 9825 |
| Վավերացում | 01/29 |
| CVV | 389 |

### 3D Secure (OTP)

**800345** — մուտքագրել 3DS էկրանին

---

## 7. Հաճախ հանդիպող խնդիրներ

| Խնդիր | Լուծում |
|--------|---------|
| `errorCode` ≠ 0 | Ստուգեք login/password, `orderNumber` կրկնվում է — դրեք նոր |
| JSON չի գալիս | URL-ում պետք է լինի `/payment/rest/register.do` |
| Սխալ user | Checkout-ի համար `goldcrest3depg_api`, ոչ `web` |
| Գումարի սխալ | `amount` minor units-ով է (100 = 1 USD) |

---

## 8. Production (երբ պատրաստ լինեք)

1. Բանկից ստանալ **live** API URL և մուտքեր  
2. `.env`-ում փոխել `ARCA_API_BASE_URL` → `https://epg.arca.am` (կամ բանկի ցույց տված host)  
3. Live քարտերով վճարում **չանել** մինչև վերջական թեստը  
4. Կայքում տեղադրել վճարային համակարգի լոգոները (ACBA-ի ուղարկված ֆայլերից)

---

## Կարճ հիշողություն

1. `.env` → test API տվյալներ  
2. Postman → `register.do` → բրաոուզերում `formUrl` + քարտ  
3. Postman → `getOrderStatusExtended.do`  
4. Կամ ուղղակի կայքի payment page-ով նույն հոսքը
