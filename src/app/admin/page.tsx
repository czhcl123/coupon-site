'use client'

import { useState } from 'react'

interface Merchant {
  id: string
  name: string
  slug: string
}

interface Category {
  id: string
  name: string
  slug: string
}

interface FormData {
  code: string
  title: string
  description: string
  discountType: string
  discountValue: string
  minPurchase: string
  expiresAt: string
  merchantId: string
  categoryId: string
  isExclusive: boolean
}

export default function AdminPage() {
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormData>({
    code: '',
    title: '',
    description: '',
    discountType: 'PERCENT',
    discountValue: '',
    minPurchase: '',
    expiresAt: '',
    merchantId: '',
    categoryId: '',
    isExclusive: false,
  })

  // 加载商家列表
  async function loadMerchants() {
    const res = await fetch('/api/merchants')
    const data = await res.json()
    setMerchants(data.merchants || [])
  }

  // 提交优惠券
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.merchantId || !form.title || !form.discountValue) {
      setMsg({ type: 'error', text: '请填写必填项：商家、标题、折扣值' })
      return
    }

    setLoading(true)
    setMsg(null)

    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          discountValue: form.discountValue,
          minPurchase: form.minPurchase ? parseFloat(form.minPurchase) : null,
          expiresAt: form.expiresAt ? new Date(form.expiresAt) : null,
        }),
      })

      if (res.ok) {
        setMsg({ type: 'success', text: '✅ 优惠券创建成功！' })
        setForm({ ...form, code: '', title: '', description: '', discountValue: '', minPurchase: '', expiresAt: '' })
      } else {
        const data = await res.json()
        setMsg({ type: 'error', text: `❌ 失败: ${data.error}` })
      }
    } catch {
      setMsg({ type: 'error', text: '❌ 网络错误，请重试' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">🏷️ 优惠卷管理后台</h1>

        {msg && (
          <div className={`px-4 py-3 rounded-lg mb-4 ${msg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {msg.text}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-700 mb-4">新增优惠券</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 商家 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">商家 *</label>
              <select
                value={form.merchantId}
                onChange={(e) => setForm({ ...form, merchantId: e.target.value })}
                onFocus={loadMerchants}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              >
                <option value="">选择商家</option>
                {merchants.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            {/* 标题 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">标题 *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="如：新人首单8折"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            {/* 折扣码 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">折扣码</label>
              <input
                type="text"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="留空表示无码优惠（如满减直降）"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* 折扣类型 */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">折扣类型</label>
                <select
                  value={form.discountType}
                  onChange={(e) => setForm({ ...form, discountType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="PERCENT">百分比（如20%OFF）</option>
                  <option value="FIXED">固定金额（立减¥XX）</option>
                  <option value="FREE_SHIP">免运费</option>
                  <option value="PERCENT_OFF">折扣（如5折）</option>
                </select>
              </div>

              {/* 折扣值 */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {form.discountType === 'FREE_SHIP' ? '—' : '折扣值 *'}
                </label>
                <input
                  type="number"
                  value={form.discountValue}
                  onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
                  placeholder={form.discountType === 'PERCENT' ? '20' : '50'}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  disabled={form.discountType === 'FREE_SHIP'}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* 最低消费 */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">最低消费（元）</label>
                <input
                  type="number"
                  value={form.minPurchase}
                  onChange={(e) => setForm({ ...form, minPurchase: e.target.value })}
                  placeholder="不满则不填"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* 过期时间 */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">过期时间</label>
                <input
                  type="date"
                  value={form.expiresAt}
                  onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            {/* 描述 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">描述</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="补充说明..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* 独家专属 */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isExclusive}
                onChange={(e) => setForm({ ...form, isExclusive: e.target.checked })}
                className="w-4 h-4 accent-orange-500"
              />
              <span className="text-sm text-gray-600">标记为独家专属优惠</span>
            </label>

            {/* 提交 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 transition-colors"
            >
              {loading ? '提交中...' : '创建优惠券'}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          <a href="/" className="hover:text-gray-600">← 返回首页</a>
        </div>
      </div>
    </div>
  )
}