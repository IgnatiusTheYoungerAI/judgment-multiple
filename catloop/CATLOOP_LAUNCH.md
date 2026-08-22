# CatLoop — Launch Bible (v1)

**One job:** Turn a cat photo (or a short prompt) into an 8-second video ready for TikTok / Reels / Shorts.

**One promise:** Best-in-class cat video in under a minute. Easy enough for anyone. Good enough that a $4.95/week impulse buy feels fair.

This is the source of truth for product, pricing, and App Store compliance. The old Free / Creator / Studio spreadsheet structure is retired for v1.

---

## 1. What we ship (and what we don’t)

### Ship in v1

| Surface | What the user does |
| --- | --- |
| Onboarding | 3 screens: pick a cat photo → see one demo result → paywall |
| Create | Photo or text → generate → preview → regen (capped) → save / share |
| Paywall | One path: 3-day trial → weekly Starter |
| Library | Their videos only |
| Settings | Restore, manage subscription (Apple), privacy, delete account, report AI output |

### Do not ship in v1

- Free forever tier (burns cash; kills blended margin)
- Creator $24.99 / Studio $79.99 monthly plans (defer)
- Multi-model picker UI (users don’t choose Kling vs Veo)
- Physics / native-audio “Studio” claims until we actually ship Veo
- Android, web, or creator marketplace
- Social feed, comments, or public gallery (extra UGC moderation burden)

**Why:** First app in a portfolio. Clean review history > feature sprawl. One loop done perfectly beats three tiers half-built.

---

## 2. Pricing (resolved)

**Decision:** Starter (Trial + Weekly) replaces Free + Creator for launch. Studio is a later upsell, not part of v1.

| Step | Price | What they get | Regen hard-cap |
| --- | --- | --- | --- |
| Demo (pre-paywall) | $0 | 1 watermarked sample from *our* stock cat (not their photo) | 0 |
| Trial | **$1.45** once, **3 days** | 3 videos | **3** per video |
| Starter | **$4.95 / week** auto-renew | **1 video / week** | **3** per video |

### Why this beats the old stack

- Impulse price (< $5/week) matches how subscription apps actually make money.
- Quality stays on **Kling v2.5 Turbo** so the trial earns the renewal (not Runway’s cheapest draft).
- Worst-case unit economics (every regen burned): ~**58% gross margin before Apple**; after Apple Small Business Program (**15%**), still healthy. Plan to stay under $1M/year across the account until the product is proven, or re-price when the 30% rate applies.
- 2 videos/week was tested and rejected — weekly churn is too fast; thinner margin fails LTV:CAC.
- Freemium Free → paid at 3–5% conversion made the old mix net-negative. Don’t subsidize non-payers on an expensive video API.

### Apple math (plan with it)

| | Trial $1.45 | Weekly $4.95 |
| --- | --- | --- |
| Net @ 15% Apple | $1.23 | $4.21 |
| Net @ 30% Apple | $1.02 | $3.47 |
| Worst-case COGS (Kling, 8s × 3 attempts) | ~$1.49 / video | ~$1.49 / video |

**Rule:** Never raise regen caps or video count without re-running worst-case COGS after Apple’s cut. Caps are product ceilings, not marketing copy.

### Later (v1.1+), not now

- **Studio:** Veo + native audio, two-stage draft→finalize, higher price, high regen — only after Starter retention is real.
- **Annual plan:** Offer beside weekly once we have survival data (weekly converts best; annual retains best).

---

## 3. Product principles (best of class, still simple)

1. **One create flow.** Photo-first. Text optional as a caption/mood line, not a second product.
2. **8 seconds.** Short-form default. No length picker in v1.
3. **Hard regen caps.** Server-enforced. No soft “please don’t.” Over-cap = wait for next credit or buy nothing extra in v1 (no overage SKU yet).
4. **Draft ≠ final for users.** Internally we may optimize; the user sees one quality bar: Starter quality.
5. **Save and share are the climax.** Export without friction. Watermark only on unpaid demo.
6. **Speed and reliability > model theater.** Show progress honestly. Fail loudly with retry, never a silent bill.

### Success metrics (launch)

| Metric | Target (first 90 days) |
| --- | --- |
| Trial start → paid week 1 | ≥ 25% (Adapty short-trial median) |
| Week-4 retention (paid) | Track; improve before raising prices |
| Support / chargeback rate | Keep low; pause ads if chargebacks spike |
| App Review | First submission approved without Guideline 3.1.2 / AI rejection |

---

## 4. App Store — non-negotiables (portfolio safety)

You will launch many apps on one Developer Program account. **CatLoop must be boringly compliant.** One rejection for dark patterns or deceptive AI claims stains the account.

### Payments (Guideline 3.1.x)

