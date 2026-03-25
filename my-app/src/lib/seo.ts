/**
 * SEO 优化配置
 * 包含结构化数据、元数据模板、OpenGraph 配置等
 */

import { Metadata } from 'next';

// 网站基本信息
export const siteConfig = {
  name: '江能集团',
  nameEn: 'JanoEnergy',
  description: '江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商',
  descriptionEn: 'JanoEnergy - Full-chain service provider for new energy development, investment, construction, and operation',
  url: 'https://www.janoenergy.com',
  ogImage: 'https://www.janoenergy.com/og-image.svg',
  twitter: '@janoenergy',
  email: 'contact@janoenergy.com',
  phone: '+86-xxx-xxxx-xxxx',
  address: '中国',
  foundedYear: 2010,
  employees: '500+',
};

// 页面元数据模板
export const pageMetadata = {
  home: {
    title: '江能集团 - 清洁能源，绿色未来',
    titleEn: 'JanoEnergy - Clean Energy, Green Future',
    description: '江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商。覆盖12个省份，总装机容量1135MW+',
    descriptionEn: 'JanoEnergy - Full-chain service provider for wind power, solar, energy storage. Covering 12 provinces with 1135MW+ installed capacity',
  },
  about: {
    title: '关于我们 - 江能集团',
    titleEn: 'About Us - JanoEnergy',
    description: '了解江能集团的发展历程、企业文化、核心团队和社会责任',
    descriptionEn: 'Learn about JanoEnergy\'s history, culture, team and social responsibility',
  },
  business: {
    title: '业务领域 - 江能集团',
    titleEn: 'Business - JanoEnergy',
    description: '风电、光伏、储能、EPC总承包等新能源全产业链服务',
    descriptionEn: 'Wind power, solar, energy storage, EPC turnkey solutions',
  },
  projects: {
    title: '项目案例 - 江能集团',
    titleEn: 'Projects - JanoEnergy',
    description: '查看江能集团在全国各地的清洁能源项目案例',
    descriptionEn: 'Explore JanoEnergy\'s clean energy projects across the country',
  },
  news: {
    title: '新闻中心 - 江能集团',
    titleEn: 'News - JanoEnergy',
    description: '了解江能集团最新动态、行业资讯和企业公告',
    descriptionEn: 'Latest news, industry updates and announcements from JanoEnergy',
  },
  contact: {
    title: '联系我们 - 江能集团',
    titleEn: 'Contact - JanoEnergy',
    description: '联系江能集团，获取新能源解决方案咨询',
    descriptionEn: 'Contact JanoEnergy for new energy solutions consultation',
  },
  esg: {
    title: 'ESG与可持续发展 - 江能集团',
    titleEn: 'ESG & Sustainability - JanoEnergy',
    description: '江能集团的ESG实践和可持续发展承诺',
    descriptionEn: 'JanoEnergy\'s ESG practices and sustainability commitment',
  },
  certificates: {
    title: '资质证书 - 江能集团',
    titleEn: 'Certificates - JanoEnergy',
    description: '江能集团的企业资质和行业认证',
    descriptionEn: 'JanoEnergy\'s enterprise qualifications and industry certifications',
  },
};

// 默认元数据模板
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - 清洁能源，绿色未来 | ${siteConfig.nameEn} - Clean Energy, Green Future`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    '新能源',
    '风电',
    '光伏',
    '储能',
    'EPC',
    '江能集团',
    '清洁能源',
    '绿色能源',
    'New Energy',
    'Wind Power',
    'Solar Energy',
    'Energy Storage',
    'Clean Energy',
    'Renewable Energy',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - 清洁能源，绿色未来`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - 清洁能源，绿色未来`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - 清洁能源，绿色未来`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitter,
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'zh-CN': `${siteConfig.url}/zh`,
      'en-US': `${siteConfig.url}/en`,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    other: {
      'baidu-site-verification': process.env.NEXT_PUBLIC_BAIDU_VERIFICATION || '',
    },
  },
  category: 'energy',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
};

// 生成页面特定的元数据
export function generateMetadata({
  title,
  description,
  path,
  ogImage,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

// 组织结构化数据 (JSON-LD)
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    alternateName: siteConfig.nameEn,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
    },
    sameAs: [
      // 社交媒体链接（如果有）
      // 'https://twitter.com/janoenergy',
      // 'https://linkedin.com/company/janoenergy',
    ],
    foundingDate: siteConfig.foundedYear.toString(),
    numberOfEmployees: siteConfig.employees,
    industry: 'Renewable Energy',
  };
}

// 网站结构化数据
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    alternateName: siteConfig.nameEn,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// 面包屑结构化数据
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// 本地企业结构化数据
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    image: `${siteConfig.url}/og-image.svg`,
    '@id': siteConfig.url,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      // 如果有具体坐标可以填写
      // latitude: 39.9042,
      // longitude: 116.4074,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
  };
}

// 导出别名以兼容旧代码
export { generateMetadata as generatePageMetadata };
export { defaultMetadata as siteMetadata };
