# CatLoop backend

Server is the source of truth for credits. See `src/ledger.ts`.

## Rules

- Debit on provider **success** (or debit-on-start with automatic refund on fail)
- Intro: 1 video, 2 attempts total
- Weekly: 1 video / period, 2 attempts total
- Never trust the client for balances
- Provider API keys stay here — never in the Expo app

## Next

1. Deploy Worker/API with `POST /v1/generate` (auth via Sign in with Apple + RevenueCat webhook)
2. RevenueCat webhook → `grantIntro` / `grantWeeklyRenewal`
3. fal.ai / Kling generate 5s 720p, optional music bed mux
4. Burn-in watermark for any unpaid demo assets only
