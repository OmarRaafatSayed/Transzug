'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useServices } from '@/hooks/useStoreApi';
import type { ServiceStoreDto } from '@/types/store';

// ── Skeleton ─────────────────────────────────────────────────────
function ServiceCardSkeleton() {
  return (
    <div className="bg-[#151b28] rounded-2xl overflow-hidden border-2 border-gray-800">
      <div className="aspect-[16/10] bg-gray-800 animate-pulse" />
      <div className="p-5 sm:p-6 space-y-3">
        <div className="h-5 w-3/4 bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-800 rounded animate-pulse" />
        <div className="h-4 w-20 bg-brand-light rounded animate-pulse" />
      </div>
    </div>
  );
}

// ── Fallback static data (matches official ServiceStoreDto shape) ─
const STATIC_SERVICES: ServiceStoreDto[] = [
  { title: 'Privatumzug', description: 'Wir kümmern uns um Ihren privaten Umzug von A bis Z.', shortDescription: 'Professioneller Privatumzug', image: ['/images/service-privatumzug.jpg'], slug: 'privatumzug' },
  { title: 'Firmenumzug', description: 'Büroumzüge mit minimaler Ausfallzeit für Ihr Unternehmen.', shortDescription: 'Effiziente Büroumzüge', image: ['/images/service-firmenumzug.jpg'], slug: 'firmenumzug' },
  { title: 'Seniorenumzug', description: 'Einfühlsamer Umzugsdienst für Senioren.', shortDescription: 'Umzug für Senioren', image: ['/images/service-seniorenumzug.jpg'], slug: 'seniorenumzug' },
  { title: 'Möbellagerung', description: 'Sichere Lagerung Ihrer Möbel in unseren Lagerhäusern.', shortDescription: 'Möbel einlagern', image: ['/images/service-moebellagerung.jpg'], slug: 'moebellagerung' },
  { title: 'Entrümpelung', description: 'Professionelle Entrümpelung und Entsorgung.', shortDescription: 'Entrümpelung', image: ['/images/service-entruempelung.jpg'], slug: 'entruempelung' },
  { title: 'Fernumzug', description: 'Deutschlandweite und internationale Umzüge.', shortDescription: 'Fernumzug', image: ['/images/service-fernumzug.jpg'], slug: 'fernumzug' },
  { title: 'LKW & Logistik', description: 'Logistiklösungen mit modernem Fuhrpark.', shortDescription: 'Transport & Logistik', image: ['/images/service-lkw.jpg'], slug: 'lkw-logistik' },
];

// ── Component ─────────────────────────────────────────────────────
export function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();
  const { data: apiServices, loading } = useServices();

  // Use API data if available, fall back to static list
  const services = apiServices && apiServices.length > 0 ? apiServices : STATIC_SERVICES;

  return (
    <section id="services" className="container mx-auto px-4 sm:px-8 py-12 sm:py-20 bg-[#0a0f1a]">
      <div className="max-w-2xl mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">{t('title')}</h2>
        <p className="text-base sm:text-xl text-gray-300">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {loading
          ? [...Array(7)].map((_, i) => <ServiceCardSkeleton key={i} />)
          : services.map((service, index) => {
              const slug = service.slug ?? service.title.toLowerCase().replace(/\s+/g, '-').replace(/[&ä]/g, '');
              const imgSrc = Array.isArray(service.image) && service.image[0]
                ? service.image[0]
                : '/images/hero-1.jpg';

              return (
                <Link
                  key={index}
                  href={`/${locale}/leistungen/${slug}`}
                  className="group bg-[#151b28] rounded-2xl overflow-hidden border-2 border-gray-800 hover:border-brand-primary hover:shadow-xl transition-all"
                >
                  <div className="aspect-[16/10] bg-gray-900 relative overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-brand-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base line-clamp-2">
                      {service.shortDescription || service.description}
                    </p>
                    <span className="inline-flex items-center text-brand-primary font-semibold text-sm">
                      {t('cta')}
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
      </div>
    </section>
  );
}
