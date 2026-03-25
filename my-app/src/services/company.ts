// ============================================
// 公司信息相关 API
// ============================================

import { api } from './api';
import {
  CompanyInfo,
  Milestone,
  CompanyValue,
  TeamMember,
  Certificate,
  Honor,
} from '@/types';

export const companyApi = {
  // 公司介绍
  getCompanyInfo: () => api.get<CompanyInfo>('/api/company/info'),
  updateCompanyInfo: (data: Partial<CompanyInfo>) =>
    api.put<CompanyInfo>('/api/company/info', data),

  // 发展历程
  getMilestones: () => api.get<Milestone[]>('/api/company/milestones'),
  createMilestone: (data: Omit<Milestone, 'id'>) =>
    api.post<Milestone>('/api/company/milestones', data),
  updateMilestone: (id: number, data: Partial<Milestone>) =>
    api.put<Milestone>(`/api/company/milestones/${id}`, data),
  deleteMilestone: (id: number) =>
    api.delete<void>(`/api/company/milestones/${id}`),
  reorderMilestones: (ids: number[]) =>
    api.post<void>('/api/company/milestones/reorder', { ids }),

  // 企业价值观
  getValues: () => api.get<CompanyValue[]>('/api/company/values'),
  createValue: (data: Omit<CompanyValue, 'id'>) =>
    api.post<CompanyValue>('/api/company/values', data),
  updateValue: (id: number, data: Partial<CompanyValue>) =>
    api.put<CompanyValue>(`/api/company/values/${id}`, data),
  deleteValue: (id: number) => api.delete<void>(`/api/company/values/${id}`),

  // 管理团队
  getTeamMembers: () => api.get<TeamMember[]>('/api/company/team'),
  createTeamMember: (data: Omit<TeamMember, 'id'>) =>
    api.post<TeamMember>('/api/company/team', data),
  updateTeamMember: (id: number, data: Partial<TeamMember>) =>
    api.put<TeamMember>(`/api/company/team/${id}`, data),
  deleteTeamMember: (id: number) => api.delete<void>(`/api/company/team/${id}`),
  reorderTeamMembers: (ids: number[]) =>
    api.post<void>('/api/company/team/reorder', { ids }),

  // 资质证书
  getCertificates: () => api.get<Certificate[]>('/api/company/certificates'),
  createCertificate: (data: Omit<Certificate, 'id'>) =>
    api.post<Certificate>('/api/company/certificates', data),
  updateCertificate: (id: number, data: Partial<Certificate>) =>
    api.put<Certificate>(`/api/company/certificates/${id}`, data),
  deleteCertificate: (id: number) =>
    api.delete<void>(`/api/company/certificates/${id}`),

  // 荣誉奖项
  getHonors: () => api.get<Honor[]>('/api/company/honors'),
  createHonor: (data: Omit<Honor, 'id'>) =>
    api.post<Honor>('/api/company/honors', data),
  updateHonor: (id: number, data: Partial<Honor>) =>
    api.put<Honor>(`/api/company/honors/${id}`, data),
  deleteHonor: (id: number) => api.delete<void>(`/api/company/honors/${id}`),
};
