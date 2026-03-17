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
  
  // 数据状态
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [values, setValues] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [honors, setHonors] = useState<any[]>([]);

  // 获取公司简介
  const fetchCompanyInfo = useCallback(async () => {
    const data = await request('/api/company/info');
    if (data) setCompanyInfo(data);
    return data;
  }, [request]);
  
  // 更新公司简介
  const updateCompanyInfo = useCallback(async (data: { intro: string; introEn: string }) => {
    const result = await request('/api/company/info', { method: 'PUT' }, data);
    if (result) setCompanyInfo(result);
    return result;
  }, [request]);

  // 获取发展历程
  const fetchMilestones = useCallback(async () => {
    const data = await request('/api/company/milestones');
    if (data) setMilestones(data);
    return data;
  }, [request]);

  const createMilestone = useCallback(async (data: any) => {
    const result = await request('/api/company/milestones', { method: 'POST' }, data);
    if (result) await fetchMilestones();
    return result;
  }, [request, fetchMilestones]);

  const updateMilestone = useCallback(async (id: number, data: any) => {
    const result = await request(`/api/company/milestones/${id}`, { method: 'PUT' }, data);
    if (result) await fetchMilestones();
    return result;
  }, [request, fetchMilestones]);

  const deleteMilestone = useCallback(async (id: number) => {
    const result = await request(`/api/company/milestones/${id}`, { method: 'DELETE' });
    if (result) await fetchMilestones();
    return result;
  }, [request, fetchMilestones]);

  // 获取价值观
  const fetchValues = useCallback(async () => {
    const data = await request('/api/company/values');
    if (data) setValues(data);
    return data;
  }, [request]);

  const createValue = useCallback(async (data: any) => {
    const result = await request('/api/company/values', { method: 'POST' }, data);
    if (result) await fetchValues();
    return result;
  }, [request, fetchValues]);

  const updateValue = useCallback(async (id: number, data: any) => {
    const result = await request(`/api/company/values/${id}`, { method: 'PUT' }, data);
    if (result) await fetchValues();
    return result;
  }, [request, fetchValues]);

  const deleteValue = useCallback(async (id: number) => {
    const result = await request(`/api/company/values/${id}`, { method: 'DELETE' });
    if (result) await fetchValues();
    return result;
  }, [request, fetchValues]);

  // 获取团队成员
  const fetchTeamMembers = useCallback(async () => {
    const data = await request('/api/team/members');
    if (data) setTeamMembers(data);
    return data;
  }, [request]);

  const createTeamMember = useCallback(async (data: any) => {
    const result = await request('/api/team/members', { method: 'POST' }, data);
    if (result) await fetchTeamMembers();
    return result;
  }, [request, fetchTeamMembers]);

  const updateTeamMember = useCallback(async (id: number, data: any) => {
    const result = await request(`/api/team/members/${id}`, { method: 'PUT' }, data);
    if (result) await fetchTeamMembers();
    return result;
  }, [request, fetchTeamMembers]);

  const deleteTeamMember = useCallback(async (id: number) => {
    const result = await request(`/api/team/members/${id}`, { method: 'DELETE' });
    if (result) await fetchTeamMembers();
    return result;
  }, [request, fetchTeamMembers]);

  // 获取证书
  const fetchCertificates = useCallback(async () => {
    const data = await request('/api/certificates');
    if (data) setCertificates(data);
    return data;
  }, [request]);

  const createCertificate = useCallback(async (data: any) => {
    const result = await request('/api/certificates', { method: 'POST' }, data);
    if (result) await fetchCertificates();
    return result;
  }, [request, fetchCertificates]);

  const updateCertificate = useCallback(async (id: number, data: any) => {
    const result = await request(`/api/certificates/${id}`, { method: 'PUT' }, data);
    if (result) await fetchCertificates();
    return result;
  }, [request, fetchCertificates]);

  const deleteCertificate = useCallback(async (id: number) => {
    const result = await request(`/api/certificates/${id}`, { method: 'DELETE' });
    if (result) await fetchCertificates();
    return result;
  }, [request, fetchCertificates]);

  // 获取荣誉
  const fetchHonors = useCallback(async () => {
    const data = await request('/api/honors');
    if (data) setHonors(data);
    return data;
  }, [request]);

  const createHonor = useCallback(async (data: any) => {
    const result = await request('/api/honors', { method: 'POST' }, data);
    if (result) await fetchHonors();
    return result;
  }, [request, fetchHonors]);

  const updateHonor = useCallback(async (id: number, data: any) => {
    const result = await request(`/api/honors/${id}`, { method: 'PUT' }, data);
    if (result) await fetchHonors();
    return result;
  }, [request, fetchHonors]);

  const deleteHonor = useCallback(async (id: number) => {
    const result = await request(`/api/honors/${id}`, { method: 'DELETE' });
    if (result) await fetchHonors();
    return result;
  }, [request, fetchHonors]);

  return {
    loading,
    error,
    companyInfo,
    milestones,
    values,
    teamMembers,
    certificates,
    honors,
    fetchCompanyInfo,
    fetchMilestones,
    fetchValues,
    fetchTeamMembers,
    fetchCertificates,
    fetchHonors,
    updateCompanyInfo,
    createMilestone,
    updateMilestone,
    deleteMilestone,
    createValue,
    updateValue,
    deleteValue,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    createCertificate,
    updateCertificate,
    deleteCertificate,
    createHonor,
    updateHonor,
    deleteHonor,
  };
}
