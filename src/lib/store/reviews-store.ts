import type { ReviewDto } from '@/types/store';

export const reviewsStore: ReviewDto[] = [
  { email: 'ahmed@example.com',  rate: 5, username: 'أحمد محمد',    message: 'خدمة ممتازة وفريق عمل محترف. تم نقل جميع الأثاث بأمان تام وفي الوقت المحدد.',           createdAt: '2026-07-20T00:00:00.000Z', imagesUrl: '', addedAt: '2026-07-20T00:00:00.000Z' },
  { email: 'sara@example.com',   rate: 5, username: 'سارة خالد',    message: 'تجربة رائعة! الفريق كان لطيفاً ومنظماً. سأنصح بهم بالتأكيد لكل من يحتاج نقل.',          createdAt: '2026-07-15T00:00:00.000Z', imagesUrl: '', addedAt: '2026-07-15T00:00:00.000Z' },
  { email: 'mohammed@example.com', rate: 4, username: 'محمد علي',   message: 'عمل جيد بشكل عام، وصلوا في الموعد المحدد وكانوا حريصين على الأثاث.',                   createdAt: '2026-07-10T00:00:00.000Z', imagesUrl: '', addedAt: '2026-07-10T00:00:00.000Z' },
  { email: 'fatima@example.com', rate: 5, username: 'فاطمة إبراهيم', message: 'أفضل شركة نقل تعاملت معها. الأسعار معقولة والخدمة احترافية.',                          createdAt: '2026-07-05T00:00:00.000Z', imagesUrl: '', addedAt: '2026-07-05T00:00:00.000Z' },
  { email: 'omar@example.com',   rate: 3, username: 'عمر حسن',      message: 'الخدمة كانت مقبولة لكن التأخير في الوصول كان مشكلة صغيرة.',                            createdAt: '2026-06-28T00:00:00.000Z', imagesUrl: '', addedAt: '2026-06-28T00:00:00.000Z' },
  { email: 'layla@example.com',  rate: 5, username: 'ليلى عبدالله', message: 'خدمة ممتازة لنقل والدتي. الفريق كان صبوراً ومحترماً جداً.',                             createdAt: '2026-06-20T00:00:00.000Z', imagesUrl: '', addedAt: '2026-06-20T00:00:00.000Z' },
];
