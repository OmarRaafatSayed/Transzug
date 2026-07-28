'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    { textKey: 'items.family.text', authorKey: 'items.family.author' },
    { textKey: 'items.business.text', authorKey: 'items.business.author' },
    { textKey: 'items.senior.text', authorKey: 'items.senior.author' }
  ];

  return (
    <section id="reviews" className="py-12 sm:py-20 bg-[#0d1220]">
      <div className="container mx-auto px-4 sm:px-8 text-center max-w-4xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 sm:mb-16 text-white">{t('title')}</h2>
        <div className="bg-[#151b28] rounded-3xl shadow-xl border-2 border-gray-800 p-6 sm:p-12 mb-6 sm:mb-8">
          <p className="text-lg sm:text-2xl text-gray-200 mb-4 sm:mb-6 leading-relaxed">
            "{t(testimonials[currentIndex].textKey)}"
          </p>
          <p className="text-gray-400 font-medium text-sm sm:text-base">
            — {t(testimonials[currentIndex].authorKey)}
          </p>
        </div>
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${index === currentIndex ? 'w-10 bg-orange-600' : 'w-2 bg-gray-600'}`}
              aria-label={`Go to testimonial ${index + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
