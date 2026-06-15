'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Lang = 'zh' | 'en'

const t = {
  zh: {
    siteTitle: '🏷️ 优惠总动员',
    pageTitle: '折扣计算器',
    backHome: '← 返回首页',
    priceLabel: '商品原价（元）',
    pricePlaceholder: '请输入原价',
    discountLabel: '折扣力度',
    discountPlaceholder: '请输入 1-99 的数字',
    hint: '输入原价和折扣，点击计算',
    result: '折后价',
    saving: '立省',
    reset: '重新计算',
    lang: 'EN',
    switchLang: 'EN',
    invalidPrice: '请输入有效的原价',
    invalidDiscount: '折扣需在 1 到 99 之间',
  },
  en: {
    siteTitle: '🏷️ Coupon Hub',
    pageTitle: 'Discount Calculator',
    backHome: '← Back to Home',
    priceLabel: 'Original Price (¥)',
    pricePlaceholder: 'Enter original price',
    discountLabel: 'Discount (%)',
    discountPlaceholder: 'Enter a number between 1-99',
    hint: 'Enter original price and discount rate, then calculate',
    result: 'Final Price',
    saving: 'You Save',
    reset: 'Reset',
    lang: '中文',
    switchLang: '中文',
    invalidPrice: 'Please enter a valid original price',
    invalidDiscount: 'Discount must be between 1 and 99',
  },
}

function u(key: keyof typeof t.en, lang: Lang) {
  return t[lang][key] as string
}

function DiscountCalculatorContent() {
  const searchParams = useSearchParams()
  const lang = (searchParams.get('lang') === 'en' ? 'en' : 'zh') as Lang
  const nextLang: Lang = lang === 'zh' ? 'en' : 'zh'

  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [result, setResult] = useState<{ final: number; saving: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calc() {
    setError(null)
    const p = parseFloat(price)
    const d = parseFloat(discount)
    if (!p || p <= 0) {
      setError(u('invalidPrice', lang))
      setResult(null)
      return
    }
    if (!d || d < 1 || d >= 100) {
      setError(u('invalidDiscount', lang))
      setResult(null)
      return
    }
    setResult({
      final: Math.round(p * (1 - d / 100) * 100) / 100,
      saving: Math.round(p * d / 100 * 100) / 100,
    })
  }

  function reset() {
    setPrice('')
    setDiscount('')
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/?lang=${lang}`} className="text-2xl font-bold text-orange-500 hover:text-orange-600">
              {u('siteTitle', lang)}
            </Link>
            <Link
              href={`/discount-calculator?lang=${nextLang}`}
              className="text-sm px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              {u('switchLang', lang)}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{u('pageTitle', lang)}</h1>
          <p className="text-sm text-gray-400 mb-6">{u('hint', lang)}</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{u('priceLabel', lang)}</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={u('pricePlaceholder', lang)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{u('discountLabel', lang)}</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder={u('discountPlaceholder', lang)}
                min="1"
                max="99"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">{error}</div>
            )}

            {result && (
              <div className="bg-orange-50 rounded-xl p-5 text-center border border-orange-100">
                <div className="text-sm text-orange-500 mb-1">{u('result', lang)}</div>
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  ¥{result.final}
                </div>
                <div className="text-sm text-gray-500">
                  {u('saving', lang)} ¥{result.saving}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={calc}
                className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                {u('pageTitle', lang)}
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {u('reset', lang)}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href={`/?lang=${lang}`} className="text-sm text-gray-400 hover:text-orange-500">
            {u('backHome', lang)}
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function DiscountCalculatorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <DiscountCalculatorContent />
    </Suspense>
  )
}