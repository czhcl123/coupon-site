import { SITE_URL } from '@/lib/site'
import { MetadataRoute } from 'next'
import { articles } from '@/data/articles'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL

  const blogUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const merchantSlugs = [
    'nike', 'adidas', 'amazon', 'asos', 'bestbuy', 'booking-com', 'expedia',
    'nordstrom', 'sephora', 'shein', 'steam', 'target', 'temu', 'ulta-beauty', 'walmart',
  ]
  const merchantUrls: MetadataRoute.Sitemap = merchantSlugs.map((slug) => ({
    url: `${base}/merchant/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // 2026-10-28: 联盟审核硬性要求 —— 隐私政策 / 服务条款 / 联系页
    {
      url: `${base}/privacy`,
      lastModified: new Date('2026-10-28'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: new Date('2026-10-28'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date('2026-10-28'),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/discount-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${base}/webflow-promo-code`,
      lastModified: new Date('2026-07-01'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${base}/canva-pro-coupon-code`,
      lastModified: new Date('2026-07-01'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${base}/shopify-discount-code`,
      lastModified: new Date('2026-07-01'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...merchantUrls,
    ...blogUrls,
  ] 
}