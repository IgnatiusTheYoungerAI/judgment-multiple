# CatLoop — Apple Policy Review (binding)

Reviewed against the live [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) and App Store Connect subscription rules (as of Sep 2026). This is the compliance map for CatLoop as **app #1** on your Developer Program account.

**Status:** Ship-ready if every **Must** below is built and every **Connect setup** item in [`APP_STORE_CONNECT_SETUP.md`](./APP_STORE_CONNECT_SETUP.md) is checked.

---

## Critical correction (pricing)

The old plan (`$1.45 for 3 days, then $4.95/week`) **cannot be configured as a native Introductory Offer** on a weekly subscription.

| Intro type | Allowed on **1 Week** sub |
| --- | --- |
| Free trial | 3 days, 1–2 weeks, 1–12 months, 1 year |
| Pay as you go | **1–12 weeks** at a discounted weekly price |
| Pay up front | **1 / 2 / 3 / 6 months or 1 year only** — not 3 days |

**v1 compliant offer (locked):**

| Phase | Store config | User gets |
| --- | --- | --- |
| Intro week | Weekly sub + **Pay as you go** intro @ **$1.49 / week for 1 week** | **3 videos**, 3 regens each |
| Ongoing | **$4.99 / week** (nearest clean price point to $4.95) | **1 video / week**, 3 regens |

Why this wins: still impulse-priced, card-gated via Apple, legal in Connect, preserves “cheap first week → prove product → renew” economics. See [`PRICING_SIMPLE.md`](./PRICING_SIMPLE.md).

**Do not** fake a 3-day paid trial with a consumable + separate sub — high 3.1.2 rejection risk and messy entitlement state.

---

## Guideline map (CatLoop → Apple)

### 1. Safety

| Rule | CatLoop requirement |
| --- | --- |
| **1.1 Objectionable** | Block prompts/outputs for porn, gore, animal cruelty, hate. Cat videos must not depict real animal harm (1.1.2). |
| **1.2 UGC** | User photos + AI outputs count as UGC-adjacent. Ship: filter, **Report**, ability to remove their content, published support contact. No public feed in v1 → lighter surface, still need Report on every result. |
| **1.3 Kids** | **Not** a Kids Category app. No “for kids” marketing. Pet owners / general audience. |
| **1.5 / Support** | Working Support URL + in-app way to reach you. |

### 2. Performance / honesty

| Rule | CatLoop requirement |
| --- | --- |
| **2.1 Completeness** | Live backend during review; demo account or Sign in with Apple sandbox path; IAPs visible and buyable in sandbox. |
| **2.3 Metadata** | Screenshots = real app. Description says **AI-generated**. No Studio/Veo claims until shipped. No prices in subtitle/keywords. Name ≤ 30 chars: `CatLoop`. |
| **2.3.2** | If screenshots show generation, disclose that unlock requires subscription. |
| **2.5.x** | No hidden features; Review Notes list AI provider + where consent / report live. |

### 3. Business (money)

| Rule | CatLoop requirement |
| --- | --- |
| **3.1.1 IAP** | Video generation unlocks = **In-App Purchase only**. No Stripe, no “subscribe on web” CTA in the app (US external-link exceptions exist — **do not use them for v1**; keep the first app boringly clean). |
| **3.1.2(a)** | Weekly period = 7 days ✓ (minimum allowed). Ongoing value = weekly new video credit + app access. |
| **3.1.2(c)** | Before purchase: what they get (videos/week, regens), price, length, auto-renew, cancel in Settings → Subscriptions, ≥24h before renew. |
| **Paywall UX** | No trial toggles, no fake urgency timers, no hidden post-intro price. Restore Purchases + Terms + Privacy on paywall. |
| **3.1.2 first sub** | First auto-renewable subscription must ship **with a new app version**. |

### 4. Design

