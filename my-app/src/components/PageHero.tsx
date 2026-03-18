'use client';

import { useThemeStyles } from '@/lib/theme';

interface PageHeroProps {
  title: string;
  subtitle: string;
  lang: string;
}

export default function PageHero({ title, subtitle, lang }: PageHeroProps) {
  const styles = useThemeStyles();

  return (
    <div className={`py-16 md:py-20 bg-gradient-to-br from-emerald-800 via-teal-700 to-cyan-800 dark:from-emerald-900 dark:via-teal-800 dark:to-cyan-900`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white`}>
          {title}
        </h1>
        <p className={`text-lg md:text-xl max-w-2xl text-emerald-100`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
