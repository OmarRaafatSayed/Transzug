'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
  const t = useTranslations('header');
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-8 h-20 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3 text-2xl font-bold">
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white">
            T
          </div>
          <span>{t('logo')}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href={`/${locale}`} className="hover:text-primary transition-colors">
            {t('nav.home')}
          </Link>
          <Link href={`/${locale}/#services`} className="hover:text-primary transition-colors">
            {t('nav.services')}
          </Link>
          <Link href={`/${locale}/ueber-uns`} className="hover:text-primary transition-colors">
            {t('nav.about')}
          </Link>
          <Link href={`/${locale}/#process`} className="hover:text-primary transition-colors">
            {t('nav.process')}
          </Link>
          <Link href={`/${locale}/#reviews`} className="hover:text-primary transition-colors">
            {t('nav.reviews')}
          </Link>
          <Link href={`/${locale}/kontakt`} className="hover:text-primary transition-colors">
            {t('nav.contact')}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/kontakt`}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </header>
  );
}
