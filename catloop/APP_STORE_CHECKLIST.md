# CatLoop — App Store checklist

Run before every submission. Fail any row → do not upload.  
Full policy map: [`APPLE_POLICY_REVIEW.md`](./APPLE_POLICY_REVIEW.md).

## Connect / agreements

- [ ] Paid Apps Agreement + banking + tax Active
- [ ] Small Business Program enrolled (or documented skip)
- [ ] `catloop.starter.weekly` + 1-week pay-as-you-go intro Ready / attached to version

## Metadata

- [ ] Name / subtitle accurate; no “#1” or unverifiable claims
- [ ] Description states videos are **AI-generated**
- [ ] Screenshots and preview match live app (including paywall prices from StoreKit)
- [ ] No Studio / Veo / “native audio” claims until that tier ships
- [ ] Age rating honest; not Kids Category / not “for kids”
- [ ] Privacy Policy + Support URLs live
- [ ] Privacy Nutrition Labels match binary (photos, purchases, IDs, usage)

## Subscriptions (3.1.2)

- [ ] StoreKit / IAP only for unlocks (no external checkout CTA in v1)
- [ ] Paywall shows intro price + duration, then **$X.XX/week**, auto-renew, cancel ≥24h before in Settings
- [ ] No trial toggles, fake countdowns, or hidden post-intro price
- [ ] Restore Purchases works
- [ ] Terms of Use + Privacy links on paywall
- [ ] Prices from StoreKit / RevenueCat — never hardcoded

## AI & privacy (5.1.2(i))

- [ ] Dedicated consent screen **before** first photo/prompt leaves device; names provider + data + purpose
- [ ] Consent revocable in Settings
- [ ] In-app AI-generated label on results
- [ ] Report / flag on every generated video
- [ ] NSFW / cruelty / unsafe filters on prompts and outputs
- [ ] Account deletion in-app (if accounts exist)
- [ ] Review Notes: provider, consent location, report location, demo credentials

## Product integrity

- [ ] Server enforces credits + regen caps
- [ ] Provider failures don’t silently eat credits (documented policy)
- [ ] Pre-paywall demo is stock/watermarked — not unlimited personal renders

## Growth / account health (5.6)

- [ ] No review gating or incentivized ratings
- [ ] No clone/spam apps riding CatLoop
- [ ] Support inbox monitored for refund spikes after launch
