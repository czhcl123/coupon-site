import type { NextConfig } from "next";

const RAILWAY = "https://coupon-site-production.up.railway.app";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  async redirects() {
    return [
      // /merchant/* → Railway 同路径 (保留 query string)
      {
        source: "/merchant/:slug*",
        destination: `${RAILWAY}/merchant/:slug*`,
        permanent: true,
      },
      // /blog/* → Railway
      {
        source: "/blog/:slug*",
        destination: `${RAILWAY}/blog/:slug*`,
        permanent: true,
      },
      // /discount-calculator
      {
        source: "/discount-calculator",
        destination: `${RAILWAY}/discount-calculator`,
        permanent: true,
      },
      // 品牌长尾页
      {
        source: "/canva-pro-coupon-code",
        destination: `${RAILWAY}/canva-pro-coupon-code`,
        permanent: true,
      },
      {
        source: "/shopify-discount-code",
        destination: `${RAILWAY}/shopify-discount-code`,
        permanent: true,
      },
      {
        source: "/webflow-promo-code",
        destination: `${RAILWAY}/webflow-promo-code`,
        permanent: true,
      },
      // /about
      {
        source: "/about",
        destination: `${RAILWAY}/about`,
        permanent: true,
      },
      // llms / sitemap / robots — 这些会被原路径处理(Next 自动透传),不重定向
      // 不写兜底:让未列出的 URL 走 Next 自身,避免误伤
    ];
  },
};

export default nextConfig;