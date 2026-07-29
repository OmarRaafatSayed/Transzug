import { NextRequest, NextResponse } from 'next/server';
import { reviewsStore } from '@/lib/store/reviews-store';
import type { ReviewDto } from '@/types/store';

// GET /api/store/Review/all?pageIndex=1&pageSize=10
export async function GET(request: NextRequest): Promise<NextResponse<ReviewDto[]>> {
  const { searchParams } = new URL(request.url);
  const pageIndex = Math.max(1, parseInt(searchParams.get('pageIndex') ?? '1',  10));
  const pageSize  = Math.max(1, parseInt(searchParams.get('pageSize')  ?? '50', 10));
  const start = (pageIndex - 1) * pageSize;
  return NextResponse.json(reviewsStore.slice(start, start + pageSize));
}

// DELETE /api/store/Review/all?email=x&createdAt=y
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
