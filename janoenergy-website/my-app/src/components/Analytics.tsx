'use client';

import Script from 'next/script';

interface AnalyticsProps {
  baiduId?: string;
  googleId?: string;
}

export default function Analytics({ baiduId, googleId }: AnalyticsProps) {
  return (
    <>
      {/* 百度统计 */}
      {baiduId && (
        <Script
          id="baidu-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?${baiduId}";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
              })();
            `,
          }}
        />
      )}
      
      {/* Google Analytics */}
      {googleId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleId}');
              `,
            }}
          />
        </>
      )}
    </>
  );
}
