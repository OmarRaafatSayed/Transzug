'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();
  
  const services = [
    {
      titleKey: 'items.private.title',
      descKey: 'items.private.description',
      image: '/images/service-privatumzug.jpg',
      link: '/leistungen/privatumzug'
    },
    {
      titleKey: 'items.office.title',
      descKey: 'items.office.description',
      image: '/images/service-firmenumzug.jpg',
      link: '/leistungen/firmenumzug'
    },
    {
      titleKey: 'items.senior.title',
      descKey: 'items.senior.description',
      image: '/images/service-seniorenumzug.jpg',
      link: '/leistungen/seniorenumzug'
    },
    {
      titleKey: 'items.storage.title',
      descKey: 'items.storage.description',
      image: '/images/service-moebellagerung.jpg',
      link: '/leistungen/moebellagerung'
    },
    {
      titleKey: 'items.clearance.title',
      descKey: 'items.clearance.description',
      image: '/images/service-entruempelung.jpg',
      link: '/leistungen/entruempelung'
    },
    {
      titleKey: 'items.longDistance.title',
      descKey: 'items.longDistance.description',
      image: '/images/service-fernumzug.jpg',
      link: '/leistungen/fernumzug'
    },
    {
      titleKey: 'items.logistics.title',
      descKey: 'items.logistics.description',
      image: '/images/service-lkw.jpg',
      link: '/leistungen/lkw-logistik'
    }
  ];

  return (
    <section id="services" className="container mx-auto px-8 py-20">
      <div className="max-w-2xl mb-16">
        <h2 className="text-5xl font-bold mb-6">{t('title')}</h2>
        <p className="text-xl text-gray-600">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Link
            key={index}
            href={`/${locale}${service.link}`}
            className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all"
          >
            <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
              <Image
                src={service.image}
                alt={t(service.titleKey)}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors">
                {t(service.titleKey)}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {t(service.descKey)}
              </p>
              <span className="inline-flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                {t('cta')}
                <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
