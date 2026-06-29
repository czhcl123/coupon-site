'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function AboutContent({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  const searchParams = useSearchParams()
  const rawLang = searchParams.get('lang')
  const lang: 'zh' | 'en' = initialLang ?? (rawLang === 'en' ? 'en' : 'zh')
  const nextLang: 'zh' | 'en' = lang === 'zh' ? 'en' : 'zh'

  const t = {
    zh: {
      title: '关于优惠总动员',
      subtitle: '实时汇总各大品牌的优惠券和折扣码',
      missionTitle: '我们的使命',
      missionBody: '优惠总动员致力于为中国用户汇总各品牌的最新优惠码,覆盖国际品牌(Nike、Adidas、Sephora、Steam、Booking.com 等)和国内特色品类(宠物用品、本地生活),让大家在网购时不再错过任何省钱机会。',
      howTitle: '数据来源',
      howBody: '我们通过三种方式获取优惠码:1) 商家官方活动页;2) 一手联盟合作伙伴提供的专属码;3) 用户投稿(我们会人工验证)。所有展示的优惠码均标注「已验证」或「独家」标签,过期优惠会及时清理。',
      affiliateTitle: '联盟链接说明',
      affiliateBody: '本站所有跳转链接均为联盟链接(Affiliate Links)。当您通过本站链接进入商家并完成购物,商家会向我们支付少量佣金以支持本站运营。您支付的价格与直接访问商家完全相同,不会因为使用本站链接而多付钱。这是一种 win-win 模式:您省钱,我们获得运营资金。',
      privacyTitle: '隐私与数据',
      privacyBody: '我们不收集用户的购物记录、个人身份信息(PII),也不投放跨站追踪广告。站内搜索基于 URL 参数,匿名且不持久化。',
      contactTitle: '联系我们',
      contactBody: '欢迎反馈优惠码问题、提交新优惠或商务合作:',
      contactEmail: '邮箱',
      backHome: '← 返回首页',
      lastUpdated: '最后更新',
      lastUpdatedDate: '2026 年 6 月 29 日',
    },
    en: {
      title: 'About Coupon Hub',
      subtitle: 'Real-time coupon aggregator for major brands',
      missionTitle: 'Our mission',
      missionBody: 'Coupon Hub helps shoppers save money by aggregating the latest promo codes from international brands (Nike, Adidas, Sephora, Steam, Booking.com, etc.) and domestic favorites (pet supplies, local services) in one place, with bilingual Chinese/English support.',
      howTitle: 'How we source coupons',
      howBody: 'Three channels: 1) Official brand promotion pages; 2) Exclusive codes from first-party affiliate partners; 3) User submissions (verified manually). All active codes are labeled "Verified" or "Exclusive"; expired codes are removed promptly.',
      affiliateTitle: 'Affiliate disclosure',
      affiliateBody: 'All outbound links are affiliate links. When you click through and complete a purchase, the merchant pays us a small commission at no extra cost to you. This is a win-win model: you save money, we earn operational funding.',
      privacyTitle: 'Privacy and data',
      privacyBody: 'We do not collect purchase histories, personally identifiable information, or run cross-site tracking ads. On-site search uses URL parameters only and is not persisted.',
      contactTitle: 'Contact us',
      contactBody: 'For coupon submissions, error reports, or business inquiries:',
      contactEmail: 'Email',
      backHome: '← Back to home',
      lastUpdated: 'Last updated',
      lastUpdatedDate: 'June 29, 2026',
    },
  }[lang]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href={`/?lang=${lang}`} className="flex-shrink-0 flex items-center gap-1.5 text-base font-bold text-orange-500 hover:text-orange-600 transition-colors">
            <span className="text-xl">🏷️</span>
            <span className="hidden sm:inline text-sm">{lang === 'zh' ? '优惠总动员' : 'Coupon Hub'}</span>
          </Link>
          <div className="flex-1" />
          <Link
            href={`/?lang=${nextLang}`}
            title={lang === 'zh' ? 'Switch to English' : '切换到中文'}
            className="flex-shrink-0 flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-orange-300 transition-colors"
          >
            <span>🌐</span>
            <span className="hidden sm:inline">{lang === 'zh' ? 'EN' : '中文'}</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-6">
        <section className="bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-2xl p-6 border border-orange-100 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
          <p className="text-sm text-gray-600">{t.subtitle}</p>
        </section>

        <article className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{t.missionTitle}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{t.missionBody}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{t.howTitle}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{t.howBody}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{t.affiliateTitle}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{t.affiliateBody}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{t.privacyTitle}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{t.privacyBody}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{t.contactTitle}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">{t.contactBody}</p>
            <ul className="text-sm space-y-1">
              <li>
                <strong className="text-gray-800">{t.contactEmail}:</strong>{' '}
                <a href="mailto:contact@coupon-site-production.up.railway.app" className="text-orange-600 hover:underline">
                  contact@coupon-site-production.up.railway.app
                </a>
              </li>
            </ul>
          </section>

          <section className="pt-4 border-t border-gray-100 text-xs text-gray-400">
            <p>{t.lastUpdated}: {t.lastUpdatedDate}</p>
          </section>
        </article>

        <div className="text-center">
          <Link href={`/?lang=${lang}`} className="text-sm text-orange-600 hover:text-orange-700 hover:underline">
            {t.backHome}
          </Link>
        </div>

        <nav className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
          <Link href={`/?lang=${lang}`} className="hover:text-orange-500">{lang === 'zh' ? '首页' : 'Home'}</Link>
          <span className="text-gray-200">·</span>
          <Link href={`/about?lang=${lang}`} className="hover:text-orange-500">{lang === 'zh' ? '关于' : 'About'}</Link>
          <span className="text-gray-200">·</span>
          <Link href={`/discount-calculator?lang=${lang}`} className="hover:text-orange-500">{lang === 'zh' ? '折扣计算器' : 'Calculator'}</Link>
          <span className="text-gray-200">·</span>
          <Link href={`/blog?lang=${lang}`} className="hover:text-orange-500">{lang === 'zh' ? '博客' : 'Blog'}</Link>
          <span className="text-gray-200">·</span>
          <a href="/llms.txt" className="hover:text-orange-500">llms.txt</a>
          <span className="text-gray-200">·</span>
          <a href="/rss.xml" className="hover:text-orange-500">RSS</a>
        </nav>
      </main>

      <footer className="bg-white border-t border-gray-100 mt-auto py-6 text-center text-xs text-gray-400">
        <p>本站所有链接均为联盟链接，购物可能获得佣金支持本站发展</p>
        <p className="mt-1">© 2026 优惠总动员 · 仅供信息分享</p>
      </footer>
    </div>
  )
}

export default function AboutClient({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <AboutContent initialLang={initialLang} />
    </Suspense>
  )
}