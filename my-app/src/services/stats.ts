// ============================================
// 数据统计 API
// ============================================

import { api } from './api';
import { Stats, RealTimeData } from '@/types';

interface DashboardStats {
  totalProjects: number;
  totalNews: number;
  totalUsers: number;
  todayVisits: number;
  recentProjects: Array<{
    id: number;
    title: string;
    updatedAt: string;
  }>;
  recentNews: Array<{
    id: number;
    title: string;
    updatedAt: string;
  }>;
}

interface VisitStats {
  dates: string[];
  visits: number[];
  uniqueVisitors: number[];
}

export const statsApi = {
  // 获取首页统计数据
  getStats: () => api.get<Stats>('/api/stats'),

  // 获取实时数据
  getRealTimeData: () => api.get<RealTimeData>('/api/stats/realtime'),

  // 获取 Dashboard 统计数据
  getDashboardStats: () => api.get<DashboardStats>('/api/admin/dashboard'),

  // 获取访问统计
  getVisitStats: (days: number = 30) =>
    api.get<VisitStats>(`/api/admin/visits?days=${days}`),

  // 获取项目统计
  getProjectStats: () =>
    api.get<{
      byCategory: Record<string, number>;
      byStatus: Record<string, number>;
      totalCapacity: number;
    }>('/api/admin/stats/projects'),

  // 获取新闻统计
  getNewsStats: () =>
    api.get<{
      byCategory: Record<string, number>;
      published: number;
      draft: number;
    }>('/api/admin/stats/news'),
};
