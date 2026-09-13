import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENTITLEMENTS } from '../config/pricing';

const KEYS = {
  aiConsent: 'catloop.aiConsent.v1',
  localDemoSeen: 'catloop.demoSeen.v1',
} as const;

export type PeriodKind = 'intro' | 'weekly' | 'none';

export type CreditState = {
  periodKind: PeriodKind;
  /** Videos remaining in this billing period */
  videosRemaining: number;
  /** Attempts remaining on the active video (0 if no active job slot) */
  attemptsRemainingOnActive: number;
  /** True once subscriber for current period */
  isSubscribed: boolean;
};

/** Client mirror only — server is source of truth */
export function emptyCredits(): CreditState {
  return {
    periodKind: 'none',
    videosRemaining: 0,
    attemptsRemainingOnActive: 0,
    isSubscribed: false,
  };
}

export function creditsAfterIntroPurchase(): CreditState {
  return {
    periodKind: 'intro',
    videosRemaining: ENTITLEMENTS.introVideos,
    attemptsRemainingOnActive: ENTITLEMENTS.maxAttemptsPerVideo,
    isSubscribed: true,
  };
}

export function creditsAfterWeeklyRenewal(): CreditState {
  return {
    periodKind: 'weekly',
    videosRemaining: ENTITLEMENTS.weeklyVideos,
    attemptsRemainingOnActive: ENTITLEMENTS.maxAttemptsPerVideo,
    isSubscribed: true,
  };
}

export function canStartOrRegen(state: CreditState, mode: 'new' | 'regen'): boolean {
  if (!state.isSubscribed) return false;
  if (mode === 'new') return state.videosRemaining > 0;
  return state.attemptsRemainingOnActive > 0;
}

/** Optimistic local decrement — replace with server response */
export function applySuccessfulAttempt(state: CreditState, mode: 'new' | 'regen'): CreditState {
  if (mode === 'new') {
    return {
      ...state,
      videosRemaining: Math.max(0, state.videosRemaining - 1),
      attemptsRemainingOnActive: ENTITLEMENTS.maxAttemptsPerVideo - 1,
    };
  }
  return {
    ...state,
    attemptsRemainingOnActive: Math.max(0, state.attemptsRemainingOnActive - 1),
  };
}

export async function getAiConsent(): Promise<boolean> {
  return (await AsyncStorage.getItem(KEYS.aiConsent)) === '1';
}

export async function setAiConsent(value: boolean): Promise<void> {
  await AsyncStorage.setItem(KEYS.aiConsent, value ? '1' : '0');
}

export async function getDemoSeen(): Promise<boolean> {
  return (await AsyncStorage.getItem(KEYS.localDemoSeen)) === '1';
}

export async function setDemoSeen(): Promise<void> {
  await AsyncStorage.setItem(KEYS.localDemoSeen, '1');
}
