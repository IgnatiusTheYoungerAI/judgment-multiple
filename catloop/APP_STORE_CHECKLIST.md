# CatLoop — App Store checklist

Run this before every submission. Fail any row → do not upload.

## Metadata

- [ ] Name / subtitle accurate; no “#1” or unprovable superlatives
- [ ] Description states videos are **AI-generated**
- [ ] Screenshots and preview video match the live app (including paywall)
- [ ] No Studio / Veo / “native audio” claims until that tier ships
- [ ] Age rating honest; not positioned as a kids’ app
- [ ] Privacy Policy URL and Support URL live
- [ ] Privacy Nutrition Labels match actual collection (photos, purchases, IDs)

## Subscriptions (3.1.2)

- [ ] Only StoreKit / IAP for unlocks (no external pay links)
- [ ] Paywall shows: trial price, trial length, then **$X.XX/week**, auto-renew, cancel ≥24h before
- [ ] No trial toggle, no fake countdown, no hidden post-trial price
- [ ] Restore Purchases works
- [ ] Terms of Use + Privacy links on paywall
- [ ] Prices come from StoreKit / RevenueCat (not hardcoded)

## AI & privacy

- [ ] In-app AI-generated label on results
- [ ] Report / flag on every generated video
- [ ] Photo permission copy explains third-party generation use
- [ ] Consent before sending photos/prompts to the video API
- [ ] NSFW / unsafe prompt + output filters on
- [ ] Account deletion path works
- [ ] Review notes explain AI provider, data leaving device, report location

## Product integrity

- [ ] Server enforces video credits and regen caps
- [ ] Failed provider jobs do not strand users without credit policy documented
- [ ] Demo sample is watermarked / stock — not unlimited free personal renders

## Portfolio hygiene

- [ ] Small Business Program status confirmed (15% vs 30%)
- [ ] No Guideline-breaking dark patterns that could mark the developer account
- [ ] Customer support email monitored for refund / chargeback spikes after launch
