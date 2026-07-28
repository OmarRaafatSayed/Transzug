# 🎛️ Dashboard Documentation

## Overview

Professional dashboard for managing website content with **real-time synchronization** between admin panel and live website.

---

## 🏗️ Architecture

```
├── src/
│   ├── lib/
│   │   ├── api/                    # API layer (mock → production ready)
│   │   │   ├── types.ts            # TypeScript definitions
│   │   │   ├── dashboard-api.ts    # API implementation
│   │   │   └── __tests__/          # API tests
│   │   └── context/
│   │       └── dashboard-context.tsx  # Global state management
│   └── components/
│       └── dashboard/
│           ├── dashboard-page.tsx   # Main container
│           ├── hero-tab.tsx         # Hero & Stats control ⭐
│           ├── gallery-tab.tsx      # Gallery management
│           ├── reviews-tab.tsx      # Reviews management
│           └── language-switcher-dashboard.tsx
```

---

## 🚀 Quick Start

### 1. Run Development Server
```bash
npm run dev
```

### 2. Access Dashboard
- **Arabic:** http://localhost:3000/ar/dashboard
- **German:** http://localhost:3000/de/dashboard

### 3. Edit Content
- Go to **Hero & Sections** tab
- Change stats (rating, years, moves, insurance)
- Click **حفظ** (Save)

### 4. See Changes Live
- Visit homepage: http://localhost:3000/ar
- Stats are updated instantly! 🎉

---

## 📱 Features

### ✅ Hero & Sections Tab
- **Carousel Management:**
  - Add/delete hero slides
  - Upload images from device
  - Enable/disable slides
  - Preview before adding

- **Live Stats Control:**
  - ⭐ Rating (0-5)
  - 📅 Years of experience
  - 🚚 Number of moves
  - 🛡️ Insurance coverage %

- **Real-time Sync:**
  - Changes saved to `localStorage`
  - Homepage reads from context
  - Instant updates without refresh

### ✅ Gallery Tab
- Grid view with category filters
- 7 service categories
- Image upload from device
- Lightbox preview
- Delete images

### ✅ Reviews Tab
- Stats dashboard (total, avg rating, status)
- Filter by status (all/published/pending)
- Add/edit/delete reviews
- Toggle publish status
- 5-star rating system

### ✅ Responsive Design
- Desktop: Sidebar navigation
- Mobile: Hamburger menu + drawer
- RTL support (Arabic)
- Dark theme throughout

---

## 🧪 Testing

### Run Smoke Tests
```bash
npm run smoke-test
```

Tests verify:
- ✅ All components exist
- ✅ Context provider configured
- ✅ LocalStorage integration
- ✅ Hero section connected
- ✅ Layout wraps app correctly

### Run Full Test Suite
```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

---

## 🔄 How It Works

### Data Flow

```
┌─────────────────┐
│  Dashboard Tab  │
│  (Hero Tab)     │
└────────┬────────┘
         │
         │ updateHeroStats()
         ▼
┌─────────────────────────┐
│  DashboardContext       │
│  - heroStats            │
│  - heroSlides           │
│  - localStorage sync    │
└────────┬────────────────┘
         │
         │ useDashboard()
         ▼
┌─────────────────┐
│  Hero Section   │
│  (Homepage)     │
└─────────────────┘
```

### Key Files

1. **`dashboard-context.tsx`**
   - Global state management
   - LocalStorage persistence
   - Context provider for entire app

2. **`hero-tab.tsx`**
   - Admin interface for editing
   - Saves to context on change
   - Instant feedback

3. **`hero-section.tsx`**
   - Reads from context
   - Animated counters
   - Carousel with enabled slides only

---

## 🎯 Usage Example

### Edit Stats in Dashboard

```typescript
// In Hero Tab
const { updateHeroStats } = useDashboard();

function saveStats() {
  updateHeroStats({
    rating: 4.9,
    years: 15,      // Changed from 10 to 15
    moves: 600,     // Changed from 500 to 600
    insurance: 100,
  });
}
```

### Homepage Automatically Updates

```typescript
// In Hero Section
const { heroStats } = useDashboard();

// Displays: 15 years, 600 moves ✅
<div>{heroStats.years}+ Years</div>
<div>{heroStats.moves}+ Moves</div>
```

---

## 🔒 Data Persistence

### LocalStorage Keys

```javascript
'dashboard-hero-stats'   // Hero statistics
'dashboard-hero-slides'  // Carousel slides
```

### Clear Data
```javascript
// In browser console
localStorage.clear();
location.reload();
```

---

## 🏭 Production Deployment

### Current: In-Memory + LocalStorage
- ✅ Works for demo/prototype
- ✅ No backend required
- ❌ Data not shared between users
- ❌ Cleared on browser clear

### Upgrade to Production

1. **Replace localStorage with API calls:**

```typescript
// dashboard-context.tsx
async function updateHeroStats(stats: HeroStats) {
  // Save to backend
  await fetch('/api/hero/stats', {
    method: 'PUT',
    body: JSON.stringify(stats),
  });
  
  setHeroStats(stats);
}
```

2. **Fetch initial data from API:**

```typescript
useEffect(() => {
  async function loadData() {
    const res = await fetch('/api/hero/stats');
    const data = await res.json();
    setHeroStats(data);
  }
  loadData();
}, []);
```

3. **Add Authentication:**
   - Protect `/dashboard` route
   - Add login page
   - Use NextAuth.js or similar

---

## 🐛 Troubleshooting

### Changes not appearing on homepage?

1. **Check localStorage:**
   ```javascript
   console.log(localStorage.getItem('dashboard-hero-stats'));
   ```

2. **Hard refresh:** `Ctrl + Shift + R`

3. **Verify context is connected:**
   ```typescript
   // In hero-section.tsx
   const { heroStats } = useDashboard();
   console.log('Stats from context:', heroStats);
   ```

### Smoke test failing?

```bash
# Re-run to see detailed errors
npm run smoke-test
```

---

## 📊 Service Categories

All tabs use these 7 categories:
- نقل خاص (Private Moving)
- نقل مكتبي (Office Moving)
- نقل كبار السن (Senior Moving)
- تخزين أثاث (Furniture Storage)
- تنظيف (Cleaning)
- نقل بعيد (Long Distance)
- لوجستيك (Logistics)

---

## 🎨 Color Scheme

- **Background:** `#0a0f1a` (deep navy)
- **Cards:** `#151b28`
- **Borders:** `#374151` (gray-700/800)
- **Primary:** `#ea580c` (orange-600)
- **Text:** White / Gray-300

---

## 📝 License

MIT - Feel free to use and modify!

---

**Need help?** Open an issue or check the smoke tests for diagnostics.
