'use client'

import { useState, useEffect } from 'react'

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

export default function HomePage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [search, setSearch] = useState('')
  const [selectedMerchant, setSelectedMerchant] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 加载数据
  useEffect(() => {
    fetchData()
  }, [])

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
      setError('加载失败，请刷新重试')
    } finally {
      setLoading(false)
    }
  }

  // 搜索 / 筛选
  useEffect(() => {
    const timer = setTimeout(fetchData, 300)
    return () => clearTimeout(timer)
  }, [search, selectedMerchant, selectedCategory])

  // 复制折扣码
  function copyCode(code: string, couponId: string) {
    navigator.clipboard.writeText(code)
    setCopied(couponId)
    setTimeout(() => setCopied(null), 2000)

    // 上报点击
    fetch(`/api/coupons/click?id=${couponId}`, { method: 'POST' })
  }

  // 格式化折扣标签
  function formatDiscount(coupon: Coupon) {
    switch (coupon.discountType) {
      case 'PERCENT':
        return `-${coupon.discountValue}%`
      case 'FIXED':
        return `立减${coupon.discountValue}元`
      case 'FREE_SHIP':
        return '免运费'
      case 'PERCENT_OFF':
        return `低至${coupon.discountValue}折`
      default:
        return coupon.discountValue
    }
  }

  // 格式化过期时间
  function formatExpiry(dateStr: string | null) {
    if (!dateStr) return '长期有效'
    const date = new Date(dateStr)
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days < 0) return '已过期'
    if (days === 0) return '今日过期'
    if (days === 1) return '明日过期'
    return `${days}天后过期`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-orange-500">🏷️ 优惠总动员</h1>
            <a
              href="/blog"
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              博客攻略
            </a>
            <span className="text-gray-200">|</span>
            <a
              href="/admin"
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              管理后台
            </a>
          </div>

          {/* 搜索栏 */}
          <div className="flex gap-3 flex-wrap">
            <input
              type="text"
              placeholder="搜索商家或优惠券..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <select
              value={selectedMerchant}
              onChange={(e) => setSelectedMerchant(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">全所有商家</option>
              {merchants.map((m) => (
                <option key={m.id} value={m.slug}>{m.name} ({m.couponCount})</option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">全部分类</option>
              <option value="fashion">时尚服饰</option>
              <option value="electronics">电子产品</option>
              <option value="travel">旅行酒店</option>
              <option value="beauty">美妆护肤</option>
              <option value="food">食品生鲜</option>
            </select>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">{error}</div>
        )}

        {/* 加载状态 */}
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
            <p>没有找到相关优惠券，换个关键词试试</p>
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
                  <span className="text-sm text-gray-500">{coupon.merchant.name}</span>
                  {coupon.isVerified && (
                    <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full">已验证</span>
                  )}
                  {coupon.isExclusive && (
                    <span className="text-xs bg-orange-100 text-orange-500 px-1.5 py-0.5 rounded-full">独家</span>
                  )}
                </div>

                {/* 折扣标签 */}
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl font-bold text-orange-500">
                    {formatDiscount(coupon)}
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 leading-tight">{coupon.title}</div>
                    {coupon.description && (
                      <div className="text-sm text-gray-400 mt-0.5">{coupon.description}</div>
                    )}
                  </div>
                </div>

                {/* 最低消费 */}
                {coupon.minPurchase && (
                  <div className="text-xs text-gray-400 mb-2">
                    满 ¥{coupon.minPurchase} 可用
                  </div>
                )}

                {/* 折扣码 */}
                {coupon.code ? (
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
                      {copied === coupon.id ? '已复制 ✓' : '复制代码'}
                    </button>
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 mb-2">无折扣码·点击跳转领取</div>
                )}

                {/* 底部信息 */}
                <div className="flex items-center justify-between text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">
                  <span>{formatExpiry(coupon.expiresAt)}</span>
                  <span>{coupon.clickCount} 人使用</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-100 mt-12 py-8 text-center text-sm text-gray-400">
        <p>本站所有链接均为联盟链接，购物可能获得佣金支持本站发展</p>
        <p className="mt-1">© 2025 优惠总动员 · 仅供信息分享</p>
      </footer>
    </div>
  )
}