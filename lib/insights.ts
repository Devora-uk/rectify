import fs from 'fs';
import path from 'path';
import { insightFilePath, parseInsightMarkdown } from '@/lib/insight-format';
import type { InsightArticle } from '@/lib/insight-types';

const contentDirectory = path.join(process.cwd(), 'content/insights');

function readLocalInsights(): InsightArticle[] {
  if (!fs.existsSync(contentDirectory)) return [];

  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(contentDirectory, file), 'utf8');
      return parseInsightMarkdown(raw, slug);
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));
}

export function getAllInsights() {
  return readLocalInsights();
}

export function getPublishedInsights() {
  return getAllInsights().filter((article) => article.status === 'published');
}

export function getInsight(slug: string) {
  const file = path.join(process.cwd(), insightFilePath(slug));
  if (!fs.existsSync(file)) {
    return getAllInsights().find((article) => article.slug === slug);
  }
  return parseInsightMarkdown(fs.readFileSync(file, 'utf8'), slug);
}

export function getPublishedInsight(slug: string) {
  const article = getInsight(slug);
  if (!article || article.status !== 'published') return undefined;
  return article;
}

export function insightPath(slug: string) {
  return `/insights/${slug}`;
}
