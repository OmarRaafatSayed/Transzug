'use client';

import { useState, useEffect } from 'react';
import type {
  LandingInfoOneLangDto,
  HeroStoreDto,
  statsStoreDto,
  ServiceStoreDto,
  ReviewDto,
  GalleryStoreDto,
} from '@/types/store';

// ── Generic fetcher ──────────────────────────────────────────────

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((json) => { if (!cancelled) { setData(json); setLoading(false); } })
      .catch((err) => { if (!cancelled) { setError(String(err)); setLoading(false); } });
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// ── Named hooks ──────────────────────────────────────────────────

export function useLandingInfo() {
  return useFetch<LandingInfoOneLangDto>('/api/store/LandingInfo');
}

export function useHeroSlides() {
  return useFetch<HeroStoreDto[]>('/api/store/home/hero');
}

export function useStats() {
  return useFetch<statsStoreDto[]>('/api/store/home/stats');
}

export function useServices() {
  return useFetch<ServiceStoreDto[]>('/api/store/home/Services');
}

export function useTopReviews() {
  // يجيب مباشرة من Review route — single source of truth
  return useFetch<ReviewDto[]>('/api/store/Review?pageSize=10');
}

export function useAllReviews(pageIndex = 1, pageSize = 10) {
  return useFetch<ReviewDto[]>(
    `/api/store/Review?pageIndex=${pageIndex}&pageSize=${pageSize}`
  );
}

export function useGallery() {
  return useFetch<GalleryStoreDto[]>('/api/store/gallery');
}
