/**
 * Server-side credit ledger (source of truth).
 * Port into your API (Cloudflare Worker / Fly / etc.). Client mirrors only.
 */

export type PeriodKind = 'intro' | 'weekly';

export type LedgerAccount = {
  userId: string;
  periodKind: PeriodKind;
  periodEndsAt: string; // ISO
  videosRemaining: number;
  activeJobId: string | null;
  attemptsRemainingOnActive: number;
  appleOriginalTransactionId?: string;
};

export const LIMITS = {
  introVideos: 1,
  weeklyVideos: 1,
  maxAttemptsPerVideo: 2,
  clipSeconds: 5,
} as const;

export function grantIntro(userId: string, periodEndsAt: Date): LedgerAccount {
  return {
    userId,
    periodKind: 'intro',
    periodEndsAt: periodEndsAt.toISOString(),
    videosRemaining: LIMITS.introVideos,
    activeJobId: null,
    attemptsRemainingOnActive: 0,
  };
}

export function grantWeeklyRenewal(account: LedgerAccount, periodEndsAt: Date): LedgerAccount {
  return {
    ...account,
    periodKind: 'weekly',
    periodEndsAt: periodEndsAt.toISOString(),
    videosRemaining: LIMITS.weeklyVideos,
    activeJobId: null,
    attemptsRemainingOnActive: 0,
  };
}

export type DebitResult =
  | { ok: true; account: LedgerAccount }
  | { ok: false; reason: 'NO_VIDEOS' | 'NO_ATTEMPTS' | 'EXPIRED' };

export function beginNewVideo(account: LedgerAccount, jobId: string, now = new Date()): DebitResult {
  if (new Date(account.periodEndsAt) < now) return { ok: false, reason: 'EXPIRED' };
  if (account.videosRemaining <= 0) return { ok: false, reason: 'NO_VIDEOS' };
  return {
    ok: true,
    account: {
      ...account,
      videosRemaining: account.videosRemaining - 1,
      activeJobId: jobId,
      attemptsRemainingOnActive: LIMITS.maxAttemptsPerVideo - 1,
    },
  };
}

export function beginRegen(account: LedgerAccount, jobId: string, now = new Date()): DebitResult {
  if (new Date(account.periodEndsAt) < now) return { ok: false, reason: 'EXPIRED' };
  if (account.attemptsRemainingOnActive <= 0) return { ok: false, reason: 'NO_ATTEMPTS' };
  return {
    ok: true,
    account: {
      ...account,
      activeJobId: jobId,
      attemptsRemainingOnActive: account.attemptsRemainingOnActive - 1,
    },
  };
}

/** Call only after provider success; if provider fails, do not call begin* (or refund attempt). */
export function assertProviderSuccessPolicy(): 'debit-on-start-with-refund-on-fail' | 'debit-on-success' {
  return 'debit-on-success';
}
