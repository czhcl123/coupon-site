'use client'

import Link from 'next/link'
import { useState } from 'react'

type Lang = 'zh' | 'en'

const t = {
  zh: {
    title: '🏷️ 优惠总动员',
    admin: '管理后台',
    searchPlaceholder: '搜索商家或优惠券...',
    allMerchants: '所有商家',
    allCategories: '全部分类',
    fashion: '时尚服饰',
    electronics: '电子产品',
    travel: '旅行酒店',
    beauty: '美妆护肤',
    food: '食品生鲜',
    loadError: '加载失败，请刷新重试',
    noResult: '没有找到相关优惠券，换个关键词试试',
    verified: '已验证',
    exclusive: '独家',
    minPurchase: '满 ¥{n} 可用',
    copied: '已复制 ✓',
    copyCode: '复制代码',
    noCodeHint: '无折扣码·点击下方按钮跳转',
    useNow: '去使用 →',
    neverExpire: '长期有效',
    expired: '已过期',
    expireToday: '今日过期',
    expireTomorrow: '明日过期',
    expireInDays: '{n}天后过期',
    peopleUsed: '{n} 人使用',
    footer1: '本站所有链接均为联盟链接，购物可能获得佣金支持本站发展',
    footer2: '© 2025 优惠总动员 · 仅供信息分享',
    lang: 'EN',
  },
  en: {
    title: '🏷️ Coupon Hub',
    admin: 'Admin',
    searchPlaceholder: 'Search brands or coupons...',
    allMerchants: 'All Brands',
    allCategories: 'All Categories',
    fashion: 'Fashion',
    electronics: 'Electronics',
    travel: 'Travel & Hotel',
    beauty: 'Beauty',
    food: 'Food & Fresh',
    loadError: 'Failed to load. Please refresh.',
    noResult: 'No coupons found. Try a different keyword.',
    verified: 'Verified',
    exclusive: 'Exclusive',
    minPurchase: 'Min. spend ¥{n}',
    copied: 'Copied ✓',
    copyCode: 'Copy Code',
    noCodeHint: 'No code needed · Click button below to shop',
    useNow: 'Use Now →',
    neverExpire: 'No expiry',
    expired: 'Expired',
    expireToday: 'Expires today',
    expireTomorrow: 'Expires tomorrow',
    expireInDays: 'Expires in {n} days',
    peopleUsed: '{n} used',
    footer1: 'Affiliate links — shopping may earn us a commission.',
    footer2: '© 2025 Coupon Hub · For information only',
    lang: '中文',
  },
}

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

interface Props {
  initialCoupons: Coupon[]
  initialMerchants: Merchant[]
}

