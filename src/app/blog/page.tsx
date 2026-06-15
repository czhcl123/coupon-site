import { Metadata } from 'next'
import Link from 'next/link'
import { articles } from '@/data/articles'

type Lang = 'zh' | 'en'

const t = {
  zh: {
    siteTitle: '🏷️ 优惠总动员',
    siteSubtitle: '购物攻略 · 折扣资讯 · 省钱技巧',
    backHome: '← 返回首页',
    pageTitle: '购物攻略',
    pageDesc: '汇集各大品牌折扣码获取技巧、购物节抢购攻略，帮你省钱又省心。',
    footer1: '本站所有链接均为联盟链接，购物可能获得佣金支持本站发展',
    footer2: '© 2025 优惠总动员 · 仅供信息分享',
    lang: 'EN',
    switchLang: 'EN',
  },
  en: {
    siteTitle: '🏷️ Coupon Hub',
    siteSubtitle: 'Deals · Guides · Savings',
    backHome: '← Back to Home',
    pageTitle: 'Shopping Guides',
    pageDesc: 'Expert tips on finding discount codes, sale strategies, and exclusive deals.',
    footer1: 'Affiliate links — shopping may earn us a commission.',
    footer2: '© 2025 Coupon Hub · For information only',
    lang: '中文',
    switchLang: '中文',
  },
}

function u(key: keyof typeof t.en, lang: Lang) {
  return t[lang][key] as string
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}): Promise<Metadata> {
  const sp = await searchParams
  const lang = (sp.lang === 'en' ? 'en' : 'zh') as Lang
  return {
    title: lang === 'zh'
      ? '购物攻略与折扣资讯 | 优惠总动员'
      : 'Shopping Guides & Deals | Coupon Hub',
    description: lang === 'zh'
      ? '专业购物攻略：Nike、ASOS、Sephora、Steam 等品牌折扣码获取技巧，帮你在海淘和国内外电商购物时省更多。'
      : 'Expert shopping guides: Nike, ASOS, Sephora, Steam discount code tips for domestic and international shopping.',
    alternates: { canonical: '/blog' },
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = (sp.lang === 'en' ? 'en' : 'zh') as Lang
  const nextLang: Lang = lang === 'zh' ? 'en' : 'zh'

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href={`/?lang=${lang}`} className="text-2xl font-bold text-orange-500 hover:text-orange-600">
                {u('siteTitle', lang)}
              </Link>
              <p className="text-sm text-gray-400 mt-1">{u('siteSubtitle', lang)}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/?lang=${lang}`} className="text-sm text-gray-500 hover:text-orange-500">
                {u('backHome', lang)}
              </Link>
              <Link
                href={`/blog?lang=${nextLang}`}
                className="text-sm px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                {u('switchLang', lang)}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{u('pageTitle', lang)}</h1>
          <p className="text-gray-500 mt-2">{u('pageDesc', lang)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}?lang=${lang}`}
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
        <p>{u('footer1', lang)}</p>
        <p className="mt-1">{u('footer2', lang)}</p>
      </footer>
    </div>
  )
}