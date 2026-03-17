import { useState, useCallback } from 'react';
import { API_BASE_URL } from '@/lib/config';

interface UseApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
}

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async <T,>(
    endpoint: string,
    options: UseApiOptions = {},
    body?: unknown
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
          ...options.headers,
        },
        ...(body && { body: JSON.stringify(body) }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message || '请求失败');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
}

// 专门用于公司内容管理的 hook
export function useCompanyApi() {
  const { request, loading, error } = useApi();

  const getCompanyInfo = useCallback(() => 
    request('/api/company/info'), [request]);
  
  const updateCompanyInfo = useCallback((data: { intro: string; introEn: string }) => 
    request('/api/company/info', { method: 'PUT' }, data), [request]);

  const getMilestones = useCallback(() => 
    request('/api/company/milestones'), [request]);

  const createMilestone = useCallback((data: any) => 
    request('/api/company/milestones', { method: 'POST' }, data), [request]);

  const updateMilestone = useCallback((id: number, data: any) => 
    request(`/api/company/milestones/${id}`, { method: 'PUT' }, data), [request]);

  const deleteMilestone = useCallback((id: number) => 
    request(`/api/company/milestones/${id}`, { method: 'DELETE' }), [request]);

  const getBusinessSections = useCallback(() => 
    request('/api/business/sections'), [request]);

  const updateBusinessSection = useCallback((id: string, data: any) => 
    request(`/api/business/sections/${id}`, { method: 'PUT' }, data), [request]);

  return {
    loading,
    error,
    getCompanyInfo,
    updateCompanyInfo,
    getMilestones,
    createMilestone,
    updateMilestone,
    deleteMilestone,
    getBusinessSections,
    updateBusinessSection,
  };
}
