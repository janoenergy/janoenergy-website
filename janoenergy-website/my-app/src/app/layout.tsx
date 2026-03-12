import type { Metadata } from "next";
import "./globals.css";
import { BackToTop } from "@/components/BackToTop";
import PageLoader from "@/components/PageLoader";
import Analytics from "@/components/Analytics";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "江能集团 - 清洁能源，绿色未来",
  description: "江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商",
  keywords: "新能源,风电,光伏,储能,EPC,江能集团",
  openGraph: {
    title: "江能集团 - 清洁能源，绿色未来",
    description: "江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商",
    type: "website",
    locale: "zh_CN",
    url: "https://www.janoenergy.com",
    siteName: "江能集团",
  },
  twitter: {
    card: "summary_large_image",
    title: "江能集团 - 清洁能源，绿色未来",
    description: "江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商",
  },
  alternates: {
    canonical: "https://www.janoenergy.com",
    languages: {
      "zh-CN": "https://www.janoenergy.com/zh",
      "en-US": "https://www.janoenergy.com/en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

// 统计配置（从环境变量读取）
const BAIDU_ID = process.env.NEXT_PUBLIC_BAIDU_ID || '';
const GOOGLE_ID = process.env.NEXT_PUBLIC_GOOGLE_ID || '';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        {/* 预连接优化 */}
        <link rel="preconnect" href="https://api.janoenergy.com" />
        <link rel="dns-prefetch" href="https://api.janoenergy.com" />
        
        {/* 预加载关键资源 */}
        <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <PageLoader />
        {children}
        <BackToTop />
        <Analytics baiduId={BAIDU_ID} googleId={GOOGLE_ID} />
        <ChatWidget lang="zh" />
      </body>
    </html>
  );
}
