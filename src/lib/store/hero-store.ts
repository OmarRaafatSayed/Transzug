import type { HeroStoreDto } from '@/types/store';

export const heroStore: HeroStoreDto[] = [
  { id: 'hero-1', image: '/images/hero-1.jpg', active: true, title: 'Professionelle Umzüge',      description: 'Ihr zuverlässiger Partner für Umzüge in ganz Deutschland.' },
  { id: 'hero-2', image: '/images/hero-2.jpg', active: true, title: 'Sicher & Pünktlich',          description: 'Mit über 10 Jahren Erfahrung bringen wir Ihre Möbel sicher ans Ziel.' },
  { id: 'hero-3', image: '/images/hero-3.jpg', active: true, title: 'Faire Preise',                description: 'Transparente Preise ohne versteckte Kosten.' },
  { id: 'hero-4', image: '/images/hero-4.jpg', active: true, title: 'Vollkasko-Versicherung',      description: '100% versicherter Transport Ihrer Wertsachen.' },
];
