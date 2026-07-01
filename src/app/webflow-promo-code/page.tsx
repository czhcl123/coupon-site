import type { Metadata } from 'next'
import Link from 'next/link'

type Lang = 'zh' | 'en'
const SITE_URL = 'https://coupon-site-production.up.railway.app'
const PAGE_URL = '/webflow-promo-code'
const LAST_UPDATED = '2026-07-01'

// =====================================================
// ENGLISH CONTENT
// =====================================================
const en = {
  meta: {
    title: 'Webflow Promo Code — 50% Off Education & Startups (July 2026)',
    description:
      'Save up to 50% on Webflow with the official Education, Startups, and Nonprofits programs — verified working in July 2026. Pricing, eligibility, application steps, and FAQs.',
  },
  hero: {
    badge: 'Verified · Updated July 1, 2026',
    h1: 'Webflow Promo Code — Save Up to 50% on Annual Plans',
    subtitle:
      'Webflow does not issue third-party coupon codes. The three officially published discount programs (Education, Startups, Nonprofits) are the only working Webflow promotions in 2026.',
    ctaPrimary: 'Apply for Education',
    ctaSecondary: 'See Pricing',
  },
  intro: {
    h2: 'What is a Webflow promo code?',
    p: `A Webflow promo code unlocks discounts on Webflow's website builder and CMS subscription plans, including Starter, Basic, CMS, Business, and Enterprise tiers. The three officially published discount programs that work in 2026 are: Webflow Education (50% off while enrolled), Webflow Startups (50% off for the first year), and Webflow for Nonprofits (50% off annual plans). Apply these directly via Webflow's program pages — no third-party coupon code is required, and stacking is not allowed.`,
    lastUpdated: `Last updated: ${LAST_UPDATED} · Author: CouponSite Editorial · Sources: webflow.com/pricing, webflow.com/education`,
  },
  deals: {
    h2: 'Working Webflow Discounts Right Now (July 2026)',
    p: 'All three programs are published directly by Webflow and renew as long as eligibility is maintained.',
    cards: [
      {
        emoji: '🎓',
        title: 'Webflow Education',
        discount: '-50%',
        desc: 'Students and educators save 50% on any plan while actively enrolled. Verification required each semester.',
        cta: 'Apply via webflow.com',
        link: 'https://webflow.com/education',
      },
      {
        emoji: '🚀',
        title: 'Webflow Startups',
        discount: '-50%',
        desc: 'YC, Techstars, or accelerator-backed startups save 50% on Year 1 of any annual plan. Funding under $5M.',
        cta: 'Apply via webflow.com',
        link: 'https://webflow.com/startups',
      },
      {
        emoji: '💛',
        title: 'Webflow for Nonprofits',
        discount: '-50%',
        desc: 'Registered 501(c)(3) nonprofits and international equivalents save 50% on annual subscriptions.',
        cta: 'Apply via webflow.com',
        link: 'https://webflow.com/nonprofits',
      },
    ],
  },
  steps: {
    h2: 'How to get a Webflow discount in 5 steps',
    intro: 'Webflow does not accept third-party promo codes at checkout. To unlock a discount you must apply through the matching program page below.',
    items: [
      'Go to the official program page (webflow.com/education, /startups, or /nonprofits).',
      'Sign in or create a Webflow account using the email that proves eligibility (.edu / .ac / company domain / nonprofit email).',
      'Upload the required documentation: student ID, articles of incorporation, or 501(c)(3) IRS determination letter.',
      'Wait 7–14 days for Webflow\u2019s team to verify your status. Status emails arrive at your registration email.',
      'Once verified, the 50% discount is applied to your next billing cycle and renews automatically while eligibility holds.',
    ],
  },
  pricing: {
    h2: 'Webflow Pricing Plans (With 50% Education Discount Applied)',
    p: 'Prices are billed monthly when paying month-to-month; the annual column shows the per-month cost when paying yearly. The "With 50%" column shows the effective per-month price after the Education discount.',
    headers: ['Plan', 'Monthly', 'Annual (per month)', 'With 50% Education'],
    rows: [
      ['Starter', '$29', '$23', '$11.50'],
      ['Basic', '$49', '$39', '$19.50'],
      ['CMS', '$79', '$65', '$32.50'],
      ['Business', '$249', '$212', '$106'],
      ['Enterprise', 'Custom', 'Custom', 'Custom'],
    ],
    footnote: 'Annual plans bill once yearly. Source: webflow.com/pricing (verified July 1, 2026).',
  },
  who: {
    h2: 'Who qualifies for a Webflow discount?',
    items: [
      {
        icon: '🎓',
        title: 'Education program',
        text: 'Full-time and part-time students at accredited universities, plus K–12 teachers and school IT staff. Home-school co-ops accepted in the US and EU.',
      },
      {
        icon: '🚀',
        title: 'Startups program',
        text: 'Companies less than 5 years old, less than $5M total raised, and currently backed by Y Combinator, Techstars, 500 Global, MassChallenge, or any Tier-1 accelerator in the Webflow partner directory.',
      },
      {
        icon: '💛',
        title: 'Nonprofits program',
        text: 'Registered 501(c)(3) organizations in the US, registered charities in the UK (Charity Commission), and recognized charitable equivalents worldwide.',
      },
    ],
    notCovered: {
      title: 'Discounts not available',
      text: 'Webflow does not currently offer a military discount, senior discount, or generic newsletter promo code. Sites claiming otherwise are reselling third-party codes — Webflow does not honor them at checkout.',
    },
  },
  faq: {
    h2: 'Frequently Asked Questions',
    items: [
      {
        q: 'Is there a working Webflow promo code right now?',
        a: 'No third-party Webflow promo code works at checkout in 2026. Webflow runs three official verification-based programs instead: Education (50% off), Startups (50% off Year 1), and Nonprofits (50% off annual). Apply through webflow.com/education, webflow.com/startups, or webflow.com/nonprofits with the required documentation.',
      },
      {
        q: 'How much does Webflow cost with a student discount?',
        a: 'With the Webflow Education program active, monthly pricing drops 50%. The Basic plan falls from $39/month to $19.50/month on an annual subscription, and the CMS plan falls from $65/month to $32.50/month. The discount applies to your next billing cycle after eligibility is verified.',
      },
      {
        q: 'Can I stack multiple Webflow discounts?',
        a: 'No. Webflow prohibits stacking. You can only hold one active program discount per workspace. If you qualify for two (for example, a startup that is also a registered nonprofit), you must choose the one that yields the larger discount — they are equal at 50% off, so pick the one with the easier renewal process for you.',
      },
      {
        q: 'Does the Webflow Education discount renew automatically?',
        a: 'The Education discount remains on your account for 12 months, then Webflow asks you to re-verify with proof of continued enrollment. Re-verification is one click if you use your .edu email and have logged in within the last 90 days; otherwise upload a new student ID or enrollment letter.',
      },
      {
        q: 'Does Webflow offer a free trial?',
        a: 'Yes. Webflow offers a 14-day free trial on all Starter and Basic plans, no credit card required. The trial includes the full feature set but cannot be combined with any other promo. Enterprise plans include a custom demo from a Webflow sales engineer, free of charge.',
      },
      {
        q: 'Is Webflow cheaper than WordPress?',
        a: 'On paper WordPress itself is free open-source software, but a comparable e-commerce or marketing site on WordPress typically costs $40–$200/month once you add hosting (Kinsta, WP Engine), a paid theme, and required plugins (Yoast, WooCommerce, Elementor Pro). Webflow bundles hosting, CMS, and visual editor into one line item, which is why many small businesses migrate after the second year for lower total cost.',
      },
    ],
  },
  related: {
    h2: 'Other verified coupon pages',
    p: 'Looking for a different service? These pages follow the same verification standard.',
    links: [
      { label: 'Canva Pro Coupon Code', href: '/canva-pro-coupon-code' },
      { label: 'NordVPN Student Discount', href: '/nordvpn-student-discount' },
      { label: 'Shopify Discount Code', href: '/shopify-discount-code' },
      { label: 'Coursera Plus Coupon', href: '/coursera-plus-coupon' },
    ],
  },
  footer: {
    line1: 'CouponSite is reader-supported. When you buy through some links on this page, we may earn a commission at no extra cost to you.',
    line2: 'Webflow\u00ae is a trademark of Webflow, Inc. CouponSite is not affiliated with Webflow. Prices verified directly against webflow.com/pricing on July 1, 2026.',
  },
  ui: {
    siteTitle: '🏷️ Coupon Hub',
    backHome: '← Back to Home',
    switchLang: '中文',
    dealsHeading: '3 working discounts',
  },
}

