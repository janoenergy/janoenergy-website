// ============================================
// 项目相关 API
// ============================================

import { api } from './api';
import {
  Project,
  ProjectFormData,
  ProjectCategory,
  ProjectStatus,
  ApiListResponse,
} from '@/types';

// 筛选参数
interface ProjectFilters {
  category?: ProjectCategory;
  status?: ProjectStatus;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const projectApi = {
  // 获取项目列表
  getProjects: (filters?: ProjectFilters) =>
    api.get<ApiListResponse<Project>>('/api/projects', {
      // 可以在这里添加查询参数处理
    }),

  // 获取单个项目
  getProject: (id: number) => api.get<Project>(`/api/projects/${id}`),

  // 创建项目
  createProject: (data: ProjectFormData) =>
    api.post<Project>('/api/projects', data),

  // 更新项目
  updateProject: (id: number, data: ProjectFormData) =>
    api.put<Project>(`/api/projects/${id}`, data),

  // 删除项目
  deleteProject: (id: number) => api.delete<void>(`/api/projects/${id}`),

  // 批量删除
  batchDeleteProjects: (ids: number[]) =>
    api.post<void>('/api/projects/batch-delete', { ids }),

  // 导出项目
  exportProjects: (format: 'excel' | 'csv' = 'excel') =>
    api.get<Blob>(`/api/projects/export?format=${format}`),
};
