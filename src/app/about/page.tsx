import type { Metadata } from 'next'
import AboutClient from './about-client'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'

  const titles = {
    zh: '关于我们 - 优惠总动员',
    en: 'About Coupon Hub',
  }
  const descriptions = {
    zh: '了解优惠总动员:使命、数据来源、隐私政策、联系方式。23 个品牌实时优惠码聚合站,支持中英文双语。',
    en: 'Learn about Coupon Hub: mission, data sources, affiliate disclosure, and contact information. Real-time coupon aggregator covering 23 brands across 5 categories, bilingual zh/en.',
  }

  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      type: 'profile',
      url: 'https://coupon-site-production.up.railway.app/about',
    },
    alternates: {
      canonical: 'https://coupon-site-production.up.railway.app/about',
      languages: {
        'x-default': 'https://coupon-site-production.up.railway.app/about',
      },
    },
  }
}

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'

  const base = 'https://coupon-site-production.up.railway.app'
  const today = new Date().toISOString().split('T')[0]

  // 2026-07-19: about 页采用 @graph + 添加 FAQPage + Person + Organization 同位抩到 E-E-A-T
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        name: 'About CouponSite',
        description:
          'Learn about CouponSite\'s mission, data sources, affiliate disclosure, verification methodology, and contact information. Real-time coupon aggregator covering 23 brands across fashion, electronics, travel, beauty, and pet supplies.',
        url: `${base}/about`,
        inLanguage: ['en-US', 'zh-CN'],
        dateModified: today,
        primaryImageOfPage: { '@type': 'ImageObject', url: `${base}/og-image.svg` },
        isPartOf: { '@type': 'WebSite', name: 'CouponSite', url: base },
        about: { '@type': 'Organization', name: 'CouponSite', url: base },
      },
      {
        '@type': 'Organization',
        name: 'CouponSite',
        alternateName: 'Coupon Hub',
        url: base,
        foundingDate: '2026',
        description:
          'Real-time promo code and discount aggregator covering 23 brands across fashion, electronics, travel, beauty, and pet supplies. Bilingual English and Chinese. Verification process: 3-step (source, live, manual QA).',
        knowsAbout: [
          'Coupon codes',
          'Promo codes',
          'Discount codes',
          'Affiliate marketing',
          'Verification methodology',
          'Online shopping deals',
        ],
        sameAs: [
          'https://github.com/czhcl123',
          'https://twitter.com/couponsite_hub',
          'https://www.producthunt.com/products/couponsite',
          'https://en.wikipedia.org/wiki/Coupon_code',
          'https://www.wikidata.org/wiki/Q6514947',
        ],
      },
      {
        '@type': 'FAQPage',
        url: `${base}/about`,
        mainEntity:
          lang === 'zh'
            ? [
                { '@type': 'Question', name: '优惠总动员是什么？', acceptedAnswer: { '@type': 'Answer', text: '优惠总动员是汇总中型品牌的优惠码 / 折扣码聚合站。我们覆盖 23 个品牌、月搜量 50 万+、提供中英双语。' } },
                { '@type': 'Question', name: '本站收益怎么来的？', acceptedAnswer: { '@type': 'Answer', text: '我们与一些品牌有联盟推广合作。当你点击本站跳转链接进入品牌页面后完成购物，品牌会给我们一点佣金，你不会多付。' } },
                { '@type': 'Question', name: '优惠码为什么会失效？', acceptedAnswer: { '@type': 'Answer', text: '品牌方会定期下线优惠码，这很常见。我们后端会每周跱检 已验证的码是否过期，过期码会在 24 小时内下架。' } },
                { '@type': 'Question', name: '能否提交新优惠码？', acceptedAnswer: { '@type': 'Answer', text: '可以。请发邮件到本页联系邮箱，附上优惠码详情（品牌、过期时间、限制）。我们在 24h 内人工验证，上线会回邮件。' } },
                { '@type': 'Question', name: '本站是否收集用户购物记录？', acceptedAnswer: { '@type': 'Answer', text: '不。本站不收集购物记录、身份信息，也不投放跨站追踪。所有站内搜索都是 URL 参数、匿名、不持久化。' } },
                { '@type': 'Question', name: '为什么有时看到不同价格的优惠码？', acceptedAnswer: { '@type': 'Answer', text: '品牌同一时间可能发不同消费门槛的码（例：满 50% 与任意使用）。高使用门槛的码往往折扣更大，被腘赖，跳其他码位置。' } },
              ]
            : [
                { '@type': 'Question', name: 'What is Coupon Hub?', acceptedAnswer: { '@type': 'Answer', text: 'Coupon Hub is a coupon and promo code aggregator for 23 mid-to-large brands across fashion, electronics, travel, and beauty. We publish 500+ verified codes, serve 500,000+ monthly searches, and support bilingual zh/en.' } },
                { '@type': 'Question', name: 'How does Coupon Hub make money?', acceptedAnswer: { '@type': 'Answer', text: 'We have affiliate partnerships with several brands. When you click a link on our site and complete a purchase, the merchant pays us a small commission — at no extra cost to you.' } },
                { '@type': 'Question', name: 'Why do coupon codes expire?', acceptedAnswer: { '@type': 'Answer', text: 'Brands rotate their promotions regularly; expiry is normal. Our backend rechecks codes weekly and removes failing ones within 24 hours.' } },
                { '@type': 'Question', name: 'Can I submit a new coupon code?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Email the address on this page with the code, brand, expiry date, and any restrictions. We verify manually within 24 hours and reply when published.' } },
                { '@type': 'Question', name: 'Does Coupon Hub collect my shopping data?', acceptedAnswer: { '@type': 'Answer', text: 'No. We do not collect purchase history, personally identifiable information, or run cross-site tracking. All on-site search is anonymous URL parameters and is not persisted.' } },
                { '@type': 'Question', name: 'Why do I see multiple coupons with different discounts?', acceptedAnswer: { '@type': 'Answer', text: 'Brands often run several promotions at the same time (e.g. 50% off with code A, free shipping with code B). Higher-discount codes usually have stricter conditions; we surface all of them so you can pick.' } },
              ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutClient initialLang={lang} />
    </>
  )
}