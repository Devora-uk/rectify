import { NextResponse } from 'next/server';
import { slugifyInsightTitle } from '@/lib/insight-slug';
import { saveManagedImage } from '@/lib/insight-store';
import { getStudioSessionFromCookies, isSameOrigin, unauthorized } from '@/lib/studio-auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!await getStudioSessionFromCookies()) return unauthorized();
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Request origin was rejected' }, { status: 403 });
  }

  try {
    const form = await request.formData();
    const file = form.get('file');
    const slugValue = String(form.get('slug') || 'shared');
    const slug = slugifyInsightTitle(slugValue) || 'shared';
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Choose an image to upload.' }, { status: 400 });
    }
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json({ error: 'Keep images under 4 MB.' }, { status: 400 });
    }
    const bytes = Buffer.from(await file.arrayBuffer());
    const saved = await saveManagedImage(slug, file.name, bytes);
    return NextResponse.json(saved);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not upload the image.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
