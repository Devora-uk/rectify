export type InsightFaq = {
  question: string;
  answer: string;
};

export type InsightWorkforceRow = {
  role: string;
  share: string;
  fte: string;
};

export type InsightStat = {
  label: string;
  value: string;
  note: string;
};

export type InsightAuthor = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
};

export type InsightHeroImage = {
  src: string;
  alt: string;
};

export type InsightStatus = 'draft' | 'published';

export type InsightArticle = {
  slug: string;
  status: InsightStatus;
  category: string;
  breadcrumb: string;
  title: string;
  titleHighlight: string;
  seoTitle: string;
  dek: string;
  heroQuote: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  author: InsightAuthor;
  heroImage: InsightHeroImage;
  capacity: InsightStat[];
  workforce: InsightWorkforceRow[];
  faqs: InsightFaq[];
  sources: string;
  body: string;
};

export type InsightInput = Omit<InsightArticle, 'readingMinutes' | 'updatedAt'> & {
  readingMinutes?: number;
  updatedAt?: string;
};
