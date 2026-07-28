import { ServicePage } from '@/components/service-page';

export default function EntruempelungPage() {
  return (
    <ServicePage
      titleKey="entruempelung.title"
      subtitleKey="entruempelung.subtitle"
      priceKey="entruempelung.price"
      image="/images/service-entruempelung.jpg"
      related={[
        { slug: 'privatumzug', titleKey: 'privatumzug.title', image: '/images/service-privatumzug.jpg' },
        { slug: 'moebellagerung', titleKey: 'moebellagerung.title', image: '/images/service-moebellagerung.jpg' },
        { slug: 'seniorenumzug', titleKey: 'seniorenumzug.title', image: '/images/service-seniorenumzug.jpg' },
      ]}
    />
  );
}
