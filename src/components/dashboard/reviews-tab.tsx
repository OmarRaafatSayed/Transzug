'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { PlusIcon, TrashIcon, StarIcon, XIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
import { reviewsApi } from '@/lib/api/dashboard-api';
import type { Review } from '@/lib/api/types';

function StarRating({
  rating,
  onChange,
  ariaLabel,
}: {
  rating: number;
  onChange?: (v: number) => void;
  ariaLabel: (star: number) => string;
}) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          className={`transition-colors ${onChange ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
          disabled={!onChange}
          aria-label={ariaLabel(star)}
        >
          <StarIcon
            className={`w-4 h-4 ${star <= rating ? 'text-brand-primary fill-brand-primary' : 'text-gray-600'}`}
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewsTab() {
  const t = useTranslations('dashboard');

  const [reviews, setReviews]       = useState<Review[]>([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState<'all' | 'published' | 'pending'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReview, setNewReview]   = useState({
    name: '', rating: 5, text: '', service: '',
  });

  useEffect(() => { loadReviews(); }, []);

  async function loadReviews() {
    setLoading(true);
    const response = await reviewsApi.getAll();
    if (response.success && response.data) {
      setReviews(response.data);
    }
    setLoading(false);
  }

  const filtered = filter === 'all' ? reviews : reviews.filter((r) => r.status === filter);
  const published = reviews.filter((r) => r.status === 'published').length;
  const pending   = reviews.filter((r) => r.status === 'pending').length;
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  async function deleteReview(id: number) {
    await reviewsApi.delete(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  async function toggleStatus(id: number) {
    const review = reviews.find((r) => r.id === id);
    if (!review) return;
    const newStatus = review.status === 'published' ? 'pending' : 'published';
    await reviewsApi.update(id, { status: newStatus });
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  }

  async function addReview() {
    if (!newReview.name || !newReview.text) return;
    const response = await reviewsApi.create({
      ...newReview,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    });
    if (response.success && response.data) {
      setReviews((prev) => [response.data!, ...prev]);
    }
    setNewReview({ name: '', rating: 5, text: '', service: '' });
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
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#151b28] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">{t('reviews.total')}</p>
          <p className="text-2xl font-bold text-white">{reviews.length}</p>
        </div>
        <div className="bg-[#151b28] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">{t('reviews.avgRating')}</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-white">{avgRating}</p>
            <StarIcon className="w-5 h-5 text-brand-primary fill-brand-primary" />
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-[#151b28] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-2">{t('reviews.status')}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
              <span className="text-white text-sm font-medium">
                {published} {t('reviews.published')}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <ClockIcon className="w-4 h-4 text-yellow-500" />
              <span className="text-white text-sm font-medium">
                {pending} {t('reviews.pending')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div className="flex gap-1 bg-[#0d1220] p-1 rounded-lg border border-gray-800">
          {(['all', 'published', 'pending'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                filter === f ? 'bg-brand-primary text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {f === 'all'
                ? t('reviews.all')
                : f === 'published'
                ? t('reviews.published')
                : t('reviews.pending')}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-brand-primary hover:bg-brand-hover text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          {t('reviews.addBtn')}
        </button>
      </div>

      {/* Reviews List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <StarIcon className="w-12 h-12 mb-3 opacity-20" />
          <p className="text-sm">{t('reviews.empty')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((review) => (
            <div
              key={review.id}
              className="bg-[#151b28] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center flex-shrink-0 border border-brand-light">
                    <span className="text-brand-primary font-bold text-sm">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-white font-semibold text-sm">{review.name}</span>
                      <span className="text-[10px] text-gray-500 bg-[#0d1220] px-2 py-0.5 rounded-full border border-gray-700">
                        {review.service}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          review.status === 'published'
                            ? 'text-green-400 bg-green-500/10 border border-green-500/20'
                            : 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20'
                        }`}
                      >
                        {review.status === 'published' ? t('reviews.published') : t('reviews.pending')}
                      </span>
                    </div>
                    <StarRating
                      rating={review.rating}
                      ariaLabel={(star) => t('reviews.stars', { count: star })}
                    />
                    <p className="text-gray-300 text-sm mt-2 leading-relaxed">{review.text}</p>
                    <p className="text-gray-600 text-xs mt-2">{review.date}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => toggleStatus(review.id)}
                    title={review.status === 'published' ? t('reviews.unpublish') : t('reviews.publish')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      review.status === 'published'
                        ? 'text-green-500 hover:bg-green-500/10'
                        : 'text-yellow-500 hover:bg-yellow-500/10'
                    }`}
                  >
                    {review.status === 'published' ? (
                      <CheckCircleIcon className="w-4 h-4" />
                    ) : (
                      <ClockIcon className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="p-1.5 rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    aria-label={t('reviews.delete')}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#151b28] border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-lg">{t('reviews.addTitle')}</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('reviews.customerName')}</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder={t('reviews.namePlaceholder')}
                  className="w-full bg-[#0d1220] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('reviews.rating')}</label>
                <StarRating
                  rating={newReview.rating}
                  onChange={(v) => setNewReview({ ...newReview, rating: v })}
                  ariaLabel={(star) => t('reviews.stars', { count: star })}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('reviews.message')}</label>
                <textarea
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  placeholder={t('reviews.messagePlaceholder')}
                  rows={3}
                  className="w-full bg-[#0d1220] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={addReview}
                className="flex-1 bg-brand-primary hover:bg-brand-hover text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {t('reviews.add')}
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {t('reviews.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
