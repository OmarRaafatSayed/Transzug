'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  LandingInfoOneLangDto,
  HeroStoreDto,
  statsStoreDto,
  ServiceStoreDto,
  ReviewDto,
  GalleryStoreDto,
} from '@/types/store';

// ── BroadcastChannel event name ───────────────────────────────────
export const STORE_SYNC_CHANNEL = 'store-sync';

export type StoreSyncEvent =
  | { type: 'gallery-changed' }
  | { type: 'reviews-changed' }
  | { type: 'hero-changed' };

/** Broadcast a sync event to all tabs/windows */
export function broadcastStoreSync(event: StoreSyncEvent) {
  try {
    const ch = new BroadcastChannel(STORE_SYNC_CHANNEL);
    ch.postMessage(event);
    ch.close();
  } catch {
    // BroadcastChannel not supported — fall back to localStorage event
    try {
      localStorage.setItem(STORE_SYNC_CHANNEL, JSON.stringify({ ...event, _ts: Date.now() }));
    } catch { /* ignore */ }
  }
}

// ── Generic fetcher with refreshKey + cache:no-store ─────────────

function useFetch<T>(url: string, refreshKey = 0, headers?: Record<string, string>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const doFetch = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    fetch(url, { cache: 'no-store', headers })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((json) => { if (!cancelled) { setData(json); setLoading(false); } })
      .catch((err) => { if (!cancelled) { setError(String(err)); setLoading(false); } });
    return () => { cancelled = true; };
  }, [url]); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-fetch whenever url or refreshKey changes
  useEffect(() => {
    const cancel = doFetch();
    return cancel;
  }, [doFetch, refreshKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refetch: doFetch };
}

// ── Named hooks ──────────────────────────────────────────────────

export function useLandingInfo() {
  return useFetch<LandingInfoOneLangDto>('/api/store/LandingInfo');
}

export function useHeroSlides(refreshKey = 0) {
  return useFetch<HeroStoreDto[]>('/api/store/home/hero', refreshKey);
}

export function useStats(refreshKey = 0) {
  return useFetch<statsStoreDto[]>('/api/store/home/stats', refreshKey);
}

export function useServices(locale = 'de', refreshKey = 0) {
  return useFetch<ServiceStoreDto[]>(
    '/api/store/home/Services',
    refreshKey,
    { 'Accept-Language': locale },
  );
}

export function useTopReviews(refreshKey = 0) {
  return useFetch<ReviewDto[]>('/api/store/Review?pageSize=10', refreshKey);
}

export function useAllReviews(pageIndex = 1, pageSize = 10, refreshKey = 0) {
  return useFetch<ReviewDto[]>(
    `/api/store/Review?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    refreshKey,
  );
}

export function useGallery(refreshKey = 0) {
  return useFetch<GalleryStoreDto[]>('/api/store/gallery', refreshKey);
}
