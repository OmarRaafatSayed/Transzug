'use client';

import { useTranslations } from 'next-intl';

export function WhySection() {
  const t = useTranslations('why');
  
  const promises = [
    {
      titleKey: 'features.insurance.title',
      descKey: 'features.insurance.description',
      icon: (
        <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white mb-6">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      )
    },
    {
      titleKey: 'features.pricing.title',
      descKey: 'features.pricing.description',
      icon: (
        <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white mb-6">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
          </svg>
        </div>
      )
    },
    {
      titleKey: 'features.team.title',
      descKey: 'features.team.description',
      icon: (
        <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white mb-6">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        </div>
      )
    },
    {
      titleKey: 'features.punctuality.title',
      descKey: 'features.punctuality.description',
      icon: (
        <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white mb-6">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <section className="container mx-auto px-4 sm:px-8 py-12 sm:py-20 bg-[#0d1220]">
      <div className="max-w-3xl mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">{t('title')}</h2>
        <p className="text-base sm:text-xl text-gray-300">{t('subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {promises.map((promise, index) => (
          <div key={index} className="bg-[#151b28] border-2 border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-orange-600 hover:shadow-lg transition-all">
            {promise.icon}
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">{t(promise.titleKey)}</h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{t(promise.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