export default function HomeClient({ initialCoupons, initialMerchants }: Props) {
  const [lang, setLang] = useState<Lang>('zh')
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons)
  const [merchants] = useState<Merchant[]>(initialMerchants)
  const [search, setSearch] = useState('')
  const [selectedMerchant, setSelectedMerchant] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const u = (key: keyof typeof t.en, vars?: Record<string, string | number>) => {
    let s = t[lang][key] as string
    if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.replace(`{${k}}`, String(v)) })
    return s
  }

  async function fetchData() {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (selectedMerchant) params.set('merchant', selectedMerchant)
      if (selectedCategory) params.set('category', selectedCategory)

      const res = await fetch(`/api/coupons?${params}`)
      const data = await res.json()
      setCoupons(data.coupons || [])
      setError(null)
    } catch (e) {
      setError(u('loadError'))
    } finally {
      setLoading(false)
    }
  }

  function translateTitle(title: string) {
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
      '全站20%OFF': '20% OFF Sitewide',
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

  function formatDiscount(coupon: Coupon) {
    switch (coupon.discountType) {
      case 'PERCENT': return `-${coupon.discountValue}%`
      case 'FIXED': return lang === 'zh' ? `¥${coupon.discountValue} OFF` : `$${coupon.discountValue} OFF`
      case 'FREE_SHIP': return lang === 'zh' ? '免运费' : 'Free Shipping'
      case 'PERCENT_OFF': return lang === 'zh' ? `低至${coupon.discountValue}折` : `Up to ${Math.round((100 - parseInt(coupon.discountValue)) / 10) * 10}% off`
      default: return coupon.discountValue
    }
  }

  function formatExpiry(dateStr: string | null) {
    if (!dateStr) return u('neverExpire')
    const date = new Date(dateStr)
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days < 0) return u('expired')
    if (days === 0) return u('expireToday')
    if (days === 1) return u('expireTomorrow')
    return u('expireInDays', { n: days })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-orange-500">{u('title')}</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
                className="text-sm px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                {u('lang')}
              </button>
              <a href="/admin" className="text-sm text-gray-400 hover:text-gray-600">
                {u('admin')}
              </a>
              <a href="/discount-calculator" className="text-sm px-3 py-1 bg-orange-100 text-orange-500 rounded-full hover:bg-orange-200 transition-colors font-medium">
                折扣计算器
              </a>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <input
              type="text"
              placeholder={u('searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <select
              value={selectedMerchant}
              onChange={(e) => setSelectedMerchant(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">{u('allMerchants')}</option>
              {merchants.map((m) => (
                <option key={m.id} value={m.slug}>{m.name} ({m.couponCount})</option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">{u('allCategories')}</option>
              <option value="fashion">{u('fashion')}</option>
              <option value="electronics">{u('electronics')}</option>
              <option value="travel">{u('travel')}</option>
              <option value="beauty">{u('beauty')}</option>
              <option value="food">{u('food')}</option>
            </select>
          </div>
        </div>
      </header>

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
            <p>{u('noResult')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-3">
                  {coupon.merchant.logo && (
                    <img
                      src={coupon.merchant.logo}
                      alt={coupon.merchant.name}
                      className="w-5 h-5 rounded"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  )}
                  <Link
                    href={`/merchant/${coupon.merchant.slug}?lang=${lang}`}
                    className="text-sm text-gray-500 hover:text-orange-500 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {coupon.merchant.name}
                  </Link>
                  {coupon.isVerified && (
                    <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full">{u('verified')}</span>
                  )}
                  {coupon.isExclusive && (
                    <span className="text-xs bg-orange-100 text-orange-500 px-1.5 py-0.5 rounded-full">{u('exclusive')}</span>
                  )}
                </div>

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

                {coupon.minPurchase && (
                  <div className="text-xs text-gray-400 mb-2">
                    {u('minPurchase', { n: coupon.minPurchase })}
                  </div>
                )}

                {coupon.code ? (
                  <>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 mb-2">
                      <code className="flex-1 font-mono text-sm font-semibold text-gray-700">{coupon.code}</code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(coupon.code!)
                          setCopied(coupon.id)
                          setTimeout(() => setCopied(null), 2000)
                          fetch(`/api/coupons/click?id=${coupon.id}`, { method: 'POST' })
                        }}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                          copied === coupon.id
                            ? 'bg-green-500 text-white'
                            : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
                      >
                        {copied === coupon.id ? u('copied') : u('copyCode')}
                      </button>
                    </div>
                    <a
                      href={coupon.merchant.affiliateUrl || 'https://www.google.com/search?q=' + encodeURIComponent(coupon.merchant.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => fetch(`/api/coupons/click?id=${coupon.id}`, { method: 'POST' })}
                      className="flex items-center justify-center gap-1 w-full py-2 mb-2 bg-orange-50 text-orange-500 text-sm font-medium rounded-lg hover:bg-orange-100 transition-colors"
                    >
                      {u('useNow')}
                    </a>
                  </>
                ) : (
                  <>
                    <div className="text-xs text-gray-400 mb-2">{u('noCodeHint')}</div>
                    <a
                      href={coupon.merchant.affiliateUrl || 'https://www.google.com/search?q=' + encodeURIComponent(coupon.merchant.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => fetch(`/api/coupons/click?id=${coupon.id}`, { method: 'POST' })}
                      className="flex items-center justify-center gap-1 w-full py-2 mb-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      {u('useNow')}
                    </a>
                  </>
                )}

                <div className="flex items-center justify-between text-xs text-gray-400 mt-1 pt-2 border-t border-gray-100">
                  <span>{formatExpiry(coupon.expiresAt)}</span>
                  <span>{u('peopleUsed', { n: coupon.clickCount })}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 mt-12 py-8 text-center text-sm text-gray-400">
        <p>{u('footer1')}</p>
        <p className="mt-1">{u('footer2')}</p>
        <div className="mt-3 flex justify-center gap-4 text-xs">
          <Link href="/discount-calculator" className="text-green-500 hover:text-green-600">折扣计算器</Link>
        </div>
      </footer>
    </div>
  )
}