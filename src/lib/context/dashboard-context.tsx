'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { HeroStats, HeroSlide } from '@/lib/api/types';

type DashboardContextType = {
  heroStats: HeroStats;
  heroSlides: HeroSlide[];
  updateHeroStats: (stats: HeroStats) => void;
  updateHeroSlides: (slides: HeroSlide[]) => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const DEFAULT_STATS: HeroStats = {
  rating: 4.9,
  years: 10,
  moves: 500,
  insurance: 100,
};

const DEFAULT_SLIDES: HeroSlide[] = [
  { id: 1, src: '/images/hero-1.jpg', alt: 'Hero 1', enabled: true },
  { id: 2, src: '/images/hero-2.jpg', alt: 'Hero 2', enabled: true },
  { id: 3, src: '/images/hero-3.jpg', alt: 'Hero 3', enabled: true },
  { id: 4, src: '/images/hero-4.jpg', alt: 'Hero 4', enabled: true },
];

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [heroStats, setHeroStats] = useState<HeroStats>(DEFAULT_STATS);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(DEFAULT_SLIDES);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedStats = localStorage.getItem('dashboard-hero-stats');
    const savedSlides = localStorage.getItem('dashboard-hero-slides');

    if (savedStats) {
      try {
        setHeroStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Failed to parse saved stats', e);
      }
    }

    if (savedSlides) {
      try {
        setHeroSlides(JSON.parse(savedSlides));
      } catch (e) {
        console.error('Failed to parse saved slides', e);
      }
    }
  }, []);

  const updateHeroStats = (stats: HeroStats) => {
    setHeroStats(stats);
    if (mounted) {
      localStorage.setItem('dashboard-hero-stats', JSON.stringify(stats));
    }
  };

  const updateHeroSlides = (slides: HeroSlide[]) => {
    setHeroSlides(slides);
    if (mounted) {
      localStorage.setItem('dashboard-hero-slides', JSON.stringify(slides));
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        heroStats,
        heroSlides,
        updateHeroStats,
        updateHeroSlides,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}
