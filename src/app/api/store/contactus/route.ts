import { NextRequest, NextResponse } from 'next/server';
import type { CreateSupportMessageDto } from '@/types/store';

/**
 * @swagger
 * /store/contactus:
 *   post:
 *     tags: [Contact Us & Additional Service Requests]
 *     summary: Send a contact/support message
 *     operationId: StoreContactUsController_sendSupportMessage
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
 *             $ref: '#/components/schemas/CreateSupportMessageDto'
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       400:
 *         description: Validation error
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateSupportMessageDto = await request.json();

    // Validate required fields per official schema
    const required: (keyof CreateSupportMessageDto)[] = [
      'name', 'type', 'email', 'phoneNumber', 'subject', 'message',
    ];

    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate type enum
    if (!['contacUs', 'additionalService'].includes(body.type)) {
      return NextResponse.json(
        { error: 'type must be one of: contacUs, additionalService' },
        { status: 400 }
      );
    }

    // In production: save to DB and send email notification
    return NextResponse.json({ message: 'Support message received successfully' });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
