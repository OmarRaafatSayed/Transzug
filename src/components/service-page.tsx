'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface RelatedService {
  slug: string;
  titleKey: string;
  image: string;
}

interface ServicePageProps {
  titleKey: string;
  subtitleKey: string;
  priceKey: string;
  image: string;
  related: RelatedService[];
}

export function ServicePage({ titleKey, subtitleKey, priceKey, image, related }: ServicePageProps) {
  const t = useTranslations('servicePages');
  const tc = useTranslations('cta');
  const locale = useLocale();

  const features = [
    t('features.packaging'),
    t('features.furniture'),
    t('features.transport'),
    t('features.insurance'),
    t('features.stairs'),
    t('features.disposal'),
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

        {/* Hero Image */}
        <div className="relative w-full h-[280px] sm:h-[400px] lg:h-[500px]">
          <Image src={image} alt={t(titleKey as any)} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
            <div className="container mx-auto px-4 sm:px-8">
              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3">{t(titleKey as any)}</h1>
              <p className="text-base sm:text-xl text-white/90 max-w-2xl">{t(subtitleKey as any)}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

              {/* Features */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900">{t('included')}</h2>
                <ul className="space-y-4">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 text-base sm:text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price + CTA */}
              <div>
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 mb-6">
                  <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest mb-2">{t('startingPrice')}</div>
                  <div className="text-4xl sm:text-5xl font-bold text-orange-600 mb-2">{t(priceKey as any)}</div>
                  <p className="text-gray-500 text-sm">{t('priceNote')}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/${locale}/kontakt`}
                    className="flex-1 bg-orange-600 text-white py-4 px-6 rounded-xl font-semibold text-center hover:bg-orange-700 transition-colors">
                    {t('quickQuote')}
                  </Link>
                  <Link href={`/${locale}/kontakt`}
                    className="flex-1 border-2 border-gray-900 text-gray-900 py-4 px-6 rounded-xl font-semibold text-center hover:bg-gray-900 hover:text-white transition-colors">
                    {t('sendRequest')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        {related.length > 0 && (
          <section className="py-12 sm:py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900">{t('otherServices')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((s, i) => (
                  <Link key={i} href={`/${locale}/leistungen/${s.slug}`}
                    className="group relative rounded-2xl overflow-hidden h-48 sm:h-56">
                    <Image src={s.image} alt={t(s.titleKey as any)} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width:640px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-base sm:text-lg mb-1">{t(s.titleKey as any)}</h3>
                      <span className="text-orange-400 text-sm font-medium">{t('learnMore')} →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-12 sm:py-20 bg-orange-600">
          <div className="container mx-auto px-4 sm:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{tc('title')}</h2>
            <p className="text-base sm:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">{tc('subtitle')}</p>
            <Link href={`/${locale}/kontakt`}
              className="inline-block bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors text-base sm:text-lg">
              {tc('button')}
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
