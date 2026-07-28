import { DashboardPage } from '@/components/dashboard/dashboard-page';

export default function Dashboard() {
  return <DashboardPage />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === 'ar' ? 'لوحة التحكم - ترانسزوغ' : 'Dashboard - Transzug',
  };
}
