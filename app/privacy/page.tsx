'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import Logo from '@/components/Logo';

export default function PrivacyPolicy() {

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
              Privacy Policy
            </h1>
            <p className="text-slate-600 text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                1. Introduction
              </h2>
              <p className="mb-4">
                Rectify (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, submit your CV, or use our recruitment services.
              </p>
              <p className="mb-4">
                We are a recruitment consultancy specialising in energy, engineering and infrastructure, with market expertise across the United States and Germany. This policy applies to all personal data we process in connection with our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                2. Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
                2.1 Personal Information You Provide
              </h3>
              <p className="mb-4">
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Submit your CV or application through our website</li>
                <li>Apply to partner with us through our partnership form</li>
                <li>Contact us via our contact form or email</li>
                <li>Register for job alerts or newsletters</li>
                <li>Communicate with us about our services</li>
                <li>Participate in interviews or assessments</li>
              </ul>
              <p className="mb-4">
                This information may include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Name, email address, phone number, and postal address</li>
                <li>CV/resume, employment history, qualifications, and skills</li>
                <li>Salary expectations and job preferences</li>
                <li>References and background check information</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
                2.2 Information We Collect Automatically
              </h3>
              <p className="mb-4">
                When you visit our website, we automatically collect certain information about your device and browsing behaviour, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies (see our{' '}
                  <Link href="/cookies" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
                    Cookie Policy
                  </Link>)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
                2.3 Information from Third Parties
              </h3>
              <p className="mb-4">
                We may receive information about you from:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Job boards and professional networking sites (e.g., LinkedIn)</li>
                <li>References you provide</li>
                <li>Background check providers</li>
                <li>Publicly available sources</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                3. How We Use Your Information
              </h2>
              <p className="mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Recruitment Services:</strong> To match you with suitable job opportunities and facilitate the recruitment process</li>
                <li><strong>Communication:</strong> To contact you about job opportunities, respond to your enquiries, and provide updates</li>
                <li><strong>Client Services:</strong> To provide our clients with candidate information and support their hiring processes</li>
                <li><strong>Website Improvement:</strong> To analyse website usage and improve our services</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our legal rights</li>
                <li><strong>Marketing:</strong> To send you relevant job alerts, newsletters, and information about our services (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                4. Legal Basis for Processing
              </h2>
              <p className="mb-4">
                Under applicable data protection laws (including GDPR), we process your personal data based on:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Consent:</strong> When you have given clear consent for us to process your data</li>
                <li><strong>Contract:</strong> To perform our recruitment services and fulfil our contractual obligations</li>
                <li><strong>Legitimate Interests:</strong> To operate our business, improve our services, and communicate with you</li>
                <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                5. Sharing Your Information
              </h2>
              <p className="mb-4">
                We may share your personal information with:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Potential Employers:</strong> We share your CV and relevant information with clients who have suitable job opportunities</li>
                <li><strong>Service Providers:</strong> Third-party companies that help us operate our business (e.g., email providers, cloud storage, analytics)</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our legal rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
              <p className="mb-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                6. Data Retention
              </h2>
              <p className="mb-4">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide our recruitment services</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce our agreements</li>
              </ul>
              <p className="mb-4">
                Typically, we retain candidate information for up to 3 years after your last interaction with us, unless you request deletion or we have a legal obligation to retain it longer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                7. Your Rights
              </h2>
              <p className="mb-4">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Restriction:</strong> Request limitation of how we process your data</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:info@rectifyinternational.com" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
                  info@rectifyinternational.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                8. Data Security
              </h2>
              <p className="mb-4">
                We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                9. International Data Transfers
              </h2>
              <p className="mb-4">
                As we operate across the United States and Germany, your personal data may be transferred to and processed in countries outside your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with applicable data protection laws, including GDPR for individuals in Germany and the EU, and applicable US state privacy laws where relevant.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                10. Children&apos;s Privacy
              </h2>
              <p className="mb-4">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                11. Changes to This Policy
              </h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                12. Contact Us
              </h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <p className="mb-2">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info@rectifyinternational.com" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
                    info@rectifyinternational.com
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
