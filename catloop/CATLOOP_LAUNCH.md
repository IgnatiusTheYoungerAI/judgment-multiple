# CatLoop — Launch Bible (v1)

**One job:** Turn a cat photo (or a short prompt) into a **5-second** video ready for TikTok / Reels / Shorts.

**One promise:** Best-in-class cat video in under a minute. Easy enough for anyone. Good enough that **$4.99/week** feels fair — and still prints contribution profit.

**Profit doctrine:** [`PROFIT_MODEL.md`](./PROFIT_MODEL.md) — craft the first take; cap compute; never buy users below 3× LTV:CAC.

**July launch deck:** Build/legal keepers; House/Lion pricing **superseded** — [`DECK_RECONCILIATION.md`](./DECK_RECONCILIATION.md).

This is the source of truth for product, pricing, and App Store compliance. The old Free / Creator / Studio spreadsheet structure is retired for v1.

---

## 1. What we ship (and what we don’t)

### Ship in v1

| Surface | What the user does |
| --- | --- |
| Onboarding | Stock demo → paywall → create |
| Create | Photo + mood/preset → generate → preview → regen (max 2) → save / share |
| Paywall | Intro week → weekly Starter |
| Library | Their videos only |
| Settings | Restore, manage subscription (Apple), privacy, AI consent revoke, delete account, report |

### Do not ship in v1

- Free forever tier
- Creator / Studio monthly at launch
- Multi-model picker
- Native AI audio / Veo claims
- Public feed / social / Android / web marketplace

**Why:** First app in a portfolio. One profitable loop done perfectly.

---

## 2. Pricing (App Store–legal + profit-first)

**Decision:** Starter weekly only. Studio later. Free never.

**Policy:** Weekly sub + **1-week pay-as-you-go intro** (a 3-day *paid* intro is not allowed on weekly).

**Profit redesign:** 2026 Kling-class API costs are higher than the old ~$0.062/sec handoff. Entitlements were tightened so intro is contribution-positive and ongoing clears a **≥ $2.50** worst-case floor.

| Step | Price | What they get | Regen |
| --- | --- | --- | --- |
| Demo | $0 | Watermarked stock sample | 0 |
| Intro week | **$1.99** | **1** × **5s** video (720p) | **2** |
| Starter | **$4.99/wk** | **1** × **5s** video / week | **2** |

| | Intro | Ongoing |
| --- | --- | --- |
| Net @ 15% Apple | $1.69 | $4.24 |
| Worst-case COGS (5s × $0.10 × 2) | $1.00 | $1.00 |
| **Contribution** | **+$0.69** | **+$3.24** |

Details: [`PROFIT_MODEL.md`](./PROFIT_MODEL.md) · [`PRICING_SIMPLE.md`](./PRICING_SIMPLE.md) · [`APPLE_POLICY_REVIEW.md`](./APPLE_POLICY_REVIEW.md) · [`APP_STORE_CONNECT_SETUP.md`](./APP_STORE_CONNECT_SETUP.md)

**Later:** Extra Video consumable · Annual · Studio (own tier)

---

## 3. Product principles (best of class, still profitable)

1. **One create flow.** Photo-first. Presets > blank prompt box.
2. **5 seconds.** Hook-length. No length picker.
3. **Regen = 2.** Best-in-class = better take-1, not endless retries.
4. **720p, no native AI audio.** Optional free music bed. Social recompresses anyway.
5. **Share is the climax.** Optional “Made with CatLoop.”
6. **Failed jobs don’t eat credits.**

### Success metrics

| Metric | Target |
| --- | --- |
| Take-1 accept rate | Rising |
| Intro → week-2 renewal | ≥ 25% |
| Worst-case contribution / paid week | ≥ $2.50 @ 15% |
| LTV:CAC | ≥ 3× before scaling ads |
| Refund / dispute rate | Low |
| App Review | Clean 3.1.2 / 5.1.2(i) |

---

## 4. App Store — non-negotiables

### Payments (3.1.x)

- StoreKit / IAP only for unlocks in v1
- CTA: `Start for $1.99 your first week, then $4.99/week. Cancel anytime at least 24 hours before renewal.`
- No trial toggles, fake timers, hidden post-intro price
- Restore + Terms + Privacy on paywall
- Prices from StoreKit / RevenueCat only

### AI + privacy (5.1.2(i))

- Description: **AI-generated**
- Dedicated consent before first upload; name provider; revocable in Settings
- Report on every result; account deletion; nutrition labels match binary

### Portfolio

- Small Business Program before ads
- No review gating / fake installs (5.6) — protects every future app

---

## 5. Architecture (v1)

```
iOS (SwiftUI)
  → Sign in with Apple
  → StoreKit 2 / RevenueCat
  → API
       → credit ledger (1 video / period, regen ≤ 2)
       → Kling-class 720p image/text → 5s video
       → storage + signed URLs
```

- Server enforces credits/regens
- Debit on success (idempotent job IDs)
- Sora out; Veo not in Starter

---

## 6. User journey

1. Brand moment → stock demo  
2. Photo permission → AI consent → paywall  
3. $1.99 intro → one great 5s render (≤2 regens) → share  
4. Renew at $4.99 → 1 credit / week, no rollover  
5. Later: Extra Video / Studio  

---

## 7. What died (and why)

| Old idea | Verdict |
| --- | --- |
| Free tier | CAC / margin sink |
| Creator $24.99 | Weekly impulse wins |
| Studio at launch | Wrong economics |
| 8s + 3 regens + 3 intro videos | COGS gift card at real API rates |
| $1.45 / 3-day paid trial | Not a valid weekly intro offer |
| “Higher tier = more regens” | Caps follow $/attempt |

---

## 8. Build order

0. Connect shell — agreements, SBP, app, `$1.99` intro + `$4.99` weekly  
1. Create flow + model + ledger  
2. StoreKit + restore  
3. Paywall compliance  
4. AI consent, report, privacy, delete  
5. Metadata + review notes  
6. US soft launch → scale only if LTV:CAC ≥ 3×  

---

## 9. Positioning

**Name:** CatLoop  
**Subtitle:** AI Cat Video Maker  
**Lead:** Turn your cat photos into short AI-generated videos for TikTok, Reels, and Shorts. Easy, fast, made for pet creators.
