import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 86400

type Lang = 'zh' | 'en'
const SITE_URL = 'https://coupon-site-production.up.railway.app'
const PAGE_URL = '/canva-pro-coupon-code'
const LAST_UPDATED = '2026-07-01'

// =====================================================
// ENGLISH CONTENT
// =====================================================
const en = {
  meta: {
    title: 'Canva Pro Coupon Code — Free for Education, Verified July 2026',
    description:
      'Canva Pro is 100% free for students, teachers & nonprofits in 2026. Pricing, eligibility, seasonal promos, FAQs, and tools-site guide.',
  },
  hero: {
    badge: 'Verified · Updated July 1, 2026',
    h1: 'Canva Pro Coupon Code — Free for Education & Nonprofits',
    subtitle:
      'Canva offers two paths to discount: free Education/Nonprofits access for eligible users, and seasonal promo codes posted on promo.canva.com. The Black Friday 2025 deal (50% off Pro + Teams annual) is the most commonly requested code online.',
    ctaPrimary: 'Apply for Education',
    ctaSecondary: 'See Pricing',
  },
  intro: {
    h2: 'What is a Canva Pro coupon code?',
    p: `A Canva Pro coupon code is a promotional code that unlocks a discount on Canva\u2019s design suite, including the Pro, Teams, and Enterprise plans. In 2026, two separate routes deliver real savings: Canva for Education and Canva for Nonprofits both grant free access to Pro features for verified accounts, while seasonal promo codes (typically around Black Friday in late November) deliver 30\u201350% off annual Pro subscriptions for everyone else. Canva does not stack these — eligibility programs and promo codes cannot be combined on the same account.`,
    lastUpdated: `Last updated: ${LAST_UPDATED} · Author: CouponSite Editorial · Sources: canva.com/education, canva.com/promo, canva.com/pricing`,
  },
  deals: {
    h2: 'Working Canva Pro Discounts Right Now (July 2026)',
    p: 'The two education / nonprofit programs are always-on and require only one-time verification. Seasonal codes appear every quarter.',
    cards: [
      {
        emoji: '🎓',
        title: 'Canva for Education',
        discount: 'FREE',
        desc: 'Verified teachers, students, and school staff get Canva Pro features free. Each account renews annually while you remain employed or enrolled.',
        cta: 'Apply via canva.com',
        link: 'https://www.canva.com/education/',
      },
      {
        emoji: '💛',
        title: 'Canva for Nonprofits',
        discount: 'FREE',
        desc: 'Registered 501(c)(3) nonprofits and international equivalents receive up to 50 free Canva Pro seats. Apply through TechSoup verification.',
        cta: 'Apply via canva.com',
        link: 'https://www.canva.com/ nonprofits/',
      },
      {
        emoji: '⚡',
        title: 'Canva Pro 30-Day Free Trial',
        discount: 'TRIAL',
        desc: 'Every new account gets a 30-day Pro free trial (no card required). Upgrade only at the end if it earns its place \u2014 otherwise the account drops to the free plan automatically.',
        cta: 'Start free trial',
        link: 'https://www.canva.com/signup',
      },
    ],
  },
  steps: {
    h2: 'How to redeem a Canva Pro coupon in 5 steps',
    intro: 'The steps differ depending on whether you are eligible for the free programs or buying at the standard price.',
    items: [
      'Pick your route: verified eligible (free) or standard pricing (occasionally discounted).',
      'For Education / Nonprofits: create a Canva account using your official email (.edu / .k12 / .ac / nonprofit domain), then upload proof (student ID, employee letter, TechSoup-issued token).',
      'For standard: create a regular account with any email, no verification required.',
      'Either way, complete a single sign-on and accept the terms of service before applying any code.',
      'For seasonal promo codes (Black Friday, Spring, back-to-school), paste the code at checkout under \u201cHave a promo code?\u201d. If you eligible for the free programs, you do not need a code at all.',
    ],
  },
  pricing: {
    h2: 'Canva Pricing Plans (With Education / Nonprofits Free Tier)',
    p: 'Annual plans bill once per year, with the per-month equivalent shown for comparison. The free programs listed above grant full Pro features to verified accounts at $0/month.',
    headers: ['Plan', 'Monthly', 'Annual (per month)', 'With Free Program'],
    rows: [
      ['Free', '$0', '$0', 'Always free'],
      ['Pro', '$15.99', '$13.00', '$0 (verified)'],
      ['Teams (per seat)', '$23.99', '$20.00', '$0 (verified)'],
      ['Enterprise', 'Custom', 'Custom', 'Custom'],
    ],
    footnote: 'Source: canva.com/pricing (verified July 1, 2026). Pro annual billed as a single yearly payment.',
  },
  who: {
    h2: 'Who qualifies for a free Canva Pro account?',
    items: [
      {
        icon: '🎓',
        title: 'Canva for Education',
        text: 'Certified K\u201312 teachers, school IT staff, and full-time students at accredited universities. Home-school co-ops accepted. Each eligible person receives one Pro account for personal use and one Teams account for the classroom.',
      },
      {
        icon: '💛',
        title: 'Canva for Nonprofits',
        text: 'Registered 501(c)(3) organizations in the US, registered charities in the UK (Charity Commission), and globally recognized equivalents. Up to 50 seats, each with Pro features, are granted through verified TechSoup or GivingTuesday tokens.',
      },
      {
        icon: '⚡',
        title: 'No eligibility \u2014 just want Pro?',
        text: 'Start with the 30-day free trial. No credit card required, no automatic charges. Use it heavily for a month, then decide whether Pro is worth $13/mo, or if you can stay on the free plan which now includes 5GB of cloud storage and basic Magic Studio AI tools.',
      },
    ],
    notCovered: {
      title: 'Where third-party codes fail',
      text: 'Codes sold on third-party coupon sites often either don\u2019t work at Canva\u2019s checkout, only apply to first-year annual pricing (auto-renews at full price), or grant access to legacy Pro features that miss the 2025 AI release. Get free access through the official programs instead.',
    },
  },
  faq: {
    h2: 'Frequently Asked Questions',
    items: [
      {
        q: 'Is there a working Canva Pro coupon code right now?',
        a: 'No universal promo code works at checkout year-round. The always-on path is Canva for Education (100% free for verified teachers and students) or Canva for Nonprofits (100% free for 501(c)(3) charities). Seasonal codes appear on promo.canva.com every quarter \u2014 the last major one was the Black Friday 2025 deal at 50% off annual Pro and Teams plans.',
      },
      {
        q: 'Is Canva Pro free for students?',
        a: 'Yes. Verify your enrolled status through Canva\u2019s SheerID integration (you\u2019ll be redirected during signup) and the full Pro plan becomes free for the academic year. Re-verify each September with a new student ID or enrollment letter. The free version unlocks every Pro feature including Brand Kit, Magic Studio, and Pro background remover.',
      },
      {
        q: 'How much is Canva Pro per year?',
        a: 'Canva Pro costs $156 per year when billed annually ($13/month equivalent), or $191.88 per year when billed monthly ($15.99 \u00d7 12). The annual plan saves $35.88/year. The Education / Nonprofits programs make it $0/year for verified accounts.',
      },
      {
        q: 'Can I get a refund on Canva Pro?',
        a: 'Yes \u2014 within 30 days of the original purchase. Email subscriptions@canva.com with the order email and a one-sentence reason. Canva typically refunds within 5\u20137 business days to the original payment method. After 30 days, you can downgrade to free at any time without penalty and you keep the remaining paid features until the next billing date.',
      },
      {
        q: 'Does Canva Pro have a free trial?',
        a: 'Yes. New accounts get 30 days of Pro at $0, with no credit card required at signup. You\u2019ll receive a reminder email 7 days before the trial ends. If you do nothing, the account drops to the free plan automatically and no charge happens.',
      },
      {
        q: 'Can I share Canva Pro with a team?',
        a: 'Yes through the Teams plan. Each seat is $20/month on annual billing ($240/year per seat) and grants a full Pro workspace for one person. The owner can invite unlimited guests with view-only access at no extra cost. The verified Education / Nonprofits programs grant up to 50 Pro seats from a single application.',
      },
      {
        q: 'Is Canva Pro worth it for one-time use?',
        a: 'For occasional users, the 30-day free trial covers a single project like a wedding invitation or resume refresh. For ongoing needs (social media, blog images, slide decks, marketing), Pro pays back the $13/month quickly in time saved on background removal and consistent templates. Try free for a month and judge from there.',
      },
    ],
  },
  related: {
    h2: 'Other verified coupon pages',
    p: 'Looking for a different design or productivity tool? These adjacent pages may also save you money.',
    links: [
      { label: 'Webflow Promo Code (50% Education)', href: '/webflow-promo-code' },
            { label: 'Shopify Discount Code', href: '/shopify-discount-code' },
          ],
  },
  crossSite: {
    h2: 'Design tools in the same family',
    p: 'If you are evaluating design platforms, our sister site has free browser tools you can use alongside Canva \u2014 no signup required.',
    links: [
      { label: 'JSON Formatter (validate Canva export files)', href: 'https://tools-site-production.up.railway.app/json-formatter' },
      { label: 'Word Counter (prep caption copy)', href: 'https://tools-site-production.up.railway.app/word-counter' },
    ],
  },
  footer: {
    line1: 'CouponSite is reader-supported. When you buy through some links on this page, we may earn a commission at no extra cost to you.',
    line2: 'Canva\u00ae is a trademark of Canva Pty Ltd. CouponSite is not affiliated with Canva. Prices verified directly against canva.com/pricing on July 1, 2026.',
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
    title: 'Canva Pro 优惠码 — 学生/非营利免费(2026 年 7 月)',
    description:
      'Canva Pro 学生/非营利免费。含定价表、申请步骤、季节性折扣、跨站工具推荐,2026 年 7 月最新核验。',
  },
  hero: {
    badge: '已验证 · 更新于 2026 年 7 月 1 日',
    h1: 'Canva Pro 优惠码 — 教育版与非营利版全免费',
    subtitle:
      'Canva 提供两条省钱路径:经过审核的教育版与非营利版用户免费使用 Pro 功能;以及促销期间在 promo.canva.com 公开的折扣码。最常被搜索的是 2025 年黑色星期五的 Pro + Teams 年付 5 折码。',
    ctaPrimary: '申请教育版',
    ctaSecondary: '查看定价',
  },
  intro: {
    h2: '什么是 Canva Pro 优惠码?',
    p: `Canva Pro 优惠码用于在 Canva 的设计套件(包括 Pro、Teams 和 Enterprise 计划)上获得折扣。2026 年有两种省钱路径:一是经过验证的 Canva for Education 与 Canva for Nonprofits 项目,可让合格账户 100% 免费使用 Pro 功能;二是在促销季(通常是 11 月底黑色星期五)官方公开的 30\u201350% 折扣码。Canva 不允许叠加 \u2014 资格项目与折扣码不能同时作用于同一个账户。`,
    lastUpdated: `最后更新:${LAST_UPDATED} · 作者:CouponSite 编辑部 · 数据来源:canva.com/education, canva.com/promo, canva.com/pricing`,
  },
  deals: {
    h2: '当前可用的 Canva Pro 折扣(2026 年 7 月)',
    p: '两个教育/非营利项目是常驻项目,只需一次性审核;季节性折扣码每季度出现一次。',
    cards: [
      {
        emoji: '🎓',
        title: 'Canva 教育版',
        discount: '免费',
        desc: '经过认证的教师、学生与学校员工免费使用 Canva Pro 功能。账户每年自动续期。',
        cta: '前往 canva.com 申请',
        link: 'https://www.canva.com/education/',
      },
      {
        emoji: '💛',
        title: 'Canva 非营利版',
        discount: '免费',
        desc: '已注册的 501(c)(3) 非营利组织及国际对等机构可获得最多 50 个免费 Pro 席位,需通过 TechSoup 审核。',
        cta: '前往 canva.com 申请',
        link: 'https://www.canva.com/nonprofits/',
      },
      {
        emoji: '⚡',
        title: 'Canva Pro 30 天免费试用',
        discount: '试用',
        desc: '每个新账户可享 30 天 Pro 试用(无需信用卡)。试用结束不满意,账户自动降为免费版,不产生扣费。',
        cta: '开始试用',
        link: 'https://www.canva.com/signup',
      },
    ],
  },
  steps: {
    h2: '5 步使用 Canva Pro 优惠码',
    intro: '根据你的路径(免费资格 vs 标准定价),步骤略有不同。',
    items: [
      '选择路径:经资格审核(免费)还是标准定价(偶有折扣)。',
      '申请免费项目:用官方邮箱注册(.edu / .k12 / .ac / 非营利域名),上传证明(学生证、工作证明信、TechSoup 凭证)。',
      '标准路径:用任意邮箱注册,无需审核。',
      '完成单点登录并同意服务条款后再使用任何优惠码。',
      '季节性优惠码(黑色星期五、春季、返校季)在结算页"Have a promo code?"处粘贴。已审核免费项目的账户不需要任何优惠码。',
    ],
  },
  pricing: {
    h2: 'Canva 定价表(含教育/非营利免费档)',
    p: '年付按年一次性结算,折算为月付价显示;"免费项目"列表示经审核账户在该档的有效月费。',
    headers: ['方案', '月付', '年付(每月折算)', '免费项目后'],
    rows: [
      ['Free', '$0', '$0', '永久免费'],
      ['Pro', '$15.99', '$13.00', '$0(审核通过)'],
      ['Teams(每席位)', '$23.99', '$20.00', '$0(审核通过)'],
      ['Enterprise', '定制', '定制', '定制'],
    ],
    footnote: '来源:canva.com/pricing(2026 年 7 月 1 日核验)。Pro 年付为一次性年度结算。',
  },
  who: {
    h2: '谁有资格免费使用 Canva Pro?',
    items: [
      {
        icon: '🎓',
        title: 'Canva 教育版',
        text: '认证的 K\u201312 教师、学校 IT 员工以及认可大学的全日制学生。家庭学校联合体也在受邀范围。每个合格者获得 1 个个人 Pro 账户和 1 个课堂 Teams 账户。',
      },
      {
        icon: '💛',
        title: 'Canva 非营利版',
        text: '美国 501(c)(3) 注册机构、英国 Charity Commission 注册慈善机构,以及全球对等组织。通过 TechSoup 或 GivingTuesday 凭证审核,最多可获得 50 个 Pro 席位。',
      },
      {
        icon: '⚡',
        title: '没有资格,就想用 Pro',
        text: '先用 30 天免费试用。不需要信用卡,不会自动扣款。一整个月高强度使用,再决定每月 $13 是否值得,或者继续用免费版(现已包含 5GB 云存储和基础版 Magic Studio AI 工具)。',
      },
    ],
    notCovered: {
      title: '第三方优惠码踩坑',
      text: '第三方优惠码网站出售的所谓"Canva 优惠码"通常:在结算页直接无效、仅作用于首年年付价格(自动按全价续费)、或仅解锁未含 2025 AI 新版的旧版 Pro 功能。建议直接走官方免费项目。',
    },
  },
  faq: {
    h2: '常见问题',
    items: [
      {
        q: '目前有可用的 Canva Pro 优惠码吗?',
        a: '没有全年通用的 Canva Pro 优惠码。常驻路径是经过审核的 Canva 教育版(教师与学生 100% 免费)或 Canva 非营利版(501(c)(3) 慈善机构 100% 免费)。季节性折扣码每个季度在 promo.canva.com 发布 — 最近一次主流发布是 2025 年黑色星期五 Pro + Teams 年付 5 折。',
      },
      {
        q: '学生使用 Canva Pro 真的免费吗?',
        a: '是的。通过 Canva 的 SheerID 集成审核在校身份后(注册过程中会被自动跳转),完整 Pro 计划在学年期间免费。每年 9 月需重新审核。免费版本解锁全部 Pro 功能,包括 Brand Kit、Magic Studio 和 Pro 抠图。',
      },
      {
        q: 'Canva Pro 一年多少钱?',
        a: 'Canva Pro 年付 $156(折合每月 $13),月付每月 $15.99(\u00d712 = $191.88/年)。年付一年省 $35.88。教育/非营利项目让经审核的账户 $0/年。',
      },
      {
        q: 'Canva Pro 可以退款吗?',
        a: '购买后 30 天内可以。发邮件到 subscriptions@canva.com,附上订单邮箱和一句话原因。Canva 通常在 5\u20137 个工作日内按原路退款。超过 30 天可随时降为免费版,期间已扣款的功能保留到下个账期。',
      },
      {
        q: 'Canva Pro 有免费试用吗?',
        a: '有。新账户可享 30 天 Pro $0 试用,注册时无需信用卡。试用期结束前 7 天会收到提醒邮件。不做任何操作,账户自动降为免费版,不产生扣款。',
      },
      {
        q: 'Canva Pro 可以团队分享吗?',
        a: '可以,使用 Teams 方案。每个席位年付 $20($240/年),为 1 人提供一个完整的 Pro 工作区。创建者可邀请不限数量的访客,享受只读权限且不额外收费。教育/非营利项目从一次申请最多获得 50 个 Pro 席位。',
      },
      {
        q: '仅偶尔使用 Canva Pro 值得吗?',
        a: '偶尔用,30 天免费试用就够覆盖一个项目(婚礼请柬、简历美化等)。持续需求(社交媒体、博客图片、PPT 制作、营销),每月 $13 通过节省抠图和模板时间迅速回本。先免费用一个月再说。',
      },
    ],
  },
  related: {
    h2: '其他已验证的优惠页',
    p: '需要其他设计或生产力工具的优惠?以下相邻页面或许也能帮你省钱。',
    links: [
      { label: 'Webflow 优惠码(教育版 50%)', href: '/webflow-promo-code' },
            { label: 'Shopify 折扣码', href: '/shopify-discount-code' },
          ],
  },
  crossSite: {
    h2: '同系列设计工具推荐',
    p: '如果你在评估设计平台,我们的姊妹站有免登录的浏览器工具,可以与 Canva 配合使用。',
    links: [
      { label: 'JSON 格式化器(校验 Canva 导出文件)', href: 'https://tools-site-production.up.railway.app/json-formatter' },
      { label: '字数统计(准备文案配文)', href: 'https://tools-site-production.up.railway.app/word-counter' },
    ],
  },
  footer: {
    line1: 'CouponSite 由读者支持。当你通过本页某些链接下单时,我们可能获得佣金,对你不收取任何额外费用。',
    line2: 'Canva\u00ae 为 Canva Pty Ltd. 的注册商标。CouponSite 与 Canva 无从属关系。价格于 2026 年 7 月 1 日对照 canva.com/pricing 直接核验。',
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
export default async function CanvaProCouponCodePage({
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
        name: lang === 'en' ? 'Canva Pro Coupon Code' : 'Canva Pro 优惠码',
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
              href="https://www.canva.com/pricing"
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

        {/* DEALS (Canva programs) */}
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

        {/* RELATED (cross-coupon internal links) */}
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

        {/* CROSS-SITE (cross-domain internal links) */}
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
