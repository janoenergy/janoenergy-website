import { api } from './api';

export const authService = {
  login: (username: string, password: string) => 
    api.post('/api/auth/login', { username, password }),
  
  getSession: () => 
    api.get('/api/auth/session'),
};

export const companyService = {
  getInfo: () => 
    api.get('/api/company/info'),
  
  updateInfo: (data: { intro: string; introEn: string }) => 
    api.put('/api/company/info', data),
  
  getMilestones: () => 
    api.get('/api/company/milestones'),
  
  createMilestone: (data: any) => 
    api.post('/api/company/milestones', data),
  
  updateMilestone: (id: number, data: any) => 
    api.put(`/api/company/milestones/${id}`, data),
  
  deleteMilestone: (id: number) => 
    api.delete(`/api/company/milestones/${id}`),
  
  getValues: () => 
    api.get('/api/company/values'),
  
  getTeamMembers: () => 
    api.get('/api/team/members'),
  
  getBusinessSections: () => 
    api.get('/api/business/sections'),
  
  updateBusinessSection: (id: string, data: any) => 
    api.put(`/api/business/sections/${id}`, data),
  
  getCertificates: () => 
    api.get('/api/certificates'),
  
  getHonors: () => 
    api.get('/api/honors'),
};

export const projectService = {
  getAll: () => 
    api.get('/api/projects'),
  
  getById: (id: number) => 
    api.get(`/api/projects/${id}`),
  
  create: (data: any) => 
    api.post('/api/projects', data),
  
  update: (id: number, data: any) => 
    api.put(`/api/projects/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/api/projects/${id}`),
};

export const newsService = {
  getAll: () => 
    api.get('/api/news'),
  
  getById: (id: number) => 
    api.get(`/api/news/${id}`),
  
  create: (data: any) => 
    api.post('/api/news', data),
  
  update: (id: number, data: any) => 
    api.put(`/api/news/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/api/news/${id}`),
};
