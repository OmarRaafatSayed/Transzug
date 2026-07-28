import { ServicePage } from '@/components/service-page';

export default function FernumzugPage() {
  return (
    <ServicePage
      titleKey="fernumzug.title"
      subtitleKey="fernumzug.subtitle"
      priceKey="fernumzug.price"
      image="/images/service-fernumzug.jpg"
      related={[
        { slug: 'privatumzug', titleKey: 'privatumzug.title', image: '/images/service-privatumzug.jpg' },
        { slug: 'firmenumzug', titleKey: 'firmenumzug.title', image: '/images/service-firmenumzug.jpg' },
        { slug: 'moebellagerung', titleKey: 'moebellagerung.title', image: '/images/service-moebellagerung.jpg' },
      ]}
    />
  );
}
