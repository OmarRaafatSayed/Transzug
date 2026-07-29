import { NextRequest, NextResponse } from 'next/server';
import type { ReviewDto } from '@/types/store';

/**
 * @swagger
 * /store/home/top-review:
 *   get:
 *     tags: [Home]
 *     summary: Get Top 10 Reviews
 *     operationId: StoreHomeController_getTopRates
 *     responses:
 *       200:
 *         description: Top review data
 */
export async function GET(request: NextRequest): Promise<NextResponse<ReviewDto[]>> {
  // جيب البيانات من الـ Review route الرئيسي عشان يشاركوا نفس الـ in-memory store
  const baseUrl = request.nextUrl.origin;
  const res = await fetch(`${baseUrl}/api/store/Review?pageSize=10`, {
    cache: 'no-store',
  });
  const all: ReviewDto[] = await res.json();

  // أعلى 10 مرتبة بالأحدث
  const top = all
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, 10);

  return NextResponse.json(top);
}
