import { NextResponse } from 'next/server';
import { validatePartnerApplication } from '@/lib/partner-application';
import { submitPartnerApplication } from '@/lib/submit-partner-application';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 503 });
    }

    const body = await request.json();
    const result = validatePartnerApplication(body);

    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const submission = await submitPartnerApplication(result.payload);

    return NextResponse.json(
      { success: true, channel: submission.channel, id: submission.emailId },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error processing partnership application:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 },
    );
  }
}
