import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BackToTop } from "@/components/BackToTop";
import PageLoader from "@/components/PageLoader";
import Analytics from "@/components/Analytics";
import ChatWidget from "@/components/ChatWidget";
import { ThemeProvider } from "@/lib/theme";
import { defaultMetadata, siteConfig } from "@/lib/seo";
import { resourceHints } from "@/lib/performance";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { WebVitalsMonitor } from "@/components/WebVitalsMonitor";
import { SafeComponentLoader, DeferredLoader } from "@/components/SafeLoader";

// 导出元数据
export const metadata: Metadata = defaultMetadata;

// 导出视口配置
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
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
        {/* DNS 预解析 */}
        {resourceHints.dnsPrefetch.map((url) => (
          <link key={url} rel="dns-prefetch" href={url} />
        ))}
        
        {/* 预连接 */}
        {resourceHints.preconnect.map((url) => (
          <link key={url} rel="preconnect" href={url} crossOrigin="anonymous" />
        ))}
        
        {/* 预加载关键字体 */}
        <link 
          rel="preload" 
          href="/fonts/main.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        
        {/* 预加载关键图片资源 */}
        <link 
          rel="preload" 
          href="/images/projects/wind-farm.jpg" 
          as="image" 
        />
        
        {/* PWA 配置 */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content={siteConfig.name} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-152x152.png" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/icons/icon-192x192.png" color="#10b981" />
        
        {/* MS Tile */}
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* 字体加载优化脚本 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // 字体加载优化
                if ('fonts' in document) {
                  document.fonts.ready.then(function() {
                    document.documentElement.classList.add('fonts-loaded');
                  });
                } else {
                  document.documentElement.classList.add('fonts-loaded');
                }
                
                // 主题切换防闪烁
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                  document.documentElement.classList.add('theme-loaded');
                } catch (e) {
                  // localStorage 可能被禁用
                  document.documentElement.classList.add('theme-loaded');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <PageLoader />
          {children}
          <BackToTop />
          
          {/* 安全加载可能出错的组件 */}
          <SafeComponentLoader fallback={null}>
            <DeferredLoader delay={2000}>
              <Analytics baiduId={BAIDU_ID} googleId={GOOGLE_ID} />
            </DeferredLoader>
          </SafeComponentLoader>
          
          <SafeComponentLoader fallback={null}>
            <ChatWidget lang="zh" />
          </SafeComponentLoader>
          
          <SafeComponentLoader fallback={null}>
            <DeferredLoader delay={3000}>
              <ServiceWorkerRegister />
            </DeferredLoader>
          </SafeComponentLoader>
          
          <SafeComponentLoader fallback={null}>
            <DeferredLoader delay={1500}>
              <WebVitalsMonitor />
            </DeferredLoader>
          </SafeComponentLoader>
        </ThemeProvider>
      </body>
    </html>
  );
}
