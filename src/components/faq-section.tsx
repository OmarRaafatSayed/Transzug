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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-8 max-w-4xl">
        <h2 className="text-5xl font-bold mb-16 text-center">{t('title')}</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-lg pr-8">{t(faq.questionKey)}</span>
                <svg
                  className={`w-6 h-6 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6 text-gray-600 leading-relaxed">
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
