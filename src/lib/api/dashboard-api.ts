// ────────────────────────────────────────────────────────────────
// Dashboard API - Client-side data management
// In production, replace with real API calls
// ────────────────────────────────────────────────────────────────

import type { GalleryImage, Review, HeroContent, ApiResponse } from './types';

// ── Mock Data Store ──
let galleryStore: GalleryImage[] = [
  { id: 1, src: '/images/hero-1.jpg', alt: 'نقل أثاث', category: 'نقل خاص' },
  { id: 2, src: '/images/hero-2.jpg', alt: 'نقل مكتبي', category: 'نقل مكتبي' },
  { id: 3, src: '/images/hero-3.jpg', alt: 'خدمات تخزين', category: 'تخزين أثاث' },
  { id: 4, src: '/images/hero-4.jpg', alt: 'لوجستيك', category: 'لوجستيك' },
  { id: 5, src: '/images/service-privatumzug.jpg', alt: 'نقل خاص', category: 'نقل خاص' },
  { id: 6, src: '/images/service-firmenumzug.jpg', alt: 'نقل مكتبي', category: 'نقل مكتبي' },
  { id: 7, src: '/images/service-seniorenumzug.jpg', alt: 'نقل كبار السن', category: 'نقل كبار السن' },
  { id: 8, src: '/images/service-moebellagerung.jpg', alt: 'تخزين الأثاث', category: 'تخزين أثاث' },
  { id: 9, src: '/images/service-entruempelung.jpg', alt: 'تنظيف', category: 'تنظيف' },
  { id: 10, src: '/images/service-fernumzug.jpg', alt: 'نقل بعيد', category: 'نقل بعيد' },
  { id: 11, src: '/images/service-lkw.jpg', alt: 'شاحنات لوجستيك', category: 'لوجستيك' },
];

let reviewsStore: Review[] = [
  {
    id: 1,
    name: 'أحمد محمد',
    rating: 5,
    text: 'خدمة ممتازة وفريق عمل محترف. تم نقل جميع الأثاث بأمان تام وفي الوقت المحدد.',
    date: '2026-07-20',
    status: 'published',
    service: 'نقل خاص',
  },
  {
    id: 2,
    name: 'سارة خالد',
    rating: 5,
    text: 'تجربة رائعة! الفريق كان لطيفاً ومنظماً. سأنصح بهم بالتأكيد لكل من يحتاج نقل.',
    date: '2026-07-15',
    status: 'published',
    service: 'نقل مكتبي',
  },
  {
    id: 3,
    name: 'محمد علي',
    rating: 4,
    text: 'عمل جيد بشكل عام، وصلوا في الموعد المحدد وكانوا حريصين على الأثاث.',
    date: '2026-07-10',
    status: 'pending',
    service: 'نقل خاص',
  },
  {
    id: 4,
    name: 'فاطمة إبراهيم',
    rating: 5,
    text: 'أفضل شركة نقل تعاملت معها. الأسعار معقولة والخدمة احترافية.',
    date: '2026-07-05',
    status: 'published',
    service: 'تخزين أثاث',
  },
  {
    id: 5,
    name: 'عمر حسن',
    rating: 3,
    text: 'الخدمة كانت مقبولة لكن التأخير في الوصول كان مشكلة صغيرة.',
    date: '2026-06-28',
    status: 'pending',
    service: 'لوجستيك',
  },
  {
    id: 6,
    name: 'ليلى عبدالله',
    rating: 5,
    text: 'خدمة ممتازة لنقل والدتي. الفريق كان صبوراً ومحترماً جداً.',
    date: '2026-06-20',
    status: 'published',
    service: 'نقل كبار السن',
  },
];

let heroStore: HeroContent = {
  slides: [
    { id: 1, src: '/images/hero-1.jpg', alt: 'Hero 1', enabled: true },
    { id: 2, src: '/images/hero-2.jpg', alt: 'Hero 2', enabled: true },
    { id: 3, src: '/images/hero-3.jpg', alt: 'Hero 3', enabled: true },
    { id: 4, src: '/images/hero-4.jpg', alt: 'Hero 4', enabled: true },
  ],
  stats: {
    rating: 4.9,
    years: 10,
    moves: 500,
    insurance: 100,
  },
};

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ────────────────────────────────────────────────────────────────
// Gallery API
// ────────────────────────────────────────────────────────────────

export const galleryApi = {
  getAll: async (): Promise<ApiResponse<GalleryImage[]>> => {
    await delay(100);
    return { success: true, data: [...galleryStore] };
  },

  create: async (image: Omit<GalleryImage, 'id'>): Promise<ApiResponse<GalleryImage>> => {
    await delay(100);
    const newImage = { ...image, id: Date.now() };
    galleryStore.push(newImage);
    return { success: true, data: newImage };
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    await delay(100);
    galleryStore = galleryStore.filter((img) => img.id !== id);
    return { success: true };
  },
};

// ────────────────────────────────────────────────────────────────
// Reviews API
// ────────────────────────────────────────────────────────────────

export const reviewsApi = {
  getAll: async (): Promise<ApiResponse<Review[]>> => {
    await delay(100);
    return { success: true, data: [...reviewsStore] };
  },

  create: async (review: Omit<Review, 'id'>): Promise<ApiResponse<Review>> => {
    await delay(100);
    const newReview = { ...review, id: Date.now() };
    reviewsStore.push(newReview);
    return { success: true, data: newReview };
  },

  update: async (id: number, updates: Partial<Review>): Promise<ApiResponse<Review>> => {
    await delay(100);
    const index = reviewsStore.findIndex((r) => r.id === id);
    if (index === -1) {
      return { success: false, error: 'Review not found' };
    }
    reviewsStore[index] = { ...reviewsStore[index], ...updates };
    return { success: true, data: reviewsStore[index] };
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    await delay(100);
    reviewsStore = reviewsStore.filter((r) => r.id !== id);
    return { success: true };
  },
};

// ────────────────────────────────────────────────────────────────
// Hero API
// ────────────────────────────────────────────────────────────────

export const heroApi = {
  get: async (): Promise<ApiResponse<HeroContent>> => {
    await delay(100);
    return { success: true, data: { ...heroStore } };
  },

  updateSlides: async (slides: HeroContent['slides']): Promise<ApiResponse<HeroContent['slides']>> => {
    await delay(100);
    heroStore.slides = slides;
    return { success: true, data: slides };
  },

  updateStats: async (stats: HeroContent['stats']): Promise<ApiResponse<HeroContent['stats']>> => {
    await delay(100);
    heroStore.stats = stats;
    return { success: true, data: stats };
  },
};
