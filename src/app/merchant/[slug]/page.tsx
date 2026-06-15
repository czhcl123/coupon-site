import { notFound } from 'next/navigation'
import Link from 'next/link'
import { query } from '@/lib/db'

async function getMerchant(slug: string) {
  const merchants = await query<{
    id: string; name: string; slug: string; logo: string | null;
    affiliateUrl: string | null; website: string | null; description: string | null
  }>(
    'SELECT id, name, slug, logo, affiliateUrl, website, description FROM Merchant WHERE slug = ?',
    [slug]
  )
  if (!merchants.length) return null
  const merchant = merchants[0]
  const coupons = await query<Record<string, unknown>>(
    'SELECT id, code, title, description, discountType, discountValue, minPurchase, expiresAt, isExclusive, isVerified, clickCount FROM Coupon WHERE merchantId = ?',
    [merchant.id]
  )
  return { merchant, coupons }
}

async function getAllMerchants() {
  const merchants = await query<{
    id: string; name: string; slug: string; logo: string | null; couponCount: number
  }>(
    `SELECT m.id, m.name, m.slug, m.logo,
      COUNT(c.id) as couponCount
     FROM Merchant m
     LEFT JOIN Coupon c ON c.merchantId = m.id
     GROUP BY m.id, m.name, m.slug, m.logo`
  )
  return merchants
}

type Lang = 'zh' | 'en'

const tr = {
  zh: {
    back: '← 返回首页',
    allCoupons: '全部优惠',
    noCoupons: '暂无优惠券',
    exclusive: '独家',
    verified: '已验证',
    used: '已使用 {n} 次',
    minSpend: '满 ¥{n} 可用',
    claimNow: '立即领取',
    noCode: '无码优惠',
    expiry: '有效期至',
    moreMerchants: '更多商家优惠',
    coupons: '张券',
    visitSite: '访问官网 →',
    footer: '本站所有链接均为联盟链接，购物可能获得佣金支持本站发展',
    switchLang: 'EN',
  },
  en: {
    back: '← Back to Home',
    allCoupons: 'All Coupons',
    noCoupons: 'No coupons available',
    exclusive: 'Exclusive',
    verified: 'Verified',
    used: '{n} used',
    minSpend: 'Min. spend ¥{n}',
    claimNow: 'Claim Now →',
    noCode: 'No code needed',
    expiry: 'Expires',
    moreMerchants: 'More Brands',
    coupons: 'coupons',
    visitSite: 'Visit Site →',
    footer: 'Affiliate links — shopping may earn us a commission.',
    switchLang: '中文',
  },
}

function u(key: keyof typeof tr.en, vars?: Record<string, string | number>, lang?: Lang) {
  const l = lang || 'zh'
  let s = tr[l][key] as string
  if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.replace(`{${k}}`, String(v)) })
  return s
}

// 折扣标签翻译
function trDiscount(discountType: string, discountValue: string, lang: Lang) {
  if (discountType === 'PERCENT') return `-${discountValue}% OFF`
  if (discountType === 'FIXED') return lang === 'zh' ? `¥${discountValue} OFF` : `$${discountValue} OFF`
  if (discountType === 'FREE_SHIP') return lang === 'zh' ? '免运费' : 'Free Shipping'
  if (discountType === 'PERCENT_OFF') return lang === 'zh' ? `低至${discountValue}折` : `Up to ${Math.round((100 - parseInt(discountValue)) / 10) * 10}% off`
  return discountValue
}

