import { Metadata } from 'next'
import Link from 'next/link'
import { articles } from '@/data/articles'

export const metadata: Metadata = {
  title: '购物攻略与折扣资讯 | 优惠总动员',
  description: '专业购物攻略：Nike、ASOS、Sephora、Steam 等品牌折扣码获取技巧，帮你在海淘和国内外电商购物时省更多。',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-2xl font-bold text-orange-500 hover:text-orange-600">
                🏷️ 优惠总动员
              </Link>
              <p className="text-sm text-gray-400 mt-1">购物攻略 · 折扣资讯 · 省钱技巧</p>
            </div>
            <Link href="/" className="text-sm text-gray-500 hover:text-orange-500">
              ← 返回首页
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">购物攻略</h1>
          <p className="text-gray-500 mt-2">
            汇集各大品牌折扣码获取技巧、购物节抢购攻略，帮你省钱又省心。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 block"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                  {article.merchant}
                </span>
                <span className="text-xs text-gray-400">{article.publishedAt}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2 leading-snug">
                {article.title}
              </h2>
              <p className="text-sm text-gray-500 line-clamp-3">{article.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {article.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 mt-12 py-8 text-center text-sm text-gray-400">
        <p>本站所有链接均为联盟链接，购物可能获得佣金支持本站发展</p>
        <p className="mt-1">© 2025 优惠总动员 · 仅供信息分享</p>
      </footer>
    </div>
  )
}
