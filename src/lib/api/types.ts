// ────────────────────────────────────────────────────────────────
// API Types for Dashboard
// ────────────────────────────────────────────────────────────────

export type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: string;
};

export type Review = {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  status: 'published' | 'pending';
  service: string;
};

export type HeroSlide = {
  id: number;
  src: string;
  alt: string;
  enabled: boolean;
};

export type HeroStats = {
  rating: number;
  years: number;
  moves: number;
  insurance: number;
};

export type HeroContent = {
  slides: HeroSlide[];
  stats: HeroStats;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
