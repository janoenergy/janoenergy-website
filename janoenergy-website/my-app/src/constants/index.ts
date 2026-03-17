export const APP_NAME = '江能新能源集团';
export const APP_NAME_EN = 'JanoEnergy Group';

export const DEFAULT_LANGUAGE = 'zh';
export const SUPPORTED_LANGUAGES = ['zh', 'en'];

export const PROJECT_CATEGORIES = [
  { value: 'wind', label: '风电', labelEn: 'Wind Power' },
  { value: 'solar', label: '光伏', labelEn: 'Solar Power' },
  { value: 'storage', label: '储能', labelEn: 'Energy Storage' },
  { value: 'hybrid', label: '综合能源', labelEn: 'Hybrid Energy' },
];

export const PROJECT_STATUSES = [
  { value: 'planning', label: '规划中', labelEn: 'Planning' },
  { value: 'construction', label: '建设中', labelEn: 'Under Construction' },
  { value: 'operation', label: '运营中', labelEn: 'In Operation' },
];

export const NEWS_CATEGORIES = [
  { value: 'company', label: '公司新闻', labelEn: 'Company News' },
  { value: 'industry', label: '行业动态', labelEn: 'Industry News' },
  { value: 'policy', label: '政策法规', labelEn: 'Policy & Regulation' },
];

export const USER_ROLES = [
  { value: 'admin', label: '管理员', labelEn: 'Administrator' },
  { value: 'manager', label: '经理', labelEn: 'Manager' },
  { value: 'employee', label: '员工', labelEn: 'Employee' },
];

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};
