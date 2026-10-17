# Website Inspection — wellnessapp-mort3ewl.manus.space

**Inspected:** 17 Oct 2026 · **Site:** https://wellnessapp-mort3ewl.manus.space/
**Identity:** "Wellness Journey" — online pediatric & behavioral nutrition practice by *RD Adeeba Asif*
**Platform:** Built and hosted on **Manus** (AI app builder). Footer carries a permanent *"Made with Manus · AI-generated (possibly user-edited) content"* disclaimer.

---

## 1. What the site actually is

A **single-page React application** (marketing + light back-office) for a one-person online nutrition practice aimed at Pakistani families — pricing is in **PKR**, phone is a Pakistani mobile number, and the tone is deliberately soft, non-clinical and "family-first".

It is *not* a full clinic management or e-commerce system. There is **no online payment and no automatic booking**. Every CTA funnels either into a **manual 5-step consultation request form** or into **WhatsApp**.

> Explicit on-page line: *"A calm, manual process. No automatic booking or payment is taken here."*

---

## 2. Site map — all 12 routes

| Route | Page title | What's on it |
|---|---|---|
| `/` | Home | Long-form editorial landing page (details below) |
| `/specialization` | Areas of Specialization | Pediatric nutrition; Behavioral & psychological nutrition (with a disclaimer it is *not* psychotherapy) |
| `/approach` | My Approach | 6 principle chips: Understanding, Personalization, Practicality, Consistency, Education, Sustainable habits |
| `/how-it-works` | How it works | 4 steps: Share context → Review & respond → Begin online → Keep building |
| `/plans` | Plans | 3 pricing tiers (see §4) |
| `/about` | About Adeeba Asif | Full bio + **empty credentials panel** |
| `/parents` | For parents | Hub linking to 3 topic cards |
| `/library` | Wellness Library | 4 placeholder articles + 3 "coming soon" downloads |
| `/consultation` | Online consultation | 5-step intake wizard |
| `/contact` | Contact | Phone, email, WhatsApp, 3 socials |
| `/portal` | Client portal | Login gate → "resources / messages / progress" dashboard |
| `/admin` | Admin space | Login gate (practice owner only) → content + request management |

Primary nav (7 links): Specialization · Approach · How it works · Plans · About · Parents · Library. Plus a header CTA "Start a conversation" and a **floating WhatsApp button** on every page.

---

## 3. Home page, section by section

1. **Hero** — "Helping children and families build a *healthier relationship* with food." + 3 CTAs (Book a consultation / Explore how I can help / Chat on WhatsApp), photo of parent & child, badge "Registered Dietitian · Pediatric & Behavioral Nutrition".
2. **A different way to think about nutrition** — positioning statement.
3. **Who I help** — 4 cards: Toddlers · Children · Teenagers · Parents & families.
4. **The everyday setting** — "Care begins at the *family table*."
5. **Growing with trust** — age-spanning support.
6. **A calm first conversation** — low-pressure invitation.
7. **"Does this sound familiar?"** — 5 pain-point chips (picky eating, stressful mealtimes, balanced meals, family habits, teen food relationship).
8. **Areas of specialization** — 2 blocks.
9. **The Wellness Journey framework** — 5 stages: Understand → Nourish → Practice → Reflect → Grow.
10. **How consultations work** — 3 steps ("ADEEBA ASIF reviews manually").
11. **Plans** — 3 pricing cards (duplicated on `/plans`).
12. **For parents** — hub CTA.
13. **About Adeeba Asif** — long first-person bio, credentials panel.
14. **Client testimonials** — deliberately empty: *"Approved client testimonials can be added here… No reviews, ratings or outcomes are fabricated."* (with a public button "Add testimonials in Admin").
15. **"Where are you in your Wellness Journey?"** — 4 router cards: for my child → `/specialization#pediatric`, as a parent → `/parents`, for myself → `/approach`, food habits → `/approach`.
16. **CLosing CTA**, **3 library cards**, **footer** (Explore / Connect columns, © Wellness Journey, floating WhatsApp).

---

## 4. Services & pricing (PKR, as published)

| Tier | Name | Price | Includes |
|---|---|---|---|
| Basic | 1 Month Diet Plan | **5,000** | Personalized nutrition review · 1-month meal guidance · routine-building support |
| Advance (badged "Most popular") | 3 Months Transformation Journey | **12,000** | 3-month guided plan · follow-up adjustments · habit-building support |
| Premium | Complete Transformation Package | **25,000** | Complete diet & routine plan · related products and e-books · extended support |

All three end in "Book a consultation" → intake form. Payment method is never stated online.

---

## 5. The contact & booking mechanics

**Phone:** `03281513038` (tel link on `/contact` and footer)
**Email:** `zohrafatima1165@gmail.com`
**WhatsApp:** `wa.me/message/MNBUDQ4K6BXBO1` (floating button + every page CTA)
**Socials:** Instagram `/wellnessjourney.nutrition`, Facebook profile id `61592300924877`, LinkedIn `/wellnessjourneynutrition`

**Consultation form (5 steps, required fields):**
1. Who is this for? (Toddler / Child / Teenager / Parent–family / Adult / Other)
2. What support do you need?
3. Tell us what's happening (free text)
4. Name, email, phone
5. Preferred date, preferred time, timezone

