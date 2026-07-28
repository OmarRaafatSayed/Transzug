'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export function StatsSection() {
  const t = useTranslations('stats');
  const [animatedStats, setAnimatedStats] = useState({
    moves: 0,
    experience: 0,
    satisfaction: 0,
    cities: 0
  });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    const targets = {
      moves: 500,
      experience: 10,
      satisfaction: 100,
      cities: 50
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        moves: Math.floor(targets.moves * progress),
        experience: Math.floor(targets.experience * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
        cities: Math.floor(targets.cities * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container mx-auto px-8 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="text-center">
          <div className="text-6xl font-bold text-orange-600 mb-2">{animatedStats.moves}+</div>
          <div className="text-gray-600 text-sm uppercase tracking-wide">{t('moves')}</div>
        </div>
        <div className="text-center">
          <div className="text-6xl font-bold text-orange-600 mb-2">{animatedStats.experience}+</div>
          <div className="text-gray-600 text-sm uppercase tracking-wide">{t('experience')}</div>
        </div>
        <div className="text-center">
          <div className="text-6xl font-bold text-orange-600 mb-2">{animatedStats.satisfaction}%</div>
          <div className="text-gray-600 text-sm uppercase tracking-wide">{t('satisfaction')}</div>
        </div>
        <div className="text-center">
          <div className="text-6xl font-bold text-orange-600 mb-2">{animatedStats.cities}+</div>
          <div className="text-gray-600 text-sm uppercase tracking-wide">{t('cities')}</div>
        </div>
      </div>
    </section>
  );
}
