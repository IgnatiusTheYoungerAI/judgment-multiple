# CatLoop — Pricing (simple)

## Live SKUs (v1)

| SKU | Customer price | Entitlement |
| --- | --- | --- |
| `catloop.trial.3day` (intro on weekly) | $1.45 for 3 days | 3 videos, 3 regens each |
| `catloop.starter.weekly` | $4.95 / week | 1 video / week, 3 regens each |

No other paid SKUs at launch. No free credit pool.

## Cost floor (worst case)

- Model: Kling v2.5 Turbo @ **$0.062 / sec**
- Clip: **8 sec** → **$0.496 / attempt**
- Cap: **3 attempts / video** → **$1.49 / video** if every regen is used

Plan margins against this floor, not “average user.”

## After Apple’s cut

| | Gross | Net @ 15% | Net @ 30% | Worst-case COGS | Buffer @ 15% | Buffer @ 30% |
| --- | --- | --- | --- | --- | --- | --- |
| Trial (1 of 3 videos, full regens) | $1.45 | $1.23 | $1.02 | $1.49 | **negative if they burn all 3 videos** | worse |
| Weekly (1 video, full regens) | $4.95 | $4.21 | $3.47 | $1.49 | **~$2.72** | **~$1.98** |

### How to read the trial

The trial can lose money if a user burns all 3 videos with full regens. That is acceptable **acquisition cost**, paid back by weekly renewals — same logic as a high CAC ad. Do not “fix” the trial by raising regen or video count.

**Trial COGS ceiling if all 3 videos × 3 attempts:** ~$4.46  
**Trial net @ 15%:** ~$1.23 → acquisition hole ~$3.23 per fully abusive trial (worst case).

Mitigations already in the product:

- Cap 3 (not 8)
- 3 days (not 7)
- Card-gated intro via Apple (higher convert, watch refunds)
- Weekly price and 1 video/week sized so LTV:CAC clears ~3x under prior model assumptions

## Do not change without a new spreadsheet pass

- Videos per week  
- Regen cap  
- Clip length  
- Model tier  
- Adding a free tier  

## Deferred

| SKU | When |
| --- | --- |
| Studio (Veo + audio) | After Starter retention is proven |
| Annual Starter | After we see weekly survival curves |
