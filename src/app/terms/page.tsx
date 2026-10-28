import { SITE_URL } from '@/lib/site'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use | CouponSite',
  description:
    'The terms that govern your use of CouponSite: how we publish offers, what we do not promise about prices or codes, and the limits of what we provide.',
  alternates: {
    canonical: `${SITE_URL}/terms`,
    languages: { 'x-default': `${SITE_URL}/terms` },
  },
  openGraph: {
    title: 'Terms of Use | CouponSite',
    description:
      'The terms that govern your use of CouponSite: how we publish offers, what we do not promise about prices or codes, and the limits of what we provide.',
    type: 'website',
    url: `${SITE_URL}/terms`,
    images: [`${SITE_URL}/og-image.png`],
  },
}

const SECTIONS = [
  {
    h: 'About these terms',
    body: [
      'These terms govern your use of coupons.getpracticaltools.com ("CouponSite", "we", "us"). By using the site you accept them. If you do not accept them, please stop using the site.',
      'We may revise these terms. The date at the top of this page shows the last revision, and continued use after a revision means you accept the updated terms.',
    ],
  },
  {
    h: 'What this site is',
    body: [
      'CouponSite is a free informational service. We collect publicly available promotions, discount codes, and official sale pages from brands, and we link to those pages so you can reach them directly.',
      'We are not a retailer. We do not sell products, we do not take orders, and we do not process payments. Any purchase you make is between you and the brand you buy from.',
    ],
  },
  {
    h: 'Accuracy of offers and prices',
    body: [
      'We make a genuine effort to publish accurate, current promotions, and every entry is manually reviewed. But we cannot guarantee that a code will work, that a discount will be available when you click, or that a price shown anywhere will match the price on the brand’s site.',
      'Prices, stock, eligibility, and promotion terms are set entirely by each brand and can change at any moment, sometimes without notice. Where an entry points at a brand’s official sale page rather than a fixed code, the page says so explicitly and the live page is the only source of truth.',
      'Always check the final price and the full terms on the brand’s site before you buy. If a deal does not apply, that is the brand’s decision, not a promise we made.',
    ],
  },
  {
    h: 'No warranty',
    body: [
      'The site is provided "as is" and "as available", without warranties of any kind, express or implied, including fitness for a particular purpose, accuracy, and non-infringement.',
      'We do not warrant that the site will be available, uninterrupted, or free of errors, or that any particular offer will remain listed.',
    ],
  },
  {
    h: 'Limitation of liability',
    body: [
      'To the maximum extent permitted by law, we are not liable for any loss arising from your use of the site or your reliance on anything published here, including loss from a failed discount code, a changed price, a cancelled order, or a product that did not meet your expectations.',
      'Nothing in these terms excludes liability that cannot lawfully be excluded.',
    ],
  },
  {
    h: 'Acceptable use',
    body: [
      'You may read, link to, and share our content for personal, non-commercial use. You may not scrape the site at a rate that degrades it for other visitors, republish our content wholesale, or misrepresent our content as your own.',
      'Brand names, logos, and trademarks belong to their respective owners. We reference them to identify the brands we cover.',
    ],
  },
  {
    h: 'Affiliate disclosure',
    body: [
      'Some outbound links to retailers are affiliate links. If you complete a purchase after clicking one, the retailer pays us a commission. The price you pay is the same either way. See our Privacy Policy for details on how affiliate networks use cookies.',
    ],
  },
  {
    h: 'Governing law and contact',
    body: [
      'These terms are governed by the laws of the People’s Republic of China, without regard to conflict-of-law rules.',
      'Questions about these terms can be sent to the address on our contact page.',
    ],
  },
]

export default function TermsPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Use',
    url: `${SITE_URL}/terms`,
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Use</h1>
        <p className="text-sm text-gray-400 mb-8">Last revised: 28 October 2026</p>

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

        <p className="text-xs text-gray-400 mt-8">
          See also our{' '}
          <Link href="/privacy" className="text-orange-500 underline">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="/contact" className="text-orange-500 underline">
            contact page
          </Link>
          .
        </p>
      </main>
    </div>
  )
}
