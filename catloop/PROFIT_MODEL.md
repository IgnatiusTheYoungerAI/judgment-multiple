# CatLoop — Profit Model (high margin + best-in-class)

**North star:** Maximize **contribution profit per subscriber** while the product still feels unmistakably best-in-class.

Best-in-class here does **not** mean “most expensive model.” It means: cat identity holds, first take often lands, create→share is effortless, output looks native on TikTok/Reels. We buy that with craft (presets, prompts, UX, reliability) — not with burned regen and long Veo renders.

---

## 1. The profit equation

```
Weekly contribution =
  (Price × (1 − Apple%))
  − (videos_used × attempts_used × sec × $/sec)
  − tiny infra (storage/CDN/auth)   ≈ ignore at v1 scale
```

**Plan against worst-case attempts** (every regen used). Scale ads only when **typical** attempt rates are measured.

Apple% = **15%** on Small Business Program (assume this until you near $1M proceeds).

---

## 2. Cost reality check (2026)

Old handoff used ~**$0.062/sec**. Live Kling API tiers in 2026 cluster nearer **~$0.084–$0.14/sec** depending on turbo/standard, resolution, and audio.

**Planning rate for v1 Starter (locked):**

| Setting | Choice | Why |
| --- | --- | --- |
| Length | **5 seconds** | Still a perfect short-form hook; ~40% less COGS than 8s |
| Resolution | **720p** | Social apps recompress anyway; 1080p/4K is vanity COGS |
| Audio | **No native model audio** | Native audio is a big $/sec jump; we add a free music bed / silent export instead |
| Planning $/sec | **$0.10** | Buffer above cheap 720p rates; re-quote quarterly |
| Cost / attempt | **$0.50** | 5s × $0.10 |
| Failures | **No debit** on provider fail | Protects margin + trust |

Do **not** ship Veo / 1080p / 8s / native AI audio in Starter. Those are Studio economics later.

---

## 3. Entitlements (redesigned for profit)

Giving 3 videos × 3 regens on a $1.49 intro was an **acquisition money pit** at real 2026 rates.

### Locked v1

| Phase | Price | Videos | Regen hard-cap | Worst-case COGS | Net @ 15% | Contribution |
| --- | --- | --- | --- | --- | --- | --- |
| Intro week | **$1.99** | **1** | **2** | $1.00 | $1.69 | **+$0.69** |
| Ongoing | **$4.99/wk** | **1** | **2** | $1.00 | $4.24 | **+$3.24** |

**Why $1.99 intro (not $1.49):** still impulse, but intro week is **profit-flat to slight-positive even in worst case** — you are not financing abusers.

**Why 1 intro video (not 3):** one great render sells the renewal. Three renders train people to burn compute before they value it.

**Why regen = 2 (not 3):** best-in-class first take (templates) + one retry feels premium; third retry is mostly margin death.

### Typical case (plan ads on this after 2 weeks of data)

Assume average **1.4 attempts / video** (many accept take 1):

| Phase | Typical COGS | Contribution @ 15% |
| --- | --- | --- |
| Intro | $0.70 | **~$0.99** |
| Ongoing week | $0.70 | **~$3.54** |

---

## 4. LTV and how hard you can buy users

Conservative weekly-sub lifetime (paid weeks after intro): **8 weeks** (weekly churn is brutal; don’t pretend you’re monthly SaaS).

Optimistic (old handoff-ish): **~16–19 weeks**.

| Scenario | Intro contrib | Ongoing | Contribution LTV | Max CAC for 3× LTV:CAC |
| --- | --- | --- | --- | --- |
| Conservative (8 wks) | $0.69 | 8 × $3.24 | **~$26.60** | **~$8.90** all-in |
| Base (12 wks) | $0.69 | 12 × $3.24 | **~$39.60** | **~$13.20** |
| Strong (16 wks) | $0.69 | 16 × $3.24 | **~$52.50** | **~$17.50** |

**All-in CAC** = ads + payment fees noise + intro support. If ASA CPI blended to *paying intro starter* is above your Max CAC, **cut spend**, don’t raise regen.

Target: **LTV:CAC ≥ 3×** before scaling. Pause if refunds/disputes > ~3–5% of revenue.

---

## 5. Best-in-class without lighting money on fire

Spend engineering on **perceived quality per dollar of GPU**:

| Lever | Effect on quality | Effect on profit |
| --- | --- | --- |
| Curated style packs (“trailer”, “cozy loft”, “space cat”) | Huge | High — better take-1 rate |
| Cat-preservation prompt scaffold (auto) | Huge | High |
| Fast reliable queue + honest progress | High | High (fewer refunds) |
| One-tap share + optional “Made with CatLoop” | High (virality) | High (lower CAC) |
| Extra regen | Marginal | **Negative** |
| 8s / 1080p / native AI audio | Marginal on social | **Strongly negative** |
| Free tier | “Feels generous” | **Destroys blended profit** |
| Veo Studio at launch | Flex | Wrong price tier; defer |

**Product rule:** If a feature doesn’t raise take-1 accept rate or share rate, it doesn’t ship in v1.

---

## 6. Margin floors (operating rules)

Never ship a change that breaks these **worst-case** floors (@ 15% Apple):

| Surface | Floor |
| --- | --- |
| Ongoing weekly contribution | **≥ $2.50** after worst-case COGS |
| Intro week contribution | **≥ $0** (no planned loss) |
| Regen cap | **≤ 2** until telemetry says average attempts &lt; 1.3 |
| Clip length | **≤ 5s** on Starter |
| Videos / paid week | **1** (extras = separate SKU later) |

If Apple drops you to 30%: ongoing worst-case becomes $3.49 − $1.00 = **$2.49** — still above floor, barely. Re-price to **$5.99/wk** or cut regen to 1 *before* you lose SBP.

---

## 7. Profit expanders (after retention is real)

Ship only when week-4 renewal is healthy:

1. **Extra Video consumable** — e.g. $2.99 for 1 video / 2 regens (COGS floor $1 → fat margin). Lets power users spend without poisoning the weekly allowance.
2. **Annual plan** — e.g. ~$79–99/year (position as savings). Same weekly credit pace; huge LTV / lower churn.
3. **Studio tier** — Veo + audio + longer clip at **$29.99+/mo** or high weekly — only with two-stage drafts and tight caps. Never discount Studio into Starter economics.
4. **Territory expansion** — after US unit economics proven.

---

## 8. Path to serious profit (order of magnitude)

Illustrative, not a promise — uses **base** ~$3.54 typical weekly contribution and 12-week mean:

| Paying subs (steady) | Approx contribution / yr |
| --- | --- |
| 1,000 | ~$180K |
| 3,000 | ~$550K |
| 5,000 | ~$900K |

Stay under **$1M App Store proceeds** while optimizing creative, or consciously re-price for 30% Apple.

Viral share rate is the profit multiplier: every organic install is CAC you didn’t pay.

---

## 9. What we explicitly reject

| Idea | Why it dies |
| --- | --- |
| 3 intro videos | Turns intro into a COGS gift card |
| Regen 3–15 on Starter | Margin killer; “premium” is take-1 quality |
| 8s default | Social doesn’t need it; Studio can sell it later |
| Free forever pool | Blended margin goes red |
| Racing to Veo in v1 | Best-in-class ≠ most expensive inference |

---

## 10. One-line operating doctrine

**Charge impulse prices. Deliver craft-quality first takes. Cap compute like a hawk. Buy users only when LTV:CAC ≥ 3×.**
