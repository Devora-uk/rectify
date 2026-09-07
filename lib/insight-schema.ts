import { z, ZodError } from 'zod';
import { defaultInsightAuthor } from '@/lib/insight-authors';
import { countReadingMinutes, slugifyInsightTitle } from '@/lib/insight-slug';
import type { InsightInput } from '@/lib/insight-types';

const authorSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  image: z.string().min(1),
  imageAlt: z.string().min(1),
});

const heroSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
});

export const insightInputSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase slug with hyphens only'),
  status: z.enum(['draft', 'published']),
  category: z.string().min(1),
  breadcrumb: z.string().min(1),
  title: z.string().min(1, 'Add a title'),
  titleHighlight: z.string().optional().default(''),
  seoTitle: z.string().optional().default(''),
  dek: z.string().optional().default(''),
  heroQuote: z.string().optional().default(''),
  description: z.string().optional().default(''),
  keywords: z.array(z.string()).default([]),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  readingMinutes: z.number().int().positive().optional(),
  author: authorSchema,
  heroImage: heroSchema,
  capacity: z.array(z.object({
    label: z.string(),
    value: z.string(),
    note: z.string(),
  })).default([]),
  workforce: z.array(z.object({
    role: z.string(),
    share: z.string(),
    fte: z.string(),
  })).default([]),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).default([]),
  sources: z.string().optional().default(''),
  body: z.string().optional().default(''),
});

export function emptyInsight(partial?: Partial<InsightInput>): InsightInput {
  const today = new Date().toISOString().slice(0, 10);
  const title = partial?.title || 'Untitled briefing';
  return {
    slug: partial?.slug || slugifyInsightTitle(title) || 'untitled-briefing',
    status: 'draft',
    category: 'Market Intelligence',
    breadcrumb: 'Insights',
    title,
    titleHighlight: '',
    seoTitle: '',
    dek: '',
    heroQuote: '',
    description: '',
    keywords: [],
    publishedAt: today,
    author: defaultInsightAuthor,
    heroImage: {
      src: '/mission-critical-leaders.webp',
      alt: 'Specialist carrying out precision work on mission-critical systems',
    },
    capacity: [],
    workforce: [],
    faqs: [],
    sources: '',
    body: '## The argument\n\nWrite the briefing here. Use `##` for section headings. Add `{{workforce}}` where a workforce table should appear.\n\n> 50%\n>\n> Optional pull-quote: first line is the figure, next lines are the point, last line can start with Source:\n',
    ...partial,
  };
}

export function parseInsightPayload(payload: unknown): InsightInput {
  const parsed = insightInputSchema.parse(payload);
  if (parsed.status === 'published') {
    if (parsed.title.trim().length < 8) throw new Error('Add a fuller title before publishing.');
    if (!parsed.dek.trim()) throw new Error('Add the short version before publishing.');
    if (!parsed.body.trim()) throw new Error('Add the article body before publishing.');
    if (!(parsed.description || parsed.dek).trim()) throw new Error('Add an SEO description before publishing.');
  }
  return {
    ...parsed,
    body: parsed.body || ' ',
    readingMinutes: parsed.readingMinutes || countReadingMinutes(parsed.body || ' '),
    seoTitle: parsed.seoTitle || parsed.title,
    description: parsed.description || parsed.dek,
    capacity: parsed.capacity.filter((item) => item.label || item.value),
    workforce: parsed.workforce.filter((item) => item.role),
    faqs: parsed.faqs.filter((item) => item.question && item.answer),
    keywords: parsed.keywords.map((item) => item.trim()).filter(Boolean),
  };
}

export function schemaErrorMessage(error: unknown) {
  if (error instanceof ZodError) {
    return error.issues[0]?.message || 'Check the briefing fields and try again.';
  }
  return error instanceof Error ? error.message : 'Could not save the briefing.';
}
