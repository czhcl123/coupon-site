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
      statsTitle: '本站数据',
      statBrands: '覆盖品牌',
      statBrandsValue: '15 个',
      statCoupons: '优惠来源', statCouponsValue: '官网/联盟/投稿', statSearch: '收录品类', statSearchValue: '5 大类', statUpdate: '更新方式', statUpdateValue: '人工核查',
      methodologyTitle: '验证方法论',
      methodologyBody: '我们的核查方式很简单:\n\n1. 来源:品牌官方活动页、联盟合作伙伴、用户投稿。\n\n2. 上架:有明确优惠内容才收录,标注适用条件。\n\n3. 下架:活动结束或收到失效反馈后人工下架;拿不到码时,页面直达官网活动页。',
      howTitle: '数据来源',
      howBody: '我们通过三种方式获取优惠码:1) 商家官方活动页;2) 一手联盟合作伙伴提供的专属码;3) 用户投稿(我们会人工验证)。活动结束或确认失效后下架;拿不到码的活动直达官网活动页。',
      affiliateTitle: '联盟链接说明',
      affiliateBody: '本站部分跳转链接为联盟链接(Affiliate Links)。当您通过本站链接进入商家并完成购物,商家会向我们支付少量佣金以支持本站运营。您支付的价格与直接访问商家完全相同,不会因为使用本站链接而多付钱。这是一种 win-win 模式:您省钱,我们获得运营资金。',
      privacyTitle: '隐私与数据',
      privacyBody: '我们不收集用户的购物记录、个人身份信息(PII),也不投放跨站追踪广告。站内搜索基于 URL 参数,匿名且不持久化。',
      teamTitle: '团队',
      teamBody: '优惠总动员由小编团队维护。原则很朴素:宁可少收录,也不虚标「已验证」。',
      faqTitle: '常见问题',
      faqItems: [
        { q: '优惠总动员是什么？', a: '优惠总动员是汇总中型品牌的优惠码 / 折扣码聚合站。我们覆盖 15 个品牌的官方促销与会员折扣,提供中英双语。' },
        { q: '本站收益怎么来的？', a: '我们与一些品牌有联盟推广合作。当你点击本站跳转链接进入品牌页面后完成购物，品牌会给我们一点佣金，你不会多付。' },
        { q: '优惠码为什么会失效？', a: '品牌方会定期更换促销活动,这很常见。活动结束我们会下架对应条目;拿不到码时,每个商家页都提供直达官网活动页的链接。' },
        { q: '能否提交新优惠码？', a: '可以。请发邮件到本页联系邮箱，附上优惠码详情（品牌、过期时间、限制）。我们在 24h 内人工验证，上线会回邮件。' },
        { q: '本站是否收集用户购物记录？', a: '不。本站不收集购物记录、身份信息，也不投放跨站追踪。所有站内搜索都是 URL 参数、匿名、不持久化。' },
        { q: '为什么有时看到不同价格的优惠码？', a: '品牌同一时间可能发不同消费门槛的码（例：满 50% 与任意使用）。高使用门槛的码往往折扣更大，被腘赖，跳其他码位置。' },
      ],
      contactTitle: '联系我们',
      contactBody: '欢迎反馈优惠码问题、提交新优惠或商务合作:',
      contactEmail: '邮箱',
      backHome: '← 返回首页',
      lastUpdated: '最后更新',
      lastUpdatedDate: '2026 年 10 月 16 日',
    },
    en: {
      title: 'About Coupon Hub',
      subtitle: 'Real-time coupon aggregator for major brands',
      missionTitle: 'Our mission',
      missionBody: 'Coupon Hub helps shoppers save money by aggregating the latest promo codes from international brands (Nike, Adidas, Sephora, Steam, Booking.com, etc.) and domestic favorites (pet supplies, local services) in one place, with bilingual Chinese/English support.',
      statsTitle: 'By the numbers',
      statBrands: 'Brands covered',
      statBrandsValue: '15',
      statCoupons: 'Offer sources', statCouponsValue: 'Official / Affiliate / Users', statSearch: 'Categories', statSearchValue: '5', statUpdate: 'Update method', statUpdateValue: 'Manual review',
      methodologyTitle: 'Verification methodology',
      methodologyBody: 'Our verification is simple and manual:\n\n1. Source: official brand promotion pages, affiliate partners, and user submissions.\n\n2. Publish: offers are listed only when the discount terms are clear.\n\n3. Remove: ended promotions are taken down, on schedule or after user reports; when no code works, the page links to the official sale.',
      howTitle: 'How we source coupons',
      howBody: 'Three channels: 1) Official brand promotion pages; 2) Exclusive codes from first-party affiliate partners; 3) User submissions (verified manually). Promotions are removed once they end; when no code works, the page links to the official sale.',
      affiliateTitle: 'Affiliate disclosure',
      affiliateBody: 'Some outbound links are affiliate links. When you click through and complete a purchase, the merchant pays us a small commission at no extra cost to you. This is a win-win model: you save money, we earn operational funding.',
      privacyTitle: 'Privacy and data',
      privacyBody: 'We do not collect purchase histories, personally identifiable information, or run cross-site tracking ads. On-site search uses URL parameters only and is not persisted.',
      teamTitle: 'Editorial team',
      teamBody: 'Coupon Hub is run by a small editorial team. Simple principle: we would rather list fewer offers than label anything "verified" without checking.',
      faqTitle: 'Frequently asked questions',
      faqItems: [
        { q: 'What is Coupon Hub?', a: 'Coupon Hub is a coupon and promo code aggregator for 15 mid-to-large brands across fashion, electronics, travel, and beauty. We track official promotions and member discounts across 15 brands, and support bilingual zh/en.' },
        { q: 'How does Coupon Hub make money?', a: 'We have affiliate partnerships with several brands. When you click a link on our site and complete a purchase, the merchant pays us a small commission — at no extra cost to you.' },
        { q: 'Why do coupon codes expire?', a: 'Brands rotate their promotions regularly; expiry is normal. We remove ended promotions promptly; every merchant page links straight to the official sale page.' },
        { q: 'Can I submit a new coupon code?', a: 'Yes. Email the address on this page with the code, brand, expiry date, and any restrictions. We verify manually within 24 hours and reply when published.' },
        { q: 'Does Coupon Hub collect my shopping data?', a: 'No. We do not collect purchase history, personally identifiable information, or run cross-site tracking. All on-site search is anonymous URL parameters and is not persisted.' },
        { q: 'Why do I see multiple coupons with different discounts?', a: 'Brands often run several promotions at the same time (e.g. 50% off with code A, free shipping with code B). Higher-discount codes usually have stricter conditions; we surface all of them so you can pick.' },
      ],
      contactTitle: 'Contact us',
      contactBody: 'For coupon submissions, error reports, or business inquiries:',
      contactEmail: 'Email',
      backHome: '← Back to home',
      lastUpdated: 'Last updated',
      lastUpdatedDate: 'October 16, 2026',
    },
  }[lang]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="flex-shrink-0 flex items-center gap-1.5 text-base font-bold text-orange-500 hover:text-orange-600 transition-colors">
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

          {/* 2026-07-19: 统计数字 强化 E-E-A-T权威信号 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{t.statsTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: t.statBrands, value: t.statBrandsValue },
                { label: t.statCoupons, value: t.statCouponsValue },
                { label: t.statSearch, value: t.statSearchValue },
                { label: t.statUpdate, value: t.statUpdateValue },
              ].map((s, i) => (
                <div key={i} className="bg-orange-50 border border-orange-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 2026-07-19: 可被引用的方法论块 (GEO citation bait) */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{t.methodologyTitle}</h2>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{t.methodologyBody}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{t.affiliateTitle}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{t.affiliateBody}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{t.privacyTitle}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{t.privacyBody}</p>
          </section>

          {/* 2026-07-19: 团队 信息源 (E-E-A-T 关键) */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{t.teamTitle}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{t.teamBody}</p>
            {/* 2026-07-19: visible author credit (Organization + Lead Editor) */}
            <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  E
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 text-sm">
                    {lang === 'zh' ? 'CouponSite 编辑团队 / 主编' : 'CouponSite Editorial Team / Lead Editor'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {lang === 'zh'
                      ? '人工核查 · 15 个品牌 · 官方促销'
                      : 'Manually reviewed · 15 brands · Official promotions'}
                  </div>
                  <div className="text-xs text-orange-600 mt-1">
                    {lang === 'zh' ? '经验领域：优惠券聚合、品牌推广、电商联盟' : 'Expertise: coupon aggregation, brand partnerships, e-commerce affiliate'}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2026-07-19: FAQ 块 (visible + schema.org/FAQPage) */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{t.faqTitle}</h2>
            <div className="space-y-3">
              {(t.faqItems as { q: string; a: string }[]).map((f, i) => (
                <details key={i} className="border-b border-gray-100 pb-3 last:border-0">
                  <summary className="font-semibold text-gray-700 cursor-pointer hover:text-orange-600 transition-colors text-sm">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{t.contactTitle}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">{t.contactBody}</p>
            <ul className="text-sm space-y-1">
              <li>
                <strong className="text-gray-800">{t.contactEmail}:</strong>{' '}
                <a href="mailto:czhcl@hotmail.com" className="text-orange-600 hover:underline">
                  czhcl@hotmail.com
                </a>
              </li>
            </ul>
          </section>

          <section className="pt-4 border-t border-gray-100 text-xs text-gray-400">
            <p>{t.lastUpdated}: {t.lastUpdatedDate}</p>
          </section>
        </article>

        <div className="text-center">
          <Link href="/" className="text-sm text-orange-600 hover:text-orange-700 hover:underline">
            {t.backHome}
          </Link>
        </div>

        <nav className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-orange-500">{lang === 'zh' ? '首页' : 'Home'}</Link>
          <span className="text-gray-200">·</span>
          <Link href="/about" className="hover:text-orange-500">{lang === 'zh' ? '关于' : 'About'}</Link>
          <span className="text-gray-200">·</span>
          <Link href="/discount-calculator" className="hover:text-orange-500">{lang === 'zh' ? '折扣计算器' : 'Calculator'}</Link>
          <span className="text-gray-200">·</span>
          <Link href="/blog" className="hover:text-orange-500">{lang === 'zh' ? '博客' : 'Blog'}</Link>
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