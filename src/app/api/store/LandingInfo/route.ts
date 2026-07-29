import { NextRequest, NextResponse } from 'next/server';
import type { LandingInfoOneLangDto } from '@/types/store';

/**
 * @swagger
 * /store/LandingInfo:
 *   get:
 *     tags: [LandingInfo]
 *     summary: Get company landing info
 *     operationId: StoreCompanyController_findCompany
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
 *         description: Company landing info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LandingInfoOneLangDto'
 */
export async function GET(request: NextRequest): Promise<NextResponse<LandingInfoOneLangDto>> {
  const data: LandingInfoOneLangDto = {
    id: 'tranzug-company-1',
    email: 'info@tranzug.de',
    phone: '+49 123 456 7890',
    city: 'Berlin',
    country: 'Germany',
    street: 'Hauptstraße',
    buildingNumber: '12',
    workingTime: [
      { day: 'Sunday', from: null, to: null },
      { day: 'Monday', from: '08:00', to: '18:00' },
      { day: 'Tuesday', from: '08:00', to: '18:00' },
      { day: 'Wednesday', from: '08:00', to: '18:00' },
      { day: 'Thursday', from: '08:00', to: '18:00' },
      { day: 'Friday', from: '08:00', to: '18:00' },
      { day: 'Saturday', from: '09:00', to: '14:00' },
    ],
    socials: [
      {
        id: 'social-1',
        url: 'https://facebook.com/tranzug',
        name: 'Facebook',
        imageUrl: '/images/social/facebook.svg',
      },
      {
        id: 'social-2',
        url: 'https://instagram.com/tranzug',
        name: 'Instagram',
        imageUrl: '/images/social/instagram.svg',
      },
    ],
    name: 'Tranzug',
    description: 'Professionelle Umzüge in ganz Deutschland – Sicher, zuverlässig, transparent.',
  };

  return NextResponse.json(data);
}
