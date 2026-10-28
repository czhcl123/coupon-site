// ONGOING（官网促销入口）类型的文案
//
// 这类条目的本质是「直达品牌官网促销页」，不是限时折扣码，所以：
// 1) 不编造具体折扣数字（不写 -50% / 20% OFF），只说明「官网持续更新、以官网当日页面为准」
// 2) 中英双语都存，首页和商家页共用，避免 translateTitle 散落各处
// 3) 跟 DB 里 Coupon.title / Coupon.description 对应（DB 存中文，英文从这里取）

export type OngoingCopy = {
  titleZh: string
  titleEn: string
  descZh: string
  descEn: string
}

const RAW: Record<string, OngoingCopy> = {
  amazon: {
    titleZh: 'Amazon 官网 Deals 页 — 每日更新',
    titleEn: 'Amazon Official Deals Page — Updated Daily',
    descZh: '直达 Amazon 官网 Deals 页，折扣随官方活动实时变动，具体力度以当天页面为准。',
    descEn: 'Go straight to the Amazon Deals page. Discounts change with official promotions — check the live page for today.',
  },
  asos: {
    titleZh: 'ASOS 官网 Clearance 页 — 持续更新',
    titleEn: 'ASOS Official Clearance Page — Always Updated',
    descZh: '直达 ASOS 官网 Clearance 促销页，清仓折扣随官方活动实时变动，以当天页面为准。',
    descEn: 'Go straight to the ASOS Clearance page. Clearance markdowns change with official promotions — check the live page for today.',
  },
  expedia: {
    titleZh: 'Expedia 官网会员优惠页 — 持续更新',
    titleEn: 'Expedia Official Member Offers — Always Updated',
    descZh: '直达 Expedia 官网会员优惠页，会员折扣随官方活动实时变动，以当天页面为准。',
    descEn: 'Go straight to the Expedia member offers page. Member discounts change with official promotions — check the live page for today.',
  },
  nike: {
    titleZh: 'Nike 官网促销页 — 持续更新',
    titleEn: 'Nike Official Sale Page — Always Updated',
    descZh: '直达 Nike 官网促销与新品发布页，会员折扣与季末特惠随官方活动实时变动，具体力度以当天页面为准。',
    descEn: 'Go straight to the Nike official sale and new-release pages. Member discounts and end-of-season markdowns change with official promotions — check the live page for today.',
  },
  adidas: {
    titleZh: 'Adidas 官网促销页 — 持续更新',
    titleEn: 'Adidas Official Sale Page — Always Updated',
    descZh: '直达 Adidas 官网促销与新品发布页，季末折扣与会员专属价随官方活动实时变动，具体力度以当天页面为准。',
    descEn: 'Go straight to the Adidas official sale and new-release pages. End-of-season markdowns and member prices change with official promotions — check the live page for today.',
  },
  bestbuy: {
    titleZh: 'Best Buy 官网促销页 — 持续更新',
    titleEn: 'Best Buy Official Deals Page — Always Updated',
    descZh: '直达 Best Buy 官网促销页，当季折扣与限时特惠随官方活动实时变动，具体力度以当天页面为准。',
    descEn: 'Go straight to the Best Buy official deals page. Seasonal markdowns and limited-time offers change with official promotions — check the live page for today.',
  },
  'booking-com': {
    titleZh: 'Booking.com 官网优惠页 — 持续更新',
    titleEn: 'Booking.com Official Deals Page — Always Updated',
    descZh: '直达 Booking.com 官网优惠页，酒店与机票折扣随官方活动实时变动，具体力度以当天页面为准。',
    descEn: 'Go straight to the Booking.com official deals page. Hotel and flight discounts change with official promotions — check the live page for today.',
  },
  nordstrom: {
    titleZh: 'Nordstrom 官网促销页 — 持续更新',
    titleEn: 'Nordstrom Official Sale Page — Always Updated',
    descZh: '直达 Nordstrom 官网促销页，Sale 与会员专属折扣随官方活动实时变动，具体力度以当天页面为准。',
    descEn: 'Go straight to the Nordstrom official sale page. Sale prices and member-exclusive discounts change with official promotions — check the live page for today.',
  },
  shein: {
    titleZh: 'SHEIN 官网促销页 — 持续更新',
    titleEn: 'SHEIN Official Sale Page — Always Updated',
    descZh: '直达 SHEIN 官网促销页，新品折扣与清仓特惠随官方活动实时变动，具体力度以当天页面为准。',
    descEn: 'Go straight to the SHEIN official sale page. New-arrival markdowns and clearance deals change with official promotions — check the live page for today.',
  },
  sephora: {
    titleZh: 'Sephora 官网促销页 — 持续更新',
    titleEn: 'Sephora Official Sale Page — Always Updated',
    descZh: '直达 Sephora 官网促销页，Beauty Insider 会员礼遇与香氛特惠随官方活动实时变动，具体力度以当天页面为准。',
    descEn: 'Go straight to the Sephora official sale page. Beauty Insider perks and fragrance offers change with official promotions — check the live page for today.',
  },
  steam: {
    titleZh: 'Steam 官方特惠区 — 持续更新',
    titleEn: 'Steam Official Specials — Always Updated',
    descZh: '直达 Steam 官方特惠与折扣区，季节性特卖与游戏折扣随官方活动实时变动，具体力度以当天页面为准。',
    descEn: 'Go straight to the Steam official specials and discount section. Seasonal sales and game markdowns change with official promotions — check the live page for today.',
  },
  target: {
    titleZh: 'Target 官网优惠页 — 持续更新',
    titleEn: 'Target Official Deals Page — Always Updated',
    descZh: '直达 Target 官网优惠页，Roundup 活动与品类折扣随官方活动实时变动，具体力度以当天页面为准。',
    descEn: 'Go straight to the Target official deals page. Roundup events and category markdowns change with official promotions — check the live page for today.',
  },
  temu: {
    titleZh: 'Temu 官网促销页 — 持续更新',
    titleEn: 'Temu Official Sale Page — Always Updated',
    descZh: '直达 Temu 官网促销页，新人专享与限时补贴随官方活动实时变动，具体力度以当天页面为准。',
    descEn: 'Go straight to the Temu official sale page. New-user offers and limited-time vouchers change with official promotions — check the live page for today.',
  },
  'ulta-beauty': {
    titleZh: 'Ulta Beauty 官网促销页 — 持续更新',
    titleEn: 'Ulta Beauty Official Sale Page — Always Updated',
    descZh: '直达 Ulta Beauty 官网促销页，美容节特惠与会员折扣随官方活动实时变动，具体力度以当天页面为准。',
    descEn: 'Go straight to the Ulta Beauty official sale page. Beauty event offers and member discounts change with official promotions — check the live page for today.',
  },
  walmart: {
    titleZh: 'Walmart 官网优惠页 — 持续更新',
    titleEn: 'Walmart Official Deals Page — Always Updated',
    descZh: '直达 Walmart 官网优惠页，Rollback 与品类特卖随官方活动实时变动，具体力度以当天页面为准。',
    descEn: 'Go straight to the Walmart official deals page. Rollback prices and category markdowns change with official promotions — check the live page for today.',
  },
}

export function getOngoingCopy(slug: string): OngoingCopy | undefined {
  return RAW[slug]
}

export function ongoingTitle(slug: string, lang: string, fallback: string): string {
  const c = RAW[slug]
  if (!c) return fallback
  return lang === 'zh' ? c.titleZh : c.titleEn
}

export function ongoingDesc(slug: string, lang: string, fallback: string): string {
  const c = RAW[slug]
  if (!c) return fallback
  return lang === 'zh' ? c.descZh : c.descEn
}
