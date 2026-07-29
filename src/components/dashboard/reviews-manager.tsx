'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { PlusIcon, TrashIcon, StarIcon, XIcon } from 'lucide-react';
import type { ReviewDto } from '@/types/store';

// ── Star Rating ──────────────────────────────────────────────────
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
          disabled={!onChange}
          className={`transition-colors ${onChange ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
          aria-label={ariaLabel(star)}
        >
          <StarIcon
            className={`w-4 h-4 ${
              star <= rating ? 'text-brand-primary fill-brand-primary' : 'text-gray-600'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// ── Component ────────────────────────────────────────────────────
export function ReviewsManager() {
  const t = useTranslations('dashboard');

  const [reviews, setReviews]           = useState<ReviewDto[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [saving, setSaving]             = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [form, setForm] = useState({
    username: '',
    email:    '',
    rate:     5,
    message:  '',
  });

  // ── Fetch ──────────────────────────────────────────────────
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/store/Review?pageIndex=1&pageSize=50');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ReviewDto[] = await res.json();
      setReviews(data);
    } catch (err) {
      setError(t('common.reviewsError'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // ── Stats ──────────────────────────────────────────────────
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rate, 0) / reviews.length).toFixed(1)
    : '0';

  // ── Delete ──────────────────────────────────────────────────
  async function handleDelete(email: string, createdAt: string) {
    try {
      const res = await fetch(
        `/api/store/Review?email=${encodeURIComponent(email)}&createdAt=${encodeURIComponent(createdAt)}`,
        { method: 'DELETE' }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setReviews((prev) =>
        prev.filter((r) => !(r.email === email && r.createdAt === createdAt))
      );
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }

  // ── Add ────────────────────────────────────────────────────
  async function handleAdd() {
    if (!form.username || !form.message) return;
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('username', form.username);
      fd.append('email',    form.email);
      fd.append('rate',     String(form.rate));
      fd.append('message',  form.message);
      fd.append('addedAt',  new Date().toISOString());

      const res = await fetch('/api/store/Review', { method: 'POST', body: fd });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const newReview: ReviewDto = {
        email:     form.email,
        rate:      form.rate,
        username:  form.username,
        message:   form.message,
        createdAt: new Date().toISOString(),
        imagesUrl: '',
        addedAt:   new Date().toISOString(),
      };
      setReviews((prev) => [newReview, ...prev]);
      resetModal();
    } catch (err) {
      console.error('Add failed:', err);
    } finally {
      setSaving(false);
    }
  }

  function resetModal() {
    setForm({ username: '', email: '', rate: 5, message: '' });
    setShowAddModal(false);
  }

  // ── Render ─────────────────────────────────────────────────
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
          onClick={fetchReviews}
          className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white rounded-lg text-sm transition-colors"
        >
          {t('common.retry')}
        </button>
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
          <p className="text-gray-400 text-xs mb-1">{t('reviews.latest')}</p>
          <p className="text-white text-sm font-medium truncate">
            {reviews[0]?.username ?? '—'}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-end mb-5">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-brand-primary hover:bg-brand-hover text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          {t('reviews.addBtn')}
        </button>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <StarIcon className="w-12 h-12 mb-3 opacity-20" />
          <p className="text-sm">{t('reviews.empty')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review, idx) => (
            <div
              key={`${review.email}-${review.createdAt}-${idx}`}
              className="bg-[#151b28] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center flex-shrink-0 border border-brand-light">
                    <span className="text-brand-primary font-bold text-sm">
                      {review.username.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-white font-semibold text-sm">
                        {review.username}
                      </span>
                      {review.email && (
                        <span className="text-[10px] text-gray-500 bg-[#0d1220] px-2 py-0.5 rounded-full border border-gray-700">
                          {review.email}
                        </span>
                      )}
                    </div>
                    <StarRating
                      rating={review.rate}
                      ariaLabel={(star) => t('reviews.stars', { count: star })}
                    />
                    <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                      {review.message}
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                      {new Date(review.addedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(review.email, review.createdAt)}
                  className="p-1.5 rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-colors flex-shrink-0"
                  aria-label={t('reviews.delete')}
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
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
                onClick={resetModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('reviews.customerName')}</label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder={t('reviews.namePlaceholder')}
                  className="w-full bg-[#0d1220] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  {t('reviews.email')}{' '}
                  <span className="text-gray-600">{t('reviews.emailOptional')}</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full bg-[#0d1220] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('reviews.rating')}</label>
                <StarRating
                  rating={form.rate}
                  onChange={(v) => setForm({ ...form, rate: v })}
                  ariaLabel={(star) => t('reviews.stars', { count: star })}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">{t('reviews.message')}</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t('reviews.messagePlaceholder')}
                  rows={3}
                  className="w-full bg-[#0d1220] border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAdd}
                disabled={!form.username || !form.message || saving}
                className="flex-1 bg-brand-primary hover:bg-brand-hover disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {saving ? t('reviews.saving') : t('reviews.add')}
              </button>
              <button
                onClick={resetModal}
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
