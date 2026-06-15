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
    title: 'Amazon Prime Day 购物攻略：如何抢到真正的好价',
    description: 'Amazon Prime Day 秒杀技巧、折扣叠加方法、避免先涨后降的识别方法。',
    content: `
## Prime Day 抢购攻略

Amazon Prime Day 通常在每年 7 月中旬，是亚马逊年度最大促销。

### 准备工作
1. 提前加购物车，记录日常价格
2. 下载 Amazon App，设置降价提醒
3. 提前充值 Prime 会员

### 识别真降价
- 用 Keepa 插件查看历史价格
- 先涨后降是常见套路
- 关注 Products 页面"Was/Now"价格

### 叠加技巧
- Prime 会员专享价 + 信用卡返现
- 购买 Gift Card 再购物可多赚积分
    `,
    merchant: 'Amazon',
    merchantSlug: 'amazon',
    tags: ['Amazon 折扣', 'Prime Day', '海淘攻略'],
    publishedAt: '2025-03-10',
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
    title: 'Sephora 丝芙兰折扣码使用完全指南',
    description: 'Sephora 新用户礼包、会员生日优惠、VIB 折扣攻略。',
    content: `
## Sephora 丝芙兰省钱攻略

### 新用户首单优惠
首次注册可获得 8 折码，有效期 30 天，需在 30 天内使用。

### 会员生日礼物
- Insider 会员：生日当月 8 折
- VIB 会员：生日当月 8 折 + 专属礼包
- Rouge 会员：生日当月 8 折 + 生日套装

### VIB 会员申请建议
年消费满 $350 即升级 VIB，8 折码用两次就回本。

### 节假日促销
- 12.12 年终大促：部分套装 5 折
- 会员日（通常 3 月和 9 月）：额外 8 折专区
    `,
    merchant: 'Sephora',
    merchantSlug: 'sephora',
    tags: ['Sephora 折扣', '丝芙兰优惠', '美妆攻略'],
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
    title: 'Nordstrom Anniversary Sale 攻略：为什么抢不过代购',
    description: 'Nordstrom 周年庆抢先购买技巧，会员 Early Access 怎么拿到。',
    content: `
## Nordstrom 周年庆完全指南

### 什么是 Anniversary Sale
每年 7 月的周年庆是 Nordstrom 全年最大促销，很多热门款低至 5 折。

### Early Access 怎么拿
- Nordstrom 信用卡持有人提前 2 天开抢
- VIB 会员有优先购买权
- 部分品牌提前 1 周

### 代购为什么抢得过？
代购通常用机器人脚本 + 多个账号批量抢。我们普通人怎么应对：
1. 提前做好功课，看中款式直接加车
2. 提前设置地址和支付方式
3. 订阅邮件提醒，收到通知马上动手

### 购买技巧
- 选" pickup in store" 比快递更快
- 服装尺寸偏大，建议选小一号
    `,
    merchant: 'Nordstrom',
    merchantSlug: 'nordstrom',
    tags: ['Nordstrom 折扣', 'Nordstrom 周年庆', '时尚电商'],
    publishedAt: '2025-07-15',
  },
  {
    slug: 'steam-sale-calendar',
    title: 'Steam 游戏折扣日历：抓住每一个史低价',
    description: 'Steam 促销时间表、Humble Bundle 互补购买、CDKeys 平台介绍。',
    content: `
## Steam 游戏折扣攻略

### Steam 四大促销节点
1. **夏季特卖**（6月底-7月中）：最大型
2. **冬季特卖**（12月底）：年度最低
3. **万圣节特卖**（10月底）：恐怖游戏专区
4. **春季特卖**（3月）：独立游戏专场

### 价格历史查询
用 SteamDB 或 IsThereAnyDeal 查询历史价格，低于历史最低价再入手。

### 叠加购买策略
- 先买 Humble Bundle Bundle，再激活到 Steam
- Epic Games Store 每周免费游戏值得领
- CDKeys 等第三方平台价格通常更低

### 购买建议
不要等"最低价"，游戏打到一半就不想玩了的大有人在。
    `,
    merchant: 'Steam',
    merchantSlug: 'steam',
    tags: ['Steam 折扣', '游戏促销', 'Steam 特卖'],
    publishedAt: '2025-08-22',
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
