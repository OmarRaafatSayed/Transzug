import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const t = useTranslations();
  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* Hero Section */}
        <section className="bg-white py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <div className="text-sm text-orange-600 font-semibold mb-4 uppercase tracking-wider">{t('about.badge')}</div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">{t('about.title')}</h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">{t('about.description')}</p>
                <div className="space-y-3 mb-8">
                  {(['about.features.team','about.features.coverage','about.features.pricing'] as const).map((key) => (
                    <div key={key} className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-orange-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">{t(key)}</span>
                    </div>
                  ))}
                </div>
                <Link href="#team" className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors group">
                  {t('about.cta')}
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
              </div>
              <div>
                <Image src="/images/about-team.jpg" alt="Transzug Team" width={600} height={400}
                  className="rounded-lg shadow-lg object-cover w-full h-[260px] sm:h-[350px] lg:h-[400px]" priority />
              </div>
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section className="py-12 sm:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">{t('why.title')}</h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">{t('why.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
              {[
                { svg: <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>, title: t('why.features.insurance.title'), desc: t('why.features.insurance.description') },
                { svg: <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>, title: t('why.features.pricing.title'), desc: t('why.features.pricing.description') },
                { svg: <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>, title: t('why.features.team.title'), desc: t('why.features.team.description') },
                { svg: <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>, title: t('why.features.punctuality.title'), desc: t('why.features.punctuality.description') },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white mb-5">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">{item.svg}</svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-12 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">{t('team.title')}</h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">{t('team.subtitle')}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { initials: 'MW', name: t('team.members.ceo.name'), role: t('team.members.ceo.role') },
                { initials: 'FA', name: t('team.members.support.name'), role: t('team.members.support.role') },
                { initials: 'AK', name: t('team.members.lead.name'), role: t('team.members.lead.role') },
                { initials: 'SN', name: t('team.members.planning.name'), role: t('team.members.planning.role') },
              ].map((m, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-orange-600 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold">{m.initials}</div>
                  <h3 className="text-sm sm:text-xl font-bold mb-1 text-gray-900">{m.name}</h3>
                  <p className="text-gray-600 text-xs sm:text-base">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-20 bg-orange-600">
          <div className="container mx-auto px-4 sm:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">{t('cta.title')}</h2>
            <p className="text-base sm:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">{t('cta.subtitle')}</p>
            <Link href="/kontakt"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              {t('cta.button')}
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
