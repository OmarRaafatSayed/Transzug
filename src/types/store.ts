/**
 * TypeScript types mirroring the official Tranzug Store API schemas
 * Source: https://api-tranzug.it-trendco.de/swagger/store
 */

// ── Shared ──────────────────────────────────────────────────────

export type WorkingTime = {
  day: string;        // e.g. "Sunday"
  from: string | null; // e.g. "10:00"
  to: string | null;   // e.g. "12:00"
};

export type CompanySocialDto = {
  id: string;
  url: string;
  name: string;
  imageUrl: string;
};

// ── LandingInfo ─────────────────────────────────────────────────

export type LandingInfoOneLangDto = {
  id: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  street: string;
  buildingNumber: string;
  workingTime: WorkingTime[];
  socials: CompanySocialDto[];
  name: string;
  description: string;
};

// ── Home ────────────────────────────────────────────────────────

export type HeroStoreDto = {
  id: string;
  image: string | object;  // object per official spec
  active: boolean;
  title: string;
  description: string;
};

export type statsStoreDto = {
  id: string;
  image: string;
  title: string;
  description: string;
};

export type ServiceStoreDto = {
  title: string;
  description: string;
  shortDescription: string;
  image: string[];
  slug?: string;
};

export type BeforeAfterStoreDto = {
  id: string;
  imageBefore: string;
  imageAfter: string;
  createdAt: string;  // ISO date-time
  title: string;
  description: string;
};

export type StepStoreDto = {
  id: string;
  file: string;
  order: number;
  title: string;
  description: string;
};

export type AboutContentOneLangDto = {
  subtitle: string;
  subdescription: string;
};

export type AboutOneLangDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  secondtitle: string;
  description: string;
  contents: AboutContentOneLangDto[];
};

export type WhyUsContentOneLangDto = {
  subtitle: string;
  subdescription: string;
};

export type WhyUsOneLangDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  secondtitle: string;
  description: string;
  contents: WhyUsContentOneLangDto[];
};

export type TermsStoreDto = {
  id: string;
  file: string;
  type: string;
  title: string;
  description: string;
};

// ── Gallery ─────────────────────────────────────────────────────

export type GalleryStoreDto = {
  id: string;
  image: string;
  title: string;
  description: string;
};

// ── Review ──────────────────────────────────────────────────────

/** Response DTO for a review */
export type ReviewDto = {
  email: string;
  rate: number;       // numeric rating
  username: string;
  message: string;
  createdAt: string;  // ISO date-time
  imagesUrl: string;
  addedAt: string;    // ISO date-time
};

/** Request DTO to create a review (multipart/form-data) */
export type CreateReviewDto = {
  email?: string;
  rate: number;       // required
  username: string;   // required
  message: string;    // required
  file?: File;        // binary upload, optional
  addedAt?: string;   // ISO date-time, optional
};

// ── Auth ────────────────────────────────────────────────────────

export type SignInDto = {
  email: string;     // official spec has type: number but example is email string
  password: string;
};

export type ResetPassDto = {
  email: string;
};

export type CheckResetCodeDto = {
  email: string;
  code: string;
  password: string;
};

// ── Contact Us ──────────────────────────────────────────────────

export type ContactUsType = 'contacUs' | 'additionalService';

export type CreateSupportMessageDto = {
  name: string;          // required
  type: ContactUsType;   // required — enum
  email: string;         // required
  phoneNumber: string;   // required
  subject: string;       // required
  message: string;       // required
  serviceId?: string;    // optional
};

// ── SEO ─────────────────────────────────────────────────────────

export type SeoTagStoreDto = {
  title: string;
};

export type SeoPageStoreDto = {
  pageName: string;
  title: string;
  description: string;
  tags: SeoTagStoreDto[];
};

// ── Article ─────────────────────────────────────────────────────

export type ArticleStoreDto = {
  id: string;
  image: string;
  slug: string;
  author: string;
  createdAt: string;  // ISO date-time
  title: string;
  description: string;
  shortDescription: string;
  category: string;
};