// 标题翻译映射（与主页一致）
function trTitle(title: string, lang: Lang) {
  if (lang === 'zh') return title
  const map: Record<string, string> = {
    '会员专享20%OFF': 'Exclusive 20% OFF',
    '满599免运费': 'Free Shipping on ¥599+',
    '新用户首单10%OFF': '10% OFF First Order',
    '季末大促低至5折': 'End of Season Sale — Up to 50% OFF',
    '学生享15%OFF': '15% OFF for Students',
    '满1000减100': 'Spend ¥1000, Save ¥100',
    '指定商品立减50': '¥50 OFF Selected Items',
    '电脑专场最高享8折': 'Electronics Sale — Up to 80% OFF',
    '酒店预订15%OFF': '15% OFF on Hotel Booking',
    '首次预订立减200元': '¥200 OFF First Booking',
    '全站20%OFF': '20% OFF Sitewide',
    '满50免运费': 'Free Shipping on ¥50+',
    'VIP会员25%OFF': 'VIP Members 25% OFF',
    'Prime会员10%OFF': 'Prime Members 10% OFF',
    '电子设备专区8折起': 'Electronics from 20% OFF',
    '图书满100减15': 'Books: ¥100+ Get ¥15 OFF',
    '全站25%OFF': '25% OFF Sitewide',
    '满75免运费': 'Free Shipping on ¥75+',
    '线上购物满100减15': 'Spend ¥100, Get ¥15 OFF',
    '食品杂货最高8折': 'Grocery Deals — Up to 20% OFF',
    '生鲜区10%OFF': '10% OFF Fresh Foods',
    '家居用品20%OFF': '20% OFF Home Goods',
    '满50减10': 'Spend ¥50, Get ¥10 OFF',
    '会员专享30%OFF': 'Members 30% OFF',
    '团购15%OFF': '15% OFF for Teams',
    '指定款5折清仓': 'Clearance — Up to 50% OFF',
    '时尚单品15%OFF': '15% OFF Fashion',
    '机票满1000减50': 'Flights: ¥1000+ Get ¥50 OFF',
    '酒店预订25%OFF': '25% OFF Hotel Booking',
    '春季特卖最高享80%OFF': 'Spring Sale — Up to 80% OFF',
    '冬促25%OFF': 'Winter Sale 25% OFF',
    '新用户15%OFF': 'New Users 15% OFF',
    '满49免运费': 'Free Shipping on ¥49+',
    '全站低至2折': 'All Items from 80% OFF',
    '新用户50%OFF': 'New Users 50% OFF',
    '满99减30': 'Spend ¥99, Get ¥30 OFF',
    '美妆专场3折起': 'Beauty Deals from 70% OFF',
    'Kindle电子书低至5折': 'Kindle Books — Up to 50% OFF',
    '数码好物8折起': 'Electronics from 20% OFF',
    'Prime会员专属10%OFF': 'Prime Members 10% OFF',
    '电子产品专场7折起': 'Electronics Sale — From 30% OFF',
    '新用户首单15%OFF': '15% OFF First Order',
    '时尚服饰热卖中': 'Fashion Deals Hot',
  }
  return map[title] || title
}

export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }) {
  const { slug } = await params
  const sp = await searchParams
  const lang = (sp.lang === 'en' ? 'en' : 'zh') as Lang
  const data = await getMerchant(slug)
  if (!data) return { title: lang === 'zh' ? '商家未找到' : 'Merchant Not Found' }
  const { merchant } = data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coupon.example.com'
  const pageUrl = `${siteUrl}/merchant/${slug}`
  const titles = {
    zh: { title: `${merchant.name}优惠码_${merchant.name}折扣_${merchant.name}最新优惠`, desc: `获取${merchant.name}最新优惠码和折扣信息，${merchant.description || ''}。${data.coupons.length}张优惠券等你来拿。` },
    en: { title: `${merchant.name} Coupons & Discounts`, desc: `Get the latest ${merchant.name} coupons and discounts. ${data.coupons.length} coupons available.` },
  }
  return {
    title: titles[lang].title,
    description: titles[lang].desc,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: titles[lang].title,
      description: titles[lang].desc,
      url: pageUrl,
      siteName: lang === 'zh' ? '优惠百科' : 'Coupon Hub',
      images: merchant.logo ? [{ url: merchant.logo, width: 200, height: 200, alt: merchant.name }] : [],
    },
    twitter: {
      card: 'summary',
      title: titles[lang].title,
      description: titles[lang].desc,
      images: merchant.logo ? [merchant.logo] : [],
    },
  }
}

