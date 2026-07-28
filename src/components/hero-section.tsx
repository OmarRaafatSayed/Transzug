'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    rating: 0,
    years: 0,
    moves: 0,
    insurance: 0
  });

  const slides = [
    '/images/hero-1.jpg',
    '/images/hero-2.jpg',
    '/images/hero-3.jpg',
    '/images/hero-4.jpg'
  ];

  // Carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Animated counter effect
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    
    const targets = {
      rating: 4.9,
      years: 10,
      moves: 500,
      insurance: 100
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        rating: Number((targets.rating * progress).toFixed(1)),
        years: Math.floor(targets.years * progress),
        moves: Math.floor(targets.moves * progress),
        insurance: Math.floor(targets.insurance * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center overflow-hidden bg-black">
      {/* Background Images Carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide}
              alt={`Hero ${index + 1}`}
              fill
              className="object-cover object-center"
              priority={index === 0}
              quality={95}
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-8 lg:px-16 relative z-10">
        <div className="max-w-3xl">
          {/* Rating badge */}
          <div className="flex items-center gap-2 text-white mb-8">
            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium text-sm">{t('rating')}</span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl lg:text-7xl font-bold leading-[1.15] mb-8 text-white">
            {t('title')}
            <br />
            <span className="text-orange-500 block mt-2">{t('subtitle')}</span>
          </h1>
          
          {/* Description */}
          <p className="text-lg lg:text-xl text-gray-100 mb-12 max-w-2xl leading-relaxed">
            {t('description')}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-20">
            <Link
              href={`/${locale}/kontakt`}
              className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-all font-semibold inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              {t('ctaPrimary')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={`/${locale}/#services`}
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all font-semibold backdrop-blur-sm"
            >
              {t('ctaSecondary')}
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="text-3xl font-bold">{animatedStats.rating.toFixed(1)}</div>
              </div>
              <div className="text-[11px] uppercase tracking-wide text-gray-300 font-medium">{t('stats.rating')}</div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-3xl font-bold">{animatedStats.years}+</div>
              </div>
              <div className="text-[11px] uppercase tracking-wide text-gray-300 font-medium">{t('stats.years')}</div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div className="text-3xl font-bold">{animatedStats.moves}+</div>
              </div>
              <div className="text-[11px] uppercase tracking-wide text-gray-300 font-medium">{t('stats.moves')}</div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="text-3xl font-bold">{animatedStats.insurance}%</div>
              </div>
              <div className="text-[11px] uppercase tracking-wide text-gray-300 font-medium">{t('stats.insurance')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentSlide ? 'w-10 bg-orange-600' : 'w-4 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
