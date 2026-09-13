/**
 * RevenueCat / StoreKit bridge.
 * Replace stubs with purchases package once RC API keys exist.
 */

import { PRODUCTS } from '../config/pricing';

export type OfferingState = {
  productId: string;
  introPriceString: string;
  priceString: string;
  eligibleForIntro: boolean;
};

export async function configurePurchases(_apiKey: string, _appUserId?: string): Promise<void> {
  // await Purchases.configure({ apiKey });
}

export async function getWeeklyOffering(): Promise<OfferingState> {
  // const products = await Purchases.getProducts([PRODUCTS.weekly.productId]);
  return {
    productId: PRODUCTS.weekly.productId,
    introPriceString: PRODUCTS.weekly.displayPriceIntro,
    priceString: PRODUCTS.weekly.displayPriceOngoing,
    eligibleForIntro: true,
  };
}

export async function purchaseWeekly(): Promise<{ ok: boolean; error?: string }> {
  // const { customerInfo } = await Purchases.purchaseProduct(PRODUCTS.weekly.productId);
  // return { ok: Boolean(customerInfo.entitlements.active['starter']) };
  return { ok: true };
}

export async function restorePurchases(): Promise<{ ok: boolean; active: boolean; error?: string }> {
  // const info = await Purchases.restorePurchases();
  // return { ok: true, active: Boolean(info.entitlements.active['starter']) };
  return { ok: true, active: false };
}

export function paywallDisclosure(offering: OfferingState): string {
  if (offering.eligibleForIntro) {
    return `Start for ${offering.introPriceString} your first week, then ${offering.priceString}/week. Auto-renews until canceled. Cancel at least 24 hours before renewal in Settings → Subscriptions.`;
  }
  return `${offering.priceString}/week. Auto-renews until canceled. Cancel at least 24 hours before renewal in Settings → Subscriptions.`;
}
