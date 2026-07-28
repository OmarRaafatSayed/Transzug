'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';

export function BeforeAfterSection() {
  const t = useTranslations('beforeAfter');
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section className="py-12 sm:py-20 bg-[#0a0f1a]">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">{t('title')}</h2>
          <p className="text-base sm:text-xl text-gray-300">{t('subtitle')}</p>
        </div>
        <div className="relative max-w-6xl mx-auto aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-gray-800 shadow-2xl">
          <Image src="/images/before-after-after.jpg" alt={t('after')} fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
            <Image src="/images/before-after-before.jpg" alt={t('before')} fill className="object-cover" sizes="100vw" />
          </div>
          <div className="absolute inset-0">
            <input type="range" min="0" max="100" value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-col-resize z-10" />
            <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${sliderPosition}%` }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute top-3 sm:top-6 left-3 sm:left-6 bg-white/90 px-2 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm">
            {t('before')}
          </div>
          <div className="absolute top-3 sm:top-6 right-3 sm:right-6 bg-white/90 px-2 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm">
            {t('after')}
          </div>
        </div>
      </div>
    </section>
  );
}
