import { NextResponse } from 'next/server';
import { getNotificationEmail, getResendClient, getResendFrom } from '@/lib/resend';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 503 });
    }
    const resend = getResendClient();
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: getResendFrom('Rectify Enquiries'),
      to: getNotificationEmail(),
      replyTo: email,
      subject: `New Enquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Enquiry</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="background: linear-gradient(135deg, #2563eb 0%, #14b8a6 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">New Enquiry Received</h1>
              </div>
              
              <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <p style="margin: 0 0 20px; font-size: 16px; color: #64748b;">You've received a new enquiry from your website contact form.</p>
                
                <div style="margin: 30px 0;">
                  <div style="margin-bottom: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 8px;">
                    <p style="margin: 0 0 5px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                    <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">${name}</p>
                  </div>
                  
                  <div style="margin-bottom: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 8px;">
                    <p style="margin: 0 0 5px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                    <p style="margin: 0; font-size: 16px; color: #2563eb; font-weight: 500;">
                      <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                    </p>
                  </div>
                  
                  ${company ? `
                    <div style="margin-bottom: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 8px;">
                      <p style="margin: 0 0 5px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Company</p>
                      <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">${company}</p>
                    </div>
                  ` : ''}
                  
                  <div style="margin-bottom: 0; padding: 15px; background-color: #f1f5f9; border-radius: 8px;">
                    <p style="margin: 0 0 10px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                    <p style="margin: 0; font-size: 16px; color: #0f172a; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; font-size: 14px; color: #94a3b8; text-align: center;">
                    This enquiry was sent from your Rectify website contact form.
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Enquiry sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


