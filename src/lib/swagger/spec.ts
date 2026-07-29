/**
 * Official OpenAPI spec matching https://api-tranzug.it-trendco.de/swagger/store
 * All path names, field names, and data types mirror the official API exactly.
 */
export function getApiSpec() {
  return {
    openapi: '3.0.0',
    info: {
      title: 'tranzug Maker Page Store APIs',
      description:
        'APIs related to the Store section — local implementation mirroring the official spec at https://api-tranzug.it-trendco.de/swagger/store',
      version: '1.0',
      contact: {},
    },
    servers: [{ url: '/api', description: 'Local Next.js server' }],
    tags: [
      { name: 'LandingInfo' },
      { name: 'Home' },
      { name: 'Gallery' },
      { name: 'About' },
      { name: 'Review' },
      { name: 'service-details' },
      { name: 'Auth' },
      { name: 'Contact Us & Additional Service Requests' },
    ],
    paths: {
      '/store/LandingInfo': {
        get: {
          tags: ['LandingInfo'],
          summary: 'Get company landing info',
          operationId: 'StoreCompanyController_findCompany',
          parameters: [
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          responses: {
            200: {
              description: 'Company landing info',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/LandingInfoOneLangDto' },
                },
              },
            },
          },
        },
      },
      '/store/home/hero': {
        get: {
          tags: ['Home'],
          summary: 'Get Hero for Store',
          description: 'Get Hero for Store',
          operationId: 'StoreHomeController_gethero',
          parameters: [
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          responses: {
            200: {
              description: 'Hero data',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/HeroStoreDto' },
                },
              },
            },
          },
        },
      },
      '/store/home/stats': {
        get: {
          tags: ['Home'],
          summary: 'Get All Stats for Store',
          description: 'Get All Stats for Store',
          operationId: 'StoreHomeController_getStats',
          parameters: [
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          responses: {
            200: {
              description: 'Stats data',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/statsStoreDto' },
                },
              },
            },
          },
        },
      },
      '/store/home/Services': {
        get: {
          tags: ['Home'],
          summary: 'Get Services for Store',
          description: 'Get Services for Store',
          operationId: 'StoreHomeController_getService',
          parameters: [
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          responses: {
            200: {
              description: 'Array of services',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/ServiceStoreDto' },
                  },
                },
              },
            },
          },
        },
      },
      '/store/home/before-after': {
        get: {
          tags: ['Home'],
          summary: 'Get before-afters for Store',
          description: 'Get before-afters for Store',
          operationId: 'StoreHomeController_getBeforeAfter',
          parameters: [
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          responses: {
            200: {
              description: 'Array of before/after items',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/BeforeAfterStoreDto' },
                  },
                },
              },
            },
          },
        },
      },
      '/store/home/steps': {
        get: {
          tags: ['Home'],
          summary: 'Get All Steps',
          description: 'Get All Steps',
          operationId: 'StoreHomeController_get',
          parameters: [
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          responses: {
            200: {
              description: 'Array of steps',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/StepStoreDto' },
                  },
                },
              },
            },
          },
        },
      },
      '/store/home/about': {
        get: {
          tags: ['Home'],
          summary: 'Get about sections for Home',
          description:
            'Get about for HOME — show them with section type [about, why, featured, facts, getapp]',
          operationId: 'StoreHomeController_getabout',
          parameters: [
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          responses: {
            200: {
              description: 'Array of about sections',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/AboutOneLangDto' },
                  },
                },
              },
            },
          },
        },
      },
      '/store/home/WhyUs': {
        get: {
          tags: ['Home'],
          summary: 'Get Why Us for Home',
          description: 'Get why us for HOME',
          operationId: 'StoreHomeController_getwhyUs',
          parameters: [
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          responses: {
            200: {
              description: 'Array of why-us items',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/WhyUsOneLangDto' },
                  },
                },
              },
            },
          },
        },
      },
      '/store/home/top-review': {
        get: {
          tags: ['Home'],
          summary: 'Get Top 10 Reviews',
          description: 'Get Top 10 Review',
          operationId: 'StoreHomeController_getTopRates',
          parameters: [],
          responses: {
            200: {
              description: 'Top review data',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ReviewDto' },
                },
              },
            },
          },
        },
      },
      '/store/gallery': {
        get: {
          tags: ['Gallery'],
          summary: 'Get all gallery images',
          operationId: 'StoreGalleryController_get',
          parameters: [
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          responses: {
            200: {
              description: 'Array of gallery items',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/GalleryStoreDto' },
                  },
                },
              },
            },
          },
        },
      },
      '/store/about': {
        get: {
          tags: ['About'],
          summary: 'Get about sections for About Page',
          description:
            'Get about for About Page — show them with section type [about, why, featured] and can skip [getapp, facts]',
          operationId: 'StoreAboutController_get',
          parameters: [
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          responses: {
            200: {
              description: 'Array of about sections',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/AboutOneLangDto' },
                  },
                },
              },
            },
          },
        },
      },
      '/store/Review': {
        post: {
          tags: ['Review'],
          summary: 'Submit a new review',
          operationId: 'StoreReviewController_sendReview',
          parameters: [
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: { $ref: '#/components/schemas/CreateReviewDto' },
              },
            },
          },
          responses: {
            200: { description: 'Review submitted successfully' },
            400: { description: 'Validation error' },
          },
        },
      },
      '/store/Review/all': {
        get: {
          tags: ['Review'],
          summary: 'Get all reviews (paginated)',
          operationId: 'StoreReviewController_getAll',
          parameters: [
            {
              name: 'pageIndex',
              required: false,
              in: 'query',
              schema: { nullable: true, example: 1, type: 'number' },
            },
            {
              name: 'pageSize',
              required: false,
              in: 'query',
              schema: { nullable: true, example: 10, type: 'number' },
            },
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          responses: {
            200: {
              description: 'Paginated list of reviews',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/ReviewDto' },
                  },
                },
              },
            },
          },
        },
      },
      '/store/Review/medium': {
        get: {
          tags: ['Review'],
          summary: 'Get average review rating',
          operationId: 'StoreReviewController_getMedium',
          parameters: [
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          responses: {
            200: {
              description: 'Average rating as a number',
              content: {
                'application/json': {
                  schema: { type: 'number' },
                },
              },
            },
          },
        },
      },
      '/store/service-details/service/{slug}': {
        get: {
          tags: ['service-details'],
          summary: 'Get service details by slug',
          operationId: 'StoreServiceController_getserviceDetails',
          parameters: [
            {
              name: 'slug',
              required: true,
              in: 'path',
              schema: { type: 'string' },
            },
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          responses: {
            200: {
              description: 'Service details',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ServiceStoreDto' },
                },
              },
            },
            404: { description: 'Service not found' },
          },
        },
      },
      '/store/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'User login',
          operationId: 'StoreAuthContoller_signIn',
          parameters: [],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SignInDto' },
              },
            },
          },
          responses: {
            200: {
              description: 'JWT token',
              content: {
                'application/json': {
                  schema: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                },
              },
            },
            401: { description: 'Invalid credentials' },
          },
        },
      },
      '/store/auth/forgetpassword': {
        post: {
          tags: ['Auth'],
          summary: 'Send password reset code',
          operationId: 'StoreAuthContoller_resetCode',
          parameters: [
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ResetPassDto' },
              },
            },
          },
          responses: {
            200: { description: 'Reset code sent to email' },
            404: { description: 'Email not found' },
          },
        },
      },
      '/store/auth/resetpassword': {
        post: {
          tags: ['Auth'],
          summary: 'Verify reset code and set new password',
          operationId: 'StoreAuthContoller_checkResetCode',
          parameters: [
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CheckResetCodeDto' },
              },
            },
          },
          responses: {
            200: { description: 'Password reset successfully' },
            400: { description: 'Invalid or expired code' },
          },
        },
      },
      '/store/contactus': {
        post: {
          tags: ['Contact Us & Additional Service Requests'],
          summary: 'Send a contact/support message',
          operationId: 'StoreContactUsController_sendSupportMessage',
          parameters: [
            {
              name: 'Accept-Language',
              in: 'header',
              description: 'Language (en, de)',
              required: false,
              schema: { type: 'string', default: 'de', enum: ['de', 'en'] },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateSupportMessageDto' },
              },
            },
          },
          responses: {
            200: { description: 'Message sent successfully' },
            400: { description: 'Validation error' },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearer: {
          scheme: 'bearer',
          bearerFormat: 'JWT',
          type: 'http',
        },
      },
      schemas: {
        WorkingTime: {
          type: 'object',
          properties: {
            day: { type: 'string', example: 'Sunday' },
            from: { type: 'object', example: '10:00' },
            to: { type: 'object', example: '12:00' },
          },
          required: ['day', 'from', 'to'],
        },
        CompanySocialDto: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'string' },
            url: { type: 'string', example: 'string' },
            name: { type: 'string', example: 'string' },
            imageUrl: { type: 'string', example: 'string' },
          },
          required: ['id', 'url', 'name', 'imageUrl'],
        },
        LandingInfoOneLangDto: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'string' },
            email: { type: 'string', example: 'string' },
            phone: { type: 'string', example: 'string' },
            city: { type: 'string', example: 'string' },
            country: { type: 'string', example: 'string' },
            street: { type: 'string', example: 'string' },
            buildingNumber: { type: 'string', example: 'string' },
            workingTime: {
              type: 'array',
              items: { $ref: '#/components/schemas/WorkingTime' },
            },
            socials: {
              type: 'array',
              items: { $ref: '#/components/schemas/CompanySocialDto' },
            },
            name: { type: 'string', example: 'string' },
            description: { type: 'string', example: 'string' },
          },
          required: [
            'id', 'email', 'phone', 'city', 'country', 'street',
            'buildingNumber', 'workingTime', 'socials', 'name', 'description',
          ],
        },
        HeroStoreDto: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'string' },
            image: { type: 'object', example: 'string' },
            active: { type: 'boolean', example: true },
            title: { type: 'string', example: 'string' },
            description: { type: 'string', example: 'string' },
          },
          required: ['id', 'image', 'active', 'title', 'description'],
        },
        statsStoreDto: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'string' },
            image: { type: 'string', example: 'string' },
            title: { type: 'string', example: 'string' },
            description: { type: 'string', example: 'string' },
          },
          required: ['id', 'image', 'title', 'description'],
        },
        ServiceStoreDto: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'string' },
            description: { type: 'string', example: 'string' },
            shortDescription: { type: 'string', example: 'string' },
            image: {
              type: 'array',
              items: { type: 'string' },
              example: 'string',
            },
            slug: { type: 'string', example: 'string' },
          },
          required: ['title', 'description', 'shortDescription', 'image'],
        },
        BeforeAfterStoreDto: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'string' },
            imageBefore: { type: 'string' },
            imageAfter: { type: 'string' },
            createdAt: { format: 'date-time', type: 'string', example: 'string' },
            title: { type: 'string', example: 'string' },
            description: { type: 'string', example: 'string' },
          },
          required: ['id', 'imageBefore', 'imageAfter', 'createdAt', 'title', 'description'],
        },
        StepStoreDto: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'string' },
            file: { type: 'string', example: 'string' },
            order: { type: 'number', example: 0 },
            title: { type: 'string', example: 'string' },
            description: { type: 'string', example: 'string' },
          },
          required: ['id', 'file', 'order', 'title', 'description'],
        },
        AboutContentOneLangDto: {
          type: 'object',
          properties: {
            subtitle: { type: 'string' },
            subdescription: { type: 'string' },
          },
          required: ['subtitle', 'subdescription'],
        },
        AboutOneLangDto: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '6d17c1c3-4c58-4df7-a43a-90cbf25f7b50' },
            createdAt: { type: 'string', example: '2025-04-29T15:26:03.157Z' },
            updatedAt: { type: 'string', example: '2025-04-29T15:26:03.157Z' },
            title: { type: 'string' },
            secondtitle: { type: 'string' },
            description: { type: 'string' },
            contents: {
              type: 'array',
              items: { $ref: '#/components/schemas/AboutContentOneLangDto' },
            },
          },
          required: ['id', 'createdAt', 'updatedAt', 'title', 'secondtitle', 'description', 'contents'],
        },
        WhyUsContentOneLangDto: {
          type: 'object',
          properties: {
            subtitle: { type: 'string' },
            subdescription: { type: 'string' },
          },
          required: ['subtitle', 'subdescription'],
        },
        WhyUsOneLangDto: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '6d17c1c3-4c58-4df7-a43a-90cbf25f7b50' },
            createdAt: { type: 'string', example: '2025-04-29T15:26:03.157Z' },
            updatedAt: { type: 'string', example: '2025-04-29T15:26:03.157Z' },
            title: { type: 'string' },
            secondtitle: { type: 'string' },
            description: { type: 'string' },
            contents: {
              type: 'array',
              items: { $ref: '#/components/schemas/WhyUsContentOneLangDto' },
            },
          },
          required: ['id', 'createdAt', 'updatedAt', 'title', 'secondtitle', 'description', 'contents'],
        },
        ReviewDto: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            rate: { type: 'number', example: 0 },
            username: { type: 'string' },
            message: { type: 'string' },
            createdAt: { type: 'string' },
            imagesUrl: { type: 'string' },
            addedAt: { type: 'string' },
          },
          required: ['email', 'rate', 'username', 'message', 'createdAt', 'imagesUrl', 'addedAt'],
        },
        GalleryStoreDto: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'string' },
            image: { type: 'string', example: 'string' },
            title: { type: 'string', example: 'string' },
            description: { type: 'string', example: 'string' },
          },
          required: ['id', 'image', 'title', 'description'],
        },
        CreateReviewDto: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            rate: { type: 'number', example: 0 },
            username: { type: 'string' },
            message: { type: 'string' },
            file: { type: 'string', format: 'binary' },
            addedAt: { type: 'string', example: '2026-05-06T12:00:00Z' },
          },
          required: ['rate', 'username', 'message'],
        },
        SignInDto: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'tranzug@admin.de' },
            password: { type: 'string', example: 'admin123' },
          },
          required: ['email', 'password'],
        },
        ResetPassDto: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'customer@sinexxt.de' },
          },
          required: ['email'],
        },
        CheckResetCodeDto: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'customer@sinexxt.de' },
            code: { type: 'string', example: 'string' },
            password: { type: 'string', example: 'string' },
          },
          required: ['email', 'code', 'password'],
        },
        Type: {
          type: 'string',
          enum: ['contacUs', 'additionalService'],
        },
        CreateSupportMessageDto: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'string' },
            type: { $ref: '#/components/schemas/Type' },
            email: { type: 'string', example: 'string' },
            phoneNumber: { type: 'string', example: 'string' },
            subject: { type: 'string', example: 'string' },
            message: { type: 'string', example: 'string' },
            serviceId: { type: 'string', example: 'string' },
          },
          required: ['name', 'type', 'email', 'phoneNumber', 'subject', 'message'],
        },
      },
    },
    externalDocs: {
      description: 'Official Tranzug Swagger Docs',
      url: 'https://api-tranzug.it-trendco.de/swagger/store',
    },
  };
}
