'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/lib/theme';
import { translations, Lang } from '@/lib/translations';

interface PageLayoutProps {
  lang: Lang;
  children: React.ReactNode;
}

export function PageLayout({ lang, children }: PageLayoutProps) {
  const t = translations[lang];
  
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar lang={lang} t={t.nav} />
        <main className="flex-1">
          {children}
        </main>
        <Footer lang={lang} t={t.footer} />
      </div>
    </ThemeProvider>
  );
}
