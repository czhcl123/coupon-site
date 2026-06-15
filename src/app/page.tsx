import { query } from '@/lib/db'
import HomeClient from '@/components/HomeClient'

async function getInitialData() {
  const [coupons, merchants] = await Promise.all([
    query(`
      SELECT c.*, m.name as merchant_name, m.slug as merchant_slug, m.logo as merchant_logo, m.affiliateUrl as merchant_affiliateUrl,
             cat.name as category_name, cat.slug as category_slug
      FROM Coupon c
      JOIN Merchant m ON c.merchantId = m.id
      LEFT JOIN Category cat ON c.categoryId = cat.id
      WHERE (c.expiresAt IS NULL OR c.expiresAt >= NOW())
      ORDER BY c.isExclusive DESC, c.isVerified DESC, c.clickCount DESC
      LIMIT 30
    `),
    query(`
      SELECT m.id, m.name, m.slug, m.logo, COUNT(c.id) as couponCount
      FROM Merchant m
      LEFT JOIN Coupon c ON c.merchantId = m.id
      GROUP BY m.id, m.name, m.slug, m.logo
      ORDER BY m.name ASC
    `),
  ])

  const formattedCoupons = coupons.map((c: Record<string, unknown>) => ({
    id: c.id,
    code: c.code,
    title: c.title,
    description: c.description,
    discountType: c.discountType,
    discountValue: c.discountValue,
    minPurchase: c.minPurchase,
    expiresAt: c.expiresAt,
    isExclusive: c.isExclusive,
    isVerified: c.isVerified,
    clickCount: c.clickCount,
    merchant: {
      name: c.merchant_name,
      slug: c.merchant_slug,
      logo: c.merchant_logo,
      affiliateUrl: c.merchant_affiliateUrl,
    },
    category: c.category_name ? { name: c.category_name, slug: c.category_slug } : null,
  }))

  return {
    coupons: formattedCoupons,
    merchants: merchants.map((m: Record<string, unknown>) => ({
      id: m.id,
      name: m.name,
      slug: m.slug,
      logo: m.logo,
      couponCount: Number(m.couponCount || 0),
    })),
  }
}

export default async function HomePage() {
  const { coupons, merchants } = await getInitialData()
  return <HomeClient initialCoupons={coupons} initialMerchants={merchants} />
}