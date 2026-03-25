// 首页组件类型定义

export interface Stats {
  capacity: number;
  projects: number;
  provinces: number;
  year: number;
}

export interface RealTimeData {
  todayGeneration: number;
  totalReduction: number;
  activeProjects: number;
  onlineRate: string;
  co2Saved: number;
  homesPowered: number;
}

export interface ApiProject {
  id: number;
  title: string;
  titleEn: string;
  category: string;
  location: string;
  locationEn: string;
  capacity: string;
  description: string;
  descriptionEn: string;
  imageUrl: string | null;
  status: string;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

// 默认统计数据
export const defaultStats: Stats = {
  capacity: 1135,
  projects: 12,
  provinces: 12,
  year: 2018,
};

// 从容量字符串提取 MW 数值
export function parseCapacity(capacityStr: string): number {
  if (!capacityStr) return 0;
  const mwMatch = capacityStr.match(/(\d+)\s*MW/i);
  if (mwMatch) return parseInt(mwMatch[1], 10);
  const numMatch = capacityStr.match(/(\d+)/);
  return numMatch ? parseInt(numMatch[1], 10) : 0;
}

// 从地址提取省份
export function extractProvince(location: string): string {
  if (!location) return '';
  const match = location.match(/^([^省市]+)[省市]/);
  return match ? match[1] : location.split('省')[0].split('市')[0];
}
