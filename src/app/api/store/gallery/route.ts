import { NextRequest, NextResponse } from 'next/server';
import type { GalleryStoreDto } from '@/types/store';

// Single source of truth for gallery — stored here
// description format: "categoryKey|optionalDesc"
// categoryKey must be a stable key (not translated) for locale-safe filtering
export const galleryStore: GalleryStoreDto[] = [
  { id: '1',  image: '/images/hero-1.jpg',                 title: 'نقل أثاث',        description: 'private|خدمة نقل أثاث احترافية'       },
  { id: '2',  image: '/images/hero-2.jpg',                 title: 'نقل مكتبي',        description: 'office|نقل المكاتب والشركات'           },
  { id: '3',  image: '/images/hero-3.jpg',                 title: 'خدمات تخزين',      description: 'storage|تخزين آمن للأثاث'             },
  { id: '4',  image: '/images/hero-4.jpg',                 title: 'لوجستيك',          description: 'logistics|خدمات لوجستية متكاملة'      },
  { id: '5',  image: '/images/service-privatumzug.jpg',    title: 'نقل خاص',          description: 'private|نقل المنازل الخاصة'           },
  { id: '6',  image: '/images/service-firmenumzug.jpg',    title: 'نقل مكتبي',        description: 'office|نقل المكاتب'                   },
  { id: '7',  image: '/images/service-seniorenumzug.jpg',  title: 'نقل كبار السن',    description: 'senior|خدمة خاصة لكبار السن'          },
  { id: '8',  image: '/images/service-moebellagerung.jpg', title: 'تخزين الأثاث',     description: 'storage|مستودعات تخزين آمنة'          },
  { id: '9',  image: '/images/service-entruempelung.jpg',  title: 'تنظيف',            description: 'cleaning|خدمات التنظيف والإخلاء'      },
  { id: '10', image: '/images/service-fernumzug.jpg',      title: 'نقل بعيد',         description: 'longDistance|نقل المسافات الطويلة'    },
  { id: '11', image: '/images/service-lkw.jpg',            title: 'شاحنات لوجستيك',   description: 'logistics|أسطول شاحنات حديث'          },
];

/**
 * @swagger
 * /store/gallery:
 *   get:
 *     tags: [Gallery]
 *     summary: Get all gallery images
 *     operationId: StoreGalleryController_get
 *     responses:
 *       200:
 *         description: Array of gallery items
 */
export async function GET() {
  return NextResponse.json([...galleryStore]);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json() as Partial<GalleryStoreDto>;
    if (!body.image || !body.title)
      return NextResponse.json({ error: 'image and title are required' }, { status: 400 });

    const newItem: GalleryStoreDto = {
      id:          String(Date.now()),
      image:       body.image,
      title:       body.title,
      description: body.description ?? '',
    };
    galleryStore.push(newItem);
    return NextResponse.json(newItem, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const id = new URL(request.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

  const idx = galleryStore.findIndex(img => img.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  galleryStore.splice(idx, 1);
  return NextResponse.json({ success: true });
}
