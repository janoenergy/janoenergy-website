import Script from 'next/script';

interface StructuredDataProps {
  type?: 'Organization' | 'WebSite' | 'Article' | 'BreadcrumbList' | 'LocalBusiness' | 'Service' | 'FAQPage';
  data?: any;
  lang?: 'zh' | 'en';
}

export default function StructuredData({ type = 'Organization', data, lang = 'zh' }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: lang === 'zh' ? '江能集团' : 'JanoEnergy',
          alternateName: 'JanoEnergy Group',
          url: 'https://www.janoenergy.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.janoenergy.com/logo.png',
            width: 512,
            height: 512,
          },
          description: lang === 'zh' 
            ? '江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商'
            : 'JanoEnergy Group - Full-service new energy company specializing in wind, solar and energy storage',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '天津市滨海新区',
            addressLocality: '天津',
            addressRegion: '天津',
            postalCode: '300000',
            addressCountry: 'CN',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+86-400-888-9999',
            contactType: 'customer service',
            availableLanguage: ['Chinese', 'English'],
            areaServed: 'CN',
          },
          sameAs: [
            'https://www.linkedin.com/company/janoenergy',
          ],
          foundingDate: '2018',
          numberOfEmployees: {
            '@type': 'QuantitativeValue',
            value: '200+',
          },
        };
      
      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: lang === 'zh' ? '江能集团' : 'JanoEnergy',
          image: 'https://www.janoenergy.com/logo.png',
          '@id': 'https://www.janoenergy.com',
          url: 'https://www.janoenergy.com',
          telephone: '+86-400-888-9999',
          priceRange: '$$$',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '天津市滨海新区',
            addressLocality: '天津',
            addressRegion: '天津',
            postalCode: '300000',
            addressCountry: 'CN',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 39.0842,
            longitude: 117.2009,
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
        };
      
      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: lang === 'zh' ? '江能集团' : 'JanoEnergy',
          url: 'https://www.janoenergy.com',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://www.janoenergy.com/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
          inLanguage: lang === 'zh' ? 'zh-CN' : 'en-US',
        };
      
      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data?.title,
          description: data?.description,
          image: data?.image || 'https://www.janoenergy.com/og-image.jpg',
          datePublished: data?.publishedAt,
          dateModified: data?.updatedAt,
          author: {
            '@type': 'Organization',
            name: lang === 'zh' ? '江能集团' : 'JanoEnergy',
            url: 'https://www.janoenergy.com',
          },
          publisher: {
            '@type': 'Organization',
            name: lang === 'zh' ? '江能集团' : 'JanoEnergy',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.janoenergy.com/logo.png',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data?.url,
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
      
      case 'Service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: data?.name,
          description: data?.description,
          provider: {
            '@type': 'Organization',
            name: lang === 'zh' ? '江能集团' : 'JanoEnergy',
            url: 'https://www.janoenergy.com',
          },
          areaServed: {
            '@type': 'Country',
            name: 'China',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: lang === 'zh' ? '新能源服务' : 'New Energy Services',
            itemListElement: data?.services?.map((service: any) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: service.name,
              },
            })),
          },
        };
      
      case 'FAQPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data?.faqs?.map((faq: any) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
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
