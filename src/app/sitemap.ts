import { MetadataRoute } from 'next'
import { articles } from '@/data/articles'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://coupon-site-production.up.railway.app'

  const blogUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
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
    ...blogUrls,
  ]   
}