import { notFound } from 'next/navigation';
import InsightEditor from '@/components/studio/InsightEditor';
import { readManagedInsight } from '@/lib/insight-store';

export const dynamic = 'force-dynamic';

type Props = { params: { slug: string } };

export default async function EditInsightPage({ params }: Props) {
  const article = await readManagedInsight(params.slug);
  if (!article) notFound();
  return <InsightEditor mode="edit" initial={article} />;
}