| Rule | CatLoop requirement |
| --- | --- |
| **4.1 Copycats** | Original name, icon, UI. Don’t clone CapCut/other AI video brands. |
| **4.2 Minimum function** | Real generation end-to-end — not a thin web wrapper with no native value. |
| **4.3 Spam** | One CatLoop app. Don’t spam near-duplicate “Cat Video AI 2” clones that get the account banned. |
| **HIG Generative AI** | Disclose AI use; don’t present clips as real camera footage; allow refine/regen within caps; feedback/report path. |

### 5. Legal / privacy (rejection magnets)

| Rule | CatLoop requirement |
| --- | --- |
| **5.1.1** | Privacy Nutrition Labels match reality. Permission strings explain **why** (e.g. photo library: “Choose a cat photo to turn into a video”). |
| **5.1.1(v) Accounts** | If you create accounts → **in-app account deletion** required. Prefer **Sign in with Apple** as primary (required if any other third-party login is offered). |
| **5.1.2(i) Third-party AI** | **Explicit in-app consent before first upload/generation.** Must name the provider (or clear vendor identity), what data leaves the device (photo + prompt), purpose (generate video), and allow revoke in Settings. Privacy Policy alone is **not** enough. Labels + consent UI + actual traffic must match. |
| **5.1.4 Kids privacy** | Don’t target under 13; don’t put in Kids Category. |
| **5.2 IP** | Only process photos the user has rights to; ToS says user grants license to process; don’t scrape celebrity likeness packs. |
| **5.6 Code of Conduct** | No review gating, no paid/fake reviews, no discovery fraud. Viral growth must not manipulate App Store ranking. Account termination risk is portfolio-wide. |

---

## Commission (plan the books)

| Program / region | Rate to plan |
| --- | --- |
| **App Store Small Business Program** (US + most storefronts) | **15%** until $1M proceeds / year across associated accounts |
| Standard (over threshold) | **30%** (year-1 sub); **15%** after 1 year paid service in group |
| China mainland (as of Mar 2026) | 25% standard / 12% SBP & post-year-1 — only if you sell there |
| EU (new terms from Oct 2026) | Different schedule — review before EU launch; v1 can start US-only |

**Action:** Enroll Small Business Program **before** paid ads. List all associated developer accounts.

---

## Viral ≠ policy violation

Allowed: great product, organic TikTok/Reels, Apple Search Ads, ASA creative, share watermark “Made with CatLoop”, App Store product page optimization, legitimate influencer seeding.

Forbidden (5.6 / discovery fraud): fake reviews, review exchange, incentivized “5 stars for credits,” bot installs, keyword stuffing trademarks, bait metadata.

---

## Review Notes template (paste into App Store Connect)

```
CatLoop generates short AI videos from user cat photos/prompts.

AI: User photo + text prompt are sent to [PROVIDER NAME] (third-party video model) only after explicit in-app consent (screen: AI Processing Consent). Users can revoke in Settings → Privacy.

Subscriptions: One auto-renewable weekly product (catloop.starter.weekly) with a 1-week pay-as-you-go introductory price, then standard weekly price. Credits and regen caps enforced server-side.

Demo: Use Sign in with Apple / sandbox account [EMAIL]. Backend will be online during review.

Report AI output: Preview → Report. Account deletion: Settings → Delete Account.
```

---

## Pass/fail for “first viral app” account health

| Gate | Pass criteria |
| --- | --- |
| Legal agreements | Paid Apps Agreement + banking + tax Active |
| SBP | Enrolled (or documented ineligibility) |
| Connect app record | CatLoop created, bundle ID reserved |
| IAP | Subscription group + weekly SKU + intro offer Ready to Submit |
| Privacy | Policy URL live; labels drafted |
| Binary | Consent → generate → paywall → restore → delete → report all work |
| Growth | No review manipulation; ASA + organic only |

When all gates pass, CatLoop is **on the books** and ready to become the portfolio flagship without risking the Developer Program seat.