Submitted via the internal API, validated server-side, stored in the site's database, and surfaced in the **admin inbox** with a status workflow: `new → reviewing → contacted → closed`. Success message explicitly says nothing was booked automatically.

---

## 6. The back office (real, not decorative)

- **`/admin`** — protected by Manus OAuth (app ID `MoRT3eWLsHLwvHftCWrF7z`), requires role `admin`. Unauthenticated API calls return `401 Please login`.
  - Consultation requests inbox (with status dropdown, contact details, timezone, needs)
  - Resources CRUD (slug, title, tag, summary, body)
  - Settings editor — writes `about_biography` and `about_credentials` into a live settings table
  - Testimonials CRUD — new ones are saved **unpublished by default**, with delete
- **`/portal`** — client login; dashboard cards for *Your resources*, *Messages*, *Progress*, fed by a `portal.overview` endpoint that currently returns auth-gated data.
- **Public endpoints confirmed live:** `settings.public` returns the bio record; `resources.list` returns an empty array; `auth.me` returns `null` when signed out.

So the CMS layer exists and is functional — it's simply barely populated.

---

## 7. Tech stack (from the bundle & headers)

- **Frontend:** React (production JSX runtime), custom SPA router, Radix-style UI primitives, **TanStack Query v5**, **tRPC client** at `/api/trpc` with **SuperJSON** transformer
- **Backend:** Express (`x-powered-by: Express`), tRPC procedures, Zod input validation
- **Hosting:** Manus Space behind **Cloudflare**, media on **CloudFront/S3** (signed URLs)
- **Auth:** Manus OAuth redirect (`manus.im/app-auth`), bearer token from `manus-cookie`
- **Analytics:** two trackers — **Umami** (manus-analytics.com) and **Plausible**
- **PWA:** manifest present (`Wellness Journey Nutrition Practice`), icons point at `favicon.ico`
- **Fonts:** Playfair Display (headings) + DM Sans (body), Google Fonts
- **Bundle weight:** ~489 KB JS + ~107 KB CSS + ~1.7 MB photos (plus an 884 KB logo PNG)

Source files referenced in the bundle: `client/src/pages/Home.tsx`, `App.tsx`, `components/AdminPanel.tsx`, `PracticeContentSections.tsx`.

---

## 8. Design system

Palette: **ivory `#fff8ef`**, sage `#b6c9a9`, botanical green `#536b4e`, peach `#f3a98f`, marigold `#e8c76a`, ink `#20352d`.
Typography: large serif headlines with italic accent words — an editorial, warm-clinic feel.
Assets: a circular botanical logo (leaf + sun + winding path, serif wordmark) and four warm, softly lit family/kitchen photographs (WebP, 1920px).
Interaction: mobile hamburger menu, gentle hover states, floating WhatsApp button, "WJ" monogram.

---

## 9. Honest read — strengths and gaps

**Strengths**
- Coherent, calm brand and genuinely good copywriting; strong ethical guardrails ("no fabricated reviews", "not psychotherapy", "no automatic booking").
- Real backend: forms persist, admin inbox, editable bio, testimonial moderation, auth.
- Fast enough, mobile responsive, HSTS enabled, readable semantics.

**Gaps / things to flag**
1. **Lots of unfinished placeholders.** Credentials read *"Registered Dietitian — details to be added"*, *"Education and registration — details to be added"*, etc. Library articles say *"Placeholder article…"*, downloads say *"coming soon"*, testimonials are empty and the section literally contains an admin instruction.
2. **Contact email mismatch.** `zohrafatima1165@gmail.com` sits next to the practitioner name *Adeeba Asif* — looks like the builder's/personal inbox rather than a branded practice address. Worth correcting before launch.
3. **No legal pages.** No privacy policy, terms, or cookie notice — yet the intake form collects names, emails, phones and **information about children's health**. That is a real compliance/trust issue for a health-adjacent service.
4. **SEO is weak.** No real `robots.txt` or `sitemap.xml` (both paths return the app HTML instead of 404), everything is client-rendered from one HTML file, OG image is a Manus checkpoint screenshot, and no structured data / canonical tags.
5. **AI-generated provenance is public.** The Manus footer badge is permanent and states the content is AI-generated and asks users to submit no personal information — which directly contradicts having a personal-data intake form on the same page.
6. **Accessibility.** `maximum-scale=1` in the viewport meta blocks pinch-to-zoom on mobile.
7. **Security headers.** Only HSTS is set; no CSP, X-Frame-Options, Referrer-Policy or Permissions-Policy.
8. **Heavy logo asset** (884 KB PNG at 1212×1242) and the smallest tier's value proposition is thin compared to the middle one.
9. **Dual analytics** (Umami + Plausible) both load on first paint — redundant and a privacy consideration given the missing cookie notice.
10. **Platform dependency.** Login and admin live entirely inside Manus OAuth; the practice can't move off Manus without rebuilding auth and storage.

---

## 10. Bottom line

This is a **beautifully art-directed, ~80 %-finished brochure site with a working mini-CMS** for a solo pediatric nutrition practice in Pakistan. The front-of-house storytelling is strong; the operational layer (payments, booking, credentials, testimonials, legal hygiene, SEO) is still a skeleton. It reads as an early build meant to be handed to the practitioner and filled in via `/admin` — not a launched, production-ready practice website.
