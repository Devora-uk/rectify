import { getNotificationEmail, getResendClient, getResendFrom } from '@/lib/resend';
import type { PartnerApplicationPayload } from '@/lib/partner-application';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fieldBlock(label: string, value: string) {
  return `
    <div style="margin-bottom: 16px; padding: 16px; background-color: #f1f5f9; border-radius: 8px;">
      <p style="margin: 0 0 6px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">${escapeHtml(label)}</p>
      <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(value)}</p>
    </div>
  `;
}

function buildPlainText(application: PartnerApplicationPayload) {
  return [
    'Partnership application',
    '',
    `Company: ${application.companyName}`,
    `Sector: ${application.sector}`,
    `Primary geography: ${application.geography}`,
    `Submitted by: ${application.name}`,
    `Email: ${application.email}`,
    `Phone: ${application.phone}`,
    application.website ? `Website: ${application.website}` : null,
    '',
    `1. Company / sector / geography: ${application.companyName} · ${application.sector} · ${application.geography}`,
    `2. Technical hires in the next 12 months: ${application.hireVolume}`,
    `3. Hardest roles to fill: ${application.hardRoles}`,
    `4. What has broken down in hiring: ${application.processBreakdown}`,
    `5. Current hiring approach: ${application.hiringApproaches.join('; ')}`,
    `6. What success looks like in 12 months: ${application.successLook}`,
    `7. Primary decision-maker: ${application.decisionMakerName}, ${application.decisionMakerTitle}`,
    `8. Why now: ${application.whyNow}`,
  ]
    .filter((line) => line !== null)
    .join('\n');
}

async function notifyTeamViaResend(application: PartnerApplicationPayload) {
  const resend = getResendClient();
  const { data, error } = await resend.emails.send({
    from: getResendFrom('Rectify Partnerships'),
    to: getNotificationEmail(),
    replyTo: application.email,
    subject: `Partnership application from ${application.companyName}`,
    text: buildPlainText(application),
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Partnership application</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 680px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: linear-gradient(135deg, #06165b 0%, #0b4ee8 100%); padding: 30px; border-radius: 12px 12px 0 0;">
              <p style="margin: 0 0 8px; color: #42e5dd; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;">Partnership application</p>
              <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">${escapeHtml(application.companyName)}</h1>
            </div>
            <div style="background-color: white; padding: 36px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <p style="margin: 0 0 24px; font-size: 16px; color: #64748b;">A business has applied to partner with Rectify. Review the answers below, then arrange a fit call if it is worth taking forward.</p>
              ${fieldBlock('Submitted by', `${application.name} · ${application.email} · ${application.phone}`)}
              ${application.website ? fieldBlock('Website', application.website) : ''}
              ${fieldBlock('1. Company name', application.companyName)}
              ${fieldBlock('1. Sector', application.sector)}
              ${fieldBlock('1. Primary geography', application.geography)}
              ${fieldBlock('2. Technical hires in the next 12 months', application.hireVolume)}
              ${fieldBlock('3. Hardest roles to fill', application.hardRoles)}
              ${fieldBlock('4. What has broken down in hiring', application.processBreakdown)}
              ${fieldBlock('5. Current hiring approach', application.hiringApproaches.join('\n'))}
              ${fieldBlock('6. What success looks like in 12 months', application.successLook)}
              ${fieldBlock('7. Primary decision-maker', `${application.decisionMakerName}, ${application.decisionMakerTitle}`)}
              ${fieldBlock('8. Why now', application.whyNow)}
              <p style="margin: 24px 0 0; font-size: 14px; color: #94a3b8; text-align: center;">Sent from the Rectify partnership application form via Resend.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });

  if (error) {
    throw new Error(error.message || 'Failed to send application email');
  }

  return data;
}

async function confirmApplicantViaResend(application: PartnerApplicationPayload) {
  const resend = getResendClient();
  const { error } = await resend.emails.send({
    from: getResendFrom('Rectify'),
    to: application.email,
    replyTo: getNotificationEmail(),
    subject: 'We have received your Rectify partnership application',
    text: [
      `Hi ${application.name},`,
      '',
      `Thank you for applying to partner with Rectify on behalf of ${application.companyName}.`,
      '',
      'We will assess the application and, if there is a fit, arrange a phone call with the hiring decision-maker.',
      '',
      'Rectify International',
    ].join('\n'),
    html: `
      <p>Hi ${escapeHtml(application.name)},</p>
      <p>Thank you for applying to partner with Rectify on behalf of <strong>${escapeHtml(application.companyName)}</strong>.</p>
      <p>We will assess the application and, if there is a fit, arrange a phone call with the hiring decision-maker.</p>
      <p>Rectify International</p>
    `,
  });

  if (error) {
    console.error('Resend confirmation error:', error);
  }
}

async function syncToAtlasWhenReady(application: PartnerApplicationPayload) {
  const webhookUrl = process.env.ATLAS_WEBHOOK_URL;
  const apiKey = process.env.ATLAS_API_KEY;

  if (!webhookUrl) {
    return;
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify({
      source: 'rectify-website',
      type: 'partnership_application',
      submittedAt: new Date().toISOString(),
      application,
    }),
  });

  if (!response.ok) {
    throw new Error(`Atlas sync failed with status ${response.status}`);
  }
}

export async function submitPartnerApplication(application: PartnerApplicationPayload) {
  const email = await notifyTeamViaResend(application);

  try {
    await confirmApplicantViaResend(application);
  } catch (error) {
    console.error('Unable to send applicant confirmation:', error);
  }

  try {
    await syncToAtlasWhenReady(application);
  } catch (error) {
    console.error('Atlas sync skipped or failed during onboarding:', error);
  }

  return {
    channel: 'resend' as const,
    emailId: email?.id ?? null,
  };
}
