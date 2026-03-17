import { generateMetadata as generateSEOMetadata, pageMetadata } from '@/lib/seo';
import { translations, Lang } from '@/lib/translations';
import { PageLayout } from '@/components/layout/PageLayout';
import NewsContent from './NewsContent';

export function generateStaticParams() {
  return [{ lang: 'zh' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: { lang: Lang } }) {
  const meta = pageMetadata.news;
  return generateSEOMetadata({
    title: params.lang === 'zh' ? meta.title : meta.titleEn,
    description: params.lang === 'zh' ? meta.description : meta.descriptionEn,
    path: '/news',
  });
}

export default function NewsPage({ params }: { params: { lang: Lang } }) {
  return (
    <PageLayout lang={params.lang}>
      <NewsContent lang={params.lang} />
    </PageLayout>
  );
}
