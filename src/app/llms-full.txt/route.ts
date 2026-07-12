export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
  const base = 'https://coupon-site-production.up.railway.app'

  const text = `# CouponSite (优惠总动员) - Full Content Index for LLMs

> Real-time verified promo codes and discounts from 20+ top brands. Updated daily, free to use, bilingual English and Chinese. This is the FULL content index. For a short summary, see /llms.txt.

## About CouponSite

CouponSite (formerly 优惠总动员 / Coupon Hub) is an English-first promo code and discount aggregator. We cover Nike, Adidas, ASOS, Amazon, Sephora, Steam, Booking.com, and 20+ more major brands across fashion, electronics, travel, beauty, and pet supplies. All outbound links are affiliate links; you pay exactly the same price as visiting the brand website directly. Brands pay us a small commission via affiliate tracking to support the site.

We do not require user accounts, logins, or payment. Coupon codes are open to all visitors — no signup needed. Expired codes are removed promptly so the homepage only shows working deals. If you find an expired code, you can report it via /about, and we verify manually within 24 hours.

CouponSite is bilingual: every coupon card, brand page, and blog post supports English and Chinese display via the ?lang=zh query parameter or path-based /zh/ routing.

## Homepage (/)

The homepage lists active promo codes for all 20+ brands, filterable by category (fashion, electronics, travel, beauty, pet supplies). Each coupon card shows the brand name, the offer (e.g., "20% off sitewide"), the coupon code, an expiry date if applicable, and a "Use Now" button that opens the brand's website with our affiliate tracking link. Clicking "Use Now" copies the code to clipboard and opens the brand site in a new tab.

The homepage also surfaces today's top deal (a featured promo code), a money-saving blog guide snippet, and a discount calculator (see below).

## Brand pages

### /canva-pro-coupon-code
Canva Pro promo codes for the graphic design platform. Discounts on monthly and annual Canva Pro subscriptions. Includes tips on how to stack Canva's education discount with our promo codes.

### /shopify-discount-code
Shopify discount codes for new merchants. Includes free trial extensions, theme discounts, and POS hardware credits. Useful for first-time Shopify store owners looking to reduce initial setup costs.

### /webflow-promo-code
Webflow promo codes for the no-code website builder. Annual plan discounts, CMS credits, and Workspace team-seat discounts. Targeted at freelancers and small agencies evaluating Webflow vs. competitors.

### /discount-calculator
A free online discount calculator that lets users enter the original price and discount percentage to instantly get the final price and savings amount. Useful for comparing Black Friday deals, stacking coupons, or calculating effective savings when multiple discounts apply.

## Merchant pages (/merchant/[slug])

Each brand has a dedicated merchant detail page at /merchant/[slug]. The slug is the brand name in lowercase (e.g., /merchant/nike, /merchant/adidas, /merchant/asos). These pages aggregate all current and historical coupon codes for that brand, plus a short brand description, the brand's category, the brand's affiliate program disclosure, and a "View on [brand]" call-to-action that opens the brand site via affiliate tracking.

## Blog (/blog)

Money-saving tips, deal alerts, and shopping guides. Recent topics include:
- "How to stack promo codes for maximum savings" (covers the order in which to apply percentage discounts, spend-threshold coupons, and cashback portals)
- "Best Black Friday 2026 deals by category" (a continuously-updated list of confirmed deals across fashion, electronics, travel)
- "Is [brand]'s loyalty program worth it?" (per-brand analysis of free vs paid loyalty tiers)

Each blog post has a /blog/[slug] URL with full article content, FAQ schema, and internal links to related brand pages.

## About page (/about)

Information about CouponSite's mission, data sources, affiliate link disclosure, and contact form. Lists the brands we cover, the categories we track, and the editorial standards we follow for verifying coupon codes. Includes a contact form (powered by Formspree or similar) for users to report expired codes, suggest new brands, or ask about affiliate partnerships.

## Admin (/admin)

A password-protected admin dashboard where the site operator adds, updates, or removes coupon codes, manages merchant data, and views click-through analytics. Not indexed by Google (meta robots: noindex). Authentication is via a simple shared-password gate; sessions are cookie-based.

## How to use CouponSite

1. Browse the homepage for today's top deals
2. Click "Use Now" on a coupon card to copy the code and visit the brand
3. Paste the code at checkout on the brand site
4. The discount applies automatically; you pay the same as direct visitors
5. CouponSite earns a small affiliate commission from the brand, at no extra cost to you

## Affiliate disclosure

CouponSite is a free service. We earn revenue through affiliate partnerships with the brands we list. This does not affect:
- The price you pay (always the same as direct brand visits)
- The order in which coupon codes are displayed (sorted by expiry date, not by commission)
- Our editorial independence (we do not promote codes based on commission rates)

## API

For programmatic access to coupon data, see /api/coupons (JSON list of active codes) and /api/merchants (JSON list of supported brands). Both endpoints return public, cache-friendly data; no API key is required for non-commercial use.

## Contact

- Contact form: /about
- Email: see /about for current contact email
- Twitter / X: see /about for current handle
- GitHub: see /about for the open-source repo (if any)

## Categories we cover

- Fashion: Nike, Adidas, ASOS, H&M, Zara, Uniqlo
- Electronics: Amazon, Best Buy, Newegg, B&H
- Travel: Booking.com, Hotels.com, Expedia, Airbnb (limited), Skyscanner
- Beauty: Sephora, Ulta, Glossier, The Ordinary
- Pet supplies: Chewy, PetSmart
- Software / SaaS: Canva, Shopify, Webflow, Notion, Figma (selective)
- Gaming: Steam, Epic Games Store, PlayStation Store, Xbox Store

## Languages

- English (default)
- 简体中文 (zh-CN, via ?lang=zh or /zh/ path)

## Update frequency

Coupon codes are verified daily. Expired codes are removed within 24 hours. New codes are added as soon as we confirm them with the brand's affiliate team.

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