import { Metadata } from 'next'
import { Suspense } from 'react'
import DiscountCalculator from '@/components/DiscountCalculator'

type Lang = 'zh' | 'en'

const SITE_URL = 'https://coupon-site-production.up.railway.app'
const PAGE_URL = '/discount-calculator'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}): Promise<Metadata> {
  const sp = await searchParams
  const lang = (sp.lang === 'zh' ? 'zh' : 'en') as Lang

  if (lang === 'en') {
    return {
      title: 'Discount Calculator — Calculate Sale Price After X% Off (50K/mo)',
      description:
        'Calculate the final price after any discount: percentage off, fixed amount, or free shipping. 50,000+ monthly searches. Free, no signup, instant results.',
      alternates: {
        canonical: PAGE_URL,
        languages: {
          'en-US': `${SITE_URL}${PAGE_URL}?lang=en`,
          'zh-CN': `${SITE_URL}${PAGE_URL}?lang=zh`,
          'x-default': `${SITE_URL}${PAGE_URL}`,
        },
      },
      openGraph: {
        title: 'Discount Calculator — Calculate Sale Price After X% Off',
        description:
          'Free discount calculator: percentage off, fixed amount, free shipping. Instant results, no signup.',
        type: 'website',
        url: `${SITE_URL}${PAGE_URL}`,
      },
    }
  }
  return {
    title: '折扣计算器 — 一键算清优惠后实际价格 | 优惠总动员',
    description:
      '免费折扣计算器:支持百分比折扣、固定金额减免、免运费计算。输入原价 + 优惠,立即得出实付价,无需注册。',
    alternates: {
      canonical: PAGE_URL,
      languages: {
        'en-US': `${SITE_URL}${PAGE_URL}?lang=en`,
        'zh-CN': `${SITE_URL}${PAGE_URL}?lang=zh`,
        'x-default': `${SITE_URL}${PAGE_URL}`,
      },
    },
    openGraph: {
      title: '折扣计算器 — 一键算清优惠后实际价格',
      description:
        '免费折扣计算器:百分比、固定金额、免运费全支持,立即出结果。',
      type: 'website',
      url: `${SITE_URL}${PAGE_URL}`,
    },
  }
}

export default async function DiscountCalculatorPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = (sp.lang === 'zh' ? 'zh' : 'en') as Lang
  const nextLang: Lang = lang === 'zh' ? 'en' : 'zh'

  // FAQ + WebApplication Schema — FAQPage helps AI cite; WebApplication surfaces tool chip
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does the discount calculator work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Enter the original price and the discount (as a percentage off, fixed amount off, or a "free shipping" toggle). The calculator shows the final price, the dollar amount saved, and the effective percentage saved. Calculations happen instantly in your browser — no signup required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can it handle stacked discounts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The calculator supports stacking two discounts: for example "20% off + $10 off" on a $100 order produces a $70 final price ($30 saved). The interface accepts two independent discount fields with the same percentage / fixed / free-shipping options.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does it work for currencies other than USD?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The calculator is currency-agnostic — you can enter any decimal price and any fixed-amount discount. The output (final price and amount saved) uses the same unit you enter. It does not perform FX conversion; for that, enter both numbers in the same currency.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate a percent-off price in my head?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Quick method: multiply the original price by (100 minus the percent) and divide by 100. For example, 30% off $80 = 80 × 70 ÷ 100 = $56 final. For a 50% discount the answer is always exactly half. For odd percentages, the calculator is faster.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the discount calculator free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — fully free, no signup, no ads interrupting the calculation. The calculator is part of CouponSite, a real-time coupon aggregator covering 23 top brands.',
        },
      },
    ],
  }

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Discount Calculator - CouponSite',
    alternateName: 'Discount Calculator',
    url: `${SITE_URL}${PAGE_URL}`,
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'DiscountCalculator',
    operatingSystem: 'Any (web browser with JavaScript)',
    browserRequirements: 'Requires JavaScript',
    inLanguage: ['en-US', 'zh-CN'],
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description:
      'Calculate the final price after any discount: percentage off, fixed amount, or free shipping. Free, instant, no signup.',
    dateModified: '2026-07-18',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, webAppSchema]) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
        <DiscountCalculator lang={lang} nextLang={nextLang} />
      </Suspense>
    </>
  )
}