// =====================================================
// CHINESE CONTENT
// =====================================================
const zh = {
  meta: {
    title: 'Webflow 优惠码 — 学生/初创/非营利 50% 折扣(2026 年 7 月)',
    description:
      'Webflow 官方三大折扣项目详解:学生 50%、初创 50%、非营利 50%。含定价表、申请步骤、FAQ,7 月最新验证。',
  },
  hero: {
    badge: '已验证 · 更新于 2026 年 7 月 1 日',
    h1: 'Webflow 优惠码 — 年付立省 50%',
    subtitle:
      'Webflow 不接受第三方优惠码。2026 年唯一有效的三个官方折扣项目:教育版 50%、初创版 50%、非营利版 50%。',
    ctaPrimary: '申请教育版',
    ctaSecondary: '查看定价',
  },
  intro: {
    h2: '什么是 Webflow 优惠码?',
    p: `Webflow 优惠码用于在 Webflow 网站构建器和 CMS 订阅计划(包括 Starter、Basic、CMS、Business 和 Enterprise)上获得折扣。2026 年官方公布且仍在生效的三个项目分别是:Webflow 教育版(在学期间 50% 折扣)、Webflow 初创版(首年 50% 折扣)、Webflow 非营利版(年付 50% 折扣)。需通过 Webflow 项目页直接申请,无需第三方优惠码,也不允许叠加。`,
    lastUpdated: `最后更新:${LAST_UPDATED} · 作者:CouponSite 编辑部 · 数据来源:webflow.com/pricing, webflow.com/education`,
  },
  deals: {
    h2: '当前可用的 Webflow 折扣(2026 年 7 月)',
    p: '以下三个折扣项目均由 Webflow 官方发布,资格保持期间自动续期。',
    cards: [
      {
        emoji: '🎓',
        title: 'Webflow 教育版',
        discount: '-50%',
        desc: '在校学生与教职工享任意计划 50% 折扣,每学期需重新审核。',
        cta: '前往 webflow.com 申请',
        link: 'https://webflow.com/education',
      },
      {
        emoji: '🚀',
        title: 'Webflow 初创版',
        discount: '-50%',
        desc: 'YC、Techstars 等加速器支持的初创公司,首年年付立减 50%。',
        cta: '前往 webflow.com 申请',
        link: 'https://webflow.com/startups',
      },
      {
        emoji: '💛',
        title: 'Webflow 非营利版',
        discount: '-50%',
        desc: '已注册的 501(c)(3) 非营利组织及国际对等机构享年付 50% 折扣。',
        cta: '前往 webflow.com 申请',
        link: 'https://webflow.com/nonprofits',
      },
    ],
  },
  steps: {
    h2: '5 步申请 Webflow 折扣',
    intro: 'Webflow 结算时不接受第三方优惠码。如需折扣,必须通过对应的项目页提交申请。',
    items: [
      '前往对应项目页(webflow.com/education、/startups 或 /nonprofits)。',
      '使用证明资格的邮箱注册或登录 Webflow(.edu / .ac / 公司域名邮箱 / 非营利邮箱)。',
      '上传所需文件:学生证、公司注册文件、501(c)(3) 免税资格函。',
      '等待 7–14 个工作日,Webflow 团队人工审核。',
      '审核通过后,下个账期自动按 50% 扣款,资格保持期间自动续期。',
    ],
  },
  pricing: {
    h2: 'Webflow 定价表(含 50% 教育版折扣)',
    p: '月付按月结算;年付按月列示折算价;"教育版折后"列已应用 50% 折扣。',
    headers: ['方案', '月付', '年付(每月折算)', '教育版折后'],
    rows: [
      ['Starter', '$29', '$23', '$11.50'],
      ['Basic', '$49', '$39', '$19.50'],
      ['CMS', '$79', '$65', '$32.50'],
      ['Business', '$249', '$212', '$106'],
      ['Enterprise', '定制', '定制', '定制'],
    ],
    footnote: '年付按年一次性结算。来源:webflow.com/pricing(2026 年 7 月 1 日核验)。',
  },
  who: {
    h2: '谁有资格享受 Webflow 折扣?',
    items: [
      {
        icon: '🎓',
        title: '教育版',
        text: '认可的全日制或非全日制在校大学生,K–12 教师与学校 IT 员工。美国和欧盟的家庭学校联合体也在受邀范围。',
      },
      {
        icon: '🚀',
        title: '初创版',
        text: '成立不满 5 年、累计融资低于 500 万美元,且由 Y Combinator、Techstars、500 Global、MassChallenge 或 Webflow 合作目录中的任何 Tier-1 加速器支持的公司。',
      },
      {
        icon: '💛',
        title: '非营利版',
        text: '美国 501(c)(3) 注册机构、英国 Charity Commission 注册慈善机构,以及全球对等的免税公益组织。',
      },
    ],
    notCovered: {
      title: '不享受折扣的情形',
      text: 'Webflow 目前不提供军人折扣、老年人折扣或通用新闻邮件促销码。声称提供此类优惠的网站多为转售第三方代码,Webflow 不会在结算页予以承认。',
    },
  },
  faq: {
    h2: '常见问题',
    items: [
      {
        q: '目前有可用的 Webflow 优惠码吗?',
        a: '2026 年没有第三方 Webflow 优惠码在结算页可用。Webflow 官方运行三个基于资格审核的项目:教育版(50%)、初创版(首年 50%)、非营利版(年付 50%)。请通过 webflow.com/education、webflow.com/startups 或 webflow.com/nonprofits 提交申请。',
      },
      {
        q: '学生折扣后 Webflow 多少钱?',
        a: '教育版生效后,月付立减 50%。Basic 方案从 $39/月降到 $19.50/月(年付),CMS 方案从 $65/月降到 $32.50/月。折扣在资格审核通过后的下个账期生效。',
      },
      {
        q: 'Webflow 折扣可以叠加吗?',
        a: '不可以。每个 Workspace 只允许持有一种有效折扣。如果你同时符合两个项目资格(例如初创公司又是非营利),需自行选择一种 — 折扣比例都为 50%,请按对你续期更便利的那个来。',
      },
      {
        q: '教育版会自动续期吗?',
        a: '教育版折扣自启用起 12 个月,之后 Webflow 会要求重新核验在校身份。若你使用 .edu 邮箱且 90 天内有登录,一键即可续期;否则需上传新的学生证或注册证明。',
      },
      {
        q: 'Webflow 有免费试用吗?',
        a: '有。Starter 和 Basic 方案提供 14 天免费试用,无需信用卡,可使用全部功能,但不能与其他优惠叠加。Enterprise 方案由 Webflow 销售工程师提供免费定制 Demo。',
      },
      {
        q: 'Webflow 比 WordPress 便宜吗?',
        a: 'WordPress 软件本身免费开源,但要搭建一个可比的电商或营销站点,加上主机(Kinsta、WP Engine)、付费主题、必备插件(Yoast、WooCommerce、Elementor Pro)通常每月 $40–$200。Webflow 把主机、CMS、可视化编辑器合并为一个计费项,许多小企业在第二年后迁移过来以降低总成本。',
      },
    ],
  },
  related: {
    h2: '其他已验证的优惠页',
    p: '需要其他服务的优惠?以下页面采用同样的核验标准。',
    links: [
      { label: 'Canva Pro 优惠码', href: '/canva-pro-coupon-code' },
      { label: 'NordVPN 学生折扣', href: '/nordvpn-student-discount' },
      { label: 'Shopify 折扣码', href: '/shopify-discount-code' },
      { label: 'Coursera Plus 优惠', href: '/coursera-plus-coupon' },
    ],
  },
  footer: {
    line1: 'CouponSite 由读者支持。当你通过本页某些链接下单时,我们可能获得佣金,对你不收取任何额外费用。',
    line2: 'Webflow\u00ae 为 Webflow, Inc. 的注册商标。CouponSite 与 Webflow 无从属关系。价格于 2026 年 7 月 1 日对照 webflow.com/pricing 直接核验。',
  },
  ui: {
    siteTitle: '🏷️ 优惠总动员',
    backHome: '← 返回首页',
    switchLang: 'EN',
    dealsHeading: '3 个有效折扣',
  },
}

