import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "江能集团 - 清洁能源，绿色未来 | JanoEnergy - Clean Energy, Green Future",
  description: "江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商 | JanoEnergy Group - Full-chain new energy service provider",
  keywords: "新能源,风电,光伏,储能,EPC,江能集团,New Energy,Wind Power,Solar,Energy Storage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
