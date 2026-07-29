import { NextRequest, NextResponse } from 'next/server';
import type { CheckResetCodeDto } from '@/types/store';

/**
 * @swagger
 * /store/auth/resetpassword:
 *   post:
 *     tags: [Auth]
 *     summary: Verify reset code and set new password
 *     operationId: StoreAuthContoller_checkResetCode
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
 *             $ref: '#/components/schemas/CheckResetCodeDto'
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired code
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CheckResetCodeDto = await request.json();

    if (!body.email || !body.code || !body.password) {
      return NextResponse.json(
        { error: 'email, code, and password are required' },
        { status: 400 }
      );
    }

    // In production: verify the code and update the password
    return NextResponse.json({ message: 'Password reset successfully' });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
