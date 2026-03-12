import Script from 'next/script';

interface StructuredDataProps {
  type?: 'Organization' | 'WebSite' | 'Article' | 'BreadcrumbList';
  data?: any;
}

export default function StructuredData({ type = 'Organization', data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: '江能集团',
          alternateName: 'JanoEnergy',
          url: 'https://www.janoenergy.com',
          logo: 'https://www.janoenergy.com/logo.png',
          description: '江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商',
          address: {
            '@type': 'PostalAddress',
            addressLocality: '天津市',
            addressRegion: '天津市',
            addressCountry: 'CN',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+86-400-888-9999',
            contactType: 'customer service',
            availableLanguage: ['Chinese', 'English'],
          },
          sameAs: [
            'https://www.linkedin.com/company/janoenergy',
          ],
        };
      
      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: '江能集团',
          url: 'https://www.janoenergy.com',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.janoenergy.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        };
      
      case 'BreadcrumbList':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data?.items?.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })) || [],
        };
      
      default:
        return data;
    }
  };

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
