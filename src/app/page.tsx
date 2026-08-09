import { query } from '@/lib/db'
import { Suspense } from 'react'
import HomePageClient, { type Coupon, type Merchant } from './home-page-client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

import type { Metadata } from 'next'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}): Promise<Metadata> {
  const sp = await searchParams
  const lang = sp.lang === 'en' ? 'en' : 'zh'
  return {
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/',
        'zh-CN': '/',
        'x-default': '/',
      },
    },
  }
}

// SSR: fetch initial coupons and merchants directly from MySQL.
// This ensures the initial HTML response contains real coupon data,
// so AI engines (which don't always execute JavaScript) can see and cite it.
async function fetchInitialData() {
  try {
    const couponRows = await query<Record<string, unknown>>(
      `SELECT c.id, c.code, c.title, c.description, c.discountType, c.discountValue,
              c.minPurchase, c.expiresAt, c.isExclusive, c.isVerified, c.clickCount,
              m.name AS merchant_name, m.slug AS merchant_slug, m.logo AS merchant_logo,
              m.affiliateUrl AS merchant_affiliateUrl,
              cat.name AS category_name, cat.slug AS category_slug
       FROM Coupon c
       JOIN Merchant m ON c.merchantId = m.id
       LEFT JOIN Category cat ON c.categoryId = cat.id
       WHERE c.status = 'ACTIVE'
         AND (c.expiresAt IS NULL OR c.expiresAt >= NOW())
       ORDER BY c.isExclusive DESC, c.isVerified DESC, c.clickCount DESC
       LIMIT 20`
    )

    const merchantRows = await query<Record<string, unknown>>(
      `SELECT m.id, m.name, m.slug, m.logo,
              (SELECT COUNT(*) FROM Coupon c WHERE c.merchantId = m.id AND c.status = 'ACTIVE'
               AND (c.expiresAt IS NULL OR c.expiresAt >= NOW())) AS couponCount
       FROM Merchant m
       ORDER BY couponCount DESC, m.name ASC`
    )

    const coupons: Coupon[] = couponRows.map((c) => ({
      id: String(c.id),
      code: c.code ? String(c.code) : null,
      title: String(c.title),
      description: c.description ? String(c.description) : null,
      discountType: String(c.discountType),
      discountValue: String(c.discountValue),
      minPurchase: c.minPurchase != null ? String(c.minPurchase) : null,
      expiresAt: c.expiresAt ? new Date(c.expiresAt as string | Date).toISOString() : null,
      isExclusive: Boolean(c.isExclusive),
      isVerified: Boolean(c.isVerified),
      clickCount: Number(c.clickCount ?? 0),
      merchant: {
        name: String(c.merchant_name),
        slug: String(c.merchant_slug),
        logo: c.merchant_logo ? String(c.merchant_logo) : null,
        affiliateUrl: c.merchant_affiliateUrl ? String(c.merchant_affiliateUrl) : null,
      },
      category: c.category_name ? { name: String(c.category_name), slug: String(c.category_slug) } : null,
    }))

    const merchants: Merchant[] = merchantRows.map((m) => ({
      id: String(m.id),
      name: String(m.name),
      slug: String(m.slug),
      logo: m.logo ? String(m.logo) : null,
      couponCount: Number(m.couponCount ?? 0),
    }))

    return { coupons, merchants }
  } catch (err) {
    console.error('SSR fetchInitialData error:', err)
    return { coupons: [], merchants: [] }
  }
}

export default async function HomePage() {
  const { coupons, merchants } = await fetchInitialData()

  const base = 'https://coupon-site-production.up.railway.app'
  const today = new Date().toISOString().split('T')[0]
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '50,000+ Monthly Coupon Codes & Promo Codes from 23 Top Brands — Updated Daily',
    description: 'Verified working coupon codes and promo codes from 23 top brands including Nike (500K/mo), Ulta (500K/mo), SHEIN (500K/mo), Target, Walmart, Adidas, Amazon, Booking.com. Updated daily, free to use, bilingual zh/en.',
    image: `${base}/og-image.svg`,
    datePublished: '2026-06-01',
    dateModified: today,
    inLanguage: ['en-US', 'zh-CN'],
    author: {
      '@type': 'Organization',
      name: 'CouponSite',
      url: base,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CouponSite',
      alternateName: 'Coupon Hub',
      url: base,
      logo: {
        '@type': 'ImageObject',
        url: `${base}/favicon.ico`,
        width: 256,
        height: 256,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': base,
    },
    about: [
      { '@type': 'Thing', name: 'Coupon codes' },
      { '@type': 'Thing', name: 'Discount codes' },
      { '@type': 'Thing', name: 'Promo codes' },
      { '@type': 'Thing', name: 'Online shopping deals' },
    ],
    keywords: 'coupon codes, promo codes, discount codes, deals, savings, Nike promo, Adidas discount, ASOS coupon, Amazon deals, Sephora promo, Steam sale, Booking.com discount',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
        <HomePageClient initialCoupons={coupons} initialMerchants={merchants} />
      </Suspense>
    </>
  )
}