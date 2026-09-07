import { NextResponse } from 'next/server';
import { parseInsightPayload, schemaErrorMessage } from '@/lib/insight-schema';
import { deleteManagedInsight, readManagedInsight, saveManagedInsight } from '@/lib/insight-store';
import { getStudioSessionFromCookies, isSameOrigin, unauthorized } from '@/lib/studio-auth';

export const dynamic = 'force-dynamic';

type Params = { params: { slug: string } };

export async function GET(_request: Request, { params }: Params) {
  if (!await getStudioSessionFromCookies()) return unauthorized();
  const article = await readManagedInsight(params.slug);
  if (!article) {
    return NextResponse.json({ error: 'Briefing not found' }, { status: 404 });
  }
  return NextResponse.json({ article });
}

export async function PUT(request: Request, { params }: Params) {
  if (!await getStudioSessionFromCookies()) return unauthorized();
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Request origin was rejected' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const input = parseInsightPayload({ ...body.article, slug: params.slug });
    const saved = await saveManagedInsight(input, {
      deploy: body.deploy === true,
    });
    return NextResponse.json(saved);
  } catch (error) {
    const message = schemaErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  if (!await getStudioSessionFromCookies()) return unauthorized();
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Request origin was rejected' }, { status: 403 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const result = await deleteManagedInsight(params.slug, { deploy: body.deploy !== false });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not delete the briefing.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
