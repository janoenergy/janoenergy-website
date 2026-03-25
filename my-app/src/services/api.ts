// ============================================
// API 基础配置
// 统一处理请求、错误、超时、认证
// ============================================

import { ApiResponse, ApiListResponse, ApiError } from '@/types';

// API 基础配置
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.janoenergy.com';
const API_TIMEOUT = 30000; // 30秒超时

// 请求配置接口
interface RequestConfig extends RequestInit {
  timeout?: number;
}

// 自定义错误类
class ApiRequestError extends Error {
  constructor(
    public code: number,
    message: string,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

// 获取认证 Token
function getAuthToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/token=([^;]+)/);
  return match ? match[1] : null;
}

// 构建完整 URL
function buildUrl(endpoint: string): string {
  const base = API_BASE_URL.replace(/\/$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

// 超时包装
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    ),
  ]);
}

// 核心请求函数
async function request<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { timeout = API_TIMEOUT, ...fetchConfig } = config;
  const url = buildUrl(endpoint);

  // 构建请求头
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((fetchConfig.headers as Record<string, string>) || {}),
  };

  // 添加认证 Token
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 开发环境日志
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API] ${fetchConfig.method || 'GET'} ${url}`);
  }

  try {
    const response = await withTimeout(
      fetch(url, {
        ...fetchConfig,
        headers,
        credentials: 'include',
      }),
      timeout
    );

    // 处理 HTTP 错误
    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        code: response.status,
        message: response.statusText || 'Unknown error',
      }));

      throw new ApiRequestError(
        errorData.code || response.status,
        errorData.message || `HTTP ${response.status}`,
        errorData.details
      );
    }

    // 解析响应
    const data: ApiResponse<T> = await response.json();

    // 检查业务错误码
    if (data.code !== 200 && data.code !== 0) {
      throw new ApiRequestError(data.code, data.message || 'Business error');
    }

    return data.data;
  } catch (error) {
    // 统一错误处理
    if (error instanceof ApiRequestError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.message === 'Request timeout') {
        throw new ApiRequestError(408, '请求超时，请稍后重试');
      }
      throw new ApiRequestError(500, error.message);
    }

    throw new ApiRequestError(500, '未知错误');
  }
}

// ============================================
// HTTP 方法封装
// ============================================

export const api = {
  // GET 请求
  get: <T>(endpoint: string, config?: RequestConfig) =>
    request<T>(endpoint, { ...config, method: 'GET' }),

  // POST 请求
  post: <T>(endpoint: string, body: unknown, config?: RequestConfig) =>
    request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  // PUT 请求
  put: <T>(endpoint: string, body: unknown, config?: RequestConfig) =>
    request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  // PATCH 请求
  patch: <T>(endpoint: string, body: unknown, config?: RequestConfig) =>
    request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  // DELETE 请求
  delete: <T>(endpoint: string, config?: RequestConfig) =>
    request<T>(endpoint, { ...config, method: 'DELETE' }),

  // 上传文件
  upload: <T>(endpoint: string, formData: FormData, config?: RequestConfig) =>
    request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: formData,
      headers: {}, // 让浏览器自动设置 Content-Type with boundary
    }),
};

// 导出错误类
export { ApiRequestError };
