'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export function FAQSection() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    { questionKey: 'items.insurance.question', answerKey: 'items.insurance.answer' },
    { questionKey: 'items.pricing.question', answerKey: 'items.pricing.answer' },
    { questionKey: 'items.coverage.question', answerKey: 'items.coverage.answer' },
    { questionKey: 'items.booking.question', answerKey: 'items.booking.answer' }
  ];

  return (
    <section className="py-12 sm:py-20 bg-[#0d1220]">
      <div className="container mx-auto px-4 sm:px-8 max-w-4xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 sm:mb-16 text-center text-white">{t('title')}</h2>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#151b28] rounded-2xl border-2 border-gray-800 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 sm:px-8 py-4 sm:py-6 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors"
              >
                <span className="font-bold text-base sm:text-lg pr-4 text-white">{t(faq.questionKey)}</span>
                <svg className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform text-brand-primary ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-5 sm:px-8 pb-4 sm:pb-6 text-gray-300 leading-relaxed text-sm sm:text-base">
                  {t(faq.answerKey)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
