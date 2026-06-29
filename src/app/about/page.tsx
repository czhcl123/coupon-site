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
        'zh-CN': 'https://coupon-site-production.up.railway.app/about?lang=zh',
        'en-US': 'https://coupon-site-production.up.railway.app/about?lang=en',
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
  return <AboutClient initialLang={lang} />
}