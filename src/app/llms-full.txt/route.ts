import { SITE_URL } from '@/lib/site'
export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
  const base = SITE_URL

  const text = `# CouponSite (优惠总动员 / Coupon Hub) - Full Content Index for LLMs

> Promo code and official sale page aggregator covering 15 brands across 4 categories. Free to use, bilingual English and Chinese. This is the FULL content index. For a short summary, see /llms.txt.

## About CouponSite

CouponSite (formerly 优惠总动员 / Coupon Hub) is an English-first promo code and discount aggregator. We cover 15 brands across four categories: fashion, electronics, travel, and beauty. The brands are Nike, Adidas, ASOS, Amazon, Best Buy, Target, Walmart, Steam, Sephora, Ulta Beauty, Nordstrom, SHEIN, Temu, Booking.com, and Expedia.

Some outbound links to brands are affiliate links; you pay exactly the same price as visiting the brand website directly. Brands may pay us a commission via affiliate tracking to support the site.

We do not require user accounts, logins, or payment. Everything is open to all visitors. Promotions are manually reviewed before publication, and ended entries are removed promptly. If you find an entry that no longer works, please report it on the /contact page and we will check it.

CouponSite is bilingual: coupon cards, brand pages, and legal pages are available in English (default) and Simplified Chinese via the ?lang=zh query parameter.

## Homepage (/)

The homepage lists the current entries for all 15 brands, filterable by category (fashion, electronics, travel, beauty) and searchable by brand or keyword. Each card shows the brand name, the offer type, the coupon code when one exists, and a "Use Now" button that opens the brand's official page. Where a brand runs a promotion without a fixed code, the card is marked "Always updated on the official site" and links to the brand's official sale page instead of claiming a specific percentage.

The homepage also links to the discount calculator, the blog, and the brand directory in the footer.

## Brand pages (/merchant/[slug])

Each of the 15 brands has a merchant detail page at /merchant/[slug], where the slug is the brand name in lowercase (for example /merchant/nike, /merchant/adidas, /merchant/asos). These pages list that brand's current entries, carry the brand's category, an affiliate disclosure, and a call-to-action that opens the brand's official page. Each page also carries a per-brand editorial guide covering how that brand's sales work.

## Tool pages

### /canva-pro-coupon-code
Canva Pro coupon information for the graphic design platform, including how Canva's own education discount interacts with third-party offers.

### /shopify-discount-code
Shopify discount information for new merchants, covering trial extensions, theme discounts, and POS hardware credits.

### /webflow-promo-code
Webflow coupon information for the no-code website builder, covering annual plan discounts, CMS credits, and team-seat pricing.

### /discount-calculator
A free discount calculator: enter a price and a discount percentage to get the final price and the amount saved. Useful for comparing sale prices and checking effective savings when discounts stack.

## Blog (/blog)

Money-saving tips, deal calendars, and brand-by-brand guides. Posts cover topics such as how to stack promo codes, seasonal sale calendars (Black Friday, Prime Day, Steam seasonal sales), and how each brand's loyalty programme works. Each post has a /blog/[slug] URL with the full article, FAQ structured data, and internal links to related brand pages.

## About page (/about)

Our mission, where the entries come from, the affiliate disclosure, the privacy summary, the editorial standards we apply before publishing, and the contact email.

## Legal pages

- /privacy — Privacy Policy: what is collected (nothing beyond standard server logs), what is not collected, how affiliate networks use cookies, and how to contact us.
- /terms — Terms of Use: what the site is and is not, accuracy of offers and prices, no warranty, limitation of liability, acceptable use, and governing law.
- /contact — Contact page: report an expired or incorrect code, submit a promotion, request a brand, or make a privacy request. Email: czhcl@hotmail.com

## Admin (/admin)

An operator dashboard where the site owner adds and removes entries and manages brand data. It is excluded from search engines (meta robots: noindex) and requires a token to perform any write. It is not linked from public navigation and is not part of the public site.

## How to use CouponSite

1. Browse the homepage for current entries, or jump to a brand page
2. If a code is shown, copy it; if the entry points to an official sale page, open it
3. Paste the code at checkout on the brand's site (when a code is shown)
4. The discount applies if it is still valid; you pay the same as a direct visitor
5. CouponSite may earn a small affiliate commission from the brand, at no extra cost to you

## Affiliate disclosure

CouponSite is a free service. We earn revenue through affiliate partnerships with some of the brands we list. This does not affect:
- The price you pay (always the same as a direct brand visit)
- The order in which entries are displayed
- Our editorial independence (we do not promote an offer based on its commission rate)

## API

For programmatic access, see /api/coupons (JSON list of active entries) and /api/merchants (JSON list of brands). Both endpoints return public data and require no API key.

## Categories we cover

- Fashion: Nike, Adidas, ASOS, SHEIN, Nordstrom, Temu
- Electronics: Amazon, Best Buy, Target, Walmart, Steam
- Travel: Booking.com, Expedia
- Beauty: Sephora, Ulta Beauty

## Languages

- English (default)
- 简体中文 (zh-CN, via ?lang=zh)

## Update frequency

Entries are reviewed manually. Ended promotions are removed promptly, and where a brand runs a standing promotion without a fixed code, the page links to the official sale page and says so rather than showing a date.

## Last updated

${new Date().toISOString().split('T')[0]}
`

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
