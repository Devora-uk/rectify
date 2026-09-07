import { execTeam } from '@/lib/exec-team';
import type { InsightAuthor } from '@/lib/insight-types';

export const insightAuthors: InsightAuthor[] = execTeam.map((member) => ({
  name: member.name,
  role: member.role === 'Founder' ? 'Founder, Rectify International' : `${member.role}, Rectify International`,
  image: member.image,
  imageAlt: member.imageAlt,
}));

export const defaultInsightAuthor = insightAuthors[0];
