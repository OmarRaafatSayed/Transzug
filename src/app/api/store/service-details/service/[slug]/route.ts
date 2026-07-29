import { NextRequest, NextResponse } from 'next/server';
import type { ServiceStoreDto } from '@/types/store';

const services: Record<string, ServiceStoreDto> = {
  privatumzug: {
    title: 'Privatumzug',
    description:
      'Wir kümmern uns um Ihren privaten Umzug von A bis Z. Unser erfahrenes Team packt, transportiert und richtet Ihre Möbel wieder ein.',
    shortDescription: 'Professioneller Privatumzug',
    image: ['/images/service-privatumzug.jpg'],
    slug: 'privatumzug',
  },
  firmenumzug: {
    title: 'Firmenumzug',
    description:
      'Büroumzüge mit minimaler Ausfallzeit für Ihr Unternehmen. Wir planen und führen Ihren Firmenumzug professionell durch.',
    shortDescription: 'Effiziente Büroumzüge',
    image: ['/images/service-firmenumzug.jpg'],
    slug: 'firmenumzug',
  },
  seniorenumzug: {
    title: 'Seniorenumzug',
    description:
      'Einfühlsamer Umzugsdienst für Senioren. Wir nehmen uns die Zeit, die Sie brauchen.',
    shortDescription: 'Umzug für Senioren',
    image: ['/images/service-seniorenumzug.jpg'],
    slug: 'seniorenumzug',
  },
  moebellagerung: {
    title: 'Möbellagerung',
    description:
      'Sichere Lagerung Ihrer Möbel in unseren klimatisierten Lagerhäusern für beliebig lange Zeit.',
    shortDescription: 'Möbel einlagern',
    image: ['/images/service-moebellagerung.jpg'],
    slug: 'moebellagerung',
  },
  entruempelung: {
    title: 'Entrümpelung',
    description:
      'Professionelle Entrümpelung und umweltgerechte Entsorgung Ihrer nicht mehr benötigten Gegenstände.',
    shortDescription: 'Entrümpelung',
    image: ['/images/service-entruempelung.jpg'],
    slug: 'entruempelung',
  },
  fernumzug: {
    title: 'Fernumzug',
    description:
      'Deutschlandweite und internationale Umzüge. Wir transportieren Ihr Hab und Gut sicher ans Ziel.',
    shortDescription: 'Fernumzug',
    image: ['/images/service-fernumzug.jpg'],
    slug: 'fernumzug',
  },
  'lkw-logistik': {
    title: 'LKW & Logistik',
    description:
      'Logistiklösungen mit modernem Fuhrpark. Ideal für Gewerbetreibende und Unternehmen.',
    shortDescription: 'Transport & Logistik',
    image: ['/images/service-lkw.jpg'],
    slug: 'lkw-logistik',
  },
};

/**
 * @swagger
 * /store/service-details/service/{slug}:
 *   get:
 *     tags: [service-details]
 *     summary: Get service details by slug
 *     operationId: StoreServiceController_getserviceDetails
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
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
 *         description: Service details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceStoreDto'
 *       404:
 *         description: Service not found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<ServiceStoreDto | { error: string }>> {
  const { slug } = await params;
  const service = services[slug];

  if (!service) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }

  return NextResponse.json(service);
}
