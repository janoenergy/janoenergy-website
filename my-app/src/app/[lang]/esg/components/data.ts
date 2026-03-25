// ESG 数据类型定义

export interface CarbonTarget {
  year: number;
  progress: number;
}

export interface EnvironmentData {
  totalReduction: number; // 万吨
  coalSaved: number; // 万吨
  co2Reduced: number; // 万吨
  treesEquivalent: number; // 万棵
}

export interface SocialData {
  jobsCreated: number;
  ruralInvestment: number; // 万元
  communityEvents: number;
  scholarships: number; // 万元
}

export interface GovernanceData {
  esgCommittee: boolean;
  transparency: string;
  compliance: string;
}

export interface ESGData {
  carbonTarget: {
    peak: CarbonTarget;
    neutral: CarbonTarget;
  };
  environment: EnvironmentData;
  social: SocialData;
  governance: GovernanceData;
}

// ESG 数据
export const esgData: ESGData = {
  carbonTarget: {
    peak: { year: 2030, progress: 65 },
    neutral: { year: 2060, progress: 25 },
  },
  environment: {
    totalReduction: 500, // 万吨
    coalSaved: 320, // 万吨
    co2Reduced: 480, // 万吨
    treesEquivalent: 2600, // 万棵
  },
  social: {
    jobsCreated: 1200,
    ruralInvestment: 8500, // 万元
    communityEvents: 45,
    scholarships: 120, // 万元
  },
  governance: {
    esgCommittee: true,
    transparency: 'A级',
    compliance: '100%',
  },
};

// 省份数据
export const provinces = [
  { name: '天津', nameEn: 'Tianjin', x: 75, y: 35, projects: 1 },
  { name: '河北', nameEn: 'Hebei', x: 68, y: 28, projects: 2 },
  { name: '山西', nameEn: 'Shanxi', x: 58, y: 32, projects: 1 },
  { name: '内蒙古', nameEn: 'Inner Mongolia', x: 65, y: 22, projects: 1 },
  { name: '山东', nameEn: 'Shandong', x: 70, y: 40, projects: 1 },
  { name: '江苏', nameEn: 'Jiangsu', x: 78, y: 48, projects: 1 },
  { name: '浙江', nameEn: 'Zhejiang', x: 80, y: 55, projects: 1 },
  { name: '湖南', nameEn: 'Hunan', x: 62, y: 65, projects: 1 },
  { name: '云南', nameEn: 'Yunnan', x: 45, y: 72, projects: 1 },
  { name: '甘肃', nameEn: 'Gansu', x: 35, y: 38, projects: 1 },
  { name: '四川', nameEn: 'Sichuan', x: 42, y: 58, projects: 1 },
  { name: '广东', nameEn: 'Guangdong', x: 65, y: 78, projects: 1 },
];
