import { ServicePage } from '@/components/service-page';

export default function MoebellagerungPage() {
  return (
    <ServicePage
      titleKey="moebellagerung.title"
      subtitleKey="moebellagerung.subtitle"
      priceKey="moebellagerung.price"
      image="/images/service-moebellagerung.jpg"
      related={[
        { slug: 'privatumzug', titleKey: 'privatumzug.title', image: '/images/service-privatumzug.jpg' },
        { slug: 'entruempelung', titleKey: 'entruempelung.title', image: '/images/service-entruempelung.jpg' },
        { slug: 'fernumzug', titleKey: 'fernumzug.title', image: '/images/service-fernumzug.jpg' },
      ]}
    />
  );
}
