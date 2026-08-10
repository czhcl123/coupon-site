import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 86400

type Lang = 'zh' | 'en'
const SITE_URL = 'https://coupon-site-production.up.railway.app'
const PAGE_URL = '/shopify-discount-code'
const LAST_UPDATED = '2026-07-01'

// =====================================================
// ENGLISH CONTENT
// =====================================================
const en = {
  meta: {
    title: 'Shopify Discount Code — Real Ways to Save in 2026 (No Third-Party Codes)',
    description:
      'Shopify does not accept third-party discount codes. Alternatives: 3-day free trial, annual billing savings, rate-locking before 2027 price increase.',
  },
  hero: {
    badge: 'Verified · Updated July 1, 2026',
    h1: 'Shopify Discount Code — Real Ways to Save on Shopify',
    subtitle:
      'Shopify does not accept third-party promo codes on any subscription tier in 2026. Below is a working strategy using the free trial, annual billing, and rate lock before the 2027 hike.',
    ctaPrimary: 'Start 3-Day Free Trial',
    ctaSecondary: 'See Pricing',
  },
  intro: {
    h2: 'Is there a Shopify discount code that works?',
    p: `No, not in the way most people search for one. Shopify does not accept third-party discount codes at checkout on its Starter, Basic, Shopify, or Advanced plans \u2014 any code you find on a coupon site will fail. The only legitimate path to a lower Shopify bill is structural: use the 3-day free trial to verify the product fits before committing, switch from monthly to annual billing to lock in a 25% saving, and avoid price-hike exposure by renewing annual plans before the next rate increase, which historically happens once per 18 months. Shopify Plus is reserved for high-volume merchants and uses custom contract pricing, not coupon codes.`,
    lastUpdated: `Last updated: ${LAST_UPDATED} · Author: CouponSite Editorial · Sources: shopify.com/pricing, shopify.com/free-trial`,
  },
  deals: {
    h2: 'Working Money-Saving Strategies (July 2026)',
    p: 'Three strategies actually move the needle on Shopify spend. None require entering any code.',
    cards: [
      {
        emoji: '🆓',
        title: '3-Day Free Trial',
        discount: '$0',
        desc: 'Start a full Shopify Basic store for 3 days with no credit card required. Test themes, payment gateways, and dashboard before committing. Cancel in one click before the trial ends or you remain on the free pause plan.',
        cta: 'Start free trial',
        link: 'https://www.shopify.com/free-trial',
      },
      {
        emoji: '📆',
        title: 'Annual Billing Saves 25%',
        discount: '-25%',
        desc: 'Pay monthly \u2014 or pay once a year and effectively save 25%. Example: Basic plan drops from $49/month to $39/month (billed yearly as $468 once). Mid-year switch is possible from your plan settings.',
        cta: 'See pricing',
        link: 'https://www.shopify.com/pricing',
      },
      {
        emoji: '🔒',
        title: 'Lock Rate Before 2027 Hike',
        discount: 'PROTECT',
        desc: 'Shopify raised prices in 2023 and 2024 (Basic: $29 \u2192 $39). Annual renewal locks current rate for 12 months even if Shopify announces a hike mid-year \u2014 customers are grandfathered.',
        cta: 'Renew annually',
        link: 'https://www.shopify.com/pricing',
      },
    ],
  },
  steps: {
    h2: 'How to reduce your Shopify bill in 5 steps',
    intro: 'These five practical moves actually impact your Shopify cost. None of them require a non-existent promo code.',
    items: [
      'Start with the free 3-day trial (no credit card) to validate the platform \u2014 import a product, place a test order, refund it.',
      'If committed, choose Basic (most stores) or Shopify (dropshipping / multi-channel) and select Annual billing at signup \u2014 the 25% saving begins immediately.',
      'On annual renewal every year, lock in current pricing for 12 months even if Shopify announces a mid-year increase. The rate is grandfathered.',
      'Pause rather than cancel: if you have a slow season, switch the store to "paused" status at $0/month instead of canceling \u2014 all products, themes, and design remain intact for 90 days.',
      'For Shopify Payments, use the standard rates \u2014 third-party gateway surcharges negate the saving. For shipping, negotiate directly with USPS/UPS accounts after $5k/mo shipping volume.',
    ],
  },
  pricing: {
    h2: 'Shopify Pricing Plans (Annual vs Monthly, July 2026)',
    p: 'The "Annual" column shows the per-month equivalent when paying yearly. Pause is a $0/month state that keeps the store dormant but recoverable for 90 days.',
    headers: ['Plan', 'Monthly billing', 'Annual (per month)', 'Strategy'],
    rows: [
      ['Starter ($5 plan, social-only)', '$5', '$5', 'No annual discount'],
      ['Basic', '$49', '$39', 'Free trial then annual'],
      ['Shopify', '$105', '$89', 'Free trial then annual'],
      ['Advanced', '$399', '$399', 'Annual saves ~$240\u2013$1k/yr'],
      ['Pause (store asleep)', '$0', '$0', 'During slow seasons'],
    ],
    footnote: 'Source: shopify.com/pricing (verified July 1, 2026). Shopify Plus pricing is custom and not listed.',
  },
  who: {
    h2: 'Who actually saves money on Shopify?',
    items: [
      {
        icon: '🛍️',
        title: 'New merchants validating demand',
        text: 'If you launch under $5k/mo revenue, the 3-day trial + annual billing Basic plan covers 12 months for $468 \u2014 that is your all-in Shopify cost year one. Pause through slow seasons, resume when sales pick up.',
      },
      {
        icon: '📊',
        title: 'Established stores growing mid-year',
        text: 'When you upgrade from Basic to Shopify mid-year, Shopify charges a prorated amount for the remaining days then bills annually at the new tier. After 30 days of running on the new plan, contact Shopify Support to confirm annual-pricing intent \u2014 they often grandfather the start date so the next renewal is annual.',
      },
      {
        icon: '🏢',
        title: 'Agencies and freelancers',
        text: 'Buy one Shopify Plus partner account ($2k+/mo) and resell it to 5\u201320 clients under your own billing at markup. Shopify has a partner program with up to 50% off your plan if you sell 5+ Shopify Plans as a partner in a 12-month cycle.',
      },
    ],
    notCovered: {
      title: 'What does not work',
      text: 'There is no generic Shopify discount code, no military discount, no senior discount, no student discount on the subscription itself. Sites claiming so are reselling trial-account hacks or link farms. The paths above are the only structural savings in 2026.',
    },
  },
  faq: {
    h2: 'Frequently Asked Questions',
    items: [
      {
        q: 'Is there a Shopify discount code right now?',
        a: 'No third-party Shopify discount code works at checkout in 2026. Shopify does not provide discount codes for its subscription plans; it offers flat pricing instead. The only working money-saving paths are the 3-day free trial, annual billing (effectively -25%), and rate-locking before the next price increase. Shopify Plus is custom-priced.',
      },
      {
        q: 'How much does Shopify cost per month?',
        a: 'In July 2026, Shopify pricing is: Starter $5/month (social-only stores), Basic $49/month or $39/month on annual, Shopify $105/month or $89/month on annual, Advanced $399/month. Annual billing saves roughly 25% versus monthly. There is no startup or pay-once-only plan.',
      },
      {
        q: 'Does Shopify have a free trial?',
        a: 'Yes. Shopify offers a 3-day free trial with no credit card required at signup. After 3 days the trial store pauses automatically and you can choose to subscribe, switch to a different plan, or hold the pause for 90 days without losing products, themes, or customer data.',
      },
      {
        q: 'Can I get a refund on Shopify?',
        a: 'Yes \u2014 within 30 days of a subscription charge, Shopify refunds subscriptions in full via the live chat or chat-bubble support. After 30 days, refunds are case-by-case and usually reserved for technical issues. The pause-don\u2019t-cancel approach is the more reliable refund-equivalent for slow seasons.',
      },
      {
        q: 'Is Shopify free for students?',
        a: 'No Shopify subscription discount specifically for students. Shopify Partners program offers store-design benefits to students in design programs at accredited universities, and Shopify has free certification courses (Shopify Academy) that teach you to build stores for clients \u2014 useful for side income, but they do not include a free Shopify subscription for personal use.',
      },
      {
        q: 'Is Shopify cheaper than WooCommerce?',
        a: 'On raw subscription cost, Shopify Basic ($39/mo annual) is higher than WordPress + WooCommerce ($5\u201325/mo hosting + paid plugins). But Shopify includes hosting, security, CDN, payment processing, theme infrastructure, and 24/7 chat support in one line item \u2014 which is roughly $40\u2013$80/mo in equivalent WordPress overhead. For most merchants processing $1\u201320k/mo in revenue, Shopify has lower total cost than self-hosted WooCommerce.',
      },
    ],
  },
  related: {
    h2: 'Other verified coupon pages',
    p: 'If you sell physical or digital goods on Shopify, these adjacent pages cover common tools that integrate with your store.',
    links: [
      { label: 'Webflow Promo Code (50% Education)', href: '/webflow-promo-code' },
      { label: 'Canva Pro Coupon Code (Free Education)', href: '/canva-pro-coupon-code' },
                ],
  },
  crossSite: {
    h2: 'Calculators and tools for Shopify merchants',
    p: 'Our sister site has free browser tools that work alongside your store \u2014 no login required.',
    links: [
      { label: 'Discount Calculator (price-after-promo math)', href: 'https://tools-site-production.up.railway.app/discount-calculator' },
      { label: 'Invoice Generator (wholesale order invoices)', href: 'https://tools-site-production.up.railway.app/invoice-generator' },
    ],
  },
  footer: {
    line1: 'CouponSite is reader-supported. When you buy through some links on this page, we may earn a commission at no extra cost to you.',
    line2: 'Shopify\u00ae is a trademark of Shopify Inc. CouponSite is not affiliated with Shopify. Prices verified directly against shopify.com/pricing on July 1, 2026.',
  },
  ui: {
    siteTitle: '🏷️ Coupon Hub',
    backHome: '← Back to Home',
    switchLang: '中文',
  },
}

