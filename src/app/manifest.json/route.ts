export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
  const base = 'https://coupon-site-production.up.railway.app'
  const manifest = {
    name: 'CouponSite - Verified Promo Codes & Discounts',
    short_name: 'CouponSite',
    description: 'Real-time promo codes and discounts from Nike, Adidas, ASOS, Amazon, Sephora, Steam, Booking.com and 20+ more top brands. Updated daily, free to use, bilingual zh/en.',
    start_url: `${base}/`,
    scope: `${base}/`,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#f97316',
    orientation: 'portrait',
    lang: 'en',
    dir: 'ltr',
    icons: [
      {
        src: `${base}/favicon.ico`,
        sizes: '256x256',
        type: 'image/x-icon',
        purpose: 'any',
      },
      {
        src: `${base}/apple-touch-icon.png`,
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    categories: ['shopping', 'finance', 'utilities'],
    prefer_related_applications: false,
  }

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}