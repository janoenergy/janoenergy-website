import { BusinessSection, Project, News } from '@/types';

export const businessSections: BusinessSection[] = [
  {
    id: 'development',
    title: '项目开发',
    subtitle: 'Development',
    description: '从项目选址、资源评估到核准立项，提供全流程开发服务',
    features: ['风光资源评估', '项目可行性研究', '政府手续办理', '项目核准立项'],
    icon: 'compass',
  },
  {
    id: 'investment',
    title: '项目投资',
    subtitle: 'Investment',
    description: '专业的新能源项目投资与资产管理',
    features: ['项目投资分析', '融资方案设计', '风险评估管控', '资产运营管理'],
    icon: 'trending-up',
  },
  {
    id: 'epc',
    title: 'EPC总承包',
    subtitle: 'EPC Contracting',
    description: '设计-采购-施工一体化总承包服务',
    features: ['工程设计', '设备采购', '施工建设', '并网调试'],
    icon: 'building',
  },
  {
    id: 'operation',
    title: '运营管理',
    subtitle: 'Operation',
    description: '全生命周期的电站运营与维护服务',
    features: ['智能运维', '性能优化', '设备检修', '资产管理'],
    icon: 'settings',
  },
];

export const sampleProjects: Project[] = [
  {
    id: '1',
    title: '西龙虎峪60MW风电项目',
    category: 'wind',
    categoryName: '风电',
    location: '天津市蓟州区',
    capacity: '60MW',
    status: 'completed',
    description: '安装24台2.5MW风力发电机组，年发电量约1.4亿千瓦时',
    completionDate: '2024-06',
    createdAt: '2024-01-01',
    updatedAt: '2024-06-30',
  },
  {
    id: '2',
    title: '广东茂名50MW光伏项目',
    category: 'solar',
    categoryName: '光伏',
    location: '广东省茂名市',
    capacity: '50MW',
    status: 'completed',
    description: '渔光互补光伏发电项目，年发电量约5500万千瓦时',
    completionDate: '2023-12',
    createdAt: '2023-01-01',
    updatedAt: '2023-12-31',
  },
  {
    id: '3',
    title: '四川甘孜100MW光伏储能项目',
    category: 'storage',
    categoryName: '储能',
    location: '四川省甘孜州',
    capacity: '100MW光伏+20MW/40MWh储能',
    status: 'in-progress',
    description: '光伏+储能一体化项目，配置磷酸铁锂电池储能系统',
    completionDate: '2025-12',
    createdAt: '2024-06-01',
    updatedAt: '2024-12-01',
  },
];

export const sampleNews: News[] = [
  {
    id: '1',
    title: '江能集团中标河北200MW风电项目',
    summary: '成功中标河北省张家口市200MW风电开发项目',
    content: '详细内容...',
    category: 'company',
    publishedAt: '2025-03-01',
    createdAt: '2025-03-01',
  },
  {
    id: '2',
    title: '国家能源局发布2025年新能源发展政策',
    summary: '明确2025年风电光伏新增装机目标',
    content: '详细内容...',
    category: 'industry',
    publishedAt: '2025-02-28',
    createdAt: '2025-02-28',
  },
];

export const companyInfo = {
  name: '江能集团',
  fullName: '江能新能源集团有限公司',
  slogan: '清洁能源，绿色未来',
  description: '专注于新能源开发、投资、建设、运营的全产业链服务商',
  founded: '2018',
  headquarters: '中国·天津',
  contact: {
    phone: '400-XXX-XXXX',
    email: 'contact@janoenergy.cn',
    address: '天津市XX区XX路XX号',
  },
};
