'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export interface Coupon {
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

export interface Merchant {
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
    admin: '管理后台',
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
    footer1: '本站所有链接均为联盟链接，购物可能获得佣金支持本站发展',
    footer2: '© 2026 优惠总动员 · 仅供信息分享',
    lang: 'EN',
    blog: '博客攻略',
    discountCalculator: '折扣计算器',
    home: '首页',
    about: '关于我们',
  },
  en: {
    title: '🏷️ Coupon Hub',
    admin: 'Admin',
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
    footer1: 'Affiliate links — shopping may earn us a commission.',
    footer2: '© 2026 Coupon Hub · For information only',
    lang: '中文',
    blog: 'Blog',
    discountCalculator: 'Calculator',
    home: 'Home',
    about: 'About',
  },
}

interface Props {
  initialCoupons?: Coupon[]
  initialMerchants?: Merchant[]
}

export default function HomePageClient({ initialCoupons = [], initialMerchants = [] }: Props) {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons)
  const [merchants, setMerchants] = useState<Merchant[]>(initialMerchants)
  const [search, setSearch] = useState('')
  const [selectedMerchant, setSelectedMerchant] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lang, setLang] = useState<'zh' | 'en'>('en')

  // SEO content (bilingual) - rendered as static HTML inside the client component
  // so it ships in the initial SSR HTML response (AI engines read it directly).
  const seo = {
    zh: {
      section1Title: '什么是优惠总动员?',
      section1Body: '优惠总动员(Coupon Hub)是面向中国用户的优惠码聚合站,实时汇总 Nike、Adidas、ASOS、Sephora、Steam、Booking.com 等 23 个品牌的最新优惠券和折扣码。覆盖时尚服饰、电子产品、旅行酒店、美妆护肤、宠物用品 5 大品类,每日更新。支持中英文双语。',
      section2Title: '如何使用优惠码省钱',
      section2Body: '使用流程很简单:1) 在首页或商家页面找到想要品牌的优惠码;2) 点击「复制代码」按钮;3) 打开品牌官网结算时,在「优惠码/促销码」输入框粘贴即可。所有优惠码均标注「已验证」状态,过期优惠会自动清理。',
      section3Title: '优惠码类型说明',
      section3Body: '本站优惠码分为 4 种类型:1) PERCENT(百分比折扣,如 -20%);2) FIXED(固定金额,如立减 30 元);3) FREE_SHIP(免运费,通常带最低消费门槛);4) PERCENT_OFF(百分比满减)。每张优惠码卡片清晰标注折扣类型和最低消费要求。',
      faqTitle: '常见问题',
      faq1Q: '使用本站链接购物会多花钱吗?',
      faq1A: '不会。本站所有跳转均为联盟链接(Affiliate Links),您支付的价格与直接访问品牌官网完全相同。商家通过联盟追踪向我们支付少量佣金以支持本站运营。',
      faq2Q: '优惠码会过期吗?',
      faq2A: '会。每个优惠码都有有效期。我们会在优惠过期后及时清理,确保首页展示的都是可用优惠。',
      faq3Q: '需要注册账号才能使用吗?',
      faq3A: '不需要。所有优惠码对所有访客开放,无需注册或登录即可查看和复制。',
      faq4Q: '支持英文商家吗?',
      faq4A: '支持。Nike、Adidas、ASOS、Sephora、Booking.com 等国际品牌均有覆盖。每张优惠码卡片支持中英文切换显示。',
      faq5Q: '如何举报失效的优惠码?',
      faq5A: '可以通过 /about 页面联系我们,我们会人工核查并在 24 小时内清理或更新。',
    },
    en: {
      section1Title: 'What is Coupon Hub?',
      section1Body: 'Coupon Hub is a real-time coupon aggregator for Chinese-speaking shoppers. We aggregate the latest promo codes from 23 brands including Nike, Adidas, ASOS, Sephora, Steam, and Booking.com, covering 5 categories: fashion, electronics, travel, beauty, and pet supplies. Bilingual zh/en, updated daily.',
      section2Title: 'How to use coupon codes',
      section2Body: 'Three steps: 1) Find your favorite brand on the homepage or merchant page; 2) Click the "Copy Code" button; 3) Paste the code at checkout on the brand website. All active codes display a "Verified" badge; expired codes are removed automatically.',
      section3Title: 'Coupon types explained',
      section3Body: 'Four discount types: 1) PERCENT (e.g., -20% off); 2) FIXED (e.g., ¥30 off); 3) FREE_SHIP (free shipping with minimum spend); 4) PERCENT_OFF (percentage off with minimum spend). Each card clearly shows the discount type and minimum purchase requirement.',
      faqTitle: 'Frequently asked questions',
      faq1Q: 'Does using affiliate links cost me more?',
      faq1A: 'No. You pay exactly the same price as visiting the brand directly. Brands pay us a small commission via affiliate tracking, which funds our operations.',
      faq2Q: 'Do coupon codes expire?',
      faq2A: 'Yes. Each code has an expiry date. We remove expired codes promptly so the homepage always shows working coupons.',
      faq3Q: 'Do I need an account to use coupons?',
      faq3A: 'No. All coupons are open to all visitors — no signup or login required.',
      faq4Q: 'Do you cover international brands?',
      faq4A: 'Yes. Nike, Adidas, ASOS, Sephora, Booking.com, and many more are covered. Each card supports bilingual zh/en display.',
      faq5Q: 'How do I report an expired coupon?',
      faq5A: 'Use the contact form on /about. We verify manually and update within 24 hours.',
    },
  } as const
  const s = seo[lang]

  const u = (key: keyof typeof t.en, vars?: Record<string, string | number>) => {
    let s = t[lang][key] as string
    if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.replace(`{${k}}`, String(v)) })
    return s
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
      '满99减30': 'Spend ¥99, Get ¥30 OFF',
    }
    return map[title] || title
  }

  // Fetch data when search/filter changes (only after initial SSR data is shown)
  async function fetchData() {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (selectedMerchant) params.set('merchant', selectedMerchant)
      if (selectedCategory) params.set('category', selectedCategory)

      const [couponsRes, merchantsRes] = await Promise.all([
        fetch(`/api/coupons?${params}`),
        fetch('/api/merchants'),
      ])

      const couponsData = await couponsRes.json()
      const merchantsData = await merchantsRes.json()

      setCoupons(couponsData.coupons || [])
      setMerchants(merchantsData.merchants || [])
    } catch (e) {
      setError(u('loadError'))
    } finally {
      setLoading(false)
    }
  }

  // Search / filter only — initial data comes from server (SSR)
  useEffect(() => {
    // Skip first render if there is no filter (use initial SSR data)
    if (!search && !selectedMerchant && !selectedCategory) return
    const timer = setTimeout(fetchData, 300)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedMerchant, selectedCategory])

  function copyCode(code: string, couponId: string) {
    navigator.clipboard.writeText(code)
    setCopied(couponId)
    setTimeout(() => setCopied(null), 2000)
    fetch(`/api/coupons/click?id=${couponId}`, { method: 'POST' }).catch(() => {})
  }

  function formatDiscount(coupon: Coupon) {
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
              <a href={`/blog?lang=${lang}`} className="text-sm text-gray-400 hover:text-gray-600">{u('blog')}</a>
              <button
                onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
                className="text-sm px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                {u('lang')}
              </button>
              <a href={`/discount-calculator?lang=${lang}`} className="text-sm px-3 py-1 bg-orange-100 text-orange-500 rounded-full hover:bg-orange-200 transition-colors font-medium">
                {u('discountCalculator')}
              </a>
              <a href={`/admin?lang=${lang}`} className="text-sm text-gray-400 hover:text-gray-600">
                {u('admin')}
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
                <option key={m.id} value={m.slug}>{m.name} ({m.couponCount} {u('coupons')})</option>
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
                  <Link href={`/merchant/${coupon.merchant.slug}?lang=${lang}`} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
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
                        onClick={() => copyCode(coupon.code!, coupon.id)}
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
                      href={coupon.merchant.affiliateUrl || `/merchant/${coupon.merchant.slug}?lang=${lang}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 px-4 transition-colors mb-3"
                    >
                      {u('useNow')}
                    </a>
                  </>
                ) : (
                  <>
                    <div className="text-xs text-gray-400 mb-2">{u('noCodeHint')}</div>
                    <a
                      href={coupon.merchant.affiliateUrl || `/merchant/${coupon.merchant.slug}?lang=${lang}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 px-4 transition-colors mb-3"
                    >
                      {u('useNow')}
                    </a>
                  </>
                )}

                <div className="flex items-center justify-between text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">
                  <span>{formatExpiry(coupon.expiresAt)}</span>
                  <span>{u('peopleUsed', { n: coupon.clickCount })}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Cross-site funnel: coupon-site → tools-site (JSON formatter / word counter / discount calculator) */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 md:p-8 border border-orange-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
            {lang === 'zh' ? '不止是优惠码——试试这些免费工具' : 'Beyond Coupons — Free Tools'}
          </h2>
          <p className="text-sm text-gray-600 mb-5">
            {lang === 'zh'
              ? '不知道买的折扣码打几折?用下面的工具 1 秒算清。'
              : 'Not sure what your coupon saves? Calculate it in 1 second.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="https://tools-site-production.up.railway.app/discount-calculator"
              className="block bg-white rounded-xl p-4 border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-1">🧮</div>
              <div className="font-semibold text-gray-800 text-sm mb-1">
                {lang === 'zh' ? '折扣计算器' : 'Discount Calculator'}
              </div>
              <div className="text-xs text-gray-500">
                {lang === 'zh' ? '原价×折扣,1秒出结果' : 'Original × discount, instant'}
              </div>
            </a>
            <a
              href="https://tools-site-production.up.railway.app/word-counter"
              className="block bg-white rounded-xl p-4 border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-1">📝</div>
              <div className="font-semibold text-gray-800 text-sm mb-1">
                {lang === 'zh' ? '字数统计' : 'Word Counter'}
              </div>
              <div className="text-xs text-gray-500">
                {lang === 'zh' ? '论文字数 / SEO meta 长度' : 'Essay words / SEO meta length'}
              </div>
            </a>
            <a
              href="https://tools-site-production.up.railway.app/json-formatter"
              className="block bg-white rounded-xl p-4 border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-1">🔧</div>
              <div className="font-semibold text-gray-800 text-sm mb-1">
                {lang === 'zh' ? 'JSON 格式化' : 'JSON Formatter'}
              </div>
              <div className="text-xs text-gray-500">
                {lang === 'zh' ? 'API 响应调试 / 嵌套层级' : 'API debug / nested levels'}
              </div>
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            {lang === 'zh' ? '工具来自 ' : 'Tools from '}
            <a href="https://tools-site-production.up.railway.app" className="underline hover:text-orange-500">
              Practical Tools
            </a>
          </p>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100 mt-12 py-8 text-center text-sm text-gray-400">
        <nav className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-3 text-xs">
          <Link href={`/?lang=${lang}`} className="hover:text-orange-500 transition-colors">{u('home')}</Link>
          <span className="text-gray-200">·</span>
          <Link href={`/about?lang=${lang}`} className="hover:text-orange-500 transition-colors">{u('about')}</Link>
          <span className="text-gray-200">·</span>
          <a href="/llms.txt" className="hover:text-orange-500 transition-colors">llms.txt</a>
          <span className="text-gray-200">·</span>
          <a href="/rss.xml" className="hover:text-orange-500 transition-colors">RSS</a>
        </nav>
        <p>{u('footer1')}</p>
        <p className="mt-1">{u('footer2')}</p>
      </footer>
    {/* SEO/GEO content sections — rendered as static HTML, ships in SSR response for AI indexing */}
    <section className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{s.section1Title}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{s.section1Body}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{s.section2Title}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{s.section2Body}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{s.section3Title}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{s.section3Body}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">{s.faqTitle}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">{s.faq1Q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.faq1A}</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">{s.faq2Q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.faq2A}</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">{s.faq3Q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.faq3A}</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">{s.faq4Q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.faq4A}</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">{s.faq5Q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.faq5A}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}