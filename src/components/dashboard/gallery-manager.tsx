'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PlusIcon, TrashIcon, XIcon, UploadIcon } from 'lucide-react';
import type { GalleryStoreDto } from '@/types/store';

// ── Component ────────────────────────────────────────────────────
export function GalleryManager() {
  const t = useTranslations('dashboard');

  // Categories derived from translation keys so they switch with locale
  const CATEGORIES = [
    t('gallery.all'),
    t('gallery.catPrivate'),
    t('gallery.catOffice'),
    t('gallery.catSenior'),
    t('gallery.catStorage'),
    t('gallery.catCleaning'),
    t('gallery.catLongDistance'),
    t('gallery.catLogistics'),
  ];

  const [images, setImages]               = useState<GalleryStoreDto[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [lightboxImg, setLightboxImg]     = useState<GalleryStoreDto | null>(null);
  const [showAddModal, setShowAddModal]   = useState(false);
  const [saving, setSaving]               = useState(false);

  const [newTitle, setNewTitle]           = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory]     = useState(CATEGORIES[1]);
  const [imagePreview, setImagePreview]   = useState('');
  const [imageFile, setImageFile]         = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Fetch ────────────────────────────────────────────────────
  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/store/gallery');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: GalleryStoreDto[] = await res.json();
      setImages(data);
    } catch (err) {
      setError(t('common.galleryError'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // ── Filtered view ────────────────────────────────────────────
  const allLabel = t('gallery.all');
  const filtered =
    selectedCategory === allLabel
      ? images
      : images.filter((img) => img.description?.startsWith(selectedCategory));

  // ── Delete ───────────────────────────────────────────────────
  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/store/gallery?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }

  // ── File select ──────────────────────────────────────────────
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  // ── Add image ────────────────────────────────────────────────
  async function handleAdd() {
    if (!imagePreview || !newTitle) return;
    setSaving(true);
    try {
      const res = await fetch('/api/store/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imagePreview,
          title: newTitle,
          description: `${newCategory}|${newDescription}`,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const created: GalleryStoreDto = await res.json();
      setImages((prev) => [...prev, created]);
      resetModal();
    } catch (err) {
      console.error('Add failed:', err);
    } finally {
      setSaving(false);
    }
  }

  function resetModal() {
    setNewTitle('');
    setNewDescription('');
    setNewCategory(CATEGORIES[1]);
    setImagePreview('');
    setImageFile(null);
    setShowAddModal(false);
  }

  // ── Render ───────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <p className="text-red-400 text-sm">{error}</p>
        <button
          onClick={fetchImages}
          className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white rounded-lg text-sm transition-colors"
        >
          {t('common.retry')}
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">{t('gallery.title')}</h2>
          <p className="text-gray-400 text-sm">
            {t('gallery.count', { count: images.length })}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-brand-primary hover:bg-brand-hover text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          {t('gallery.addBtn')}
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-brand-primary text-white'
                : 'bg-[#151b28] text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <UploadIcon className="w-12 h-12 mb-3 opacity-30" />
          <p className="text-sm">{t('gallery.empty')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((img) => {
            const descParts = img.description?.split('|') ?? [];
            const category  = descParts.length > 1 ? descParts[0] : '';
            const desc      = descParts.length > 1 ? descParts[1] : img.description;

            return (
              <div
                key={img.id}
                className="group relative bg-[#151b28] rounded-xl overflow-hidden border border-gray-800 hover:border-brand-primary transition-all"
              >
                <div
                  className="aspect-square relative cursor-pointer"
                  onClick={() => setLightboxImg(img)}
                >
                  <Image
                    src={img.image}
                    alt={img.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                </div>

                <div className="p-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-white text-xs font-medium truncate">{img.title}</p>
                    {category && (
                      <span className="text-brand-primary text-[10px]">{category}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="text-gray-600 hover:text-red-500 transition-colors p-1 rounded flex-shrink-0"
                    aria-label={t('gallery.delete')}
                  >
                    <TrashIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-4 end-4 text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors"
            onClick={() => setLightboxImg(null)}
            aria-label={t('gallery.close')}
          >
            <XIcon className="w-5 h-5" />
          </button>
          <div
            className="relative max-w-3xl w-full max-h-[80vh] aspect-video rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImg.image}
              alt={lightboxImg.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 75vw"
            />
          </div>
          <div className="absolute bottom-6 text-center">
            <p className="text-white font-medium">{lightboxImg.title}</p>
            <p className="text-gray-400 text-sm">{lightboxImg.description}</p>
          </div>
        </div>
      )}

      {/* Add Image Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#151b28] border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-lg">{t('gallery.addTitle')}</h3>
              <button
                onClick={resetModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Upload */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('gallery.chooseImage')}</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
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
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">
                        {t('gallery.clickToChoose')}
                      </p>
                      <p className="text-xs text-gray-600">{t('gallery.imageHint')}</p>
                    </div>
                  )}
                </button>
                {imageFile && (
                  <p className="text-xs text-gray-500 mt-1.5">📁 {imageFile.name}</p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('gallery.imageTitle')}</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={t('gallery.imageTitlePlaceholder')}
                  className="w-full bg-[#0d1220] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('gallery.category')}</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#0d1220] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                >
                  {CATEGORIES.filter((c) => c !== allLabel).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  {t('gallery.imageDesc')}{' '}
                  <span className="text-gray-600">{t('gallery.imageDescOptional')}</span>
                </label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder={t('gallery.imageDescPlaceholder')}
                  className="w-full bg-[#0d1220] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAdd}
                disabled={!imagePreview || !newTitle || saving}
                className="flex-1 bg-brand-primary hover:bg-brand-hover disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {saving ? t('gallery.saving') : t('gallery.add')}
              </button>
              <button
                onClick={resetModal}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {t('gallery.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
