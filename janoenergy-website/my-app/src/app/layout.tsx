import type { Metadata } from "next";
import "./globals.css";
import { BackToTop } from "@/components/BackToTop";
import PageLoader from "@/components/PageLoader";

export const metadata: Metadata = {
  title: "江能集团 - 清洁能源，绿色未来",
  description: "江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商",
  keywords: "新能源,风电,光伏,储能,EPC,江能集团",
  openGraph: {
    title: "江能集团 - 清洁能源，绿色未来",
    description: "江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        {/* 百度统计 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?YOUR_BAIDU_TONGJI_ID";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <PageLoader />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
