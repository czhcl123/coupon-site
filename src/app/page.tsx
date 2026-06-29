import { query } from '@/lib/db'
import { Suspense } from 'react'
import HomePageClient, { type Coupon, type Merchant } from './home-page-client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <HomePageClient initialCoupons={coupons} initialMerchants={merchants} />
    </Suspense>
  )
}