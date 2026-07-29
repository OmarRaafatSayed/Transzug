'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useHeroSlides, useStats } from '@/hooks/useStoreApi';

// ── Skeleton ─────────────────────────────────────────────────────
function HeroSkeleton() {
  return (
    <section className="relative w-full h-screen flex items-center bg-black">
      <div className="absolute inset-0 bg-gray-900 animate-pulse" />
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10 space-y-6">
        <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
        <div className="h-16 w-2/3 bg-gray-700 rounded animate-pulse" />
        <div className="h-16 w-1/2 bg-gray-700 rounded animate-pulse" />
        <div className="h-5 w-3/4 bg-gray-800 rounded animate-pulse" />
        <div className="flex gap-4">
          <div className="h-12 w-44 bg-brand-light rounded-lg animate-pulse" />
          <div className="h-12 w-36 bg-gray-700 rounded-lg animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// ── Component ─────────────────────────────────────────────────────
export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const { data: slides, loading: slidesLoading } = useHeroSlides();
  const { data: statsData, loading: statsLoading } = useStats();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    rating: 0, years: 0, moves: 0, insurance: 0,
  });

  // Parse stats from API — titles are formatted strings like "4.9 / 5", "10+", "500+", "100%"
  const parsedStats = {
    rating: 4.9,
    years: 10,
    moves: 500,
    insurance: 100,
  };
  if (statsData) {
    statsData.forEach((s) => {
      const num = parseFloat(s.title.replace(/[^0-9.]/g, ''));
      if (!isNaN(num)) {
        if (s.description.toLowerCase().includes('rating') || s.id === 'stat-1') parsedStats.rating = num;
        else if (s.description.toLowerCase().includes('jahr') || s.description.toLowerCase().includes('year') || s.id === 'stat-2') parsedStats.years = num;
        else if (s.description.toLowerCase().includes('umzug') || s.description.toLowerCase().includes('move') || s.id === 'stat-3') parsedStats.moves = num;
        else if (s.description.toLowerCase().includes('versich') || s.description.toLowerCase().includes('insur') || s.id === 'stat-4') parsedStats.insurance = num;
      }
    });
  }

  // Active slides from API
  const activeSlides = slides?.filter((s) => s.active) ?? [];
  const displaySlides = activeSlides.length > 0 ? activeSlides : (slides ?? []);

  // Carousel auto-advance
  useEffect(() => {
    if (displaySlides.length < 2) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [displaySlides.length]);

  // Animated counter
  useEffect(() => {
    if (statsLoading) return;
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const targets = parsedStats;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const p = step / steps;
      setAnimatedStats({
        rating: Number((targets.rating * p).toFixed(1)),
        years: Math.floor(targets.years * p),
        moves: Math.floor(targets.moves * p),
        insurance: Math.floor(targets.insurance * p),
      });
      if (step >= steps) { clearInterval(timer); setAnimatedStats(targets); }
    }, stepDuration);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statsLoading, statsData]);

  if (slidesLoading) return <HeroSkeleton />;

  return (
    <section className="relative w-full h-screen flex items-center overflow-hidden bg-black">
      {/* Background carousel */}
      <div className="absolute inset-0">
        {displaySlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={typeof slide.image === 'string' ? slide.image : '/images/hero-1.jpg'}
              alt={slide.title}
              fill
              className="object-cover object-center"
              priority={index === 0}
              quality={95}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="max-w-3xl">
          {/* Rating badge */}
          <div className="flex items-center gap-2 text-white mb-6 sm:mb-8">
            <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium text-sm">{t('rating')}</span>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.15] mb-6 sm:mb-8 text-white">
            {t('title')}
            <br />
            <span className="text-brand-primary block mt-2">{t('subtitle')}</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-100 mb-8 sm:mb-12 max-w-2xl leading-relaxed">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-20">
            <Link href={`/${locale}/kontakt`}
              className="bg-brand-primary text-white px-6 sm:px-8 py-4 rounded-lg hover:bg-brand-hover transition-all font-semibold inline-flex items-center justify-center gap-2 shadow-lg">
              {t('ctaPrimary')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href={`/${locale}/#services`}
              className="border-2 border-white text-white px-6 sm:px-8 py-4 rounded-lg hover:bg-white/10 transition-all font-semibold backdrop-blur-sm text-center">
              {t('ctaSecondary')}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 text-white">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-brand-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="text-2xl sm:text-3xl font-bold">{animatedStats.rating.toFixed(1)}</div>
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-300 font-medium">{t('stats.rating')}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-brand-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-2xl sm:text-3xl font-bold">{animatedStats.years}+</div>
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-300 font-medium">{t('stats.years')}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-brand-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div className="text-2xl sm:text-3xl font-bold">{animatedStats.moves}+</div>
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-300 font-medium">{t('stats.moves')}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-brand-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="text-2xl sm:text-3xl font-bold">{animatedStats.insurance}%</div>
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-300 font-medium">{t('stats.insurance')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      {displaySlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {displaySlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all ${index === currentSlide ? 'w-10 bg-brand-primary' : 'w-4 bg-white/50 hover:bg-white/70'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
