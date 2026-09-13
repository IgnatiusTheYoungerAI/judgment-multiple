/** Locked CatLoop v1 economics — do not change without PROFIT_MODEL.md pass */

export const APPLE_SMALL_BUSINESS_RATE = 0.15;

export const PRODUCTS = {
  weekly: {
    productId: 'catloop.starter.weekly',
    entitlementId: 'starter',
    displayPriceOngoing: '$4.99',
    displayPriceIntro: '$1.99',
    introDurationLabel: '1 week',
    periodLabel: 'week',
  },
} as const;

export const ENTITLEMENTS = {
  /** Intro week allowance */
  introVideos: 1,
  /** Ongoing weekly allowance */
  weeklyVideos: 1,
  /** Hard regen cap per video (includes first render) */
  maxAttemptsPerVideo: 2,
  /** Clip length in seconds */
  clipSeconds: 5,
  /** Output resolution target */
  resolution: '720p' as const,
  /** Native model audio off for Starter */
  nativeAudio: false,
} as const;

/** Planning COGS — server should use live provider quote */
export const PLANNING_COGS = {
  dollarsPerSecond: 0.1,
  get perAttempt() {
    return this.dollarsPerSecond * ENTITLEMENTS.clipSeconds;
  },
  get perVideoWorstCase() {
    return this.perAttempt * ENTITLEMENTS.maxAttemptsPerVideo;
  },
} as const;

export const PAYWALL_COPY = {
  headline: 'Make your cat famous',
  body: 'One 5-second AI video per week. Up to 2 takes each. Cancel anytime.',
  cta: `Start for ${PRODUCTS.weekly.displayPriceIntro} your first week, then ${PRODUCTS.weekly.displayPriceOngoing}/week. Cancel anytime at least 24 hours before renewal.`,
  restore: 'Restore Purchases',
} as const;

export const STYLE_PRESETS = [
  { id: 'trailer', label: 'Movie trailer', prompt: 'cinematic movie trailer energy, dramatic lighting, shallow depth of field' },
  { id: 'cozy', label: 'Cozy loft', prompt: 'soft window light, cozy apartment loft, gentle motion' },
  { id: 'space', label: 'Space cat', prompt: 'playful astronaut setting, stars, gentle floating motion' },
  { id: 'garden', label: 'Sun garden', prompt: 'sunlit garden, natural bokeh, calm stroll' },
] as const;
