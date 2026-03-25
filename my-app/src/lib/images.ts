// ============================================
// 图片资源配置中心
// 统一管理系统所有图片资源，便于本地化替换
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
};

// 默认占位图
export const placeholderImages = {
  project: '/images/placeholder-project.jpg',
  avatar: '/images/placeholder-avatar.jpg',
  hero: '/images/hero-bg.jpg',
};

// 获取项目图片（支持回退）
export function getProjectImage(id: number): string {
  return projectImages.byId[id] || placeholderImages.project;
}

// 获取业务图片
export function getBusinessImage(type: keyof typeof businessImages): string {
  return businessImages[type] || placeholderImages.project;
}
