import { NextResponse } from 'next/server';
import {
  createStudioSession,
  passwordsMatch,
  STUDIO_COOKIE,
  studioAuthConfigured,
  studioCookieOptions,
} from '@/lib/studio-auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!studioAuthConfigured()) {
    return NextResponse.json(
      { error: 'Studio is not configured. Add INSIGHTS_STUDIO_PASSWORD and INSIGHTS_STUDIO_SECRET first.' },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === 'string' ? body.password : '';
  if (!passwordsMatch(password)) {
    return NextResponse.json({ error: 'That password is not right.' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(STUDIO_COOKIE, await createStudioSession(), studioCookieOptions());
  return response;
}
