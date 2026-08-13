import { Resend } from 'resend';

const DEFAULT_FROM = 'Rectify <info@rectifyinternational.com>';
const DEFAULT_TO = 'isaac.salakov@rectifyinternational.com';

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  return new Resend(apiKey);
}

export function getResendFrom(label?: string) {
  const address = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM;

  if (label && !address.includes('<')) {
    return `${label} <${address}>`;
  }

  if (label && address.startsWith('Rectify <')) {
    return address.replace('Rectify <', `${label} <`);
  }

  return address;
}

export function getNotificationEmail() {
  return process.env.ENQUIRY_EMAIL || DEFAULT_TO;
}
