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
    <div className={`py-16 md:py-20 ${styles.bgGradient}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${styles.text}`}>
          {title}
        </h1>
        <p className={`text-lg md:text-xl max-w-3xl mx-auto ${styles.textSecondary}`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
