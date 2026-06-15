'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState('')
  const [discountRate, setDiscountRate] = useState('')
  const [result, setResult] = useState<{ final: number; saving: number; discount: number } | null>(null)

  const calculate = () => {
    const p = parseFloat(originalPrice)
    const r = parseFloat(discountRate)
    if (isNaN(p) || isNaN(r) || p <= 0 || r <= 0 || r >= 100) return
    const final = p * (1 - r / 100)
    const saving = p - final
    setResult({ final, saving, discount: r })
  }

  const reset = () => {
    setOriginalPrice('')
    setDiscountRate('')
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-gray-500 text-sm hover:text-gray-800">← 返回首页</Link>
          <span className="text-sm text-gray-400">优惠总动员</span>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">折扣计算器</h1>
        <p className="text-gray-500 text-sm mb-8">输入原价和折扣率，快速计算折后价</p>

        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">商品原价（元）</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={originalPrice}
              onChange={e => setOriginalPrice(e.target.value)}
              placeholder="例如：299.00"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">折扣率（%）</label>
            <input
              type="number"
              min="0"
              max="99.99"
              step="0.1"
              value={discountRate}
              onChange={e => setDiscountRate(e.target.value)}
              placeholder="例如：20"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={calculate}
              className="flex-1 bg-green-500 text-white py-3 rounded-xl font-medium hover:bg-green-600 transition"
            >
              计算
            </button>
            <button
              onClick={reset}
              className="px-5 py-3 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition"
            >
              重置
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="text-center">
              <div className="text-sm opacity-80 mb-1">折后价</div>
              <div className="text-4xl font-bold mb-4">¥{result.final.toFixed(2)}</div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xs opacity-70">节省</div>
                  <div className="text-xl font-semibold">¥{result.saving.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-xs opacity-70">折扣</div>
                  <div className="text-xl font-semibold">{result.discount}%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-green-600 hover:text-green-700">
            ← 查看更多商家优惠券
          </Link>
        </div>
      </main>
    </div>
  )
}
