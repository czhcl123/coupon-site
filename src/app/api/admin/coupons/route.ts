import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// POST /api/admin/coupons — 创建优惠券
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { code, title, description, discountType, discountValue, minPurchase, expiresAt, merchantId, categoryId, isExclusive } = body

    if (!title || !discountValue || !merchantId) {
      return NextResponse.json({ error: '缺少必填字段' }, { status: 400 })
    }

    const id = `c_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
    await query(
      `INSERT INTO Coupon (id, code, title, description, discountType, discountValue, minPurchase, expiresAt, merchantId, categoryId, isExclusive, isVerified, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, true, 'ACTIVE')`,
      [id, code || null, title, description || null, discountType || 'PERCENT', discountValue, minPurchase || null, expiresAt ? new Date(expiresAt) : null, merchantId, categoryId || null, isExclusive || false]
    )

    return NextResponse.json({ id, message: '创建成功' })
  } catch (error) {
    console.error('POST /api/admin/coupons error:', error)
    return NextResponse.json({ error: '创建失败' }, { status: 500 })
  }
}
