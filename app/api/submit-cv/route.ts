import { NextResponse } from 'next/server';
import { getNotificationEmail, getResendClient, getResendFrom } from '@/lib/resend';

// Force dynamic rendering for this route since it handles form data
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 503 });
    }
    const resend = getResendClient();
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const cvFile = formData.get('cv') as File;

    // Validate required fields
    if (!name || !email || !cvFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (cvFile.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Convert file to base64 for email attachment
    const arrayBuffer = await cvFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64File = buffer.toString('base64');

    // Send email using Resend with attachment
    const { data, error } = await resend.emails.send({
      from: getResendFrom('Rectify CV Submissions'),
      to: getNotificationEmail(),
      replyTo: email,
      subject: `CV Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CV Submission</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="background: linear-gradient(135deg, #2563eb 0%, #14b8a6 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">New CV Submission</h1>
              </div>
              
              <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <p style="margin: 0 0 20px; font-size: 16px; color: #64748b;">You've received a new CV submission from your website.</p>
                
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
                  
                  ${phone ? `
                    <div style="margin-bottom: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 8px;">
                      <p style="margin: 0 0 5px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Phone</p>
                      <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">${phone}</p>
                    </div>
                  ` : ''}
                  
                  <div style="margin-bottom: 0; padding: 15px; background-color: #f1f5f9; border-radius: 8px;">
                    <p style="margin: 0 0 10px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">CV File</p>
                    <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">${cvFile.name}</p>
                  </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; font-size: 14px; color: #94a3b8; text-align: center;">
                    The CV file is attached to this email. This submission was sent from your Rectify website.
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: cvFile.name,
          content: base64File,
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'CV submitted successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing CV submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
