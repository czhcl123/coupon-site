import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com',
  port: 4000,
  user: '4PDGQRfsgPUn2oy.root',
  password: process.env.TIDB_PASSWORD,
  database: 'coupon_site',
  ssl: { rejectUnauthorized: true },
})

async function addPetData() {
  const conn = await pool.getConnection()
  console.log('✅ 连接成功！')

  // 插入宠物分类
  const categories = [
    { id: 'pet', name: '宠物用品', slug: 'pet' },
  ]
  for (const cat of categories) {
    await conn.query(`INSERT IGNORE INTO Category (id, name, slug) VALUES (?, ?, ?)`, [cat.id, cat.name, cat.slug])
  }
  console.log(`✅ 宠物分类创建完成`)

  // 插入宠物商家
  const merchants = [
    { id: 'm_boqi', name: '波奇网', slug: 'boqi', logo: 'https://logo.clearbit.com/boqii.com', affiliateUrl: 'https://www.boqii.com/?afmc=1', website: 'https://www.boqii.com', description: '专业宠物用品商城' },
    { id: 'm_emeng', name: 'E宠商城', slug: 'emeng', logo: 'https://logo.clearbit.com/ewang.com', affiliateUrl: 'https://www.ecanpet.com/?afmc=1', website: 'https://www.ecanpet.com', description: '一站式宠物用品平台' },
    { id: 'm_royal', name: '皇家宠物食品', slug: 'royal-pet', logo: 'https://logo.clearbit.com/royalcanin.com', affiliateUrl: 'https://www.royalcanin.com.cn/?afmc=1', website: 'https://www.royalcanin.com.cn', description: '法国皇家宠物食品' },
    { id: 'm_wanwu', name: '万物一谈宠物店', slug: 'wanwu-pet', logo: 'https://logo.clearbit.com/meituan.com', affiliateUrl: 'https://www.meituan.com/pet/?afmc=1', website: 'https://www.meituan.com/pet', description: '宠物用品与服务的综合平台' },
    { id: 'm_petsmart', name: '宠物家', slug: 'petsmart-cn', logo: 'https://logo.clearbit.com/chongwuoj.com', affiliateUrl: 'https://www.chongwuoj.com/?afmc=1', website: 'https://www.chongwuoj.com', description: '宠物食品与用品专营' },
    { id: 'm_aichong', name: '爱宠医生', slug: 'aichong-yisheng', logo: 'https://logo.clearbit.com/aichong120.com', affiliateUrl: 'https://www.aichong120.com/?afmc=1', website: 'https://www.aichong120.com', description: '宠物医疗与健康咨询' },
    { id: 'm_catto', name: '猫咪购', slug: 'maomigou', logo: 'https://logo.clearbit.com/maomigou.com', affiliateUrl: 'https://www.maomigou.com/?afmc=1', website: 'https://www.maomigou.com', description: '专业猫咪用品商城' },
    { id: 'm_pawgo', name: 'PawGo宠物生活馆', slug: 'pawgo', logo: 'https://logo.clearbit.com/pawgo.com', affiliateUrl: 'https://www.pawgo.com/?afmc=1', website: 'https://www.pawgo.com', description: '宠物服饰与配件' },
  ]

  for (const m of merchants) {
    await conn.query(`INSERT IGNORE INTO Merchant (id, name, slug, logo, affiliateUrl, website, description) VALUES (?, ?, ?, ?, ?, ?, ?)`, [m.id, m.name, m.slug, m.logo, m.affiliateUrl, m.website, m.description])
  }
  console.log(`✅ 创建了 ${merchants.length} 个宠物商家`)

  // 插入宠物优惠券
  const coupons = [
    // 波奇网
    { id: 'c_boqi1', code: 'BQ88', title: '全站满99减12', discountType: 'FIXED', discountValue: '12', minPurchase: '99', isExclusive: true, isVerified: true, merchantId: 'm_boqi' },
    { id: 'c_boqi2', code: 'NEW15', title: '新用户首单15%OFF', discountType: 'PERCENT', discountValue: '15', isExclusive: false, isVerified: true, merchantId: 'm_boqi' },
    { id: 'c_boqi3', code: null, title: '狗粮专区满149减30', discountType: 'FIXED', discountValue: '30', minPurchase: '149', isExclusive: false, isVerified: true, merchantId: 'm_boqi' },
    { id: 'c_boqi4', code: null, title: '满99免运费', discountType: 'FREE_SHIP', discountValue: '0', minPurchase: '99', isExclusive: false, isVerified: false, merchantId: 'm_boqi' },

    // E宠商城
    { id: 'c_emeng1', code: 'EPET20', title: '会员专享20%OFF', discountType: 'PERCENT', discountValue: '20', isExclusive: true, isVerified: true, merchantId: 'm_emeng' },
    { id: 'c_emeng2', code: 'PET199', title: '全站满199减30', discountType: 'FIXED', discountValue: '30', minPurchase: '199', isExclusive: false, isVerified: true, merchantId: 'm_emeng' },
    { id: 'c_emeng3', code: null, title: '猫咪用品低至5折起', discountType: 'PERCENT_OFF', discountValue: '50', isExclusive: false, isVerified: true, merchantId: 'm_emeng' },

    // 皇家宠物食品
    { id: 'c_royal1', code: 'ROYAL10', title: '全场满200减20', discountType: 'FIXED', discountValue: '20', minPurchase: '200', isExclusive: false, isVerified: true, merchantId: 'm_royal' },
    { id: 'c_royal2', code: 'VIP30', title: '会员满300减30', discountType: 'FIXED', discountValue: '30', minPurchase: '300', isExclusive: true, isVerified: true, merchantId: 'm_royal' },
    { id: 'c_royal3', code: null, title: '处方粮专区8折优惠', discountType: 'PERCENT_OFF', discountValue: '20', isExclusive: false, isVerified: true, merchantId: 'm_royal' },

    // 万物一谈宠物店
    { id: 'c_wanwu1', code: 'WANWU15', title: '宠物洗护服务立减15元', discountType: 'FIXED', discountValue: '15', isExclusive: false, isVerified: true, merchantId: 'm_wanwu' },
    { id: 'c_wanwu2', code: 'NEW50', title: '新店开业满100减50', discountType: 'FIXED', discountValue: '50', minPurchase: '100', isExclusive: true, isVerified: false, merchantId: 'm_wanwu' },

    // 宠物家
    { id: 'c_petsmart1', code: 'PET25', title: '全站满149减25', discountType: 'FIXED', discountValue: '25', minPurchase: '149', isExclusive: false, isVerified: true, merchantId: 'm_petsmart' },
    { id: 'c_petsmart2', code: 'CAT50', title: '猫咪用品专区5折起', discountType: 'PERCENT_OFF', discountValue: '50', isExclusive: false, isVerified: true, merchantId: 'm_petsmart' },

    // 爱宠医生
    { id: 'c_aichong1', code: 'FREE30', title: '首诊立减30元优惠券', discountType: 'FIXED', discountValue: '30', isExclusive: true, isVerified: true, merchantId: 'm_aichong' },
    { id: 'c_aichong2', code: null, title: '疫苗套餐8折优惠', discountType: 'PERCENT_OFF', discountValue: '20', isExclusive: false, isVerified: true, merchantId: 'm_aichong' },

    // 猫咪购
    { id: 'c_catto1', code: 'MIAO30', title: '新会员满99减30', discountType: 'FIXED', discountValue: '30', minPurchase: '99', isExclusive: true, isVerified: true, merchantId: 'm_catto' },
    { id: 'c_catto2', code: 'AUTO15', title: '自动回购专享15%OFF', discountType: 'PERCENT', discountValue: '15', isExclusive: false, isVerified: true, merchantId: 'm_catto' },
    { id: 'c_catto3', code: null, title: '猫爬架专区低至7折', discountType: 'PERCENT_OFF', discountValue: '30', isExclusive: false, isVerified: true, merchantId: 'm_catto' },

    // PawGo宠物生活馆
    { id: 'c_pawgo1', code: 'PAW18', title: '全场满128减18', discountType: 'FIXED', discountValue: '18', minPurchase: '128', isExclusive: false, isVerified: true, merchantId: 'm_pawgo' },
    { id: 'c_pawgo2', code: 'SUMMER30', title: '夏季服饰专区7折起', discountType: 'PERCENT_OFF', discountValue: '30', isExclusive: false, isVerified: true, merchantId: 'm_pawgo' },
  ]

  for (const c of coupons) {
    await conn.query(
      `INSERT IGNORE INTO Coupon (id, code, title, discountType, discountValue, minPurchase, isExclusive, isVerified, status, merchantId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE', ?)`,
      [c.id, c.code, c.title, c.discountType, c.discountValue, c.minPurchase || null, c.isExclusive, c.isVerified, c.merchantId]
    )
  }
  console.log(`✅ 创建了 ${coupons.length} 张宠物优惠券`)

  conn.release()
  await pool.end()
  console.log('🎉 宠物数据添加完成！')
}

addPetData().catch((e) => {
  console.error('❌ 失败:', e.message)
  process.exit(1)
})
