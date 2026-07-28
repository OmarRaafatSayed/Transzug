'use client';

import { useTranslations } from 'next-intl';

export function ProcessSection() {
  const t = useTranslations('process');
  
  const steps = [
    { number: '1', titleKey: 'steps.contact.title', descKey: 'steps.contact.description' },
    { number: '2', titleKey: 'steps.inspection.title', descKey: 'steps.inspection.description' },
    { number: '3', titleKey: 'steps.moving.title', descKey: 'steps.moving.description' },
    { number: '4', titleKey: 'steps.followup.title', descKey: 'steps.followup.description' }
  ];

  return (
    <section id="process" className="container mx-auto px-4 sm:px-8 py-12 sm:py-20">
      <div className="max-w-3xl mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t('title')}</h2>
        <p className="text-base sm:text-xl text-gray-600">{t('subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-5">
              {step.number}
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3">{t(step.titleKey)}</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{t(step.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
