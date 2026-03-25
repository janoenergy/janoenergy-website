import { useState, useCallback } from 'react';
import { useApi } from './useApi';

// 公司基本信息 Hook
export function useCompanyInfo() {
  const { request, loading, error } = useApi();
  const [companyInfo, setCompanyInfo] = useState<any>(null);

  const fetchCompanyInfo = useCallback(async () => {
    const data = await request('/api/company/info');
    if (data) setCompanyInfo(data);
    return data;
  }, [request]);

  const updateCompanyInfo = useCallback(async (data: { intro: string; introEn: string }) => {
    const result = await request('/api/company/info', { method: 'PUT' }, data);
    if (result) setCompanyInfo(result);
    return result;
  }, [request]);

  return { companyInfo, loading, error, fetchCompanyInfo, updateCompanyInfo };
}

// 发展历程 Hook
export function useMilestones() {
  const { request, loading, error } = useApi();
  const [milestones, setMilestones] = useState<any[]>([]);

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

  return { milestones, loading, error, fetchMilestones, createMilestone, updateMilestone, deleteMilestone };
}

// 价值观 Hook
export function useValues() {
  const { request, loading, error } = useApi();
  const [values, setValues] = useState<any[]>([]);

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

  return { values, loading, error, fetchValues, createValue, updateValue, deleteValue };
}

// 团队成员 Hook
export function useTeamMembers() {
  const { request, loading, error } = useApi();
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

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

  return { teamMembers, loading, error, fetchTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember };
}

// 证书 Hook
export function useCertificates() {
  const { request, loading, error } = useApi();
  const [certificates, setCertificates] = useState<any[]>([]);

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

  return { certificates, loading, error, fetchCertificates, createCertificate, updateCertificate, deleteCertificate };
}

// 荣誉 Hook
export function useHonors() {
  const { request, loading, error } = useApi();
  const [honors, setHonors] = useState<any[]>([]);

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

  return { honors, loading, error, fetchHonors, createHonor, updateHonor, deleteHonor };
}
