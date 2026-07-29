'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PlusIcon, TrashIcon, XIcon, UploadIcon } from 'lucide-react';
import { galleryApi } from '@/lib/api/dashboard-api';
import type { GalleryImage } from '@/lib/api/types';

export function GalleryTab() {
  const t = useTranslations('dashboard');

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

  const [images, setImages]               = useState<GalleryImage[]>([]);
  const [loading, setLoading]             = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [lightboxImg, setLightboxImg]     = useState<GalleryImage | null>(null);
  const [showAddModal, setShowAddModal]   = useState(false);
  const [newImage, setNewImage]           = useState({ src: '', alt: '', category: CATEGORIES[1] });
  const [imageFile, setImageFile]         = useState<File | null>(null);
  const [imagePreview, setImagePreview]   = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    setLoading(true);
    const response = await galleryApi.getAll();
    if (response.success && response.data) {
      setImages(response.data);
    }
    setLoading(false);
  }

  const allLabel = t('gallery.all');
  const filtered =
    selectedCategory === allLabel
      ? images
      : images.filter((img) => img.category === selectedCategory);

  async function deleteImage(id: number) {
    await galleryApi.delete(id);
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function addImage() {
    if (!imagePreview || !newImage.alt) return;
    const response = await galleryApi.create({
      src: imagePreview,
      alt: newImage.alt,
      category: newImage.category,
    });
    if (response.success && response.data) {
      setImages((prev) => [...prev, response.data!]);
    }
    setNewImage({ src: '', alt: '', category: CATEGORIES[1] });
    setImageFile(null);
    setImagePreview('');
    setShowAddModal(false);
  }

  function resetModal() {
    setNewImage({ src: '', alt: '', category: CATEGORIES[1] });
    setImageFile(null);
    setImagePreview('');
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img) => (
            <div
              key={img.id}
              className="group relative bg-[#151b28] rounded-xl overflow-hidden border border-gray-800 hover:border-brand-primary transition-all"
            >
              <div
                className="aspect-square relative cursor-pointer"
                onClick={() => setLightboxImg(img)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              </div>

              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-white text-xs font-medium truncate">{img.alt}</p>
                  <span className="text-brand-primary text-[10px]">{img.category}</span>
                </div>
                <button
                  onClick={() => deleteImage(img.id)}
                  className="text-gray-600 hover:text-red-500 transition-colors p-1 rounded"
                  aria-label={t('gallery.delete')}
                >
                  <TrashIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
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
              src={lightboxImg.src}
              alt={lightboxImg.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 75vw"
            />
          </div>
          <div className="absolute bottom-6 text-center">
            <p className="text-white font-medium">{lightboxImg.alt}</p>
            <p className="text-brand-primary text-sm">{lightboxImg.category}</p>
          </div>
        </div>
      )}

      {/* Add Image Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#151b28] border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-lg">{t('gallery.addTitle')}</h3>
              <button onClick={resetModal} className="text-gray-400 hover:text-white transition-colors">
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('gallery.chooseImage')}</label>
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
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">
                        {t('gallery.clickToChoose')}
                      </p>
                      <p className="text-xs text-gray-600">{t('gallery.imageHint')}</p>
                    </div>
                  )}
                </button>
                {imageFile && <p className="text-xs text-gray-500 mt-2">📁 {imageFile.name}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('gallery.imageTitle')}</label>
                <input
                  type="text"
                  value={newImage.alt}
                  onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                  placeholder={t('gallery.imageTitlePlaceholder')}
                  className="w-full bg-[#0d1220] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('gallery.category')}</label>
                <select
                  value={newImage.category}
                  onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                  className="w-full bg-[#0d1220] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                >
                  {CATEGORIES.filter((c) => c !== allLabel).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={addImage}
                disabled={!imagePreview || !newImage.alt}
                className="flex-1 bg-brand-primary hover:bg-brand-hover disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {t('gallery.add')}
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
