'use client';

import { useTranslations } from 'next-intl';

export function TeamSection() {
  const t = useTranslations('team');
  
  const teamMembers = [
    { initials: 'MW', nameKey: 'members.ceo.name', roleKey: 'members.ceo.role' },
    { initials: 'FA', nameKey: 'members.support.name', roleKey: 'members.support.role' },
    { initials: 'AK', nameKey: 'members.lead.name', roleKey: 'members.lead.role' },
    { initials: 'SN', nameKey: 'members.planning.name', roleKey: 'members.planning.role' }
  ];

  return (
    <section className="container mx-auto px-4 sm:px-8 py-12 sm:py-20 bg-[#0a0f1a]">
      <div className="max-w-3xl mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">{t('title')}</h2>
        <p className="text-base sm:text-xl text-gray-300">{t('subtitle')}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-orange-600 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold">
              {member.initials}
            </div>
            <h3 className="text-sm sm:text-lg font-bold mb-1 text-white">{t(member.nameKey)}</h3>
            <p className="text-gray-400 text-xs sm:text-sm">{t(member.roleKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
