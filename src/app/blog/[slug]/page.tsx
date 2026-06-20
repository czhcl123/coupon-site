import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { articles, getArticleBySlug } from '@/data/articles'

type Lang = 'zh' | 'en'

const t = {
  zh: {
    siteTitle: '🏷️ 优惠总动员',
    backList: '← 攻略列表',
    backHome: '← 返回首页',
    relatedTitle: '相关攻略',
    ctaText: '想第一时间获取 {merchant} 折扣码？',
    ctaBtn: '查看最新优惠券 →',
    footer1: '本站所有链接均为联盟链接，购物可能获得佣金支持本站发展',
    footer2: '© 2025 优惠总动员 · 仅供信息分享',
    lang: 'EN',
    switchLang: 'EN',
  },
  en: {
    siteTitle: '🏷️ Coupon Hub',
    backList: '← All Guides',
    backHome: '← Back to Home',
    relatedTitle: 'Related Guides',
    ctaText: 'Want {merchant} discount codes first?',
    ctaBtn: 'View Latest Coupons →',
    footer1: 'Affiliate links — shopping may earn us a commission.',
    footer2: '© 2025 Coupon Hub · For information only',
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

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lang?: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const sp = await searchParams
  const lang = (sp.lang === 'en' ? 'en' : 'zh') as Lang
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
    },
    alternates: { canonical: `/blog/${slug}` },
  }
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lang?: string }>
}) {
  const { slug } = await params
  const sp = await searchParams
  const lang = (sp.lang === 'en' ? 'en' : 'zh') as Lang
  const nextLang: Lang = lang === 'zh' ? 'en' : 'zh'
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = articles
    .filter((a) => a.merchantSlug === article.merchantSlug && a.slug !== slug)
    .slice(0, 3)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    author: { '@type': 'Organization', name: '优惠总动员' },
    publisher: {
      '@type': 'Organization',
      name: '优惠总动员',
      url: 'https://coupon-site-olive.vercel.app',
    },
    url: `https://coupon-site-olive.vercel.app/blog/${slug}`,
    keywords: article.tags.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/?lang=${lang}`} className="text-2xl font-bold text-orange-500 hover:text-orange-600">
              {u('siteTitle', lang)}
            </Link>
            <div className="flex items-center gap-3">
              <Link href={`/blog?lang=${lang}`} className="text-sm text-gray-500 hover:text-orange-500">
                {u('backList', lang)}
              </Link>
              <Link
                href={`/blog/${slug}?lang=${nextLang}`}
                className="text-sm px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                {u('switchLang', lang)}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <article className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href={`/?lang=${lang}`}
              className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full hover:bg-orange-200"
            >
              {article.merchant}
            </Link>
            <span className="text-xs text-gray-400">{article.publishedAt}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-snug">
            {article.title}
          </h1>

          <p className="text-gray-500 mb-6 pb-6 border-b border-gray-100">{article.description}</p>

          <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{
              __html: article.content
                .trim()
                .split('\n\n')
                .map((p) => {
                  const t = p.trim()
                  if (!t) return ''
                  if (t.startsWith('## '))
                    return `<h2 class="text-xl font-bold text-gray-800 mt-8 mb-3">${t.slice(3)}</h2>`
                  if (t.startsWith('### '))
                    return `<h3 class="text-lg font-semibold text-gray-700 mt-5 mb-2">${t.slice(4)}</h3>`
                  if (t.startsWith('> '))
                    return `<blockquote class="border-l-4 border-orange-400 pl-4 py-1 my-4 text-gray-600 italic">${t.slice(2)}</blockquote>`
                  if (t.startsWith('- '))
                    return `<li class="ml-4 list-disc text-gray-600 leading-relaxed">${t.slice(2)}</li>`
                  if (/^\d+\.\s/.test(t))
                    return `<li class="ml-4 list-decimal text-gray-600 leading-relaxed">${t.replace(/^\d+\.\s/, '')}</li>`
                  if (t.startsWith('| '))
                    return `<div class="overflow-x-auto my-4"><table class="min-w-full text-sm">${t.split('\n').map((row) => `<tr>${row.split('|').filter(c => c.trim()).map(c => `<td class="border px-3 py-1">${c.trim()}</td>`).join('')}</tr>`).join('')}</table></div>`
                  return `<p class="text-gray-600 leading-relaxed mb-3">${t}</p>`
                })
                .join(''),
            }}
          />

          <div className="flex flex-wrap gap-1 mt-8 pt-6 border-t border-gray-100">
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </article>

        {related.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-700 mb-4">{u('relatedTitle', lang)}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}?lang=${lang}`}
                  className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-sm transition-shadow block"
                >
                  <h4 className="font-semibold text-gray-800 text-sm leading-snug">{r.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{r.publishedAt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-orange-50 rounded-lg p-5 text-center">
          <p className="text-orange-700 font-medium mb-2">
            {uVars('ctaText', { merchant: article.merchant }, lang)}
          </p>
          <Link
            href={`/?lang=${lang}`}
            className="inline-block bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            {u('ctaBtn', lang)}
          </Link>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 mt-12 py-8 text-center text-sm text-gray-400">
        <p>{u('footer1', lang)}</p>
        <p className="mt-1">{u('footer2', lang)}</p>
      </footer>
    </div>
    </>
  )
}