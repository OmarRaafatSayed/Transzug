import { ServicePage } from '@/components/service-page';

export default function LkwLogistikPage() {
  return (
    <ServicePage
      titleKey="lkwLogistik.title"
      subtitleKey="lkwLogistik.subtitle"
      priceKey="lkwLogistik.price"
      image="/images/service-lkw.jpg"
      related={[
        { slug: 'firmenumzug', titleKey: 'firmenumzug.title', image: '/images/service-firmenumzug.jpg' },
        { slug: 'fernumzug', titleKey: 'fernumzug.title', image: '/images/service-fernumzug.jpg' },
        { slug: 'privatumzug', titleKey: 'privatumzug.title', image: '/images/service-privatumzug.jpg' },
      ]}
    />
  );
}