// =====================================================
// CHINESE CONTENT
// =====================================================
const zh = {
  meta: {
    title: 'Shopify 优惠码 — 2026 年真实省钱方式(无第三方码)',
    description:
      'Shopify 不接受第三方优惠码。2026 年 7 月可用路径:3 天免费试用、年付 25% 折扣、2027 涨价前锁定价格。',
  },
  hero: {
    badge: '已验证 · 更新于 2026 年 7 月 1 日',
    h1: 'Shopify 优惠码 — 实际能省钱的 3 种方法',
    subtitle:
      'Shopify 不接受任何第三方折扣码适用于其订阅计划。2026 年的省钱策略只能走结构性路径:免费试用、年付折扣、2027 涨价前锁定。',
    ctaPrimary: '开始 3 天免费试用',
    ctaSecondary: '查看定价',
  },
  intro: {
    h2: '真有可用的 Shopify 优惠码吗?',
    p: `没有,至少不是大家搜索时期望的那种。Shopify 在 Starter、Basic、Shopify 或 Advanced 任何订阅档都不接受第三方优惠码,在结算页都会报错。降低 Shopify 费用的合法路径只有结构性方式:用 3 天免费试用先验证产品契合度,然后从月付切换到年付锁定 25% 节省,再通过每年续订避免下一年 18 个月一次的涨价。Shopify Plus 仅供高交易量商家使用,采用合同定价,不接受优惠码。`,
    lastUpdated: `最后更新:${LAST_UPDATED} · 作者:CouponSite 编辑部 · 数据来源:shopify.com/pricing, shopify.com/free-trial`,
  },
  deals: {
    h2: '2026 年 7 月可用的省钱路径',
    p: '三种策略真正能影响 Shopify 支出,都不需要输入任何代码。',
    cards: [
      {
        emoji: '🆓',
        title: '3 天免费试用',
        discount: '$0',
        desc: '无需信用卡即可完整使用 Shopify Basic 店铺 3 天。试用主题、支付网关和后台后再做决定。试用期结束前点击取消,或保留免费暂停状态。',
        cta: '开始试用',
        link: 'https://www.shopify.com/free-trial',
      },
      {
        emoji: '📆',
        title: '年付立省 25%',
        discount: '-25%',
        desc: '月付 \u2014 或年付一次结算,等价省 25%。例如 Basic 从 $49/月 降到 $39/月(年付一次性 $468)。中途可在计划设置里切换。',
        cta: '查看定价',
        link: 'https://www.shopify.com/pricing',
      },
      {
        emoji: '🔒',
        title: '在 2027 涨价前锁定价格',
        discount: '锁定',
        desc: 'Shopify 在 2023、2024 各涨过一次(Basic: $29 \u2192 $39)。每年续订年付可锁定当前价格 12 个月,即使 Shopify 宣布涨价也以现有费率老用户过渡。',
        cta: '续订年付',
        link: 'https://www.shopify.com/pricing',
      },
    ],
  },
  steps: {
    h2: '5 步降低 Shopify 账单',
    intro: '这 5 个实用的操作真的能影响你的 Shopify 成本,都不需要任何不存在的优惠码。',
    items: [
      '先用免费 3 天试用(无需信用卡)验证平台 \u2014 导入产品、下一笔测试订单、退款。',
      '确定后,选 Basic(大部分店铺)或 Shopify(多渠道/代发货),注册时直接年付 \u2014 25% 折扣立即生效。',
      '每年续订年付,在 Shopify 中途涨价的情况下也能锁定当前价 12 个月,价格老用户过渡。',
      '淡季时暂停而非取消:店铺切到"暂停"状态 $0/月,商品、主题、设计 90 天内完整保留。',
      '支付网关用 Shopify Payments 标准费率 \u2014 第三方支付网关附加费会抵消节省。运费在月发货量超过 $5k 后直接与 USPS/UPS 谈账户折扣。',
    ],
  },
  pricing: {
    h2: 'Shopify 定价表(月付 vs 年付,2026 年 7 月)',
    p: '"年付"列为按年结算的每月折算价;"暂停"档为 $0/月的冬眠状态,店铺可保留 90 天随时恢复。',
    headers: ['方案', '月付', '年付(每月折算)', '建议'],
    rows: [
      ['Starter(社交店铺)', '$5', '$5', '无年付折扣'],
      ['Basic', '$49', '$39', '免费试用后年付'],
      ['Shopify', '$105', '$89', '免费试用后年付'],
      ['Advanced', '$399', '$399', '年付每年约省 $240-$1k'],
      ['暂停(店铺休眠)', '$0', '$0', '淡季启用'],
    ],
    footnote: '来源:shopify.com/pricing(2026 年 7 月 1 日核验)。Shopify Plus 报价另行定制。',
  },
  who: {
    h2: '谁真的能在 Shopify 上省钱?',
    items: [
      {
        icon: '🛍️',
        title: '验证期的初期商家',
        text: '如果你是首年月收入低于 $5k 的新商家,3 天免费试用 + Basic 年付覆盖 12 个月总计 $468 \u2014 这就是 Shopify 第一年的全部成本。淡季可暂停,旺季恢复。',
      },
      {
        icon: '📊',
        title: '正在成长的成熟店铺',
        text: '中途从 Basic 升级到 Shopify 时,Shopify 按剩余天数折算费用,然后按新档次年付。运行 30 天后联系 Shopify Support 确认年付起始日,他们通常会老用户过渡到首次年付,让你下次续订就是年付周期。',
      },
      {
        icon: '🏢',
        title: '代理商与自由职业者',
        text: '买一份 Shopify Plus 合作账户($2k+/月),转售给 5\u201320 个客户,按你的额度加价。Shopify 合作项目对每年成功售出 5+ Shopify Plan 的合作伙伴提供最高 50% 的计划折扣。',
      },
    ],
    notCovered: {
      title: '哪些方法行不通',
      text: '没有通用 Shopify 优惠码,没有军人折扣,没有老年人折扣,学生本人也不能拿到订阅折扣。声称提供这类优惠的网站多为转售试用账户技巧或链接农场。以上结构性方法才是 2026 年唯一有效的省钱路径。',
    },
  },
  faq: {
    h2: '常见问题',
    items: [
      {
        q: '目前有 Shopify 优惠码吗?',
        a: '2026 年没有第三方 Shopify 优惠码在结算页可用。Shopify 不为订阅计划提供优惠码,统一采用统一的定价。能影响支出的只有 3 天免费试用、年付(约 -25%)和涨价前的价格锁定。Shopify Plus 是合同定价。',
      },
      {
        q: 'Shopify 一个月多少钱?',
        a: '2026 年 7 月 Shopify 定价:Starter $5/月(仅社交店铺),Basic 月付 $49 或年付每月 $39,Shopify 月付 $105 或年付每月 $89,Advanced $399/月。年付比月付省约 25%。没有起步价更低或一次付清的方案。',
      },
      {
        q: 'Shopify 有免费试用吗?',
        a: '有。Shopify 提供 3 天免费试用,注册时无需信用卡。3 天结束后店铺自动暂停,你可以选择订阅、切换其他方案或保持暂停 90 天 \u2014 期间商品、主题、客户数据都不会丢。',
      },
      {
        q: 'Shopify 可以退款吗?',
        a: '可以 \u2014 订阅扣款后 30 天内,通过实时聊天或聊天泡申请,Shopify 全额退款。30 天后退款视情况而定,通常只针对技术问题。更可靠的方式是淡季"暂停而非取消",达到与退款等效的效果。',
      },
      {
        q: '学生用 Shopify 免费吗?',
        a: '没有针对学生本人的订阅折扣。Shopify 合作项目向认可大学设计专业学生提供店铺设计福利,Shopify 还提供免费认证课程(Shopify Academy)教你帮客户搭建店铺 \u2014 对副业有用,但不包含免费个人订阅。',
      },
      {
        q: 'Shopify 比 WooCommerce 便宜吗?',
        a: '从订阅成本看,Shopify Basic 年付 $39/月 高于 WordPress + WooCommerce($5\u201325/月主机加付费插件)。但 Shopify 在一项费用中包含主机、安全、CDN、支付处理、主题基础设施、24/7 聊天支持 \u2014 这些在 WordPress 上加起来通常 $40\u2013$80/月。对大部分月营收 $1\u201320k 的商家,Shopify 总成本低于自托管 WooCommerce。',
      },
    ],
  },
  related: {
    h2: '其他已验证的优惠页',
    p: '如果你在 Shopify 上销售实物或数字商品,这些相邻页面覆盖与店铺对接的常用工具。',
    links: [
      { label: 'Webflow 优惠码(教育版 50%)', href: '/webflow-promo-code' },
      { label: 'Canva Pro 优惠码(教育版免费)', href: '/canva-pro-coupon-code' },
                ],
  },
  crossSite: {
    h2: 'Shopify 商家计算与工具',
    p: '我们的姊妹站有免登录的浏览器工具,可以与你的店铺配合使用。',
    links: [
      { label: '折扣计算器(促销后实际价格)', href: 'https://tools-site-production.up.railway.app/discount-calculator' },
      { label: '发票生成器(批发订单发票)', href: 'https://tools-site-production.up.railway.app/invoice-generator' },
    ],
  },
  footer: {
    line1: 'CouponSite 由读者支持。当你通过本页某些链接下单时,我们可能获得佣金,对你不收取任何额外费用。',
    line2: 'Shopify\u00ae 为 Shopify Inc. 的注册商标。CouponSite 与 Shopify 无从属关系。价格于 2026 年 7 月 1 日对照 shopify.com/pricing 直接核验。',
  },
  ui: {
    siteTitle: '🏷️ 优惠总动员',
    backHome: '← 返回首页',
    switchLang: 'EN',
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
  const lang = (sp.lang === 'zh' ? 'zh' : 'en') as Lang
  const c = (lang === 'en' ? en : zh) as typeof en

  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: {
      canonical: PAGE_URL,
      languages: {
        'x-default': `${SITE_URL}${PAGE_URL}`,
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
export default async function ShopifyDiscountCodePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = (sp.lang === 'zh' ? 'zh' : 'en') as Lang
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
    datePublished: '2026-07-01',
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
        name: lang === 'en' ? 'Shopify Discount Code' : 'Shopify 优惠码',
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
            <Link href="/" className="text-2xl font-bold text-orange-500 hover:text-orange-600">
              {c.ui.siteTitle}
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-sm text-gray-500 hover:text-orange-500">
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
              href="https://www.shopify.com/pricing"
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

        {/* MONEY-SAVING PATHS (not fake discounts) */}
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

        {/* WHO ACTUALLY SAVES */}
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

        {/* CROSS-SITE */}
        <section className="bg-orange-50 rounded-xl p-8 border border-orange-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{c.crossSite.h2}</h2>
          <p className="text-gray-700 mb-4">{c.crossSite.p}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {c.crossSite.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-white hover:bg-orange-100 transition-colors"
              >
                <span className="font-semibold text-gray-700">{link.label}</span>
                <span className="text-orange-500">→</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 mt-12 py-8 text-center text-sm text-gray-400">
        <p className="max-w-4xl mx-auto px-4">{c.footer.line1}</p>
        <p className="max-w-4xl mx-auto px-4 mt-2">{c.footer.line2}</p>
        <p className="mt-3">
          <Link href="/" className="hover:text-orange-500">
            {c.ui.siteTitle}
          </Link>
        </p>
      </footer>
    </div>
  )
}
