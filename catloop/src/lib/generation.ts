// Mock render pipeline standing in for the server + Kling v2.5 Turbo job.
// In production, credits and regen caps are enforced server-side; the client
// never mints entitlement. Here we simulate an 8s render with progress.

export interface RenderResult {
  seed: number;
}

export function newSeed(): number {
  return Math.floor(Math.random() * 100000);
}

export function startRender(onProgress: (pct: number) => void): {
  promise: Promise<RenderResult>;
  cancel: () => void;
} {
  let cancelled = false;
  let timer: ReturnType<typeof setInterval> | null = null;
  const promise = new Promise<RenderResult>((resolve, reject) => {
    let pct = 0;
    const seed = newSeed();
    timer = setInterval(() => {
      if (cancelled) {
        if (timer) clearInterval(timer);
        reject(new Error("cancelled"));
        return;
      }
      pct += Math.random() * 0.16 + 0.05;
      if (pct >= 1) {
        pct = 1;
        onProgress(1);
        if (timer) clearInterval(timer);
        setTimeout(() => !cancelled && resolve({ seed }), 260);
      } else {
        onProgress(pct);
      }
    }, 210);
  });
  return {
    promise,
    cancel: () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    },
  };
}
