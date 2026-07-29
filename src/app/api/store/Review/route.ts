import { NextRequest, NextResponse } from 'next/server';
import type { ReviewDto } from '@/types/store';

// Single source of truth for reviews — stored here
export const reviewsStore: ReviewDto[] = [
  { email: 'ahmed@example.com',    rate: 5, username: 'أحمد محمد',     message: 'خدمة ممتازة وفريق عمل محترف. تم نقل جميع الأثاث بأمان تام وفي الوقت المحدد.',  createdAt: '2026-07-20T00:00:00.000Z', imagesUrl: '', addedAt: '2026-07-20T00:00:00.000Z' },
  { email: 'sara@example.com',     rate: 5, username: 'سارة خالد',     message: 'تجربة رائعة! الفريق كان لطيفاً ومنظماً. سأنصح بهم بالتأكيد لكل من يحتاج نقل.', createdAt: '2026-07-15T00:00:00.000Z', imagesUrl: '', addedAt: '2026-07-15T00:00:00.000Z' },
  { email: 'mohammed@example.com', rate: 4, username: 'محمد علي',      message: 'عمل جيد بشكل عام، وصلوا في الموعد المحدد وكانوا حريصين على الأثاث.',           createdAt: '2026-07-10T00:00:00.000Z', imagesUrl: '', addedAt: '2026-07-10T00:00:00.000Z' },
  { email: 'fatima@example.com',   rate: 5, username: 'فاطمة إبراهيم', message: 'أفضل شركة نقل تعاملت معها. الأسعار معقولة والخدمة احترافية.',                  createdAt: '2026-07-05T00:00:00.000Z', imagesUrl: '', addedAt: '2026-07-05T00:00:00.000Z' },
  { email: 'omar@example.com',     rate: 3, username: 'عمر حسن',       message: 'الخدمة كانت مقبولة لكن التأخير في الوصول كان مشكلة صغيرة.',                   createdAt: '2026-06-28T00:00:00.000Z', imagesUrl: '', addedAt: '2026-06-28T00:00:00.000Z' },
  { email: 'layla@example.com',    rate: 5, username: 'ليلى عبدالله',  message: 'خدمة ممتازة لنقل والدتي. الفريق كان صبوراً ومحترماً جداً.',                    createdAt: '2026-06-20T00:00:00.000Z', imagesUrl: '', addedAt: '2026-06-20T00:00:00.000Z' },
];

// GET /api/store/Review?pageIndex=1&pageSize=50
export async function GET(request: NextRequest): Promise<NextResponse<ReviewDto[]>> {
  const { searchParams } = new URL(request.url);
  const pageIndex = Math.max(1, parseInt(searchParams.get('pageIndex') ?? '1',  10));
  const pageSize  = Math.max(1, parseInt(searchParams.get('pageSize')  ?? '50', 10));
  const start = (pageIndex - 1) * pageSize;
  return NextResponse.json(reviewsStore.slice(start, start + pageSize));
}

/**
 * @swagger
 * /store/Review:
 *   post:
 *     tags: [Review]
 *     summary: Submit a new review
 *     operationId: StoreReviewController_sendReview
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateReviewDto'
 *     responses:
 *       200:
 *         description: Review submitted successfully
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const rate     = Number(formData.get('rate'));
    const username = formData.get('username') as string;
    const message  = formData.get('message')  as string;
    const email    = (formData.get('email')   as string) ?? '';
    const addedAt  = (formData.get('addedAt') as string) ?? new Date().toISOString();

    if (!rate || !username || !message)
      return NextResponse.json({ error: 'rate, username, and message are required' }, { status: 400 });
    if (rate < 1 || rate > 5)
      return NextResponse.json({ error: 'rate must be between 1 and 5' }, { status: 400 });

    const newReview: ReviewDto = {
      email, rate, username, message,
      createdAt: new Date().toISOString(),
      imagesUrl: '', addedAt,
    };
    reviewsStore.unshift(newReview);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }
}

// DELETE /api/store/Review?email=x&createdAt=y
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const email     = searchParams.get('email');
  const createdAt = searchParams.get('createdAt');

  if (!email || !createdAt)
    return NextResponse.json({ error: 'email and createdAt are required' }, { status: 400 });

  const idx = reviewsStore.findIndex(r => r.email === email && r.createdAt === createdAt);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  reviewsStore.splice(idx, 1);
  return NextResponse.json({ success: true });
}
