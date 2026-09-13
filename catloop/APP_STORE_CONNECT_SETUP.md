# CatLoop — App Store Connect setup (“on the books”)

Do these in order. This puts CatLoop on your Developer Program account as app #1 — legal entity, SKUs, and agreements — before or while the binary is built.

Legend: `[ ]` = you do in Apple’s portals (we cannot click App Store Connect for you).

---

## Phase A — Account (today)

- [ ] Confirm **Apple Developer Program** membership is Active (Account Holder)
- [ ] App Store Connect → **Agreements, Tax, and Banking**
  - [ ] Accept **Paid Applications Agreement** (Schedule 2)
  - [ ] Banking: Active
  - [ ] Tax forms: Active for every territory you’ll sell
- [ ] Enroll **[App Store Small Business Program](https://developer.apple.com/app-store/small-business-program/)**
  - [ ] Declare all Associated Developer Accounts
  - [ ] Note effective date (proceeds adjust ~15 days after month-end of approval)
- [ ] Decide legal seller name (Individual vs Organization) — this shows on the product page; keep it consistent across future apps

---

## Phase B — App identity

| Field | v1 value |
| --- | --- |
| Name | `CatLoop` |
| Subtitle | `AI Cat Video Maker` |
| Bundle ID | `com.[yourstudio].catloop` (pick once; never recycle) |
| SKU (Connect internal) | `catloop-ios-001` |
| Primary language | English (U.S.) |
| Category | Photo & Video (primary), Entertainment (secondary) |
| Content rights | You have rights to demo/stock media |

Steps:

- [ ] Certificates, Identifiers & Profiles → **Identifiers** → App ID with **App Store** + **In-App Purchase** (+ Sign in with Apple if used)
- [ ] App Store Connect → **My Apps** → **+** → New App
  - Platforms: iOS
  - User Access: Full Access (or limited as you prefer)
- [ ] Set age rating questionnaire honestly (AI-generated media; unrestricted web access = No; etc.)
- [ ] Privacy Policy URL (live page before submit)
- [ ] App Privacy → declare: Photos/User Content, Purchases, Identifiers, Usage Data as applicable; mark **Data Used to Track You** only if you actually track (ATT)

---

## Phase C — Subscriptions (money on the books)

### Group

- [ ] Monetization → Subscriptions → **+** Subscription Group  
  - Reference name: `CatLoop Starter`  
  - App Store Localization: group display name e.g. `CatLoop Premium`

### Product

| Field | Value |
| --- | --- |
| Product ID | `catloop.starter.weekly` |
| Duration | **1 Week** |
| Price | **$4.99** USD (Apple price tier; avoid odd $4.95 if tiering fights you — use Clean tier) |
| Level | 1 (only product in group for v1) |

- [ ] Create subscription, add localization:  
  - Display name: `CatLoop Weekly`  
  - Description: `1 AI cat video per week with up to 3 regenerations each. Cancel anytime.`

### Introductory offer (required for v1 funnel)

- [ ] Subscription → Pricing → **Set Up Introductory Offer**
  - Type: **Pay as you go**
  - Duration: **1 Week**
  - Price: **$1.49** (or closest tier ≤ $1.49)
  - Availability: start today → far future (or rolling)
  - Storefronts: start **United States only** for soft launch

### Review attachment

- [ ] Subscription → **Submit for Review** with the first app version (mandatory for first sub)

### Optional later (not v1)

- Annual SKU in same group (higher level or same — plan upgrade path carefully)
- Studio tier = new higher-level subscription when ready

---

## Phase D — Commerce plumbing

- [ ] Create **Sandbox** Apple ID testers (Users and Access → Sandbox)
- [ ] (Recommended) Create App Store Connect API key for RevenueCat / CI — never commit the .p8
- [ ] If using RevenueCat: link ISC key + shared secret / StoreKit 2; mirror product ID `catloop.starter.weekly`
- [ ] Paid Apps contract must be Active **before** IAP works in production

---

## Phase E — Legal pages (host before submit)

Publish simple HTTPS pages:

- [ ] Privacy Policy — photos sent to named AI provider; retention; deletion; kids; contact
- [ ] Terms of Use — EULA or custom; subscription terms; AI output disclaimer; IP license from user
- [ ] Support — email or form that you actually monitor

Apple’s standard EULA can be used; custom Terms still recommended for AI + credits.

---

## Phase F — Viral-ready product page (metadata draft)

**Name:** CatLoop  
**Subtitle:** AI Cat Video Maker  
**Promotional text** (changeable anytime): short hook, no unverifiable “#1”  
**Description (lead):**

```
CatLoop turns your cat photos into short AI-generated videos for TikTok, Reels, and Shorts.

Pick a photo, add a mood or caption, and get an 8-second clip made with AI — ready to save and share.
```

Must include somewhere visible: videos are **AI-generated**; subscription unlocks generation; cancel in Settings.

**Keywords** (no trademark stuffing): `cat,ai,video,pet,reel,tiktok,shorts,generator,photo`  
**Support / Marketing URLs:** live  
**Copyright:** `© [Year] [Legal Name]`

Screenshots: onboarding → sample result → create → paywall (with real price string) → share.

---

## Phase G — Soft launch territories

- [ ] Availability: **US first**
- [ ] Add AU/CA/UK after refund/chargeback rates look sane
- [ ] China / EU: only after you read local commission + AI/privacy extras

---

## Done definition — “on the books”

CatLoop is on the books when:

1. Paid Apps + Tax + Banking = Active  
2. Small Business Program enrolled (or explicit skip reason)  
3. App record exists with final bundle ID  
4. `catloop.starter.weekly` + 1-week $1.49 intro exist in Connect  
5. Privacy & Support URLs resolve  
6. Sandbox purchase of intro → renewal path tested  

Binary can still be in development; the **commercial shell** is live in Apple’s system so you don’t scramble at submit time.
