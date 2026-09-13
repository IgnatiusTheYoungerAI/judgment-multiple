# CatLoop — Pricing (simple, App Store–legal)

## Why the old $1.45 / 3-day paid trial died

Apple Introductory Offers on a **1 Week** subscription do **not** allow a 3-day paid period. Pay up front starts at **1 month**. Free trials can be 3 days; paid intros on weekly are **pay as you go by the week**.

## Live SKUs (v1)

| SKU | Customer price | Entitlement |
| --- | --- | --- |
| `catloop.starter.weekly` + intro | **$1.49** for **1 week** (pay as you go intro) | **3 videos**, 3 regens each (intro week only) |
| `catloop.starter.weekly` ongoing | **$4.99 / week** | **1 video / week**, 3 regens each |

Configure in App Store Connect as one weekly auto-renewable subscription with an Introductory Offer. One intro redemption per subscription group per customer.

## Cost floor (worst case)

- Model: Kling v2.5 Turbo @ **$0.062 / sec**
- Clip: **8 sec** → **$0.496 / attempt**
- Cap: **3 attempts / video** → **~$1.49 / video** if every regen is used

## After Apple’s cut (US / Small Business Program @ 15%)

| | Gross | Net @ 15% | Net @ 30% | Worst-case COGS | Notes |
| --- | --- | --- | --- | --- | --- |
| Intro week (3 videos × full regen) | $1.49 | $1.27 | $1.04 | ~$4.46 | **Acquisition hole** — expected; paid by renewals |
| Ongoing week (1 video × full regen) | $4.99 | $4.24 | $3.49 | ~$1.49 | **~$2.75** buffer @ 15% |

Intro week is allowed to lose money. Do not “fix” it by adding videos/regens.

## Rules

- Never raise videos/week, regen cap, clip length, or model tier without a new worst-case pass after Apple’s cut  
- Stay on Small Business Program math until proceeds approach $1M across associated accounts  
- US soft launch first; re-check China/EU commission schedules before expanding  

## Deferred

| SKU | When |
| --- | --- |
| Studio (Veo + audio) | After Starter retention is proven |
| Annual Starter | After weekly survival curves exist |
| Free tier | Never for v1 |
