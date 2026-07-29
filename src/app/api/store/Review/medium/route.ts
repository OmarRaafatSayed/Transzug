import { NextRequest, NextResponse } from 'next/server';

const reviewRates = [5, 5, 4, 5, 3, 5];

/**
 * @swagger
 * /store/Review/medium:
 *   get:
 *     tags: [Review]
 *     summary: Get average review rating
 *     operationId: StoreReviewController_getMedium
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
 *         description: Average rating as a number
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 */
export async function GET(request: NextRequest): Promise<NextResponse<number>> {
  const average =
    reviewRates.reduce((sum, rate) => sum + rate, 0) / reviewRates.length;
  return NextResponse.json(Math.round(average * 10) / 10);
}
