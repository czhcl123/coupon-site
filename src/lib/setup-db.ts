import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com',
  port: 4000,
  user: '4PDGQRfsgPUn2oy.root',
  password: process.env.TIDB_PASSWORD,
  database: 'sys',
  ssl: { rejectUnauthorized: true },
})

async function setup() {
  console.log('🔌 连接 TiDB Cloud...')
  const conn = await pool.getConnection()
  console.log('✅ 连接成功！')

  // 创建数据库（如果不存在）
  await conn.query(`CREATE DATABASE IF NOT EXISTS coupon_site`)
  await conn.query(`USE coupon_site`)

  // 创建表
  console.log('📦 创建数据表...')

  await conn.query(`
    CREATE TABLE IF NOT EXISTS Merchant (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      logo VARCHAR(500),
      affiliateUrl VARCHAR(500),
      website VARCHAR(500),
      description TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `)

  await conn.query(`
    CREATE TABLE IF NOT EXISTS Category (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL
    )
  `)

  await conn.query(`
    CREATE TABLE IF NOT EXISTS Coupon (
      id VARCHAR(50) PRIMARY KEY,
      code VARCHAR(50),
      title VARCHAR(255) NOT NULL,
      description TEXT,
      discountType ENUM('PERCENT','FIXED','FREE_SHIP','BUY_X_GET_Y','PERCENT_OFF') NOT NULL DEFAULT 'PERCENT',
      discountValue VARCHAR(50) NOT NULL,
      minPurchase DECIMAL(10,2),
      maxDiscount DECIMAL(10,2),
      startsAt TIMESTAMP NULL,
      expiresAt TIMESTAMP NULL,
      isExclusive BOOLEAN DEFAULT FALSE,
      isVerified BOOLEAN DEFAULT FALSE,
      clickCount INT DEFAULT 0,
      successCount INT DEFAULT 0,
      status ENUM('ACTIVE','EXPIRED','INVALID') DEFAULT 'ACTIVE',
      merchantId VARCHAR(50) NOT NULL,
      categoryId VARCHAR(50),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_merchant (merchantId),
      INDEX idx_status_expires (status, expiresAt)
    )
  `)

  console.log('✅ 数据表创建完成！')

  // 清理旧数据
  await conn.query(`DELETE FROM Coupon`)
  await conn.query(`DELETE FROM Merchant`)
  await conn.query(`DELETE FROM Category`)

  // 插入分类
  const categories = [
    { id: 'fashion', name: '时尚服饰', slug: 'fashion' },
    { id: 'electronics', name: '电子产品', slug: 'electronics' },
    { id: 'travel', name: '旅行酒店', slug: 'travel' },
    { id: 'beauty', name: '美妆护肤', slug: 'beauty' },
    { id: 'food', name: '食品生鲜', slug: 'food' },
    { id: 'subscription', name: '订阅服务', slug: 'subscription' },
  ]

  for (const cat of categories) {
    await conn.query(`INSERT INTO Category (id, name, slug) VALUES (?, ?, ?)`, [cat.id, cat.name, cat.slug])
  }
  console.log(`✅ 创建了 ${categories.length} 个分类`)

  // 插入商家
  const merchants = [
    { id: 'm_nike', name: 'Nike', slug: 'nike', logo: 'https://logo.clearbit.com/nike.com', affiliateUrl: 'https://www.nike.com/?afmc=1&cid=Affiliate', website: 'https://www.nike.com', description: '全球领先的运动品牌' },
    { id: 'm_asos', name: 'ASOS', slug: 'asos', logo: 'https://logo.clearbit.com/asos.com', affiliateUrl: 'https://www.asos.com/?afmc=1', website: 'https://www.asos.com', description: '英国时尚电商' },
    { id: 'm_bestbuy', name: 'Best Buy', slug: 'bestbuy', logo: 'https://logo.clearbit.com/bestbuy.com', affiliateUrl: 'https://www.bestbuy.com/?afmc=1', website: 'https://www.bestbuy.com', description: '美国电子产品零售巨头' },
    { id: 'm_booking', name: 'Booking.com', slug: 'booking-com', logo: 'https://logo.clearbit.com/booking.com', affiliateUrl: 'https://www.booking.com/?afmc=1', website: 'https://www.booking.com', description: '全球最大在线旅行预订平台' },
  ]

  for (const m of merchants) {
    await conn.query(`INSERT INTO Merchant (id, name, slug, logo, affiliateUrl, website, description) VALUES (?, ?, ?, ?, ?, ?, ?)`, [m.id, m.name, m.slug, m.logo, m.affiliateUrl, m.website, m.description])
  }
  console.log(`✅ 创建了 ${merchants.length} 个商家`)

  // 插入优惠券
  const coupons = [
    { id: 'c_nike1', code: 'NIKE20', title: '会员专享20%OFF', discountType: 'PERCENT', discountValue: '20', isExclusive: true, isVerified: true, merchantId: 'm_nike' },
    { id: 'c_nike2', code: 'FREESHIP', title: '满599免运费', discountType: 'FREE_SHIP', discountValue: '0', minPurchase: 599, isExclusive: false, isVerified: true, merchantId: 'm_nike' },
    { id: 'c_asos1', code: 'FIRST10', title: '新人首单10%OFF', discountType: 'PERCENT', discountValue: '10', isExclusive: false, isVerified: true, merchantId: 'm_asos' },
    { id: 'c_asos2', code: null, title: '季末大促低至5折', discountType: 'PERCENT_OFF', discountValue: '50', isExclusive: false, isVerified: false, merchantId: 'm_asos' },
    { id: 'c_bestbuy1', code: 'TECH100', title: '满1000减100', discountType: 'FIXED', discountValue: '100', minPurchase: 1000, isExclusive: false, isVerified: true, merchantId: 'm_bestbuy' },
    { id: 'c_booking1', code: 'TRAVEL15', title: '酒店预订15%OFF', discountType: 'PERCENT', discountValue: '15', isExclusive: true, isVerified: true, merchantId: 'm_booking' },
    { id: 'c_booking2', code: null, title: '首次预订立减200元', discountType: 'FIXED', discountValue: '200', isExclusive: false, isVerified: true, merchantId: 'm_booking' },
  ]

  for (const c of coupons) {
    await conn.query(
      `INSERT INTO Coupon (id, code, title, discountType, discountValue, minPurchase, isExclusive, isVerified, status, merchantId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE', ?)`,
      [c.id, c.code, c.title, c.discountType, c.discountValue, c.minPurchase || null, c.isExclusive, c.isVerified, c.merchantId]
    )
  }
  console.log(`✅ 创建了 ${coupons.length} 张优惠券`)

  conn.release()
  await pool.end()
  console.log('🎉 数据库初始化完成！')
}

setup().catch((e) => {
  console.error('❌ 初始化失败:', e.message)
  process.exit(1)
})