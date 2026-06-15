import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const merchants = await query<Record<string, unknown>[]>(
      'SELECT * FROM Merchant WHERE slug = ?',
      [slug]
    )

    if (!merchants.length) {
      return NextResponse.json({ error: 'Merchant not found' }, { status: 404 })
    }

    const merchant = merchants[0]

    const coupons = await query(
      `SELECT c.*, cat.name as category_name, cat.slug as category_slug
       FROM Coupon c
       LEFT JOIN Category cat ON c.categoryId = cat.id
       WHERE c.merchantId = ? AND c.status = 'ACTIVE'
         AND (c.expiresAt IS NULL OR c.expiresAt >= NOW())
       ORDER BY c.isExclusive DESC, c.isVerified DESC, c.clickCount DESC`,
      [merchant.id]
    )

    return NextResponse.json({
      merchant,
      coupons: coupons.map((c: Record<string, unknown>) => ({
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
        category: c.category_name
          ? { name: c.category_name, slug: c.category_slug }
          : null,
      })),
    })
  } catch (error) {
    console.error('GET /api/merchants/[slug] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}