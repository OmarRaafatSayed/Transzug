'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { GalleryManager } from '@/components/dashboard/gallery-manager';
import { ReviewsManager } from '@/components/dashboard/reviews-manager';
import { HeroTab } from '@/components/dashboard/hero-tab';
import { LanguageSwitcherDashboard } from '@/components/dashboard/language-switcher-dashboard';
import { ImageIcon, StarIcon, MenuIcon, XIcon, LayoutIcon } from 'lucide-react';

type Tab = 'hero' | 'gallery' | 'reviews';

// ── Sidebar ─────────────────────────────────────────────────────
function Sidebar({
  activeTab,
  onTabChange,
  onClose,
}: {
  activeTab: Tab;
  onTabChange: (t: Tab) => void;
  onClose?: () => void;
}) {
  const t = useTranslations('dashboard.sidebar');

  const tabs: { id: Tab; label: string; Icon: React.ElementType }[] = [
    { id: 'hero',    label: t('hero'),    Icon: LayoutIcon },
    { id: 'gallery', label: t('gallery'), Icon: ImageIcon  },
    { id: 'reviews', label: t('reviews'), Icon: StarIcon   },
  ];

  return (
    <aside className="flex flex-col h-full w-64 bg-[#0d1220] border-e border-gray-800">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-light flex-shrink-0">
            <span className="text-white font-extrabold text-lg tracking-tight">T</span>
          </div>
          <div>
            <p className="text-white font-bold text-base leading-none">Transzug</p>
            <p className="text-gray-500 text-[11px] mt-0.5">Dashboard</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white transition-colors p-1"
            aria-label={t('closeMenu')}
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-widest px-3 mb-3">
          {t('menu')}
        </p>
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => { onTabChange(id); onClose?.(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === id
                ? 'bg-brand-light text-brand-primary border border-brand-light'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {label}
            {activeTab === id && (
              <span className="ms-auto w-1.5 h-1.5 rounded-full bg-brand-primary" />
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-800">
        <div className="min-w-0">
          <p className="text-white text-xs font-medium truncate">{t('admin')}</p>
          <p className="text-gray-500 text-[11px] truncate">admin@transzug.de</p>
        </div>
      </div>
    </aside>
  );
}

// ── Page ────────────────────────────────────────────────────────
export function DashboardPage() {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabLabels: Record<Tab, string> = {
    hero:    t('sidebar.hero'),
    gallery: t('sidebar.gallery'),
    reviews: t('sidebar.reviews'),
  };

  const tabSubLabels: Record<Tab, string> = {
    hero:    t('sidebar.heroSub'),
    gallery: t('sidebar.gallerySub'),
    reviews: t('sidebar.reviewsSub'),
  };

  return (
    <div className="flex h-screen bg-[#0a0f1a] overflow-hidden">

      {/* ── Desktop Sidebar ── */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* ── Mobile Sidebar overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          {/* Drawer slides from the inline-end (right in LTR, left in RTL) */}
          <div
            className={`absolute top-0 h-full ${isRTL ? 'left-0' : 'right-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 h-16 bg-[#0d1220] border-b border-gray-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-gray-800"
              aria-label={t('sidebar.openMenu')}
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-white font-bold text-base sm:text-lg leading-none">
                {tabLabels[activeTab]}
              </h1>
              <p className="text-gray-500 text-xs mt-0.5 hidden sm:block">
                {tabSubLabels[activeTab]}
              </p>
            </div>
          </div>

          <LanguageSwitcherDashboard />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          {activeTab === 'hero'    && <HeroTab />}
          {activeTab === 'gallery' && <GalleryManager />}
          {activeTab === 'reviews' && <ReviewsManager />}
        </main>
      </div>
    </div>
  );
}
