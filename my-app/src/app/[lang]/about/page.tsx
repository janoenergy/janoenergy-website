import { generateMetadata as generateSEOMetadata, pageMetadata } from '@/lib/seo';
import { translations, Lang } from '@/lib/translations';
import { PageLayout } from '@/components/layout/PageLayout';
import AboutContent from './AboutContent';

export function generateStaticParams() {
  return [{ lang: 'zh' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: { lang: Lang } }) {
  const meta = pageMetadata.about;
  return generateSEOMetadata({
    title: params.lang === 'zh' ? meta.title : meta.titleEn,
    description: params.lang === 'zh' ? meta.description : meta.descriptionEn,
    path: '/about',
  });
}

export default function AboutPage({ params }: { params: { lang: Lang } }) {
  return (
    <PageLayout lang={params.lang}>
      <AboutContent lang={params.lang} />
    </PageLayout>
  );
}
