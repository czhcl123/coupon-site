import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { query } from '@/lib/db'

type Lang = 'zh' | 'en'

const t = {
  zh: {
    siteTitle: '🏷️ 优惠总动员',
    backHome: '← 返回首页',
    allCoupons: '全部优惠',
    verified: '已验证',
    exclusive: '独家',
    minPurchase: '满 ¥{n} 可用',
    copied: '已复制 ✓',
    copyCode: '复制代码',
    goUse: '去使用',
    noCodeHint: '无折扣码·点击跳转领取',
    neverExpire: '长期有效',
    expired: '已过期',
    expireToday: '今日过期',
    expireTomorrow: '明日过期',
    expireInDays: '{n}天后过期',
    peopleUsed: '{n} 人使用',
    noCoupons: '暂无优惠券',
    footer1: '本站所有链接均为联盟链接，购物可能获得佣金支持本站发展',
    footer2: '© 2025 优惠总动员 · 仅供信息分享',
    lang: 'EN',
    switchLang: 'EN',
    fixedOff: '立减 {n} 元',
    freeShipping: '免运费',
    upToOff: '低至 {n} 折',
  },
  en: {
    siteTitle: '🏷️ Coupon Hub',
    backHome: '← Back to Home',
    allCoupons: 'All Coupons',
    verified: 'Verified',
    exclusive: 'Exclusive',
    minPurchase: 'Min. spend ¥{n}',
    copied: 'Copied ✓',
    copyCode: 'Copy Code',
    goUse: 'Go to Use',
    noCodeHint: 'No code needed · Click to claim',
    neverExpire: 'No expiry',
    expired: 'Expired',
    expireToday: 'Expires today',
    expireTomorrow: 'Expires tomorrow',
    expireInDays: 'Expires in {n} days',
    peopleUsed: '{n} used',
    noCoupons: 'No coupons available',
    footer1: 'Affiliate links — shopping may earn us a commission.',
    footer2: '© 2025 Coupon Hub · For information only',
    lang: '中文',
    switchLang: '中文',
    fixedOff: '¥{n} OFF',
    freeShipping: 'Free Shipping',
    upToOff: 'Up to {n} off',
  },
}

function u(key: keyof typeof t.en, lang: Lang) {
  return t[lang][key] as string
}

function uVars(key: keyof typeof t.en, vars: Record<string, string>, lang: Lang) {
  let s = t[lang][key] as string
  Object.entries(vars).forEach(([k, v]) => { s = s.replace(`{${k}}`, v) })
  return s
}

function formatDiscount(discountType: string, discountValue: string, lang: Lang) {
  switch (discountType) {
    case 'PERCENT': return `-${discountValue}%`
    case 'FIXED': return uVars('fixedOff', { n: discountValue }, lang)
    case 'FREE_SHIP': return u('freeShipping', lang)
    case 'PERCENT_OFF': return uVars('upToOff', { n: discountValue }, lang)
    default: return discountValue
  }
}

function formatExpiry(dateStr: string | null, lang: Lang) {
  if (!dateStr) return u('neverExpire', lang)
  const date = new Date(dateStr)
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days < 0) return u('expired', lang)
  if (days === 0) return u('expireToday', lang)
  if (days === 1) return u('expireTomorrow', lang)
  return uVars('expireInDays', { n: String(days) }, lang)
}

function translateTitle(title: string, lang: Lang) {
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
    '满99减30': 'Spend ¥99, Get ¥30 OFF',
  }
  return map[title] || title
}

interface MerchantRow {
  id: string
  name: string
  slug: string
  logo: string | null
  affiliateUrl: string | null
}

interface CouponRow {
  id: string
  code: string | null
  title: string
  description: string | null
  discountType: string
  discountValue: string
  minPurchase: string | null
  expiresAt: string | null
  isExclusive: boolean
  isVerified: boolean
  clickCount: number
  category_name: string | null
  category_slug: string | null
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lang?: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const sp = await searchParams
  const lang = (sp.lang === 'en' ? 'en' : 'zh') as Lang

  const merchants = await query<MerchantRow[]>('SELECT * FROM Merchant WHERE slug = ?', [slug])
  if (!merchants.length) return {}

