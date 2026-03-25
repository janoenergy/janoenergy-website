// ============================================
// 认证相关 API
// ============================================

import { api } from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export const authApi = {
  // 登录
  login: (credentials: LoginCredentials) =>
    api.post<LoginResponse>('/api/auth/login', credentials),

  // 登出
  logout: () => api.post<void>('/api/auth/logout', {}),

  // 获取当前用户信息
  getProfile: () => api.get<UserProfile>('/api/auth/profile'),

  // 修改密码
  changePassword: (oldPassword: string, newPassword: string) =>
    api.post<void>('/api/auth/change-password', {
      oldPassword,
      newPassword,
    }),

  // 刷新 Token
  refreshToken: () => api.post<{ token: string }>('/api/auth/refresh', {}),
};

// 设置登录 Cookie
export function setAuthToken(token: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Strict`;
}

// 清除登录 Cookie
export function clearAuthToken(): void {
  if (typeof document === 'undefined') return;
  document.cookie = 'token=; path=/; max-age=0; SameSite=Strict';
}
