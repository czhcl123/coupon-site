import { Metadata } from 'next'
import { Suspense } from 'react'
import DiscountCalculator from '@/components/DiscountCalculator'

type Lang = 'zh' | 'en'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}): Promise<Metadata> {
  const sp = await searchParams
  const lang = (sp.lang === 'en' ? 'en' : 'zh') as Lang

  if (lang === 'en') {
    return {
      title: 'Discount Calculator — Calculate Your Savings | Coupon Hub',
      description: 'Calculate the final price after discount. Supports percentage off, fixed amount, and free shipping calculations.',
      alternates: { canonical: '/discount-calculator' },
    }
  }
  return {
    title: '折扣计算器 — 帮你算清优惠省多少钱 | 优惠总动员',
    description: '计算折扣后实际要付多少钱。支持百分比折扣、固定金额减免、免运费等类型。',
    alternates: { canonical: '/discount-calculator' },
  }
}

export default async function DiscountCalculatorPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = (sp.lang === 'en' ? 'en' : 'zh') as Lang
  const nextLang: Lang = lang === 'zh' ? 'en' : 'zh'

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <DiscountCalculator lang={lang} nextLang={nextLang} />
    </Suspense>
  )
}
