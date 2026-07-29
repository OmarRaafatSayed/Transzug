'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
            <div className="text-center mb-10 sm:mb-16">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">{t('title')}</h1>
              <p className="text-base sm:text-xl text-gray-600">{t('subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{t('phone')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{t('email')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{t('address')}</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2 bg-gray-50 rounded-2xl p-5 sm:p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.firstName')} {t('form.required')}
                      </label>
                      <input type="text" required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.lastName')} {t('form.required')}
                      </label>
                      <input type="text" required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.email')} {t('form.required')}
                      </label>
                      <input type="email" required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.phone')}
                      </label>
                      <input type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.moveType')}
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white">
                        <option value="">{t('form.moveTypePlaceholder')}</option>
                        <option value="private">{t('form.moveTypeOptions.private')}</option>
                        <option value="office">{t('form.moveTypeOptions.office')}</option>
                        <option value="senior">{t('form.moveTypeOptions.senior')}</option>
                        <option value="longDistance">{t('form.moveTypeOptions.longDistance')}</option>
                        <option value="other">{t('form.moveTypeOptions.other')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.date')}
                      </label>
                      <input type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.from')}
                      </label>
                      <input type="text" placeholder={t('form.fromPlaceholder')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.to')}
                      </label>
                      <input type="text" placeholder={t('form.toPlaceholder')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.message')}
                    </label>
                    <textarea rows={4} placeholder={t('form.messagePlaceholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white resize-none">
                    </textarea>
                  </div>

                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="privacy" required
                      className="mt-1 w-4 h-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary" />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      {t('form.privacy')}{' '}
                      <Link href={`/${locale}/datenschutz`} className="text-brand-primary hover:underline">
                        Datenschutzerklärung
                      </Link>
                      {' '}{t('form.required')}
                    </label>
                  </div>

                  <button type="submit"
                    className="w-full bg-brand-primary text-white py-4 px-8 rounded-lg font-semibold hover:bg-brand-hover transition-colors text-lg">
                    {t('form.submit')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
