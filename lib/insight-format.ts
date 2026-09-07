import matter from 'gray-matter';
import { countReadingMinutes } from '@/lib/insight-slug';
import type {
  InsightArticle,
  InsightAuthor,
  InsightFaq,
  InsightHeroImage,
  InsightInput,
  InsightStat,
  InsightStatus,
  InsightWorkforceRow,
} from '@/lib/insight-types';

export const INSIGHTS_CONTENT_DIR = 'content/insights';
export const INSIGHTS_IMAGE_DIR = 'public/insights';

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function asStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
  return [] as string[];
}

function asDateString(value: unknown, fallback: string) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }
  return fallback;
}

function asStatus(value: unknown): InsightStatus {
  return value === 'draft' ? 'draft' : 'published';
}

function asAuthor(value: unknown): InsightAuthor {
  const record = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  return {
    name: asString(record.name, 'Isaac Vassell'),
    role: asString(record.role, 'Founder, Rectify International'),
    image: asString(record.image, '/isaac-vassell.webp'),
    imageAlt: asString(record.imageAlt, 'Professional headshot of Isaac Vassell, Founder of Rectify International'),
  };
}

function asHero(value: unknown): InsightHeroImage {
  const record = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  return {
    src: asString(record.src, '/mission-critical-leaders.webp'),
    alt: asString(record.alt, 'Specialist carrying out precision work on mission-critical systems'),
  };
}

function asStats(value: unknown): InsightStat[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const record = item && typeof item === 'object' ? (item as Record<string, unknown>) : {};
    return {
      label: asString(record.label),
      value: asString(record.value),
      note: asString(record.note),
    };
  }).filter((item) => item.label || item.value);
}

function asWorkforce(value: unknown): InsightWorkforceRow[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const record = item && typeof item === 'object' ? (item as Record<string, unknown>) : {};
    return {
      role: asString(record.role),
      share: asString(record.share),
      fte: asString(record.fte),
    };
  }).filter((item) => item.role);
}

function asFaqs(value: unknown): InsightFaq[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const record = item && typeof item === 'object' ? (item as Record<string, unknown>) : {};
    return {
      question: asString(record.question),
      answer: asString(record.answer),
    };
  }).filter((item) => item.question && item.answer);
}

export function insightFilePath(slug: string) {
  return `${INSIGHTS_CONTENT_DIR}/${slug}.md`;
}

export function parseInsightMarkdown(raw: string, fallbackSlug: string): InsightArticle {
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;
  const today = new Date().toISOString().slice(0, 10);
  const body = parsed.content.replace(/^\n+/, '');
  const title = asString(data.title, fallbackSlug);
  const publishedAt = asDateString(data.publishedAt, today);

  return {
    slug: asString(data.slug, fallbackSlug),
    status: asStatus(data.status),
    category: asString(data.category),
    breadcrumb: asString(data.breadcrumb, asString(data.category, 'Insights')),
    title,
    titleHighlight: asString(data.titleHighlight),
    seoTitle: asString(data.seoTitle, title),
    dek: asString(data.dek),
    heroQuote: asString(data.heroQuote),
    description: asString(data.description, asString(data.dek)),
    keywords: asStringArray(data.keywords),
    publishedAt,
    updatedAt: asDateString(data.updatedAt, publishedAt),
    readingMinutes: asNumber(data.readingMinutes, countReadingMinutes(body)),
    author: asAuthor(data.author),
    heroImage: asHero(data.heroImage),
    capacity: asStats(data.capacity),
    workforce: asWorkforce(data.workforce),
    faqs: asFaqs(data.faqs),
    sources: asString(data.sources),
    body,
  };
}

function yamlValue(value: string) {
  if (value === '') return '""';
  if (/[:#&*!|>%@`'"{}[\],\n]/.test(value) || value.startsWith('-') || value.startsWith('?')) {
    return JSON.stringify(value);
  }
  return value;
}

function dumpAuthor(author: InsightAuthor) {
  return [
    'author:',
    `  name: ${yamlValue(author.name)}`,
    `  role: ${yamlValue(author.role)}`,
    `  image: ${yamlValue(author.image)}`,
    `  imageAlt: ${yamlValue(author.imageAlt)}`,
  ].join('\n');
}

function dumpHero(hero: InsightHeroImage) {
  return [
    'heroImage:',
    `  src: ${yamlValue(hero.src)}`,
    `  alt: ${yamlValue(hero.alt)}`,
  ].join('\n');
}

function dumpList(name: string, rows: Record<string, string>[], keys: string[]) {
  if (!rows.length) return `${name}: []`;
  const blocks = rows.map((row) => {
    const lines = keys.map((key, index) => {
      const prefix = index === 0 ? '  - ' : '    ';
      return `${prefix}${key}: ${yamlValue(row[key] || '')}`;
    });
    return lines.join('\n');
  });
  return `${name}:\n${blocks.join('\n')}`;
}

export function serializeInsight(input: InsightInput): string {
  const today = new Date().toISOString().slice(0, 10);
  const body = input.body.replace(/^\n+/, '').replace(/\n+$/, '') + '\n';
  const readingMinutes = input.readingMinutes || countReadingMinutes(body);
  const updatedAt = input.updatedAt || today;
  const keywords = input.keywords.map((item) => `  - ${yamlValue(item)}`).join('\n');

  const frontmatter = [
    `slug: ${yamlValue(input.slug)}`,
    `status: ${input.status}`,
    `category: ${yamlValue(input.category)}`,
    `breadcrumb: ${yamlValue(input.breadcrumb)}`,
    `title: ${yamlValue(input.title)}`,
    `titleHighlight: ${yamlValue(input.titleHighlight)}`,
    `seoTitle: ${yamlValue(input.seoTitle || input.title)}`,
    `dek: ${yamlValue(input.dek)}`,
    `heroQuote: ${yamlValue(input.heroQuote)}`,
    `description: ${yamlValue(input.description)}`,
    input.keywords.length ? `keywords:\n${keywords}` : 'keywords: []',
    `publishedAt: ${yamlValue(input.publishedAt)}`,
    `updatedAt: ${yamlValue(updatedAt)}`,
    `readingMinutes: ${readingMinutes}`,
    dumpAuthor(input.author),
    dumpHero(input.heroImage),
    dumpList('capacity', input.capacity, ['label', 'value', 'note']),
    dumpList('workforce', input.workforce, ['role', 'share', 'fte']),
    dumpList('faqs', input.faqs, ['question', 'answer']),
    `sources: ${yamlValue(input.sources)}`,
  ].join('\n');

  return `---\n${frontmatter}\n---\n\n${body}`;
}

export function normaliseInsightInput(input: InsightInput): InsightArticle {
  return parseInsightMarkdown(serializeInsight(input), input.slug);
}
