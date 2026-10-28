import { SITE_URL } from '@/lib/site'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact | CouponSite',
  description:
    'Get in touch with CouponSite: report an expired or incorrect coupon code, submit a promotion, ask about a brand page, or request a data correction.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
    languages: { 'x-default': `${SITE_URL}/contact` },
  },
  openGraph: {
    title: 'Contact | CouponSite',
    description:
      'Get in touch with CouponSite: report an expired or incorrect coupon code, submit a promotion, ask about a brand page, or request a data correction.',
    type: 'website',
    url: `${SITE_URL}/contact`,
    images: [`${SITE_URL}/og-image.png`],
  },
}

const REASONS = [
  {
    h: 'Report an expired or incorrect code',
    body: 'Tell us which brand and what the checkout showed. We re-check the entry and pull it if it no longer works.',
  },
  {
    h: 'Submit a promotion',
    body: 'Send the code, the brand, the expiry date, and any minimum-spend condition. We review every submission by hand and reply once it is live.',
  },
  {
    h: 'Request a brand page',
    body: 'We cover 15 brands at the moment and add more when we can keep the verification standard. Suggest a brand and we will tell you where it stands.',
  },
  {
    h: 'Privacy or data request',
    body: 'Questions about our Privacy Policy or about information linked to you go to the same address.',
  },
]

export default function ContactPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact CouponSite',
    url: `${SITE_URL}/contact`,
    inLanguage: ['en-US', 'zh-CN'],
    dateModified: '2026-10-28',
    isPartOf: { '@type': 'WebSite', name: 'CouponSite', url: SITE_URL },
    mainEntity: {
      '@type': 'Organization',
      name: 'CouponSite',
      alternateName: 'Coupon Hub',
      url: SITE_URL,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'czhcl@hotmail.com',
        availableLanguage: ['en', 'zh'],
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
            ← Back to Home
          </Link>
          <Link href="/about" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
            About
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact</h1>
        <p className="text-sm text-gray-400 mb-8">Last reviewed: 28 October 2026</p>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Email us</h2>
          <p className="text-sm leading-relaxed text-gray-600 mb-4">
            We are a small team and read every message ourselves. If you write to us, you will get a
            reply from a person — usually within two business days.
          </p>
          <a
            href="mailto:czhcl@hotmail.com"
            className="inline-block text-orange-600 hover:underline font-semibold text-base"
          >
            czhcl@hotmail.com
          </a>
          <p className="text-xs text-gray-400 mt-4">
            Please include the brand name and the page URL so we can find the entry quickly.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What to write about</h2>
          <div className="space-y-4">
            {REASONS.map((r) => (
              <div key={r.h}>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">{r.h}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{r.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Response time</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Coupon reports and code submissions are usually handled within one business day.
            Requests that need a brand to confirm something can take longer, and we will tell you
            when we are still waiting.
          </p>
        </div>

        <p className="text-xs text-gray-400 mt-8">
          You can also read our{' '}
          <Link href="/about" className="text-orange-500 underline">
            About page
          </Link>{' '}
          for how we source and verify offers, our{' '}
          <Link href="/privacy" className="text-orange-500 underline">
            Privacy Policy
          </Link>
          , and our{' '}
          <Link href="/terms" className="text-orange-500 underline">
            Terms of Use
          </Link>
          .
        </p>
      </main>
    </div>
  )
}
