import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const merchantSlug = searchParams.get('merchant') || ''
    const categorySlug = searchParams.get('category') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    let sql = `
      SELECT c.*, m.name as merchant_name, m.slug as merchant_slug, m.logo as merchant_logo, m.affiliateUrl as merchant_affiliateUrl,
             cat.name as category_name, cat.slug as category_slug
      FROM Coupon c
      JOIN Merchant m ON c.merchantId = m.id
      LEFT JOIN Category cat ON c.categoryId = cat.id
      WHERE (c.expiresAt IS NULL OR c.expiresAt >= NOW())
    `
    const params: unknown[] = []

    if (search) {
      sql += ` AND (c.title LIKE ? OR c.code LIKE ? OR m.name LIKE ?)`
      const s = `%${search}%`
      params.push(s, s, s)
    }

    if (merchantSlug) {
      sql += ` AND m.slug = ?`
      params.push(merchantSlug)
    }

    if (categorySlug) {
      sql += ` AND cat.slug = ?`
      params.push(categorySlug)
    }

    sql += ` ORDER BY c.isExclusive DESC, c.isVerified DESC, c.clickCount DESC LIMIT ${limit} OFFSET ${offset}`

    const coupons = await query(sql, params)

    // 格式化返回
    const result = coupons.map((c: Record<string, unknown>) => ({
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

    return NextResponse.json({ coupons: result })
  } catch (error) {
    console.error('GET /api/coupons error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { code, title, description, discountType, discountValue, minPurchase, expiresAt, merchantId, categoryId, isExclusive } = body

    if (!title || !discountValue || !merchantId) {
      return NextResponse.json({ error: '缺少必填字段' }, { status: 400 })
    }

    const id = `c_${Date.now()}`
    await query(
      `INSERT INTO Coupon (id, code, title, description, discountType, discountValue, minPurchase, expiresAt, merchantId, categoryId, isExclusive, isVerified)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, true)`,
      [id, code || null, title, description || null, discountType || 'PERCENT', discountValue, minPurchase || null, expiresAt ? new Date(expiresAt) : null, merchantId, categoryId || null, isExclusive || false]
    )

    return NextResponse.json({ id })
  } catch (error) {
    console.error('POST /api/coupons error:', error)
    return NextResponse.json({ error: '创建失败' }, { status: 500 })
  }
}