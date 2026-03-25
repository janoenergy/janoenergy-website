// ============================================
// 新闻相关 API
// ============================================

import { api } from './api';
import {
  NewsItem,
  NewsFormData,
  NewsCategory,
  ApiListResponse,
} from '@/types';

// 筛选参数
interface NewsFilters {
  category?: NewsCategory;
  isPublished?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const newsApi = {
  // 获取新闻列表
  getNews: (filters?: NewsFilters) =>
    api.get<ApiListResponse<NewsItem>>('/api/news'),

  // 获取单条新闻
  getNewsItem: (id: number) => api.get<NewsItem>(`/api/news/${id}`),

  // 创建新闻
  createNews: (data: NewsFormData) =>
    api.post<NewsItem>('/api/news', data),

  // 更新新闻
  updateNews: (id: number, data: NewsFormData) =>
    api.put<NewsItem>(`/api/news/${id}`, data),

  // 删除新闻
  deleteNews: (id: number) => api.delete<void>(`/api/news/${id}`),

  // 批量删除
  batchDeleteNews: (ids: number[]) =>
    api.post<void>('/api/news/batch-delete', { ids }),

  // 发布/取消发布
  togglePublish: (id: number, isPublished: boolean) =>
    api.patch<NewsItem>(`/api/news/${id}`, { isPublished }),
};