- Digital video generation = **StoreKit / In-App Purchase only**. No Stripe, no “pay on web” links, no QR to checkout.
- Auto-renewing subscription with clear: **price, period, what happens after trial, cancel anytime (Settings → Subscriptions)**.
- Paywall CTA example:  
  `Start 3-day trial for $1.45, then $4.95/week. Cancel anytime at least 24 hours before renewal.`
- **No trial toggles.** No fake urgency timers. No hiding the post-trial price.
- **Restore Purchases** on paywall and in Settings.
- Terms of Use + Privacy Policy links **on the paywall** and in the app.
- Use StoreKit 2 / SubscriptionStoreView or RevenueCat — prices always from the store, never hardcoded.

### Generative AI

- App Store description: state clearly that videos are **AI-generated**.
- In-app: label results as AI-generated; never imply a real camera captured the clip.
- **Report / flag** control on every generated video (incorrect or harmful).
- Photo upload: explicit consent that the image is sent to a third-party video model to generate a clip; not used to train *your* model unless you later get separate opt-in.
- Safety filters: block obvious NSFW / violence prompts and reject unsafe outputs before delivery.
- Review notes: name the provider class (e.g. third-party text/image-to-video API), what leaves the device (photo + prompt), and where the report button lives.

### Privacy & account

- Privacy Nutrition Labels match reality (photos, purchase history, identifiers, usage).
- Account deletion in-app (or clear web flow) within Apple’s required window.
- Kids: **do not** target under 13. Age rating and copy for general audience / pet owners. No “for kids” positioning.

### Content

- No public feed in v1 → less UGC surface, still ship **report** on AI output.
- Don’t claim “Hollywood physics” or “live audio” until Studio/Veo ships.
- Screenshots and preview video must match the real app (same paywall, same output quality).

### Small Business Program

- Enroll / confirm **App Store Small Business Program** (15%) before launch ads. Recalculate margins the day you cross the threshold toward 30%.

---

## 5. Architecture (only what v1 needs)

```
iOS app (SwiftUI)
  → Auth (Sign in with Apple)
  → StoreKit 2 / RevenueCat entitlements
  → API (your backend)
       → credit ledger (trial / weekly allowance + regen counters)
       → Kling v2.5 Turbo (image/text → 8s video)
       → storage + signed download URLs
```

**Hard rules**

- Credits and regens live on the **server**. Client is not trusted.
- One generation job = one debit when render starts (or on success — pick one, stay consistent; prefer debit-on-success with idempotent job IDs to avoid charging for provider failures).
- Sora 2 is **out** (API sunset). Do not build on it.
- Runway Turbo is optional later for Studio two-stage drafts — **not** in Starter.

---

## 6. User journey (the whole product)

1. Install → 10-second brand moment (“CatLoop”).
2. Show one stunning sample video (stock).
3. “Make one with your cat” → photo permission → paywall **before** their first real render (demo is enough to sell).
4. Trial purchase → create → preview → up to 3 regens → save to Photos / share sheet.
5. Week renews → 1 new credit. Unused credits: **no rollover** in v1 (keeps COGS predictable; say so in UI).
6. Upgrade path later: “Studio — cinematic audio” when ready.

Optional soften: allow **one** real photo render only after trial start — never a free unlimited sandbox.

---

## 7. What died from the old handoff (and why)

| Old idea | Verdict |
| --- | --- |
| Free 2 videos / mo | Cut — CAC sink |
| Creator $24.99 / 8 videos | Cut for v1 — weekly impulse wins conversion |
| Studio $79.99 at launch | Defer — don’t promise Veo until shipped |
| Cap policy “higher tier = more regens” | Wrong — caps follow **$/attempt** |
| Expected-case regen math for planning | Keep worst-case for margins; replace with telemetry later |
| Side-by-side Free+Creator+Studio+Starter | Confusion — **Starter only** |

Open items from the spreadsheet that are now closed for v1: Free vs Starter, regen enforcement (hard), Studio timing (later). Still open by nature: real CAC above the paywall, real regen distribution, chargeback rate — measure after launch; don’t invent.

---

## 8. Build order

1. Create flow + Kling + credit ledger  
2. StoreKit subscriptions (trial + weekly) + restore  
3. Paywall copy / compliance pass  
4. AI disclosure, report, privacy, delete account  
5. App Store metadata + review notes  
6. Soft launch (low spend) → watch trial→paid and chargebacks → then scale ads  

---

## 9. One-line positioning (App Store)

**Name:** CatLoop  
**Subtitle:** AI Cat Video Maker  
**Description lead:** Turn your cat photos into short AI videos for TikTok, Reels, and Shorts. CatLoop uses AI to generate 8-second clips — easy, fast, made for pet creators.

That’s the product. Everything else waits.