  const merchant = merchants[0]
  return {
    title: lang === 'zh'
      ? `${merchant.name} 优惠券折扣码 | 优惠总动员`
      : `${merchant.name} Coupon Codes & Deals | Coupon Hub`,
    description: lang === 'zh'
      ? `获取 ${merchant.name} 最新优惠券和折扣码，帮你省钱购物。`
      : `Get the latest ${merchant.name} coupons and discount codes to save on your purchase.`,
    alternates: { canonical: `/merchant/${slug}` },
  }
}

export default async function MerchantPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lang?: string }>
}) {
  const { slug } = await params
  const sp = await searchParams
  const lang = (sp.lang === 'en' ? 'en' : 'zh') as Lang
  const nextLang: Lang = lang === 'zh' ? 'en' : 'zh'

  const merchants = await query<MerchantRow[]>('SELECT * FROM Merchant WHERE slug = ?', [slug])
  if (!merchants.length) notFound()
  const merchant = merchants[0]

  const coupons = await query<CouponRow[]>(
    `SELECT c.*, cat.name as category_name, cat.slug as category_slug
     FROM Coupon c
     LEFT JOIN Category cat ON c.categoryId = cat.id
     WHERE c.merchantId = ? AND c.status = 'ACTIVE'
     ORDER BY c.isExclusive DESC, c.isVerified DESC, c.clickCount DESC`,
    [merchant.id]
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/?lang=${lang}`} className="text-2xl font-bold text-orange-500 hover:text-orange-600">
              {u('siteTitle', lang)}
            </Link>
            <div className="flex items-center gap-3">
              <Link href={`/?lang=${lang}`} className="text-sm text-gray-500 hover:text-orange-500">
                {u('backHome', lang)}
              </Link>
              <Link
                href={`/merchant/${slug}?lang=${nextLang}`}
                className="text-sm px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                {u('switchLang', lang)}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 商家信息 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-4">
            {merchant.logo && (
              <img src={merchant.logo} alt={merchant.name} className="w-12 h-12 rounded-lg object-contain" />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{merchant.name}</h1>
              <p className="text-sm text-gray-400">{u('allCoupons', lang)} · {coupons.length} {lang === 'zh' ? '张' : 'deals'}</p>
            </div>
          </div>
        </div>

        {/* 优惠券列表 */}
        {coupons.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-2">🎫</div>
            <p>{u('noCoupons', lang)}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl font-bold text-orange-500">
                    {formatDiscount(coupon.discountType, coupon.discountValue, lang)}
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 leading-tight">{translateTitle(coupon.title, lang)}</div>
                    {coupon.description && (
                      <div className="text-sm text-gray-400 mt-0.5">{translateTitle(coupon.description, lang)}</div>
                    )}
                  </div>
                </div>

                {coupon.minPurchase && (
                  <div className="text-xs text-gray-400 mb-2">
                    {uVars('minPurchase', { n: coupon.minPurchase }, lang)}
                  </div>
                )}

                {coupon.code ? (
                  <>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 mb-2">
                      <code className="flex-1 font-mono text-sm font-semibold text-gray-700">{coupon.code}</code>
                      <span className="text-xs text-gray-400">{u('copyCode', lang)}</span>
                    </div>
                    {merchant.affiliateUrl && (
                      <a
                        href={merchant.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full text-center text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 px-4 transition-colors"
                      >
                        {u('goUse', lang)}
                      </a>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-xs text-gray-400 mb-2">{u('noCodeHint', lang)}</div>
                    {merchant.affiliateUrl && (
                      <a
                        href={merchant.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full text-center text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 px-4 transition-colors"
                      >
                        {u('goUse', lang)}
                      </a>
                    )}
                  </>
                )}

                <div className="flex items-center justify-between text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">
                  <span>{formatExpiry(coupon.expiresAt, lang)}</span>
                  <span>{uVars('peopleUsed', { n: String(coupon.clickCount) }, lang)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 mt-12 py-8 text-center text-sm text-gray-400">
        <p>{u('footer1', lang)}</p>
        <p className="mt-1">{u('footer2', lang)}</p>
      </footer>
    </div>
  )
}