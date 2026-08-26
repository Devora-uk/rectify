'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) return false;

    const preferences = JSON.parse(consent) as { analytics?: boolean };
    return preferences.analytics === true;
  } catch {
    return false;
  }
}

export default function RybbitAnalytics() {
  const [enabled, setEnabled] = useState(false);
  const siteId = process.env.NEXT_PUBLIC_RYBBIT_SITE_ID;

  useEffect(() => {
    setEnabled(hasAnalyticsConsent());

    const handleConsentUpdate = () => {
      setEnabled(hasAnalyticsConsent());
    };

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate);
    return () => window.removeEventListener('cookieConsentUpdated', handleConsentUpdate);
  }, []);

  if (!siteId || !enabled) return null;

  return (
    <Script
      src="/api/script.js"
      data-site-id={siteId}
      strategy="afterInteractive"
    />
  );
}
