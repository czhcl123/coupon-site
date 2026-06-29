export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
  const base = 'https://coupon-site-production.up.railway.app'
  const now = new Date().toUTCString()

  // Static listing. For real-time coupon updates, see /api/coupons JSON.
  const items = [
    {
      title: '优惠总动员 - 23 个品牌实时优惠券折扣码',
      url: base,
      description: '中文优惠码聚合站:Nike、Adidas、ASOS、Sephora、Steam、Booking.com 等。覆盖时尚服饰、电子产品、旅行酒店、美妆护肤、宠物用品 5 大类。',
      date: now,
    },
    {
      title: '折扣计算器 - 优惠总动员',
      url: `${base}/discount-calculator`,
      description: '输入原价和折扣百分比,自动计算最终价格和节省金额。支持叠加折扣。',
      date: now,
    },
    {
      title: '关于我们 - 优惠总动员',
      url: `${base}/about`,
      description: '了解优惠总动员的使命、数据来源、联盟链接说明和联系方式。',
      date: now,
    },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>优惠总动员 (Coupon Hub)</title>
    <link>${base}</link>
    <description>实时汇总各大品牌的最新优惠券和折扣码。支持中英文双语。</description>
    <language>zh-cn</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${items.map(item => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.date}</pubDate>
      <guid isPermaLink="true">${item.url}</guid>
    </item>`).join('\n')}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800',
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}