import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '优惠总动员',
  alternateName: 'Coupon Hub',
  url: 'https://coupon-site-production.up.railway.app',
  description: '中文优惠码聚合站:实时汇总 Nike、Adidas、ASOS、Sephora、Steam、Booking.com 等 23 个品牌的最新优惠券和折扣码,覆盖时尚服饰、电子产品、旅行酒店、美妆护肤、宠物用品 5 大类。支持中英文双语,每日更新。',
  inLanguage: ['zh-CN', 'en-US'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://coupon-site-production.up.railway.app/?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    name: '优惠总动员',
    alternateName: 'Coupon Hub',
    url: 'https://coupon-site-production.up.railway.app',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '优惠总动员',
  alternateName: 'Coupon Hub',
  url: 'https://coupon-site-production.up.railway.app',
  description: '中文为主的优惠码聚合站,实时汇总各大品牌最新优惠券和折扣码,支持中英文双语。',
  foundingDate: '2026',
  knowsAbout: [
    '优惠券聚合',
    '折扣码',
    '省钱攻略',
    'Affiliate marketing',
    '在线购物',
    '品牌促销',
    '时尚服饰优惠',
    '电子产品折扣',
    '旅行酒店预订',
    '美妆护肤优惠',
  ],
  sameAs: [
    'https://coupon-site-production.up.railway.app',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://coupon-site-production.up.railway.app/about',
    availableLanguage: ['Chinese', 'English'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '优惠总动员',
  alternateName: 'Coupon Hub',
  url: 'https://coupon-site-production.up.railway.app',
  description: '实时汇总 23 个品牌(Nike、Adidas、ASOS、Sephora、Steam、Booking.com 等)的最新优惠券和折扣码,覆盖时尚服饰、电子产品、旅行酒店、美妆护肤、宠物用品 5 大类。',
  applicationCategory: 'ShoppingApplication',
  applicationSubCategory: 'CouponAggregator',
  operatingSystem: 'Any (web browser with JavaScript)',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  inLanguage: ['zh-CN', 'en-US'],
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    '23 个品牌商家实时优惠码',
    '5 大品类分类筛选',
    '中英文双语支持',
    '一键复制优惠码',
    '折扣计算器',
    '博客省钱攻略',
    '商家详情页',
  ],
  dateModified: '2026-06-29',
  datePublished: '2026-06-01',
  creator: {
    '@type': 'Organization',
    name: '优惠总动员',
    alternateName: 'Coupon Hub',
    url: 'https://coupon-site-production.up.railway.app',
  },
};

export const metadata: Metadata = {
  metadataBase: new URL('https://coupon-site-production.up.railway.app'),
  title: {
    default: '优惠总动员 - 精选商家优惠券/折扣码大全',
    template: '%s | 优惠总动员',
  },
  description: '汇聚 Amazon、Temu、Shein、Nike、Adidas 等知名品牌最新优惠券折扣码，无码优惠实时更新，新用户专享优惠全覆盖。',
  keywords: ['优惠券', '折扣码', '优惠', '省钱', 'Nike 折扣码', 'Adidas 优惠', 'ASOS 折扣'],
  verification: {
    google: 'oAPWO8qwzk1v-FL2aL7ooRVLu9_SYNsOaX-LcHQ0GP4',
    other: {
      'baidu-site-verification': 'codeva-9jQsD8xFZl',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    url: 'https://coupon-site-production.up.railway.app',
    siteName: '优惠总动员',
    title: '优惠总动员 - 精选商家优惠券/折扣码大全',
    description: '汇聚各大品牌最新优惠券，无码优惠实时更新',
  },
  twitter: {
    card: 'summary_large_image',
    title: '优惠总动员 - 精选商家优惠券折扣码大全',
    description: '汇聚各大品牌最新优惠券，无码优惠实时更新',
  },
  alternates: {
    canonical: 'https://coupon-site-production.up.railway.app',
    languages: {
      'zh-CN': 'https://coupon-site-production.up.railway.app/?lang=zh',
      'en-US': 'https://coupon-site-production.up.railway.app/?lang=en',
      'x-default': 'https://coupon-site-production.up.railway.app',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly site index" />
        <link rel="alternate" type="application/rss+xml" title="优惠总动员 RSS Feed" href="/rss.xml" />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        {children}
      </body>
    </html>
  );
}