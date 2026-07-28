// ────────────────────────────────────────────────────────────────
// Dashboard API Smoke Tests
// ────────────────────────────────────────────────────────────────

import { galleryApi, reviewsApi, heroApi } from '../dashboard-api';

describe('Dashboard API Smoke Tests', () => {
  // ── Gallery API ──
  describe('Gallery API', () => {
    it('should fetch all gallery images', async () => {
      const response = await galleryApi.getAll();
      
      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data!.length).toBeGreaterThan(0);
    });

    it('should create a new gallery image', async () => {
      const newImage = {
        src: '/test/image.jpg',
        alt: 'Test Image',
        category: 'نقل خاص',
      };

      const response = await galleryApi.create(newImage);
      
      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data!.alt).toBe('Test Image');
      expect(response.data!.id).toBeDefined();
    });

    it('should delete a gallery image', async () => {
      const response = await galleryApi.delete(999);
      
      expect(response.success).toBe(true);
    });
  });

  // ── Reviews API ──
  describe('Reviews API', () => {
    it('should fetch all reviews', async () => {
      const response = await reviewsApi.getAll();
      
      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data!.length).toBeGreaterThan(0);
    });

    it('should create a new review', async () => {
      const newReview = {
        name: 'Test User',
        rating: 5,
        text: 'Great service!',
        date: '2026-07-28',
        status: 'pending' as const,
        service: 'نقل خاص',
      };

      const response = await reviewsApi.create(newReview);
      
      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data!.name).toBe('Test User');
      expect(response.data!.id).toBeDefined();
    });

    it('should update a review', async () => {
      const response = await reviewsApi.update(1, { status: 'published' });
      
      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data!.status).toBe('published');
    });

    it('should delete a review', async () => {
      const response = await reviewsApi.delete(999);
      
      expect(response.success).toBe(true);
    });
  });

  // ── Hero API ──
  describe('Hero API', () => {
    it('should fetch hero content', async () => {
      const response = await heroApi.get();
      
      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data!.slides).toBeDefined();
      expect(Array.isArray(response.data!.slides)).toBe(true);
      expect(response.data!.stats).toBeDefined();
    });

    it('should update hero slides', async () => {
      const slides = [
        { id: 1, src: '/test.jpg', alt: 'Test', enabled: true },
      ];

      const response = await heroApi.updateSlides(slides);
      
      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data!.length).toBe(1);
    });

    it('should update hero stats', async () => {
      const stats = {
        rating: 5.0,
        years: 15,
        moves: 1000,
        insurance: 100,
      };

      const response = await heroApi.updateStats(stats);
      
      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data!.rating).toBe(5.0);
    });
  });

  // ── Integration Test ──
  describe('API Integration', () => {
    it('should handle complete CRUD flow for gallery', async () => {
      // Create
      const createRes = await galleryApi.create({
        src: '/integration-test.jpg',
        alt: 'Integration Test',
        category: 'لوجستيك',
      });
      expect(createRes.success).toBe(true);
      const imageId = createRes.data!.id;

      // Read
      const readRes = await galleryApi.getAll();
      expect(readRes.success).toBe(true);
      const found = readRes.data!.find((img) => img.id === imageId);
      expect(found).toBeDefined();

      // Delete
      const deleteRes = await galleryApi.delete(imageId);
      expect(deleteRes.success).toBe(true);
    });

    it('should handle complete CRUD flow for reviews', async () => {
      // Create
      const createRes = await reviewsApi.create({
        name: 'Integration Test',
        rating: 4,
        text: 'Testing',
        date: '2026-07-28',
        status: 'pending',
        service: 'نقل مكتبي',
      });
      expect(createRes.success).toBe(true);
      const reviewId = createRes.data!.id;

      // Read
      const readRes = await reviewsApi.getAll();
      expect(readRes.success).toBe(true);
      const found = readRes.data!.find((r) => r.id === reviewId);
      expect(found).toBeDefined();

      // Update
      const updateRes = await reviewsApi.update(reviewId, { status: 'published' });
      expect(updateRes.success).toBe(true);
      expect(updateRes.data!.status).toBe('published');

      // Delete
      const deleteRes = await reviewsApi.delete(reviewId);
      expect(deleteRes.success).toBe(true);
    });
  });
});
