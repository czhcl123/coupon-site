import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

// POST /api/coupons/[id]/click — 增加点击计数
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await pool.execute(
      'UPDATE Coupon SET clickCount = clickCount + 1 WHERE id = ?',
      [id]
    )
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
