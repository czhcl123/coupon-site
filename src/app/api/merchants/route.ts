import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const merchants = await query(`
      SELECT m.id, m.name, m.slug, m.logo, COUNT(c.id) as couponCount
      FROM Merchant m
      LEFT JOIN Coupon c ON c.merchantId = m.id AND c.status = 'ACTIVE'
      GROUP BY m.id, m.name, m.slug, m.logo
      ORDER BY m.name ASC
    `)

    return NextResponse.json({ merchants })
  } catch (error) {
    console.error('GET /api/merchants error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}