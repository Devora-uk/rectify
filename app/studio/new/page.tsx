import InsightEditor from '@/components/studio/InsightEditor';
import { emptyInsight } from '@/lib/insight-schema';

export default function NewInsightPage() {
  return <InsightEditor mode="create" initial={emptyInsight()} />;
}
