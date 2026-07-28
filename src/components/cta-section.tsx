'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export function CTASection() {
  const t = useTranslations('cta');
  const locale = useLocale();
  
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-br from-orange-600 to-orange-500">
      <div className="container mx-auto px-4 sm:px-8 text-center max-w-4xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          {t('title')}
        </h2>
        <p className="text-base sm:text-xl text-white/90 mb-8 sm:mb-10">
          {t('subtitle')}
        </p>
        <Link href={`/${locale}/kontakt`}
          className="inline-block bg-white text-orange-600 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl hover:bg-gray-50 transition-all text-base sm:text-xl font-bold shadow-2xl">
          {t('button')}
        </Link>
      </div>
    </section>
  );
}
