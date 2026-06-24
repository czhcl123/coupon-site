'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'

interface Coupon {
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
  merchant: {
    name: string
    slug: string
    logo: string | null
    affiliateUrl: string | null
  }
  category: { name: string; slug: string } | null
}

interface Merchant {
  id: string
  name: string
  slug: string
  logo: string | null
  couponCount: number
}

type Lang = 'zh' | 'en'

const t = {
  zh: {
    title: '🏷️ 优惠总动员',
    searchPlaceholder: '搜索商家或优惠券...',
    allMerchants: '所有商家',
    allCategories: '全部分类',
    coupons: '张',
    fashion: '时尚服饰',
    electronics: '电子产品',
    travel: '旅行酒店',
    beauty: '美妆护肤',
    food: '食品生鲜',
    loadError: '加载失败，请刷新重试',
    noResult: '没有找到相关优惠券，换个关键词试试',
    hotSearch: '热门：',
    verified: '已验证',
    exclusive: '独家',
    minPurchase: '满 ¥{n} 可用',
    copied: '已复制 ✓',
    copyCode: '复制代码',
    noCodeHint: '无折扣码·点击跳转领取',
    useNow: '去使用 →',
    neverExpire: '长期有效',
    expired: '已过期',
    expireToday: '今日过期',
    expireTomorrow: '明日过期',
    expireInDays: '{n}天后过期',
    peopleUsed: '{n} 人使用',
    fixedOff: '立减 {n} 元',
    freeShipping: '免运费',
    upToOff: '低至 {n} 折',
    footer1: '通过本站链接前往购物，我们可能会获得少许合作佣金，这不会增加您的任何购买成本，感谢支持！',
    footer2: '© {y} 优惠总动员 · 仅供信息分享',
    lang: 'EN',
    blog: '博客攻略',
    discountCalculator: '折扣计算器',
    admin: '管理后台',
  },
  en: {
    title: '🏷️ Coupon Hub',
    searchPlaceholder: 'Search brands or coupons...',
    allMerchants: 'All Brands',
    allCategories: 'All Categories',
    coupons: 'deals',
    fashion: 'Fashion',
    electronics: 'Electronics',
    travel: 'Travel & Hotel',
    beauty: 'Beauty',
    food: 'Food & Fresh',
    loadError: 'Failed to load. Please refresh.',
    noResult: 'No coupons found. Try a different keyword.',
    hotSearch: 'Hot:',
    verified: 'Verified',
    exclusive: 'Exclusive',
    minPurchase: 'Min. spend ¥{n}',
    copied: 'Copied ✓',
    copyCode: 'Copy Code',
    noCodeHint: 'No code needed · Click to claim',
    useNow: 'Use Now →',
    neverExpire: 'No expiry',
    expired: 'Expired',
    expireToday: 'Expires today',
    expireTomorrow: 'Expires tomorrow',
    expireInDays: 'Expires in {n} days',
    peopleUsed: '{n} used',
    fixedOff: '¥{n} OFF',
    freeShipping: 'Free Shipping',
    upToOff: 'Up to {n} off',
    footer1: 'We may earn a small affiliate commission when you shop through our links — at no extra cost to you. Thanks for your support!',
    footer2: '© {y} Coupon Hub · For information only',
    lang: '中文',
    blog: 'Blog',
    discountCalculator: 'Calculator',
    admin: 'Admin',
  },
}

function u(key: keyof typeof t.en, vars?: Record<string, string | number>) {
  const lang = getLang()
  let s = t[lang][key] as string
  if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.replace(`{${k}}`, String(v)) })
  return s
}

function getLang(): Lang {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    return (params.get('lang') === 'en' ? 'en' : 'zh') as Lang
  }
  return 'zh'
}

