import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import { notFound } from 'next/navigation';
import { locales } from '../../../i18n';
import { DashboardProvider } from '@/lib/context/dashboard-context';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${isRTL ? cairo.variable : geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col ${isRTL ? 'font-cairo' : 'font-sans'}`}>
        <DashboardProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </DashboardProvider>
      </body>
    </html>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return {
    title: locale === 'ar' ? 'ترانسزوغ - خدمات نقل احترافية' : 'Transzug - Professionelle Umzüge',
    description: locale === 'ar' 
      ? 'خدمات نقل احترافية في جميع أنحاء ألمانيا - آمنة وموثوقة وشفافة'
      : 'Professionelle Umzüge in ganz Deutschland - Sicher, zuverlässig, transparent',
  };
}
