'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from './language-switcher';
import { useLandingInfo } from '@/hooks/useStoreApi';

export function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch LandingInfo for dynamic name/phone
  const { data: landingInfo } = useLandingInfo();
  const companyName = landingInfo?.name ?? t('logo');
  const companyPhone = landingInfo?.phone ?? null;

  const navLinks = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/#services`, label: t('nav.services') },
    { href: `/${locale}/ueber-uns`, label: t('nav.about') },
    { href: `/${locale}/#process`, label: t('nav.process') },
    { href: `/${locale}/#reviews`, label: t('nav.reviews') },
    { href: `/${locale}/kontakt`, label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0a0f1a] border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">

        {/* Logo — uses name from LandingInfo API */}
        <Link href={`/${locale}`} className="flex items-center gap-2 text-xl sm:text-2xl font-bold flex-shrink-0 text-white">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm sm:text-base">
            {companyName.charAt(0).toUpperCase()}
          </div>
          <span>{companyName}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-gray-300 hover:text-brand-primary transition-colors whitespace-nowrap">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Phone removed */}
          <LanguageSwitcher />
          <Link href={`/${locale}/kontakt`} className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-hover transition-colors text-sm whitespace-nowrap">
            {t('cta')}
          </Link>
        </div>

        {/* Mobile Right */}
        <div className="flex lg:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-800 bg-[#0d1220] shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 px-4 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-brand-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            
            <Link
              href={`/${locale}/kontakt`}
              onClick={() => setMenuOpen(false)}
              className="mt-2 bg-brand-primary text-white py-3 px-4 rounded-lg text-center font-semibold hover:bg-brand-hover transition-colors"
            >
              {t('cta')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