function translateTitle(title: string) {
  const lang = getLang()
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

function formatDiscount(coupon: Coupon) {
  const lang = getLang()
  switch (coupon.discountType) {
    case 'PERCENT': return `-${coupon.discountValue}%`
    case 'FIXED': return u('fixedOff', { n: coupon.discountValue })
    case 'FREE_SHIP': return u('freeShipping')
    case 'PERCENT_OFF': return u('upToOff', { n: coupon.discountValue })
    default: return coupon.discountValue
  }
}

function formatExpiry(dateStr: string | null) {
  if (!dateStr) return u('neverExpire')
  const date = new Date(dateStr)
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const shortDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  if (days < 0) return u('expired')
  if (days === 0) return u('expireToday') + ` (${shortDate})`
  if (days <= 7) return u('expireInDays', { n: days }) + ` (${shortDate})`
  return `有效期至 ${shortDate}`
}

export default function HomePageClient() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [search, setSearch] = useState('')
  const [selectedMerchant, setSelectedMerchant] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lang, setLang] = useState<Lang>('zh')

  // Sync lang from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setLang(params.get('lang') === 'en' ? 'en' : 'zh')
  }, [])

  function fetchData() {
    const langParam = new URLSearchParams(window.location.search).get('lang') || 'zh'
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (selectedMerchant) params.set('merchant', selectedMerchant)
    if (selectedCategory) params.set('category', selectedCategory)

    Promise.all([
      fetch(`/api/coupons?${params}`),
      fetch('/api/merchants'),
    ]).then(async ([couponsRes, merchantsRes]) => {
      const couponsData = await couponsRes.json()
      const merchantsData = await merchantsRes.json()
      setCoupons(couponsData.coupons || [])
      setMerchants(merchantsData.merchants || [])
    }).catch(() => {
      setError(u('loadError'))
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchData()
  }, [search, selectedMerchant, selectedCategory])

  function copyCode(code: string, couponId: string, affiliateUrl?: string | null) {
    navigator.clipboard.writeText(code)
    setCopied(couponId)
    fetch(`/api/coupons/click?id=${couponId}`, { method: 'POST' })
    if (affiliateUrl) {
      setTimeout(() => { window.open(affiliateUrl, '_blank', 'noopener,noreferrer') }, 300)
    }
    setTimeout(() => setCopied(null), 3000)
  }

  const handleLangSwitch = () => {
    const nextLang = lang === 'zh' ? 'en' : 'zh'
    const url = new URL(window.location.href)
    url.searchParams.set('lang', nextLang)
    window.location.href = url.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-orange-500">{t[lang].title}</h1>
            <div className="flex items-center gap-4">
              <a href={`/blog?lang=${lang}`} className="text-sm text-gray-400 hover:text-gray-600">{t[lang].blog}</a>
              <button
                onClick={handleLangSwitch}
                className="text-sm px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                {t[lang].lang}
              </button>
              <a href={`/discount-calculator?lang=${lang}`} className="text-sm px-3 py-1 bg-orange-100 text-orange-500 rounded-full hover:bg-orange-200 transition-colors font-medium">
                {t[lang].discountCalculator}
              </a>
              <a href={`/admin?lang=${lang}`} className="text-sm text-gray-400 hover:text-gray-600">
                {t[lang].admin}
              </a>
            </div>
          </div>

          {/* 搜索栏 */}
          <div className="flex gap-3 flex-wrap">
            <input
              type="text"
              placeholder={t[lang].searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <select
              value={selectedMerchant}
              onChange={(e) => setSelectedMerchant(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">{t[lang].allMerchants}</option>
              {merchants.map((m) => (
                <option key={m.id} value={m.slug}>{m.name} ({m.couponCount} {t[lang].coupons})</option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">{t[lang].allCategories}</option>
              <option value="fashion">{t[lang].fashion}</option>
              <option value="electronics">{t[lang].electronics}</option>
              <option value="travel">{t[lang].travel}</option>
              <option value="beauty">{t[lang].beauty}</option>
              <option value="food">{t[lang].food}</option>
            </select>
          </div>
          {/* 热门搜索 */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-xs text-gray-400">{t[lang].hotSearch}</span>
            {['Nike', 'Adidas', 'ASOS', 'Sephora', 'Shein', 'Udemy'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearch(tag)}
                className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-orange-100 hover:text-orange-600 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">{error}</div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-5 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : coupons.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-2">🔍</div>
            <p>{t[lang].noResult}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                {/* 商家行 */}
                <div className="flex items-center gap-2 mb-3">
                  {coupon.merchant.logo && (
                    <img
                      src={coupon.merchant.logo}
                      alt={coupon.merchant.name}
                      className="w-5 h-5 rounded"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  )}
                  <Link href={`/merchant/${coupon.merchant.slug}?lang=${lang}`} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
                    {coupon.merchant.name}
                  </Link>
                  {coupon.isVerified && (
                    <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full">{t[lang].verified}</span>
                  )}
                  {coupon.isExclusive && (
                    <span className="text-xs bg-orange-100 text-orange-500 px-1.5 py-0.5 rounded-full">{t[lang].exclusive}</span>
                  )}
                </div>

                {/* 折扣标签 */}
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl font-bold text-orange-500">
                    {formatDiscount(coupon)}
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 leading-tight">{translateTitle(coupon.title)}</div>
                    {coupon.description && (
                      <div className="text-sm text-gray-400 mt-0.5">{translateTitle(coupon.description)}</div>
                    )}
                  </div>
                </div>

                {/* 最低消费 */}
                {coupon.minPurchase && (
                  <div className="text-xs text-gray-400 mb-2">
                    {u('minPurchase', { n: coupon.minPurchase })}
                  </div>
                )}

                {/* 折扣码 */}
                {coupon.code ? (
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 mb-3">
                    <code className="flex-1 font-mono text-sm font-semibold text-gray-700 truncate">{coupon.code}</code>
                    <button
                      onClick={() => copyCode(coupon.code!, coupon.id, coupon.merchant.affiliateUrl)}
                      className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 min-w-[80px] justify-center ${
                        copied === coupon.id
                          ? 'bg-green-500 text-white shadow-sm'
                          : 'bg-orange-500 text-white hover:bg-orange-600 active:scale-95'
                      }`}
                    >
                      {copied === coupon.id ? (
                        <><span>✓</span> {t[lang].copied}</>
                      ) : (
                        <><span>📋</span> {t[lang].copyCode}</>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="mb-3" />
                )}

                {/* 去使用按钮（描边次要样式） */}
                {coupon.merchant.affiliateUrl && (
                  <a
                    href={coupon.merchant.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center text-sm border-2 border-orange-400 text-orange-500 rounded-lg py-2 px-4 transition-colors hover:bg-orange-50 font-medium mb-2"
                  >
                    {t[lang].useNow}
                  </a>
                )}

                {/* 底部信息（收进卡片内部，右下角） */}
                <div className="flex items-center justify-end gap-3 text-xs text-gray-400 mt-1">
                  <span>{formatExpiry(coupon.expiresAt)}</span>
                  <span>{u('peopleUsed', { n: coupon.clickCount })}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-100 mt-12 py-8 text-center text-xs text-gray-400">
        <p className="max-w-md mx-auto leading-relaxed">{u('footer1')}</p>
        <p className="mt-2">{u('footer2', { y: new Date().getFullYear() })}</p>
      </footer>
    </div>
  )
}
