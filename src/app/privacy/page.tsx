import { SITE_URL } from '@/lib/site'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | CouponSite',
  description:
    'How CouponSite handles data: no purchase tracking, no cross-site advertising, URL-parameter-only search, and how to reach us about your information.',
  alternates: {
    canonical: `${SITE_URL}/privacy`,
    languages: { 'x-default': `${SITE_URL}/privacy` },
  },
  openGraph: {
    title: 'Privacy Policy | CouponSite',
    description:
      'How CouponSite handles data: no purchase tracking, no cross-site advertising, URL-parameter-only search, and how to reach us about your information.',
    type: 'website',
    url: `${SITE_URL}/privacy`,
    images: [`${SITE_URL}/og-image.png`],
  },
}

const SECTIONS = [
  {
    h: 'What we collect',
    body: [
      'We do not require an account, and we do not ask for personal information to browse the site.',
      'The on-site search box reads your query from the URL only (for example /?search=nike). That value is used to filter the list on screen. It is not written to a database, not tied to a device, and not sent to an advertising network.',
      'Our hosting provider (Railway) and our web-analytics provider (Ahrefs) may record standard server logs such as IP address, browser type, and requested URL. These are used for security and aggregate traffic measurement, and they are not combined with any profile we build about you.',
    ],
  },
  {
    h: 'What we do not do',
    body: [
      'We do not sell, rent, or trade personal information.',
      'We do not run third-party advertising pixels or cross-site retargeting trackers.',
      'We do not collect purchase histories, and we do not build profiles of individual shoppers.',
    ],
  },
  {
    h: 'Affiliate links',
    body: [
      'Some outbound links to retailers are affiliate links. When you click one and complete a purchase, the retailer pays us a commission. The price you pay is identical to visiting the retailer directly — the affiliate link never changes what you pay.',
      'Affiliate networks may set their own cookies when you click through. Those cookies are governed by the network’s privacy policy, not this one, and you can refuse them in your browser settings. Blocking them does not change any price.',
    ],
  },
  {
    h: 'Cookies and local storage',
    body: [
      'CouponSite itself sets no marketing cookies. The site may store your language preference locally in your browser so the page renders in the language you picked.',
    ],
  },
  {
    h: 'Children',
    body: [
      'The site is a general-audience discount aggregator and is not directed at children under 13. We do not knowingly collect information from children.',
    ],
  },
  {
    h: 'Your choices and contact',
    body: [
      'Because we do not hold personal accounts, there is generally nothing for us to export or delete. If you believe we hold information linked to you, or you have a question about this policy, email us and we will respond.',
      'We may update this policy when the site changes. The date below is the last time it was reviewed.',
    ],
  },
]

export default function PrivacyPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    url: `${SITE_URL}/privacy`,
    inLanguage: ['en-US', 'zh-CN'],
    dateModified: '2026-10-28',
    isPartOf: { '@type': 'WebSite', name: 'CouponSite', url: SITE_URL },
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last reviewed: 28 October 2026</p>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">{s.h}</h2>
              <div className="space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-gray-600">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Questions about this policy, or about privacy generally, can be sent to the address listed
            on our{' '}
            <Link href="/contact" className="text-orange-500 underline">
              contact page
            </Link>
            . We read every message and usually reply within two business days.
          </p>
        </div>

        <p className="text-xs text-gray-400 mt-8">
          This policy covers coupons.getpracticaltools.com only. Retailer sites linked from here have
          their own privacy practices.
        </p>
      </main>
    </div>
  )
}
