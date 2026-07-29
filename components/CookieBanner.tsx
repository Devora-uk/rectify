'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(cookieConsent);
        setPreferences(savedPreferences);
      } catch (e) {
        // If parsing fails, show banner again
        setIsVisible(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setIsVisible(false);
    setIsPreferencesOpen(false);
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyEssential);
    localStorage.setItem('cookieConsent', JSON.stringify(onlyEssential));
    setIsVisible(false);
    setIsPreferencesOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setIsVisible(false);
    setIsPreferencesOpen(false);
  };

  const handleTogglePreference = (key: 'analytics' | 'marketing') => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-3 left-3 right-3 z-50 rounded-2xl border border-slate-200 bg-white/95 shadow-[0_20px_70px_rgba(15,23,42,.2)] backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-5"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-5">
        {!isPreferencesOpen ? (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#dffbf9]"><Cookie className="h-4 w-4 text-[#067c79]" aria-hidden="true" /></span>
                <div>
                  <h3
                    id="cookie-banner-title"
                    className="text-base sm:text-lg font-semibold text-slate-900 mb-1"
                  >
                    We use cookies
                  </h3>
                  <p
                    id="cookie-banner-description"
                    className="text-sm sm:text-base text-slate-600 leading-relaxed"
                  >
                    We use cookies to enhance your browsing experience, analyse site traffic, and personalise content. By clicking &quot;Accept All&quot;, you consent to our use of cookies.{' '}
                    <Link
                      href="/cookies"
                      className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-medium"
                    >
                      Learn more
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 flex-shrink-0">
              <Button
                variant="outline"
                onClick={() => setIsPreferencesOpen(true)}
                className="h-11 sm:h-10 min-h-[44px] text-sm sm:text-base border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Manage Preferences
              </Button>
              <Button
                variant="outline"
                onClick={handleRejectAll}
                className="h-11 sm:h-10 min-h-[44px] text-sm sm:text-base border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Reject All
              </Button>
              <Button
                onClick={handleAcceptAll}
                className="h-11 sm:h-10 min-h-[44px] rounded-full bg-slate-950 text-sm text-white hover:bg-blue-700 sm:text-base"
              >
                Accept All
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                Cookie Preferences
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPreferencesOpen(false)}
                className="h-10 w-10 min-h-[44px] min-w-[44px]"
                aria-label="Close preferences"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-4 pt-2">
              {/* Essential Cookies */}
              <div className="flex items-start justify-between gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">
                    Essential Cookies
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences or filling in forms.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 cursor-not-allowed opacity-60">
                    <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition"></span>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between gap-4 p-4 bg-white rounded-lg border border-slate-200">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">
                    Analytics Cookies
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleTogglePreference('analytics')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                      preferences.analytics ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle analytics cookies"
                    aria-pressed={preferences.analytics}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    ></span>
                  </button>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between gap-4 p-4 bg-white rounded-lg border border-slate-200">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">
                    Marketing Cookies
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant content on other sites.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleTogglePreference('marketing')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                      preferences.marketing ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle marketing cookies"
                    aria-pressed={preferences.marketing}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-200">
              <Link
                href="/cookies"
                className="text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2 text-center sm:text-left"
              >
                Learn more about our cookie policy
              </Link>
              <div className="flex flex-col sm:flex-row gap-3 sm:ml-auto">
                <Button
                  variant="outline"
                  onClick={() => setIsPreferencesOpen(false)}
                  className="h-11 sm:h-10 min-h-[44px] text-sm sm:text-base border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="h-11 sm:h-10 min-h-[44px] text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
