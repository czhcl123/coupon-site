import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// POST /api/admin/coupons — 创建优惠券
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { code, title, description, discountType, discountValue, minPurchase, expiresAt, merchantId, categoryId, isExclusive } = body

    if (!title || !discountValue || !merchantId) {
      return NextResponse.json({ error: '缺少必填字段' }, { status: 400 })
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: code || null,
        title,
        description: description || null,
        discountType: discountType || 'PERCENT',
        discountValue: discountValue.toString(),
        minPurchase: minPurchase ? parseFloat(minPurchase) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        merchantId,
        categoryId: categoryId || null,
        isExclusive: isExclusive || false,
        isVerified: true,
        status: 'ACTIVE',
      },
    })

    return NextResponse.json({ coupon })
  } catch (error) {
    console.error('POST /api/admin/coupons error:', error)
    return NextResponse.json({ error: '创建失败' }, { status: 500 })
  }
}