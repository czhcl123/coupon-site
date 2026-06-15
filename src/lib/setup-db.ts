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
    { id: 'home', name: '家居家电', slug: 'home' },
    { id: 'gaming', name: '游戏娱乐', slug: 'gaming' },
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
    { id: 'm_sephora', name: 'Sephora', slug: 'sephora', logo: 'https://logo.clearbit.com/sephora.com', affiliateUrl: 'https://www.sephora.com/?afmc=1', website: 'https://www.sephora.com', description: '国际美妆零售巨头' },
    { id: 'm_amazon', name: 'Amazon', slug: 'amazon', logo: 'https://logo.clearbit.com/amazon.com', affiliateUrl: 'https://www.amazon.com/?afmc=1', website: 'https://www.amazon.com', description: '全球最大电商平台' },
    { id: 'm_ulta', name: 'Ulta Beauty', slug: 'ulta-beauty', logo: 'https://logo.clearbit.com/ulta.com', affiliateUrl: 'https://www.ulta.com/?afmc=1', website: 'https://www.ulta.com', description: '美国最大美妆连锁' },
    { id: 'm_walmart', name: 'Walmart', slug: 'walmart', logo: 'https://logo.clearbit.com/walmart.com', affiliateUrl: 'https://www.walmart.com/?afmc=1', website: 'https://www.walmart.com', description: '全球最大零售商' },
    { id: 'm_target', name: 'Target', slug: 'target', logo: 'https://logo.clearbit.com/target.com', affiliateUrl: 'https://www.target.com/?afmc=1', website: 'https://www.target.com', description: '美国知名零售连锁' },
    { id: 'm_adidas', name: 'Adidas', slug: 'adidas', logo: 'https://logo.clearbit.com/adidas.com', affiliateUrl: 'https://www.adidas.com/?afmc=1', website: 'https://www.adidas.com', description: '德国运动品牌' },
    { id: 'm_nordstrom', name: 'Nordstrom', slug: 'nordstrom', logo: 'https://logo.clearbit.com/nordstrom.com', affiliateUrl: 'https://www.nordstrom.com/?afmc=1', website: 'https://www.nordstrom.com', description: '美国高端百货' },
    { id: 'm_expedia', name: 'Expedia', slug: 'expedia', logo: 'https://logo.clearbit.com/expedia.com', affiliateUrl: 'https://www.expedia.com/?afmc=1', website: 'https://www.expedia.com', description: '全球在线旅游平台' },
    { id: 'm_steam', name: 'Steam', slug: 'steam', logo: 'https://logo.clearbit.com/steampowered.com', affiliateUrl: 'https://store.steampowered.com/', website: 'https://store.steampowered.com', description: '全球最大游戏平台' },
    { id: 'm_shein', name: 'SHEIN', slug: 'shein', logo: 'https://logo.clearbit.com/shein.com', affiliateUrl: 'https://www.shein.com/?afmc=1', website: 'https://www.shein.com', description: '快时尚跨境电商' },
    { id: 'm_temu', name: 'Temu', slug: 'temu', logo: 'https://logo.clearbit.com/temu.com', affiliateUrl: 'https://www.temu.com/?afmc=1', website: 'https://www.temu.com', description: '北美新兴电商平台' },
    { id: 'm_amazon', name: 'Amazon', slug: 'amazon', logo: 'https://logo.clearbit.com/amazon.com', affiliateUrl: 'https://www.amazon.com/?afmc=1', website: 'https://www.amazon.com', description: '全球最大电商平台' },
    { id: 'm_ebay', name: 'eBay', slug: 'ebay', logo: 'https://logo.clearbit.com/ebay.com', affiliateUrl: 'https://www.ebay.com/?afmc=1', website: 'https://www.ebay.com', description: '全球知名在线拍卖及购物平台' },
  ]

  for (const m of merchants) {
    await conn.query(`INSERT INTO Merchant (id, name, slug, logo, affiliateUrl, website, description) VALUES (?, ?, ?, ?, ?, ?, ?)`, [m.id, m.name, m.slug, m.logo, m.affiliateUrl, m.website, m.description])
  }
  console.log(`✅ 创建了 ${merchants.length} 个商家`)

  // 插入优惠券
  const coupons = [
    // Nike
    { id: 'c_nike1', code: 'NIKE20', title: '会员专享20%OFF', discountType: 'PERCENT', discountValue: '20', isExclusive: true, isVerified: true, merchantId: 'm_nike' },
    { id: 'c_nike2', code: 'FREESHIP', title: '满599免运费', discountType: 'FREE_SHIP', discountValue: '0', minPurchase: 599, isExclusive: false, isVerified: true, merchantId: 'm_nike' },
    { id: 'c_nike3', code: 'NEW10', title: '新用户首单10%OFF', discountType: 'PERCENT', discountValue: '10', isExclusive: false, isVerified: true, merchantId: 'm_nike' },
    // ASOS
    { id: 'c_asos1', code: 'FIRST10', title: '新人首单10%OFF', discountType: 'PERCENT', discountValue: '10', isExclusive: false, isVerified: true, merchantId: 'm_asos' },
    { id: 'c_asos2', code: null, title: '季末大促低至5折', discountType: 'PERCENT_OFF', discountValue: '50', isExclusive: false, isVerified: false, merchantId: 'm_asos' },
    { id: 'c_asos3', code: 'STUDENT15', title: '学生享15%OFF', discountType: 'PERCENT', discountValue: '15', isExclusive: true, isVerified: true, merchantId: 'm_asos' },
    // Best Buy
    { id: 'c_bestbuy1', code: 'TECH100', title: '满1000减100', discountType: 'FIXED', discountValue: '100', minPurchase: 1000, isExclusive: false, isVerified: true, merchantId: 'm_bestbuy' },
    { id: 'c_bestbuy2', code: 'SAVE50', title: '指定商品立减50', discountType: 'FIXED', discountValue: '50', isExclusive: false, isVerified: true, merchantId: 'm_bestbuy' },
    { id: 'c_bestbuy3', code: null, title: '电脑专场最高享8折', discountType: 'PERCENT_OFF', discountValue: '20', isExclusive: false, isVerified: true, merchantId: 'm_bestbuy' },
    // Booking.com
    { id: 'c_booking1', code: 'TRAVEL15', title: '酒店预订15%OFF', discountType: 'PERCENT', discountValue: '15', isExclusive: true, isVerified: true, merchantId: 'm_booking' },
    { id: 'c_booking2', code: null, title: '首次预订立减200元', discountType: 'FIXED', discountValue: '200', isExclusive: false, isVerified: true, merchantId: 'm_booking' },
    // Sephora
    { id: 'c_sephora1', code: 'BEAUTY20', title: '全站20%OFF', discountType: 'PERCENT', discountValue: '20', isExclusive: true, isVerified: true, merchantId: 'm_sephora' },
    { id: 'c_sephora2', code: 'FREESHIP', title: '满50免运费', discountType: 'FREE_SHIP', discountValue: '0', minPurchase: 50, isExclusive: false, isVerified: true, merchantId: 'm_sephora' },
    { id: 'c_sephora3', code: 'VIP25', title: 'VIP会员25%OFF', discountType: 'PERCENT', discountValue: '25', isExclusive: true, isVerified: true, merchantId: 'm_sephora' },
    // Amazon
    { id: 'c_amazon1', code: 'PRIME10', title: 'Prime会员10%OFF', discountType: 'PERCENT', discountValue: '10', isExclusive: false, isVerified: true, merchantId: 'm_amazon' },
    { id: 'c_amazon2', code: null, title: '电子设备专区8折起', discountType: 'PERCENT_OFF', discountValue: '20', isExclusive: false, isVerified: false, merchantId: 'm_amazon' },
    { id: 'c_amazon3', code: 'SAVE15', title: '图书满100减15', discountType: 'FIXED', discountValue: '15', minPurchase: 100, isExclusive: false, isVerified: true, merchantId: 'm_amazon' },
    // Ulta Beauty
    { id: 'c_ulta1', code: 'ULT25', title: '全站25%OFF', discountType: 'PERCENT', discountValue: '25', isExclusive: true, isVerified: true, merchantId: 'm_ulta' },
    { id: 'c_ulta2', code: 'FREESHIP', title: '满75免运费', discountType: 'FREE_SHIP', discountValue: '0', minPurchase: 75, isExclusive: false, isVerified: true, merchantId: 'm_ulta' },
    // Walmart
    { id: 'c_walmart1', code: 'WALMART15', title: '线上购物满100减15', discountType: 'FIXED', discountValue: '15', minPurchase: 100, isExclusive: false, isVerified: true, merchantId: 'm_walmart' },
    { id: 'c_walmart2', code: null, title: '食品杂货最高8折', discountType: 'PERCENT_OFF', discountValue: '20', isExclusive: false, isVerified: false, merchantId: 'm_walmart' },
    { id: 'c_walmart3', code: 'GROCERY10', title: '生鲜区10%OFF', discountType: 'PERCENT', discountValue: '10', isExclusive: false, isVerified: true, merchantId: 'm_walmart' },
    // Target
    { id: 'c_target1', code: 'TARGET20', title: '家居用品20%OFF', discountType: 'PERCENT', discountValue: '20', isExclusive: true, isVerified: true, merchantId: 'm_target' },
    { id: 'c_target2', code: 'SAVE10', title: '满50减10', discountType: 'FIXED', discountValue: '10', minPurchase: 50, isExclusive: false, isVerified: true, merchantId: 'm_target' },
    // Adidas
    { id: 'c_adidas1', code: 'ADIDAS30', title: '会员专享30%OFF', discountType: 'PERCENT', discountValue: '30', isExclusive: true, isVerified: true, merchantId: 'm_adidas' },
    { id: 'c_adidas2', code: 'TEAM15', title: '团购15%OFF', discountType: 'PERCENT', discountValue: '15', isExclusive: false, isVerified: true, merchantId: 'm_adidas' },
    { id: 'c_adidas3', code: null, title: '指定款5折清仓', discountType: 'PERCENT_OFF', discountValue: '50', isExclusive: false, isVerified: false, merchantId: 'm_adidas' },
    // Nordstrom
    { id: 'c_nordstrom1', code: 'NORD20', title: '全站20%OFF', discountType: 'PERCENT', discountValue: '20', isExclusive: true, isVerified: true, merchantId: 'm_nordstrom' },
    { id: 'c_nordstrom2', code: 'STYLE15', title: '时尚单品15%OFF', discountType: 'PERCENT', discountValue: '15', isExclusive: false, isVerified: true, merchantId: 'm_nordstrom' },
    // Expedia
    { id: 'c_expedia1', code: 'FLIGHT50', title: '机票满1000减50', discountType: 'FIXED', discountValue: '50', minPurchase: 1000, isExclusive: false, isVerified: true, merchantId: 'm_expedia' },
    { id: 'c_expedia2', code: 'HOTEL25', title: '酒店预订25%OFF', discountType: 'PERCENT', discountValue: '25', isExclusive: true, isVerified: true, merchantId: 'm_expedia' },
    // Steam
    { id: 'c_steam1', code: null, title: '春季特卖最高享80%OFF', discountType: 'PERCENT_OFF', discountValue: '80', isExclusive: false, isVerified: true, merchantId: 'm_steam' },
    { id: 'c_steam2', code: 'WINTER25', title: '冬促25%OFF', discountType: 'PERCENT', discountValue: '25', isExclusive: false, isVerified: true, merchantId: 'm_steam' },
    // SHEIN
    { id: 'c_shein1', code: 'SHEIN15', title: '新用户15%OFF', discountType: 'PERCENT', discountValue: '15', isExclusive: false, isVerified: true, merchantId: 'm_shein' },
    { id: 'c_shein2', code: 'FREESHIP', title: '满49免运费', discountType: 'FREE_SHIP', discountValue: '0', minPurchase: 49, isExclusive: false, isVerified: true, merchantId: 'm_shein' },
    { id: 'c_shein3', code: null, title: '全站低至2折', discountType: 'PERCENT_OFF', discountValue: '80', isExclusive: false, isVerified: false, merchantId: 'm_shein' },
    // Temu
    { id: 'c_temu1', code: 'NEW50', title: '新用户50%OFF', discountType: 'PERCENT', discountValue: '50', isExclusive: true, isVerified: true, merchantId: 'm_temu' },
    { id: 'c_temu2', code: 'SAVE30', title: '满99减30', discountType: 'FIXED', discountValue: '30', minPurchase: 99, isExclusive: false, isVerified: true, merchantId: 'm_temu' },
    { id: 'c_temu3', code: null, title: '美妆专场3折起', discountType: 'PERCENT_OFF', discountValue: '70', isExclusive: false, isVerified: false, merchantId: 'm_temu' },
    // Amazon
    { id: 'c_amazon1', code: null, title: 'Kindle电子书低至5折', discountType: 'PERCENT_OFF', discountValue: '50', isExclusive: false, isVerified: true, merchantId: 'm_amazon' },
    { id: 'c_amazon2', code: null, title: '数码好物8折起', discountType: 'PERCENT_OFF', discountValue: '20', isExclusive: false, isVerified: true, merchantId: 'm_amazon' },
    { id: 'c_amazon3', code: 'PRIME10', title: 'Prime会员专属10%OFF', discountType: 'PERCENT', discountValue: '10', isExclusive: true, isVerified: true, merchantId: 'm_amazon' },
    // eBay
    { id: 'c_ebay1', code: null, title: '电子产品专场7折起', discountType: 'PERCENT_OFF', discountValue: '30', isExclusive: false, isVerified: true, merchantId: 'm_ebay' },
    { id: 'c_ebay2', code: 'EBAY15', title: '新用户首单15%OFF', discountType: 'PERCENT', discountValue: '15', isExclusive: false, isVerified: true, merchantId: 'm_ebay' },
    { id: 'c_ebay3', code: null, title: '时尚服饰热卖中', discountType: 'PERCENT_OFF', discountValue: '40', isExclusive: false, isVerified: false, merchantId: 'm_ebay' },
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