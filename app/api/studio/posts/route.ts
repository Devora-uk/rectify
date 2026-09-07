import { NextResponse } from 'next/server';
import { parseInsightPayload, schemaErrorMessage } from '@/lib/insight-schema';
import { listManagedInsights, readManagedInsight, saveManagedInsight } from '@/lib/insight-store';
import { getStudioSessionFromCookies, isSameOrigin, unauthorized } from '@/lib/studio-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!await getStudioSessionFromCookies()) return unauthorized();
  const posts = await listManagedInsights();
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  if (!await getStudioSessionFromCookies()) return unauthorized();
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Request origin was rejected' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const input = parseInsightPayload(body.article);
    const existing = await readManagedInsight(input.slug);
    if (existing) {
      return NextResponse.json({ error: 'A briefing with this slug already exists.' }, { status: 409 });
    }
    const saved = await saveManagedInsight(input, { deploy: input.status === 'published' });
    return NextResponse.json(saved);
  } catch (error) {
    const message = schemaErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
