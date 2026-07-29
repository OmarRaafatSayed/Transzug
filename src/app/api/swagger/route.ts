import { NextResponse } from 'next/server';
import { getApiSpec } from '@/lib/swagger/spec';

/**
 * @swagger
 * /api/swagger:
 *   get:
 *     description: Returns the OpenAPI spec as JSON
 *     tags: [Internal]
 *     responses:
 *       200:
 *         description: OpenAPI specification JSON
 */
export function GET() {
  return NextResponse.json(getApiSpec());
}
