# Dashboard API Documentation

## Overview

This API provides a clean interface for managing dashboard content including gallery images, reviews, and hero section data.

## Architecture

```
src/lib/api/
├── types.ts              # TypeScript types for all API entities
├── dashboard-api.ts      # API implementation (mock data store)
└── __tests__/
    └── dashboard-api.test.ts  # Smoke tests
```

## API Endpoints

### Gallery API

```typescript
import { galleryApi } from '@/lib/api/dashboard-api';

// Get all images
const response = await galleryApi.getAll();

// Create new image
const response = await galleryApi.create({
  src: '/images/new.jpg',
  alt: 'Description',
  category: 'نقل خاص',
});

// Delete image
const response = await galleryApi.delete(imageId);
```

### Reviews API

```typescript
import { reviewsApi } from '@/lib/api/dashboard-api';

// Get all reviews
const response = await reviewsApi.getAll();

// Create review
const response = await reviewsApi.create({
  name: 'Customer Name',
  rating: 5,
  text: 'Review text',
  date: '2026-07-28',
  status: 'pending',
  service: 'نقل خاص',
});

// Update review
const response = await reviewsApi.update(reviewId, { status: 'published' });

// Delete review
const response = await reviewsApi.delete(reviewId);
```

### Hero API

```typescript
import { heroApi } from '@/lib/api/dashboard-api';

// Get hero content
const response = await heroApi.get();

// Update slides
const response = await heroApi.updateSlides([
  { id: 1, src: '/hero.jpg', alt: 'Hero', enabled: true },
]);

// Update stats
const response = await heroApi.updateStats({
  rating: 4.9,
  years: 10,
  moves: 500,
  insurance: 100,
});
```

## Response Format

All API calls return an `ApiResponse<T>`:

```typescript
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
```

## Testing

Run the smoke tests:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

With coverage:

```bash
npm run test:coverage
```

## Production Deployment

**Important:** The current implementation uses an in-memory data store. For production:

1. Replace API calls with real HTTP requests
2. Connect to a backend database
3. Add authentication middleware
4. Implement proper error handling
5. Add request validation

Example production structure:

```typescript
export const galleryApi = {
  getAll: async () => {
    const response = await fetch('/api/gallery');
    return response.json();
  },
  // ... other methods
};
```

## Categories

Valid service categories:

- نقل خاص (Private Moving)
- نقل مكتبي (Office Moving)
- نقل كبار السن (Senior Moving)
- تخزين أثاث (Furniture Storage)
- تنظيف (Cleaning)
- نقل بعيد (Long Distance)
- لوجستيك (Logistics)
