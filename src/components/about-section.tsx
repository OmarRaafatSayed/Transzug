'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export function AboutSection() {
  const t = useTranslations('about');
  const locale = useLocale();
  
  return (
    <section className="container mx-auto px-8 py-20">
      <div className="max-w-2xl">
        <div className="text-sm text-orange-600 font-semibold mb-6 uppercase tracking-wider">
          {t('badge')}
        </div>
        
        <h2 className="text-5xl font-bold mb-10 leading-tight">
          {t('title')}
        </h2>
        
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          {t('description')}
        </p>
        
        <ul className="space-y-4 mb-10">
          <li className="flex items-start gap-3">
            <svg className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-gray-700">{t('features.team')}</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-gray-700">{t('features.coverage')}</span>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-gray-700">{t('features.pricing')}</span>
          </li>
        </ul>
        
        <Link
          href={`/${locale}/ueber-uns`}
          className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors group"
        >
          {t('cta')}
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