export default async function MerchantPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }) {
  const { slug } = await params
  const sp = await searchParams
  const lang = (sp.lang === 'en' ? 'en' : 'zh') as Lang

  const [data, allMerchants] = await Promise.all([
    getMerchant(slug),
    getAllMerchants(),
  ])
  if (!data) notFound()

  const { merchant, coupons } = data
  const otherMerchants = allMerchants.filter((m: { slug: string }) => m.slug !== slug)
  const nextLang: Lang = lang === 'zh' ? 'en' : 'zh'

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coupon.example.com'
  const pageUrl = `${siteUrl}/merchant/${slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": merchant.name,
    "description": merchant.description,
    "url": merchant.website,
    "logo": merchant.logo,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* 面包屑 */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link href={`/?lang=${lang}`} className="hover:text-orange-500">{lang === 'zh' ? '首页' : 'Home'}</Link>
            <span>›</span>
            <span className="text-gray-600">{merchant.name}</span>
          </nav>

          <div className="flex items-center justify-between mb-2">
            <Link href={`/?lang=${lang}`} className="text-sm text-gray-400 hover:text-gray-600">
              {u('back', {}, lang)}
            </Link>
            <Link
              href={`/merchant/${slug}?lang=${nextLang}`}
              className="text-sm px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              {u('switchLang', {}, lang)}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {merchant.logo && (
              <img
                src={merchant.logo}
                alt={merchant.name}
                className="w-16 h-16 rounded-lg object-contain"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{merchant.name}</h1>
              <p className="text-gray-500 text-sm mt-1">
                {lang === 'en' && merchant.description
                  ? trTitle(merchant.description, 'en')
                  : merchant.description}
              </p>
            </div>
          </div>
          {merchant.website && (
            <a
              href={merchant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-orange-500 hover:text-orange-600 mt-2 inline-block"
            >
              {u('visitSite', {}, lang)}
            </a>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* 使用教程 */}
        <section className="bg-white rounded-xl p-5 mb-6 border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-3">
            {lang === 'zh' ? '如何使用优惠券' : 'How to Use Coupons'}
          </h2>
          <ol className="text-sm text-gray-500 space-y-1.5">
            <li className="flex gap-2">
              <span className="text-orange-500 font-semibold">①</span>
              <span>{lang === 'zh' ? '点击「立即领取」按钮复制优惠券码' : 'Click "Claim Now" to copy the coupon code'}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-500 font-semibold">②</span>
              <span>{lang === 'zh' ? '跳转到商家官网，选购心仪商品' : 'Shop on the brand website and add items to cart'}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-500 font-semibold">③</span>
              <span>{lang === 'zh' ? '结算时粘贴折扣码，享受优惠' : 'Paste the code at checkout to redeem the discount'}</span>
            </li>
          </ol>
        </section>

        {/* 优惠券统计 */}
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            {u('allCoupons', {}, lang)} ({coupons.length})
          </h2>
          {coupons.filter((c: Record<string, unknown>) => c.isExclusive).length > 0 && (
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
              {coupons.filter((c: Record<string, unknown>) => c.isExclusive).length} {lang === 'zh' ? '张独家优惠' : 'exclusive'}
            </span>
          )}
        </div>

        {coupons.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400">
            {u('noCoupons', {}, lang)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coupons.map((coupon: Record<string, unknown>) => (
              <div key={coupon.id} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full mb-1">
                      {trDiscount(String(coupon.discountType), String(coupon.discountValue), lang)}
                    </span>
                    {coupon.isExclusive && (
                      <span className="inline-block px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full ml-1">
                        {u('exclusive', {}, lang)}
                      </span>
                    )}
                    {coupon.isVerified && (
                      <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full ml-1">
                        {u('verified', {}, lang)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {u('used', { n: Number(coupon.clickCount || 0) }, lang)}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-800 mb-2">
                  {trTitle(String(coupon.title || ''), lang)}
                </h3>
                {coupon.description && (
                  <p className="text-sm text-gray-500 mb-3">
                    {trTitle(String(coupon.description), lang)}
                  </p>
                )}

                {Number(coupon.minPurchase) > 0 && (
                  <p className="text-xs text-gray-400 mb-3">
                    {u('minSpend', { n: coupon.minPurchase }, lang)}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    {coupon.code ? (
                      <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded border border-dashed border-gray-300 text-gray-700">
                        {String(coupon.code)}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">{u('noCode', {}, lang)}</span>
                    )}
                  </div>
                  <a
                    href={`/api/coupons/click?id=${coupon.id}&url=${encodeURIComponent(String(merchant.affiliateUrl || merchant.website || ''))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    {u('claimNow', {}, lang)}
                  </a>
                </div>

                {coupon.expiresAt && (
                  <p className="text-xs text-gray-400 mt-3">
                    {u('expiry', {}, lang)} {new Date(String(coupon.expiresAt)).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {otherMerchants.length > 0 && (
        <section className="mt-12 max-w-6xl mx-auto px-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">{u('moreMerchants', {}, lang)}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {otherMerchants.slice(0, 12).map((m: { id: string; name: string; slug: string; logo: string | null; couponCount: number }) => (
              <Link
                key={m.id}
                href={`/merchant/${m.slug}?lang=${lang}`}
                className="bg-white rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow border border-gray-100"
              >
                {m.logo && (
                  <img src={m.logo} alt={m.name} className="w-10 h-10 rounded object-contain" />
                )}
                <span className="text-sm font-medium text-gray-700 text-center">{m.name}</span>
                <span className="text-xs text-gray-400">{m.couponCount} {u('coupons', {}, lang)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="bg-white border-t border-gray-100 mt-12 py-8 text-center text-sm text-gray-400">
        <p>{u('footer', {}, lang)}</p>
      </footer>
    </div>
  )
}
