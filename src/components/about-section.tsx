'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export function AboutSection() {
  const t = useTranslations('about');
  const locale = useLocale();
  
  return (
    <section className="container mx-auto px-4 sm:px-8 py-12 sm:py-20 bg-[#0a0f1a]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Content */}
        <div>
          <div className="text-sm text-orange-600 font-semibold mb-4 uppercase tracking-wider">
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-10 leading-tight text-white">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-6 lg:mb-10 leading-relaxed">
            {t('description')}
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-gray-300">{t('features.team')}</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-gray-300">{t('features.coverage')}</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-gray-300">{t('features.pricing')}</span>
            </li>
          </ul>
          <Link href={`/${locale}/ueber-uns`} className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors group">
            {t('cta')}
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        {/* Image */}
        <div className="relative">
          <Image
            src="/images/about-team.jpg"
            alt="Transzug Team"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover w-full h-[280px] sm:h-[350px] lg:h-[400px]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
