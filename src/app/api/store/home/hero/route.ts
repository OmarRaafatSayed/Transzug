import { NextRequest, NextResponse } from 'next/server';
import type { HeroStoreDto } from '@/types/store';

// Single source of truth — stored here, read by all callers
export const heroStore: HeroStoreDto[] = [
  { id: 'hero-1', image: '/images/hero-1.jpg', active: true, title: 'Professionelle Umzüge',   description: 'Ihr zuverlässiger Partner für Umzüge in ganz Deutschland.'           },
  { id: 'hero-2', image: '/images/hero-2.jpg', active: true, title: 'Sicher & Pünktlich',       description: 'Mit über 10 Jahren Erfahrung bringen wir Ihre Möbel sicher ans Ziel.' },
  { id: 'hero-3', image: '/images/hero-3.jpg', active: true, title: 'Faire Preise',             description: 'Transparente Preise ohne versteckte Kosten.'                         },
  { id: 'hero-4', image: '/images/hero-4.jpg', active: true, title: 'Vollkasko-Versicherung',   description: '100% versicherter Transport Ihrer Wertsachen.'                       },
];

/**
 * @swagger
 * /store/home/hero:
 *   get:
 *     tags: [Home]
 *     summary: Get Hero slides for Store
 *     operationId: StoreHomeController_gethero
 *     responses:
 *       200:
 *         description: Hero data
 */
export async function GET() {
  return NextResponse.json(heroStore.filter((h) => h.active));
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json() as Partial<HeroStoreDto>;
    if (!body.image) return NextResponse.json({ error: 'image is required' }, { status: 400 });

    const newSlide: HeroStoreDto = {
      id:          String(Date.now()),
      image:       body.image,
      active:      body.active ?? true,
      title:       body.title ?? '',
      description: body.description ?? '',
    };
    heroStore.push(newSlide);
    return NextResponse.json(newSlide, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const id = new URL(request.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

  const idx = heroStore.findIndex(h => h.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  heroStore.splice(idx, 1);
  return NextResponse.json({ success: true });
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json() as { id: string; active: boolean };
    const slide = heroStore.find(h => h.id === body.id);
    if (!slide) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    slide.active = body.active;
    return NextResponse.json(slide);
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }
}
