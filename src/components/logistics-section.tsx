'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export function LogisticsSection() {
  const t = useTranslations('logistics');
  const locale = useLocale();
  
  const features = [
    { key: 'features.drivers' },
    { key: 'features.tracking' },
    { key: 'features.safety' },
    { key: 'features.insurance' }
  ];

  const specs = [
    { labelKey: 'stats.weight', sublabelKey: 'stats.weightLabel' },
    { labelKey: 'stats.availability', sublabelKey: 'stats.availabilityLabel' },
    { labelKey: 'stats.area', sublabelKey: 'stats.areaLabel' }
  ];

  const services = [
    {
      titleKey: 'cards.fleet.title',
      descKey: 'cards.fleet.description',
      icon: '🚛'
    },
    {
      titleKey: 'cards.contracts.title',
      descKey: 'cards.contracts.description',
      icon: '📋'
    },
    {
      titleKey: 'cards.pallets.title',
      descKey: 'cards.pallets.description',
      icon: '📦'
    },
    {
      titleKey: 'cards.capacity.title',
      descKey: 'cards.capacity.description',
      icon: '⚡'
    }
  ];

  return (
    <section className="container mx-auto px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
        <div>
          <div className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg mb-6 font-semibold text-sm">
            {t('badge')}
          </div>
          
          <h2 className="text-5xl font-bold mb-8 leading-tight">
            {t('title')}
          </h2>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {t('subtitle')}
          </p>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {t('description')}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-700 text-sm leading-tight">{t(feature.key)}</span>
              </div>
            ))}
          </div>
          
          <div className="flex gap-4">
            <Link
              href={`/${locale}/kontakt`}
              className="bg-orange-600 text-white px-8 py-3 rounded-xl hover:bg-orange-700 transition-all font-semibold"
            >
              {t('cta.primary')}
            </Link>
            <Link
              href={`/${locale}/leistungen/lkw-logistik`}
              className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-xl hover:bg-gray-900 hover:text-white transition-all font-semibold"
            >
              {t('cta.secondary')}
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl mb-6 relative overflow-hidden">
            <Image
              src="/images/lkw-logistics.jpg"
              alt={t('title')}
              fill
              className="object-cover rounded-3xl"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {specs.map((spec, index) => (
              <div key={index} className="bg-white border-2 border-gray-100 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold mb-1">{t(spec.labelKey)}</div>
                <div className="text-sm text-gray-500">{t(spec.sublabelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-orange-200 hover:shadow-lg transition-all">
            <div className="text-5xl mb-6">{service.icon}</div>
            <h3 className="text-xl font-bold mb-4">{t(service.titleKey)}</h3>
            <p className="text-gray-600 leading-relaxed">{t(service.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
