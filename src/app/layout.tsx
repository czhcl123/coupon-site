import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: '优惠总动员 - 精选商家优惠券/折扣码大全',
  description: '汇聚 Amazon、Temu、Shein、Nike、Adidas 等知名品牌最新优惠券折扣码，无码优惠实时更新，新用户专享优惠全覆盖。',
  verification: {
    google: "oAPWO8qwzk1v-FL2aL7ooRVLu9_SYNsOaX-LcHQ0GP4",
  },
  openGraph: {
    title: '优惠总动员 - 精选商家优惠券折扣码大全',
    description: '汇聚各大品牌最新优惠券，无码优惠实时更新',
    siteName: '优惠总动员',
    locale: 'zh_CN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
