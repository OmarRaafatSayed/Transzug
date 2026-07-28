import { ServicePage } from '@/components/service-page';

export default function PrivatumzugPage() {
  return (
    <ServicePage
      titleKey="privatumzug.title"
      subtitleKey="privatumzug.subtitle"
      priceKey="privatumzug.price"
      image="/images/service-privatumzug.jpg"
      related={[
        { slug: 'firmenumzug', titleKey: 'firmenumzug.title', image: '/images/service-firmenumzug.jpg' },
        { slug: 'seniorenumzug', titleKey: 'seniorenumzug.title', image: '/images/service-seniorenumzug.jpg' },
        { slug: 'moebellagerung', titleKey: 'moebellagerung.title', image: '/images/service-moebellagerung.jpg' },
      ]}
    />
  );
}
