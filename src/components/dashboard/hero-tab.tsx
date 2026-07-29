'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PlusIcon, TrashIcon, XIcon, UploadIcon, EyeIcon, EyeOffIcon, SaveIcon } from 'lucide-react';
import { useDashboard } from '@/lib/context/dashboard-context';
import type { HeroSlide, HeroStats } from '@/lib/api/types';

export function HeroTab() {
  const t = useTranslations('dashboard.hero');
  const { heroStats: contextStats, heroSlides: contextSlides, updateHeroStats, updateHeroSlides } = useDashboard();

  const [slides, setSlides]           = useState<HeroSlide[]>([]);
  const [stats, setStats]             = useState<HeroStats>({ rating: 0, years: 0, moves: 0, insurance: 0 });
  const [loading, setLoading]         = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [imageFile, setImageFile]     = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [newSlideAlt, setNewSlideAlt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSlides(contextSlides);
    setStats(contextStats);
    setLoading(false);
  }, [contextSlides, contextStats]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function addSlide() {
    if (!imagePreview || !newSlideAlt) return;
    const newSlide: HeroSlide = {
      id: Date.now(),
      src: imagePreview,
      alt: newSlideAlt,
      enabled: true,
    };
    const updated = [...slides, newSlide];
    setSlides(updated);
    updateHeroSlides(updated);
    setImageFile(null);
    setImagePreview('');
    setNewSlideAlt('');
    setShowAddModal(false);
  }

  function deleteSlide(id: number) {
    const updated = slides.filter((s) => s.id !== id);
    setSlides(updated);
    updateHeroSlides(updated);
  }

  function toggleSlide(id: number) {
    const updated = slides.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s));
    setSlides(updated);
    updateHeroSlides(updated);
  }

  function saveStats() {
    updateHeroStats(stats);
    const btn = document.querySelector('[data-save-btn]') as HTMLButtonElement;
    if (btn) {
      const originalText = btn.textContent;
      btn.textContent = t('saved');
      setTimeout(() => { btn.textContent = originalText; }, 1500);
    }
  }

  function resetModal() {
    setImageFile(null);
    setImagePreview('');
    setNewSlideAlt('');
    setShowAddModal(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── Hero Slides ── */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-white">{t('slides')}</h2>
            <p className="text-gray-400 text-sm">
              {t('slidesEnabled', {
                enabled: slides.filter((s) => s.enabled).length,
                total:   slides.length,
              })}
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-hover text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            {t('addImage')}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`group relative bg-[#151b28] rounded-xl overflow-hidden border transition-all ${
                slide.enabled ? 'border-gray-800 hover:border-brand-primary' : 'border-gray-700 opacity-60'
              }`}
            >
              <div className="aspect-video relative">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {!slide.enabled && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <EyeOffIcon className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="p-3 flex items-center justify-between">
                <p className="text-white text-xs font-medium truncate flex-1">{slide.alt}</p>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleSlide(slide.id)}
                    className={`p-1.5 rounded transition-colors ${
                      slide.enabled
                        ? 'text-green-500 hover:bg-green-500/10'
                        : 'text-gray-600 hover:bg-gray-700'
                    }`}
                    title={slide.enabled ? t('hide') : t('show')}
                  >
                    {slide.enabled ? <EyeIcon className="w-3.5 h-3.5" /> : <EyeOffIcon className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => deleteSlide(slide.id)}
                    className="p-1.5 rounded text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    title={t('delete')}
                  >
                    <TrashIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="bg-[#151b28] border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">{t('stats')}</h2>
          <button
            onClick={saveStats}
            data-save-btn
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <SaveIcon className="w-4 h-4" />
            {t('save')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t('rating')}</label>
            <input
              type="number" step="0.1" min="0" max="5"
              value={stats.rating}
              onChange={(e) => setStats({ ...stats, rating: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#0d1220] border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t('years')}</label>
            <input
              type="number" min="0"
              value={stats.years}
              onChange={(e) => setStats({ ...stats, years: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#0d1220] border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t('moves')}</label>
            <input
              type="number" min="0"
              value={stats.moves}
              onChange={(e) => setStats({ ...stats, moves: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#0d1220] border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t('insurance')}</label>
            <input
              type="number" min="0" max="100"
              value={stats.insurance}
              onChange={(e) => setStats({ ...stats, insurance: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#0d1220] border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ── Add Slide Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#151b28] border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-lg">{t('addHeroTitle')}</h3>
              <button onClick={resetModal} className="text-gray-400 hover:text-white transition-colors">
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('chooseImage')}</label>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-[#0d1220] border-2 border-dashed border-gray-700 hover:border-brand-primary rounded-lg p-6 text-center transition-colors group"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden">
                      <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <UploadIcon className="w-10 h-10 text-gray-600 group-hover:text-brand-primary transition-colors" />
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">{t('clickToChoose')}</p>
                      <p className="text-xs text-gray-600">{t('imageHint')}</p>
                    </div>
                  )}
                </button>
                {imageFile && <p className="text-xs text-gray-500 mt-2">📁 {imageFile.name}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('imageDesc')}</label>
                <input
                  type="text"
                  value={newSlideAlt}
                  onChange={(e) => setNewSlideAlt(e.target.value)}
                  placeholder={t('imageDescPlaceholder')}
                  className="w-full bg-[#0d1220] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={addSlide}
                disabled={!imagePreview || !newSlideAlt}
                className="flex-1 bg-brand-primary hover:bg-brand-hover disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {t('add')}
              </button>
              <button
                onClick={resetModal}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
