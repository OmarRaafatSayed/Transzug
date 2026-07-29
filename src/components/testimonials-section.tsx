'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useTopReviews } from '@/hooks/useStoreApi';

// ── Skeleton ─────────────────────────────────────────────────────
function TestimonialSkeleton() {
  return (
    <section id="reviews" className="py-12 sm:py-20 bg-[#0d1220]">
      <div className="container mx-auto px-4 sm:px-8 text-center max-w-4xl">
        <div className="h-10 w-64 mx-auto bg-gray-800 rounded animate-pulse mb-10 sm:mb-16" />
        <div className="bg-[#151b28] rounded-3xl border-2 border-gray-800 p-6 sm:p-12 mb-6 sm:mb-8 space-y-4">
          <div className="h-6 w-full bg-gray-700 rounded animate-pulse" />
          <div className="h-6 w-5/6 mx-auto bg-gray-700 rounded animate-pulse" />
          <div className="h-6 w-3/4 mx-auto bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-32 mx-auto bg-gray-800 rounded animate-pulse mt-6" />
        </div>
        <div className="flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-2 w-2 rounded-full bg-gray-700 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Star Rating ───────────────────────────────────────────────────
function StarRating({ rate }: { rate: number }) {
  return (
    <div className="flex justify-center gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rate ? 'text-brand-primary' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────
export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const { data: reviews, loading } = useTopReviews();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading) return <TestimonialSkeleton />;

  // Fall back to translation-based testimonials if API returns nothing
  if (!reviews || reviews.length === 0) {
    const fallback = [
      { textKey: 'items.family.text', authorKey: 'items.family.author' },
      { textKey: 'items.business.text', authorKey: 'items.business.author' },
      { textKey: 'items.senior.text', authorKey: 'items.senior.author' },
    ];
    return (
      <section id="reviews" className="py-12 sm:py-20 bg-[#0d1220]">
        <div className="container mx-auto px-4 sm:px-8 text-center max-w-4xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 sm:mb-16 text-white">{t('title')}</h2>
          <div className="bg-[#151b28] rounded-3xl shadow-xl border-2 border-gray-800 p-6 sm:p-12 mb-6 sm:mb-8">
            <p className="text-lg sm:text-2xl text-gray-200 mb-4 sm:mb-6 leading-relaxed">
              &ldquo;{t(fallback[currentIndex].textKey)}&rdquo;
            </p>
            <p className="text-gray-400 font-medium text-sm sm:text-base">— {t(fallback[currentIndex].authorKey)}</p>
          </div>
          <div className="flex justify-center gap-2">
            {fallback.map((_, i) => (
              <button key={i} onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${i === currentIndex ? 'w-10 bg-brand-primary' : 'w-2 bg-gray-600'}`}
                aria-label={`Go to testimonial ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const current = reviews[currentIndex] ?? reviews[0];

  return (
    <section id="reviews" className="py-12 sm:py-20 bg-[#0d1220]">
      <div className="container mx-auto px-4 sm:px-8 text-center max-w-4xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 sm:mb-16 text-white">{t('title')}</h2>

        <div className="bg-[#151b28] rounded-3xl shadow-xl border-2 border-gray-800 p-6 sm:p-12 mb-6 sm:mb-8">
          {/* Stars — from API rate field */}
          <StarRating rate={current.rate} />

          {/* Review message */}
          <p className="text-lg sm:text-2xl text-gray-200 mb-4 sm:mb-6 leading-relaxed">
            &ldquo;{current.message}&rdquo;
          </p>

          {/* Author — username from API */}
          <p className="text-gray-400 font-medium text-sm sm:text-base">
            — {current.username}
          </p>

          {/* Date */}
          {current.addedAt && (
            <p className="text-gray-600 text-xs mt-2">
              {new Date(current.addedAt).toLocaleDateString('de-DE', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
          )}
        </div>

        {/* Pagination dots */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${i === currentIndex ? 'w-10 bg-brand-primary' : 'w-2 bg-gray-600 hover:bg-gray-500'}`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