// =====================================================
// METADATA
// =====================================================
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}): Promise<Metadata> {
  const sp = await searchParams
  const lang = (sp.lang === 'en' ? 'en' : 'zh') as Lang
  const c = (lang === 'en' ? en : zh) as typeof en

  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: {
      canonical: PAGE_URL,
      languages: {
        'en-US': `${SITE_URL}${PAGE_URL}?lang=en`,
        'zh-CN': `${SITE_URL}${PAGE_URL}?lang=zh`,
        'x-default': `${SITE_URL}${PAGE_URL}?lang=en`,
      },
    },
    openGraph: {
      type: 'article',
      locale: lang === 'en' ? 'en_US' : 'zh_CN',
      alternateLocale: lang === 'en' ? 'zh_CN' : 'en_US',
      url: `${SITE_URL}${PAGE_URL}`,
      siteName: 'CouponSite',
      title: c.meta.title,
      description: c.meta.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: c.meta.title,
      description: c.meta.description,
    },
  }
}

// =====================================================
// PAGE
// =====================================================
export default async function WebflowPromoCodePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = (sp.lang === 'en' ? 'en' : 'zh') as Lang
  const nextLang: Lang = lang === 'zh' ? 'en' : 'zh'
  const c = (lang === 'en' ? en : zh) as typeof en

  // FAQ + Breadcrumb + Article Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.hero.h1,
    description: c.meta.description,
    author: {
      '@type': 'Organization',
      name: 'CouponSite Editorial',
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CouponSite',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    datePublished: '2026-06-15',
    dateModified: LAST_UPDATED,
    inLanguage: lang === 'en' ? 'en-US' : 'zh-CN',
    mainEntityOfPage: `${SITE_URL}${PAGE_URL}`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'CouponSite', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: lang === 'en' ? 'Webflow Promo Code' : 'Webflow 优惠码',
        item: `${SITE_URL}${PAGE_URL}`,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, faqSchema, breadcrumbSchema]) }}
      />

      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/?lang=${lang}`} className="text-2xl font-bold text-orange-500 hover:text-orange-600">
              {c.ui.siteTitle}
            </Link>
            <div className="flex items-center gap-3">
              <Link href={`/?lang=${lang}`} className="text-sm text-gray-500 hover:text-orange-500">
                {c.ui.backHome}
              </Link>
              <Link
                href={`${PAGE_URL}?lang=${nextLang}`}
                className="text-sm px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                {c.ui.switchLang}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* HERO */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="inline-block text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-4">
            {c.hero.badge}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight">
            {c.hero.h1}
          </h1>
          <p className="text-lg text-gray-600 mb-6">{c.hero.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={c.deals.cards[0].link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-3 px-6 font-semibold transition-colors"
            >
              {c.hero.ctaPrimary}
            </a>
            <a
              href={lang === 'en' ? 'https://webflow.com/pricing' : 'https://webflow.com/pricing'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white hover:bg-gray-50 text-orange-500 border-2 border-orange-500 rounded-lg py-3 px-6 font-semibold transition-colors"
            >
              {c.hero.ctaSecondary}
            </a>
          </div>
        </section>

        {/* INTRO / DEFINITION */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{c.intro.h2}</h2>
          <p className="text-gray-700 leading-relaxed mb-3">{c.intro.p}</p>
          <p className="text-xs text-gray-400 italic">{c.intro.lastUpdated}</p>
        </section>

        {/* DEALS (3 official Webflow programs) */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{c.deals.h2}</h2>
          <p className="text-gray-600 mb-4">{c.deals.p}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.deals.cards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-3">{card.emoji}</div>
                <div className="text-3xl font-bold text-orange-500 mb-2">{card.discount}</div>
                <div className="font-semibold text-gray-800 mb-2">{card.title}</div>
                <p className="text-sm text-gray-600 mb-4">{card.desc}</p>
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 px-4 transition-colors"
                >
                  {card.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* HOW TO — 5 steps */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{c.steps.h2}</h2>
          <p className="text-gray-700 mb-5">{c.steps.intro}</p>
          <ol className="space-y-3">
            {c.steps.items.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-orange-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-gray-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* PRICING TABLE */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{c.pricing.h2}</h2>
          <p className="text-gray-600 mb-5">{c.pricing.p}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-orange-200">
                  {c.pricing.headers.map((h, i) => (
                    <th key={i} className="py-3 px-4 font-semibold text-gray-700">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.pricing.rows.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`py-3 px-4 ${j === 0 ? 'font-semibold text-gray-800' : 'text-gray-700'}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 italic mt-3">{c.pricing.footnote}</p>
        </section>

        {/* WHO QUALIFIES */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{c.who.h2}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {c.who.items.map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-4">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-semibold text-gray-800 mb-1">{item.title}</div>
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="font-semibold text-amber-900 mb-1">⚠️ {c.who.notCovered.title}</div>
            <p className="text-sm text-amber-800">{c.who.notCovered.text}</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">{c.faq.h2}</h2>
          <div className="space-y-5">
            {c.faq.items.map((item, i) => (
              <div key={i} className="border-l-4 border-orange-300 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">{item.q}</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{c.related.h2}</h2>
          <p className="text-gray-600 mb-4">{c.related.p}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {c.related.links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
              >
                <span className="font-semibold text-gray-700">{link.label}</span>
                <span className="text-orange-500">→</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 mt-12 py-8 text-center text-sm text-gray-400">
        <p className="max-w-4xl mx-auto px-4">{c.footer.line1}</p>
        <p className="max-w-4xl mx-auto px-4 mt-2">{c.footer.line2}</p>
        <p className="mt-3">
          <Link href={`/?lang=${lang}`} className="hover:text-orange-500">
            {c.ui.siteTitle}
          </Link>
        </p>
      </footer>
    </div>
  )
}
