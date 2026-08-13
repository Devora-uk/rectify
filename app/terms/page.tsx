'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import Logo from '@/components/Logo';

export default function TermsAndConditions() {

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
              Terms & Conditions
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
                These Terms and Conditions (&quot;Terms&quot;) govern your use of the Rectify website and our recruitment services. By accessing our website or using our services, you agree to be bound by these Terms.
              </p>
              <p className="mb-4">
                Rectify is a recruitment consultancy specialising in energy, engineering and infrastructure, with market expertise across the United States and Germany. We act as an intermediary between candidates and employers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                2. Use of Our Website
              </h2>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
                2.1 Acceptable Use
              </h3>
              <p className="mb-4">
                You agree to use our website only for lawful purposes and in a way that does not infringe the rights of others. You must not:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Use the website in any way that breaches applicable laws or regulations</li>
                <li>Transmit any material that is defamatory, offensive, or otherwise objectionable</li>
                <li>Attempt to gain unauthorised access to our systems or networks</li>
                <li>Interfere with or disrupt the website or servers</li>
                <li>Use automated systems to access the website without our permission</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
                2.2 Account Registration
              </h3>
              <p className="mb-4">
                If you create an account or submit your CV, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                3. Our Services
              </h2>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
                3.1 Recruitment Services
              </h3>
              <p className="mb-4">
                We provide recruitment consultancy services, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Matching candidates with job opportunities</li>
                <li>Facilitating the recruitment process between candidates and employers</li>
                <li>Providing career advice and support</li>
                <li>Conducting candidate assessments and interviews</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
                3.2 No Guarantee of Placement
              </h3>
              <p className="mb-4">
                While we strive to match candidates with suitable opportunities, we do not guarantee that you will be placed in a position. The final hiring decision rests with the employer, not with Rectify.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
                3.3 Accuracy of Information
              </h3>
              <p className="mb-4">
                You agree to provide accurate, current, and complete information when submitting your CV or using our services. You are responsible for ensuring that all information you provide is truthful and not misleading.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                4. Intellectual Property
              </h2>
              <p className="mb-4">
                All content on this website, including text, graphics, logos, images, and software, is the property of Rectify or its licensors and is protected by copyright and other intellectual property laws.
              </p>
              <p className="mb-4">
                You may not reproduce, distribute, modify, or create derivative works from any content on this website without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                5. Candidate Responsibilities
              </h2>
              <p className="mb-4">
                As a candidate using our services, you agree to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide accurate and complete information about your qualifications and experience</li>
                <li>Notify us immediately of any changes to your contact details or employment status</li>
                <li>Attend interviews and assessments punctually and professionally</li>
                <li>Inform us if you are no longer interested in a particular opportunity</li>
                <li>Not accept an offer of employment through another source for a position we have introduced you to without informing us</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                6. Limitation of Liability
              </h2>
              <p className="mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We provide our services &quot;as is&quot; without warranties of any kind</li>
                <li>We are not liable for any indirect, incidental, or consequential damages arising from your use of our services</li>
                <li>Our total liability shall not exceed the amount you have paid us for our services (if any)</li>
                <li>We are not responsible for the actions or omissions of employers or third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                7. Indemnification
              </h2>
              <p className="mb-4">
                You agree to indemnify and hold harmless Rectify, its officers, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your use of our website or services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Any inaccurate or misleading information you provide</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                8. Privacy and Data Protection
              </h2>
              <p className="mb-4">
                Your use of our services is also governed by our{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
                  Privacy Policy
                </Link>
                . By using our services, you consent to the collection and use of your personal information as described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                9. Termination
              </h2>
              <p className="mb-4">
                We reserve the right to suspend or terminate your access to our website or services at any time, with or without notice, for any reason, including if you breach these Terms.
              </p>
              <p className="mb-4">
                You may stop using our services at any time. However, any obligations or liabilities incurred before termination shall survive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                10. Changes to Terms
              </h2>
              <p className="mb-4">
                We may modify these Terms at any time by posting the updated Terms on this page. Your continued use of our website or services after such changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                11. Governing Law and Jurisdiction
              </h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                12. Severability
              </h2>
              <p className="mb-4">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
                13. Contact Us
              </h2>
              <p className="mb-4">
                If you have questions about these Terms, please contact us:
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
