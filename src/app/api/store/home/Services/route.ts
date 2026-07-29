import { NextRequest, NextResponse } from 'next/server';
import type { ServiceStoreDto } from '@/types/store';

/**
 * @swagger
 * /store/home/Services:
 *   get:
 *     tags: [Home]
 *     summary: Get Services for Store
 *     description: Get Services for Store
 *     operationId: StoreHomeController_getService
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
 *         description: Array of services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServiceStoreDto'
 */
export async function GET(request: NextRequest): Promise<NextResponse<ServiceStoreDto[]>> {
  const data: ServiceStoreDto[] = [
    {
      title: 'Privatumzug',
      description: 'Wir kümmern uns um Ihren privaten Umzug von A bis Z.',
      shortDescription: 'Professioneller Privatumzug',
      image: ['/images/service-privatumzug.jpg'],
      slug: 'privatumzug',
    },
    {
      title: 'Firmenumzug',
      description: 'Büroumzüge mit minimaler Ausfallzeit für Ihr Unternehmen.',
      shortDescription: 'Effiziente Büroumzüge',
      image: ['/images/service-firmenumzug.jpg'],
      slug: 'firmenumzug',
    },
    {
      title: 'Seniorenumzug',
      description: 'Einfühlsamer Umzugsdienst für Senioren.',
      shortDescription: 'Umzug für Senioren',
      image: ['/images/service-seniorenumzug.jpg'],
      slug: 'seniorenumzug',
    },
    {
      title: 'Möbellagerung',
      description: 'Sichere Lagerung Ihrer Möbel in unseren Lagerhäusern.',
      shortDescription: 'Möbel einlagern',
      image: ['/images/service-moebellagerung.jpg'],
      slug: 'moebellagerung',
    },
    {
      title: 'Entrümpelung',
      description: 'Professionelle Entrümpelung und Entsorgung.',
      shortDescription: 'Entrümpelung',
      image: ['/images/service-entruempelung.jpg'],
      slug: 'entruempelung',
    },
    {
      title: 'Fernumzug',
      description: 'Deutschlandweite und internationale Umzüge.',
      shortDescription: 'Fernumzug',
      image: ['/images/service-fernumzug.jpg'],
      slug: 'fernumzug',
    },
    {
      title: 'LKW & Logistik',
      description: 'Logistiklösungen mit modernem Fuhrpark.',
      shortDescription: 'Transport & Logistik',
      image: ['/images/service-lkw.jpg'],
      slug: 'lkw-logistik',
    },
  ];

  return NextResponse.json(data);
}
