// ============================================
// 图片资源配置中心
// 统一管理系统所有图片资源，便于本地化替换
// 使用国内可访问的图片源（Pexels CDN）
// ============================================

// 项目展示图片
export const projectImages = {
  // 风电项目
  wind: {
    farm: '/images/projects/wind-farm.jpg',
    turbine: '/images/projects/wind-turbine.jpg',
    offshore: '/images/projects/wind-offshore.jpg',
    installation: '/images/projects/wind-installation.jpg',
  },
  // 光伏项目
  solar: {
    farm: '/images/projects/solar-farm.jpg',
    rooftop: '/images/projects/solar-rooftop.jpg',
    desert: '/images/projects/solar-desert.jpg',
    closeup: '/images/projects/solar-closeup.jpg',
  },
  // 储能项目
  storage: {
    facility: '/images/projects/storage-facility.jpg',
    battery: '/images/projects/storage-battery.jpg',
    substation: '/images/projects/storage-substation.jpg',
  },
  // 项目案例图（按ID映射）
  byId: {
    1: '/images/projects/wind-farm.jpg',
    2: '/images/projects/solar-farm.jpg',
    3: '/images/projects/wind-turbine.jpg',
    4: '/images/projects/wind-offshore.jpg',
    5: '/images/projects/solar-rooftop.jpg',
    6: '/images/projects/storage-facility.jpg',
    7: '/images/projects/solar-desert.jpg',
    8: '/images/projects/wind-installation.jpg',
    9: '/images/projects/solar-closeup.jpg',
    10: '/images/projects/storage-battery.jpg',
    11: '/images/projects/wind-farm-2.jpg',
    12: '/images/projects/storage-substation.jpg',
  } as Record<number, string>,
};

// 业务板块图片
export const businessImages = {
  development: '/images/business/development.jpg',
  investment: '/images/business/investment.jpg',
  epc: '/images/business/epc.jpg',
  operation: '/images/business/operation.jpg',
};

// 团队图片
export const teamImages = {
  member1: '/images/team/member-1.jpg',
  member2: '/images/team/member-2.jpg',
  member3: '/images/team/member-3.jpg',
  member4: '/images/team/member-4.jpg',
  // 高管图片
  ceo: '/images/team/ceo.jpg',
  cfo: '/images/team/cfo.jpg',
  cto: '/images/team/cto.jpg',
  coo: '/images/team/coo.jpg',
};

// 新闻图片
export const newsImages = {
  news1: '/images/news/news-1.jpg',
  news2: '/images/news/news-2.jpg',
  news3: '/images/news/news-3.jpg',
  news4: '/images/news/news-4.jpg',
  news5: '/images/news/news-5.jpg',
  news6: '/images/news/news-6.jpg',
};

// 证书图片
export const certificateImages = {
  iso9001: '/images/certificates/iso9001.jpg',
  iso14001: '/images/certificates/iso14001.jpg',
  iso45001: '/images/certificates/iso45001.jpg',
  cert1: '/images/certificates/cert-1.jpg',
  cert2: '/images/certificates/cert-2.jpg',
  cert3: '/images/certificates/cert-3.jpg',
  cert4: '/images/certificates/cert-4.jpg',
};

// 关于我们页面图片
export const aboutImages = {
  company: '/images/about/company.jpg',
  team: '/images/about/team.jpg',
};

// 首页轮播图
export const heroImages = {
  hero1: '/images/hero/hero-1.jpg',
  hero2: '/images/hero/hero-2.jpg',
  hero3: '/images/hero/hero-3.jpg',
  hero: '/images/hero/hero.jpg',
};

// 默认占位图
export const placeholderImages = {
  project: '/images/projects/wind-farm.jpg',
  avatar: '/images/team/member-1.jpg',
  hero: '/images/hero/hero.jpg',
  news: '/images/news/news-1.jpg',
  certificate: '/images/certificates/cert-1.jpg',
};

// 获取项目图片（支持回退）
export function getProjectImage(id: number): string {
  return projectImages.byId[id] || placeholderImages.project;
}

// 获取业务图片
export function getBusinessImage(type: keyof typeof businessImages): string {
  return businessImages[type] || placeholderImages.project;
}

// 获取团队图片
export function getTeamImage(member: keyof typeof teamImages): string {
  return teamImages[member] || placeholderImages.avatar;
}

// 获取新闻图片
export function getNewsImage(index: number): string {
  const key = `news${index}` as keyof typeof newsImages;
  return newsImages[key] || placeholderImages.news;
}

// 获取证书图片
export function getCertificateImage(index: number): string {
  const key = `cert${index}` as keyof typeof certificateImages;
  return certificateImages[key] || placeholderImages.certificate;
}

// 获取首页轮播图
export function getHeroImage(index: number): string {
  const key = `hero${index}` as keyof typeof heroImages;
  return heroImages[key] || placeholderImages.hero;
}
