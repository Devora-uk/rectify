'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import Logo from '@/components/Logo';

export default function CookiePolicy() {

  return (
    <div className="watercolor min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Content */}
      <main className="legal-page pb-24 pt-36 md:pt-44">
        <div className="legal-card mx-auto max-w-5xl px-5 sm:px-8">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-14 border-b border-slate-200 pb-10">
            <p className="eyebrow mb-5">Legal information</p><h1 className="text-5xl sm:text-7xl font-semibold tracking-[-.055em] text-slate-900 mb-4">
              Cookie Policy
            </h1>
            <p className="text-slate-600 text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                1. What Are Cookies?
              </h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
              <p className="mb-4">
                This Cookie Policy explains how Rectify uses cookies and similar technologies on our website and what choices you have regarding them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                2. Types of Cookies We Use
              </h2>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
                2.1 Essential Cookies
              </h3>
              <p className="mb-4">
                These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Setting your privacy preferences</li>
                <li>Filling in forms</li>
                <li>Logging in to your account</li>
                <li>Remembering your cookie preferences</li>
              </ul>
              <p className="mb-4">
                These cookies do not store any personally identifiable information and are essential for providing you with services you have requested.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
                2.2 Analytics Cookies
              </h3>
              <p className="mb-4">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Improve our website&apos;s functionality and user experience</li>
                <li>Understand which pages are most popular</li>
                <li>Identify areas where we can improve our services</li>
                <li>Measure the effectiveness of our content</li>
              </ul>
              <p className="mb-4">
                We may use services like Google Analytics for this purpose. These cookies do not directly identify you, but they may collect information about your browsing behaviour.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
                2.3 Marketing Cookies
              </h3>
              <p className="mb-4">
                These cookies may be set through our site by our advertising partners. They may be used to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Build a profile of your interests</li>
                <li>Show you relevant content and advertisements on other sites</li>
                <li>Measure the effectiveness of advertising campaigns</li>
              </ul>
              <p className="mb-4">
                These cookies require your consent before they can be set. You can manage your preferences at any time using our cookie banner or settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                3. Third-Party Cookies
              </h2>
              <p className="mb-4">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics and deliver content. These may include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Google Analytics:</strong> To analyse website usage and improve our services</li>
                <li><strong>Social Media Platforms:</strong> To enable social sharing and integration</li>
                <li><strong>Email Marketing Services:</strong> To track email campaign performance</li>
              </ul>
              <p className="mb-4">
                These third parties may use cookies to collect information about your online activities across different websites. We do not control these third-party cookies, and you should check the respective privacy policies of these third parties for more information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                4. How Long Do Cookies Last?
              </h2>
              <p className="mb-4">
                Cookies can be either &quot;session&quot; or &quot;persistent&quot; cookies:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser. They help maintain your session while you navigate our website.</li>
                <li><strong>Persistent Cookies:</strong> These remain on your device for a set period or until you delete them. They help us remember your preferences and improve your experience on return visits.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                5. Managing Your Cookie Preferences
              </h2>
              <p className="mb-4">
                You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
              </p>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
                5.1 Cookie Banner
              </h3>
              <p className="mb-4">
                When you first visit our website, you will see a cookie banner that allows you to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Accept all cookies</li>
                <li>Reject all non-essential cookies</li>
                <li>Manage your preferences for different types of cookies</li>
              </ul>
              <p className="mb-4">
                You can change your preferences at any time by clicking on the cookie settings link in our website footer or by clearing your browser cookies and revisiting our site.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
                5.2 Browser Settings
              </h3>
              <p className="mb-4">
                You can also control cookies through your browser settings. Here are links to instructions for popular browsers:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">Microsoft Edge</a></li>
              </ul>
              <p className="mb-4">
                Please note that disabling certain cookies may affect the functionality of our website and your ability to use some features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                6. Do Not Track Signals
              </h2>
              <p className="mb-4">
                Some browsers include a &quot;Do Not Track&quot; (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. Currently, there is no standard for how DNT signals should be interpreted, and our website does not currently respond to DNT signals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                7. Updates to This Policy
              </h2>
              <p className="mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                8. More Information
              </h2>
              <p className="mb-4">
                For more information about how we handle your personal data, please see our{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                9. Contact Us
              </h2>
              <p className="mb-4">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <p className="mb-2">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:isaac.salakov@rectifyinternational.com" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
                    isaac.salakov@rectifyinternational.com
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Phone (US):</strong>{' '}
                  <a href="tel:+17865791193" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
                    +1 (786) 579-1193
                  </a>
                </p>
              </div>
            </section>
          </div>

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
