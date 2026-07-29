import { NextRequest, NextResponse } from 'next/server';
import type { SignInDto } from '@/types/store';

/**
 * @swagger
 * /store/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: User login
 *     operationId: StoreAuthContoller_signIn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInDto'
 *     responses:
 *       200:
 *         description: JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: SignInDto = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'email and password are required' },
        { status: 400 }
      );
    }

    // Check against environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'tranzug@admin.de';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (body.email === adminEmail && body.password === adminPassword) {
      // In production: generate a real JWT here
      const mockToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0cmFuenVnLWFkbWluIiwiZW1haWwiOiJ0cmFuenVnQGFkbWluLmRlIiwiaWF0IjoxNjAwMDAwMDAwfQ.mock_signature';
      return NextResponse.json(mockToken);
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
