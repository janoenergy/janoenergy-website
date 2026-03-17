import { API_BASE_URL } from '@/lib/config';

class ApiService {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, { 
      method: 'POST', 
      body: JSON.stringify(data) 
    });
  }

  put<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, { 
      method: 'PUT', 
      body: JSON.stringify(data) 
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiService();
