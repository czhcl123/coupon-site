import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { query } from '@/lib/db'

// 2026-08-12: ISR revalidate (Ahrefs 报 nordstrom TTFB 27s)
export const revalidate = 86400 // 24h

type Lang = 'zh' | 'en' | 'id' | 'ja' | 'ar' | 'pt'

// 2026-07-19: 多语言本地化 metadata (GSC 出现 id/ja/ar/pt 长尾查询)
// 扩充 4 个 GSC 高优 slug 的 title/desc 覆盖印尼/日本/沙特/巴西/葡语用户
// 查词: kupon(印尼) クーポン(日) كود خصم(阿语) código promocional(葡语)
type Localized = { title: string; desc: string }
type LocaleTable = Record<Lang, Localized>
type SlugI18n = Record<string, LocaleTable>

const META_I18N: SlugI18n = {
  sephora: {
    en: { title: 'Sephora Discount Code: Beauty Insider Deals', desc: 'Official Sephora promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
    zh: { title: 'Sephora 优惠码：Beauty Insider 折扣', desc: 'Sephora 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    id: { title: 'Kode Promo Sephora: Diskon Beauty Insider', desc: 'Promo resmi Sephora dan penawaran anggota. Kode hanya setelah diverifikasi; bila tidak ada, kami tautkan ke halaman promo resmi.' },
    ja: { title: 'セフォラ クーポン：Beauty Insider 特典', desc: 'セフォラ 公式のセールと会員特典。コードは確認済みのみ掲載し、使えない場合は公式セールページへリンクします。' },
    ar: { title: 'كود خصم سيبورا: عروض Beauty Insider', desc: 'عروض سيبورا الرسمية ومزايا الأعضاء. لا نعرض أي كود قبل التحقق، وإن لم يعمل نوجهك إلى صفحة العروض الرسمية.' },
    pt: { title: 'Código Promocional Sephora: Beauty Insider', desc: 'Promoções oficiais da Sephora e ofertas para membros. Código só após verificação; se não funcionar, indicamos a página oficial.' },
  },
  nordstrom: {
    en: { title: 'Nordstrom Anniversary Sale & Coupon Info', desc: 'Official Nordstrom promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
    zh: { title: 'Nordstrom 周年庆与优惠码信息', desc: 'Nordstrom 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    id: { title: 'Kode Promo Nordstrom: Info Anniversary Sale', desc: 'Promo resmi Nordstrom dan penawaran anggota. Kode hanya setelah diverifikasi; bila tidak ada, kami tautkan ke halaman promo resmi.' },
    ja: { title: 'ノードストロム クーポン：アニバーサリー情報', desc: 'ノードストロム 公式のセールと会員特典。コードは確認済みのみ掲載し、使えない場合は公式セールページへリンクします。' },
    ar: { title: 'كود خصم نوردستروم: عروض وتخفيضات', desc: 'عروض نوردستروم الرسمية ومزايا الأعضاء. لا نعرض أي كود قبل التحقق، وإن لم يعمل نوجهك إلى صفحة العروض الرسمية.' },
    pt: { title: 'Código Promocional Nordstrom: Ofertas', desc: 'Promoções oficiais da Nordstrom e ofertas para membros. Código só após verificação; se não funcionar, indicamos a página oficial.' },
  },
  target: {
    en: { title: 'Target Promo Code: Circle Rewards & Deals', desc: 'Official Target promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
    zh: { title: 'Target 优惠码：Circle 奖励与促销', desc: 'Target 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    id: { title: 'Kode Promo Target: Circle Rewards', desc: 'Promo resmi Target dan penawaran anggota. Kode hanya setelah diverifikasi; bila tidak ada, kami tautkan ke halaman promo resmi.' },
    ja: { title: 'ターゲット クーポン：サークル特典', desc: 'ターゲット 公式のセールと会員特典。コードは確認済みのみ掲載し、使えない場合は公式セールページへリンクします。' },
    ar: { title: 'كود خصم تارجت: عروض Circle', desc: 'عروض تارجت الرسمية ومزايا الأعضاء. لا نعرض أي كود قبل التحقق، وإن لم يعمل نوجهك إلى صفحة العروض الرسمية.' },
    pt: { title: 'Código Promocional Target: Circle', desc: 'Promoções oficiais da Target e ofertas para membros. Código só após verificação; se não funcionar, indicamos a página oficial.' },
  },
  asos: {
    en: { title: 'ASOS Discount Code: Student & Sale Info', desc: 'Official ASOS promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
    zh: { title: 'ASOS 优惠码：学生折扣与促销信息', desc: 'ASOS 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    id: { title: 'Kode Diskon ASOS: Diskon Mahasiswa', desc: 'Promo resmi ASOS dan penawaran anggota. Kode hanya setelah diverifikasi; bila tidak ada, kami tautkan ke halaman promo resmi.' },
    ja: { title: 'ASOS 割引コード：学生割引とセール', desc: 'ASOS 公式のセールと会員特典。コードは確認済みのみ掲載し、使えない場合は公式セールページへリンクします。' },
    ar: { title: 'كود خصم ASOS: خصم الطلاب والعروض', desc: 'عروض ASOS الرسمية ومزايا الأعضاء. لا نعرض أي كود قبل التحقق، وإن لم يعمل نوجهك إلى صفحة العروض الرسمية.' },
    pt: { title: 'Código de Desconto ASOS: Estudante', desc: 'Promoções oficiais da ASOS e ofertas para membros. Código só após verificação; se não funcionar, indicamos a página oficial.' },
  },
}

const t = {
  zh: {
    siteTitle: '🏷️ 优惠总动员',
    backHome: '← 返回首页',
    allCoupons: '全部优惠',
    verified: '已验证',
    exclusive: '独家',
    minPurchase: '满 ¥{n} 可用',
    copied: '已复制 ✓',
    copyCode: '复制代码',
    goUse: '去使用 →',
    noCodeHint: '无折扣码·点击跳转领取',
    neverExpire: '长期有效',
    expired: '已过期',
    expireToday: '今日过期',
    expireTomorrow: '明日过期',
    expireInDays: '{n}天后过期',
    peopleUsed: '{n} 人使用',
    noCoupons: '暂无优惠券',
    footer1: '本站所有链接均为联盟链接，购物可能获得佣金支持本站发展',
    footer2: '© 2026 优惠总动员 · 仅供信息分享',
    lang: 'EN',
    switchLang: 'EN',
    fixedOff: '立减 {n} 元',
    freeShipping: '免运费',
    upToOff: '低至 {n} 折',
  },
  en: {
    siteTitle: '🏷️ Coupon Hub',
    backHome: '← Back to Home',
    allCoupons: 'All Coupons',
    verified: 'Verified',
    exclusive: 'Exclusive',
    minPurchase: 'Min. spend ¥{n}',
    copied: 'Copied ✓',
    copyCode: 'Copy Code',
    goUse: 'Use Now →',
    noCodeHint: 'No code needed · Click to claim',
    neverExpire: 'No expiry',
    expired: 'Expired',
    expireToday: 'Expires today',
    expireTomorrow: 'Expires tomorrow',
    expireInDays: 'Expires in {n} days',
    peopleUsed: '{n} used',
    noCoupons: 'No coupons available',
    footer1: 'Affiliate links — shopping may earn us a commission.',
    footer2: '© 2026 Coupon Hub · For information only',
    lang: '中文',
    switchLang: '中文',
    fixedOff: '¥{n} OFF',
    freeShipping: 'Free Shipping',
    upToOff: 'Up to {n} off',
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

function formatDiscount(discountType: string, discountValue: string, lang: Lang) {
  switch (discountType) {
    case 'PERCENT': return `-${discountValue}%`
    case 'FIXED': return uVars('fixedOff', { n: discountValue }, lang)
    case 'FREE_SHIP': return u('freeShipping', lang)
    case 'PERCENT_OFF': return uVars('upToOff', { n: discountValue }, lang)
    default: return discountValue
  }
}

function formatExpiry(dateStr: string | null, lang: Lang) {
  if (!dateStr) return u('neverExpire', lang)
  const date = new Date(dateStr)
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days < 0) return u('expired', lang)
  if (days === 0) return u('expireToday', lang)
  if (days === 1) return u('expireTomorrow', lang)
  return uVars('expireInDays', { n: String(days) }, lang)
}

// Fallback brand URL chain: affiliateUrl -> website -> '#' (disabled link)
// All 15 merchants in DB have website populated, so '#' should never trigger in practice.

function translateTitle(title: string, lang: Lang) {
  if (lang === 'zh') return title
  const map: Record<string, string> = {
    '会员专享20%OFF': 'Exclusive 20% OFF',
    '满599免运费': 'Free Shipping on ¥599+',
    '新用户首单10%OFF': '10% OFF First Order',
    '季末大促低至5折': 'End of Season Sale — Up to 50% OFF',
    '学生享15%OFF': '15% OFF for Students',
    '满1000减100': 'Spend ¥1000, Save ¥100',
    '指定商品立减50': '¥50 OFF Selected Items',
    '电脑专场最高享8折': 'Electronics Sale — Up to 80% OFF',
    '酒店预订15%OFF': '15% OFF on Hotel Booking',
    '首次预订立减200元': '¥200 OFF First Booking',
    '全站20%OFF': '20% OFF Sitewide',
    '满50免运费': 'Free Shipping on ¥50+',
    'VIP会员25%OFF': 'VIP Members 25% OFF',
    '满99减30': 'Spend ¥99, Get ¥30 OFF',
  }
  return map[title] || title
}

interface MerchantRow {
  id: string
  name: string
  slug: string
  logo: string | null
  affiliateUrl: string | null
}

interface CouponRow {
  id: string
  code: string | null
  title: string
  description: string | null
  discountType: string
  discountValue: string
  minPurchase: string | null
  expiresAt: string | null
  isExclusive: boolean
  isVerified: boolean
  clickCount: number
  category_name: string | null
  category_slug: string | null
}

// GKP 主词数据表 — 只保留主关键词；2026-10-23 删除月搜量与 benefit/urgency 宣称
interface GkpEntry { keyword: string }
const GKP_DATA: Record<string, GkpEntry> = {
  'nike':         { keyword: 'nike coupon code' },
  'shein':        { keyword: 'shein coupon code' },
  'ulta-beauty':  { keyword: 'ulta coupon' },
  'target':       { keyword: 'target promo code' },
  'walmart':      { keyword: 'walmart promo code' },
  'booking-com':  { keyword: 'booking com promo code' },
  'bestbuy':      { keyword: 'best buy promo code' },
  'amazon':       { keyword: 'amazon coupon' },
  'adidas':       { keyword: 'adidas promo code' },
  'sephora':      { keyword: 'sephora discount code' },
  'steam':        { keyword: 'steam sale' },
  'expedia':      { keyword: 'expedia coupon code' },
  'nordstrom':    { keyword: 'nordstrom anniversary sale' },
  'temu':         { keyword: 'temu coupon code' },
  'asos':         { keyword: 'asos discount code' },
}

const META_PER_SLUG: Record<string, { zh: { title: string; desc: string }; en: { title: string; desc: string } }> = {
  'steam': {
    zh: { title: 'Steam 特卖：季节促销与捆绑包', desc: 'Steam 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    en: { title: 'Steam Sale: Seasonal Promo Calendar', desc: 'Official Steam promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
  },
  'temu': {
    zh: { title: 'Temu 优惠码：新客福利与折扣', desc: 'Temu 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    en: { title: 'Temu Coupon Code: New User Offers', desc: 'Official Temu promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
  },
  'nike': {
    zh: { title: 'Nike 优惠码：会员折扣与促销信息', desc: 'Nike 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    en: { title: 'Nike Coupon Code: Member Discounts', desc: 'Official Nike promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
  },
  'amazon': {
    zh: { title: 'Amazon 优惠码：Prime 专享与优惠券', desc: 'Amazon 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    en: { title: 'Amazon Coupon Code: Prime Deals & Vouchers', desc: 'Official Amazon promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
  },
  'adidas': {
    zh: { title: 'Adidas 优惠码：会员与 Outlet 促销', desc: 'Adidas 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    en: { title: 'Adidas Promo Code: Member & Outlet Sale', desc: 'Official Adidas promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
  },
  'shein': {
    zh: { title: 'SHEIN 优惠码：新客福利与折扣', desc: 'SHEIN 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    en: { title: 'SHEIN Coupon Code: New User Offers', desc: 'Official SHEIN promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
  },
  'expedia': {
    zh: { title: 'Expedia 优惠码：酒店与机票折扣', desc: 'Expedia 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    en: { title: 'Expedia Coupon Code: Hotel & Flight Deals', desc: 'Official Expedia promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
  },
  'bestbuy': {
    zh: { title: 'Best Buy 优惠码：促销日历与折扣', desc: 'Best Buy 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    en: { title: 'Best Buy Promo Code: Sale Calendar', desc: 'Official Best Buy promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
  },
  'ulta-beauty': {
    zh: { title: 'Ulta 优惠码：21 Days of Beauty', desc: 'Ulta Beauty 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    en: { title: 'Ulta Coupon: 21 Days of Beauty & Rewards', desc: 'Official Ulta Beauty promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
  },
  'booking-com': {
    zh: { title: 'Booking.com 优惠码：Genius 与酒店优惠', desc: 'Booking.com 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    en: { title: 'Booking.com Promo Code: Genius Deals', desc: 'Official Booking.com promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
  },
  'walmart': {
    zh: { title: 'Walmart 优惠码：Rollback 与省钱攻略', desc: 'Walmart 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    en: { title: 'Walmart Promo Code: Rollback Deals', desc: 'Official Walmart promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
  },
  'asos': {
    zh: { title: 'ASOS 优惠码：学生折扣与促销信息', desc: 'ASOS 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    en: { title: 'ASOS Discount Code: Student & Sale Info', desc: 'Official ASOS promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
  },
  'target': {
    zh: { title: 'Target 优惠码：Circle 奖励与促销', desc: 'Target 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    en: { title: 'Target Promo Code: Circle Rewards & Deals', desc: 'Official Target promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
  },
  'nordstrom': {
    zh: { title: 'Nordstrom 周年庆与优惠码信息', desc: 'Nordstrom 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    en: { title: 'Nordstrom Anniversary Sale & Coupon Info', desc: 'Official Nordstrom promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
  },
  'sephora': {
    zh: { title: 'Sephora 优惠码：Beauty Insider 折扣', desc: 'Sephora 官方促销与会员优惠信息。我们只在核实后列出优惠码，无可用的码时直接跳转官方促销页。' },
    en: { title: 'Sephora Discount Code: Beauty Insider Deals', desc: 'Official Sephora promotions and member offers. A code is listed only after verification; otherwise we link to the official sale page.' },
  },
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
  // 2026-07-19: 扩充到 6 locale (zh/en/id/ja/ar/pt) 迎拥 GSC 出现的多语言查询
  // 2026-10-07: 默认 en（配合 middleware ?lang=en → 301 干净 URL；此前默认 zh 导致英文版不可达）
  const lang = (['zh','en','id','ja','ar','pt'].includes(sp.lang || '') ? sp.lang! : 'en') as Lang

  const merchants = await query<MerchantRow[]>('SELECT * FROM Merchant WHERE slug = ?', [slug])
  if (!merchants.length) return {}

  const merchant = merchants[0]
  const gkp = GKP_DATA[slug]
  const gkpKw = gkp?.keyword || `${merchant.name.toLowerCase()} coupon code`

  // 2026-07-19: 4 个 GSC 高优 slug × 6 语言 本地化 metadata override
  // 包含 id/ja/ar/pt 本地关键词 (kupon / クーポン / كود خصم / código promocional)
  if (META_I18N[slug]) {
    const loc = META_I18N[slug][lang] || META_I18N[slug].en
    return {
      title: loc.title,
      description: loc.desc,
      alternates: {
        canonical: `/merchant/${slug}`,
        languages: {
          'x-default': `/merchant/${slug}`,
        },
      },
    }
  }

  // 2026-08-08: per-slug unique title + description (Google Search Central best practice:
  // each page distinct, no boilerplate). Falls back to generic template for unknown slugs.
  if (META_PER_SLUG[slug]) {
    const m = META_PER_SLUG[slug][lang] || META_PER_SLUG[slug].en
    return {
      title: m.title,
      description: m.desc,
      alternates: {
        canonical: `/merchant/${slug}`,
        languages: {
          'x-default': `/merchant/${slug}`,
        },
      },
    }
  }

  // Generic fallback (used only if slug is not in META_PER_SLUG)
  return {
    title: lang === 'zh'
      ? `${merchant.name} 优惠码 — 最新验证 2026`
      : `${merchant.name} Coupon Code — Verified 2026`,
    description: lang === 'zh'
      ? `${merchant.name} 最新优惠码:最新验证折扣码、复制即用、覆盖全场商品。每月自动清理过期码。`
      : `Verified ${merchant.name} ${gkpKw}. Latest working codes copied in one click. Expired codes auto-removed daily.`,
    alternates: {
      canonical: `/merchant/${slug}`,
      languages: {
        'x-default': `/merchant/${slug}`,
      },
    },
  }
}

export default async function MerchantPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lang?: string }>
}) {
  const { slug } = await params
  const sp = await searchParams
  // 2026-10-07: 默认英文（配合 middleware ?lang=en → 301 干净 URL；中文走 ?lang=zh）
  const lang = (sp.lang === 'zh' ? 'zh' : 'en') as Lang
  const nextLang: Lang = lang === 'zh' ? 'en' : 'zh'

  const merchants = await query<MerchantRow[]>('SELECT * FROM Merchant WHERE slug = ?', [slug])
  if (!merchants.length) notFound()
  const merchant = merchants[0]

  const coupons = await query<CouponRow[]>(
    `SELECT c.*, cat.name as category_name, cat.slug as category_slug
     FROM Coupon c
     LEFT JOIN Category cat ON c.categoryId = cat.id
     WHERE c.merchantId = ? AND c.status = 'ACTIVE' AND (c.expiresAt IS NULL OR c.expiresAt > NOW())
     ORDER BY c.isExclusive DESC, c.isVerified DESC, c.clickCount DESC`,
    [merchant.id]
  )

  // 构建 Offer Schema（每张优惠券一个）
  const offerList = coupons.map((coupon) => ({
    '@type': 'Offer',
    name: translateTitle(coupon.title, lang),
    description: coupon.description ? translateTitle(coupon.description, lang) : translateTitle(coupon.title, lang),
    url: merchant.affiliateUrl || `https://coupon-site-olive.vercel.app/merchant/${slug}`,
    availability: 'https://schema.org/InStock',
    ...(coupon.discountType === 'PERCENT' && {
      discountCurrency: 'CNY',
      discountPercentage: parseFloat(coupon.discountValue),
    }),
    ...(coupon.discountType === 'FIXED' && {
      discountCurrency: 'CNY',
      discountAmount: parseFloat(coupon.discountValue),
    }),
    ...(coupon.discountType === 'FREE_SHIP' && {
      shippingDetails: { '@type': 'Offer', name: u('freeShipping', lang) },
    }),
    ...(coupon.expiresAt && {
      validThrough: new Date(coupon.expiresAt).toISOString(),
    }),
    ...(coupon.code && { serialNumber: coupon.code }),
    ...(coupon.minPurchase && {
      minimumPurchaseQuantity: parseFloat(coupon.minPurchase),
    }),
  }))

  const merchantSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: merchant.name,
    url: merchant.affiliateUrl || `https://coupon-site-olive.vercel.app/merchant/${slug}`,
    ...(merchant.logo && { logo: merchant.logo }),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([merchantSchema, ...offerList]) }}
      />
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-orange-500 hover:text-orange-600">
              {u('siteTitle', lang)}
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-sm text-gray-500 hover:text-orange-500">
                {u('backHome', lang)}
              </Link>
              <Link
                href={`/merchant/${slug}?lang=${nextLang}`}
                className="text-sm px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                {u('switchLang', lang)}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 商家信息 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-4">
            {merchant.logo && (
              <img src={merchant.logo} alt={merchant.name} className="w-12 h-12 rounded-lg object-contain" />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{merchant.name}</h1>
              <p className="text-sm text-gray-400">{u('allCoupons', lang)} · {coupons.length} {lang === 'zh' ? '张' : 'deals'}</p>
            </div>
          </div>
        </div>

        {/* 2026-07-25 P0 重做: ASOS SEO 内容块 (必须在 MerchantPage 内, coupons 已定义) */}
        {/* 不用 prose 类, 避免 Tailwind 4 CSS-based config 兼容问题 */}
        {slug === 'asos' && (lang === 'en' ? (
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-800 mb-3">About ASOS Coupon Codes — Updated Daily</h2>
            <p className="mb-3">
              ASOS is the UK&apos;s largest online fashion retailer serving 850+ brands and 85,000+ products across womenswear, menswear, Curve &amp; Plus Size, Maternity and beauty. This page aggregates every verified ASOS promo code we confirmed in the last 24 hours — student discounts, teacher discounts, first-order codes, free-shipping thresholds and sample sale access.
            </p>
            <p className="mb-4">
              Currently <strong className="text-gray-800">{coupons.length} active ASOS coupons</strong> are listed below, sorted exclusive-first. The strongest verified code is always at the top.
            </p>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">How to redeem an ASOS coupon</h3>
            <ol className="list-decimal list-inside mb-4 space-y-1 pl-1">
              <li>Click <strong className="text-gray-800">Use Now</strong> on any coupon card — the code is copied to your clipboard and ASOS opens in a new tab.</li>
              <li>Add dresses, jeans, sneakers or beauty items to your bag (aim £30+ for most free-shipping codes).</li>
              <li>Paste the code at checkout in the &ldquo;Promo code&rdquo; box and apply.</li>
              <li>Student? Sign in to UNiDAYS or Student Beans first, then stack your student 10% with the strongest code below.</li>
            </ol>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Popular ASOS coupon categories</h3>
            <ul className="list-disc list-inside mb-2 space-y-1 pl-1">
              <li><strong className="text-gray-800">ASOS student discount</strong> — 10% OFF year-round via UNiDAYS / Student Beans verification.</li>
              <li><strong className="text-gray-800">ASOS teacher discount</strong> — 10% OFF for verified teachers via UNiDAYS.</li>
              <li><strong className="text-gray-800">Free shipping UK</strong> — most codes require a £30 minimum spend.</li>
              <li><strong className="text-gray-800">First order ASOS</strong> — 15% OFF for new email subscribers.</li>
              <li><strong className="text-gray-800">Sample sale</strong> — seasonal up-to-70% clearance events (members-only access via the ASOS app).</li>
              <li><strong className="text-gray-800">Birthday discount</strong> — 20% OFF during your birthday month if subscribed to ASOS emails.</li>
            </ul>
            <p className="text-xs text-gray-400 mb-0 mt-4 pt-3 border-t border-gray-100">
              Codes are verified every 24 hours against ASOS.co.uk. Expired codes are removed within 24 hours of expiration — if you spot an expired code, please report it via our <a href="/about" className="text-orange-500 underline">contact form</a>.
            </p>
          </section>
        ) : (
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-800 mb-3">ASOS 优惠码使用指南 — 每日更新</h2>
            <p className="mb-3">
              ASOS 是英国最大的在线时尚零售商,合作 850+ 品牌、85,000+ 商品,覆盖女装、男装、加大码、孕妇装和美妆。本页汇总过去 24 小时内所有验证有效的 ASOS 优惠码,包括学生折扣、教师折扣、新用户码、免运费门槛和 Sample Sale 抢购通道。
            </p>
            <p className="mb-4">
              目前共 <strong className="text-gray-800">{coupons.length} 张有效 ASOS 优惠码</strong>,独家码排在最前。最强的验证码始终置顶显示。
            </p>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">ASOS 优惠码使用方法</h3>
            <ol className="list-decimal list-inside mb-4 space-y-1 pl-1">
              <li>点击任意优惠卡上的 <strong className="text-gray-800">去使用</strong>,码自动复制到剪贴板,并新窗口打开 ASOS。</li>
              <li>把商品加到购物车(免运费码大多要求满 £30)。</li>
              <li>结算页 &ldquo;Promo code&rdquo; 框粘贴码并应用。</li>
              <li>学生先通过 UNiDAYS 或 Student Beans 验证,即可把学生 10% 与下方最强码叠加使用。</li>
            </ol>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">热门 ASOS 优惠类型</h3>
            <ul className="list-disc list-inside mb-2 space-y-1 pl-1">
              <li><strong className="text-gray-800">ASOS 学生折扣</strong> — 通过 UNiDAYS / Student Beans 验证后全年 10% OFF。</li>
              <li><strong className="text-gray-800">ASOS 教师折扣</strong> — 验证教师身份后 10% OFF(UNiDAYS 通道)。</li>
              <li><strong className="text-gray-800">英国免运费</strong> — 多数码要求满 £30。</li>
              <li><strong className="text-gray-800">ASOS 新用户</strong> — 新邮箱订阅立享 15% OFF。</li>
              <li><strong className="text-gray-800">Sample Sale</strong> — 季度清仓最高 70% OFF(仅 ASOS App 会员通道)。</li>
              <li><strong className="text-gray-800">生日折扣</strong> — 订阅 ASOS 邮件后生日月可领 20% OFF。</li>
            </ul>
            <p className="text-xs text-gray-400 mb-0 mt-4 pt-3 border-t border-gray-100">
              所有码每日针对 ASOS.co.uk 验证。过期码将在 24 小时内清除;如发现过期码,请通过 <a href="/about" className="text-orange-500 underline">联系我们</a> 上报。
            </p>
          </section>
        ))}

        {/* 2026-07-25 P1: Target SEO 内容块 */}
        {slug === 'target' && (lang === 'en' ? (
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-800 mb-3">About Target Coupon Codes — Updated Daily</h2>
            <p className="mb-3">
              Target is a US general merchandise retailer with 2,000+ stores nationwide, known for affordable style across home, fashion, beauty, electronics, grocery and more. This page aggregates every verified Target promo code we confirmed in the last 24 hours — category-specific discounts (home, apparel, beauty), Target Circle app savings, RedCard holder perks, and seasonal sale access (Target Deal Days, Black Friday).
            </p>
            <p className="mb-4">
              Currently <strong className="text-gray-800">{coupons.length} active Target coupons</strong> are listed below, sorted exclusive-first. The strongest verified code is always at the top.
            </p>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">How to redeem a Target coupon</h3>
            <ol className="list-decimal list-inside mb-4 space-y-1 pl-1">
              <li>Click <strong className="text-gray-800">Use Now</strong> on any coupon card — the code is copied to your clipboard and Target opens in a new tab.</li>
              <li>Add home goods, apparel, electronics, beauty or grocery items to your bag.</li>
              <li>Paste the code at checkout in the &ldquo;Promo code&rdquo; box and apply.</li>
              <li>Target Circle member? Stack your Circle offers on top of the strongest code below for double savings.</li>
            </ol>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Popular Target coupon categories</h3>
            <ul className="list-disc list-inside mb-2 space-y-1 pl-1">
              <li><strong className="text-gray-800">Target Circle offers</strong> — app-only daily deals, 5% OFF birthday reward, personalized discounts.</li>
              <li><strong className="text-gray-800">Target RedCard discount</strong> — extra 5% OFF sitewide (free shipping) for debit / credit card holders.</li>
              <li><strong className="text-gray-800">Target home coupons</strong> — 20% OFF home goods, bedding, kitchen, decor.</li>
              <li><strong className="text-gray-800">Target apparel codes</strong> — Cat &amp; Jack, All in Motion, A New Day brand-specific savings.</li>
              <li><strong className="text-gray-800">Target Deal Days</strong> — twice-yearly sale in spring / fall competing with Amazon Prime Day.</li>
              <li><strong className="text-gray-800">Target free shipping</strong> — free 2-day shipping on $35+ orders, or with RedCard no minimum.</li>
            </ul>
            <p className="text-xs text-gray-400 mb-0 mt-4 pt-3 border-t border-gray-100">
              Codes are verified every 24 hours against Target.com. Expired codes are removed within 24 hours of expiration — if you spot an expired code, please report it via our <a href="/about" className="text-orange-500 underline">contact form</a>.
            </p>
          </section>
        ) : (
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Target 优惠码使用指南 — 每日更新</h2>
            <p className="mb-3">
              Target 是美国综合零售巨头,全美 2,000+ 门店,以高性价比的家居、时尚、美妆、电子产品和杂货闻名。本页汇总过去 24 小时内所有验证有效的 Target 优惠码,包括品类专项折扣码(家居、服装、美妆)、Target Circle App 专享、RedCard 信用卡会员权益,以及 Target Deal Days、黑五等季节性 Sale 通道。
            </p>
            <p className="mb-4">
              目前共 <strong className="text-gray-800">{coupons.length} 张有效 Target 优惠码</strong>,独家码排在最前。最强的验证码始终置顶显示。
            </p>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Target 优惠码使用方法</h3>
            <ol className="list-decimal list-inside mb-4 space-y-1 pl-1">
              <li>点击任意优惠卡上的 <strong className="text-gray-800">去使用</strong>,码自动复制到剪贴板,并新窗口打开 Target。</li>
              <li>把家居、服装、电子产品、美妆或杂货商品加到购物车。</li>
              <li>结算页 &ldquo;Promo code&rdquo; 框粘贴码并应用。</li>
              <li>Target Circle 会员?先在 App 激活专属优惠,可与下方最强码叠加使用。</li>
            </ol>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">热门 Target 优惠类型</h3>
            <ul className="list-disc list-inside mb-2 space-y-1 pl-1">
              <li><strong className="text-gray-800">Target Circle 优惠</strong> — App 独享每日特惠、生日月 5% OFF、个性化折扣。</li>
              <li><strong className="text-gray-800">Target RedCard 折扣</strong> — 借记卡 / 信用卡会员全场额外 5% OFF(免运费)。</li>
              <li><strong className="text-gray-800">Target 家居优惠码</strong> — 家居、床上用品、厨房、装饰 20% OFF。</li>
              <li><strong className="text-gray-800">Target 服装码</strong> — Cat &amp; Jack、All in Motion、A New Day 品牌专属。</li>
              <li><strong className="text-gray-800">Target Deal Days</strong> — 春 / 秋两次大型 Sale,与 Amazon Prime Day 同台竞争。</li>
              <li><strong className="text-gray-800">Target 免运费</strong> — $35+ 订单免 2 日运费(RedCard 无最低门槛)。</li>
            </ul>
            <p className="text-xs text-gray-400 mb-0 mt-4 pt-3 border-t border-gray-100">
              所有码每日针对 Target.com 验证。过期码将在 24 小时内清除;如发现过期码,请通过 <a href="/about" className="text-orange-500 underline">联系我们</a> 上报。
            </p>
          </section>
        ))}

        {/* 2026-07-25 P1: Nordstrom SEO 内容块 */}
        {slug === 'nordstrom' && (lang === 'en' ? (
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-800 mb-3">About Nordstrom Coupon Codes — Updated Daily</h2>
            <p className="mb-3">
              Nordstrom is a US-based luxury department store chain carrying 200+ designer and contemporary brands across fashion, beauty, shoes, accessories and home. This page aggregates every verified Nordstrom promo code we confirmed in the last 24 hours — sitewide percentage discounts, fashion-category coupons, free shipping thresholds and seasonal sale access (Half-Yearly Sale, Anniversary Sale, Black Friday).
            </p>
            <p className="mb-4">
              Currently <strong className="text-gray-800">{coupons.length} active Nordstrom coupons</strong> are listed below, sorted exclusive-first. The strongest verified code is always at the top.
            </p>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">How to redeem a Nordstrom coupon</h3>
            <ol className="list-decimal list-inside mb-4 space-y-1 pl-1">
              <li>Click <strong className="text-gray-800">Use Now</strong> on any coupon card — the code is copied to your clipboard and Nordstrom opens in a new tab.</li>
              <li>Add designer apparel, shoes, bags or beauty items to your bag (most codes are sitewide; some are fashion-only).</li>
              <li>Paste the code at checkout in the &ldquo;Promo code&rdquo; box and apply.</li>
              <li>Nordstrom card holder? Sign in first to unlock card-member-only extra discounts on top of the code.</li>
            </ol>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Popular Nordstrom coupon categories</h3>
            <ul className="list-disc list-inside mb-2 space-y-1 pl-1">
              <li><strong className="text-gray-800">Nordstrom Anniversary Sale</strong> — early access to new fall merchandise (July), card-members get first dibs.</li>
              <li><strong className="text-gray-800">Nordstrom Half-Yearly Sale</strong> — sitewide clearance in May / November, up to 70% OFF designer.</li>
              <li><strong className="text-gray-800">Nordstrom Rack coupons</strong> — off-price sister site with separate codes (additional 10-20% OFF already-reduced items).</li>
              <li><strong className="text-gray-800">Nordstrom free shipping</strong> — free standard shipping on $50+ orders (lower threshold for card-holders).</li>
              <li><strong className="text-gray-800">Designer brand codes</strong> — Tory Burch, Rag &amp; Bone, Vans, Free People brand-specific launches.</li>
              <li><strong className="text-gray-800">First order Nordstrom</strong> — 15% OFF for new email subscribers (often stacks with sale).</li>
            </ul>
            <p className="text-xs text-gray-400 mb-0 mt-4 pt-3 border-t border-gray-100">
              Codes are verified every 24 hours against Nordstrom.com. Expired codes are removed within 24 hours of expiration — if you spot an expired code, please report it via our <a href="/about" className="text-orange-500 underline">contact form</a>.
            </p>
          </section>
        ) : (
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Nordstrom 优惠码使用指南 — 每日更新</h2>
            <p className="mb-3">
              Nordstrom 是美国高端百货连锁,合作 200+ 设计师和当代品牌,覆盖时装、美妆、鞋履、配饰和家居。本页汇总过去 24 小时内所有验证有效的 Nordstrom 优惠码,包括全场折扣码、时尚品类码、免运费门槛,以及 Half-Yearly Sale、Anniversary Sale、黑五等季节性 Sale 通道。
            </p>
            <p className="mb-4">
              目前共 <strong className="text-gray-800">{coupons.length} 张有效 Nordstrom 优惠码</strong>,独家码排在最前。最强的验证码始终置顶显示。
            </p>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Nordstrom 优惠码使用方法</h3>
            <ol className="list-decimal list-inside mb-4 space-y-1 pl-1">
              <li>点击任意优惠卡上的 <strong className="text-gray-800">去使用</strong>,码自动复制到剪贴板,并新窗口打开 Nordstrom。</li>
              <li>把设计师服装、鞋、包或美妆商品加到购物车(多数码全场通用,部分仅限时尚品类)。</li>
              <li>结算页 &ldquo;Promo code&rdquo; 框粘贴码并应用。</li>
              <li>Nordstrom 信用卡会员?先登录账户,可在码的基础上叠加会员专属额外折扣。</li>
            </ol>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">热门 Nordstrom 优惠类型</h3>
            <ul className="list-disc list-inside mb-2 space-y-1 pl-1">
              <li><strong className="text-gray-800">Nordstrom Anniversary Sale</strong> — 7 月新季秋季商品首发(信用卡会员优先购)。</li>
              <li><strong className="text-gray-800">Nordstrom Half-Yearly Sale</strong> — 5 月 / 11 月全场清仓,设计师商品最高 70% OFF。</li>
              <li><strong className="text-gray-800">Nordstrom Rack 优惠码</strong> — 姐妹折扣站独立优惠码(已降价商品再减 10-20%)。</li>
              <li><strong className="text-gray-800">Nordstrom 免运费</strong> — $50+ 订单免标准运费(信用卡会员门槛更低)。</li>
              <li><strong className="text-gray-800">设计师品牌码</strong> — Tory Burch、Rag &amp; Bone、Vans、Free People 品牌专属。</li>
              <li><strong className="text-gray-800">Nordstrom 新用户</strong> — 新邮箱订阅立享 15% OFF(可与 Sale 叠加)。</li>
            </ul>
            <p className="text-xs text-gray-400 mb-0 mt-4 pt-3 border-t border-gray-100">
              所有码每日针对 Nordstrom.com 验证。过期码将在 24 小时内清除;如发现过期码,请通过 <a href="/about" className="text-orange-500 underline">联系我们</a> 上报。
            </p>
          </section>
        ))}

        {/* 2026-07-25 P1: Sephora SEO 内容块 (2 步走,验证模板后复制) */}
        {slug === 'sephora' && (lang === 'en' ? (
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-800 mb-3">About Sephora Coupon Codes — Updated Daily</h2>
            <p className="mb-3">
              Sephora is the world&apos;s leading prestige beauty retailer, carrying 340+ brands across skincare, makeup, fragrance, hair and tools. This page aggregates every verified Sephora promo code we confirmed in the last 24 hours — sitewide discounts, Beauty Insider / VIP member exclusives, free-shipping thresholds, and brand-specific savings (Rare Beauty, Sol de Janeiro, Drunk Elephant, The Ordinary and more).
            </p>
            <p className="mb-4">
              Currently <strong className="text-gray-800">{coupons.length} active Sephora coupons</strong> are listed below, sorted exclusive-first. The strongest verified code is always at the top.
            </p>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">How to redeem a Sephora coupon</h3>
            <ol className="list-decimal list-inside mb-4 space-y-1 pl-1">
              <li>Click <strong className="text-gray-800">Use Now</strong> on any coupon card — the code is copied to your clipboard and Sephora opens in a new tab.</li>
              <li>Add skincare, makeup, fragrance or hair items to your bag (most free-shipping codes require a $50 minimum spend).</li>
              <li>Paste the code at checkout in the &ldquo;Promo code&rdquo; box and apply.</li>
              <li>Beauty Insider member? Stack your 20% OFF Beauty Insider code with the strongest code below for double savings.</li>
            </ol>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Popular Sephora coupon categories</h3>
            <ul className="list-disc list-inside mb-2 space-y-1 pl-1">
              <li><strong className="text-gray-800">Sephora Beauty Insider discount</strong> — 20% OFF seasonal for Rouge / VIB / Insider members.</li>
              <li><strong className="text-gray-800">Sephora free shipping</strong> — free standard shipping on $50+ orders sitewide.</li>
              <li><strong className="text-gray-800">Sephora birthday gift</strong> — free birthday gift during your birthday month (Insider / VIB / Rouge tiered).</li>
              <li><strong className="text-gray-800">First order Sephora</strong> — 15% OFF for new email subscribers (often stacks with sale).</li>
              <li><strong className="text-gray-800">Sephora sale events</strong> — Beauty Sale (April / November) up to 50% OFF.</li>
              <li><strong className="text-gray-800">Brand-specific codes</strong> — Rare Beauty, Sol de Janeiro, Drunk Elephant, The Ordinary exclusive launches.</li>
            </ul>
            <p className="text-xs text-gray-400 mb-0 mt-4 pt-3 border-t border-gray-100">
              Codes are verified every 24 hours against Sephora.com. Expired codes are removed within 24 hours of expiration — if you spot an expired code, please report it via our <a href="/about" className="text-orange-500 underline">contact form</a>.
            </p>
          </section>
        ) : (
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 text-sm text-gray-600 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Sephora 优惠码使用指南 — 每日更新</h2>
            <p className="mb-3">
              Sephora 是全球领先的高端美妆零售商,合作 340+ 品牌,覆盖护肤、彩妆、香氛、美发和工具。本页汇总过去 24 小时内所有验证有效的 Sephora 优惠码,包括全场折扣、Beauty Insider / VIP 会员独享、免运费门槛,以及 Rare Beauty、Sol de Janeiro、Drunk Elephant、The Ordinary 等品牌专属优惠。
            </p>
            <p className="mb-4">
              目前共 <strong className="text-gray-800">{coupons.length} 张有效 Sephora 优惠码</strong>,独家码排在最前。最强的验证码始终置顶显示。
            </p>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Sephora 优惠码使用方法</h3>
            <ol className="list-decimal list-inside mb-4 space-y-1 pl-1">
              <li>点击任意优惠卡上的 <strong className="text-gray-800">去使用</strong>,码自动复制到剪贴板,并新窗口打开 Sephora。</li>
              <li>把护肤、彩妆、香氛或美发商品加到购物车(免运费码大多要求满 $50)。</li>
              <li>结算页 &ldquo;Promo code&rdquo; 框粘贴码并应用。</li>
              <li>Beauty Insider 会员?先登录账户,即可把 20% OFF 会员码与下方最强码叠加使用。</li>
            </ol>
            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">热门 Sephora 优惠类型</h3>
            <ul className="list-disc list-inside mb-2 space-y-1 pl-1">
              <li><strong className="text-gray-800">Sephora Beauty Insider 折扣</strong> — Rouge / VIB / Insider 会员每季 20% OFF 专属。</li>
              <li><strong className="text-gray-800">Sephora 免运费</strong> — 全场 $50+ 订单免标准运费。</li>
              <li><strong className="text-gray-800">Sephora 生日礼物</strong> — 生日月可领免费生日礼(Insider / VIB / Rouge 等级不同)。</li>
              <li><strong className="text-gray-800">Sephora 新用户</strong> — 新邮箱订阅立享 15% OFF(可与 Sale 叠加)。</li>
              <li><strong className="text-gray-800">Sephora Sale 季</strong> — Beauty Sale(4 月 / 11 月)最高 50% OFF。</li>
              <li><strong className="text-gray-800">品牌专属码</strong> — Rare Beauty、Sol de Janeiro、Drunk Elephant、The Ordinary 新品首发。</li>
            </ul>
            <p className="text-xs text-gray-400 mb-0 mt-4 pt-3 border-t border-gray-100">
              所有码每日针对 Sephora.com 验证。过期码将在 24 小时内清除;如发现过期码,请通过 <a href="/about" className="text-orange-500 underline">联系我们</a> 上报。
            </p>
          </section>
        ))}

        {/* 优惠券列表 */}
        {coupons.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-2">🎫</div>
            <p>{u('noCoupons', lang)}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon) => {
              const discountAmount = coupon.discountType === 'FIXED' ? parseFloat(coupon.discountValue) : undefined
              const discountPercentage = coupon.discountType === 'PERCENT' ? parseFloat(coupon.discountValue) : undefined
              const couponSchema = {
                '@context': 'https://schema.org',
                '@type': 'Coupon',
                name: translateTitle(coupon.title, lang),
                ...(coupon.description && { description: translateTitle(coupon.description, lang) }),
                ...(coupon.code && { discountCode: coupon.code }),
                ...(discountPercentage && { discountPercentage }),
                ...(discountAmount && { discountAmount }),
                ...(coupon.expiresAt && { endDate: new Date(coupon.expiresAt).toISOString() }),
                url: merchant.affiliateUrl || `https://coupon-site-olive.vercel.app/merchant/${slug}`,
              }
              return (
              <div
                key={coupon.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(couponSchema) }}
                />
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl font-bold text-orange-500">
                    {formatDiscount(coupon.discountType, coupon.discountValue, lang)}
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 leading-tight">{translateTitle(coupon.title, lang)}</div>
                    {coupon.description && (
                      <div className="text-sm text-gray-400 mt-0.5">{translateTitle(coupon.description, lang)}</div>
                    )}
                  </div>
                </div>

                {coupon.minPurchase && (
                  <div className="text-xs text-gray-400 mb-2">
                    {uVars('minPurchase', { n: coupon.minPurchase }, lang)}
                  </div>
                )}

                {coupon.code ? (
                  <>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 mb-2">
                      <code className="flex-1 font-mono text-sm font-semibold text-gray-700">{coupon.code}</code>
                      <span className="text-xs text-gray-400">{u('copyCode', lang)}</span>
                    </div>
                    <a
                      href={merchant.affiliateUrl || merchant.website || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 px-4 transition-colors mb-3"
                    >
                      {u('goUse', lang)}
                    </a>
                  </>
                ) : (
                  <>
                    <div className="text-xs text-gray-400 mb-2">{u('noCodeHint', lang)}</div>
                    <a
                      href={merchant.affiliateUrl || merchant.website || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 px-4 transition-colors mb-3"
                    >
                      {u('goUse', lang)}
                    </a>
                  </>
                )}

                <div className="flex items-center justify-between text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">
                  <span>{formatExpiry(coupon.expiresAt, lang)}</span>
                  <span>{uVars('peopleUsed', { n: String(coupon.clickCount) }, lang)}</span>
                </div>
              </div>
              )
            })}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 mt-12 py-8 text-center text-sm text-gray-400">
        <p>{u('footer1', lang)}</p>
        <p className="mt-1">{u('footer2', lang)}</p>
      </footer>
    </div>
  )
}

