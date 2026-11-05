import { NextRequest, NextResponse } from 'next/server'

// Map ?lang= query to BCP-47 code.
// We do NOT redirect or rewrite — we only inject a request header
// that the root layout reads via headers() to set <html lang>.
// This is intentionally minimal to avoid re-triggering Ahrefs health-score
// fluctuations from URL/redirect changes.
//
// 2026-10-27: this header is LIVE code (middleware writes it, layout.tsx reads
// it via `await headers()` and sets <html lang>). An experiment briefly removed
// it while probing for static prerendering; that was reverted because a
// controlled A/B proved `generateMetadata` + `searchParams` is the real
// prerender blocker, so the header read was never the cause.
const LANG_MAP: Record<string, string> = {
  en: 'en',
  zh: 'zh-CN',
  id: 'id',
  ja: 'ja',
  ar: 'ar',
  pt: 'pt-BR',
}

// 2026-11-05: the old Railway hostname was deleted with the old project on
// 2026-10-24, so its 39 indexed URLs returned 404 with no redirect at all.
// Railway restored the hostname today (the service domain was renamed back
// from coupon-site-production-3b67 to coupon-site-production). It now serves
// 200, but the canonical domain is coupons.getpracticaltools.com — so the old
// hostname must 301 across, keeping path and query, or we ship a duplicate
// site on a second hostname.
//
// nextUrl.hostname is unreliable behind Railway's reverse proxy, so read the
// Host header instead (same reason as the host-based checks elsewhere).
const CANONICAL_ORIGIN = 'https://coupons.getpracticaltools.com'
const LEGACY_HOSTS = ['coupon-site-production.up.railway.app']

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') ?? '').split(':')[0].toLowerCase()
  if (LEGACY_HOSTS.includes(host)) {
    const target = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      CANONICAL_ORIGIN,
    )
    // English is the default language, so ?lang=en is dropped on the way
    // across — otherwise every legacy link would cost two hops (host, then
    // the lang cleanup below on the canonical host).
    if (target.searchParams.get('lang') === 'en') {
      target.searchParams.delete('lang')
    }
    return NextResponse.redirect(target, 301)
  }

  const lang = request.nextUrl.searchParams.get('lang') ?? ''
  const bcp47 = LANG_MAP[lang]
  if (!bcp47) return NextResponse.next()

  // 301 redirect ?lang=en to clean URL (English is the default)
  // Prevents Google from indexing duplicate URLs and diluting authority
  if (lang === 'en') {
    const url = request.nextUrl.clone()
    url.searchParams.delete('lang')
    return NextResponse.redirect(url, 301)
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-html-lang', bcp47)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  // Skip static assets and API to keep middleware cheap.
  matcher: ['/((?!_next/|api/|.*\\..*).*)'],
}