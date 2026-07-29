import { NextRequest, NextResponse } from 'next/server';
import type { ResetPassDto } from '@/types/store';

/**
 * @swagger
 * /store/auth/forgetpassword:
 *   post:
 *     tags: [Auth]
 *     summary: Send password reset code
 *     operationId: StoreAuthContoller_resetCode
 *     parameters:
 *       - name: Accept-Language
 *         in: header
 *         description: Language (en, de)
 *         required: false
 *         schema:
 *           type: string
 *           default: de
 *           enum: [de, en]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassDto'
 *     responses:
 *       200:
 *         description: Reset code sent to email
 *       404:
 *         description: Email not found
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: ResetPassDto = await request.json();

    if (!body.email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 });
    }

    // In production: send a real email with reset code
    return NextResponse.json({ message: `Reset code sent to ${body.email}` });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
