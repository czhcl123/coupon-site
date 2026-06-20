import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const merchants = await query<Record<string, unknown>>(
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
       ORDER BY c.isExclusive DESC, c.isVerified DESC, c.clickCount DESC`,
      [merchant.id]
    )

    return NextResponse.json({ merchant, coupons })
  } catch (error) {
    console.error('GET /api/merchants/[slug] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}