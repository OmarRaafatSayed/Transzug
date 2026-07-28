'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';

export function BeforeAfterSection() {
  const t = useTranslations('beforeAfter');
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-8">
        <div className="max-w-3xl mb-16">
          <h2 className="text-5xl font-bold mb-6">{t('title')}</h2>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>

        <div className="relative max-w-6xl mx-auto aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
          {/* After Image */}
          <Image
            src="/images/before-after-after.jpg"
            alt={t('after')}
            fill
            className="object-cover"
          />
          
          {/* Before Image with clip */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src="/images/before-after-before.jpg"
              alt={t('before')}
              fill
              className="object-cover"
            />
          </div>

          {/* Slider */}
          <div className="absolute inset-0">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-col-resize z-10"
            />
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-6 left-6 bg-white/90 px-4 py-2 rounded-lg font-semibold text-sm">
            {t('before')}
          </div>
          <div className="absolute top-6 right-6 bg-white/90 px-4 py-2 rounded-lg font-semibold text-sm">
            {t('after')}
          </div>
        </div>
      </div>
    </section>
  );
}
