// 长尾 SEO 文章数据（静态，不依赖数据库）
export interface Article {
  slug: string
  title: string
  description: string
  content: string
  merchant: string
  merchantSlug: string
  tags: string[]
  publishedAt: string
}

export const articles: Article[] = [
  {
    slug: 'nike-discount-code-guide',
    title: '2025年 Nike 折扣码完整指南：如何获取最佳优惠',
    description: '完整攻略教你如何获取 Nike 官方折扣码，包括学生优惠、会员专属活动、节假日促销等技巧。',
    content: `
## Nike 折扣码哪里找？

Nike 是全球最大的运动品牌之一，很多用户都不知道官方会不定期发放折扣码。以下是经过验证的获取渠道：

### 1. Nike 官网会员专属折扣
注册 Nike 会员后，通常会收到专属的 8-9 折邮件。每个月会员日都有不同力度的活动。

### 2. 学生优惠（.edu 邮箱）
Nike 有专门的学生折扣计划，使用 .edu 邮箱注册可获得额外 9 折。

### 3. 节假日促销节点
- **黑五（Black Friday）**：通常 11 月第四个周五，全场 7-8 折
- **网络星期一（Cyber Monday）**：黑五后的周一，还有额外优惠
- **618 大促**：京东/天猫 Nike 旗舰店活动
- **双11**：天猫 Nike 官方旗舰店

### 4. 银行支付优惠
部分银行卡（招商银行、建设银行）绑定 Apple Pay / 云闪付可再减。

### 5. 使用我们的独家折扣码
本站实时更新的 Nike 折扣码，经过验证可直接使用。

> **温馨提示**：Nike 折扣码通常有有效期，建议看到合适的就尽快使用。
    `,
    merchant: 'Nike',
    merchantSlug: 'nike',
    tags: ['Nike 折扣码', 'Nike 优惠', '运动鞋'],
    publishedAt: '2025-01-15',
  },
  {
    slug: 'asos-student-discount',
    title: 'ASOS 学生折扣码 2025：25% 优惠怎么拿',
    description: 'ASOS 学生折扣码获取攻略，25% 折扣码有效期和使用技巧。',
    content: `
## ASOS 学生折扣码

ASOS 是英国知名的时尚电商，全球免运费是它最大的优势之一。

### 获取方式
1. 用 .edu 邮箱注册 UNiDAYS
2. 验证学生身份后获取专属折扣码
3. 折扣通常为 25% off，首单额外 10%

### 有效期注意
学生折扣码通常有效期 1 个月，过期后需重新验证。

### 叠加技巧
- 学生折扣不可与促销折扣叠加
- 但可以在促销基础上用生日折扣
    `,
    merchant: 'ASOS',
    merchantSlug: 'asos',
    tags: ['ASOS 折扣码', 'ASOS 学生优惠', '时尚电商'],
    publishedAt: '2025-02-20',
  },
  {
    slug: 'amazon-prime-day-guide',
    title: 'Amazon Prime Day 2026: Best Deals, Dates & Stacking Tips',
    description: 'Amazon Prime Day 2026 guide with exact dates, best deal categories, Lightning Deal strategies, and stacking tips to save 50% or more.',
    content: `
## Amazon Prime Day 2026: Complete Shopping Guide

Amazon Prime Day is Amazon's biggest sale event of the year, rivaling Black Friday in scale. In 2026, Prime Day is expected in **mid-July** (typically 2 days). This guide covers everything you need to score the best deals and avoid common traps.

### When Is Amazon Prime Day 2026?

| Event | Expected Date | Notes |
|-------|--------------|-------|
| Prime Day | July 15-16, 2026 | 48-hour flash sale |
| Early Deals | July 1-14 | Warm-up deals for Prime members |
| Extended Deals | July 17-18 | Clearance on remaining stock |

**Tip**: Early deals often match Prime Day prices — don't wait until Day 2 if you see a good deal.

### Best Prime Day Deal Categories

Based on historical data, these categories get the deepest discounts:

- **Electronics**: 30-60% off (TVs, headphones, smart home devices)
- **Amazon devices**: 40-70% off (Echo, Fire TV, Kindle, Ring)
- **Home & Kitchen**: 25-50% off (instant pots, air fryers, bedding)
- **Fashion**: 20-40% off (Amazon Essentials, select brands)
- **Beauty**: 20-35% off (sunscreen, skincare sets, hair tools)
- **Toys**: 20-40% off (LEGO, action figures, games)

### Lightning Deal Strategy

Lightning Deals are time-limited offers (usually 4-6 hours) with limited quantity:

1. **Set up wishlist** with items you want BEFORE Prime Day
2. **Enable deal notifications** in the Amazon App
3. **Act within first 15 minutes** — popular deals sell out fast
4. **Join waitlist** if a deal is claimed — you'll get a notification if someone doesn't complete purchase
5. **Use Prime exclusive deal badges** — only visible to Prime members

### How to Spot Fake Discounts

Amazon has a problem with sellers raising prices before Prime Day then "discounting" back to normal:

1. **Install Keepa** (free browser extension) — shows 12-month price history
2. **Check the "Was" price** — if it was higher only in the last week, it's likely fake
3. **Use CamelCamelCamel** (camelcamelcamel.com) — similar price tracking
4. **Compare with other retailers** — Best Buy, Walmart, Target often match

### Stacking Strategies for Maximum Savings

1. Start with <a href="/merchant/amazon">Amazon coupon codes</a> from our verified page
2. Use Amazon credit card (5% back on Amazon purchases)
3. Apply Discover/Cashback bonus categories
4. Buy Amazon gift cards at 5-10% off before Prime Day
5. Stack Subscribe & Save discounts (extra 5-15% off)

**Example stack**: Prime Day 30% off + credit card 5% + gift card 10% off = **45% total savings**

### Amazon Prime Day vs. Black Friday

| Factor | Prime Day | Black Friday |
|--------|-----------|--------------|
| **Best for** | Amazon devices, electronics | Everything |
| **Deals depth** | 30-60% off | 20-50% off |
| **Duration** | 2 days | 1 week+ |
| **Membership** | Prime required | Open to all |
| **Best deals** | Echo, Fire, Kindle | TVs, laptops, gaming |

**Verdict**: Buy Amazon devices on Prime Day. Everything else, compare both events.

### Prime Day Shopping Checklist

- [ ] Verify Prime membership is active
- [ ] Install Keepa price tracker
- [ ] Set up deal notifications in Amazon App
- [ ] Create wishlist with target items
- [ ] Check <a href="/merchant/amazon">Amazon promo codes</a> page
- [ ] Load gift cards purchased at discount
- [ ] Compare prices on Best Buy, Walmart, Target
- [ ] Set a budget — impulse buys are real

### Related Deals

- <a href="/merchant/amazon">Amazon coupon codes</a> — verified daily
- <a href="/blog/bestbuy-tv-buying-guide">Best Buy TV buying guide</a> — compare prices
- <a href="/merchant/target">Target deals</a> — price match option
    `,
    merchant: 'Amazon',
    merchantSlug: 'amazon',
    tags: ['Amazon Prime Day', 'Amazon deals', 'Amazon coupon codes', 'Prime Day 2026', 'flash sale'],
    publishedAt: '2025-06-01',
  },
  {
    slug: 'adidas-outlet-secrets',
    title: 'Adidas 奥莱 vs 官网：哪里买更划算？',
    description: 'Adidas 折扣店和官网购买的实际对比，含 outlet 淘货技巧和线上折扣码。',
    content: `
## Adidas 哪里买最划算？

### 线下 Outlets
Adidas 工厂店常年 5-7 折，断码清仓价格最低。但款式有限，适合买基础款。

### 线上官方折扣
- Adidas 官网 Rivalry专区 经常有 7 折
- 季末清仓区价格低至 3 折
- Outlet 官网 常年折扣

### 会员专享
Adidas 会员每月收到专属折扣码，部分款式额外 9 折。

### 搭配银行优惠
招商银行信用卡绑定云闪付，部分订单再减 50 元。
    `,
    merchant: 'Adidas',
    merchantSlug: 'adidas',
    tags: ['Adidas 折扣', 'Adidas 奥莱', '运动品牌'],
    publishedAt: '2025-04-05',
  },
  {
    slug: 'sephora-coupon-strategy',
    title: 'Sephora Coupon Codes 2026: How to Stack Discounts for 40% Off',
    description: 'Verified Sephora coupon codes and stacking strategy for 2026. Save 40% with insider tips on VIB sales, birthday rewards, promo codes, and cashback.',
    content: `## Sephora Coupon Strategy 2026: Save Up to 40% Every Order

Sephora rarely offers sitewide discounts, but savvy shoppers can stack multiple strategies to save 20-40% on every purchase. This guide covers every legitimate Sephora coupon method in 2026.

### Sephora Coupon Codes That Actually Work

| Code Type | Discount | How to Get It |
|-----------|----------|---------------|
| Welcome offer | 15-20% off first order | New email signup |
| Birthday gift | Free full-size product | Insider+ members, birthday month |
| Friends & Family | 20% off | Periodically, usually March & September |
| Sample with purchase | Free deluxe samples | Orders over $35-50 |

Pro tip: <a href="/merchant/sephora">Check our verified Sephora codes page</a> — we update daily with working promo codes.

### Sephora VIB Sale Calendar 2026

The VIB/Rouge sales are Sephora's biggest discount events:

- **Spring Savings Event** (April): Rouge 20% off, VIB 15% off, Insider 10% off
- **Fall Savings Event** (October): Same tiers as spring
- **Holiday Bonus** (November-December): Points multiplier events

How to get VIB status: Spend $350/year at Sephora. VIB members get 15% off during sales vs. Insider's 10%.

### Birthday Reward Strategy

- **Insider** (free): Birthday month — free mini gift
- **VIB** ($350/year): Birthday month — free full-size product
- **Rouge** ($1,000/year): Birthday month — choose from premium gift set

Stacking tip: Use your birthday reward during a VIB sale for maximum savings.

### How to Stack Sephora Discounts

1. Start with <a href="/merchant/sephora">Sephora promo codes</a> from our page
2. Shop during VIB/F&F sale events (up to 20% off)
3. Use a cashback credit card (Chase Freedom 5% on beauty, Rakuten 3-8%)
4. Buy gift cards at discount (10-15% off from Costco, raise.com)
5. Redeem Beauty Insider points for $10-$100 rewards

Example stack: VIB 20% off + cashback card 5% + discounted gift card 10% = **35% total savings**

### Sephora vs. Ulta: Where to Get Better Deals

- **Sephora**: Better for luxury brands (Dior, Chanel, Tom Ford), unique exclusives
- **Ulta**: Better everyday rewards (points on every dollar), 21 Days of Beauty sales

Both stores price-match major competitors on identical items.

### Sephora Sale Calendar 2026

| Month | Event | Discount |
|-------|-------|----------|
| January | New Year Refresh | Points multiplier |
| February | Valentine's Sets | Limited edition bundles |
| March | Friends & Family | 20% off (invite-only) |
| April | Spring VIB Sale | 15-20% off |
| May | Memorial Day | Gift with purchase |
| June | Summer Sale | Up to 50% off select |
| July | VIB Bonus Points | 2-4x points events |
| August | Back to Beauty | Gift sets |
| September | Friends & Family | 20% off |
| October | Fall VIB Sale | 15-20% off |
| November | Holiday Bonus Points | 4x points |
| December | Holiday Sets | Best value bundles |

### Related Deals

- <a href="/merchant/sephora">Sephora coupon codes</a> — verified daily
- <a href="/merchant/ulta-beauty">Ulta Beauty deals</a> — compare beauty savings
- <a href="/merchant/nike">Nike discount codes</a> — athletic gear
    `,
    merchant: 'Sephora',
    merchantSlug: 'nordstrom',
    tags: ['Sephora coupon codes', 'Sephora deals', 'VIB sale', 'beauty deals', 'coupon strategy'],
    publishedAt: '2025-05-18',
  },
  {
    slug: 'bestbuy-tv-buying-guide',
    title: 'Best Buy 电视购买指南：如何选到性价比最高的电视',
    description: 'Best Buy 电视选购攻略，包括 OLED vs QLED、尺寸选择、折扣时机。',
    content: `
## Best Buy 电视购买攻略

### 选购核心参数
- **OLED**：最佳画质，黑色纯正，贵
- **QLED**：亮度高，颜色鲜艳，性价比好
- **LED/LCD**：便宜，够用

### 最佳购买时机
- Black Friday：降价幅度最大，部分型号半价
- Super Bowl 前（1-2 月）：清库存，价格合理
- Prime Day（7月）：中等优惠

### 价格保护技巧
Best Buy 有 15 天价格保护期，降价可申请退差价。

### 安装服务
电视挂墙安装 Best Buy 收 $99，自己装省这笔钱。
    `,
    merchant: 'Best Buy',
    merchantSlug: 'bestbuy',
    tags: ['Best Buy 折扣', '电视选购', '电子产品'],
    publishedAt: '2025-06-01',
  },
  {
    slug: 'nordstrom-sale-guide',
    title: 'Nordstrom Sale Guide 2026: Anniversary Sale + Half-Yearly Deals',
    description: 'Complete Nordstrom sale guide for 2026: Anniversary Sale dates, Early Access tips, Half-Yearly Sale calendar, Rack deals, and stacking strategies to save 40-60%.',
    content: `
## Nordstrom Sale Guide 2026: Everything You Need to Know

Nordstrom runs several major sales each year, but the **Anniversary Sale** (July) is by far the biggest — offering brand-new fall merchandise at 30-60% off before it hits regular prices. This guide covers every Nordstrom sale in 2026, plus how to get Early Access and stack additional discounts.

### Nordstrom Anniversary Sale 2026

- **Preview**: Early July (browse, add to wishlist)
- **Early Access**: Mid-July (credit card holders + Nordy Club Ambassadors)
- **Public Access**: Late July
- **Last Call**: August (final markdowns, up to 60% off)

The Anniversary Sale is unique because it discounts **new arrivals**, not old inventory. That's why popular sizes and colors sell out fast.

### How to Get Nordstrom Anniversary Sale Early Access

1. **Nordstrom credit card**: Automatic 2-day early access
2. **Nordy Club Ambassador status**: Spend $1,000/year to unlock
3. **Credit card + Ambassador**: Get access even earlier
4. **Nordstrom debit card**: Same early access as credit card (no credit check)

### Half-Yearly Sale (June & December)

- **Spring Half-Yearly**: Late May - Early June — up to 40% off spring/summer
- **Holiday Half-Yearly**: Late December — up to 50% off winter items

Unlike the Anniversary Sale, Half-Yearly discounts clearance items from the previous season.

### Nordstrom Rack vs. Main Store

Nordstrom Rack is the off-price division, offering 30-70% off every day. Key differences:

- **Main store**: Curated brands, personal styling, free alterations
- **Rack**: Overstock + past-season items, more volume, less curation

Pro tip: Rack online has better selection than in-store. Check <a href="/merchant/nordstrom">Nordstrom coupon codes</a> before checkout.

### How to Stack Discounts at Nordstrom

1. Start with <a href="/merchant/nordstrom">Nordstrom coupons</a> from our verified page
2. Apply Nordstrom credit card points (up to $20 per $200 spent)
3. Use a cashback credit card (Chase Freedom, Citi Double Cash)
4. Shop during Anniversary Sale for deepest markdowns
5. Use Nordstrom Rewards points (earned from purchases)

### Best Nordstrom Sale Categories

- **Fragrances**: 20-30% off during Anniversary (best time to buy)
- **Designer handbags**: Rare discounts, Anniversary is the time
- **Athletic wear**: Nike, Adidas, Lululemon rarely go on sale elsewhere
- **Beauty**: Gift sets during holidays, GWP (gift with purchase) year-round

### 2026 Nordstrom Sale Calendar

| Month | Sale Type | Discount |
|-------|-----------|----------|
| January | Winter Clearance | Up to 60% off |
| February | End of Winter | Up to 50% off |
| March | Spring Preview | New arrivals |
| April | Spring Sale | Up to 30% off |
| May | Pre-Half-Yearly | Up to 40% off |
| June | Half-Yearly Sale | Up to 40% off |
| July | Anniversary Sale | 30-60% off (NEW items) |
| August | Anniversary Last Call | Up to 60% off |
| September | Fall Preview | New arrivals |
| October | Pre-Holiday | Up to 30% off |
| November | Black Friday | Up to 50% off |
| December | Holiday Half-Yearly | Up to 50% off |

### Nordstrom Sale Tips from Regular Shoppers

- Set up wishlist BEFORE the sale — items sell out in hours
- Buy during Early Access if you have the credit card
- Price match within 14 days if it drops further
- Free alterations on full-price purchases (in-store)
- Return policy: 40 days for regular, 45 days for cardholders

### Related Coupons and Deals

- <a href="/merchant/nordstrom">Nordstrom coupon codes</a> — verified daily
- <a href="/merchant/nike">Nike discount codes</a> — stack with Nordstrom athletic section
- <a href="/merchant/sephora">Sephora coupons</a> — compare beauty deals
    `,
    merchant: 'Nordstrom',
    merchantSlug: 'nordstrom',
    tags: ['Nordstrom sale', 'Nordstrom Anniversary Sale', 'Nordstrom deals', 'Nordstrom coupon codes', 'fashion deals'],
    publishedAt: '2025-07-15',
  },
  {
    slug: 'steam-sale-calendar',
    title: 'Steam Sale Calendar 2026: Every Major Sale Date & Best Deals',
    description: 'Complete Steam sale calendar for 2026 with exact dates, historical low prices, and stacking strategies. Never miss a Steam deal again.',
    content: `## Steam Sale Calendar 2026: Every Sale Date You Need

Steam runs 4 major seasonal sales plus publisher and themed events throughout the year. Knowing the exact dates helps you plan purchases and combine <a href="/merchant/steam">Steam coupon codes</a> with sale discounts for maximum savings.

### Steam Major Sales 2026

| Sale | Expected Dates | Typical Discount |
|------|---------------|------------------|
| Spring Sale | March 12 - March 19 | 20-60% off |
| Summer Sale | June 26 - July 10 | 30-80% off |
| Halloween Sale | October 28 - November 4 | 30-70% off |
| Autumn Sale | November 25 - December 2 | 20-70% off |
| Winter Sale | December 19 - January 2 | 40-90% off (biggest) |

Pro tip: The **Winter Sale** (December) has the deepest discounts. The **Summer Sale** (June-July) covers the widest catalog.

### Steam Publisher & Themed Sales

Beyond the big 5, Steam also runs:

- **Publisher Weekends**: Franchise sales (Ubisoft, Capcom, etc.) — typically 50-75% off
- **Lunar New Year Sale**: February — Asia-focused deals
- **Publisher Fest**: Various publishers, year-round
- **Next Fest**: Free game demos (February, June, October)

### How to Find the Best Steam Deals

1. **SteamDB** (steamdb.info): Track price history and current lowest prices
2. **IsThereAnyDeal** (isthereanydeal.com): Aggregate prices across stores
3. **Deku Deals** (dekudeals.com): Best for Switch + PC comparison
4. **<a href="/merchant/steam">Steam coupon page</a>**: Our daily-verified codes for extra discounts

### Steam Price History: When to Buy

- **Add to wishlist first**: Steam emails you when a wishlisted game goes on sale
- **Check price history**: If current price is below the green line on SteamDB, it's a good deal
- **Don't wait for "lowest"**: Games on your list for 2+ years rarely drop further

### How to Stack Steam Savings

1. Start with <a href="/merchant/steam">Steam promo codes</a> from our verified page
2. Wait for a Steam sale event (30-90% off)
3. Buy discounted Steam gift cards from Costco, Green Man Gaming, or eBay
4. Use cashback credit cards (3-5% back)
5. Combine with Humble Bundle for extra keys

Example: Winter Sale 40% off + gift card 10% off + cashback 5% = **55% total savings**

### Steam vs. Epic vs. GOG

| Store | Pros | Cons |
|-------|------|------|
| **Steam** | Biggest library, Workshop, achievements | Rare exclusives |
| **Epic** | Weekly free games, occasional exclusives | Smaller community features |
| **GOG** | DRM-free, classic games | Fewer modern releases |

Strategy: Claim free games on Epic, buy the rest on Steam during sales.

### Steam Holiday Sale Tips

- **Day 1**: Browse, add items to cart but don't buy
- **Day 2-3**: Prices are stable — buy your must-haves
- **Last 2 days**: Flash deals may appear, but popular titles rarely drop further
- **Gift cards**: Buy discounted ones BEFORE the sale starts

### Related Deals

- <a href="/merchant/steam">Steam coupon codes</a> — verified daily
- <a href="/blog/nike-discount-code-guide">Nike discount codes</a>
- <a href="/blog/amazon-prime-day-guide">Amazon Prime Day guide</a>
- <a href="/blog/bestbuy-tv-buying-guide">Best Buy TV buying guide</a>
    `,
    merchant: 'Nordstrom',
    merchantSlug: 'nordstrom',
    tags: ['Nordstrom sale', 'Nordstrom Anniversary Sale', 'Nordstrom deals', 'Nordstrom coupon codes', 'fashion deals'],
    publishedAt: '2025-07-15',
  },
  {
    slug: 'target-circle-app',
    title: 'Target Circle 会员攻略：每周特卖 + 5% 折扣怎么拿',
    description: 'Target Circle 免费会员注册、儿童折扣、Target 信用卡返现全解析。',
    content: `
## Target Circle 完全攻略

### 注册免费会员
Target Circle 完全免费，加入后在 Target 官网或 App 结账可享：
- 每周 Circle 成员专属折扣
- 生日 5% 折扣码
- Circle 条码在实体店使用

### 儿童折扣
Target 对 13 岁以下儿童的服装有额外折扣，可在 Circle 中添加孩子信息获取。

### Target 信用卡
RedCard 申请后享额外 5% 折扣：
- Debit 卡：连接银行账户，不欠债
- Credit 卡：有积分系统，但需注意信用记录

### Target 退货政策
大多数商品可在 90-120 天内退货，电子产品 30 天。
    `,
    merchant: 'Target',
    merchantSlug: 'target',
    tags: ['Target 折扣', 'Target Circle', '美国电商'],
    publishedAt: '2025-09-30',
  },
  {
    slug: 'uluta-beauty-skin-guide',
    title: 'Ulta Beauty 护肤指南：如何挑选适合自己的产品',
    description: 'Ulta Beauty 护肤品种草、肤质测试、积分兑换攻略。',
    content: `
## Ulta Beauty 护肤攻略

### 了解自己的肤质
- **油性皮肤**：选择无油、非致痘配方
- **干性皮肤**：找含有透明质酸、神经酰胺的产品
- **敏感肌**：建议先在 Ulta 官网购入 sample 试用

### Ulta 积分系统 Ultamate Rewards
| 等级 | 年消费 | 兑换比例 |
|------|--------|----------|
| 银卡 | $0+ | 1 美元 = 1 分 |
| 金卡 | $500+ | 1 美元 = 1.5 分 |
| 铂金卡 | $1200+ | 1 美元 = 2 分 |

### 积分兑换技巧
- 750 分 = $3.75 折扣
- 2000 分 = $10 折扣（通常 2 倍兑换日）
- 关注 2 倍/3 倍积分日，集中购买

### 季度事件
- **21 Days of Beauty**：每季度一次，部分产品 5 折
- **Love Your Skin**：美容仪专场
    `,
    merchant: 'Ulta Beauty',
    merchantSlug: 'ulta-beauty',
    tags: ['Ulta Beauty 折扣', '美妆护肤', '美国电商'],
    publishedAt: '2025-10-12',
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getArticlesByMerchant(merchantSlug: string): Article[] {
  return articles.filter((a) => a.merchantSlug === merchantSlug)
}
