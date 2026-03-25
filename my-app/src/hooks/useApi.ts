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

// 重新导出拆分的 hooks，保持兼容性
export {
  useCompanyInfo,
  useMilestones,
  useValues,
  useTeamMembers,
  useCertificates,
  useHonors,
} from './useCompany';

// 为了向后兼容，保留 useCompanyApi 导出
export function useCompanyApi() {
  const { request, loading, error } = useApi();
  
  // 导入拆分的 hooks
  const companyInfoHook = useCompanyInfo();
  const milestonesHook = useMilestones();
  const valuesHook = useValues();
  const teamMembersHook = useTeamMembers();
  const certificatesHook = useCertificates();
  const honorsHook = useHonors();
  
  return {
    loading,
    error,
    companyInfo: companyInfoHook.companyInfo,
    milestones: milestonesHook.milestones,
    values: valuesHook.values,
    teamMembers: teamMembersHook.teamMembers,
    certificates: certificatesHook.certificates,
    honors: honorsHook.honors,
    fetchCompanyInfo: companyInfoHook.fetchCompanyInfo,
    fetchMilestones: milestonesHook.fetchMilestones,
    fetchValues: valuesHook.fetchValues,
    fetchTeamMembers: teamMembersHook.fetchTeamMembers,
    fetchCertificates: certificatesHook.fetchCertificates,
    fetchHonors: honorsHook.fetchHonors,
    updateCompanyInfo: companyInfoHook.updateCompanyInfo,
    createMilestone: milestonesHook.createMilestone,
    updateMilestone: milestonesHook.updateMilestone,
    deleteMilestone: milestonesHook.deleteMilestone,
    createValue: valuesHook.createValue,
    updateValue: valuesHook.updateValue,
    deleteValue: valuesHook.deleteValue,
    createTeamMember: teamMembersHook.createTeamMember,
    updateTeamMember: teamMembersHook.updateTeamMember,
    deleteTeamMember: teamMembersHook.deleteTeamMember,
    createCertificate: certificatesHook.createCertificate,
    updateCertificate: certificatesHook.updateCertificate,
    deleteCertificate: certificatesHook.deleteCertificate,
    createHonor: honorsHook.createHonor,
    updateHonor: honorsHook.updateHonor,
    deleteHonor: honorsHook.deleteHonor,
  };
}

// 为了保持类型兼容，从 useCompany 导入类型
import {
  useCompanyInfo,
  useMilestones,
  useValues,
  useTeamMembers,
  useCertificates,
  useHonors,
} from './useCompany';
