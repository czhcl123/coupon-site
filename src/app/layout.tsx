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
  name: 'CouponSite',
  alternateName: 'Coupon Hub',
  url: 'https://coupon-site-production.up.railway.app',
  description:
    'Real-time promo codes and discounts from Nike, Adidas, ASOS, Amazon, Sephora, Steam, Booking.com and 20+ more top brands across fashion, electronics, travel, and beauty. Updated daily, free to use.',
  inLanguage: ['en-US', 'zh-CN'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate:
        'https://coupon-site-production.up.railway.app/?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    name: 'CouponSite',
    alternateName: 'Coupon Hub',
    url: 'https://coupon-site-production.up.railway.app',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CouponSite',
  alternateName: 'Coupon Hub',
  url: 'https://coupon-site-production.up.railway.app',
  description:
    'CouponSite is a real-time promo code and discount aggregator covering 20+ major brands across fashion, electronics, travel, beauty and pet supplies. Free to use, bilingual zh/en, updated daily.',
  foundingDate: '2026',
  knowsAbout: [
    'Coupon codes',
    'Promo codes',
    'Discount codes',
    'Affiliate marketing',
    'Online shopping deals',
    'Brand promotions',
    'Fashion discounts',
    'Electronics deals',
    'Travel and hotel booking',
    'Beauty and skincare discounts',
  ],
  sameAs: [
    'https://coupon-site-production.up.railway.app',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://coupon-site-production.up.railway.app/about',
    availableLanguage: ['English', 'Chinese'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do affiliate links cost me more when shopping through CouponSite?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All outbound links on CouponSite are affiliate links. You pay exactly the same price as visiting the brand website directly. Brands pay us a small commission via affiliate tracking to support the site.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do coupon codes expire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Each coupon code has an expiry date. We remove expired codes promptly so the homepage only shows working deals.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an account to use coupon codes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All coupon codes are open to all visitors — no signup or login required to view or copy them.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does CouponSite cover international brands?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Nike, Adidas, ASOS, Sephora, Steam, Booking.com and many more international brands are covered. Each coupon card supports bilingual English/Chinese display.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I report an expired coupon code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the contact form on /about. We verify manually and update or remove the code within 24 hours.',
      },
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CouponSite',
  alternateName: 'Coupon Hub',
  url: 'https://coupon-site-production.up.railway.app',
  description:
    'Real-time aggregator of promo codes and discounts from 20+ major brands (Nike, Adidas, ASOS, Amazon, Sephora, Steam, Booking.com, and more) across fashion, electronics, travel, and beauty.',
  applicationCategory: 'ShoppingApplication',
  applicationSubCategory: 'CouponAggregator',
  operatingSystem: 'Any (web browser with JavaScript)',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  inLanguage: ['en-US', 'zh-CN'],
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    '20+ brand promo codes updated daily',
    '5 category filters',
    'Bilingual English and Chinese support',
    'One-click copy coupon codes',
    'Discount calculator',
    'Money-saving blog guides',
    'Per-merchant detail pages',
  ],
  dateModified: '2026-06-30',
  datePublished: '2026-06-01',
  creator: {
    '@type': 'Organization',
    name: 'CouponSite',
    alternateName: 'Coupon Hub',
    url: 'https://coupon-site-production.up.railway.app',
  },
};

export const metadata: Metadata = {
  metadataBase: new URL('https://coupon-site-production.up.railway.app'),
  title: {
    default: 'CouponSite - Verified Promo Codes & Discounts for Top Brands',
    template: '%s | CouponSite',
  },
  description:
    'Real-time promo codes and discounts from Nike, Adidas, ASOS, Amazon, Sephora, Steam, Booking.com and 20+ more top brands. Updated daily, free to use, bilingual zh/en.',
  keywords: [
    'coupon codes',
    'promo codes',
    'discount codes',
    'deals',
    'savings',
    'Nike promo code',
    'Adidas discount',
    'ASOS coupon',
    'Amazon deals',
    'Sephora promo',
    'Steam sale',
    'Booking.com discount',
  ],
  verification: {
    google: 'oAPWO8qwzk1v-FL2aL7ooRVLu9_SYNsOaX-LcHQ0GP4',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'zh_CN',
    url: 'https://coupon-site-production.up.railway.app',
    siteName: 'CouponSite',
    title: 'CouponSite - Verified Promo Codes & Discounts for Top Brands',
    description:
      'Real-time promo codes and discounts from Nike, Adidas, ASOS, Amazon, Sephora, Steam, Booking.com and 20+ more top brands. Updated daily.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CouponSite - Verified Promo Codes & Discounts for Top Brands',
    description:
      'Real-time promo codes from 20+ top brands. Updated daily, free to use.',
  },
  alternates: {
    canonical: 'https://coupon-site-production.up.railway.app',
    languages: {
      'en-US': 'https://coupon-site-production.up.railway.app/?lang=en',
      'zh-CN': 'https://coupon-site-production.up.railway.app/?lang=zh',
      'x-default': 'https://coupon-site-production.up.railway.app/?lang=en',
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly site index" />
        <link rel="alternate" type="application/rss+xml" title="CouponSite RSS Feed" href="/rss.xml" />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {children}
      </body>
    </html>
  );
}