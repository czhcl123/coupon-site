'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Lang = 'zh' | 'en'

const t = {
  zh: {
    siteTitle: '🏷️ 优惠总动员',
    pageTitle: '🏷️ 优惠券管理后台',
    sectionTitle: '新增优惠券',
    backHome: '← 返回首页',
    selectMerchant: '选择商家',
    titleLabel: '标题 *',
    titlePlaceholder: '如：新人首单8折',
    codeLabel: '折扣码',
    codePlaceholder: '留空表示无码优惠（如满减直降）',
    typeLabel: '折扣类型',
    typePercent: '百分比（如20%OFF）',
    typeFixed: '固定金额（立减¥XX）',
    typeFreeShip: '免运费',
    typePercentOff: '折扣（如5折）',
    valueLabel: '折扣值 *',
    valuePlaceholder: '20',
    minPurchaseLabel: '最低消费（元）',
    minPurchasePlaceholder: '不满则不填',
    expiryLabel: '过期时间',
    descLabel: '描述',
    descPlaceholder: '补充说明...',
    exclusiveLabel: '标记为独家专属优惠',
    submitBtn: '创建优惠券',
    submitting: '提交中...',
    successMsg: '✅ 优惠券创建成功！',
    errorRequired: '请填写必填项：商家、标题、折扣值',
    errorGeneral: '❌ 失败: {msg}',
    errorNetwork: '❌ 网络错误，请重试',
    lang: 'EN',
    switchLang: 'EN',
  },
  en: {
    siteTitle: '🏷️ Coupon Hub',
    pageTitle: '🏷️ Coupon Admin',
    sectionTitle: 'Add New Coupon',
    backHome: '← Back to Home',
    selectMerchant: 'Select Merchant',
    titleLabel: 'Title *',
    titlePlaceholder: 'e.g. First order 20% OFF',
    codeLabel: 'Discount Code',
    codePlaceholder: 'Leave blank for no-code deals',
    typeLabel: 'Discount Type',
    typePercent: 'Percent (e.g. 20% OFF)',
    typeFixed: 'Fixed Amount (¥XX OFF)',
    typeFreeShip: 'Free Shipping',
    typePercentOff: 'Discount (e.g. 5折)',
    valueLabel: 'Discount Value *',
    valuePlaceholder: '20',
    minPurchaseLabel: 'Min. Spend (¥)',
    minPurchasePlaceholder: 'Leave blank if none',
    expiryLabel: 'Expiry Date',
    descLabel: 'Description',
    descPlaceholder: 'Additional notes...',
    exclusiveLabel: 'Mark as exclusive deal',
    submitBtn: 'Create Coupon',
    submitting: 'Submitting...',
    successMsg: '✅ Coupon created successfully!',
    errorRequired: 'Please fill in required fields: merchant, title, discount value',
    errorGeneral: '❌ Failed: {msg}',
    errorNetwork: '❌ Network error, please retry',
    lang: '中文',
    switchLang: '中文',
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

interface Merchant {
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

function AdminContent() {
  const searchParams = useSearchParams()
  const langParam = searchParams.get('lang')
  const lang: Lang = (langParam === 'en' ? 'en' : 'zh')
  const nextLang: Lang = lang === 'zh' ? 'en' : 'zh'

  const [merchants, setMerchants] = useState<Merchant[]>([])
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

  async function loadMerchants() {
    const res = await fetch('/api/merchants')
    const data = await res.json()
    setMerchants(data.merchants || [])
  }

  useEffect(() => {
    loadMerchants()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.merchantId || !form.title || !form.discountValue) {
      setMsg({ type: 'error', text: u('errorRequired', lang) })
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
        setMsg({ type: 'success', text: u('successMsg', lang) })
        setForm({ ...form, code: '', title: '', description: '', discountValue: '', minPurchase: '', expiresAt: '' })
      } else {
        const data = await res.json()
        setMsg({ type: 'error', text: uVars('errorGeneral', { msg: data.error }, lang) })
      }
    } catch {
      setMsg({ type: 'error', text: u('errorNetwork', lang) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/?lang=${lang}`} className="text-2xl font-bold text-orange-500 hover:text-orange-600">
              {u('siteTitle', lang)}
            </Link>
            <Link
              href={`/admin?lang=${nextLang}`}
              className="text-sm px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              {u('switchLang', lang)}
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{u('pageTitle', lang)}</h1>

        {msg && (
          <div className={`px-4 py-3 rounded-lg mb-4 ${msg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {msg.text}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-700 mb-4">{u('sectionTitle', lang)}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 商家 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{u('selectMerchant')} *</label>
              <select
                value={form.merchantId}
                onChange={(e) => setForm({ ...form, merchantId: e.target.value })}
                onFocus={loadMerchants}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              >
                <option value="">{u('selectMerchant')}</option>
                {merchants.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            {/* 标题 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{u('titleLabel')}</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder={u('titlePlaceholder', lang)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            {/* 折扣码 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{u('codeLabel')}</label>
              <input
                type="text"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder={u('codePlaceholder', lang)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* 折扣类型 */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{u('typeLabel')}</label>
                <select
                  value={form.discountType}
                  onChange={(e) => setForm({ ...form, discountType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="PERCENT">{u('typePercent', lang)}</option>
                  <option value="FIXED">{u('typeFixed', lang)}</option>
                  <option value="FREE_SHIP">{u('typeFreeShip', lang)}</option>
                  <option value="PERCENT_OFF">{u('typePercentOff', lang)}</option>
                </select>
              </div>

              {/* 折扣值 */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {form.discountType === 'FREE_SHIP' ? '—' : u('valueLabel')}
                </label>
                <input
                  type="number"
                  value={form.discountValue}
                  onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
                  placeholder={u('valuePlaceholder', lang)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  disabled={form.discountType === 'FREE_SHIP'}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* 最低消费 */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{u('minPurchaseLabel', lang)}</label>
                <input
                  type="number"
                  value={form.minPurchase}
                  onChange={(e) => setForm({ ...form, minPurchase: e.target.value })}
                  placeholder={u('minPurchasePlaceholder', lang)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* 过期时间 */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{u('expiryLabel', lang)}</label>
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
              <label className="block text-sm font-medium text-gray-600 mb-1">{u('descLabel', lang)}</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder={u('descPlaceholder', lang)}
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
              <span className="text-sm text-gray-600">{u('exclusiveLabel', lang)}</span>
            </label>

            {/* 提交 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 transition-colors"
            >
              {loading ? u('submitting', lang) : u('submitBtn', lang)}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          <Link href={`/?lang=${lang}`} className="hover:text-gray-600">
            {u('backHome', lang)}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <AdminContent />
    </Suspense>
  )
}