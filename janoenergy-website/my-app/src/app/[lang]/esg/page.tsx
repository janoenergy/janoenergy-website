import { generateMetadata as generateSEOMetadata, pageMetadata } from '@/lib/seo';
import { translations, Lang } from '@/lib/translations';
import ESGContent from './ESGContent';

export function generateStaticParams() {
  return [{ lang: 'zh' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: { lang: Lang } }) {
  const meta = {
    title: params.lang === 'zh' ? '可持续发展 | 江能集团' : 'Sustainability | JanoEnergy',
    description: params.lang === 'zh' 
      ? '江能集团ESG实践，践行可持续发展理念，推动绿色低碳转型' 
      : 'JanoEnergy ESG practices, sustainable development, green transformation',
  };
  return generateSEOMetadata({
    title: meta.title,
    description: meta.description,
    path: '/esg',
  });
}

export default function ESGPage({ params }: { params: { lang: Lang } }) {
  return <ESGContent lang={params.lang} />;
}
