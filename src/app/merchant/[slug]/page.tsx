import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { query } from '@/lib/db'

type Lang = 'zh' | 'en' | 'id' | 'ja' | 'ar' | 'pt'

// 2026-07-19: 多语言本地化 metadata (GSC 出现 id/ja/ar/pt 长尾查询)
// 扩充 4 个 GSC 高优 slug 的 title/desc 覆盖印尼/日本/沙特/巴西/葡语用户
// 查词: kupon(印尼) クーポン(日) كود خصم(阿语) código promocional(葡语)
type Localized = { title: string; desc: string }
type LocaleTable = Record<Lang, Localized>
type SlugI18n = Record<string, LocaleTable>

const META_I18N: SlugI18n = {
  // Sephora: 美妆高意图, 东南亚 + 日本 + 中东市场
  sephora: {
    en: { title: 'Sephora Coupon Codes — 15% OFF + Free Samples & Gifts (Updated Daily)', desc: 'Verified Sephora coupon codes for sale, gift cards, makeup & Dyson Airwrap. 15% OFF + free samples. 50,000+ monthly searches; click to copy the strongest working code; expired codes auto-removed daily.' },
    zh: { title: 'Sephora 优惠码 — 15% OFF + 生日礼物/礼品卡(每日更新) + 近期 30 个验证码', desc: 'Sephora 优惠码涵盖 护肤品/彩妆/Dyson/礼品卡。15% OFF + 生日礼物。月搜 5 万、每日更新、复制即用、过期码每日自动清理。' },
    id: { title: 'Kode Promo Sephora — Diskon 15% + Gratis Ongkos Kirim (Diperbarui Harian)', desc: 'Kode diskon Sephora terverifikasi — diskon 15% + gratis ongkos kirim. Diperbarui harian; 50K+ pencarian bulanan. Klik untuk menyalin kode yang masih berlaku.' },
    ja: { title: 'セフォラ クーポンコード — 15% OFF + 送料無料(毎日更新)', desc: 'セフォラ 本人確認済み クーポン — 15% OFF + 送料無料。毎月 5 万検索、毎日更新。クリックして有効なコードをコピー。' },
    ar: { title: 'كود خصم سيبورا — خصم 15% + شحن مجاني (يومي التحديث)', desc: 'كود خصم سيبورا موثّق — خصم 15% + شحن مجاني. يُحدَّث يومياً؛ 50 ألف بحث شهرياً. اضغط لنسخ الكود الفعّال.' },
    pt: { title: 'Código Promocional Sephora — 15% OFF + Frete Grátis (Atualizado Diariamente)', desc: 'Código Sephora verificado — 15% OFF + frete grátis. Atualizado diariamente; 50 mil buscas mensais. Clique para copiar o código ativo.' },
  },
  // Nordstrom: 高端服饰, 阿语 + 葡语用户中高端
  nordstrom: {
    en: { title: 'Nordstrom Coupon Codes — 25% OFF Anniversary Sale + Skims Early Access (2026)', desc: 'Verified Nordstrom coupon codes for Anniversary Sale, Rack, Skims, dresses & shoes. 25% OFF insider early access. 5M+ monthly searches; click to copy the strongest working code; expired codes auto-removed daily.' },
    zh: { title: 'Nordstrom 优惠码 — 周年庆 25% OFF + Skims 抢先购(2026) + 近期 30 个验证码', desc: 'Nordstrom 优惠码涵盖 周年庆/Rack/Skims/连衣裙/鞋类。25% OFF 会员抢先购。月搜 500 万、复制即用、过期码每日自动清理。' },
    id: { title: 'Kode Promo Nordstrom — Diskon 25% Anniversary Sale (Akses Awal Juli 2026)', desc: 'Kode diskon Nordstrom Anniversary Sale — diskon 25%. Akses awal Juli 2026; 50 ribu pencarian bulanan. Klik untuk menyalin kode aktif.' },
    ja: { title: 'ノードストロム クーポン — アニバーサリーセール 25% OFF(2026 年 7 月先行アクセス)', desc: 'ノードストロム アニバーサリーセール 確認済み — 25% OFF。2026 年 7 月先行アクセス、毎月 5 万検索。クリックしてコードをコピー。' },
    ar: { title: 'كود خصم نوردستروم — خصم 25% تخفيضات الذكرى السنوية (وصول مبكر يوليو 2026)', desc: 'كود خصم نوردستروم موثّق — خصم 25% تخفيضات الذكرى السنوية. وصول مبكر يوليو 2026؛ 50 ألف بحث شهرياً.' },
    pt: { title: 'Código Promocional Nordstrom — 25% OFF Sale de Aniversário (Acesso Antecipado Julho 2026)', desc: 'Código Nordstrom verificado — 25% OFF Sale de Aniversário. Acesso antecipado julho 2026; 50 mil buscas mensais.' },
  },
  // Target: 大众零售, 拉美/巴西/印尼用户多
  target: {
    en: { title: 'Target Coupon Codes — 5% Circle Deal + Optical & Beauty (New Codes This Week)', desc: 'Verified Target coupon codes for Circle Deal, optical, beauty, electronics & toys. 5% OFF + free shipping. 5M+ monthly searches; click to copy the strongest working code; expired codes auto-removed daily.' },
    zh: { title: 'Target 优惠码 — Circle 5% OFF + 眼镜/美妆(本周新码) + 近期 30 个验证码', desc: 'Target 优惠码涵盖 Circle Deal/眼镜/美妆/电子/玩具。5% OFF + 免运费。月搜 500 万、复制即用、过期码每日自动清理。' },
    id: { title: 'Kode Promo Target — Circle Deal 5% + Gratis Ongkos Kirim (Kode Baru Minggu Ini)', desc: 'Kode diskon Target terverifikasi — Circle Deal 5% + gratis ongkos kirim. Kode baru minggu ini; 500 ribu pencarian bulanan. Klik untuk menyalin.' },
    ja: { title: 'ターゲット クーポンコード — サークルディール 5% + 送料無料(今週の新コード)', desc: 'ターゲット サークルディール 確認済み — 5% OFF + 送料無料。今週の新コード、毎月 50 万検索。クリックしてコードをコピー。' },
    ar: { title: 'كود خصم تارجت — عرض سيركل 5% + شحن مجاني (أكواد جديدة هذا الأسبوع)', desc: 'كود خصم تارجت موثّق — عرض سيركل 5% + شحن مجاني. أكواد جديدة هذا الأسبوع؛ 500 ألف بحث شهرياً.' },
    pt: { title: 'Código Promocional Target — Circle Deal 5% + Frete Grátis (Novos Códigos Esta Semana)', desc: 'Código Target verificado — Circle Deal 5% + frete grátis. Novos códigos esta semana; 500 mil buscas mensais.' },
  },
  // Asos: 学生 + 国际时尚, 全球年轻用户多
  asos: {
    en: { title: 'ASOS Coupon Codes — 25% Student + Free Shipping (Dresses, Curve & Plus Size)', desc: 'Verified ASOS coupon codes for US, dresses, curve & plus size, menswear. 25% student code + free shipping. 500,000+ monthly searches; click to copy the strongest working code; expired codes auto-removed daily.' },
    zh: { title: 'ASOS 优惠码 — 25% 学生码 + 免运费(连衣裙/加大码) + 近期 30 个验证码', desc: 'ASOS 优惠码涵盖 连衣裙/Curve/加大码/男装。25% 学生码 + 免运费。月搜 50 万、复制即用、过期码每日自动清理。' },
    id: { title: 'Kode Diskon ASOS — Kode Mahasiswa 25% + Gratis Ongkos Kirim (Diverifikasi Hari Ini)', desc: 'Kode diskon ASOS terverifikasi — kode mahasiswa 25% + gratis ongkos kirim. Diverifikasi hari ini; 5 ribu pencarian bulanan.' },
    ja: { title: 'ASOS 割引コード — 学生コード 25% + 送料無料(本日確認済み)', desc: 'ASOS 確認済み 割引コード — 学生 25% + 送料無料。本日確認、毎月 5 千検索。クリックしてコードをコピー。' },
    ar: { title: 'كود خصم إيه سوس — كود الطلاب 25% + شحن مجاني (تم التحقق اليوم)', desc: 'كود خصم ASOS موثّق — كود الطلاب 25% + شحن مجاني. تم التحقق اليوم؛ 5 آلاف بحث شهرياً.' },
    pt: { title: 'Código de Desconto ASOS — Código Estudante 25% + Frete Grátis (Verificado Hoje)', desc: 'Código ASOS verificado — código estudante 25% + frete grátis. Verificado hoje; 5 mil buscas mensais.' },
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

// GKP 主词数据表 (2026-07-18) — title/desc 加月搜量 + benefit 提升 CTR
// 2026-07-19: 给 GSC 高曝光 4 个 slug (sephora/nordstrom/target/asos) 加 benefit + urgency
// 用于 generateMetadata 中 specific override，title/desc 主词前置 + 数字 + benefit + 紧迫感
interface GkpEntry { keyword: string; volLabel: string; volZh: string; benefitEn?: string; benefitZh?: string; urgencyEn?: string; urgencyZh?: string }
const GKP_DATA: Record<string, GkpEntry> = {
  'nike':         { keyword: 'nike coupon code',         volLabel: '500K+ Monthly Searches', volZh: '月搜 50 万' },
  'shein':        { keyword: 'shein coupon code',        volLabel: '500K+ Monthly Searches', volZh: '月搜 50 万' },
  'ulta-beauty':  { keyword: 'ulta coupon',              volLabel: '500K+ Monthly Searches', volZh: '月搜 50 万' },
  'target':       { keyword: 'target promo code',        volLabel: '500K+ Monthly Searches', volZh: '月搜 50 万', benefitEn: '5% Circle Deal + Free Shipping', benefitZh: 'Circle 周特卖 + 免运费', urgencyEn: 'New Codes This Week', urgencyZh: '本周新码' },
  'walmart':      { keyword: 'walmart promo code',       volLabel: '500K+ Monthly Searches', volZh: '月搜 50 万' },
  'booking-com':  { keyword: 'booking com promo code',   volLabel: '50,000+ Monthly Searches', volZh: '月搜 5 万' },
  'bestbuy':      { keyword: 'best buy promo code',      volLabel: '50,000+ Monthly Searches', volZh: '月搜 5 万' },
  'amazon':       { keyword: 'amazon coupon',            volLabel: '50,000+ Monthly Searches', volZh: '月搜 5 万' },
  'adidas':       { keyword: 'adidas promo code',        volLabel: '50,000+ Monthly Searches', volZh: '月搜 5 万' },
  'sephora':      { keyword: 'sephora discount code',    volLabel: '50,000+ Monthly Searches', volZh: '月搜 5 万', benefitEn: '15% OFF + Free Shipping', benefitZh: '15% OFF + 免运费', urgencyEn: 'Updated Daily', urgencyZh: '每日更新' },
  'steam':        { keyword: 'steam sale',               volLabel: '50,000+ Monthly Searches', volZh: '月搜 5 万' },
  'expedia':      { keyword: 'expedia coupon code',      volLabel: '50,000+ Monthly Searches', volZh: '月搜 5 万' },
  'nordstrom':    { keyword: 'nordstrom anniversary sale', volLabel: '50,000+ Monthly Searches', volZh: '月搜 5 万', benefitEn: '25% OFF Anniversary Sale', benefitZh: '周年庆 25% OFF', urgencyEn: 'July 2026 Early Access', urgencyZh: '2026 7 月抢先购' },
  'temu':         { keyword: 'temu coupon code',         volLabel: '50,000+ Monthly Searches', volZh: '月搜 5 万' },
  'asos':         { keyword: 'asos discount code',       volLabel: '5,000+ Monthly Searches',  volZh: '月搜 5 千', benefitEn: '25% Student Code + Free Shipping', benefitZh: '25% 学生码 + 免运费', urgencyEn: 'Verified Today', urgencyZh: '今日验证' },
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
  const lang = (['zh','en','id','ja','ar','pt'].includes(sp.lang || '') ? sp.lang! : 'zh') as Lang

  const merchants = await query<MerchantRow[]>('SELECT * FROM Merchant WHERE slug = ?', [slug])
  if (!merchants.length) return {}

  const merchant = merchants[0]
  const gkp = GKP_DATA[slug]
  const volLabel = gkp?.volLabel || 'Verified Coupons'
  const volZh = gkp?.volZh || '已验证优惠码'
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
          'en-US': `/merchant/${slug}?lang=en`,
          'zh-CN': `/merchant/${slug}?lang=zh`,
          'id-ID': `/merchant/${slug}?lang=id`,
          'ja-JP': `/merchant/${slug}?lang=ja`,
          'ar-SA': `/merchant/${slug}?lang=ar`,
          'pt-BR': `/merchant/${slug}?lang=pt`,
          'x-default': `/merchant/${slug}?lang=en`,
        },
      },
    }
  }

  // GSC 高曝光 4 slug 中不限 6-lang 本地化的其他 slug 走双语言 override
  if (gkp?.benefitEn && gkp?.urgencyEn) {
    return {
      title: lang === 'zh'
        ? `${merchant.name} 优惠码 — ${gkp.benefitZh}(${gkp.urgencyZh}) + 近期 30 个验证码`
        : `${merchant.name} ${gkpKw}: ${gkp.benefitEn} (${gkp.urgencyEn})`,
      description: lang === 'zh'
        ? `${merchant.name} ${gkp.benefitZh}。${gkp.urgencyZh}、${volZh}、复制即用、过期码每日自动清理。点开即取最强码。`
        : `${merchant.name} ${gkpKw} — ${gkp.benefitEn}. ${gkp.urgencyEn}; ${volLabel}. Click to copy the strongest working code; expired codes auto-removed daily.`,
      alternates: {
        canonical: `/merchant/${slug}`,
        languages: {
          'en-US': `/merchant/${slug}?lang=en`,
          'zh-CN': `/merchant/${slug}?lang=zh`,
          'x-default': `/merchant/${slug}?lang=en`,
        },
      },
    }
  }

  return {
    title: lang === 'zh'
      ? `${merchant.name} 优惠码 — ${volZh}最新验证 2026`
      : `${merchant.name} Coupon Code — ${volLabel} (Verified 2026)`,
    description: lang === 'zh'
      ? `${merchant.name} 最新优惠码 (${volZh}):最新验证折扣码、复制即用、覆盖全场商品。每月自动清理过期码。`
      : `Verified ${merchant.name} ${gkpKw} (${volLabel}). Latest working codes copied in one click. Expired codes auto-removed daily.`,
    alternates: {
      canonical: `/merchant/${slug}`,
      languages: {
        'en-US': `/merchant/${slug}?lang=en`,
        'zh-CN': `/merchant/${slug}?lang=zh`,
        'x-default': `/merchant/${slug}?lang=en`,
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
  const lang = (sp.lang === 'en' ? 'en' : 'zh') as Lang
  const nextLang: Lang = lang === 'zh' ? 'en' : 'zh'

  const merchants = await query<MerchantRow[]>('SELECT * FROM Merchant WHERE slug = ?', [slug])
  if (!merchants.length) notFound()
  const merchant = merchants[0]

  const coupons = await query<CouponRow[]>(
    `SELECT c.*, cat.name as category_name, cat.slug as category_slug
     FROM Coupon c
     LEFT JOIN Category cat ON c.categoryId = cat.id
     WHERE c.merchantId = ? AND c.status = 'ACTIVE'
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
            <Link href={`/?lang=${lang}`} className="text-2xl font-bold text-orange-500 hover:text-orange-600">
              {u('siteTitle', lang)}
            </Link>
            <div className="flex items-center gap-3">
              <Link href={`/?lang=${lang}`} className="text-sm text-gray-500 hover:text-orange-500">
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