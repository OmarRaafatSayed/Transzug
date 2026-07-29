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
  // locale-aware: read Accept-Language header (sent by the component)
  const lang = request.headers.get('Accept-Language') ?? 'de';
  const isAr = lang.startsWith('ar');

  const data: ServiceStoreDto[] = [
    {
      title:            isAr ? 'نقل خاص'                    : 'Privatumzug',
      description:      isAr ? 'نقل شقة كامل بما في ذلك التعبئة والنقل والتركيب.' : 'Wir kümmern uns um Ihren privaten Umzug von A bis Z.',
      shortDescription: isAr ? 'نقل خاص احترافي'            : 'Professioneller Privatumzug',
      image: ['/images/service-privatumzug.jpg'],
      slug: 'privatumzug',
    },
    {
      title:            isAr ? 'نقل الشركات والمكاتب'        : 'Firmenumzug',
      description:      isAr ? 'تغيير الموقع بسلاسة مع الحد الأدنى من انقطاع العمل.' : 'Büroumzüge mit minimaler Ausfallzeit für Ihr Unternehmen.',
      shortDescription: isAr ? 'نقل مكتبي فعّال'             : 'Effiziente Büroumzüge',
      image: ['/images/service-firmenumzug.jpg'],
      slug: 'firmenumzug',
    },
    {
      title:            isAr ? 'نقل كبار السن'               : 'Seniorenumzug',
      description:      isAr ? 'رعاية متعاطفة وخدمة شاملة لبداية جديدة مريحة.'    : 'Einfühlsamer Umzugsdienst für Senioren.',
      shortDescription: isAr ? 'نقل مخصص لكبار السن'         : 'Umzug für Senioren',
      image: ['/images/service-seniorenumzug.jpg'],
      slug: 'seniorenumzug',
    },
    {
      title:            isAr ? 'تخزين الأثاث'                : 'Möbellagerung',
      description:      isAr ? 'تخزين آمن ومكيف - مرن لأيام أو أسابيع أو أشهر.'  : 'Sichere Lagerung Ihrer Möbel in unseren Lagerhäusern.',
      shortDescription: isAr ? 'تخزين آمن للأثاث'            : 'Möbel einlagern',
      image: ['/images/service-moebellagerung.jpg'],
      slug: 'moebellagerung',
    },
    {
      title:            isAr ? 'تخليص المنازل'               : 'Entrümpelung',
      description:      isAr ? 'تصفية شقة احترافية بما في ذلك التخلص - تسليم نظيف.' : 'Professionelle Entrümpelung und Entsorgung.',
      shortDescription: isAr ? 'إخلاء احترافي'               : 'Entrümpelung',
      image: ['/images/service-entruempelung.jpg'],
      slug: 'entruempelung',
    },
    {
      title:            isAr ? 'نقل لمسافات طويلة'           : 'Fernumzug',
      description:      isAr ? 'عمليات نقل موثوقة لمسافات طويلة في جميع أنحاء ألمانيا.' : 'Deutschlandweite und internationale Umzüge.',
      shortDescription: isAr ? 'نقل بعيد داخل ألمانيا'       : 'Fernumzug',
      image: ['/images/service-fernumzug.jpg'],
      slug: 'fernumzug',
    },
    {
      title:            isAr ? 'نقل الشاحنات والخدمات اللوجستية' : 'LKW & Logistik',
      description:      isAr ? 'أسطول شاحنات خاص وعقود إطارية ثابتة لشركات الخدمات اللوجستية.' : 'Logistiklösungen mit modernem Fuhrpark.',
      shortDescription: isAr ? 'نقل وخدمات لوجستية'           : 'Transport & Logistik',
      image: ['/images/service-lkw.jpg'],
      slug: 'lkw-logistik',
    },
  ];

  return NextResponse.json(data);
}
