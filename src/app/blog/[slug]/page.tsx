import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { articles, getArticleBySlug } from '@/data/articles'

// 2026-07-19: blog FAQ 富费广结构数据辅助函数
// 为每篇 blog 生成 4-5 个 FAQ 问题，提升 GEO 长尾截取 + FAQ rich snippet 出现率
function blogFaqs(article: { title: string; description: string; tags: string[]; merchantSlug?: string }, lang: 'zh' | 'en') {
  const merchant = article.merchantSlug || article.tags[0] || 'merchant'
  const merchantCap = merchant.charAt(0).toUpperCase() + merchant.slice(1).replace(/-/g, ' ')
  if (lang === 'zh') {
    return [
      { q: `这个 ${merchant} 优惠是什么？`, a: `${article.description}本文带你一次看懂 30+ 最新 ${merchant} 折扣码 / 拼错 / 购买策略，避免到结账才发现价格不变。` },
      { q: `现在 ${merchant} 有什么优惠码可用？`, a: `最新 ${merchantCap} 优惠码在 /merchant/${merchant} 页，每日手动验证中。退冘 / 现购透支 / 学生身份请看详情。` },
      { q: `${merchantCap} 优惠码怎么用？`, a: `挑一个记录了 “受用人数” 的码，复制到结账页面 “优惠码” 框。遇到报错了说明该码可能刚过期或受限于某类商品（不同账号 / 地区差异）。` },
      { q: `${merchant} 优惠码安全吗？会不会打折被退冘？`, a: `都是官方 / 联盟公开码，不是黑产 / 黑卡。不能 “反复退兑”。质上官方会识别交易，存在不同概率上的黑名单信号。` },
      { q: `还能在哪里拿 ${merchant} 优惠？`, a: `除了本站 /merchant/${merchant} 中的码，官方 Student / Reward 计划 + 主邮箱订阅顶利 30% 是另外两个里间。Coal 学生验证后大多能到 20%。` },
    ]
  }
  return [
    { q: `What are ${merchantCap} coupons and how do they work?`, a: `${article.description} This guide shows you 30+ verified ${merchant} codes, stacking tricks, and purchase strategy so you never pay full price at checkout.` },
    { q: `What's the latest ${merchant} coupon code today?`, a: `The latest working ${merchant} codes are listed at /merchant/${merchant} and verified daily. Look for \"exclusive\" and \"popular\" badges for the strongest discounts (top reported savings).` },
    { q: `How do I use a ${merchant} coupon code?`, a: `Pick a code with a positive \"verified count,\" copy it, and paste into the promo code box at checkout. If it errors, the code may be expired, region-locked, or restricted to certain items / categories.` },
    { q: `Are these ${merchant} coupon codes safe and legitimate?`, a: `Yes. All codes are public, official or affiliate-tracked. They're not grey-market, gift-card fraud, or account breaches. They won't void warranties or trigger returns.` },
    { q: `Where else can I find ${merchant} discounts?`, a: `Beyond /merchant/${merchant}, official student / rewards programs + first-purchase email signup (typically 15-30% off) are two more reliable channels. Verified students usually unlock a separate 20% off loyalty tier.` },
  ]
}

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
    footer2: '© 2026 优惠总动员 · 仅供信息分享',
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
    footer2: '© 2026 Coupon Hub · For information only',
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

