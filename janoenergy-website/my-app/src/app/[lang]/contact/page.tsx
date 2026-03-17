import { generateMetadata as generateSEOMetadata, pageMetadata } from '@/lib/seo';
import { translations, Lang } from '@/lib/translations';
import { PageLayout } from '@/components/layout/PageLayout';
import ContactContent from './ContactContent';

export function generateStaticParams() {
  return [{ lang: 'zh' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: { lang: Lang } }) {
  const meta = pageMetadata.contact;
  return generateSEOMetadata({
    title: params.lang === 'zh' ? meta.title : meta.titleEn,
    description: params.lang === 'zh' ? meta.description : meta.descriptionEn,
    path: '/contact',
  });
}

export default function ContactPage({ params }: { params: { lang: Lang } }) {
  return (
    <PageLayout lang={params.lang}>
      <ContactContent lang={params.lang} />
    </PageLayout>
  );
}
