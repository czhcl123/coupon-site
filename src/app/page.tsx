import { Metadata } from 'next'
import HomePageClient from '@/components/HomePageClient'

export const metadata: Metadata = {
  title: '优惠总动员 | 实时更新各大品牌优惠券折扣码',
  description: '汇集 Nike、Adidas、ASOS、Sephora、Steam 等品牌优惠券折扣码，每日更新，支持中文/英文，帮你网购省钱。',
  keywords: ['优惠券', '折扣码', '优惠', '省钱', 'Nike 折扣码', 'Adidas 优惠', 'ASOS 折扣'],
  openGraph: {
    title: '优惠总动员 | 实时更新各大品牌优惠券折扣码',
    description: '汇集 Nike、Adidas、ASOS、Sephora、Steam 等品牌优惠券折扣码，每日更新，帮您网购省钱。',
    type: 'website',
    locale: 'zh_CN',
  },
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return <HomePageClient />
}
