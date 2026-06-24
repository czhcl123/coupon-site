import { MetadataRoute } from 'next'
import { query } from '@/lib/db'
import { articles } from '@/data/articles'

interface MerchantRow {
  slug: string
  updatedAt: string | null
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://coupon-site-production.up.railway.app'

  // 博客 URL
  const blogUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // 商家 URL（从 DB 读取）
  let merchantUrls: MetadataRoute.Sitemap = []
  try {
    const merchants = await query<MerchantRow[]>('SELECT slug, updatedAt FROM Merchant LIMIT 500')
    merchantUrls = merchants.map((m) => ({
      url: `${base}/merchant/${m.slug}`,
      lastModified: m.updatedAt ? new Date(m.updatedAt) : new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))
    // 品牌专属页面（独立 SEO 落地页，优先级更高）
    const brandUrls = merchants.map((m) => ({
      url: `${base}/brand/${m.slug}`,
      lastModified: m.updatedAt ? new Date(m.updatedAt) : new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }))
    return [
      {
        url: base,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${base}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      ...brandUrls,
      ...merchantUrls,
      ...blogUrls,
    ]
  } catch (e) {
    console.error('sitemap: failed to fetch merchants', e)
  }

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...merchantUrls,
    ...blogUrls,
  ]
}
