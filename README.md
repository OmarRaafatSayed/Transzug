# Transzug - Professional Moving Company Website

A high-end, fully bilingual (German/Arabic) website for Transzug, a professional moving company operating across Germany. Built with modern web technologies and featuring comprehensive internationalization with RTL support.

## 🌟 Features

### 🌍 Internationalization (i18n)
- **Bilingual Support**: Complete German (DE) and Arabic (AR) translations
- **RTL/LTR Layout**: Automatic layout direction switching
- **Smart Language Switcher**: Seamless language switching while maintaining current page context
- **SEO Optimized**: Language-specific metadata and structured URLs

### 🎨 Design & UI
- **Pixel-Perfect Design**: Professional, modern interface
- **Fully Responsive**: Optimized for all device sizes
- **Animated Components**: Smooth transitions and animated statistics
- **Image Optimization**: Next.js Image component with automatic optimization
- **Interactive Elements**: Before/After slider, carousels, accordions

### 📦 Core Sections
- Hero Section with rotating image carousel
- About Section with company information
- Services Section (7 different services)
- Logistics & Fleet Management
- Team Presentation
- Process Steps
- Customer Testimonials
- FAQ Section
- Contact CTA

## 🚀 Tech Stack

- **Framework**: [Next.js 16.2.1](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: Lucide React
- **Font**: Google Fonts (Geist, Cairo for Arabic)

## 📋 Prerequisites

- Node.js 24.x or higher
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/OmarRaafatSayed/Transzug.git
cd Transzug
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

The application will automatically redirect to `/de` (German) by default.

## 🌐 Available Routes

- `/de` - German version
- `/ar` - Arabic version (RTL layout)
- `/` - Automatically redirects to `/de`

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── [locale]/          # Locale-specific pages
│   │   │   ├── layout.tsx     # RTL/LTR layout handler
│   │   │   └── page.tsx       # Main page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Root redirect
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── header.tsx
│   │   ├── hero-section.tsx
│   │   ├── language-switcher.tsx
│   │   └── ...
│   └── middleware.ts          # i18n routing middleware
├── messages/                  # Translation files
│   ├── de.json               # German translations
│   └── ar.json               # Arabic translations
├── public/
│   └── images/               # Static images
├── i18n.ts                   # i18n configuration
└── next.config.ts            # Next.js configuration
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 🎯 Key Components

### Language Switcher
Allows seamless switching between German and Arabic while maintaining the current page context.

### Hero Section
- Rotating image carousel with 4 hero images
- Animated statistics counters
- Dual CTA buttons
- Fully translated content

### Services Section
7 comprehensive service offerings:
- Private Moving
- Corporate & Office Moving
- Senior Moving
- Furniture Storage
- Property Clearance
- Long-Distance Moving
- Logistics & Fleet Services

### Testimonials
Customer reviews with carousel navigation and smooth transitions.

### FAQ Section
Expandable accordion with frequently asked questions.

## 🌍 Adding New Languages

1. Create a new translation file in `/messages/{locale}.json`
2. Add the locale to `i18n.ts`:
```typescript
export const locales = ['de', 'ar', 'en'] as const;
```
3. Update middleware configuration
4. Add font support if needed in layout

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1440px+)
- Laptop (1024px - 1439px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Color Scheme

- Primary: Orange (#E67E22) - Trust and energy
- Secondary: Dark Gray (#1F2937) - Professionalism
- Background: White/Light Gray
- Text: Dark Gray/Black

## ⚡ Performance

- Server-side rendering (SSR) for optimal SEO
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Minimal bundle size with tree shaking

## 🔒 Security

- Environment variables protected via `.gitignore`
- No sensitive data in client-side code
- Secure headers configuration
- Input validation and sanitization

## 📄 License

This project is proprietary and confidential.

## 👥 Author

**Omar Raafat Sayed**
- GitHub: [@OmarRaafatSayed](https://github.com/OmarRaafatSayed)

## 🤝 Contributing

This is a private project. For any inquiries, please contact the author.

---

Built with ❤️ using Next.js and modern web technologies.
