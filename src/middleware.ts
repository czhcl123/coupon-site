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

export function middleware(request: NextRequest) {
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