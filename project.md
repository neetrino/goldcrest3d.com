Functional Specification
Landing Page + Admin Orders & Payments
Պետք է ստեղծվի single-page Landing Page ` ինչպես Apple-ի կայքում՝ menu-ից սեղմելիս
էջը իջնում է համապատասխան հատված։

1) Landing page-ը ներառում է հետեւյալ հիմնական section-ները՝
● 3 Power Banners
● Goldcrest Engineering Philosophy
● Modeling Specializations
● Manufacturing Intelligence
● Founder — Authority Block
● Process
● Quote CTA
● Footer Section
2) Quote CTA - “Ուղարկել հայտ” ֆոռմ
Ֆոռմայի դաշտերը՝
● Full Name
● Email
● Message
● Image upload (file attachment)

3) Admin Panel — Հայտեր (Leads Inbox)
Admin panel-ում լինելու է Messages/Inbox module , որտեղ երեւում են form-ով եկած բոլոր
հաղորդագրությունները՝ որպես message list + detail view։
Message detail view:
● Client-ի name, email, message, attachments
● Admin-ը կարող է սեղմել Reply եւ գրել պատասխան

Reply rules (email behavior):
● Admin-ի reply-ն ուղարկվում է client-ի form-ում նշված Email address - ին

4) Admin Panel — Պատվերների կառավարում
Admin panel-ում պետք է լինի Orders module , որտեղ admin-ը ձեռքով ստեղծում եւ
կառավարում է պատվերները։
● Admin-ը սեղմում է Add New Order
● Լրացնում է order-ի տվյալները՝
○ Client name
○ Client email
○ Product title / product name
○ Product image (upload)
○ Custom price (manual price input)
● Save-ից հետո order-ը ավելանում է orders list-ում

5) Payment Link Sending (Email-based Payment Request)
Յուրաքանչյուր order-ի detail view-ում պետք է լինի “Send Payment Link” and “Copy
payment link” buttons։
Send Payment Link behavior:
● Button սեղմելուց հետո client-ի email-ին ուղարկվում է payment link (URL), որով
client-ը կարող է կատարել վճարումը։
● Payment link-ի logic-ը կախված է payment type-ից՝
A) Full Payment
● Client-ը վճարում է ամբողջ գումարը (100%)
B) Split Payment (50/50)
● Order-ը բաժանվում է 2 մասի՝ 50% deposit + 50% remaining
● Երկրորդ վճարումից հետո order-ը դառնում է Paid 100%

6) Հաճախորդի գործողություններ
Յուրաքանչյուր order-ի հաղորդագրության ներսում երեւում է՝
○ Total price
○ Paid amount
○ Remaining balance
○ Payment type (Full / 50-50)
○ Եթե 50-50 է՝ ցուցադրել, որ կա մնացած 50% վճարման պարտավորություն