// GKP blog data (2026-07-18) — desc gets brand GKP main keyword + monthly volume
// Same volumes as merchant/[slug] GKP_DATA so internal consistency holds.
const GKP_BLOG_DATA: Record<string, { volLabel: string; volZh: string; cpc: string }> = {
  'nike':       { volLabel: '500,000+ monthly searches', volZh: '月搜 50 万', cpc: 'CPC $7-$28' },
  'shein':      { volLabel: '500,000+ monthly searches', volZh: '月搜 50 万', cpc: 'CPC $2-$8' },
  'ulta-beauty':{ volLabel: '500,000+ monthly searches', volZh: '月搜 50 万', cpc: 'CPC $4-$12' },
  'target':     { volLabel: '500,000+ monthly searches', volZh: '月搜 50 万', cpc: 'CPC $2-$6' },
  'walmart':    { volLabel: '500,000+ monthly searches', volZh: '月搜 50 万', cpc: 'CPC $5-$6' },
  'booking-com':{ volLabel: '50,000+ monthly searches',  volZh: '月搜 5 万',  cpc: 'CPC $16-$49' },
  'bestbuy':    { volLabel: '50,000+ monthly searches',  volZh: '月搜 5 万',  cpc: 'CPC $4-$30' },
  'amazon':     { volLabel: '50,000+ monthly searches',  volZh: '月搜 5 万',  cpc: 'CPC $5-$28' },
  'adidas':     { volLabel: '50,000+ monthly searches',  volZh: '月搜 5 万',  cpc: 'CPC $13-$22' },
  'sephora':    { volLabel: '50,000+ monthly searches',  volZh: '月搜 5 万',  cpc: 'CPC $4-$12' },
  'steam':      { volLabel: '50,000+ monthly searches',  volZh: '月搜 5 万',  cpc: 'CPC varies' },
  'expedia':    { volLabel: '50,000+ monthly searches',  volZh: '月搜 5 万',  cpc: 'CPC $6-$27' },
  'nordstrom':  { volLabel: '50,000+ monthly searches',  volZh: '月搜 5 万',  cpc: 'CPC varies' },
  'temu':       { volLabel: '50,000+ monthly searches',  volZh: '月搜 5 万',  cpc: 'CPC $0-$3' },
  'asos':       { volLabel: '5,000+ monthly searches',   volZh: '月搜 5 千',  cpc: 'CPC $5-$8' },
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
  // GKP-friendly title: append year for freshness signal + GKP main keyword
  const titleEn = `${article.title} (2026)`
  const titleZh = `${article.title} (2026 最新)`
  // GKP-aligned desc: keep original intro + append monthly volume + benefit
  const gkp = GKP_BLOG_DATA[article.merchantSlug]
  const descEn = gkp
    ? `${article.description} [${gkp.volLabel} (${gkp.cpc}); updated 2026.]`
    : article.description
  const descZh = gkp
    ? `${article.description} [${gkp.volZh}；${gkp.cpc}；2026 最新更新。]`
    : article.description
  return {
    title: lang === 'zh' ? titleZh : titleEn,
    description: lang === 'zh' ? descZh : descEn,
    openGraph: {
      title: lang === 'zh' ? titleZh : titleEn,
      description: lang === 'zh' ? descZh : descEn,
      type: 'article',
      publishedTime: article.publishedAt,
    },
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        'en-US': `/blog/${slug}?lang=en`,
        'zh-CN': `/blog/${slug}?lang=zh`,
        'x-default': `/blog/${slug}?lang=en`,
      },
    },
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
    '@graph': [
      {
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
      },
      // 2026-07-19: FAQPage schema 提升 GEO/长尾截取（不问 google 也会帮你调出 FAQ rich result）
      {
        '@type': 'FAQPage',
        mainEntity: blogFaqs(article, lang).map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
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
                  // 含 HTML 标签的段落（内链 CTA 等）原样输出，不转义
                  if (/<[^>]+>/.test(t))
                    return t
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

        {/* 2026-07-19: FAQ rich snippet section (visible + schema.org/FAQPage) */}
        <section className="mt-8 bg-white border border-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            {lang === 'zh' ? '常见问题' : 'Frequently Asked Questions'}
          </h3>
          <div className="space-y-4">
            {blogFaqs(article, lang).map((f, i) => (
              <details key={i} className="border-b border-gray-100 pb-3 last:border-0">
                <summary className="font-semibold text-gray-700 cursor-pointer hover:text-orange-600 transition-colors">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

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