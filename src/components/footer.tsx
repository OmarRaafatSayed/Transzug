'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useLandingInfo } from '@/hooks/useStoreApi';

export function Footer() {
  const t = useTranslations('footer');
  const tHeader = useTranslations('header');
  const tServices = useTranslations('services');
  const locale = useLocale();

  // Fetch LandingInfo for dynamic contact details
  const { data: landingInfo } = useLandingInfo();
  const companyName = landingInfo?.name ?? tHeader('logo');
  const phone = landingInfo?.phone ?? t('phone');
  const email = landingInfo?.email ?? t('email');
  const address = landingInfo
    ? `${landingInfo.street} ${landingInfo.buildingNumber}, ${landingInfo.city}`
    : t('address');

  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-12">

          {/* Company Info — name and description from LandingInfo API */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold">
                {companyName.charAt(0).toUpperCase()}
              </div>
              <span className="text-2xl font-bold">{companyName}</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {landingInfo?.description ?? t('description')}
            </p>

            {/* Socials from API */}
            {landingInfo?.socials && landingInfo.socials.length > 0 && (
              <div className="flex gap-3 mt-4">
                {landingInfo.socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-700 hover:bg-brand-primary transition-colors flex items-center justify-center"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <span className="text-xs font-bold text-white">
                      {social.name.charAt(0).toUpperCase()}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}`} className="text-gray-400 hover:text-white transition-colors">
                  {tHeader('nav.home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/ueber-uns`} className="text-gray-400 hover:text-white transition-colors">
                  {tHeader('nav.about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/kontakt`} className="text-gray-400 hover:text-white transition-colors">
                  {tHeader('nav.contact')}
                </Link>
              </li>
              <li>
                <Link href="/api-doc" className="text-gray-400 hover:text-brand-primary transition-colors text-sm">
                  API Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">{t('services')}</h4>
            <ul className="space-y-3">
              {[
                { href: 'privatumzug', key: 'items.private.title' },
                { href: 'firmenumzug', key: 'items.office.title' },
                { href: 'seniorenumzug', key: 'items.senior.title' },
                { href: 'moebellagerung', key: 'items.storage.title' },
                { href: 'entruempelung', key: 'items.clearance.title' },
                { href: 'fernumzug', key: 'items.longDistance.title' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={`/${locale}/leistungen/${item.href}`} className="text-gray-400 hover:text-white transition-colors">
                    {tServices(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — from LandingInfo API */}
          <div>
            <h4 className="font-bold text-lg mb-6">{t('contact')}</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${phone}`} className="hover:text-white transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-gray-400 text-sm">{t('copyright')}</p>
          <div className="flex gap-6">
            <Link href={`/${locale}/impressum`} className="text-gray-400 hover:text-white text-sm transition-colors">{t('legal.imprint')}</Link>
            <Link href={`/${locale}/datenschutz`} className="text-gray-400 hover:text-white text-sm transition-colors">{t('legal.privacy')}</Link>
            <Link href={`/${locale}/agb`} className="text-gray-400 hover:text-white text-sm transition-colors">{t('legal.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
