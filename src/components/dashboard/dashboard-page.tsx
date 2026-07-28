'use client';

import { useState } from 'react';
import { GalleryTab } from './gallery-tab';
import { ReviewsTab } from './reviews-tab';
import { HeroTab } from './hero-tab';
import { LanguageSwitcherDashboard } from './language-switcher-dashboard';
import { ImageIcon, StarIcon, MenuIcon, XIcon, LayoutIcon } from 'lucide-react';

type Tab = 'hero' | 'gallery' | 'reviews';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'hero',
    label: 'Hero & Sections',
    icon: <LayoutIcon className="w-5 h-5" />,
  },
  {
    id: 'gallery',
    label: 'الغاليري',
    icon: <ImageIcon className="w-5 h-5" />,
  },
  {
    id: 'reviews',
    label: 'التقييمات',
    icon: <StarIcon className="w-5 h-5" />,
  },
];

function Sidebar({
  activeTab,
  onTabChange,
  onClose,
}: {
  activeTab: Tab;
  onTabChange: (t: Tab) => void;
  onClose?: () => void;
}) {
  return (
    <aside className="flex flex-col h-full w-64 bg-[#0d1220] border-r border-gray-800">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30 flex-shrink-0">
            <span className="text-white font-extrabold text-lg tracking-tight">T</span>
          </div>
          <div>
            <p className="text-white font-bold text-base leading-none">Transzug</p>
            <p className="text-gray-500 text-[11px] mt-0.5">Dashboard</p>
          </div>
        </div>
        {/* Close button — mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white transition-colors p-1"
            aria-label="إغلاق القائمة"
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-widest px-3 mb-3">
          القائمة
        </p>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              onTabChange(tab.id);
              onClose?.();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-orange-600/15 text-orange-500 border border-orange-600/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <span className="mr-auto w-1.5 h-1.5 rounded-full bg-orange-500" />
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-800">
        <div className="min-w-0">
          <p className="text-white text-xs font-medium truncate">المسؤول</p>
          <p className="text-gray-500 text-[11px] truncate">admin@transzug.de</p>
        </div>
      </div>
    </aside>
  );
}

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0f1a] overflow-hidden" dir="rtl">

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
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          {/* Drawer slides from right (RTL) */}
          <div
            className="absolute right-0 top-0 h-full"
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
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-gray-800"
              aria-label="فتح القائمة"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-white font-bold text-base sm:text-lg leading-none">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h1>
              <p className="text-gray-500 text-xs mt-0.5 hidden sm:block">
                {activeTab === 'hero' 
                  ? 'تحكم في Hero والصفحة الرئيسية'
                  : activeTab === 'gallery' 
                  ? 'إدارة صور الموقع' 
                  : 'إدارة تقييمات العملاء'}
              </p>
            </div>
          </div>

          {/* Language Switcher */}
          <LanguageSwitcherDashboard />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          {activeTab === 'hero' && <HeroTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'reviews' && <ReviewsTab />}
        </main>
      </div>
    </div>
  );
}
