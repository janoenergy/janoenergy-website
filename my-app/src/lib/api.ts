// API 配置
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.janoenergy.com';

// API 端点
export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    session: `${API_BASE_URL}/api/auth/session`,
  },
  users: `${API_BASE_URL}/api/users`,
  projects: `${API_BASE_URL}/api/projects`,
  news: `${API_BASE_URL}/api/news`,
  workflows: `${API_BASE_URL}/api/workflows`,
  health: `${API_BASE_URL}/api/health`,
};
