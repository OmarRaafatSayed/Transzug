'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                T
              </div>
              <span className="text-2xl font-bold">{useTranslations('header')('logo')}</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}`} className="text-gray-400 hover:text-white transition-colors">
                  {useTranslations('header')('nav.home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/ueber-uns`} className="text-gray-400 hover:text-white transition-colors">
                  {useTranslations('header')('nav.about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/kontakt`} className="text-gray-400 hover:text-white transition-colors">
                  {useTranslations('header')('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">{t('services')}</h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/leistungen/privatumzug`} className="text-gray-400 hover:text-white transition-colors">
                  {useTranslations('services')('items.private.title')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/leistungen/firmenumzug`} className="text-gray-400 hover:text-white transition-colors">
                  {useTranslations('services')('items.office.title')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/leistungen/seniorenumzug`} className="text-gray-400 hover:text-white transition-colors">
                  {useTranslations('services')('items.senior.title')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/leistungen/moebellagerung`} className="text-gray-400 hover:text-white transition-colors">
                  {useTranslations('services')('items.storage.title')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/leistungen/entruempelung`} className="text-gray-400 hover:text-white transition-colors">
                  {useTranslations('services')('items.clearance.title')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/leistungen/fernumzug`} className="text-gray-400 hover:text-white transition-colors">
                  {useTranslations('services')('items.longDistance.title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">{t('contact')}</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t('phone')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('email')}
              </li>
              <li>{t('address')}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-gray-400 text-sm">
            {t('copyright')}
          </p>
          <div className="flex gap-6">
            <Link href={`/${locale}/impressum`} className="text-gray-400 hover:text-white text-sm transition-colors">
              {t('legal.imprint')}
            </Link>
            <Link href={`/${locale}/datenschutz`} className="text-gray-400 hover:text-white text-sm transition-colors">
              {t('legal.privacy')}
            </Link>
            <Link href={`/${locale}/agb`} className="text-gray-400 hover:text-white text-sm transition-colors">
              {t('legal.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
