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
    <section className="container mx-auto px-8 py-20">
      <div className="max-w-3xl mb-16">
        <h2 className="text-5xl font-bold mb-6">{t('title')}</h2>
        <p className="text-xl text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {member.initials}
            </div>
            <h3 className="text-lg font-bold mb-1">{t(member.nameKey)}</h3>
            <p className="text-gray-600 text-sm">{t(member.roleKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
