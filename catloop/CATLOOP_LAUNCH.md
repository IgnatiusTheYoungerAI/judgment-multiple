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

## 2. Pricing (resolved — App Store–legal)

**Decision:** Starter weekly replaces Free + Creator for launch. Studio is a later upsell, not part of v1.

**Policy fix:** A `$1.45 / 3-day paid trial` is **not** a valid Introductory Offer on a weekly sub (Apple only allows 3-day as a *free* trial; paid intros on weekly are week-based). v1 uses a **1-week pay-as-you-go intro**.

| Step | Price | What they get | Regen hard-cap |
| --- | --- | --- | --- |
| Demo (pre-paywall) | $0 | 1 watermarked sample from *our* stock cat (not their photo) | 0 |
| Intro week | **$1.49** for **1 week** (IAP intro) | **3 videos** | **3** per video |
| Starter | **$4.99 / week** auto-renew | **1 video / week** | **3** per video |

Details: [`PRICING_SIMPLE.md`](./PRICING_SIMPLE.md) · Policy: [`APPLE_POLICY_REVIEW.md`](./APPLE_POLICY_REVIEW.md) · Connect steps: [`APP_STORE_CONNECT_SETUP.md`](./APP_STORE_CONNECT_SETUP.md)

### Why this beats the old stack

- Impulse price (&lt; $5/week) matches how subscription apps actually make money.
- Quality stays on **Kling v2.5 Turbo** so week one earns the renewal.
- Intro week can lose money on COGS (acquisition); ongoing weeks hold margin after Apple’s **15%** Small Business cut.
- 2 videos/week ongoing was tested and rejected — weekly churn is too fast for thinner margin.
- Freemium Free → paid at 3–5% made the old mix net-negative. Don’t subsidize non-payers on an expensive video API.

### Apple math (plan with it)

| | Intro $1.49 | Weekly $4.99 |
| --- | --- | --- |
| Net @ 15% Apple | $1.27 | $4.24 |
| Net @ 30% Apple | $1.04 | $3.49 |
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
| Intro week → paid renewal | ≥ 25% (short-trial / intro benchmarks) |
| Week-4 retention (paid) | Track; improve before raising prices |
| Support / chargeback rate | Keep low; pause ads if chargebacks spike |
| App Review | First submission approved without 3.1.2 / 5.1.2(i) rejection |

---

## 4. App Store — non-negotiables (portfolio safety)

You will launch many apps on one Developer Program account. **CatLoop must be boringly compliant.** One rejection for dark patterns or deceptive AI claims stains the account.

### Payments (Guideline 3.1.x)

- Digital video generation = **StoreKit / In-App Purchase only**. No Stripe, no “pay on web” links for v1.
- Auto-renewing **weekly** subscription (≥7 days) with clear price, period, intro → standard, cancel in Settings → Subscriptions (≥24h before renewal).
- Paywall CTA example:  
  `Start for $1.49 your first week, then $4.99/week. Cancel anytime at least 24 hours before renewal.`
- **No trial toggles.** No fake urgency timers. No hiding the post-intro price.
- **Restore Purchases** on paywall and in Settings.
- Terms of Use + Privacy Policy links **on the paywall** and in the app.
- StoreKit 2 or RevenueCat — prices always from the store, never hardcoded.

### Generative AI + 5.1.2(i)

- App Store description: videos are **AI-generated**.
- In-app: label results as AI-generated; never imply a real camera captured the clip.
- **Dedicated consent screen before first generation** naming the third-party provider, data sent (photo + prompt), and purpose; revocable in Settings.
- **Report / flag** on every generated video.
- Safety filters: block NSFW / cruelty / hate; reject unsafe outputs.
- Review notes: provider name, consent location, report location, demo account.

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
3. “Make one with your cat” → photo permission → **AI consent** → paywall **before** their first real render (stock demo is enough to sell).
4. Intro purchase → create → preview → up to 3 regens → save to Photos / share sheet.
5. After intro week → $4.99/week → 1 new credit per week. Unused credits: **no rollover** in v1 (say so in UI).
6. Upgrade path later: “Studio — cinematic audio” when ready.

Never a free unlimited personal-render sandbox.

---

## 7. What died from the old handoff (and why)

| Old idea | Verdict |
| --- | --- |
| Free 2 videos / mo | Cut — CAC sink |
| Creator $24.99 / 8 videos | Cut for v1 — weekly impulse wins conversion |
| Studio $79.99 at launch | Defer — don’t promise Veo until shipped |
| Cap policy “higher tier = more regens” | Wrong — caps follow **$/attempt** |
| $1.45 / 3-day **paid** trial | Illegal as weekly intro offer — replaced with **$1.49 / 1 week** pay-as-you-go |
| Side-by-side Free+Creator+Studio+Starter | Confusion — **Starter only** |

Closed for v1: Free vs Starter, regen enforcement, Studio timing, intro offer legality. Still measure after launch: CAC, regen distribution, refunds.

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
