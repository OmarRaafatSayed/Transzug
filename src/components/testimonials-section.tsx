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
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="container mx-auto px-8 text-center max-w-4xl">
        <h2 className="text-5xl font-bold mb-16">{t('title')}</h2>
        
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-8">
          <p className="text-2xl text-gray-800 mb-6 leading-relaxed">
            {t(testimonials[currentIndex].textKey)}
          </p>
          <p className="text-gray-600 font-medium">
            {t(testimonials[currentIndex].authorKey)}
          </p>
        </div>

        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-10 bg-orange-600' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
