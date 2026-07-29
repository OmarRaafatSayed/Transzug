'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useStats } from '@/hooks/useStoreApi';

// ── Skeleton ─────────────────────────────────────────────────────
function StatsSkeleton() {
  return (
    <section className="container mx-auto px-4 sm:px-8 py-12 sm:py-16 bg-[#0a0f1a]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center space-y-2">
            <div className="h-14 w-24 mx-auto bg-gray-800 rounded animate-pulse" />
            <div className="h-3 w-20 mx-auto bg-gray-800 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Component ─────────────────────────────────────────────────────
export function StatsSection() {
  const t = useTranslations('stats');
  const { data: statsData, loading } = useStats();

  // Parse numeric targets from statsStoreDto[].title (e.g. "4.9 / 5", "10+", "500+", "100%")
  const targets = {
    moves: 500,
    experience: 10,
    satisfaction: 100,
    cities: 50,
  };

  if (statsData) {
    statsData.forEach((s) => {
      const num = parseFloat(s.title.replace(/[^0-9.]/g, ''));
      if (!isNaN(num)) {
        const desc = s.description.toLowerCase();
        const id = s.id;
        if (desc.includes('umzug') || desc.includes('move') || id === 'stat-3') targets.moves = num;
        else if (desc.includes('jahr') || desc.includes('year') || id === 'stat-2') targets.experience = num;
        else if (desc.includes('versich') || desc.includes('insur') || id === 'stat-4') targets.satisfaction = num;
      }
    });
  }

  const [animated, setAnimated] = useState({ moves: 0, experience: 0, satisfaction: 0, cities: 0 });

  useEffect(() => {
    if (loading) return;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const p = step / steps;
      setAnimated({
        moves: Math.floor(targets.moves * p),
        experience: Math.floor(targets.experience * p),
        satisfaction: Math.floor(targets.satisfaction * p),
        cities: Math.floor(targets.cities * p),
      });
      if (step >= steps) { clearInterval(timer); setAnimated(targets); }
    }, 2000 / steps);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, statsData]);

  if (loading) return <StatsSkeleton />;

  return (
    <section className="container mx-auto px-4 sm:px-8 py-12 sm:py-16 bg-[#0a0f1a]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12">
        <div className="text-center">
          <div className="text-4xl sm:text-6xl font-bold text-brand-primary mb-2">{animated.moves}+</div>
          <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">{t('moves')}</div>
        </div>
        <div className="text-center">
          <div className="text-4xl sm:text-6xl font-bold text-brand-primary mb-2">{animated.experience}+</div>
          <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">{t('experience')}</div>
        </div>
        <div className="text-center">
          <div className="text-4xl sm:text-6xl font-bold text-brand-primary mb-2">{animated.satisfaction}%</div>
          <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">{t('satisfaction')}</div>
        </div>
        <div className="text-center">
          <div className="text-4xl sm:text-6xl font-bold text-brand-primary mb-2">{animated.cities}+</div>
          <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">{t('cities')}</div>
        </div>
      </div>
    </section>
  );
}
