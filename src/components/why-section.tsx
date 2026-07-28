'use client';

import { useTranslations } from 'next-intl';

export function WhySection() {
  const t = useTranslations('why');
  
  const promises = [
    {
      titleKey: 'features.insurance.title',
      descKey: 'features.insurance.description',
      icon: '🛡️'
    },
    {
      titleKey: 'features.pricing.title',
      descKey: 'features.pricing.description',
      icon: '💰'
    },
    {
      titleKey: 'features.team.title',
      descKey: 'features.team.description',
      icon: '👥'
    },
    {
      titleKey: 'features.punctuality.title',
      descKey: 'features.punctuality.description',
      icon: '⏰'
    }
  ];

  return (
    <section className="container mx-auto px-8 py-20">
      <div className="max-w-3xl mb-16">
        <h2 className="text-5xl font-bold mb-6">{t('title')}</h2>
        <p className="text-xl text-gray-600">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {promises.map((promise, index) => (
          <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-orange-200 hover:shadow-lg transition-all">
            <div className="text-5xl mb-6">{promise.icon}</div>
            <h3 className="text-xl font-bold mb-4">{t(promise.titleKey)}</h3>
            <p className="text-gray-600 leading-relaxed">{t(promise.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
