import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 种子数据：热门商家 + 示例优惠券
const merchants = [
  {
    name: 'Nike',
    slug: 'nike',
    logo: 'https://logo.clearbit.com/nike.com',
    affiliateUrl: 'https://www.nike.com/?afmc=1&cid=Affiliate',
    website: 'https://www.nike.com',
    description: '全球领先的运动品牌',
    categories: { connect: [{ slug: 'fashion' }] },
    coupons: {
      create: [
        {
          code: 'NIKE20',
          title: '会员专享20%OFF',
          discountType: 'PERCENT',
          discountValue: '20',
          isExclusive: true,
          isVerified: true,
        },
        {
          code: 'FREESHIP',
          title: '满599免运费',
          discountType: 'FREE_SHIP',
          discountValue: '0',
          minPurchase: '599',
          isVerified: true,
        },
      ],
    },
  },
  {
    name: 'ASOS',
    slug: 'asos',
    logo: 'https://logo.clearbit.com/asos.com',
    affiliateUrl: 'https://www.asos.com/?afmc=1',
    website: 'https://www.asos.com',
    description: '英国时尚电商',
    categories: { connect: [{ slug: 'fashion' }] },
    coupons: {
      create: [
        {
          code: 'FIRST10',
          title: '新人首单10%OFF',
          discountType: 'PERCENT',
          discountValue: '10',
          isVerified: true,
        },
        {
          code: null,
          title: '季末大促低至5折',
          discountType: 'PERCENT_OFF',
          discountValue: '50',
          isExclusive: false,
        },
      ],
    },
  },
  {
    name: 'Best Buy',
    slug: 'bestbuy',
    logo: 'https://logo.clearbit.com/bestbuy.com',
    affiliateUrl: 'https://www.bestbuy.com/?afmc=1',
    website: 'https://www.bestbuy.com',
    description: '美国电子产品零售巨头',
    categories: { connect: [{ slug: 'electronics' }] },
    coupons: {
      create: [
        {
          code: 'TECH100',
          title: '满1000减100',
          discountType: 'FIXED',
          discountValue: '100',
          minPurchase: '1000',
          isVerified: true,
        },
      ],
    },
  },
  {
    name: 'Booking.com',
    slug: 'booking-com',
    logo: 'https://logo.clearbit.com/booking.com',
    affiliateUrl: 'https://www.booking.com/?afmc=1',
    website: 'https://www.booking.com',
    description: '全球最大在线旅行预订平台',
    categories: { connect: [{ slug: 'travel' }] },
    coupons: {
      create: [
        {
          code: 'TRAVEL15',
          title: '酒店预订15%OFF',
          discountType: 'PERCENT',
          discountValue: '15',
          isExclusive: true,
        },
        {
          code: null,
          title: '首次预订立减200元',
          discountType: 'FIXED',
          discountValue: '200',
          isVerified: true,
        },
      ],
    },
  },
]

const categories = [
  { name: '时尚服饰', slug: 'fashion' },
  { name: '电子产品', slug: 'electronics' },
  { name: '旅行酒店', slug: 'travel' },
  { name: '美妆护肤', slug: 'beauty' },
  { name: '食品生鲜', slug: 'food' },
  { name: '订阅服务', slug: 'subscription' },
]

async function main() {
  console.log('🌱 开始播种种子数据...')

  // 清理旧数据
  await prisma.coupon.deleteMany()
  await prisma.merchant.deleteMany()
  await prisma.category.deleteMany()

  // 创建分类
  for (const cat of categories) {
    await prisma.category.create({ data: cat })
  }
  console.log(`✅ 创建了 ${categories.length} 个分类`)

  // 创建商家 + 优惠券
  for (const merchant of merchants) {
    await prisma.merchant.create({
      data: merchant,
    })
  }
  console.log(`✅ 创建了 ${merchants.length} 个商家 + 优惠券`)

  // 更新过期状态
  const now = new Date()
  const expired = await prisma.coupon.updateMany({
    where: { expiresAt: { lt: now }, status: 'ACTIVE' },
    data: { status: 'EXPIRED' },
  })
  if (expired.count > 0) console.log(`⚠️ ${expired.count} 张优惠券已过期`)

  console.log('🎉 种子数据播种完成！')
}

main()
  .catch((e) => {
    console.error('❌ 播种失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })