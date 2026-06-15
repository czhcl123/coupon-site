import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ error: 'Admin disabled' }, { status: 503 })
}

export async function POST(_req: NextRequest) {
  return NextResponse.json({ error: 'Admin disabled' }, { status: 503 })
}
