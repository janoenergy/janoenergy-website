import { generateMetadata as generateSEOMetadata, pageMetadata } from '@/lib/seo';
import { translations, Lang } from '@/lib/translations';
import { PageLayout } from '@/components/layout/PageLayout';
import BusinessContent from './BusinessContent';

export function generateStaticParams() {
  return [{ lang: 'zh' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: { lang: Lang } }) {
  const meta = pageMetadata.business;
  return generateSEOMetadata({
    title: params.lang === 'zh' ? meta.title : meta.titleEn,
    description: params.lang === 'zh' ? meta.description : meta.descriptionEn,
    path: '/business',
  });
}

export default function BusinessPage({ params }: { params: { lang: Lang } }) {
  return (
    <PageLayout lang={params.lang}>
      <BusinessContent lang={params.lang} />
    </PageLayout>
  );
}
