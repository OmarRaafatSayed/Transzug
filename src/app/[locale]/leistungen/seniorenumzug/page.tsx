import { ServicePage } from '@/components/service-page';

export default function SeniorenumzugPage() {
  return (
    <ServicePage
      titleKey="seniorenumzug.title"
      subtitleKey="seniorenumzug.subtitle"
      priceKey="seniorenumzug.price"
      image="/images/service-seniorenumzug.jpg"
      related={[
        { slug: 'privatumzug', titleKey: 'privatumzug.title', image: '/images/service-privatumzug.jpg' },
        { slug: 'firmenumzug', titleKey: 'firmenumzug.title', image: '/images/service-firmenumzug.jpg' },
        { slug: 'moebellagerung', titleKey: 'moebellagerung.title', image: '/images/service-moebellagerung.jpg' },
      ]}
    />
  );
}
