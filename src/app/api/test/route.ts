import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const dns = await fetch('https://www.google.com', { signal: AbortSignal.timeout(5000) })
    return NextResponse.json({ ok: true, status: dns.status })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ ok: false, error: msg })
  }
}
