# CatLoop — Owner actions (only you can click these)

Do these in parallel while the app scaffold lands. Agent cannot access App Store Connect.

## Today (blockers for “on the books”)

1. [ ] App Store Connect → Agreements → **Paid Applications** Active + banking + tax  
2. [ ] Enroll [Small Business Program](https://developer.apple.com/app-store/small-business-program/)  
3. [ ] Create Bundle ID: `com.ignatiustheyoungerai.catloop` (In-App Purchase + Sign in with Apple)  
4. [ ] Create app **CatLoop** in Connect (SKU `catloop-ios-001`)  
5. [ ] Create subscription group **CatLoop Starter**  
6. [ ] Product `catloop.starter.weekly` · 1 Week · **$4.99**  
7. [ ] Intro offer: Pay as you go · 1 Week · **$1.99** · US  
8. [ ] Host `legal/privacy.html`, `legal/terms.html`, `legal/support.html` on your domain → paste URLs into Connect  

Paste-ready field copy: [`connect/PASTE_READY.md`](./connect/PASTE_READY.md)

## Then (unblocks real generation + IAP)

9. [ ] RevenueCat project → iOS app → product `catloop.starter.weekly`  
10. [ ] fal.ai (or Kling) API key → set as `EXPO_PUBLIC_FAL_KEY` / server secret (never ship key in client)  
11. [ ] Sandbox Apple ID → buy intro → generate once  

## Already decided (do not reopen)

- No House cat / Lion packs  
- No free personal renders  
- 5s · 720p · 2 regens · 1 video / period  
