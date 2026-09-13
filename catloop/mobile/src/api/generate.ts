/**
 * Generation API contract.
 * Wire to your backend (fal.ai / Kling behind the server). Never put provider keys in the app.
 */

export type GenerateRequest = {
  localUri: string;
  presetId: string;
  mood?: string;
  mode: 'new' | 'regen';
  jobId?: string;
};

export type GenerateResult =
  | { ok: true; videoUrl: string; jobId: string; attemptsRemaining: number; videosRemaining: number }
  | { ok: false; error: string; code?: 'NO_CREDITS' | 'NO_CONSENT' | 'PROVIDER' | 'NETWORK' };

const API_BASE = process.env.EXPO_PUBLIC_API_BASE ?? '';

export async function generateVideo(req: GenerateRequest): Promise<GenerateResult> {
  if (!API_BASE) {
    // Dev stub — replace when backend is live
    await new Promise((r) => setTimeout(r, 1200));
    return {
      ok: true,
      videoUrl: req.localUri,
      jobId: `local-${Date.now()}`,
      attemptsRemaining: 1,
      videosRemaining: 0,
    };
  }

  try {
    const form = new FormData();
    form.append('presetId', req.presetId);
    form.append('mood', req.mood ?? '');
    form.append('mode', req.mode);
    if (req.jobId) form.append('jobId', req.jobId);
    form.append('photo', {
      uri: req.localUri,
      name: 'cat.jpg',
      type: 'image/jpeg',
    } as unknown as Blob);

    const res = await fetch(`${API_BASE}/v1/generate`, {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    if (!res.ok) {
      return { ok: false, error: data?.error ?? 'Generation failed', code: data?.code };
    }
    return {
      ok: true,
      videoUrl: data.videoUrl,
      jobId: data.jobId,
      attemptsRemaining: data.attemptsRemaining,
      videosRemaining: data.videosRemaining,
    };
  } catch {
    return { ok: false, error: 'Network error', code: 'NETWORK' };
  }
}
