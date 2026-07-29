import { NextRequest, NextResponse } from 'next/server';
import type { statsStoreDto } from '@/types/store';

/**
 * @swagger
 * /store/home/stats:
 *   get:
 *     tags: [Home]
 *     summary: Get All Stats for Store
 *     description: Get All Stats for Store
 *     operationId: StoreHomeController_getStats
 *     parameters:
 *       - name: Accept-Language
 *         in: header
 *         description: Language (en, de)
 *         required: false
 *         schema:
 *           type: string
 *           default: de
 *           enum: [de, en]
 *     responses:
 *       200:
 *         description: Stats data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/statsStoreDto'
 */
export async function GET(request: NextRequest): Promise<NextResponse<statsStoreDto[]>> {
  const data: statsStoreDto[] = [
    { id: 'stat-1', image: '/images/stats/rating.svg', title: '4.9 / 5', description: 'Kundenbewertung' },
    { id: 'stat-2', image: '/images/stats/years.svg', title: '10+', description: 'Jahre Erfahrung' },
    { id: 'stat-3', image: '/images/stats/moves.svg', title: '500+', description: 'Erfolgreiche Umzüge' },
    { id: 'stat-4', image: '/images/stats/insurance.svg', title: '100%', description: 'Versichert' },
  ];

  return NextResponse.json(data);
}
