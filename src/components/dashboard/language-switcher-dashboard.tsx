'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { locales } from '../../../i18n';

export function LanguageSwitcherDashboard() {
  const locale = useLocale();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    // الداشبورد دائماً على /[locale]/dashboard
    router.push(`/${newLocale}/dashboard`);
  };

  return (
    <div className="flex items-center gap-0.5 bg-[#151b28] border border-gray-700 rounded-lg p-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLanguageChange(loc)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
            locale === loc
              ? 'bg-brand-primary text-white shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
