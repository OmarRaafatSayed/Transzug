import { ServicePage } from '@/components/service-page';

export default function FirmenumzugPage() {
  return (
    <ServicePage
      titleKey="firmenumzug.title"
      subtitleKey="firmenumzug.subtitle"
      priceKey="firmenumzug.price"
      image="/images/service-firmenumzug.jpg"
      related={[
        { slug: 'privatumzug', titleKey: 'privatumzug.title', image: '/images/service-privatumzug.jpg' },
        { slug: 'seniorenumzug', titleKey: 'seniorenumzug.title', image: '/images/service-seniorenumzug.jpg' },
        { slug: 'fernumzug', titleKey: 'fernumzug.title', image: '/images/service-fernumzug.jpg' },
      ]}
    />
  );
}
